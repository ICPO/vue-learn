<template>
  <div class="flex flex-col grow">
    <ul v-if="activities.length" class="divide-y grow">
      <ActivityItem v-for="activity in activities" :key="activity.id" :activity="activity" />
    </ul>
    <div v-else class="grow">
      <img src="../assets/images/no-way.jpg" alt="no-way" class="m-auto">
    </div>
    <TheActivityForm />
  </div>
</template>

<script setup>
import ActivityItem from "../components/ActivityItem.vue"
import TheActivityForm from "../components/TheActivityForm.vue"
import {validateActivities } from "../validators"

defineProps({
  activities: {
    type: Object,
    required: true,
    validator: validateActivities
  }
})


</script>
