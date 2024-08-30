/**
 * Импорт констант
 */
import {PAGE_TIMELINE, HOUR_IN_DAY, MIDNIGHT_HOUR} from "./constants";

/**
 * Импорт функции из валидаторов
 */
import {isPageValid} from "./validators";

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

/**
 * Просто генерация массива с временем
 * @returns {[]}
 */
export function generateTimelineItems() {
    const timelineItems = [];

    for (let hour = MIDNIGHT_HOUR; hour < HOUR_IN_DAY; hour++) {
        timelineItems.push({hour})
    }

    return timelineItems;
}




