<template>
  <div class="flex w-full gap-2">
    <BaseButton :type="BUTTON_DANGER" :disabled="!timelineItem.activitySeconds" @click="reset">
      <BaseIcon :name="ICON_ARROW_PATH"/>
    </BaseButton>
    <div class="flex flex-grow items-center rounded bg-gray-100 px-2 font-mono text-3xl">{{
        formatSeconds(seconds)
      }}
    </div>
    <BaseButton v-if="isRunning" :type="BUTTON_WARNING" @click="stop">
      <BaseIcon :name="ICON_PAUSE"/>
    </BaseButton>
    <BaseButton
        v-else
        :type="BUTTON_SUCCESS"
        :disabled="timelineItem.hour !== currentHour()"
        @click="start"
    >
      <BaseIcon :name="ICON_PLAY"/>
    </BaseButton>
  </div>
</template>

<script setup>
import {BUTTON_SUCCESS, BUTTON_WARNING, BUTTON_DANGER} from '../constants'
import BaseButton from "./BaseButton.vue";
import {isTimelineItemValid} from "../validators";
import {formatSeconds, currentHour} from "../functions";
import {watchEffect} from 'vue'
import {useStopwatch} from '../composables/stopwatch'
import BaseIcon from './BaseIcon.vue'
import {ICON_ARROW_PATH, ICON_PAUSE, ICON_PLAY} from '../icons'
import {updateTimelineItem} from '../timeline-items'


const props = defineProps({
  timelineItem: {
    required: true,
    type: Object,
    validator: isTimelineItemValid
  }
})

const {seconds, isRunning, start, stop, reset} = useStopwatch(props.timelineItem.activitySeconds)
watchEffect(() =>
    updateTimelineItem(props.timelineItem, {
      activitySeconds: seconds.value
    })
)

function updateTimelineItemActivitySeconds() {
  updateTimelineItem(props.timelineItem, {
    activitySeconds: seconds.value
  })
}
</script>
