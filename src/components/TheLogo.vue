<template>
  <a :href="`#${PAGE_TIMELINE}`" @click="navigate(PAGE_TIMELINE)">
    <img src="../assets/images/logo.png" class="h-9" alt="logo">
  </a>
</template>

<script setup>
import { PAGE_TIMELINE } from "../constants";
import { navigate } from '../router'
</script>
