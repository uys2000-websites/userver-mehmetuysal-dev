<template>
  <div class="p-4 flex gap-2">
    <button class="btn" @click="stop">Stop</button>
    <button class="btn" @click="reload">Reload</button>
  </div>
</template>

<script lang="ts">
import { addAction } from '@/services/firebase/db';

export default {
  methods: {
    stop() {
      addAction({ id: "", timestamp: Date.now(), utimestamp: Date.now(), data: { name: "stop" }, active: true })
    },
    reload() {
      addAction({ id: "", timestamp: Date.now(), utimestamp: Date.now(), data: { name: "reload" }, active: true })
    }
  }
}
</script>
