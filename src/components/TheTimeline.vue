<template>
  <div class="mt-7">
    <ul>
      <TimelineItem v-for=" timelineItem  in timelineItems" :key="timelineItem.hour" :timeline-item="timelineItem"
                    :activity-select-options="activitySelectOptions" :activities="activities"
                    @scroll-to-hour="scrollToHour"
                    @select-activity="emit('setTimelineItemActivity',timelineItem,$event)" ref="timelineItemRefs"/>
    </ul>
  </div>
</template>


<script setup>
import TimelineItem from "../components/TimelineItem.vue"
import {ref, watchPostEffect, nextTick} from "vue"
import {
  validateTimelineItems,
  validateSelectOptions,
  validateActivities,
  isTimelineItemValid,
  isActivityValid, isPageValid
} from "../validators";
import {MIDNIGHT_HOUR, PAGE_TIMELINE} from "../constants";

const props = defineProps({
  timelineItems: {
    type: Object,
    required: true,
    validator: validateTimelineItems
  },
  activities: {
    type: Array,
    required: true,
    validator: validateActivities
  },
  activitySelectOptions: {
    required: true,
    type: Object,
    validator: validateSelectOptions
  },
  currentPage: {
    required: true,
    type: String,
    validator: isPageValid
  }
})
defineExpose({ scrollToHour })
const emit = defineEmits({
  setTimelineItemActivity(timelineItem, activity) {
    return [
      isTimelineItemValid(timelineItem),
      isActivityValid(activity)
    ].every(Boolean)
  }
})

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