<template>
  <div class="mt-7">
    <ul>
      <TimelineItem
          v-for="timelineItem in timelineItems"
          :key="timelineItem.hour"
          :timeline-item="timelineItem"
          ref="timelineItemRefs"
          @scroll-to-hour="scrollToHour"
      />
    </ul>
  </div>
</template>
<script setup>
import TimelineItem from "../components/TimelineItem.vue"
import {MIDNIGHT_HOUR, PAGE_TIMELINE} from "../constants";
import {nextTick, ref, watchPostEffect} from "vue";
import {
  isActivityValid, isPageValid,
  isTimelineItemValid,
  validateActivities,
  validateSelectOptions,
  validateTimelineItems
} from "../validators";

const props = defineProps({
  timelineItems: {
    type: Object,
    required: true,
    validator: validateTimelineItems
  },
  currentPage: {
    required: true,
    type: String,
    validator: isPageValid
  }
})

defineExpose({ scrollToHour })

const timelineItemRefs = ref([])

watchPostEffect(async () => {
  if (props.currentPage === PAGE_TIMELINE) {
    await nextTick()
    scrollToHour(null, false)
  }

})

function scrollToHour(hour = null, isSmooth = true) {
  hour ??= new Date().getHours()
  const options = { behavior: isSmooth ? 'smooth' : 'instant' }

  if (hour === MIDNIGHT_HOUR) {
    document.body.scrollIntoView(options)
  } else {
    timelineItemRefs.value[hour - 1].$el.scrollIntoView(options)
  }
}
</script>