/**
 * Импорт констант
 */
import {
    PAGE_TIMELINE,
    HOUR_IN_DAY,
    MIDNIGHT_HOUR,
    SECONDS_IN_HOUR,
    MINUTES_IN_HOUR,
    MILLISECONDS_IN_SECONDS, SECONDS_IN_MINUTES
} from "./constants";

/**
 * Импорт функции из валидаторов
 */
import {isPageValid, isNull} from "./validators";

/**
 * Функция получения хеша, либо выдача ему дефолтного значения
 * @returns {string}
 */
export function normalizePathHash() {
    const page = window.location.hash.slice(1);
    if (isPageValid(page)) {
        return page;
    }

    window.location.hash = PAGE_TIMELINE;
    return PAGE_TIMELINE;
}

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
        activityId: hour % 4 === 0 ? null : activities[hour % 2].id,
        activitySeconds: hour % 4 === 0 ? 0 : (15 * SECONDS_IN_MINUTES * hour) % SECONDS_IN_HOUR
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

export function generatePeriodSelectOptions(periods) {
    return periods.map((period) => {
        return {
            value: period * SECONDS_IN_HOUR,
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
