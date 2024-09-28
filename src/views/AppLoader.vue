<template>
  <div class="h-screen w-screen top-0 left-0 flex justify-center fixed">
    <span class="loading loading-infinity loading-lg"></span>
  </div>
</template>
<script lang="ts">
import { auth, signOut } from '@/services/firebase/auth';
import { useAuthStore } from '@/stores/auth';

export default {
  data() {
    return {
      authStore: useAuthStore()
    }
  },
  async mounted() {
    await auth.authStateReady()
    if (auth.currentUser) {
      if (this.$route.redirectedFrom?.name) {
        this.authStore.id = auth.currentUser.uid
        this.$router.push({ name: this.$route.redirectedFrom.name })
        return;
      }
    }
    this.$router.push({ name: 'HomeView' })
  }
}
</script>