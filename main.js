var map= L.map("map",{
    measureControl: true,
    center: [43.60, 1.43],
    zoom: 10
});

var OpenStreetMap_HOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
}).addTo(map);


  
var mwsurl = 'https://www.geotests.net/geoserver/wms'

var mylayer = L.tileLayer.wms(mwsurl,{
    layers: 'JorgeVilla:Serie_MultiTemp_S2_ndvi_vf',
    format: 'image/png',
    transparent: true,
}).addTo(map);


L.control.scale({ position: 'bottomright' }).addTo(map);
var worldMiniMap = L.control.worldMiniMap({position: 'topright', style: {opacity: 0.9, borderRadius: '0px', backgroundColor: 'lightblue'}}).addTo(map);


map.on("click",function(e){
    console.log(e.latlng);

    var url = `${mwsurl}?
    request=GetFeatureInfo
    &service=WMS
    &version=1.1.1
    &layers=JorgeVilla:Serie_MultiTemp_S2_ndvi_vf
    &styles=
    &srs=EPSG%3A4326
    &format=image%2Fpng
    &bbox=${map.getBounds().toBBoxString()}
    &width=${map.getSize().x}
    &height=${map.getSize().y}
    &query_layers=JorgeVilla:Serie_MultiTemp_S2_ndvi_vf
    &info_format=application/json
    &feature_count=50
    &x=${map.latLngToContainerPoint(e.latlng).x}
    &y=${map.latLngToContainerPoint(e.latlng).y}
    &exceptions=application%2Fvnd.ogc.se_xml`
    
    
console.log(url);


axios.get(`${mwsurl}?
request=GetFeatureInfo
&service=WMS
&version=1.1.1
&layers=JorgeVilla:Serie_MultiTemp_S2_ndvi_vf
&styles=
&srs=EPSG%3A4326
&format=image%2Fpng
&bbox=${map.getBounds().toBBoxString()}
&width=${map.getSize().x}
&height=${map.getSize().y}
&query_layers=JorgeVilla:Serie_MultiTemp_S2_ndvi_vf
&info_format=application/json
&feature_count=50
&x=${map.latLngToContainerPoint(e.latlng).x}
&y=${map.latLngToContainerPoint(e.latlng).y}
&exceptions=application%2Fvnd.ogc.se_xml`).then(function(response){
    var jsonreponse = response.data;
    var data1 = jsonreponse.features[0].properties.RED_BAND;
    var data2 = jsonreponse.features[0].properties.GREEN_BAND;
    var data3 = jsonreponse.features[0].properties.BLUE_BAND;

    L.popup().setLatLng(e.latlng).setContent('NDVI <br />31/03/21: '+ data1+'<br />19/07/21: '+data2+'<br />25/01/22: '+data3+'</p>').openOn(map);
  

})

});


