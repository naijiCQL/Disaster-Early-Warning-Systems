<!--
 * @Author: 陈巧龙
 * @Date: 2023-11-26 19:36:15
 * @LastEditors: 陈巧龙
 * @LastEditTime: 2023-11-28 20:01:57
 * @FilePath: \DW-Systems\src\components\yzt\YztView.vue
 * @Description: 一张图页面
-->
<script setup>
import { ref, onMounted } from 'vue'
import "ol/ol.css";
import Map from 'ol/Map'
import View from 'ol/View'
import { Feature } from "ol";
import XYZ from 'ol/source/XYZ';
import Layer from "@/ys/map/layer";
import * as Format from "ol/format";
import { LinearRing } from "ol/geom";
import Marker from "@/ys/map/marker";
import TileLayer from 'ol/layer/Tile'
import { format } from 'ol/coordinate';
import { fromExtent } from "ol/geom/Polygon";
import Interaction from "@/ys/map/interaction";
import { Fill, Style, Stroke, Text } from 'ol/style';
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { defaults as defaultControls, FullScreen, OverviewMap, ScaleLine, MousePosition } from "ol/control"

let map = ref(null) // 初始化地图
let geoLayer = null//初始化图层
let interaction = null//初始化测量工具
let zoom = null//初始化地图层级
let center = null//初始化地图中心点坐标

//初始化天地图
function initMap() {
    //实例化显示鼠标经纬度控件
    let mousePositionControl = new MousePosition({
        coordinateFormat: (coordinate) => {
            //6表示保留六位有效数
            return format(coordinate, `经度:{x}°,纬度:{y}°`, 3);
        },
        projection: 'EPSG:4326',
        className: 'custom-mouse-position',
        target: document.getElementById('mouse-position'),
        undefinedHTML: '&nbsp;'
    });

    //加载地图
    map = new Map({
        target: "olMap",
        view: new View({
            projection: "EPSG:4326",
            center: [111.293629, 30.698325],
            zoom: 10,//层级
            // 限制地图缩放最大级别为14，最小级别为8
            minZoom: 8,
            maxZoom: 14
        }),
        controls: defaultControls({//默认控件
            //启用缩放控件
            zoom: false,
            //启用旋转控件
            rotate: false,
            //启用归属控件
            attribution: false,
        }).extend([//添加新控件
            //显示鼠标的经纬度
            mousePositionControl,
        ]),
        layers: [ //图层数组 layers
            new TileLayer({
                name: '天地图影像底图',
                source: new XYZ({
                    wrapX: false,
                    url: 'https://t0.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=53ec153aed6bdc55da872add76139c12'
                })
            }),
            new TileLayer({
                name: '地图注记',
                source: new XYZ({
                    wrapX: false,
                    url: 'https://t0.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=53ec153aed6bdc55da872add76139c12'
                })

            })
        ],
    });
    //创建一个矢量图层
    geoLayer = new VectorLayer({
        source: new VectorSource(),
    });

    map.addLayer(geoLayer);
}

onMounted(() => {
    initMap()
})

</script>

<template>
    <div class="map-container">
        <div class="olMap" id="olMap">

        </div>
    </div>
</template>

<style scoped lang="scss">
.map-container {
    width: 100%;
    height: 100%;


}

.olMap {
    width: 100%;
    height: 100%;
    z-index: 0;
}

//修改openlayer默认控件的大小
::v-deep .ol-control button {
    height: 2em;
    width: 2em;
}

::v-deep .ol-control {
    padding: 0;
}

//调节显示经纬度控件的样式
::v-deep .custom-mouse-position {
    font-size: 18px;
    position: absolute;
    bottom: 0.5%;
    left: 45%;
    color: black;
}
</style>