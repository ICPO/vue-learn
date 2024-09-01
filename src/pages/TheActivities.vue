<template>
  <div class="flex flex-col grow">
    <ul v-if="activities.length" class="divide-y grow">
      <ActivityItem v-for="activity in activities" :key="activity.id" :activity="activity"
                    @delete="emit('deleteActivity',activity)"
                    @set-second-to-complete="setSecondToComplete(activity,$event)" :timeline-items="timelineItems"/>
    </ul>
    <div v-else class="grow">
      <img src="../assets/images/no-way.jpg" alt="no-way" class="m-auto">
    </div>
    <TheActivityForm @submit="emit('createActivity',$event)"/>
  </div>
</template>

<script setup>
import ActivityItem from "../components/ActivityItem.vue"
import TheActivityForm from "../components/TheActivityForm.vue"
import {isActivityValid, isNumber, validateActivities, validateTimelineItems } from "../validators"

const prop = defineProps({
  activities: {
    type: Object,
    required: true,
    validator: validateActivities
  },
  timelineItems: {
    required: true,
    type: Array,
    validator: validateTimelineItems
  }
})

const emit = defineEmits({
  setActivitySecondToComplete(activity, secondToComplete) {
    return [
      isActivityValid(activity),
      isNumber(secondToComplete)
    ].every(Boolean)
  },
  deleteActivity: isActivityValid,
  createActivity: isActivityValid
})

function setSecondToComplete(activity, secondToComplete) {
  emit('setActivitySecondToComplete', activity, secondToComplete)
}

</script>
