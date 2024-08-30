/**
 * Импорт иконок
 */
import {ChartBarIcon, ClockIcon, ListBulletIcon} from "@heroicons/vue/24/outline";

/**
 * Навигационные константы
 * @type {string}
 */
export const PAGE_TIMELINE = 'timeline'
export const PAGE_ACTIVITIES = 'activities'
export const PAGE_PROGRESS = 'progress'

/**
 * Константы полночи и кол-ва часов в сутках
 * @type {number}
 */
export const HOUR_IN_DAY = 24;
export const MIDNIGHT_HOUR = 0;

/**
 * Список навигации
 * @type {{[p: string]: FunctionalComponent<HTMLAttributes & VNodeProps>, "[PAGE_ACTIVITIES]": FunctionalComponent<HTMLAttributes & VNodeProps>, "[PAGE_TIMELINE]": FunctionalComponent<HTMLAttributes & VNodeProps>, "[PAGE_PROGRESS]": FunctionalComponent<HTMLAttributes & VNodeProps>}}
 */
export const NAV_ITEMS = {
    [PAGE_TIMELINE]: ClockIcon,
    [PAGE_ACTIVITIES]: ListBulletIcon,
    [PAGE_PROGRESS]: ChartBarIcon
}

/**
 * @type {({label: string, value: number}|{label: string, value: number}|{label: string, value: number})[]}
 */
export const PERIOD_SELECT_OPTIONS = [
    {value: 15, label: '0:15'},
    {value: 30, label: '0:30'},
    {value: 45, label: '0:45'}
]
