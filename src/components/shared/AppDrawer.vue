<template>
  <div class="drawer-side z-10">
    <label for="drawer" aria-label="close sidebar" class="drawer-overlay"></label>
    <ul class="menu bg-neutral min-h-full w-max p-4">
      <li>
        <RouterLink :to="{ name: 'TasksView' }" class="btn btn-neutral">Scripts</RouterLink>
      </li>
      <li>
        <RouterLink :to="{ name: 'ResultView' }" class="btn btn-neutral">Results</RouterLink>
      </li>
      <li>
        <RouterLink :to="{ name: 'SSHView' }" class="btn btn-neutral">SSH</RouterLink>
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