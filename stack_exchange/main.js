var geoC = (function() {
	// declare variables
	var geocoderControl = false;
	var titleText = "Internet Discount Finder";
	var subText = "Enter your address to search for available programs.";	// optional text for sub title
	
	var subText = "<center>Contact the State Broadband Office</center>";
	document.write("<p>" + subText.link("https://psc.wi.gov/Pages/Programs/BroadbandTeam.aspx") + "</p>");
	var subText = "<p>Internet providers offer an array of discounted internet subscriptions based upon a variety of factors such as income, participation in Free and Reduced Cost Lunch programs, housing assistance, veteran status, Medicaid, Supplementary Security Income and more. <br>" +
	"<br>The Wisconsin State Broadband Office has developed a tool to help identify programs available based upon location. <br>" +
	"<br><b> Enter your address to search for available programs. Data is current as of December 2016 </br></p>";	// optional text for sub title	

	//var loaderText = "Loading...";
	//var subText = "";
	var errorText = "It appears something has gone wrong. Please try refreshing your browser, or choose a different address.";
	var errorText2 = "The address you have chosen is not valid. Please try refreshing your browser, or choose a different address";
	var errorCount = 0;
	
	// create and connect to map
	mapboxgl.accessToken = 'pk.eyJ1IjoiYm9yZG5lcndsZWkiLCJhIjoiY2lyZjd1a2tyMDA3dmc2bmtkcjUzaG5meCJ9.eswxCZSAnob59HR0wEaTpA';
	var map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/bordnerwlei/cizepw2le005h2so39v1oa0i1',	// uses special style - no data
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
		accessToken: mapboxgl.accessToken,
		placeholder: "search...",
		country: 'us',
		limit: 6,
		bbox: [-93.688669,42.362197,-86.755047,47.014527],
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
	
	
	var myLoaderBox = document.createElement("div");
	var myLoader = document.createElement("div");
	myLoaderBox.setAttribute("id", "myProgress");
	myLoader.setAttribute("id", "myBar");
	$(myLoader).appendTo(myLoaderBox);
	$(myLoaderBox).appendTo("#myContainer");
	
	
	// ensures map has loaded before continuing
	map.on('load', function() {
	
		map.addSource('programs', {
			'type': 'geojson',
			'data': 'programs.geojson'
		});
		
		// add polygon layer
		map.addLayer({
			'id': 'program-poly',
			'type': 'fill',
			'source': 'programs',
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
		
		initLoad = setInterval(function(){
			var checky = map.isSourceLoaded('programs');
			if (checky == true) {
				var initialLoad = document.getElementById('myLoadingContainer');
				initialLoad.style.visibility = "hidden";
				var initialContainer = document.getElementById('myContainer');
				initialContainer.style.opacity = "1";
				clearInterval(initLoad);
			}
		}, 1000);

		// Listen for the `geocoder.input` event
		geocoder.on('result', function(ev) {
			moveBar(ev, ev.result.geometry.coordinates);
		});
	});
	
	function moveBar(ev, point) {
				
		// retrieve and remove all classes with 'gonnaRemove'
		var para = document.getElementsByClassName('gonnaRemove');
		while (para[0]) {
			para[0].parentNode.removeChild(para[0]);
		}
					
		myLoaderBox.style.visibility = "visible";
		var elem = document.getElementById("myBar");
		var width = 0;
		var id = setInterval(frame, 50);
		function frame() {
			if (width >= 100) {
				clearInterval(id);
				myLoaderBox.style.visibility = "hidden";
				
				// add point to map where searched
				map.getSource('single-point').setData(ev.result.geometry);
				var features = map.queryRenderedFeatures(point, { layers: ['program-poly'] });
				var layer = features[0];
				
				var poly = turf.polygon([[
  					[-81, 41],
  					[-81, 47],
  					[-72, 47],
  					[-72, 41],
  					[-81, 41]
				]]);

				var isInside = turf.inside(ev.result.geometry, poly);
				console.log(isInside);
				
				try {
					if (geocoderControl == false) {
						addAndPopulateLinks(layer.properties.Charter, layer.properties.Norvado); 
						geocoderControl = true;
					}
				} catch(err) {
					if (geocoderControl == false) {
						catchUndefinedLayer(err);
						geocoderControl = true;
					}
					
				}
										
			} else {
				width = width + 1;
				elem.style.width = width + '%';
				//elem.innerHTML = width * 1 + '%';
			}
		};
	};
	
	// function to add and populate links
	function addAndPopulateLinks(Charter, Norvado) {
		errorCount = 0;
		// create links
		var link1 = document.createElement("a");
		var link2 = document.createElement("a");
		
		// create breaks
		var break1 = document.createElement("br");
		var break2 = document.createElement("br");
		
		// attribute links with 'gonnaRemove' class
		link1.setAttribute("class", "gonnaRemove");
		link2.setAttribute("class", "gonnaRemove");
		
		// attribute breaks with 'gonnaRemove' class
		break1.setAttribute("class", "gonnaRemove");
		break2.setAttribute("class", "gonnaRemove");
		
		// attribute links with blank target for opening in new tab
		link1.setAttribute("target", "_blank");
		link2.setAttribute("target", "_blank");
		
		// check if properties has link
		if (Charter != "No discount program") {
			link1.setAttribute("href", Charter);
			link1.innerHTML = "<b>Charter: </b>Discount Program Available";// + ATT;
		} else {
			link1.innerHTML = "<b>Charter: </b>No discount program";
			link1.setAttribute("class", "noLink gonnaRemove");
		}
		
		if (Norvado != "No discount program") {
			link2.setAttribute("href", Norvado);
			link2.innerHTML = "<b>Norvado: </b>Discount Program Available";//  + CenturyLink;
		} else {
			link2.innerHTML = "<b>Norvado: </b>No discount program";
			link2.setAttribute("class", "noLink gonnaRemove");
		}
	
		// append links and breaks to container
		$(link1).appendTo("#myContainer");
		$(break1).appendTo("#myContainer");
		$(link2).appendTo("#myContainer");
		$(break2).appendTo("#myContainer");
		
		// set timer to allow function to run again
		window.setTimeout(function() {
			geocoderControl = false;
		}, 7000);
	};
	
	function catchUndefinedLayer(err) {
		errorCount = errorCount + 1;
		var myErrorText = document.createElement("h3");
		myErrorText.setAttribute("class", "gonnaRemove");
		if (errorCount >= 2) {
			myErrorText.innerHTML = errorText2;
		} else if (errorCount < 2) {
			myErrorText.innerHTML = errorText;
		}
		
		$(myErrorText).appendTo("#myContainer");
		// set timer to allow function to run again
		window.setTimeout(function() {
			geocoderControl = false;
		}, 7000);
	};
	
})();
