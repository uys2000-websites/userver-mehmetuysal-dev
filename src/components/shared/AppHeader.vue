<template>
  <header class="bg-neutral text-neutral-content flex justify-between items-center p-4 z-10">
    <label for="drawer" aria-label="open sidebar" class="btn btn-square btn-ghost">
      <span class="material-symbols-outlined">menu</span>
    </label>
    <RouterLink class="btn btn-neutral" :to="{ name: 'AppView' }">
      {{ $route.meta.title }}
    </RouterLink>
    <div class="flex gap-2 h-8 w-max">
      <ThemeBtn />
    </div>
  </header>
</template>

<script lang="ts">
import { RouterLink } from 'vue-router';
import ThemeBtn from '../daisy/ThemeBtn.vue';

export default {
  components: { RouterLink, ThemeBtn },

}
</script>