<template>
  <li class="flex flex-col gap-2 p-4">
    <div class="flex items-center gap-2">
      <BaseButton :type="BUTTON_DANGER" @click="deleteAndResetActivity(activity)">
        <BaseIcon :name="ICON_TRASH"/>
      </BaseButton>
      <span class="truncate text-xl">{{ activity.name }}</span>
    </div>
    <div class="flex gap-2">
      <BaseSelect class="grow font-mono" placeholder="h:mm" :options="PERIOD_SELECT_OPTIONS"
                  :selected="activity.secondToComplete || null"
                  @select="updateActivity(activity, {secondToComplete: $event || 0})"/>
      <RemainingActivitySeconds v-if="activity.secondToComplete" :activity="activity"/>
    </div>
  </li>
</template>

<script setup>

import BaseButton from "../components/BaseButton.vue"
import BaseSelect from "../components/BaseSelect.vue"
import BaseIcon from "../components/BaseIcon.vue"
import {ICON_TRASH} from '../icons'
import {BUTTON_DANGER, PERIOD_SELECT_OPTIONS} from "../constants"
import RemainingActivitySeconds from './RemainingActivitySeconds.vue'
import {isActivityValid} from '../validators'
import {updateActivity, deleteActivity} from '../activities'
import {resetTimelineItemActivities, timelineItems} from '../timeline-items'

defineProps({
  activity: {
    type: Object,
    required: true,
    validator: isActivityValid
  }
})

function deleteAndResetActivity(activity) {
  resetTimelineItemActivities(timelineItems.value, activity)
  deleteActivity(activity)
}

</script>
