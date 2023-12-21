<!--
 * @Author: 陈巧龙
 * @Date: 2023-11-26 19:36:15
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-12-21 16:43:54
 * @FilePath: \DW-Systems\src\components\common\MapView.vue
 * @Description: openlayers底图
-->
<script setup>
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
import { Fill, Style, Stroke, Text } from 'ol/style';
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { defaults as defaultControls, MousePosition } from "ol/control"
import { yichangallMapJson } from '@/components/data/yichang'
import { listLayerData } from '@/api/sy'
import { ref, onMounted, defineProps } from 'vue'

let map = ref(null) // 初始化地图
let geoLayer = null//初始化图层

let markerLayer = null;//创建一个存放marker的矢量图层

const props = defineProps({
    id: String,
})

let layerParams = {
    "keyWord": "",
    "userXzqh": "4205",
    "jcd": 1,
    "qpyh": 0,
    "yhd": 0,
    "zlxm": 0
}

onMounted(() => {
    initMap()
})

//初始化地图
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
        target: `olMap-${props.id}`,
        view: new View({
            projection: "EPSG:4326",
            center: [111.293629, 30.698325],
            zoom: 9,//层级
            //minZoom: 8,//地图缩放最小级别
            maxZoom: 18//地图缩放最大级别
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
    //将矢量图层进行添加
    map.addLayer(geoLayer);
    //添加遮罩
    addPolygonHoles()
    //获取标注数据
    //getLayerData(layerParams)
}

/**
 * @description: 添加宜昌市遮罩
 * @return {*}
 */
function addPolygonHoles() {
    let extent = [-180, -90, 180, 90];
    //从范围创建多边形
    let polygonRing = fromExtent(extent);
    //获取此几何的坐标数组。该数组具有用于多边形的GeoJSON坐标数组的结构
    let coords = [yichangallMapJson().features[0].geometry.coordinates];
    coords.forEach(coord => {
        let linearRing = new LinearRing(coord[0]);
        //将传递的线环添加到这个多边形
        polygonRing.appendLinearRing(linearRing);
    });
    let feature = new Feature({
        geometry: polygonRing
    });
    feature.setStyle(new Style({
        fill: new Fill({
            color: "rgba(198,198,198, 0.4)",
        }),
        stroke: new Stroke({
            color: "#ffffff",
            width: 1.5,
        }),
    }));
    geoLayer.getSource().addFeature(feature);
};
//添加各灾害类型的静态标注
function addMarker(items) {
    //在地图上添加Mark
    let layer = new Layer(map)
    let marker = new Marker(map)
    //创建一个存放marker的矢量图层
    markerLayer = layer.createVectorLayer('markerLayer')
    //再添加之前先进行清空图层
    markerLayer.getSource().clear();

    items.forEach((item) => {
        let long = item.longitude
        let lat = item.latitude
        let zhlx = item.jcaa02a090

        //marker的图片路径
        let imgUrl = `/markerIcon/zhlx/${zhlx}绿.png`;
        //在地图上添加marker
        marker.addMarker(long, lat, markerLayer, { imgUrl: imgUrl, scale: 0.61 }, item);
    })

}
//获取地图图层初始化标注数据
function getLayerData() {
    listLayerData(layerParams).then((res) => {
        res.result.jcdList.forEach((item) => {
            item.longitude = item.jd;
            item.latitude = item.wd;
            item.jcaa02a090 = item.zhlx
        })

        console.log(res.result.jcdList)

        addMarker(res.result.jcdList)
    })
}
// 主动向父组件暴露方法
defineExpose({ getLayerData, addMarker })
</script>

<template>
    <div class="map-container">
        <div class="olMap" :id="`olMap-${id}`"></div>
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
    font-size: 14px;
    position: absolute;
    bottom: 0.5%;
    left: 45%;
    color: black;
}
</style>