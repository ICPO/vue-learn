<template>
  <TheTimeline :timeline-items="timelineItems"/>
</template>
<script setup>
import TheTimeline from "../components/TheTimeline.vue"
defineProps({
  timelineItems: {
    type: Object
  }
})
</script>