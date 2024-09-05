import {ref, computed} from 'vue'
import {HUNDRED_PERCENT, SECONDS_IN_DAY, MILLISECONDS_IN_SECONDS, SECONDS_IN_HOUR} from './constants'

export const now = ref(today())

export const secondsSinceMidnightInPercentage = computed(
    () => (HUNDRED_PERCENT * secondsSinceMidnight.value) / SECONDS_IN_DAY
)

const secondsSinceMidnight = computed(() => (now.value - midnight.value) / MILLISECONDS_IN_SECONDS)

const midnight = computed(() => new Date(now.value).setHours(0, 0, 0, 0))

export function today() {
    return new Date()
}

export function endOfHour(date) {
    const endOfHour = new Date(date)

    endOfHour.setTime(endOfHour.getTime() + SECONDS_IN_HOUR * MILLISECONDS_IN_SECONDS)

    endOfHour.setMinutes(0, 0, 0)

    return endOfHour
}

export function toSeconds(milliseconds) {
    return Math.round(milliseconds / MILLISECONDS_IN_SECONDS)
}

export function tomorrow() {
    const tomorrow = today()

    tomorrow.setDate(tomorrow.getDate() + 1)

    return tomorrow
}

export function isToday(date) {
    return date.toDateString() === today().toDateString()
}

let currentDateTimer = null

export function startCurrentDateTimer() {
    setInterval(() => (now.value = today()), MILLISECONDS_IN_SECONDS)
}
