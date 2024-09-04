import {ref} from 'vue'
import {HOUR_IN_DAY, MIDNIGHT_HOUR} from './constants'
import {currentHour} from './functions'

export const timelineItemRefs = ref([])
export const timelineItems = ref(generateTimelineItems())

export function updateTimelineItem(timelineItem, fields) {
    return Object.assign(timelineItem, fields)
}

export function scrollToCurrentHour(isSmooth = false) {
    scrollToHour(currentHour(), isSmooth)
}

export function scrollToHour(hour, isSmooth = true) {
    const el = hour === MIDNIGHT_HOUR ? document.body : timelineItemRefs.value[hour - 1].$el

    el.scrollIntoView({behavior: isSmooth ? 'smooth' : 'instant'})
}

export function resetTimelineItemActivities(timelineItems, activity) {
    filterTimelineItemsByActivity(timelineItems, activity).forEach((timelineItem) =>
        updateTimelineItem(timelineItem, {
            activityId: null,
            activitySeconds: 0
        }))
}

function generateTimelineItems() {
    return [...Array(HOUR_IN_DAY).keys()].map((hour) => ({
        hour,
        activityId: null,
        activitySeconds: 0
    }))
}

export function calculateTrackedActivitySeconds(timelineItems, activity) {
    return filterTimelineItemsByActivity(timelineItems, activity)
        .map(({activitySeconds}) => activitySeconds)
        .reduce((total, seconds) => Math.round(total + seconds), 0)
}

function hasActivity(timelineItem, activity) {
    return timelineItem.activityId === activity.id
}

function filterTimelineItemsByActivity(timelineItems, {id}) {
    return timelineItems.filter(({activityId}) => activityId === id)
}