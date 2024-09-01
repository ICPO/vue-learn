<template>
  <li class="flex flex-col gap-2 p-4">
    <div class="flex items-center gap-2">
      <BaseButton :type="BUTTON_DANGER" @click="emit('delete')">
        <TrashIcon class="h-8"/>
      </BaseButton>
      <span class="truncate text-xl">{{ activity.name }}</span>
    </div>
    <div class="flex gap-2">
      <BaseSelect class="grow font-mono" placeholder="h:mm" :options="PERIOD_SELECT_OPTIONS" :selected="activity.secondToComplete || null"
                  @select="emit('setSecondToComplete',$event || 0)"/>
      <ActivitySecondToComplete v-if="activity.secondToComplete" :activity="activity" :timeline-items="timelineItems"/>

    </div>
  </li>
</template>

<script setup>
import {ref} from "vue"
import BaseButton from "../components/BaseButton.vue"
import BaseSelect from "../components/BaseSelect.vue"
import {TrashIcon} from "@heroicons/vue/24/outline"
import {PERIOD_SELECT_OPTIONS, BUTTON_DANGER} from "../constants"
import ActivitySecondToComplete from './ActivitySecondToComplete.vue'
import { isActivityValid, isUndefined, isNumber, validateTimelineItems } from '../validators'

defineProps({
  activity: {
    type: Object,
    required: true,
    validator: isActivityValid
  },
  timelineItems: {
    required: true,
    type: Array,
    validator: validateTimelineItems
  }
})
const emit = defineEmits({
  setSecondToComplete: isNumber,
  delete: isUndefined
})
</script>
