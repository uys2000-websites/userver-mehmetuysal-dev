<template>
  <div class="p-4 flex flex-col gap-2 w-full overflow-auto h-full">
    <div class="top-0 sticky bg-neutral p-4 rounded-box flex flex-col gap-2">
      <label class="input input-bordered flex items-center gap-2 w-full">
        Filter:
        <input type="text" class="grow" v-model="filter" />
      </label>
    </div>
    <template v-for="item in data.filter(item => item.data.id.includes(filter))">
      <div class="bg-neutral p-4 rounded-box flex flex-col gap-2">
        <div class="flex gap-2">
          <div class="input input-bordered flex items-center w-full">
            Id: <span class="font-bold ml-1">{{ item.data.id }}</span>
          </div>
          <div class="input input-bordered flex items-center w-full">
            Type: <span class="font-bold ml-1">{{ types[item.data.type] }}</span>
          </div>
          <button class="btn w-full flex-shrink" @click="() => remove(item.id)">Remove</button>
        </div>

        <div class="bg-base-100 text-base-content border p-1 rounded-btn">
          <span class="font-bold">Stderr:</span>
          <div>
            <pre><code>{{ item.data.stderr }}</code></pre>
          </div>
        </div>
        <div class="bg-base-100 text-base-content border p-1 rounded-btn">
          <span class="font-bold">Stdout:</span>
          <div>
            <pre><code>{{ item.data.stdout }}</code></pre>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>


<script lang="ts">
import { getResults, listenResult, removeResult } from '@/services/firebase/db';
import type { UDocument } from '@/types/firebase';
import { type UTaskResult } from '@/types/task';
import type { Unsubscribe } from 'firebase/firestore';

export default {
  data() {
    return {
      listener: null as null | Unsubscribe,
      filter: "",
      data: [] as UDocument<UTaskResult>[],
      types: {
        0: "INSTANT",
        1: "START",
        2: "CRON"
      }
    }
  },
  methods: {
    async remove(id: string) {
      await removeResult(id)
      this.data = this.data.filter(item => item.id !== id)
    }
  },
  async beforeMount() {
    const querySnapshot = await getResults()
    this.data = querySnapshot.docs.map(snapshot => ({ ...snapshot.data(), id: snapshot.id } as UDocument<UTaskResult>))

    this.listener = listenResult(querySnapshot => {
      querySnapshot.docs.forEach((snapshot) => {
        this.data.unshift({ ...snapshot.data(), id: snapshot.id } as UDocument<UTaskResult>)
      })
    })
  },
  beforeUnmount() {
    if (this.listener) this.listener()
  }
}
</script>