<template>
  <div class="flex flex-col gap-2 p-2 overflow-auto w-full h-page">
    <Collapse class="bg-base-100 flex-shrink-0">
      <template #title>
        <span>Task Create</span>
      </template>
      <template #content>
        <Task @create="createTask" />
      </template>
    </Collapse>
    <Collapse class="bg-base-100 flex-shrink max-h-full">
      <template #title>
        <span>Tasks</span>
      </template>
      <template #content>
        <div class="flex flex-col gap-2 max-h-full overflow-auto">
          <template v-for="item in data">
            <Collapse class="bg-base-200 flex-shrink-0">
              <template #title>
                <span>{{ item.data.name }}</span>
              </template>
              <template #content>
                <Task :task="item" @update="updateTask" @remove="removeTask" @run="runTask" />
              </template>
            </Collapse>
          </template>
        </div>
      </template>
    </Collapse>
  </div>
</template>
<script lang="ts">
import Collapse from '@/components/daisy/Collapse.vue';
import Task from '@/components/script/Task.vue';
import { addTask, getTasks, listenTasks, removeTask, updateTask } from '@/services/firebase/db';
import type { UDocument } from '@/types/firebase';
import type { UTask } from '@/types/task';
import type { Unsubscribe } from 'firebase/firestore';

export default {
  components: { Task, Collapse },
  data() {
    return {
      data: [] as UDocument<UTask>[],
      listener: null as null | Unsubscribe
    }
  },
  methods: {
    async createTask(task: UTask) {
      const date = Date.now()
      const document = {
        id: "",
        active: true,
        data: task,
        timestamp: date,
        utimestamp: date
      } as UDocument<UTask>
      await addTask(document)
    },
    async updateTask(id: string, task: UTask) {
      const document = {
        id: id,
        utimestamp: Date.now()
      } as Record<string, any>

      if (task.name) document["data.name"] = task.name
      if (task.server) document["data.server"] = task.server
      if (task.isActive) document["data.isActive"] = task.isActive
      if (task.isStartup) document["data.isStartup"] = task.isStartup
      if (task.isCron) document["data.isCron"] = task.isCron
      if (task.cronExpression) document["data.cronExpression"] = task.cronExpression
      if (task.commands) document["data.commands"] = task.commands

      await updateTask(id, document)
    },
    async removeTask(id: string) {
      await removeTask(id)
      this.data = this.data.filter(item => item.id !== id)
    },
    async runTask(id: string) {
      const document = {
        id: id,
        "data.isActive": true,
        utimestamp: Date.now()
      } as Record<string, any>
      await updateTask(id, document)
    },
    async loadTasks() {
      const querySnapshot = await getTasks()
      this.data = querySnapshot.docs.map(snapshot => ({ ...snapshot.data(), id: snapshot.id } as UDocument<UTask>))
    },
    listenTasks() {
      this.listener = listenTasks((querySnapshot) => {
        const documentChanges = querySnapshot.docChanges()
        documentChanges.forEach((change) => {
          if (change.type == 'added')
            this.data.unshift({ ...change.doc.data(), id: change.doc.id } as UDocument<UTask>)
          if (change.type == "removed")
            this.data = this.data.filter(item => item.id != change.doc.id)
        })
      })
    },
    unsubscribeListener() {
      if (this.listener) this.listener()
    }
  },
  mounted() {
    this.loadTasks()
    this.listenTasks()
  },
  beforeUnmount() {
    this.unsubscribeListener()
  }
}
</script>