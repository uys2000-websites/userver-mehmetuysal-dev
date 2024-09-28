<template>
  <header class="px-4 pt-4 sticky top-0 z-10 flex-shrink-0">
    <div class="bg-neutral text-neutral-content flex justify-between items-center p-4 rounded-box">
      <RouterLink class="btn btn-sm btn-ghost" :to="{ name: 'HomeView' }">
        Mehmet Uysal
      </RouterLink>
      <div class="flex gap-2">
        <RouterLink class="btn btn-sm btn-ghost" :to="{ name: 'AboutView' }">
          About
        </RouterLink>
        <template v-if="authStore.isAuthenticated">
          <RouterLink class="btn btn-sm btn-ghost" :to="{ name: 'AppView' }">
            App
          </RouterLink>
        </template>
        <template v-else>
          <a class="btn btn-sm btn-ghost" href="javascript:;" @click="signIn">
            SingIn
          </a>
        </template>
        <ThemeBtn />
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { RouterLink } from 'vue-router';
import Dropdown from '../daisy/Dropdown.vue';
import DropdownContent from '../daisy/DropdownContent.vue';
import ThemeBtn from '../daisy/ThemeBtn.vue';
import { useAuthStore } from '@/stores/auth';
import { signIn } from '@/services/firebase/auth';

export default {
  components: { RouterLink, Dropdown, DropdownContent, ThemeBtn },
  data() {
    return {
      authStore: useAuthStore()
    }
  },
  methods: {
    signIn
  }
}
</script>