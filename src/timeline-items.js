import {ref} from 'vue'
import {HOUR_IN_DAY} from './constants'
import {activities} from './activities'

export const timelineItems = ref(generateTimelineItems())

export function updateTimelineItem(timelineItem, fields) {
    return Object.assign(timelineItem, fields)
}

export function resetTimelineItemActivities(activity) {
    timelineItems.value
        .filter((timelineItem) => hasActivity(timelineItem, activity))
        .forEach((timelineItem) => updateTimelineItem(timelineItem, {
            activityId: null,
            activitySeconds: 0
        }))
}

function generateTimelineItems() {
    return [...Array(HOUR_IN_DAY).keys()].map((hour) => ({
        hour,
        activityId: [0, 1, 2, 3, 4].includes(hour) ? activities.value[hour % 3].id : null,
        activitySeconds: [0, 1, 2, 3, 4].includes(hour) ? hour * 600 : 0
    }))
}

export function getTotalActivitySeconds(activity) {
    return timelineItems.value
        .filter((timelineItem) => hasActivity(timelineItem, activity))
        .reduce((totalSeconds, timelineItem) => Math.round(timelineItem.activitySeconds + totalSeconds), 0)
}

function hasActivity(timelineItem, activity) {
    return timelineItem.activityId === activity.id
}