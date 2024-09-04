/**
 * Импорт констант
 */
import {
    HUNDRED_PERCENT,
    MEDIUM_PERCENT,
    LOW_PERCENT,
    MINUTES_IN_HOUR,
    MILLISECONDS_IN_SECONDS,
    SECONDS_IN_MINUTES
} from "./constants";

export function getProgressColorClass(percentage) {
    if (percentage < LOW_PERCENT) return 'bg-red-500'
    if (percentage < MEDIUM_PERCENT) return 'bg-yellow-500'
    if (percentage < HUNDRED_PERCENT) return 'bg-blue-500'

    return 'bg-green-500'
}

/**
 * Импорт функции из валидаторов
 */
import {isNull} from "./validators";

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

export function currentHour() {
    return new Date().getHours()
}

export function formatSecondsWithSign(seconds) {
    return `${seconds >= 0 ? '+' : '-'}${formatSeconds(seconds)}`
}