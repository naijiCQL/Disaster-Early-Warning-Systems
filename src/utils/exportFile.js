/*
 * @Author: 陈巧龙
 * @Date: 2023-12-26 10:43:10
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-12-26 15:29:53
 * @FilePath: \DW-Systems\src\utils\exportFile.js
 * @Description: 通过读取后端返回的文件流将其导出各类型文件
 */
/**
 * @description: 通过读取后端返回的文件流将其导出各类型文件
 * @param {*} fileType
 * @param {*} title
 * @return {*}
 */
export function exportFile(fileType, title) {
    const blob = new Blob([fileType])  //创建一个新的 Blob 对象
    const url = window.URL.createObjectURL(blob)  //  把一个blob对象转化为一个Blob URL，创建下载链接
    const downloadLink = document.createElement('a')  // 生成一个a标签
    downloadLink.href = url
    downloadLink.download = title  // // dowload属性指定下载后文件名
    document.body.appendChild(downloadLink) //将a标签添加到body中
    downloadLink.click() // 点击下载
    document.body.removeChild(downloadLink)  // 下载完成后移除元素
    window.URL.revokeObjectURL(url); // 释放掉blob对象
}

