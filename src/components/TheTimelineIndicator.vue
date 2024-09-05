<template>
  <hr
      ref="indicatorRef"
      class=""
      :style="{ top: `${topOffset}px` }"
  />
</template>

<script setup>
import {ref, computed} from 'vue'
import {HUNDRED_PERCENT} from '../constants'
import {secondsSinceMidnightInPercentage} from '../time'

const indicatorRef = ref()

const topOffset = computed(
    () => (secondsSinceMidnightInPercentage.value * getTimelineHeight()) / HUNDRED_PERCENT
)

function getTimelineHeight() {
  return indicatorRef.value?.parentNode.getBoundingClientRect().height
}

</script>
