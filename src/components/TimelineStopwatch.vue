<template>
  <div class="flex w-full gap-2">
    <BaseButton :type="BUTTON_DANGER" :disabled="!seconds" @click="reset">
      <ArrowPathIcon class="h-7"/>
    </BaseButton>
    <div class="flex flex-grow items-center rounded bg-gray-100 px-2 font-mono text-3xl">{{
        formatSeconds(seconds)
      }}
    </div>
    <BaseButton v-if="isRunning" :type="BUTTON_WARNING" @click="stop">
      <PauseIcon class="h-7"/>
    </BaseButton>
    <BaseButton v-else :type="BUTTON_SUCCESS" :disabled="isStartButtonDisabled" @click="start">
      <PlayIcon class="h-7"/>
    </BaseButton>
  </div>
</template>

<script setup>
import {BUTTON_DANGER, BUTTON_WARNING, BUTTON_SUCCESS, MILLISECONDS_IN_SECONDS} from "../constants";
import {ArrowPathIcon, PauseIcon, PlayIcon} from "@heroicons/vue/24/outline";
import BaseButton from "./BaseButton.vue";
import {isTimelineItemValid} from "../validators";
import {formatSeconds} from "../functions";
import { ref, inject } from 'vue'

const props = defineProps({
  timelineItem: {
    required: true,
    type: Object,
    validator: isTimelineItemValid
  }
})

const seconds = ref(props.timelineItem.activitySeconds)
const isRunning = ref(false)
const isStartButtonDisabled = props.timelineItem.hour !== new Date().getHours()
const updateTimelineItemActivitySeconds = inject('updateTimelineItemActivitySeconds')

function start() {
  isRunning.value = setInterval(() => {
    updateTimelineItemActivitySeconds(props.timelineItem, 1)
    seconds.value++;
  }, MILLISECONDS_IN_SECONDS)
}

function stop() {
  clearInterval(isRunning.value)
  isRunning.value = false;
}

function reset() {
  stop()
  updateTimelineItemActivitySeconds(props.timelineItem, -seconds.value)
  seconds.value = 0
}
</script>
