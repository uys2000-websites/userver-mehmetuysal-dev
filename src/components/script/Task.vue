<template>
  <form class="bg-neutral p-2 rounded-btn gap-2 flex flex-col top-0" @submit.prevent="onSubmit">
    <div class="flex flex-col md:flex-row gap-2">
      <label class="input input-bordered flex items-center gap-2 w-full">
        Name:
        <input type="text" class="grow" v-model="value.name" />
      </label>
      <template v-if="task?.id">
        <button type="submit" class="btn w-full md:w-1/2 btn-secondary flex-shrink">Update</button>
        <button type="button" class="btn w-full md:w-1/2 btn-secondary flex-shrink"
          @click="() => $emit('run', task?.id)">Run</button>
        <button type="button" class="btn w-full md:w-1/2 btn-secondary flex-shrink"
          @click="() => $emit('remove', task?.id)">Delete</button>
      </template>
      <template v-else>
        <button type="submit" class="btn btn-secondary w-full flex-shrink">Create</button>
      </template>
    </div>
    <div class="flex gap-2 flex-col md:flex-row">
      <div class="flex gap-2">
        <label class="input input-bordered flex items-center gap-2 w-full">
          Server:
          <input type="text" class="grow min-w-0" v-model="value.server" />
        </label>
      </div>
      <label class="label cursor-pointer w-full flex justify-between bg-base-100 p-3 rounded-btn">
        <span class="label-text">Run on Startup</span>
        <input type="checkbox" class="toggle toggle-primary min-w-0" v-model="value.isStartup" />
      </label>
      <label class="label cursor-pointer w-full flex justify-between bg-base-100 p-3 rounded-btn">
        <span class="label-text">Run With Cron</span>
        <input type="checkbox" class="toggle toggle-primary min-w-0" v-model="value.isCron" />
      </label>
    </div>
    <div class="flex gap-2">
      <label class="input input-bordered flex items-center gap-2 w-full">
        Cron Expression:
        <input type="text" class="grow min-w-0" v-model="value.cronExpression" :disabled="!value.isCron" />
      </label>
    </div>
    <div class="flex flex-col gap-2">
      <template v-for="command, i in value.commands">
        <div class="flex gap-2 flex-col md:flex-row">
          <label class="input input-bordered flex items-center gap-2 w-full">
            Command:
            <input type="text" class="grow min-w-0" :value="command" @input="(e) => onCommandChange(i, e)" />
          </label>
          <button type="button" class="btn w-full md:w-1/4 flex-shrink" @click="() => removeCommand(i)">
            <span class="material-symbols-outlined">delete</span>
          </button>
        </div>
      </template>
      <div class="flex gap-2 flex-col md:flex-row">
        <label class="input input-bordered flex items-center gap-2 w-full">
          New Command:
          <input type="text" class="grow min-w-0" v-model="newCommand" />
        </label>
        <button type="button" class="btn w-full md:w-1/4 flex-shrink" @click="addCommand">
          <span class="material-symbols-outlined">add_circle</span>
        </button>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import type { UDocument } from '@/types/firebase';
import type { UTask } from '@/types/task';
import type { PropType } from 'vue';

export default {
  emits: ["create", "update", "remove", "run"],
  props: {
    task: {
      type: Object as PropType<UDocument<UTask>>,
      required: false
    }
  },
  data() {
    return {
      value: {} as UTask,
      newCommand: ""
    }
  },
  methods: {
    updateValue() {
      if (this.task)
        this.value = { ...this.task.data }
      else
        this.value = {
          name: "",
          server: "debug",
          isActive: false,
          isStartup: false,
          isCron: false,
          cronExpression: "",
          commands: []
        } as UTask
    },
    onCommandChange(index: number, e: Event) {
      const input = e.target as HTMLInputElement
      this.value.commands[index] = input.value
    },
    removeCommand(index: number,) {
      this.value.commands.splice(index, 1)
    },
    addCommand() {
      if (!this.value.commands) this.value.commands = []
      this.value.commands.push(this.newCommand)
    },
    onSubmit() {
      if (this.task?.id) this.$emit("update", this.task?.id, this.value)
      else this.$emit("create", this.value)
    },
  },
  watch: {
    task() {
      this.updateValue()
    }
  },
  mounted() {
    this.updateValue()
  }
}
</script>