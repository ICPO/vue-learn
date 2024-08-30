<template>
  <li class="flex flex-col gap-2 p-4">
    <div class="flex items-center gap-2">
      <BaseButton>
        <TrashIcon class="h-8"/>
      </BaseButton>
      <span class="truncate text-xl">{{ activity }}</span>
    </div>
    <div>
      <BaseSelect placeholder="h:mm" :options="PERIOD_SELECT_OPTIONS" :selected="secondsToActive"
                  @select="secondsToActive = $event"/>
    </div>
  </li>
</template>

<script setup>
import {ref} from "vue"
import BaseButton from "../components/BaseButton.vue"
import BaseSelect from "../components/BaseSelect.vue"
import {TrashIcon} from "@heroicons/vue/24/outline"
import {PERIOD_SELECT_OPTIONS} from "../constants"
import {isActivityValid} from "../validators"

defineProps({
  activity: {
    type: String,
    required: true,
    validator: isActivityValid
  }
})

const secondsToActive = ref(null)
</script>
