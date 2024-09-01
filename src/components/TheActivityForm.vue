<template>
  <form class="sticky bottom-[57px] flex gap-2 botder-t bg-white p-4" @submit.prevent="submit">
    <input type="text" v-model="name"
           class="w-full rounded border px-4 text-xl" placeholder="Activity name">
    <BaseButton :disabled="name.trim() === ''">
      <PlusIcon class="h-7"/>
    </BaseButton>
  </form>
</template>

<script setup>
import BaseButton from "./BaseButton.vue"
import {ref, nextTick} from "vue"
import {PlusIcon} from "@heroicons/vue/24/outline"
import {isActivityValid} from "../validators";
import {id} from "../functions";

const name = ref('')

const emit = defineEmits({
  submit: isActivityValid
})

async function submit() {
  emit('submit', {
    'id': id(),
    'name': name.value,
    'secondToComplete': 0
  })

  name.value = '';

  await nextTick()
  window.scrollTo(0, document.body.scrollHeight)
  //


}
</script>

<style scoped>

</style>