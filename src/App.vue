<template>

  <TheHeader/>
  <main class="flex flex-grow flex-col">
    <TheTimeline
        v-show="currentPage === PAGE_TIMELINE"
        :timeline-items="timelineItems"
        ref="timelineRef"
    />
    <TheActivities v-show="currentPage === PAGE_ACTIVITIES" :activities="activities" />
    <TheProgress v-show="currentPage === PAGE_PROGRESS" />
  </main>

  <TheNav />
</template>

<script setup>
import * as keys from './keys'
import TheHeader from './components/TheHeader.vue'
import TheNav from './components/TheNav.vue'
import TheTimeline from "./pages/TheTimeline.vue";
import TheActivities from "./pages/TheActivities.vue";
import TheProgress from "./pages/TheProgress.vue";
import { ref, computed, provide, readonly } from 'vue'
import {PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS} from './constants'
import {
  generateTimelineItems,
  generateActivitySelectOptions,
  generateActivities,
  generatePeriodSelectOptions
} from './functions'
import { currentPage, timelineRef } from './router'


function deleteActivity(activity) {
  timelineItems.value.forEach((timelineItem) => {
    if (timelineItem.activityId === activity.id) {
      timelineItem.activityId = null;
      timelineItem.activitySeconds = 0;
    }
  })
  activities.value.splice(activities.value.indexOf(activity), 1)
}

function createActivity(activity) {
  activities.value.push(activity)

}
const activities = ref(generateActivities())

const timelineItems = ref(generateTimelineItems(activities.value));


const activitySelectOptions = computed(() => generateActivitySelectOptions(activities.value));

function setTimelineItemActivity(timelineItem, activityId) {
 // console.log(activity)
  timelineItem.activityId = activityId
}

function setActivitySecondToComplete(activity, secondToComplete) {
  activity.secondToComplete = secondToComplete || 0;
}

function updateTimelineItemActivitySeconds(timelineItem, activitySeconds) {
  timelineItem.activitySeconds += activitySeconds
}
provide(keys.updateTimelineItemActivitySecondsKey, updateTimelineItemActivitySeconds)
provide(keys.activitySelectOptionsKey, readonly(activitySelectOptions.value))
provide(keys.timelineItemsKey, readonly(timelineItems.value))
// provide('activities', activities.value)
provide(keys.periodSelectOptionsKey, readonly(generatePeriodSelectOptions()))
provide(keys.setTimelineItemActivityKey, setTimelineItemActivity)
provide(keys.setActivitySecondToCompleteKey, setActivitySecondToComplete)
provide(keys.createActivityKey, createActivity)
provide(keys.deleteActivityKey, deleteActivity)
</script>