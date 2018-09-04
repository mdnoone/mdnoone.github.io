
var geoC = (function() {
	// declare variables
	var geocoderControl = false;
	var titleText = "Lifeline Discount Finder";
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
				
				//if a hyper link appears inacuratley active for a searched address that means ther is an error in the section below that is searching the geospatial data
				try {
					if (geocoderControl == false) {
						addAndPopulateLinks(layer.properties.Amery_Telc, layer.properties.Baldwin_Te, 
							layer.properties.Bayland_Te, layer.properties.BELMONT_TE, 
							layer.properties.Bergen_Tel, layer.properties.Bloomer_Te, layer.properties.BRUCETEL_C, layer.properties.Cellcom, layer.properties.Chibardun_, layer.properties.Citizens_T, layer.properties.Clear_Lake, layer.properties.Cochrane_C, layer.properties.Coon_Valle, layer.properties.CTC_Teleco, layer.properties.Cuba_City_, layer.properties.Farmers_In, layer.properties.Frontier_C, layer.properties.Grantsburg, layer.properties.HAGER_TELE, layer.properties.Hillsboro_, layer.properties.Indianhead, layer.properties.Lakefield_, layer.properties.Lakeland_C, layer.properties.Lavalle_Te, layer.properties.Lemonweir_, layer.properties.LVT_Corp, layer.properties.Manawa_Tel, layer.properties.Marquette_, layer.properties.MH_Telecom, layer.properties.Niagara_Te); //layer.properties.BRUCETEL_C,
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
	function addAndPopulateLinks(Amery_Telc, Baldwin_Te, Bayland_Te, BELMONT_TE, Bergen_Tel, Bloomer_Te, BRUCETEL_C, Cellcom, Chibardun_, Citizens_T, Clear_Lake, Cochrane_C, Coon_Valle, CTC_Teleco, Cuba_City_, Farmers_In, Frontier_C, Grantsburg, HAGER_TELE, Hillsboro_, Indianhead, Lakefield_, Lakeland_C, Lavalle_Te, Lemonweir_, LVT_Corp, Manawa_Tel, Marquette_, MH_Telecom, Niagara_Te) {//
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
		var link14 = document.createElement("a");
		var link15 = document.createElement("a");
		var link16 = document.createElement("a");
		var link17 = document.createElement("a");
		var link18 = document.createElement("a");
		var link19 = document.createElement("a");
		var link20 = document.createElement("a");
		var link21 = document.createElement("a");
		var link22 = document.createElement("a");
		var link23 = document.createElement("a");
		var link24 = document.createElement("a");
		var link25 = document.createElement("a");
		var link26 = document.createElement("a");
		var link27 = document.createElement("a");
		var link28 = document.createElement("a");
		var link29 = document.createElement("a");
		var link30 = document.createElement("a");
		var link31 = document.createElement("a");
		
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
		var break14 = document.createElement("br");
		var break15 = document.createElement("br");
		var break16 = document.createElement("br");
		var break17 = document.createElement("br");
		var break18 = document.createElement("br");
		var break19 = document.createElement("br");
		var break20 = document.createElement("br");
		var break21 = document.createElement("br");
		var break22 = document.createElement("br");
		var break23 = document.createElement("br");
		var break24 = document.createElement("br");
		var break25 = document.createElement("br");
		var break26 = document.createElement("br");
		var break27 = document.createElement("br");
		var break28 = document.createElement("br");
		var break29 = document.createElement("br");
		var break30 = document.createElement("br");
		var break31 = document.createElement("br");
		
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
		link14.setAttribute("class", "gonnaRemove");
		link15.setAttribute("class", "gonnaRemove");
		link16.setAttribute("class", "gonnaRemove");
		link17.setAttribute("class", "gonnaRemove");
		link18.setAttribute("class", "gonnaRemove");
		link19.setAttribute("class", "gonnaRemove");
		link20.setAttribute("class", "gonnaRemove");
		link21.setAttribute("class", "gonnaRemove");
		link22.setAttribute("class", "gonnaRemove");
		link23.setAttribute("class", "gonnaRemove");
		link24.setAttribute("class", "gonnaRemove");
		link25.setAttribute("class", "gonnaRemove");
		link26.setAttribute("class", "gonnaRemove");
		link27.setAttribute("class", "gonnaRemove");
		link28.setAttribute("class", "gonnaRemove");
		link29.setAttribute("class", "gonnaRemove");
		link30.setAttribute("class", "gonnaRemove");
		link31.setAttribute("class", "gonnaRemove");
		
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
		break14.setAttribute("class", "gonnaRemove");
		break15.setAttribute("class", "gonnaRemove");
		break16.setAttribute("class", "gonnaRemove");
		break17.setAttribute("class", "gonnaRemove");
		break18.setAttribute("class", "gonnaRemove");
		break19.setAttribute("class", "gonnaRemove");
		break20.setAttribute("class", "gonnaRemove");
		break21.setAttribute("class", "gonnaRemove");
		break22.setAttribute("class", "gonnaRemove");
		break23.setAttribute("class", "gonnaRemove");
		break24.setAttribute("class", "gonnaRemove");
		break25.setAttribute("class", "gonnaRemove");
		break26.setAttribute("class", "gonnaRemove");
		break27.setAttribute("class", "gonnaRemove");
		break28.setAttribute("class", "gonnaRemove");
		break29.setAttribute("class", "gonnaRemove");
		break30.setAttribute("class", "gonnaRemove");
		break31.setAttribute("class", "gonnaRemove");
		
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
		link14.setAttribute("target", "_blank");
		link15.setAttribute("target", "_blank");
		link16.setAttribute("target", "_blank");
		link17.setAttribute("target", "_blank");
		link18.setAttribute("target", "_blank");
		link19.setAttribute("target", "_blank");
		link20.setAttribute("target", "_blank");
		link21.setAttribute("target", "_blank");
		link22.setAttribute("target", "_blank");
		link23.setAttribute("target", "_blank");
		link24.setAttribute("target", "_blank");
		link25.setAttribute("target", "_blank");
		link26.setAttribute("target", "_blank");
		link27.setAttribute("target", "_blank");
		link28.setAttribute("target", "_blank");
		link29.setAttribute("target", "_blank");
		link30.setAttribute("target", "_blank");
		link31.setAttribute("target", "_blank");
		
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
			link2.innerHTML = "<b>Baldwin_Te: </b>Discount Program Available";//  + Baldwin_Te;
		} else {
			link2.innerHTML = "<b>Baldwin_Te: </b>No Wireline Lifeline Program Available";
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

		if (Cochrane_C != "No Wireline Lifeline Program Available") {
			link13.setAttribute("href", Cochrane_C);
			link13.innerHTML = "<b>Cochrane_C: </b>Discount Program Available";//  + Cochrane_C;
		} else {
			link13.innerHTML = "<b>Cochrane_C: </b>No Wireline Lifeline Program Available";
			link13.setAttribute("class", "noLink gonnaRemove");
		}			
		
		if (Coon_Valle != "No Wireline Lifeline Program Available") {
			link14.setAttribute("href", Coon_Valle);
			link14.innerHTML = "<b>Coon_Valle: </b>Discount Program Available";//  + Coon_Valle;
		} else {
			link14.innerHTML = "<b>Coon_Valle: </b>No Wireline Lifeline Program Available";
			link14.setAttribute("class", "noLink gonnaRemove");
		}
		
		if (CTC_Teleco != "No Wireline Lifeline Program Available") {
			link15.setAttribute("href", CTC_Teleco);
			link15.innerHTML = "<b>CTC_Teleco: </b>Discount Program Available";//  + CTC_Teleco;
		} else {
			link15.innerHTML = "<b>CTC_Teleco: </b>No Wireline Lifeline Program Available";
			link15.setAttribute("class", "noLink gonnaRemove");
		}

		if (Cuba_City_ != "No Wireline Lifeline Program Available") {
			link16.setAttribute("href", Cuba_City_);
			link16.innerHTML = "<b>Cuba_City_: </b>Discount Program Available";//  + Cuba_City_;
		} else {
			link16.innerHTML = "<b>Cuba_City_: </b>No Wireline Lifeline Program Available";
			link16.setAttribute("class", "noLink gonnaRemove");
		}
		
		if (Farmers_In != "No Wireline Lifeline Program Available") {
			link17.setAttribute("href", Farmers_In);
			link17.innerHTML = "<b>Farmers_In: </b>Discount Program Available";//  + Farmers_In;
		} else {
			link17.innerHTML = "<b>Farmers_In: </b>No Wireline Lifeline Program Available";
			link17.setAttribute("class", "noLink gonnaRemove");
		}
		
		if (Frontier_C != "No Wireline Lifeline Program Available") {
			link18.setAttribute("href", Frontier_C);
			link18.innerHTML = "<b>Frontier_C: </b>Discount Program Available";//  + Frontier_C;
		} else {
			link18.innerHTML = "<b>Frontier_C: </b>No Wireline Lifeline Program Available";
			link18.setAttribute("class", "noLink gonnaRemove");
		}
		
		if (Grantsburg != "No Wireline Lifeline Program Available") {
			link19.setAttribute("href", Grantsburg);
			link19.innerHTML = "<b>Grantsburg: </b>Discount Program Available";//  + Grantsburg;
		} else {
			link19.innerHTML = "<b>Grantsburg: </b>No Wireline Lifeline Program Available";
			link19.setAttribute("class", "noLink gonnaRemove");
		}
		
		if (HAGER_TELE != "No Wireline Lifeline Program Available") {
			link20.setAttribute("href", HAGER_TELE);
			link20.innerHTML = "<b>HAGER_TELE: </b>Discount Program Available";//  + HAGER_TELE;
		} else {
			link20.innerHTML = "<b>HAGER_TELE: </b>No Wireline Lifeline Program Available";
			link20.setAttribute("class", "noLink gonnaRemove");
		}
		
		if (Hillsboro_ != "No Wireline Lifeline Program Available") {
			link21.setAttribute("href", Hillsboro_);
			link21.innerHTML = "<b>Hillsboro_: </b>Discount Program Available";//  + Hillsboro_;
		} else {
			link21.innerHTML = "<b>Hillsboro_: </b>No Wireline Lifeline Program Available";
			link21.setAttribute("class", "noLink gonnaRemove");
		}
		
		if (Indianhead != "No Wireline Lifeline Program Available") {
			link22.setAttribute("href", Indianhead);
			link22.innerHTML = "<b>Indianhead: </b>Discount Program Available";//  + Indianhead;
		} else {
			link22.innerHTML = "<b>Indianhead: </b>No Wireline Lifeline Program Available";
			link22.setAttribute("class", "noLink gonnaRemove");
		}
		
		if (Lakefield_ != "No Wireline Lifeline Program Available") {
			link23.setAttribute("href", Lakefield_);
			link23.innerHTML = "<b>Lakefield_: </b>Discount Program Available";//  + Lakefield_;
		} else {
			link23.innerHTML = "<b>Lakefield_: </b>No Wireline Lifeline Program Available";
			link23.setAttribute("class", "noLink gonnaRemove");
		}
		
		if (Lakeland_C != "No Wireline Lifeline Program Available") {
			link24.setAttribute("href", Lakeland_C);
			link24.innerHTML = "<b>Lakeland_C: </b>Discount Program Available";//  + Lakeland_C;
		} else {
			link24.innerHTML = "<b>Lakeland_C: </b>No Wireline Lifeline Program Available";
			link24.setAttribute("class", "noLink gonnaRemove");
		}
		
		if (Lavalle_Te != "No Wireline Lifeline Program Available") {
			link25.setAttribute("href", Lavalle_Te);
			link25.innerHTML = "<b>Lavalle_Te: </b>Discount Program Available";//  + Lavalle_Te;
		} else {
			link25.innerHTML = "<b>Lavalle_Te: </b>No Wireline Lifeline Program Available";
			link25.setAttribute("class", "noLink gonnaRemove");
		}
		
		if (Lemonweir_ != "No Wireline Lifeline Program Available") {
			link26.setAttribute("href", Lemonweir_);
			link26.innerHTML = "<b>Lemonweir_: </b>Discount Program Available";//  + Lemonweir_;
		} else {
			link26.innerHTML = "<b>Lemonweir_: </b>No Wireline Lifeline Program Available";
			link26.setAttribute("class", "noLink gonnaRemove");
		}
		
		if (LVT_Corp != "No Wireline Lifeline Program Available") {
			link27.setAttribute("href", LVT_Corp);
			link27.innerHTML = "<b>LVT_Corp: </b>Discount Program Available";//  + LVT_Corp;
		} else {
			link27.innerHTML = "<b>LVT_Corp: </b>No Wireline Lifeline Program Available";
			link27.setAttribute("class", "noLink gonnaRemove");
		}
		
		if (Manawa_Tel != "No Wireline Lifeline Program Available") {
			link28.setAttribute("href", Manawa_Tel);
			link28.innerHTML = "<b>Manawa_Tel: </b>Discount Program Available";//  + Manawa_Tel;
		} else {
			link28.innerHTML = "<b>Manawa_Tel: </b>No Wireline Lifeline Program Available";
			link28.setAttribute("class", "noLink gonnaRemove");
		}
		
		if (Marquette_ != "No Wireline Lifeline Program Available") {
			link29.setAttribute("href", Marquette_);
			link29.innerHTML = "<b>Marquette_: </b>Discount Program Available";//  + Marquette_;
		} else {
			link29.innerHTML = "<b>Marquette_: </b>No Wireline Lifeline Program Available";
			link29.setAttribute("class", "noLink gonnaRemove");
		}
		
		if (MH_Telecom != "No Wireline Lifeline Program Available") {
			link30.setAttribute("href", MH_Telecom);
			link30.innerHTML = "<b>MH_Telecom: </b>Discount Program Available";//  + MH_Telecom;
		} else {
			link30.innerHTML = "<b>MH_Telecom: </b>No Wireline Lifeline Program Available";
			link30.setAttribute("class", "noLink gonnaRemove");
		}
		
		if (Niagara_Te != "No Wireline Lifeline Program Available") {
			link30.setAttribute("href", Niagara_Te);
			link30.innerHTML = "<b>Niagara_Te: </b>Discount Program Available";//  + Niagara_Te
		} else {
			link30.innerHTML = "<b>Niagara_Te: </b>No Wireline Lifeline Program Available";
			link30.setAttribute("class", "noLink gonnaRemove");
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
		$(link14).appendTo("#myContainer");
		$(break14).appendTo("#myContainer");
		$(link15).appendTo("#myContainer");
		$(break15).appendTo("#myContainer");
		$(link16).appendTo("#myContainer");
		$(break16).appendTo("#myContainer");
		$(link17).appendTo("#myContainer");
		$(break17).appendTo("#myContainer");
		$(link18).appendTo("#myContainer");
		$(break18).appendTo("#myContainer");
		$(link19).appendTo("#myContainer");
		$(break19).appendTo("#myContainer");
		$(link20).appendTo("#myContainer");
		$(break20).appendTo("#myContainer");
		$(link21).appendTo("#myContainer");
		$(break21).appendTo("#myContainer");
		$(link22).appendTo("#myContainer");
		$(break22).appendTo("#myContainer");
		$(link23).appendTo("#myContainer");
		$(break23).appendTo("#myContainer");
		$(link24).appendTo("#myContainer");
		$(break24).appendTo("#myContainer");
		$(link25).appendTo("#myContainer");
		$(break25).appendTo("#myContainer");
		$(link26).appendTo("#myContainer");
		$(break26).appendTo("#myContainer");
		$(link27).appendTo("#myContainer");
		$(break27).appendTo("#myContainer");
		$(link28).appendTo("#myContainer");
		$(break28).appendTo("#myContainer");
		$(link29).appendTo("#myContainer");
		$(break29).appendTo("#myContainer");
		$(link30).appendTo("#myContainer");
		$(break30).appendTo("#myContainer");
		$(link31).appendTo("#myContainer");
		$(break31).appendTo("#myContainer");
		
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
