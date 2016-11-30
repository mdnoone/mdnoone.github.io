// Instantiate some variables to be used later

function fetchHeader(url, wch) {
    try {
        var req=new XMLHttpRequest();
        req.open("HEAD", url, false);
        req.send(null);
        if(req.status== 200){
            return req.getResponseHeader(wch);
        }
        else return false;
    } catch(er) {
        return er.message;
    }
}
var updateLast = "04/04/16"
var date = new Date((fetchHeader('00_Data/ModelOutputData/ProgressFinal.dbf','Last-Modified')));
updateLast = ((date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear());
var geojson;
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function detectMobile() {
   if(window.innerWidth <= 800 && window.innerHeight <= 600) {
     return true;
   } else {
     return false;
   }
}
isItMobile = detectMobile();
var southWest = L.latLng(42.301420, -95.451081),  
    northEast = L.latLng(47.016127, -83.751573),
    bounds = L.latLngBounds(southWest, northEast);
	
if (isItMobile == false){
	if (embedded){ 
		var map = L.map('map', {
         // maxBounds: bounds,
		  minZoom: 7,
		  // true by default, false if you want a wild map
          sleep: true,
          // time(ms) for the map to fall asleep upon mouseout
          sleepTime: 2500,
          // time(ms) until map wakes on mouseover
          wakeTime: 750,
          // defines whether or not the user is prompted oh how to wake map
          sleepNote: true,
          // should hovering wake the map? (clicking always will)
          hoverToWake: false,
          // opacity (between 0 and 1) of inactive map
          sleepOpacity: .6
      }).setView([44.785734,-89.837036], 7);
	}else{
		var map = L.map('map',{
			//maxBounds: bounds,
			minZoom: 7
		}).setView([44.785734,-89.837036], 7);	
	}
}else{
	document.getElementById('map').setAttribute("style","height:500px");
	southWest = L.latLng(38.301420, -95.451081),  
    northEast = L.latLng(53.016127, -83.751573),
	bounds = L.latLngBounds(southWest, northEast)
	if (embedded){ 
		var map = L.map('map', {
          //maxBounds: bounds,
		  minZoom: 6,
		  // true by default, false if you want a wild map
          sleep: false,
          // time(ms) for the map to fall asleep upon mouseout
          sleepTime: 750,
          // time(ms) until map wakes on mouseover
          wakeTime: 750,
          // defines whether or not the user is prompted oh how to wake map
          sleepNote: true,
          // should hovering wake the map? (clicking always will)
          hoverToWake: false,
          // opacity (between 0 and 1) of inactive map
          sleepOpacity: .6
      }).setView([46.785734,-89.837036], 6);
	}else{
		var map = L.map('map',{
			//maxBounds: bounds,
			minZoom: 6
		}).setView([44.785734,-89.837036], 6);	
	}
}


var tonerUrl = "http://{S}tile.stamen.com/toner-background/{Z}/{X}/{Y}.png";
var labelUrl = "http://{S}tile.stamen.com/toner-labels/{Z}/{X}/{Y}.png";
var url = tonerUrl.replace(/({[A-Z]})/g, function(s) {
    return s.toLowerCase();
});
var url2 = labelUrl.replace(/({[A-Z]})/g, function(s) {
    return s.toLowerCase();
});
 
var basemap = L.tileLayer(url, {
    subdomains: ['','a.','b.','c.','d.'],
    minZoom: 0,
    maxZoom: 20,
    type: 'png',
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>'
});
basemap.setOpacity(0.25);
basemap.addTo(map);

// control that shows state info on hover
if (isItMobile == false){
    var actionVar = "Hover over"
}else{
	var actionVar = "Tap on"
}
	var info = L.control();

	info.onAdd = function (map) {
		this._div = L.DomUtil.create('div', 'info');
		this.update();
		return this._div;
	};
	/*info.updateNot = function (props) {
		this._div.innerHTML = (
		props ?
			'<b>' + props.name + " "+ props.type2 + '</b><br />' + " Digitized: No" + '</b><br />' +" " + '</sup>'
			: actionVar + ' an area.'
		);
	};*/
	info.update = function (props) {
		this._div.innerHTML = (
		props ?
			'DTR: <b>' + checkFND(props.DTR) + '</b> ('+ checkFND(props.COUNTY_NAM) +" County) " + '<br />' + " Digitized: <b>" + checkFND(props.Digitized) +'</b> (by: '+ checkFND(props.Digitizer) +')<br />' +" Date digitized: <b>" + checkFND(props.Digitizati) + '</b></sup>'
			: actionVar + ' an area.'
		);
	};
	
function checkFND(value_in){
	if (value_in == ""){
		return "n/a"
	}else{
		return ""+value_in+""
	}
}
// get color depending on value
/*function getColor(d) {
	return d == "No"  ? '#2E6DA4' :  //Not submitted
		   d == "Not Available"  ? '#D1D1E0' :  //Not available
	       d == "Yes"  ? '#F0C419' :  //Submitted
	                  '#FFFFFF';
}*/
function getColor(d_in) {
	var d =  d_in.substr(d_in.length - 4);
	//console.log(d)
	return d == "2016"  ? '#e68079' : 
		   d == "2015"  ? '#7cd3fb' : 
		   d == "2014"  ? '#c8efc9' : 
		   d == "2008"  ? '#f5da88' : 
	                  '#f5da88';
}
// get color depending on value
function getOpacity(d) {
	return d == "No"  ? 0.01 :  //Not submitted
		   d == "Not Available"  ? 0.7 :  //Not available
	       d == "Yes"  ? 0.7 :  //Submitted
	                  0.7;
}

// Custom Stripes.
var stripes = new L.StripePattern({
	patternContentUnits: 'objectBoundingBox',
	patternUnits: 'objectBoundingBox',
	weight: 0.15,
	spaceWeight: 0.25,
	height: 0.4,
	angle: -45
});
stripes.addTo(map);

function style(feature) {
	//console.log(feature)
	return {
		weight: 0.75,
		opacity: 1,
		color: 'white',
		fillOpacity: getOpacity(feature.properties.Digitized),
		fillColor: getColor(feature.properties.Digitizati)
	};
}
function styleCounty(feature) {
	//console.log(feature)
	return {
		weight: 0.75,
		opacity: 1,
		color: 'black',
		fillOpacity: 0,
		fillColor: false
	};
}

function highlightFeature(e) {
	var layer = e.target;
	
	if (isItMobile == true){
		geojson.eachLayer(function(marker) {
			geojson.resetStyle(marker);
		})
	}
    formerlyEngagedObject = layer

	layer.setStyle({
		fillOpacity: 0.25
	});
	
	//if (!L.Browser.ie && !L.Browser.opera) {
	//	layer.bringToFront();
	//}
	
	//if(layer.feature.properties.Digitized == "Yes"){
		info.update(layer.feature.properties);
	//}else{
	//	info.updateNot(layer.feature.properties);
	//}
}

function resetHighlight(e) {
	geojson.resetStyle(e.target);
	info.update();
}

function zoomToFeature(e) {
	map.fitBounds(e.target.getBounds());
}

var ii = 0;
var att = 0;
var ptl = 0;
var ttl = 0;
function csf(feature) {
	if ((feature.properties.Digitized == "Yes")/*&&(feature.properties.type2 == "County")*/){
		ii++
	}
	if ((feature.properties.Attribut_1 == "Yes")/*&&(feature.properties.type2 == "County")*/){
		att++
	}
	if ((feature.properties.PointLine_ == "Yes")/*&&(feature.properties.type2 == "County")*/){
		ptl++
	}
	ttl++
}
var markerGroup = L.layerGroup();
var hashGroup = L.layerGroup();
var geojsonGroup = L.layerGroup();
var geojsonCountyGroup = L.layerGroup();
function onEachFeature(feature, layer) {
	csf(feature);
	if (isItMobile == false){
		layer.on({
			mouseover: highlightFeature,
			mouseout: resetHighlight//,
			//click: zoomToFeature
		});
	}else{
		layer.on({
			click: highlightFeature
		});	
	}
	if(feature.properties.PointLine_){
		//L.marker(layer.getBounds().getCenter()).addTo(map);
		var xyCoord = feature.geometry.coordinates[0]
		var xyCoord2 = []
		for (var i = 0; i < xyCoord.length; i++) {
			var xyCoordVert = [xyCoord[i][1],xyCoord[i][0]]
			xyCoord2.push(xyCoordVert)
		}
		 L.polygon(xyCoord2, {
            fillPattern: stripes,
            stroke: false,
            fillOpacity: 0.7,
			className: 'over-ride-stuff'
         }).addTo(hashGroup);
	}
	if(feature.properties.Attribut_1){
		//L.marker(layer.getBounds().getCenter()).addTo(map);
		 L.circleMarker(layer.getBounds().getCenter(), {
			 radius: 2,
			 fillColor: "#000000",
			 //color: "#000",
			 weight: 0,
			 //opacity: 1,
			 fillOpacity: 0.8
         }).addTo(markerGroup);
	}
}

map.attributionControl.addAttribution('');


var legend = L.control({position: 'topright'});

legend.onAdd = function (map) {

	var div = L.DomUtil.create('div', 'info legend'),
		grades = ["2016","2015","2014","2008"],
		labelLabel = ["2016","2015","2014","2008"],
		labels = [],
		from, to;

	for (var i = 0; i < grades.length; i++) {
		from = grades[i];
		labels.push(
			'<i style="background:' + getColor(from) + '"></i> ' + labelLabel[i]);
	}
	labels.push('<i><img src="02_Images/point.png" height="18" width="18"></img></i> ' + "Attributed");
	labels.push('<i><img src="02_Images/hash.png" height="18" width="18"></img></i> ' + "PointLine");
	div.innerHTML = '<h4>Digitized Townships:</h4>' + labels.join('<br>') + '<div style="font-size: 8pt;">' + numberWithCommas(ii) + " Townships Digitized (" + Math.round((ii/ttl)*100) +"%)"+ '</div>'+ '<div style="font-size: 8pt;">' + numberWithCommas(att) + " Townships Attributed (" + Math.round((att/ttl)*100) +"%)"+ '</div>'+ '<div style="font-size: 8pt;">' + numberWithCommas(ptl) + " Completed PointLine (" + Math.round((ptl/ttl)*100) +"%)"+ '</div>'+ '<div style="font-size: 8pt; font-style:italic;">' + "Progress data last updated: " + updateLast + '</div>'; //updateLast
	return div;
};


/*geojson = L.geoJson(statesData, {
	style: style,
	onEachFeature: onEachFeature
}).addTo(map);*/

var geojson = new L.Shapefile('00_Data/ModelOutputData/ProgressFinal', {
	style: style,
	onEachFeature: onEachFeature
});

var geojsonCounty = new L.Shapefile('00_Data/ModelOutputData/WisconsinCounties', {
	style: styleCounty,
	className: 'over-ride-stuff'
});

geojson.addTo(geojsonGroup);
geojsonCounty.addTo(geojsonCountyGroup);
geojson.once("data:loaded", function() {
	console.log("finished loading shapefile");
	$(".loader-holder").css("display","none");
	legend.addTo(map);
	//if (isItMobile == false){		
		info.addTo(map);
	//}
	geojsonGroup.addTo(map);
	hashGroup.addTo(map);
	markerGroup.addTo(map);
	geojsonCountyGroup.addTo(map);
});

var topPane = map._createPane('leaflet-top-pane', map.getPanes().mapPane);
var topLayer = L.tileLayer(url2, {
    subdomains: ['','a.','b.','c.','d.'],
    minZoom: 0,
    maxZoom: 20,
    type: 'png'
}).addTo(map);

topPane.appendChild(topLayer.getContainer());
topLayer.setZIndex(7);