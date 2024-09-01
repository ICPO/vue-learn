<template>
  <button :class="`${TYPE_CLASSES[type]} rounded disabled:cursor-not-allowed disabled:opacity-50`">
    <slot></slot>
  </button>
</template>
<script>
import {BUTTON_NEUTRAL, TYPE_CLASSES} from "../constants"
</script>

<script setup>
import {isButtonValid} from "../validators"
import {BUTTON_PRIMARY} from "../constants";
const props = defineProps({
  type: {
    type: String,
    validator: isButtonValid,
    default: BUTTON_PRIMARY
  }
})

</script>