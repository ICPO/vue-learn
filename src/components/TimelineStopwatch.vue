<template>
  <div class="flex w-full gap-2">
    <BaseButton
        :type="BUTTON_DANGER"
        :disabled="!timelineItem.activitySeconds"
        @click="resetTimelineItemTimer(timelineItem)"
    >
      <BaseIcon :name="ICON_ARROW_PATH"/>
    </BaseButton>
    <div class="flex flex-grow items-center rounded bg-gray-100 px-2 font-mono text-3xl">{{
        formatSeconds(timelineItem.activitySeconds)
      }}
    </div>
    <BaseButton
        v-if="timelineItem === activeTimelineItem"
        :type="BUTTON_WARNING"
        @click="stopTimelineItemTimer"
    >
      <BaseIcon :name="ICON_PAUSE"/>
    </BaseButton>
    <BaseButton
        v-else
        :type="BUTTON_SUCCESS"
        :disabled="timelineItem.hour !== now.getHours()"
        @click="startTimelineItemTimer(timelineItem)"
    >
      <BaseIcon :name="ICON_PLAY"/>
    </BaseButton>
  </div>
</template>

<script setup>
import {BUTTON_SUCCESS, BUTTON_WARNING, BUTTON_DANGER} from '../constants'
import BaseButton from "./BaseButton.vue";
import {isTimelineItemValid} from "../validators";
import {formatSeconds} from "../functions";
import BaseIcon from './BaseIcon.vue'
import {ICON_ARROW_PATH, ICON_PAUSE, ICON_PLAY} from '../icons'
import {
  startTimelineItemTimer,
  stopTimelineItemTimer,
  resetTimelineItemTimer,
} from '../timeline-item-timer'
import {now} from '../time'
import {activeTimelineItem} from '../timeline-items'

defineProps({
  timelineItem: {
    required: true,
    type: Object,
    validator: isTimelineItemValid
  }
})


</script>
