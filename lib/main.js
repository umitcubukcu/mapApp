import {Map, View, coordinate, control} from 'ol';
import Tile from 'ol/layer/Tile';
import MousePosition from 'ol/control/MousePosition';
import {createStringXY} from 'ol/coordinate';
import {defaults as defaultControls} from 'ol/control';
import XYZ from 'ol/source/XYZ';
import TileWMS from 'ol/source/TileWMS';
import LayerGroup from 'ol/layer/Group';



const mousePositionControl = new MousePosition({
  coordinateFormat: createStringXY(6),
  projection: "EPSG:4326",
  target:"mouse-position",
});



const mapView = new View({
  center: [3773641, 4753772],
  zoom: 7,
});

const mapControls = defaultControls().extend([mousePositionControl]);

const map = new Map({
  controls: defaultControls().extend([mousePositionControl]),
  view: mapView,
  target: "map",
  controls: mapControls,
});

const osmStandard = new Tile({
  source: new XYZ({
    url: "http://tile.openstreetmap.org/{z}/{x}/{y}.png",
  }),
  title: "OSM Standard",
  visible: false,
});

const osmTopological = new Tile({
  source: new XYZ({
    url: "https://tile.opentopomap.org/{z}/{x}/{y}.png",
  }),
  title: "OSM Topological",
  visible: false,
});

const googleHybrit = new Tile({
  source: new XYZ({
    url: "https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}",
  }),
  title: "G. Hybrit",
  visible: false,
});

const googleSatellite = new Tile({
  source: new XYZ({
    url: "http://mt0.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}",
  }),
  title: "G. Topological",
  visible: false,
});

const stanenTerrain = new Tile({
  source: new XYZ({
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  }),
  title: "Esri Satellite",
  visible: false,
});

var basemapDefault = new Tile({
  source: new TileWMS({
    url: "http://localhost:8080/geoserver/Postgis/wms",
    params: { LAYERS: "Postgis:basemapGroup", TILED: true },
    serverType: "geoserver",
    transition: 0,
  }),
  title: "Basemap",
  visible: true,
});

//basemap group
const baseLayerGroup = new LayerGroup({
  layers: [
    osmStandard,
    osmTopological,
    googleHybrit,
    googleSatellite,
    stanenTerrain,
    basemapDefault,
  ],
});

map.addLayer(baseLayerGroup);

function toggleButton() {
  document.querySelector(".selected").addEventListener("click", function (e) {
    e.preventDefault();
    let basemapActive = document.getElementById("other");
    basemapActive.classList.toggle("basemapActive");
    let selected = document.getElementById("selected");
  });
}
toggleButton();

// BASEMAP SWICHER
function basemapSwicher() {
  let otherArray = document.querySelectorAll(".basemap");
  otherArray.forEach(function (item) {
    item.addEventListener("click", function () {
      if (item.parentNode.classList.contains("others")) {
        let clicked = item;
        let selected = document.getElementById("selected").firstElementChild;
        cloneSelected = selected;
        selected.innerHTML = clicked.innerHTML;
        clicked.innerHTML = cloneSelected.innerHTML;
        baseLayerGroup.getLayers().forEach(function (item) {
          let htmlText = clicked.lastElementChild.textContent;
          let layertitle = item.get("title");
          item.setVisible(layertitle === htmlText);
        });
      }
    });
  });
}
basemapSwicher();

//#region Boundaries

// Contry boundary
var ilceler = new Tile({
  source: new TileWMS({
    url: "http://localhost:8080/geoserver/Postgis/wms",
    params: { LAYERS: "Postgis:ilceler", TILED: true },
    serverType: "geoserver",
    transition: 0,
  }),
  title: "İlçe sınırı",
  visible: false,
});

var iller = new Tile({
  source: new TileWMS({
    url: "http://localhost:8080/geoserver/Postgis/wms",
    params: { LAYERS: "Postgis:iller", TILED: true },
    serverType: "geoserver",
    transition: 0,
  }),
  title: "İl sınırı",
  visible: false,
});

var ulke_siniri = new Tile({
  source: new TileWMS({
    url: "http://localhost:8080/geoserver/Postgis/wms",
    params: { LAYERS: "Postgis:ulke_siniri", TILED: true },
    serverType: "geoserver",
    transition: 0,
  }),
  title: "Ülke sınırı",
  visible: false,
});
//#endregion

const WMSboundaries = new LayerGroup({
  layers: [ilceler, iller, ulke_siniri],
});

map.addLayer(WMSboundaries);

// WMS Layers Publish
//#region DAĞLAR
var daglar_1 = new Tile({
  source: new TileWMS({
    url: "http://localhost:8080/geoserver/Postgis/wms",
    params: { LAYERS: "Postgis:kirik_daglar", TILED: true },
    serverType: "geoserver",
    transition: 0,
  }),
  title: "Kırık Dağlar",
  visible: false,
});
var daglar_2 = new Tile({
  source: new TileWMS({
    url: "http://localhost:8080/geoserver/Postgis/wms",
    params: { LAYERS: "Postgis:kivrim_daglar", TILED: true },
    serverType: "geoserver",
    transition: 0,
  }),
  title: "Kıvrım Dağlar",
  visible: false,
});
var daglar_3 = new Tile({
  source: new TileWMS({
    url: "http://localhost:8080/geoserver/Postgis/wms",
    params: { LAYERS: "Postgis:volkanik_daglar", TILED: true },
    serverType: "geoserver",
    transition: 0,
  }),
  title: "Volkanik Dağlar",
  visible: false,
});
//#endregion

//#region AKARSULAR
var akarsular_1 = new Tile({
  source: new TileWMS({
    url: "http://localhost:8080/geoserver/Postgis/wms",
    params: { LAYERS: "Postgis:acik_havza_akarsu", TILED: true },
    serverType: "geoserver",
    transition: 0,
  }),
  title: "Açık Havza",
  visible: false,
});
var akarsular_2 = new Tile({
  source: new TileWMS({
    url: "http://localhost:8080/geoserver/Postgis/wms",
    params: { LAYERS: "Postgis:kapali_havza_akarsu", TILED: true },
    serverType: "geoserver",
    transition: 0,
  }),
  title: "Kapalı Havza",
  visible: false,
});
//#endregion

//#region PLATOLAR
var platolar_1 = new Tile({
  source: new TileWMS({
    url: "http://localhost:8080/geoserver/Postgis/wms",
    params: { LAYERS: "Postgis:asinim_platolar", TILED: true },
    serverType: "geoserver",
    transition: 0,
  }),
  title: "Aşınım Platolar",
  visible: false,
});
var platolar_2 = new Tile({
  source: new TileWMS({
    url: "http://localhost:8080/geoserver/Postgis/wms",
    params: { LAYERS: "Postgis:karstik_platolar", TILED: true },
    serverType: "geoserver",
    transition: 0,
  }),
  title: "Karstik Platolar",
  visible: false,
});
var platolar_3 = new Tile({
  source: new TileWMS({
    url: "http://localhost:8080/geoserver/Postgis/wms",
    params: { LAYERS: "Postgis:taban_alan_platolar", TILED: true },
    serverType: "geoserver",
    transition: 0,
  }),
  title: "Taban Düzlüğü Platolar",
  visible: false,
});
var platolar_4 = new Tile({
  source: new TileWMS({
    url: "http://localhost:8080/geoserver/Postgis/wms",
    params: { LAYERS: "Postgis:volkanik_platolar", TILED: true },
    serverType: "geoserver",
    transition: 0,
  }),
  title: "Volkanik Platolar",
  visible: false,
});
//#endregion

//#region OVALAR
var ovalar_1 = new Tile({
  source: new TileWMS({
    url: "http://localhost:8080/geoserver/Postgis/wms",
    params: { LAYERS: "Postgis:delta_ovalar", TILED: true },
    serverType: "geoserver",
    transition: 0,
  }),
  title: "Delta Ovalar",
  visible: false,
});
var ovalar_2 = new Tile({
  source: new TileWMS({
    url: "http://localhost:8080/geoserver/Postgis/wms",
    params: { LAYERS: "Postgis:karstik_ovalar", TILED: true },
    serverType: "geoserver",
    transition: 0,
  }),
  title: "Karstik Ovalar",
  visible: false,
});
var ovalar_3 = new Tile({
  source: new TileWMS({
    url: "http://localhost:8080/geoserver/Postgis/wms",
    params: { LAYERS: "Postgis:tektonik_ovalar", TILED: true },
    serverType: "geoserver",
    transition: 0,
  }),
  title: "Tektonik Ovalar",
  visible: false,
});
var ovalar_4 = new Tile({
  source: new TileWMS({
    url: "http://localhost:8080/geoserver/Postgis/wms",
    params: { LAYERS: "Postgis:volkanik_ovalar", TILED: true },
    serverType: "geoserver",
    transition: 0,
  }),
  title: "Volkanik Ovalar",
  visible: false,
});
//#endregion

//#region GÖLLER
var goller_1 = new Tile({
  source: new TileWMS({
    url: "http://localhost:8080/geoserver/Postgis/wms",
    params: { LAYERS: "Postgis:karstik_goller", TILED: true },
    serverType: "geoserver",
    transition: 0,
  }),
  title: "Karstik Göller",
  visible: false,
});
var goller_2 = new Tile({
  source: new TileWMS({
    url: "http://localhost:8080/geoserver/Postgis/wms",
    params: { LAYERS: "Postgis:tektonik_goller", TILED: true },
    serverType: "geoserver",
    transition: 0,
  }),
  title: "Tektonik Göller",
  visible: false,
});
var goller_3 = new Tile({
  source: new TileWMS({
    url: "http://localhost:8080/geoserver/Postgis/wms",
    params: { LAYERS: "Postgis:volkanik_goller", TILED: true },
    serverType: "geoserver",
    transition: 0,
  }),
  title: "Volkanik Göller",
  visible: false,
});


const WMSlayerGroup = new LayerGroup({
  layers: [daglar_1,daglar_2,daglar_3,akarsular_1,akarsular_2,platolar_1,platolar_2,platolar_3,platolar_4,ovalar_1,ovalar_2,ovalar_3,ovalar_4,goller_1,goller_2,goller_3],
});

map.addLayer(WMSlayerGroup);

// controling the WMS layer by input buttons
function layercontroller() {
  const inputArray = document.querySelectorAll(".layer input");
  inputArray.forEach(function (inputs) {
    inputs.addEventListener('change', function (input) {
      let inputTitle = input.target.previousElementSibling.textContent;
      WMSlayerGroup.getLayers().forEach(function (item) {
        let wmsTitle = item.get("title");
        if (wmsTitle === inputTitle && input.target.checked == true) {
          item.setVisible(true);
        } else if (wmsTitle === inputTitle && input.target.checked == false) {
          item.setVisible(false);
        }
      });
    });
  });
}
layercontroller();

// Boundaries
function boundaryOnOff() {
  const inputArray = document.querySelectorAll('#toggleswitch');
  inputArray.forEach(function (inputs) {
    inputs.addEventListener('change', function (input) {
      let inputTitle = input.target.parentElement.parentElement.firstElementChild.textContent;
      WMSboundaries.getLayers().forEach(function (item) {
        let wmsTitle = item.get("title");
        if (wmsTitle === inputTitle && input.target.checked == true) {
          
          item.setVisible(true);
        } else if (wmsTitle === inputTitle && input.target.checked == false) {
          item.setVisible(false);
        }
      });
    });
  });
}

boundaryOnOff();


