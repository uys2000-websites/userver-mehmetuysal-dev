<template>
  <router-view v-slot="{ Component }">
    <transition name="layout">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script lang="ts">
import { RouterView } from 'vue-router'
import { auth, signOut } from './services/firebase/auth';
import { useAuthStore } from './stores/auth';
import type { Unsubscribe } from 'firebase/auth';
import { useAppStore } from './stores/app';
export default {
  components: {
    RouterView
  },
  data() {
    return {
      authListener: null as null | Unsubscribe,
      authStore: useAuthStore(),
      appStore: useAppStore()
    }
  },
  beforeMount() {
    this.authListener = auth.onAuthStateChanged(async user => {
      if (user) {
        const idToken = await user.getIdTokenResult()
        console.log(idToken.claims)
        if (idToken.claims.admin) {
          return this.authStore.id = user.uid
        }
        signOut()
      }
      this.authStore.id = ""
      if (this.$route.meta.authReqired) this.$router.push({ name: "HomeView" })
    })
  },
  beforeUnmount() {
    if (this.authListener) this.authListener()
  }
}
</script>


<style>
.layout-enter-active,
.layout-leave-active {
  transition: opacity 0.5s ease;
  position: absolute;
}

.layout-enter-from,
.layout-leave-to {
  opacity: 0;
}
</style>