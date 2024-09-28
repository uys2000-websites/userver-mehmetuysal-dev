<template>
  <div class="p-4 w-full flex flex-col gap-2 h-full">
    <form class="bg-neutral p-2 rounded-btn gap-2 flex flex-col top-0" @submit.prevent="create">
      <div class="flex gap-2">
        <label class="input input-bordered flex items-center gap-2 w-full">
          Name
          <input type="text" class="grow" v-model="name" />
        </label>
        <button type="submit" class="btn w-full flex-shrink">Create</button>
      </div>
      <textarea class="textarea textarea-bordered w-full" placeholder="Bash Script" v-model="command"></textarea>
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
        <form class="bg-neutral p-2 rounded-btn gap-2 flex flex-col" @submit.prevent="() => activate(item.id)">
          <div class="flex gap-2">
            <label class="input input-bordered flex items-center gap-2 w-1/2">
              Id <span class="font-bold">{{ item.id }}</span>
            </label>
            <button type="submit" class="btn w-full flex-shrink">Activate</button>
          </div>
          <div class="flex gap-2">
            <label class="input input-bordered flex items-center gap-2 w-full">
              Name <span class="font-bold">{{ item.data.name }}</span>
            </label>
            <button type="button" class="btn w-full flex-shrink" @click="() => remove(item.id)">Delete</button>
          </div>
          <div class="textarea textarea-bordered w-full">{{ item.data.command }}</div>
        </form>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { addTask, getTasks, removeTask, updateTask } from '@/services/firebase/db';
import type { UDocument } from '@/types/firebase';
import { UTaskType, type UTask } from '@/types/task';

export default {
  data() {
    return {
      filter: "",
      name: "",
      command: "",
      data: [] as UDocument<UTask>[]
    }
  },
  methods: {
    async create() {
      const item: UDocument<UTask> = {
        id: "", active: false, timestamp: Date.now(), utimestamp: Date.now(),
        data: {
          type: UTaskType.INSTANT,
          name: this.name,
          command: this.command,
          cronExpression: "",
          cronStatus: false
        }
      }
      const docRef = await addTask(item)
      this.data.unshift({ ...item, data: { ...item.data }, id: docRef.id })
    },
    async activate(id: string) {
      console.log(id)
      updateTask(id)
    },
    async remove(id: string) {
      removeTask(id)
      this.data = this.data.filter(item => item.id !== id)
    }
  },
  beforeMount() {
    getTasks(UTaskType.INSTANT).then((querySnapshot => {
      this.data = querySnapshot.docs.map(snapshot => ({ ...snapshot.data(), id: snapshot.id } as UDocument<UTask>))
    }))
  }
}
</script>