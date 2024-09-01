<template>

  <TheHeader @navigate="goTo($event)"/>
  <main class="flex flex-grow flex-col">
    <TheTimeline v-show="currentPage == PAGE_TIMELINE" :timeline-items="timelineItems" ref="timeline"
                 :activity-select-options="activitySelectOptions" :activities="activities"
                 @set-timeline-item-activity="setTimelineItemActivity" :current-page="currentPage"/>
    <TheActivities v-show="currentPage == PAGE_ACTIVITIES" :activities="activities" @delete-activity="deleteActivity"  :timeline-items="timelineItems"
                   @create-activity="createActivity" @set-activity-second-to-complete="setActivitySecondToComplete"/>
    <TheProgress v-show="currentPage == PAGE_PROGRESS"/>
  </main>

  <TheNav :current-page="currentPage" @navigate="goTo($event)"/>
</template>

<script setup>
import TheHeader from './components/TheHeader.vue'
import TheNav from './components/TheNav.vue'
import TheTimeline from "./pages/TheTimeline.vue";
import TheActivities from "./pages/TheActivities.vue";
import TheProgress from "./pages/TheProgress.vue";
import { ref, computed, provide } from 'vue'
import {PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS} from './constants'
import {
  generateTimelineItems,
  normalizePathHash,
  generateActivitySelectOptions,
  generateActivities,
} from './functions'

const currentPage = ref(normalizePathHash());

function goTo(page) {
  if (currentPage.value === PAGE_TIMELINE && page === PAGE_TIMELINE) {
    timeline.value.scrollToHour()
  }
  if (page !== PAGE_TIMELINE) {
    document.body.scrollIntoView()
  }
  currentPage.value = page
}

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
const timeline = ref()


const activitySelectOptions = computed(() => generateActivitySelectOptions(activities.value));

function setTimelineItemActivity(timelineItem, activity) {
 // console.log(activity)
  timelineItem.activityId = activity.id
}

function setActivitySecondToComplete(activity, secondToComplete) {
  activity.secondToComplete = secondToComplete;
}

function updateTimelineItemActivitySeconds(timelineItem, activitySeconds) {
  timelineItem.activitySeconds += activitySeconds
}
provide('updateTimelineItemActivitySeconds', updateTimelineItemActivitySeconds)
</script>