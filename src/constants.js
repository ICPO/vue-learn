/**
 * Импорт иконок
 */
import {ChartBarIcon, ClockIcon, ListBulletIcon} from "@heroicons/vue/24/outline";
import {generatePeriodSelectOptions} from "./functions";

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
export const SECONDS_IN_HOUR = 3600;
export const MINUTES_IN_HOUR = 60;
export const SECONDS_IN_MINUTES = 60;
export const MILLISECONDS_IN_SECONDS = 1000;


/**
 * Константы кнопок
 */
export const BUTTON_NEUTRAL = 'neutral';
export const BUTTON_DANGER = 'danger';
export const BUTTON_PRIMARY = 'primary';
export const BUTTON_SUCCESS = 'success';
export const BUTTON_WARNING = 'warning';

/**
 * Список допступных кнопок
 */
export const AVAILABLE_BUTTON = [
    BUTTON_NEUTRAL, BUTTON_DANGER, BUTTON_PRIMARY, BUTTON_SUCCESS, BUTTON_WARNING
]

/**
 * Список навигации
 * @type {{[p: string]: FunctionalComponent<HTMLAttributes & VNodeProps>, "[PAGE_ACTIVITIES]": FunctionalComponent<HTMLAttributes & VNodeProps>, "[PAGE_TIMELINE]": FunctionalComponent<HTMLAttributes & VNodeProps>, "[PAGE_PROGRESS]": FunctionalComponent<HTMLAttributes & VNodeProps>}}
 */
export const NAV_ITEMS = {
    [PAGE_TIMELINE]: ClockIcon,
    [PAGE_ACTIVITIES]: ListBulletIcon,
    [PAGE_PROGRESS]: ChartBarIcon
}

const PERIODS = [
    15, 30, 45, 60, 120, 150, 180, 210, 240, 270
]

/**
 * @type {({label: string, value: number}|{label: string, value: number}|{label: string, value: number})[]}
 */
export const PERIOD_SELECT_OPTIONS = generatePeriodSelectOptions(PERIODS);

/*[
{value: 1 * SECONDS_IN_HOUR, label: '1:00'},
{value: 2 * SECONDS_IN_HOUR, label: '2:00'},
{value: 3 * SECONDS_IN_HOUR, label: '3:00'}
]*/

export const NULLABLE_ACTIVITY = {id: null}

export const TYPE_CLASSES = {
    [BUTTON_NEUTRAL]: 'bg-gray-100 p-3 enabled:hover:bg-gray-200',
    [BUTTON_DANGER]: 'bg-red-500 p-3 enabled:hover:bg-red-600 text-white',
    [BUTTON_PRIMARY]: 'bg-purple-500 p-3 enabled:hover:bg-purple-600 text-white',
    [BUTTON_SUCCESS]: 'bg-green-500 p-3 enabled:hover:bg-green-600 text-white',
    [BUTTON_WARNING]: 'bg-yellow-500 p-3 enabled:hover:bg-yellow-600 text-white',
}




