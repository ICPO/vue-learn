<template>
  <form class="sticky bottom-[57px] flex gap-2 botder-t bg-white p-4" @submit.prevent="submit">
    <input type="text" v-model="name"
           class="w-full rounded border px-4 text-xl" placeholder="Activity name">
    <BaseButton :disabled="name.trim() === ''">
      <BaseIcon :name="ICON_PLUS"/>
    </BaseButton>
  </form>
</template>

<script setup>
import {ICON_PLUS} from '../icons'
import BaseButton from "./BaseButton.vue"
import BaseIcon from "./BaseIcon.vue"
import {ref, nextTick} from "vue"
import {id} from "../functions";


const name = ref('')

async function submit() {
  createActivity({
    'id': id(),
    'name': name.value,
    'secondToComplete': 0
  })

  name.value = '';

  await nextTick()
  window.scrollTo(0, document.body.scrollHeight)

}
</script>

<style scoped>

</style>