
var geoC = (function() {
	// declare variables
	var geocoderControl = false;
	var titleText = "Internet Discount Finder";
	var subText = "Enter your address to search for available programs.";	// optional text for sub title
	
	var subText = "<center>Contact the State Broadband Office</center>";
	document.write("<p>" + subText.link("https://psc.wi.gov/Pages/Programs/BroadbandTeam.aspx") + "</p>");
/*	var subText = "<p>Internet providers offer an array of discounted internet subscriptions based upon a variety of factors such as income, participation in Free and Reduced Cost Lunch programs, housing assistance, veteran status, Medicaid, Supplementary Security Income and more. <br>" +
	"<br>The Wisconsin State Broadband Office has developed a tool to help identify programs available based upon location. <br>" +
	"<br><b> Enter your address to search for available programs. Data is current as of December 2016 </br></p>";	// optional text for sub title*/	
	
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
						addAndPopulateLinks(layer.properties.Amery_Telc, layer.properties.Baldwin_Te, 
							layer.properties.Bayland_Te, layer.properties.BELMONT_TE, 
							layer.properties.Bergen_Tel, layer.properties.Bloomer_Te, layer.properties.BRUCETEL_C, layer.properties.Cellcom, layer.properties.Chibardun_, layer.properties.Citizens_T, layer.properties.Clear_Lake, layer.properties.Frontier_C); //layer.properties.BRUCETEL_C,
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
	function addAndPopulateLinks(Amery_Telc, Baldwin_Te, Bayland_Te, BELMONT_TE, Bergen_Tel, Bloomer_Te, BRUCETEL_C, Cellcom, Chibardun_, Citizens_T, Clear_Lake, Frontier_C) {
		errorCount = 0;
		// create links
		var link1 = document.createElement("a");
		var link2 = document.createElement("a");
		var link3 = document.createElement("a");
		var link4 = document.createElement("a");
		var link6 = document.createElement("a");
		var link7 = document.createElement("a");
		var link8 = document.createElement("a");
		var link9 = document.createElement("a");
		var link10 = document.createElement("a");
		var link11 = document.createElement("a");
		var link12 = document.createElement("a");
		var link13 = document.createElement("a");
		
		// create breaks
		var break1 = document.createElement("br");
		var break2 = document.createElement("br");
		var break3 = document.createElement("br");
		var break4 = document.createElement("br");
		var break6 = document.createElement("br");
		var break7 = document.createElement("br");
		var break8 = document.createElement("br");
		var break9 = document.createElement("br");
		var break10 = document.createElement("br");
		var break11 = document.createElement("br");
		var break12 = document.createElement("br");
		var break13 = document.createElement("br");
		
		// attribute links with 'gonnaRemove' class
		link1.setAttribute("class", "gonnaRemove");
		link2.setAttribute("class", "gonnaRemove");
		link3.setAttribute("class", "gonnaRemove");
		link4.setAttribute("class", "gonnaRemove");
		link6.setAttribute("class", "gonnaRemove");
		link7.setAttribute("class", "gonnaRemove");
		link8.setAttribute("class", "gonnaRemove");
		link9.setAttribute("class", "gonnaRemove");
		link10.setAttribute("class", "gonnaRemove");
		link11.setAttribute("class", "gonnaRemove");
		link12.setAttribute("class", "gonnaRemove");
		link13.setAttribute("class", "gonnaRemove");
		
		// attribute breaks with 'gonnaRemove' class
		break1.setAttribute("class", "gonnaRemove");
		break2.setAttribute("class", "gonnaRemove");
		break3.setAttribute("class", "gonnaRemove");
		break4.setAttribute("class", "gonnaRemove");
		break6.setAttribute("class", "gonnaRemove");
		break7.setAttribute("class", "gonnaRemove");
		break8.setAttribute("class", "gonnaRemove");
		break9.setAttribute("class", "gonnaRemove");
		break10.setAttribute("class", "gonnaRemove");
		break11.setAttribute("class", "gonnaRemove");
		break12.setAttribute("class", "gonnaRemove");
		break13.setAttribute("class", "gonnaRemove");
		
		// attribute links with blank target for opening in new tab
		link1.setAttribute("target", "_blank");
		link2.setAttribute("target", "_blank");
		link3.setAttribute("target", "_blank");
		link4.setAttribute("target", "_blank");
		link6.setAttribute("target", "_blank");
		link7.setAttribute("target", "_blank");
		link8.setAttribute("target", "_blank");
		link9.setAttribute("target", "_blank");
		link10.setAttribute("target", "_blank");
		link11.setAttribute("target", "_blank");
		link12.setAttribute("target", "_blank");
		link13.setAttribute("target", "_blank");
		
		// check if properties has link
		if (Amery_Telc != "No Wireline Lifeline Program Available") {
			link1.setAttribute("href", Amery_Telc);
			link1.innerHTML = "<b>Amery_Telc: </b>Discount Program Available";// + Amery_Telc;
		} else {
			link1.innerHTML = "<b>Amery_Telc: </b>No Wireline Lifeline Program Available";
			link1.setAttribute("class", "noLink gonnaRemove");
		}
		
		if (Baldwin_Te != "No Wireline Lifeline Program Available") {
			link2.setAttribute("href", Baldwin_Te);
			link2.innerHTML = "<b>Baldwin_Tek: </b>Discount Program Available";//  + Baldwin_Tek;
		} else {
			link2.innerHTML = "<b>Baldwin_Tek: </b>No Wireline Lifeline Program Available";
			link2.setAttribute("class", "noLink gonnaRemove");
		}
		
		if (Bayland_Te != "No Wireline Lifeline Program Available") {
			link3.setAttribute("href", Bayland_Te);
			link3.innerHTML = "<b>Bayland_Te: </b>Discount Program Available";//  + Bayland_Te;
		} else {
			link3.innerHTML = "<b>Bayland_Te: </b>No Wireline Lifeline Program Available";
			link3.setAttribute("class", "noLink gonnaRemove");
		}
		
		if (BELMONT_TE != "No Wireline Lifeline Program Available") {
			link4.setAttribute("href", BELMONT_TE);
			link4.innerHTML = "<b>BELMONT_TE: </b>Discount Program Available";//  + BELMONT_TE;
		} else {
			link4.innerHTML = "<b>BELMONT_TE: </b>No Wireline Lifeline Program Available";
			link4.setAttribute("class", "noLink gonnaRemove");
		}
				
		if (Bergen_Tel != "No Wireline Lifeline Program Available") {
			link6.setAttribute("href", Bergen_Tel);
			link6.innerHTML = "<b>Bergen_Tel: </b>Discount Program Available";//  + Bergen_Tel;
		} else {
			link6.innerHTML = "<b>Bergen_Tel: </b>No Wireline Lifeline Program Available";
			link6.setAttribute("class", "noLink gonnaRemove");
		}
		
		if (Bloomer_Te != "No Wireline Lifeline Program Available") {
			link7.setAttribute("href", Bloomer_Te);
			link7.innerHTML = "<b>Bloomer_Te: </b>Discount Program Available";//  + Bloomer_Te;
		} else {
			link7.innerHTML = "<b>Bloomer_Te: </b>No Wireline Lifeline Program Available";
			link7.setAttribute("class", "noLink gonnaRemove");
		}
		
		if (BRUCETEL_C != "No Wireline Lifeline Program Available") {
			link8.setAttribute("href", BRUCETEL_C);
			link8.innerHTML = "<b>BRUCETEL_C: </b>Discount Program Available";//  + BRUCETEL_C;
		} else {
			link8.innerHTML = "<b>BRUCETEL_C: </b>No Wireline Lifeline Program Available";
			link8.setAttribute("class", "noLink gonnaRemove");
		}
					
		if (Cellcom != "No Wireline Lifeline Program Available") {
			link9.setAttribute("href", Cellcom);
			link9.innerHTML = "<b>Cellcom: </b>Discount Program Available";//  + PCs for people;
		} else {
			link9.innerHTML = "<b>Cellcom: </b>No Wireline Lifeline Program Available";
			link9.setAttribute("class", "noLink gonnaRemove");
		}			
		
		if (Chibardun_ != "No Wireline Lifeline Program Available") {
			link10.setAttribute("href", Chibardun_);
			link10.innerHTML = "<b>Chibardun_: </b>Discount Program Available";//  + Chibardun_;
		} else {
			link10.innerHTML = "<b>Chibardun_: </b>No Wireline Lifeline Program Available";
			link10.setAttribute("class", "noLink gonnaRemove");
		}		

		if (Citizens_T != "No Wireline Lifeline Program Available") {
			link11.setAttribute("href", Citizens_T);
			link11.innerHTML = "<b>Citizens_T: </b>Discount Program Available";//  + Citizens_T;
		} else {
			link11.innerHTML = "<b>Citizens_T: </b>No Wireline Lifeline Program Available";
			link11.setAttribute("class", "noLink gonnaRemove");
		}	
		
		if (Clear_Lake != "No Wireline Lifeline Program Available") {
			link12.setAttribute("href", Clear_Lake);
			link12.innerHTML = "<b>Clear_Lake: </b>Discount Program Available";//  + Clear_Lake;
		} else {
			link12.innerHTML = "<b>Clear_Lake: </b>No Wireline Lifeline Program Available";
			link12.setAttribute("class", "noLink gonnaRemove");
		}	

		if (Frontier_C != "No Wireline Lifeline Program Available") {
			link13.setAttribute("href", Frontier_C);
			link13.innerHTML = "<b>Frontier_C: </b>Discount Program Available";//  + Frontier_C;
		} else {
			link13.innerHTML = "<b>Frontier_C: </b>No Wireline Lifeline Program Available";
			link13.setAttribute("class", "noLink gonnaRemove");
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
		$(link6).appendTo("#myContainer");
		$(break6).appendTo("#myContainer");
		$(link7).appendTo("#myContainer");
		$(break7).appendTo("#myContainer");
		$(link8).appendTo("#myContainer");
		$(break8).appendTo("#myContainer");
		$(link9).appendTo("#myContainer");
		$(break9).appendTo("#myContainer");
		$(link10).appendTo("#myContainer");
		$(break10).appendTo("#myContainer");
		$(link11).appendTo("#myContainer");
		$(break11).appendTo("#myContainer");
		$(link12).appendTo("#myContainer");
		$(break12).appendTo("#myContainer");
		$(link13).appendTo("#myContainer");
		$(break13).appendTo("#myContainer");
				
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
