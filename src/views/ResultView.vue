<template>
  <div class="p-4 flex flex-col gap-2 w-full overflow-auto h-full">
    <div class="top-0 sticky bg-neutral p-4 rounded-box flex flex-col gap-2">
      <label class="input input-bordered flex items-center gap-2 w-full">
        Filter:
        <input type="text" class="grow" v-model="filter" />
      </label>
    </div>
    <div class="flex flex-col gap-2 bg-neutral rounded-box p-2">
      <template v-for="item in data.filter(item => item.data.id.includes(filter))">
        <Collapse class="bg-base-100 w-full overflow-hidden">
          <template #title>
            <div class="flex gap-2 justify-between">
              <span>{{ item.data.command }}</span>
              <span>{{ item.data.id }}</span>
            </div>
          </template>
          <template #content>
            <div class="flex flex-col gap-2 w-full overflow-auto">
              <div class="flex flex-nowrap gap-2">
                <button class="btn w-full flex-shrink" @click="() => filter = item.data.id">Filter</button>
                <button class="btn w-full flex-shrink" @click="() => remove(item.id)">Remove</button>
              </div>
              <div class="bg-base-100 text-base-content rounded-btn p-2">
                <span class="font-bold">Stderr:</span>
                <div class="w-full max-w-full overflow-y-auto">
                  <pre><code>{{ item.data.stderr }}</code></pre>
                </div>
              </div>
              <div class="bg-base-100 text-base-content rounded-btn p-2">
                <span class="font-bold">Stdout:</span>
                <div class="w-full overflow-y-auto">
                  <pre><code>{{ item.data.stdout }}</code></pre>
                </div>
              </div>
              <div class="bg-base-100 text-base-content rounded-btn p-2">
                <span class="font-bold">Error:</span>
                <div class="w-full overflow-y-auto">
                  <pre><code>{{ item.data.error }}</code></pre>
                </div>
              </div>
            </div>
          </template>
        </Collapse>
      </template>
    </div>
  </div>
</template>


<script lang="ts">
import Collapse from '@/components/daisy/Collapse.vue';
import { getResults, listenResult, removeResult } from '@/services/firebase/db';
import type { UDocument } from '@/types/firebase';
import { type UTaskResult } from '@/types/task';
import type { Unsubscribe } from 'firebase/firestore';

export default {
  components: { Collapse },
  data() {
    return {
      listener: null as null | Unsubscribe,
      filter: "",
      data: [] as UDocument<UTaskResult>[],
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
      querySnapshot.docChanges().forEach((change) => {
        if (change.type == "added")
          this.data.unshift({ ...change.doc.data(), id: change.doc.id } as UDocument<UTaskResult>)
      })
    })
  },
  beforeUnmount() {
    if (this.listener) this.listener()
  }
}
</script>