import {HOUR_IN_DAY, NAV_ITEMS, MIDNIGHT_HOUR} from "./constants";

/**
 * Есть ли такая "страница/алиас страницы/слаг" в константе типа объект NAV_ITEMS
 * @param page
 * @returns {boolean}
 */
export function isPageValid(page) {
    return Object.keys(NAV_ITEMS).includes(page)
}

/**
 * Удовлетворяет ли час условиям. Проверка доступна из вне в валидаторах
 * @param hour
 * @returns {boolean}
 */
export function isTimelineItemValid({hour}) {
    return isHourValid(hour)
}

/**
 * Является ли час валидным
 * @param hour
 */
export function isHourValid(hour) {
    return isNumber(hour) && isBetween(hour, MIDNIGHT_HOUR, HOUR_IN_DAY)
}

/**
 * Применение внутренней функции валидации (isSelectOptionValid) к каждому option. Проверка доступна из вне в валидаторах
 * @param options
 * @returns {boolean}
 */
export function validateSelectOptions(options) {
    return options.every(isSelectOptionValid)
}

/**
 * Является ли пара value => label - число => строка
 * @param value
 * @param label
 * @returns {boolean}
 */
function isSelectOptionValid({value, label}) {
    return isNumber(value) && isString(label)
}

/**
 * Undefined или Null. Проверка доступна из вне в валидаторах
 * @param timelineItems
 * @returns {boolean}
 */
export function validateTimelineItems(timelineItems) {
    return timelineItems.every(isTimelineItemValid)
}

/**
 * Undefined или Null. Проверка доступна из вне в валидаторах
 * @param value
 * @returns {boolean}
 */
export function isUndefinedOrNull(value) {
    return isUndefined(value) || isNull(value)
}

/**
 * Число или Null. Проверка доступна из вне в валидаторах
 * @param value
 * @returns {boolean}
 */
export function isNumberOrNull(value) {
    return isNumber(value) || isNull(value)
}

/**
 * Является ли Null
 * @param value
 * @returns {boolean}
 */
function isNull(value) {
    return value === null
}

/**
 * Является ли типом undefined
 * @param value
 * @returns {boolean}
 */
function isUndefined(value) {
    return value === undefined
}

/**
 * Является ли числом
 *
 * @param value
 * @returns {boolean}
 */
function isNumber(value) {
    return typeof value === "number"
}

/**
 * Является ли строкой
 * @param value
 * @returns {boolean}
 */
function isString(value) {
    return typeof value === "string"
}

/**
 * Является ли число больше start и меньше end
 * @param value
 * @returns {boolean}
 */
function isBetween(value, start, end) {
    return value >= start && value < end
}

/**
 * Валидация одной активности. Проверка доступна из вне в валидаторах
 * @param activity
 * @returns {*}
 */
export function isActivityValid(activity) {
    return isNotEmptyString(activity)
}

/**
 * Проверяет, пустая ли строка и строка ли это вообще. Проверка доступна из вне в валидаторах
 * @param value
 * @returns {boolean}
 */
export function isNotEmptyString(value) {
    return isString(value) && value.length > 0
}

/**
 * Валидация всех активностей. Проверка доступна из вне в валидаторах
 * @param activities
 * @returns {boolean}
 */
export function validateActivities(activities) {
    return activities.every(isActivityValid)
}
