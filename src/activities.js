import {ref, computed} from 'vue'
import {HUNDRED_PERCENT} from './constants'
import {id} from './functions'

export const activities = ref([])
export const activitySelectOptions = computed(() => generateActivitySelectOptions(activities.value))

export function createActivity(activity) {
    activities.value.push(activity)
}

export function calculateCompletionPercentage(totalTrackedSeconds) {
    return Math.floor((totalTrackedSeconds * HUNDRED_PERCENT) / totalActivitySecondsToComplete.value)
}

const totalActivitySecondsToComplete = computed(() => {
    return trackedActivities.value
        .map(({secondToComplete}) => secondToComplete)
        .reduce((total, seconds) => total + seconds, 0)
})

export function calculateActivityCompletionPercentage({secondToComplete}, trackedSeconds) {
    return Math.floor((trackedSeconds * HUNDRED_PERCENT) / secondToComplete)
}

export function updateActivity(activity, fields) {
    return Object.assign(activity, fields)
}

export function deleteActivity(activity) {
    activities.value.splice(activities.value.indexOf(activity), 1)
}


function generateActivitySelectOptions(activities) {
    return activities.map((activity) => ({value: activity.id, label: activity.name}))
}

export const trackedActivities = computed(() =>
    activities.value.filter(({secondToComplete}) => secondToComplete)
)

export function initializeActivities(state) {
    activities.value = state.activities || []
}