mapboxgl.accessToken = 'pk.eyJ1IjoiYm9yZG5lcndsZWkiLCJhIjoiY2lyZjd1a2tyMDA3dmc2bmtkcjUzaG5meCJ9.eswxCZSAnob59HR0wEaTpA';
	
var map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/bordnerwlei/cirf7wsrr0003g8nlogxrqxyr',
	center: [-89.5, 44.5],
	zoom: 6,
	preserveDrawingBuffer: false,
	hash: true
});
	
map.addControl(new mapboxgl.Navigation());
	
var geocoder = new mapboxgl.Geocoder({
	container: 'geocoder-container'
});
	
map.addControl(geocoder);
	
map.on('load', function () {
		
	addMapSources();
		
	addCountyInitial();
		
	var popup = new mapboxgl.Popup({
		closeButton: false,
		closeOnClick: false
	});
	
	map.on('mousemove', function(e) {
		var features = map.queryRenderedFeatures(e.point, { layers: hoverLayers });
			
		if (features.length && features[0].layer.id == "county-fills") {
			map.setFilter("county-hover", ["==", "COUNTY_NAM", features[0].properties.COUNTY_NAM]);
		} else if (features.length && features[0].layer.id != "county-fills") {
			var holdID = features[0].layer.id;
			console.log(holdID);
			console.log(features);
			/* OBJECTID */
		} else {
			map.setFilter("county-hover", ["==", "COUNTY_NAM", ""]);
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
		} else {
			popup.setLngLat(e.lngLat)
				.setHTML(feature.properties.Cov1)
				.addTo(map);
		}
	});
		
	map.on ('mouseout', function() {
			map.setFilter("county-hover", ["==", "COUNTY_NAM", ""]);
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
				
			map.setFilter("county-fills", ["!=", "COUNTY_NAM", feature.properties.COUNTY_NAM]);
					
			determineClick(feature);
		} else if (features.length && feature.layer.id != "county-fills") {
			var randomPitch = Math.floor((Math.random() * 40) + 25);
			map.flyTo({
				center: e.lngLat,
				zoom: 13,
				pitch: randomPitch,
				around: e.lngLat,
				animate: true
			});
			document.getElementById("pitch").value = 35;
		} else {
			
		}
					
	});
	
	map.on ('render', function() {
		if (getCanvasControl == true) {
			data = map.getCanvas().toDataURL("image/png");
			return data;
		} else {
			return;
		}
	});
});
	
geocoder.on('result', function(ev) {
	map.getSource('single-point').setData(ev.result.geometry);
});