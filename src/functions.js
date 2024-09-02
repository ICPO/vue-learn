/**
 * Импорт констант
 */
import {
    HOUR_IN_DAY,
    MIDNIGHT_HOUR,
    SECONDS_IN_HOUR,
    MINUTES_IN_HOUR,
    MILLISECONDS_IN_SECONDS, SECONDS_IN_MINUTES
} from "./constants";

/**
 * Импорт функции из валидаторов
 */
import {isNull} from "./validators";


export function generateActivities() {

    return ['Coding', 'Training', 'Reading'].map((name, hours) => ({
        id: id(),
        name: name,
        secondToComplete: hours * SECONDS_IN_HOUR
    }))
}

/**
 * Просто генерация массива с временем
 * @returns {[]}
 */
export function generateTimelineItems(activities) {

    return [...Array(HOUR_IN_DAY).keys()].map((hour) => ({
        hour,
        activityId: [0, 1, 2, 3, 4].includes(hour) ? activities[hour % 3].id : null,
        activitySeconds: [0, 1, 2, 3, 4].includes(hour) ? hour * 600 : 0
    }))

}


export function generateActivitySelectOptions(activities) {
    return activities.map((activity) => ({
        id: activity.id, value: activity.id, label: activity.name
    }))
}


export function id() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

export function normalizeSelectValue(value) {
    return isNull(value) || isNaN(value) ? value : +value;
}

export function generatePeriodSelectOptions() {

    const periods = [
        15, 30, 45, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, 390, 420, 450, 480
    ]

    return periods.map((period) => {
        return {
            value: period * SECONDS_IN_MINUTES,
            label: generatePeriodSelectOptionsLabel(period)
        }
    })

}

function generatePeriodSelectOptionsLabel(period) {
    const hours = Math.floor(period / MINUTES_IN_HOUR).toString().padStart(2, 0)
    const minutes = (period % MINUTES_IN_HOUR).toString().padStart(2, 0)
    return `${hours}:${minutes}`;
}

export function formatSeconds(seconds) {
    const date = new Date();
    date.setTime(Math.abs(seconds) * MILLISECONDS_IN_SECONDS)

    const utc = date.toUTCString();
    return utc.substring(utc.indexOf(':') - 2, utc.indexOf(':') + 6);
}

export function getTotalActivitySeconds(activity, timelineItems) {
    return timelineItems
        .filter((timelineItem) => timelineItem.activityId === activity.id)
        .reduce((totalSeconds, timelineItem) => Math.round(timelineItem.activitySeconds + totalSeconds), 0)
}
