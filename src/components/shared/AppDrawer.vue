<template>
  <div class="drawer-side z-10">
    <label for="drawer" aria-label="close sidebar" class="drawer-overlay"></label>
    <ul class="menu bg-neutral min-h-full w-max p-4">
      <li>
        <RouterLink :to="{ name: 'InstantView' }" class="btn btn-neutral">Instant Scripts</RouterLink>
      </li>
      <li>
        <RouterLink :to="{ name: 'StartupView' }" class="btn btn-neutral">Startup Scripts</RouterLink>
      </li>
      <li>
        <RouterLink :to="{ name: 'CronView' }" class="btn btn-neutral">Cron Scripts</RouterLink>
      </li>
      <li>
        <RouterLink :to="{ name: 'ResultView' }" class="btn btn-neutral">Results</RouterLink>
      </li>
      <li>
        <RouterLink :to="{ name: 'ErrorView' }" class="btn btn-neutral">Errors</RouterLink>
      </li>
      <li class="mt-auto">
        <a href="javascript:;" class="btn btn-neutral" @click="signOut">SignOut</a>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { signOut } from '@/services/firebase/auth';
import { RouterLink } from 'vue-router';
export default {
  components: { RouterLink },
  methods: { signOut }
}
</script>