<template>
  <nav class="sticky bottom-0 z-10 bg-white ">
    <ul class="flex items-center justify-around border-t">
      <NavItem v-for="navItem in NAV_ITEMS" :nav-item="navItem" :key="navItem.page"/>
    </ul>
  </nav>
</template>

<script setup>
import NavItem from './NavItem.vue'
import {NAV_ITEMS} from "../constants";

</script>
