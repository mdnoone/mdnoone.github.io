
// bordner account mapbox gl access token
mapboxgl.accessToken = 'pk.eyJ1IjoiYm9yZG5lcndsZWkiLCJhIjoiY2lyZjd1a2tyMDA3dmc2bmtkcjUzaG5meCJ9.eswxCZSAnob59HR0wEaTpA';

// variable to initiate map
var map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/bordnerwlei/cirf7wsrr0003g8nlogxrqxyr', //this style is important, contains layer files referenced in code
	center: [-88.0198, 44.5192],
	zoom: 9,
	preserveDrawingBuffer: false,
	hash: false,
	pitch: 0.1 // pitch set to 0.1 is important, on some computers if not set map will not display
});


// disable map rotation using right click + drag
map.dragRotate.disable();

// disable map rotation using touch rotation gesture
map.touchZoomRotate.disableRotation();


/* EXPERIMENTAL, KEPT FOR POSSIBLE FUTURE USE*/
/*
var draw = mapboxgl.Draw({
	drawing: true,
	displayControlsDefault: false,
	controls: {
		polygon: true,
		trash: true
	}
});

map.addControl(draw);

var calcButton = document.getElementById('calculate');
calcButton.onclick = function() {
	var data = draw.getAll();
	
	console.log(data.features[0]);
	
	console.log(ptsWithin);

};
*/

/*
map.addControl(new mapboxgl.Navigation());
*/

/*
var geocoder = new mapboxgl.Geocoder({
	container: 'geocoder-container'
});
*/

/*
map.addControl(geocoder);
*/

	
map.on('load', function () {
	//call to function in define.js
	addMapSources();
	
	//call to function in define.js
	addCountyInitial();
	
	//hide layers on startup that we don't want visible - for performance purposes
	map.setLayoutProperty('pointMerge', 'visibility', 'none');
	map.setLayoutProperty('lineMerge', 'visibility', 'none');
	
	//color points according to attribute
	map.setPaintProperty('pointMerge', 'circle-color', {
		property: 'Point_Type',
		type: 'categorical',
		stops: [
			['C', '#E6B0AA'],
			['CF', '#D2B4DE'],
			['CH', '#A9CCE3'],
			['CR', '#A2D9CE'],
			['E', '#ABEBC6'],
			['F/G', '#F9E79F'],
			['FB', '#EDBB99'],
			['FF', '#CD6155'],
			['FT', '#E59966'],
			['GC', '#28B463'],
			['GL', '#FADBD8'],
			['GP', '#EB984E'],
			['H', '#F4D03F'],
			['O', '#58D68D'],
			['OH', '#AED6F1'],
			['OSCH', '#5499C7'],
			['Qu', '#AF7AC5'],
			['S', '#EC7063'],
			['SH', '#F5CBA7'],
			['SL', '#FAD7A0'],
			['SP', '#A9DFBF'],
			['T', '#A3E4D7'],
			['TH', '#AED6F1'],
			['U', '#D7BDE2'],
			['VH', '#F5B7B1']]
	});
	
	//color lines according to attribute
	map.setPaintProperty('lineMerge', 'line-color', {
		property: 'Line_Type',
		type: 'categorical',
		stops: [
			['ARR', '#F5B7B1'],
			['BL', '#D7BDE2'],
			['CB', '#58D68D'],
			['DD', '#FAD7A0'],
			['FL', '#EC7063'],
			['HR', '#ABEBC6'],
			['I', '#AED6F1'],
			['ID', '#EB984E'],
			['IG', '#E6B0AA'],
			['PL', '#A2D9CE'],
			['R', '#5499C7'],
			['RR', '#F9E79F'],
			['TL', '#E8F8F5'],
			['TR', '#EAFAF1'],
			['U', '#FDEDEC'],
			['UD', '#F5EEF8'],
			['UG', '#F9EBEA']]
	});
	
	
		
	var popup = new mapboxgl.Popup({
		closeButton: false,
		closeOnClick: false
	});
	
	map.on('mousemove', function(e) {
		var features = map.queryRenderedFeatures(e.point, { layers: hoverLayers });
			
		if (features.length && features[0].layer.id == "county-fills") {
			console.log(features[0].layer.id);
		} else if (features.length && features[0].layer.id != "county-fills") {
			var holdID = features[0].layer.id; // ???
		} else {

		}
			
		map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
			
		if (!features.length) {
			popup.remove();
			return;
		}
		
		var feature = features[0];
			
		if (feature.layer.id == "county-fills") {
			popup.setLngLat(e.lngLat)
				.setHTML(feature.properties.COUNTY_NAM)
				.addTo(map);
		} else if (feature.layer.id != "county-fills" && feature.layer.type != "circle" && feature.layer.type != "line") {
			findLongCoverName(feature);
			
			var textInPopUp = feature.properties.Cov1 + ": " + hoveredCountyLandcover + "<br>" + "Min Diam: " + feature.properties.MinDiam1 +
			" in" + "<br>" + "Max Diam: " + feature.properties.MaxDiam1 + " in" + "<br>" + "Density: " + feature.properties.Den1 + "<br>" + 
			"Density values are ranked from 1-4," + "<br>" + "1 having the highest density," + "<br>" + "to 4 having the lowest density.";
			popup.setLngLat(e.lngLat)
				.setHTML(textInPopUp)
				.addTo(map);
		} else if (feature.layer.type == "circle") {
			findLongPointName(feature);
			popup.setLngLat(e.lngLat)
				.setHTML(feature.properties.Point_Type + ": " + hoveredCountyPoint + "<br>" + "Number of Houses: " + feature.properties.Num_of_Hou + 
				"<br>" + "Distance to Road: " + feature.properties.Dis_to_Roa)
				.addTo(map);
		} else if (feature.layer.type == "line") {
			findLongLineName(feature);
			popup.setLngLat(e.lngLat)
				.setHTML(feature.properties.Line_Type + ": " + hoveredCountyLine)
				.addTo(map);
		}
	});
		
	map.on ('mouseout', function() {
			
	});
		
	map.on ('click', function(e) {
		var features = map.queryRenderedFeatures(e.point, { layers: hoverLayers });
		
		var feature = features[0];
		
		if (features.length && feature.layer.id == "county-fills") {
			map.flyTo({
				center: e.lngLat,
				zoom: 8
			});
			
			document.getElementById("currentCountyBox").innerHTML = feature.properties.COUNTY_NAM + " Hello!";
					
			determineClick(feature);
		} else if (features.length && feature.layer.id != "county-fills") {
			var randomPitch = Math.floor((Math.random() * 40) + 30);
			if (threeDControl == true) {
				map.flyTo({
					center: e.lngLat,
					zoom: 13,
					pitch: randomPitch,
					around: e.lngLat,
					animate: true
				});
				/*document.getElementById("pitch").value = 35;*/
			} else if (threeDControl == false) {
				map.flyTo({
					center: e.lngLat,
					zoom: 13,
					around: e.lngLat,
					animate: true
				});
			}
		} else {
			
		}
					
	});
	/*
	map.on ('render', function() {
		if (getCanvasControl == true) {
			data = map.getCanvas().toDataURL("image/png");
			return data;
		} else {
			return;
		}
	});
	*/
});
	
/*
geocoder.on('result', function(ev) {
	map.getSource('single-point').setData(ev.result.geometry);
});
*/

function findLongCoverName(source) {
	var b;
	for (b=0; b < combinationLayers.length; b++) {
		if (source.properties.Cov1 == combinationLayers[b][0]) {
			hoveredCountyLandcover = combinationLayers[b][2];
		}
	}
	return hoveredCountyLandcover;
};

function findLongPointName(source) {
	var b;
	for (b=0; b < pointLayers.length; b++) {
		if (source.properties.Point_Type == pointLayers[b][0]) {
			hoveredCountyPoint = pointLayers[b][1];
		}
	}
	return hoveredCountyPoint;
};

function findLongLineName(source) {
	var b;
	for (b=0; b < lineLayers.length; b++) {
		if (source.properties.Line_Type == lineLayers[b][0]) {
			hoveredCountyLine = lineLayers[b][1];
		}
	}
	return hoveredCountyLine;
};