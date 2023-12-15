/*
 * @Author: 陈巧龙
 * @Date: 2023-12-13 13:57:57
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-12-15 10:34:28
 * @FilePath: \DW-Systems\src\components\common\date\getTime.js
 * @Description: 获得当前时间以及当前时间中小时的前整数倍时间
 */
/**
 * @description: 获得当前时间，格式为“2023-12-13 13:30:09”，并且可以获取当前时间中小时的前整数倍时间。
 * @param {*} hours
 * @return {*}
 */
export function getPreviousHourTime(hours) {
    const now = new Date();

    now.setHours(now.getHours() - hours);

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const formattedTime = `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
    return formattedTime;
}

/**
 * @description: 仅获取当前日期，格式为“2023-12-13”
 * @return {*}
 */
export function getCurrentDate() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    const formattedTime = `${year}-${month}-${day}`;
    return formattedTime;
}
