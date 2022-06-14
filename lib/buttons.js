// layers humberger button on-off
function layerHamburgerBtn() {
  document
    .getElementById("layer-toggle")
    .addEventListener("click", function () {
      var layersDiv = document.querySelector(".layers");
      var mapWidth = document.getElementById("map");
      var basemapBox = document.getElementById("basemap-container");
      var boundary = document.querySelector(".boundary");
      if (layersDiv.style.display === "flex") {
        layersDiv.style.display = "none";
        mapWidth.style.width = "100vw";
        basemapBox.style.left = "10px";
        boundary.style.width = "100vw";
      } else {
        layersDiv.style.display = "flex";
        var mapWidth = document.getElementById("map");
        mapWidth.style.width = "calc(100vw - 300px)";
        basemapBox.style.left = "310px";
        boundary.style.width = "calc(100vw - 300px)";
        boundary.style.right = "0";
      }
    });
}
layerHamburgerBtn();

// Layers' subclass on-off
function subclassOnOff() {
  document.querySelectorAll(".top-layer").forEach((layer) => {
    layer.addEventListener("click", function (e) {
      var subDiv = layer.nextElementSibling;
      if (e.target.tagName !== "INPUT") {
        if (subDiv.style.display === "flex") {
          subDiv.style.display = "none";
        } else {
          subDiv.style.display = "flex";
        }
      }
    });
  });
}
subclassOnOff();

// layers input items clicked-unclicked
function inputClickedUnclicked() {
  document.querySelectorAll(".top-layer").forEach((element) => {
    element.addEventListener("change", function (e) {
      if (e.target.tagName == "INPUT") {
        if (e.target.checked == true) {
          var subLayer = e.target.parentNode.nextElementSibling.children;
          var count = subLayer.length;
          for (var i = 0; i < count; i++) {
            var result = subLayer[i];
            var clicked = result.lastElementChild;
            clicked.checked = true;
          }
        } else if (e.target.checked == false) {
          var subLayer = e.target.parentNode.nextElementSibling.children;
          var count = subLayer.length;
          for (var i = 0; i < count; i++) {
            var result = subLayer[i];
            var clicked = result.lastElementChild;
            clicked.checked = false;
          }
        }
      }
    });
  });
}
inputClickedUnclicked();

// search box event
function searchEvent() {
  let entry = this.value.toLowerCase();
  let layerNames = document.querySelectorAll(".sub-layers p");
  layerNames.forEach((p) => {
    let pText = p.textContent.toLowerCase();
    let index = pText.indexOf(entry);
    if (index !== -1) {
      p.parentNode.parentNode.style.display = "flex";
      p.parentNode.style.display = "flex";
    } else if (index <= layerNames.length) {
      p.parentNode.style.display = "none";
    }
  });
  if (entry == "") {
    layerNames.forEach((p) => {
      p.parentNode.parentNode.style.display = "none";
    });
  }
}

document.getElementById("layer-search").addEventListener("keyup", searchEvent);

class iFrameUI{
  onOffAnimation(){
    let button = document.querySelector('.download-pdf i');
    button.addEventListener('click',function(a){
      if(a.target.className == "fa-solid fa-angle-down fa-xl"){
        a.target.className = "fa-solid fa-angle-up fa-xl";
      }
      else{
        a.target.className = "fa-solid fa-angle-down fa-xl";
      }
    })
  }
}

let iframe = new iFrameUI();
iframe.onOffAnimation();