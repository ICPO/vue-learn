<template>
  <li class="flex flex-col gap-2 p-4">
    <div class="flex items-center gap-2">
      <BaseButton :type="BUTTON_DANGER" @click="deleteActivity(activity)">
        <TrashIcon class="h-8"/>
      </BaseButton>
      <span class="truncate text-xl">{{ activity.name }}</span>
    </div>
    <div class="flex gap-2">
      <BaseSelect class="grow font-mono" placeholder="h:mm" :options="periodSelectOptions"
                  :selected="activity.secondToComplete || null"
                  @select="setActivitySecondToComplete(activity, $event || 0)"/>
      <ActivitySecondToComplete v-if="activity.secondToComplete" :activity="activity"/>

    </div>
  </li>
</template>

<script setup>
import {ref, inject} from "vue"
import BaseButton from "../components/BaseButton.vue"
import BaseSelect from "../components/BaseSelect.vue"
import {TrashIcon} from "@heroicons/vue/24/outline"
import {BUTTON_DANGER} from "../constants"
import ActivitySecondToComplete from './ActivitySecondToComplete.vue'
import {isActivityValid} from '../validators'

defineProps({
  activity: {
    type: Object,
    required: true,
    validator: isActivityValid
  }
})
const setActivitySecondToComplete = inject('setActivitySecondToComplete')
const periodSelectOptions = inject('periodSelectOptions')
const deleteActivity = inject('deleteActivity')
</script>
