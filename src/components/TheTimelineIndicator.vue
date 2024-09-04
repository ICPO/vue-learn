<template>
  <hr
      ref="indicatorRef"
      class="pointer-events-none absolute z-10 w-full border-b-2 border-red-600"
      :style="{ top: `${topOffset}px` }"
  />
</template>

<script setup>
import {ref, computed, watchEffect} from 'vue'
import {
  HUNDRED_PERCENT,
  SECONDS_IN_DAY,
  SECONDS_IN_MINUTES,
  MINUTES_IN_HOUR,
  MILLISECONDS_IN_SECONDS
} from '../constants'

const indicatorRef = ref()
const secondsSinceMidnight = ref(calculateSecondsSinceMidnight())
setInterval(() => (secondsSinceMidnight.value += 5 * 60), MILLISECONDS_IN_SECONDS)
const topOffset = computed(
    () => (secondsSinceMidnightInPercentage.value * getTimelineHeight()) / HUNDRED_PERCENT
)
const secondsSinceMidnightInPercentage = computed(
    () => (HUNDRED_PERCENT * secondsSinceMidnight.value) / SECONDS_IN_DAY
)
watchEffect(() => {
  if (secondsSinceMidnight.value > SECONDS_IN_DAY) {
    secondsSinceMidnight.value = 0
  }
})

function calculateSecondsSinceMidnightInPercentage() {
  return (HUNDRED_PERCENT * calculateSecondsSinceMidnight()) / SECONDS_IN_DAY
}

function calculateSecondsSinceMidnight() {
  const now = new Date()
  return (
      SECONDS_IN_MINUTES * MINUTES_IN_HOUR * now.getHours() +
      SECONDS_IN_MINUTES * now.getMinutes() +
      now.getSeconds()
  )
}

function getTimelineHeight() {
  return indicatorRef.value?.parentNode.getBoundingClientRect().height
}
</script>
