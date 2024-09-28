<template>
  <div class="drawer lg:drawer-open bg-base-300 text-base-content overflow-hidden">
    <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col">
      <AppHeader />
      <div class="h-app-page overflow-hidden relative">
        <router-view v-slot="{ Component, route }">
          <transition name="app">
            <component :is="Component" :key="route.path" />
          </transition>
        </router-view>
      </div>
    </div>
    <AppDrawer />
  </div>
</template>

<script lang="ts">
import AppDrawer from '@/components/shared/AppDrawer.vue';
import AppHeader from '@/components/shared/AppHeader.vue';
import { RouterView } from 'vue-router'
export default {
  components: {
    AppHeader,
    AppDrawer,
    RouterView
  }
}
</script>

<style>
.app-enter-active,
.app-leave-active {
  transition: 0.5s ease;
  position: absolute;
}

.app-enter-from {
  transform: translateX(-100vw);
  opacity: 0;

}

.app-leave-to {
  transform: translateX(100vw);
  opacity: 0;
}
</style>