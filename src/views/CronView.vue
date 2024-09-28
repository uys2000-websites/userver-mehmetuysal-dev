<template>
  <div class="p-4 w-full flex flex-col gap-2 h-full">
    <form class="bg-neutral p-2 rounded-btn gap-2 flex flex-col top-0" @submit.prevent="create">
      <div class="flex gap-2">
        <label class="input input-bordered flex items-center gap-2 w-full">
          Name
          <input type="text" class="grow" v-model="name" />
        </label>
        <label class="input input-bordered flex items-center gap-2 w-full">
          Expression
          <input type="text" class="grow" v-model="cronExpression" />
        </label>
        <button type="submit" class="btn w-full flex-shrink">Create</button>
      </div>
      <textarea class="textarea textarea-bordered w-full" placeholder="Bash Script" v-model="command"
        style="white-space: pre;"></textarea>
    </form>
    <div class="h-full overflow-auto flex flex-col gap-2">
      <div class="top-0 sticky bg-neutral p-2 rounded-box flex flex-col gap-2">
        <label class="input input-bordered flex items-center gap-2 w-full">
          Filter:
          <input type="text" class="grow" v-model="filter" />
        </label>
      </div>
      <template
        v-for="item in data.filter(item => item.id.includes(filter) || item.data.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))">
        <form class="bg-neutral p-2 rounded-btn gap-2 flex flex-col"
          @submit.prevent="() => update(item.id, item.data.cronStatus)">
          <div class="flex gap-2">
            <label class="input input-bordered flex items-center gap-2 w-1/3">
              Id <span class="font-bold">{{ item.id }}</span>
            </label>
            <button type="submit" class="btn flex-shrink w-2/3">
              {{ item.data.cronStatus ? "DeActivate" : "Activate" }}
            </button>
          </div>
          <div class="flex gap-2">
            <label class="input input-bordered flex items-center gap-2 w-1/2">
              Name <span class="font-bold">{{ item.data.name }}</span>
            </label>
            <button type="button" class="btn flex-shrink w-1/2" @click="() => remove(item.id)">Delete</button>
          </div>
          <div class="flex gap-2">
            <div class="textarea textarea-bordered w-2/3">
              <code>
              <pre>{{ item.data.command }}</pre>
            </code>
            </div>
            <label class="input input-bordered flex items-center gap-2 w-1/3">
              Expression <span class="font-bold">{{ item.data.cronExpression }}</span>
            </label>
          </div>
        </form>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { addTask, getTasks, removeTask, updateCronTask, updateTask } from '@/services/firebase/db';
import type { UDocument } from '@/types/firebase';
import { UTaskType, type UTask } from '@/types/task';

export default {
  data() {
    return {
      filter: "",
      name: "",
      command: "",
      cronExpression: "",
      data: [] as UDocument<UTask>[]
    }
  },
  methods: {
    async create() {
      const item: UDocument<UTask> = {
        id: "", active: false, timestamp: Date.now(), utimestamp: Date.now(),
        data: {
          type: UTaskType.CRON,
          name: this.name,
          command: this.command,
          cronExpression: this.cronExpression,
          cronStatus: false
        }
      }
      const docRef = await addTask(item)
      this.data.unshift({ ...item, data: { ...item.data }, id: docRef.id })
    },
    async update(id: string, cronStatus: boolean) {
      updateCronTask(id, !cronStatus)
      const index = this.data.findIndex(item => item.id == id)
      if (index != -1) this.data[index].data.cronStatus = !cronStatus
    },
    async remove(id: string) {
      removeTask(id)
      this.data = this.data.filter(item => item.id !== id)
    }
  },
  beforeMount() {
    getTasks(UTaskType.CRON).then((querySnapshot => {
      this.data = querySnapshot.docs.map(snapshot => ({ ...snapshot.data(), id: snapshot.id } as UDocument<UTask>))
    }))
  }
}
</script>