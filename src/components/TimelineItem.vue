<template>
  <li class="relative flex flex-col gap-2 border-t border-gray-200 py-10 px-4">
    <TimelineHour :hour="timelineItem.hour" @click.prevent="emit('scrollToHour')"/>
    <BaseSelect
        placeholder="Rest"
        :selected="timelineItem.activityId"
        :options="activitySelectOptions"
        @select="setTimelineItemActivity(timelineItem,$event)"
    />
    <TimelineStopwatch :timeline-item="timelineItem"/>
  </li>
</template>

<script setup>
import {inject} from 'vue'
import {isTimelineItemValid, isUndefined} from '../validators'
import BaseSelect from './BaseSelect.vue'
import TimelineHour from './TimelineHour.vue'
import TimelineStopwatch from './TimelineStopwatch.vue'
import {setTimelineItemActivityKey, activitySelectOptionsKey} from '../keys'

defineProps({
  timelineItem: {
    required: true,
    type: Object,
    validator: isTimelineItemValid
  }
})

const emit = defineEmits({
  scrollToHour: isUndefined
})
const setTimelineItemActivity = inject(setTimelineItemActivityKey)
const activitySelectOptions = inject(activitySelectOptionsKey)


// import {ref, inject} from "vue";
// import BaseSelect from "./BaseSelect.vue";
// import TimelineStopwatch from "./TimelineStopwatch.vue";
// import TimelineHour from "./TimelineHour.vue";
// import {
//   isActivityValid,
//   isHourValid,
//   isTimelineItemValid
// } from "../validators";
//
// import {NULLABLE_ACTIVITY} from "../constants";
//
// defineProps({
//   timelineItem: {
//     type: Object,
//     required: true,
//     validator: isTimelineItemValid
//   }
//
// })
//
// const emit = defineEmits({
//   selectActivity: isActivityValid,
//   scrollToHour: isHourValid
// });
// const activitySelectOptions = inject('activitySelectOptions')
// const activities = inject('activities')
//
// function selectActivity(id) {
//   emit('selectActivity', findActivityById(id))
// }
//
// function findActivityById(id) {
//   return activities.find((activity) => activity.id === id) || NULLABLE_ACTIVITY
// }

</script>

<style scoped>

</style>