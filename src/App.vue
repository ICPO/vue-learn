<template>

  <TheHeader/>
  <main class="flex flex-grow flex-col">
    <KeepAlive>
      <component :is="routes[currentPage]"/>
    </KeepAlive>
  </main>

  <TheNav/>
</template>

<script setup>
import TheHeader from './components/TheHeader.vue'
import TheNav from './components/TheNav.vue'
import {currentPage, routes} from './router'

</script>