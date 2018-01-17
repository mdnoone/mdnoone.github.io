
var geoC = (function() {
	// declare variables
	var geocoderControl = false;
	var titleText = "Enter Your Address";
	var loaderText = "Loading...";
	var subText = "";
	var errorText = "The address you have chosen is not valid, please enter a new address.";
	
	// create and connect to map
	mapboxgl.accessToken = 'pk.eyJ1IjoiYm9yZG5lcndsZWkiLCJhIjoiY2lyZjd1a2tyMDA3dmc2bmtkcjUzaG5meCJ9.eswxCZSAnob59HR0wEaTpA';
	var map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/bordnerwlei/cizepw2le005h2so39v1oa0i1',
		center: [-89.4012, 43.0731],
		zoom: 13,
		pitch: 0.1
	});
			
	// create and assign title
	var myTitle = document.createElement("h1");
	myTitle.innerHTML = titleText;
	$(myTitle).appendTo("#myContainer");
	
	// create and assign sub text
	var mySubText = document.createElement("p");
	mySubText.innerHTML = subText;
	$(mySubText).appendTo("#myContainer");
	
	// create geocoder
	var geocoder = new MapboxGeocoder({
		accessToken: mapboxgl.accessToken
	});
	
	// add geocoder 
	map.addControl(geocoder);
	
	// remove and append geocoder
	$('.mapboxgl-ctrl-geocoder').detach().appendTo('#myContainer');
	
	// assign geocoder
	$('.mapboxgl-ctrl-geocoder').attr("id", "myGeocoder");
	
	// create and assign line
	var myLine = document.createElement("hr");
	$(myLine).appendTo("#myContainer");
	
	// create and assign loading text
	var myLoader = document.createElement("h3");
	myLoader.setAttribute("id", "loadText");
	myLoader.innerHTML = loaderText;
	$(myLoader).appendTo("#myContainer");
	
	// ensures map has loaded before continuing
	map.on('load', function() {
		// add polygon layer
		map.addLayer({
			'id': 'programs',
			'type': 'fill',
			'source': {
				'type': 'geojson',
				'data': 'programs.geojson'
			},
			'layout': {},
			'paint': {
				'fill-color': 'black',
				'fill-opacity': 0.5
			}
		});
		
		// add point source
		map.addSource('single-point', {
			"type": "geojson",
			"data": {
				"type": "FeatureCollection",
				"features": []
			}
		});
		
		// add point layer
		map.addLayer({
			"id": "point",
			"source": "single-point",
			"type": "circle",
			"paint": {
				"circle-radius": 5,
				"circle-color": "#007cbf"
			}
		});

		// Listen for the `geocoder.input` event
		geocoder.on('result', function(ev) {
			// add point to map where searched
			map.getSource('single-point').setData(ev.result.geometry);
			// display loading visual
			myLoader.style.visibility = "visible";
			// retrieve and remove all classes with 'gonnaRemove'
			var para = document.getElementsByClassName('gonnaRemove');
			while (para[0]) {
				para[0].parentNode.removeChild(para[0]);
			}
			
			// Set timer to ensure loading
			window.setTimeout(function() {
				// control to not run twice
				//if (geocoderControl == false) {
					//geocoderControl = true;
				myLoader.style.visibility = "hidden";
				var features = map.queryRenderedFeatures(ev.result.geometry.coordinates, { layers: ['programs'] });
				var layer = features[0];
				/*
				var poly = turf.polygon([[
					[-81, 41],
					[-81, 47],
					[-72, 47],
					[-72, 41],
					[-81, 41]
				]]);
				try {
					var isInside = turf.inside(ev.result.geometry, poly);
				} catch(err) {
					console.log(err);
				}
				*/
					
				// call function with property parameters
				try {
					if (geocoderControl == false) {
						addAndPopulateLinks(layer.properties.ATT, layer.properties.CenturyLin, 
							layer.properties.Charter, layer.properties.Comcast, layer.properties.Frontier, 
							layer.properties.Mediacom, layer.properties.Midco, layer.properties.Sprint, 
							layer.properties.Lifeline);
						geocoderControl = true;
					}
				} catch(err) {
					if (geocoderControl == false) {
						catchUndefinedLayer(err);
						geocoderControl = true;
					}
					
				}
				//}
			}, 3000);		
		});
	});
	
	// function to add and populate links
	function addAndPopulateLinks(ATT, CenturyLin, Charter, Comcast, Frontier, Mediacom, Midco, Sprint, Lifeline) {

		// create links
		var link1 = document.createElement("a");
		var link2 = document.createElement("a");
		var link3 = document.createElement("a");
		var link4 = document.createElement("a");
		var link5 = document.createElement("a");
		var link6 = document.createElement("a");
		var link7 = document.createElement("a");
		var link8 = document.createElement("a");
		var link9 = document.createElement("a");
		
		// create breaks
		var break1 = document.createElement("br");
		var break2 = document.createElement("br");
		var break3 = document.createElement("br");
		var break4 = document.createElement("br");
		var break5 = document.createElement("br");
		var break6 = document.createElement("br");
		var break7 = document.createElement("br");
		var break8 = document.createElement("br");
		
		// attribute links with 'gonnaRemove' class
		link1.setAttribute("class", "gonnaRemove");
		link2.setAttribute("class", "gonnaRemove");
		link3.setAttribute("class", "gonnaRemove");
		link4.setAttribute("class", "gonnaRemove");
		link5.setAttribute("class", "gonnaRemove");
		link6.setAttribute("class", "gonnaRemove");
		link7.setAttribute("class", "gonnaRemove");
		link8.setAttribute("class", "gonnaRemove");
		link9.setAttribute("class", "gonnaRemove");
		
		// attribute breaks with 'gonnaRemove' class
		break1.setAttribute("class", "gonnaRemove");
		break2.setAttribute("class", "gonnaRemove");
		break3.setAttribute("class", "gonnaRemove");
		break4.setAttribute("class", "gonnaRemove");
		break5.setAttribute("class", "gonnaRemove");
		break6.setAttribute("class", "gonnaRemove");
		break7.setAttribute("class", "gonnaRemove");
		break8.setAttribute("class", "gonnaRemove");
		
		// attribute links with blank target for opening in new tab
		link1.setAttribute("target", "_blank");
		link2.setAttribute("target", "_blank");
		link3.setAttribute("target", "_blank");
		link4.setAttribute("target", "_blank");
		link5.setAttribute("target", "_blank");
		link6.setAttribute("target", "_blank");
		link7.setAttribute("target", "_blank");
		link8.setAttribute("target", "_blank");
		link9.setAttribute("target", "_blank");
		
		// check if properties has link
		if (ATT != "No discount program") {
			link1.setAttribute("href", ATT);
			link1.innerHTML = "<b>ATT: </b>" + ATT;
		} else {
			link1.innerHTML = "<b>ATT: </b>No discount program";
			link1.setAttribute("class", "noLink gonnaRemove");
		}
		
		if (CenturyLin != "No discount program") {
			link2.setAttribute("href", CenturyLin);
			link2.innerHTML = "<b>CenturyLin: </b>" + CenturyLin;
		} else {
			link2.innerHTML = "<b>CenturyLin: </b>No discount program";
			link2.setAttribute("class", "noLink gonnaRemove");
		}
		
		if (Charter != "No discount program") {
			link3.setAttribute("href", CharterCo);
			link3.innerHTML = "<b>Charter: </b>" + CharterCo;
		} else {
			link3.innerHTML = "<b>Charter: </b>No discount program";
			link3.setAttribute("class", "noLink gonnaRemove");
		}
		
		if (Comcast != "No discount program") {
			link4.setAttribute("href", Comast);
			link4.innerHTML = "<b>Comcast: </b>" + Comcast;
		} else {
			link4.innerHTML = "<b>Comcast: </b>No discount program";
			link4.setAttribute("class", "noLink gonnaRemove");
		}
		
		if (Frontier != "No discount program") {
			link5.setAttribute("href", FrontierC);
			link5.innerHTML = "<b>Frontier: </b>" + FrontierC;
		} else {
			link5.innerHTML = "<b>Frontier: </b>No discount program";
			link5.setAttribute("class", "noLink gonnaRemove");
		}
		
		if (Mediacom != "No discount program") {
			link6.setAttribute("href", Mediacom);
			link6.innerHTML = "<b>Mediacom: </b>" + Mediacom;
		} else {
			link6.innerHTML = "<b>Mediacom: </b>No discount program";
			link6.setAttribute("class", "noLink gonnaRemove");
		}
		
		if (Midco != "No discount program") {
			link7.setAttribute("href", Midco);
			link7.innerHTML = "<b>Midco: </b>" + Midco;
		} else {
			link7.innerHTML = "<b>Midco: </b>No discount program";
			link7.setAttribute("class", "noLink gonnaRemove");
		}
		
		if (Sprint != "No discount program") {
			link8.setAttribute("href", Sprint);
			link8.innerHTML = "<b>Sprint: </b>" + Sprint;
		} else {
			link8.innerHTML = "<b>Sprint: </b>No discount program";
			link8.setAttribute("class", "noLink gonnaRemove");
		}
		
		if (Lifeline != "No discount program") {
			link9.setAttribute("href", Lifeline);
			link9.innerHTML = "<b>Lifeline: </b>" + Lifeline;
		} else {
			link9.innerHTML = "<b>Lifeline: </b>No discount program";
			link9.setAttribute("class", "noLink gonnaRemove");
		}
		
		
		// append links and breaks to container
		$(link1).appendTo("#myContainer");
		$(break1).appendTo("#myContainer");
		$(link2).appendTo("#myContainer");
		$(break2).appendTo("#myContainer");
		$(link3).appendTo("#myContainer");
		$(break3).appendTo("#myContainer");
		$(link4).appendTo("#myContainer");
		$(break4).appendTo("#myContainer");
		$(link5).appendTo("#myContainer");
		$(break5).appendTo("#myContainer");
		$(link6).appendTo("#myContainer");
		$(break6).appendTo("#myContainer");
		$(link7).appendTo("#myContainer");
		$(break7).appendTo("#myContainer");
		$(link8).appendTo("#myContainer");
		$(break8).appendTo("#myContainer");
		$(link9).appendTo("#myContainer");
		
		// set timer to allow function to run again
		window.setTimeout(function() {
			geocoderControl = false;
		}, 4000);
	};
	
	function catchUndefinedLayer(err) {
		var myErrorText = document.createElement("h3");
		myErrorText.setAttribute("class", "gonnaRemove");
		myErrorText.innerHTML = errorText + ": " + err;
		$(myErrorText).appendTo("#myContainer");
		// set timer to allow function to run again
		window.setTimeout(function() {
			geocoderControl = false;
		}, 4000);
	};
	
})();