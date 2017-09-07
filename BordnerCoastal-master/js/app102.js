//Global vars:
var desktopMode = true;
var level1Classes = {}
var cov1Classes = {}
var totalFeatures = 0
var map;
var sql = new cartodb.SQL({ user: 'sco-admin' });
var currentBasemap;
var bordner;
var classConfigs = {};
var level1Membership = {};
var levelEngaged = "1";
var level1Selected = undefined;
var cachedLevel1Selection = undefined;
var sublayer1;
var sublayer2;
var layerOpacity = 0.65;
var legendType = "polygons";
var counties;
var townships;
var density1;
var lines;
var infowindowVars = ['cartodb_id','cov1','cov2', 'cov3', 'cov4', /*'cov5',*/
					'den1', 'den2', 'den3', 'den4', /*'den5',*/
					'pctcov1', 'pctcov2', 'pctcov3', 'pctcov4', /*'pctcov5',*/
					'mindiam1','mindiam2','mindiam3','mindiam4',/*'mindiam5',*/
					 'maxdiam1','maxdiam2','maxdiam3','maxdiam4'/*,'maxdiam5'*/ ]
var polygonLegend; //svg polygon legend
var level1Colors;
var level2Colors;
var polygonLegendFactor = 0.000247105;
var isInfowindowOpen = false;
var isLegendOpen = true;
var isLayerListOpen = false;
var infowindow;
var semanticZoomLevel = 13;
var lineTypeSelected;
var points;
var pointTypeSelected;
var histogramScale = "linear";
var showInfoboxOnHover = true;
var basemapChoice = "streets";
var sql2 = new cartodb.SQL({ user: 'sco-admin', format: 'geojson' });
var polygon;

//overlays on the map
var labelsAreOn = false;
var countiesAreOn = false;
var townshipsAreOn = false;
var densityIsOn = false;

//geolocation of the user
var navIsOn = false;
var theLocation;
var canDoGeolocation;

var isMobileClickWindowOpen = true;

/* Always use HTTPS! */
if (location.protocol != 'https:')
{
 location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
}

//limit panning
var north = 47.5
var south = 42
var east = -85
var west = -93
var bounds = new L.latLngBounds(L.latLng(north, east), L.latLng(south, west));

// Overlay definitions:
var labelsOverlay = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_only_labels/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
	subdomains: 'abcd',
	maxZoom: 23
});

var terrainOverlay = L.tileLayer('http://{s}.tiles.wmflabs.org/hillshading/{z}/{x}/{y}.png', {
	maxZoom: 15,
	opacity: 1,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

// Basemap definitions:
var streetsBasemap = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
});

var satelliteBasemap =  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

var kewaunee = 	L.tileLayer('https://maps.sco.wisc.edu/BordnerCoastal/BordnerTile/Kewaunee/{z}/{x}/{y}.png', {
 	attribution: 'WHAI',
 	bounds: new L.latLngBounds([[44.327162,-87.766194],[44.67706,-86.778398]]),
 	noWrap: true
});
var racine = L.tileLayer('https://maps.sco.wisc.edu/BordnerCoastal/BordnerTile/Racine2/{z}/{x}/{y}.png', {
 	attribution: 'WHAI',
 	bounds: new L.latLngBounds([[42.6108171,-88.30806],[42.843609,-87.043899]]),
 	noWrap: true
});
var kenosha = L.tileLayer('https://maps.sco.wisc.edu/BordnerCoastal/BordnerTile/Kenosha/{z}/{x}/{y}.png', {
 	attribution: 'WHAI',
 	bounds: new L.latLngBounds([[42.4917199,-88.305891],[42.669875,-87.0198629]]),
 	noWrap: true
});
var ozaukee = L.tileLayer('https://maps.sco.wisc.edu/BordnerCoastal/BordnerTile/Ozaukee2/{z}/{x}/{y}.png', {
 	attribution: 'WHAI',
 	bounds: new L.latLngBounds([[43.1908159,-88.06379],[43.5434179,-87.1190079]]),
 	noWrap: true
});
var douglas = L.tileLayer('https://maps.sco.wisc.edu/BordnerCoastal/BordnerTile/Douglas/{z}/{x}/{y}.png', {
 	attribution: 'WHAI',
 	bounds: new L.latLngBounds([[46.1569631,-92.293705],[46.8932129,-91.5493488]]),
 	noWrap: true
});
var bayfield = L.tileLayer('https://maps.sco.wisc.edu/BordnerCoastal/BordnerTile/Bayfield/{z}/{x}/{y}.png', {
 	attribution: 'WHAI',
 	bounds: new L.latLngBounds([[46.15463,-91.5539819],[47.210962,-90.732857]]),
 	noWrap: true
});
var oconto = L.tileLayer('https://maps.sco.wisc.edu/BordnerCoastal/BordnerTile/Oconto/{z}/{x}/{y}.png', {
 	attribution: 'WHAI',
 	bounds: new L.latLngBounds([[44.67236,-88.680066],[45.3786821,-87.760071]]),
 	noWrap: true
});
var ashland = L.tileLayer('https://maps.sco.wisc.edu/BordnerCoastal/BordnerTile/Ashland/{z}/{x}/{y}.png', {
 	attribution: 'WHAI',
 	bounds: new L.latLngBounds([[45.980505,-90.9283409],[47.3098219,-89.9571019]]),
 	noWrap: true
});
var brown = L.tileLayer('https://maps.sco.wisc.edu/BordnerCoastal/BordnerTile/Brown/{z}/{x}/{y}.png', {
 	attribution: 'WHAI',
 	bounds: new L.latLngBounds([[44.240379,-88.252569],[44.679815,-87.758048]]),
 	noWrap: true
});
var iron = L.tileLayer('https://maps.sco.wisc.edu/BordnerCoastal/BordnerTile/Iron6/{z}/{x}/{y}.png', {
 	attribution: 'WHAI',
 	bounds: new L.latLngBounds([[45.9813489,-90.55228],[46.7981819,-89.9281269]]),
 	noWrap: true
});
var marinette = L.tileLayer('https://maps.sco.wisc.edu/BordnerCoastal/BordnerTile/Marinette/{z}/{x}/{y}.png', {
 	attribution: 'WHAI',
 	bounds: new L.latLngBounds([[44.7643671,-88.4281021],[45.7956369,-87.4427599]]),
 	noWrap: true
});
var manitowoc = L.tileLayer('https://maps.sco.wisc.edu/BordnerCoastal/BordnerTile/Manitowoc/{z}/{x}/{y}.png', {
 	attribution: 'WHAI',
 	bounds: new L.latLngBounds([[43.8915849,-88.04378],[44.3288248,-86.9234029]]),
 	noWrap: true
});
var sheboygan = L.tileLayer('https://maps.sco.wisc.edu/BordnerCoastal/BordnerTile/Sheboygan/{z}/{x}/{y}.png', {
 	attribution: 'WHAI',
 	bounds: new L.latLngBounds([[43.5414329,-88.162274],[43.8951549,-87.0753349]]),
 	noWrap: true
});

var historicBasemap = L.layerGroup([kewaunee, racine, kenosha, ozaukee, douglas, bayfield, oconto, ashland, brown, iron, marinette, manitowoc, sheboygan]);
//var historicBasemap = L.layerGroup([brown]);

// Open the layer list when the splash modal closes
$("#splashModal").on('hidden.bs.modal', function (e) {
	if (desktopMode == true){
		dispatchButtonClick(e, "layerListButton")
	}
});



// Create CartoCSS
function getPolyStyle(level, level1Selected){
	//CS: console.log(level)
	//CS: console.log(level1Selected)
	if (level == "none"){
		return "#layer{polygon-opacity: 0;}"
	}
	classes = tempClasses2.classes;

	//Beginning part of the cartocss style
	style = "#layer{polygon-fill: #DDDDDD;polygon-opacity:" + 1 +";";
	if (level =="level1"){
		for(var i = 0; i < classes.length; i++) {
			var thisStyle = "[cov1='"+classes[i].code+"']{polygon-fill: "+classes[i].color1+";}";
			style += thisStyle;
		}
	}else{
		style = "#layer{polygon-fill: #DDDDDD;polygon-opacity: " + 0 +";";
		for(var i = 0; i < classes.length; i++) {
			level1key = level1Selected.toLowerCase().split(" ").join("_")
			if (level1key == classes[i].level1var) {
				var thisStyle = "[cov1='"+classes[i].code+"']{polygon-fill: "+classes[i].color2+";polygon-opacity:" + 1 +";}";
				style += thisStyle;
			}
		}
	}
	// //CS: console.log(style)
	style += "}";
	return style;
};

//get the css for a specific line type
function getLineCSS(lineTypeSelected, zoomIn){
	if (typeof(zoomIn) == "undefined"){
		zoomIn = -1;
	}
	var style;
	if (lineTypeSelected == "all"){
		//if user wants all lines
		style = "#layer{"
		for (var i=0; i < lineLegend.length; i++){
			var thisMinZoom = lineLegend[i].minZoom
			var thisMaxZoom = lineLegend[i].maxZoom
			if ((zoomIn <= thisMaxZoom) && (zoomIn >= thisMinZoom)){
			 thisStyle ="[line_type='" + lineLegend[i].type + "']{" + lineLegend[i].css + "}"
			}else{
				 thisStyle = "[line_type='" + lineLegend[i].type + "']{line-opacity: 0;}"
			}
			style += thisStyle
		}//end loop
		style += "}"
	}else if (lineTypeSelected == "none"){
		style = "#layer{line-opacity:0;}"
	}else{
		style = "#layer{line-opacity: 0; "
		for (var i=0; i < lineLegend.length; i++){
			var thisLineType = lineLegend[i].type
			if (lineTypeSelected.toLowerCase() === thisLineType.toLowerCase()){
				var thisStyle = "[line_type='" + thisLineType + "']{" + lineLegend[i].css + "};"
				style += thisStyle
			}//end if
		} //end loop
		style += "}"
	} //end main if
	return style
}

function getPointCSS(pointTypeSelected, zoomIn){
	if (typeof(zoomIn) == "undefined"){
		zoomIn = -1;
	}
	var style;
	if (pointTypeSelected == "all"){
		//if user wants all lines
		style = "#layer{"
		for (var i=0; i < pointLegend.length; i++){
			var thisMinZoom = pointLegend[i].minZoom;
			var thisMaxZoom = pointLegend[i].maxZoom;
			if ((zoomIn >= thisMinZoom) && (zoomIn <= thisMaxZoom)){
				style +=  "[point_type='" + pointLegend[i].type + "']{marker-file: url(" + pointLegend[i].icon + "); marker-allow-overlap: false; marker-opacity: 1;[zoom >=12]{marker-width: 10;}[zoom >=13]{marker-width: 12;}[zoom >=14]{marker-width: 14;}[zoom >=15]{marker-width: 16;}[zoom >=16]{marker-width: 19;}[zoom >=17]{marker-width: 21;}[zoom >=18]{marker-width: 23;} "+ pointLegend[i].otherCSS 
				if (window["basemapParam"] == 'satellite'){
					style += "marker-fill: " + pointLegend[i].color + ";[zoom > 10]{marker-line-color:#ffffff; marker-line-width:1;}"	
				}else if(window["basemapParam"] == 'historic'){
					style += "marker-fill:#ffffed;marker-line-color:#000000; marker-line-width:1;"
				}else {
					style += "marker-fill: " + pointLegend[i].color + ";"
				}
				style += "}"
			}else{
				style +=  "marker-allow-overlap: false; marker-opacity: 1; [zoom =7]{marker-width:.1;}[zoom <9]{ marker-width:.15;}[zoom >=9]{marker-width:1.25;}[zoom >=10]{marker-width:2;}[zoom >=11]{marker-width:3.5;}"
				if (window["basemapParam"] == 'satellite'){
					style += "marker-fill:#000000; [zoom > 10]{marker-line-color:#ffffff; marker-line-width:.5;}"	
				}else if(window["basemapParam"] == 'historic'){
					style += "marker-fill:#ffffed; marker-fill-opacity: 1; [zoom < 11]{marker-line-width:0;}"
				}else {
					style += "marker-fill:#000000;"
				}
			}
		}
		style += "}"
	}else if (pointTypeSelected == "none"){
		style = "#layer{marker-opacity:0;}"
	}else{
		style = "#layer{marker-opacity: 0; marker-width: 0;"
		for (var i=0; i < pointLegend.length; i++){
			var thisPointType = pointLegend[i].group;
			var thisMinZoom = pointLegend[i].minZoom;
			var thisMaxZoom = pointLegend[i].maxZoom;
			if (pointTypeSelected.toLowerCase() === thisPointType.toLowerCase()){
				if (thisPointType == "Vacant House" || thisPointType == "Occupied House" || thisPointType == "Summer Home" || thisPointType == "Orchard"){
					var thisStyle = "[point_type='" + pointLegend[i].type + "']{marker-opacity: 1; marker-file: url(" + pointLegend[i].icon + "); marker-allow-overlap: true; marker-opacity: 1;[zoom =7]{marker-width:1;}[zoom >=8]{ marker-width:1.5;}[zoom >=9]{marker-width:2;}[zoom >=10]{marker-width:3;}[zoom >=11]{marker-width:3.5;marker-allow-overlap: false;}[zoom >=12]{marker-width: 10;}[zoom >=13]{marker-width: 12;  marker-allow-overlap: false;}[zoom >=14]{marker-width: 14;}[zoom >=15]{marker-width: 16;}[zoom >=16]{marker-width: 19;}[zoom >=17]{marker-width: 21;}[zoom >=18]{marker-width: 23;} "+ pointLegend[i].otherCSS; 
				}else {
					var thisStyle = "[point_type='" + pointLegend[i].type + "']{marker-opacity: 1; marker-file: url(" + pointLegend[i].icon + "); marker-allow-overlap: true; marker-opacity: 1;[zoom =7]{marker-width:4;}[zoom <9]{ marker-width:4;}[zoom >=9]{marker-width:8;}[zoom >=10]{marker-width:8;}[zoom >=11]{marker-width:8;}[zoom >=12]{marker-width: 10;}[zoom >=13]{marker-width: 12;}[zoom >=14]{marker-width: 14;}[zoom >=15]{marker-width: 16;}[zoom >=16]{marker-width: 19;}[zoom >=17]{marker-width: 21;}[zoom >=18]{marker-width: 23;} "+ pointLegend[i].otherCSS; 
				}
				
				if (window["basemapParam"] == 'satellite'){
					thisStyle += "marker-fill: " + pointLegend[i].color + "; marker-line-color:#ffffff; marker-line-width:0.5; "	
				}else if(window["basemapParam"] == 'historic'){
					style += "marker-fill:#ffffed; marker-fill-opacity: 1; marker-line-width:1;"
				}else {
					style += "marker-fill: " + pointLegend[i].color + ";"
				}
				thisStyle += "}"
				style += thisStyle
			}//end if
		} //end loop
		style += "}"
	} //end main if
	return style
}

// Create a hex dictionary for with cov1 as key (for easy access)
function createStyles(){
	classes = tempClasses2.classes;
	for(var i = 0; i < classes.length; i++) {
		classes[i].level1var = makeVariableFromString(classes[i].level1)
		classes[i].level2var = makeVariableFromString(classes[i].level2)
		classConfigs[classes[i].code] = classes[i]
	}
	level1Membership = _.groupBy(classes, function(classObj){
		return makeVariableFromString(classObj.level1);
	});
};

function makeLevel1ColorList(){
	//not efficient :(
	var grouped = _.groupBy(tempClasses2.classes, "level1")
	//all colors should be the same within a level 1
	colors = _.map(grouped, function(g, key){
		return {level1: key, color: g[0].color1}
	})
	return colors
}
function makeLevel2ColorList(){
	//not efficient :(
	var grouped = _.groupBy(tempClasses2.classes, "level2")
	//all colors should be the same within a level 1
	colors = _.map(grouped, function(g, key){
		return {level2: key, color: g[0].color2}
	})
	return colors
}

// Helper function to turn a title into a valid variable (i.e. "Lowland Coniferous Forest" to "lowland_coniferous_forest")
function makeVariableFromString(stringIn){
	var stringOut = stringIn.replace(/\s/g, "_").replace(/[(),.?]/g, "").toLowerCase(); // 1 replace whitespace with _ 2) replace (),.? with nothing 3) set to lowercase
	return stringOut
}

// Load the Carto map:
window.onload = function() {



	//Create the leaflet map
	map = L.map('map', {
		zoomControl: true,
		cartodb_logo: false,
		center: [43.7844,-88.7879],
		zoom: 7,
		minZoom:7,
		maxZoom: 18,
		maxBounds: bounds
	});


	// Add county layer
	var cartoCSSCounty = "#layer { " +
		"text-name: [county_nam];" +
	  	"text-face-name: 'Open Sans Regular';" +
	  	"text-fill: #151515;" +
	  	"text-halo-fill: #fff;" +
	  	"text-halo-radius: 1;" +
	  	"[zoom = 7]{text-size: 9;}" +
	  	"[zoom = 8]{text-size: 12;}" +
	  	"[zoom = 9]{text-size: 16;}" +
	  	"[zoom = 10]{text-size: 19;}" +
	  	"[zoom = 11]{text-size: 23;}" +
	  	"[zoom = 12]{text-size: 26;}" +
	  	"[zoom = 13]{text-size: 31;}" +
	  	"[zoom = 14]{text-size: 36;}" +
	  	"[zoom = 15]{text-size: 43;}" +
	  	"[zoom = 16]{text-size: 50;}" +
	  	"[zoom = 17]{text-size: 58;}" +
	  	"[zoom = 18]{text-size: 67;}" +
	  	"text-fill: #fff;"+
	  	"text-halo-fill: #000000;"+
	  	"polygon-opacity: 0;" +
	  	"::case {" +
	  		"[zoom < 12]{line-width: 3;}" +
			"[zoom >= 12]{line-width: 5;}" +
			"[zoom >= 14]{line-width: 7;}" +
			"[zoom >= 16]{line-width: 9;}" +
      		"line-color:#7e7e7e;" +
      	"}" +
      	"::fill {" +
			"[zoom < 12]{line-width: 1;}" +
			"[zoom >= 12]{line-width: 2;}" +
			"[zoom >= 14]{line-width: 3;}" +
			"[zoom >= 16]{line-width: 4;}" +
      		"line-color:#FFF;" +
      	"}" +
	  	"line-opacity: 0.5;" +
	  	"line-comp-op: soft-light;" +

	"}"

	cartodb.createLayer(map, {
      user_name: 'sco-admin',
      type: 'cartodb',
      sublayers: [{type: "cartodb",
			sql: 'SELECT * FROM bordner_county_bnds',
			cartocss: cartoCSSCounty,
			layerIndex:4
	}]
	}, { https: true })
	// .addTo(map)
	.done(function(layer){
		counties = layer;
		if (countiesAreOn){
			$("#counties").trigger('click') //add to the map
		}
	})

	// Add township layer
	var cartoCSSTown = "#layer { " +
		"polygon-opacity: 0;" +
		"line-color: #939393;" +
		"line-width: 0.5;" +
		"line-opacity: .80;" +
		"line-comp-op: soft-light;" +
		"[zoom > 8]{" +
	  		"line-width: 1;" +
		"}" +
	  	"[zoom > 10]{" +
			"text-name: 'T'+ [twp] + 'N R'+[rng]+[dirchar];" +
			"text-face-name: 'Open Sans Regular';" +
	  		"text-fill: #151515;" +
	  		"text-halo-fill: #fff;" +
	    	"text-halo-radius: 1;" +
	  		"text-size: 13;" +
	  		"line-width: 1.5;" +
	  	"}"+
		"[zoom > 12]{" +
			"text-name: 'T'+ [twp] + 'N R'+[rng]+[dirchar];" +
			"text-face-name: 'Open Sans Regular';" +
			"text-fill: #151515;" +
	  		"text-halo-fill: #fff;" +
	    	"text-halo-radius: 1;" +
	  		"text-size: 17;" +
	  		"line-width: 2.5;" +
		"}"+
		"[zoom > 14]{" +
			"text-name: 'T'+ [twp] + 'N R'+[rng]+[dirchar];" +
			"text-face-name: 'Open Sans Regular';" +
			"text-fill: #151515;" +
	  		"text-halo-fill: #fff;" +
			"text-halo-radius: 1;" +
	  		"text-size: 21;" +
	  		"line-width: 3.5;" +		
		"}"+
		"[zoom > 16]{" +
			"text-name: 'T'+ [twp] + 'N R'+[rng]+[dirchar];" +
			"text-face-name: 'Open Sans Regular';" +
			"text-fill: #151515;" +
			"text-halo-fill: #fff;" +
			"text-halo-radius: 1;" +
	  		"text-size: 25;" +
	  		"line-width: 5;" +
		"}"+
	"}"
	cartodb.createLayer(map, {
      user_name: 'sco-admin',
      type: 'cartodb',
      sublayers: [{type: "cartodb",
			sql: 'SELECT * FROM twpppoly',
			cartocss: cartoCSSTown,
			layerIndex:3
	}]
	}, { https: true })
	// .addTo(map)
	.done(function(layer){
		townships = layer;
		if (townshipsAreOn){
			$("#townships").trigger('click') //add to the map
		}
	})


var cartoCSSLines = getLineCSS('none')

	lines = cartodb.createLayer(map, {
      user_name: 'sco-admin',
      type: 'cartodb',
      sublayers: [{type: "cartodb",
			sql: 'SELECT * FROM final_coastal_lines',
			cartocss: cartoCSSLines,
			interactivity: ['line_type'],
			layerIndex: 5
	}]
}, { https: true })
		.addTo(map)
		.done(function(layer){
			lines = layer
			lines.setInteraction(true)

			lines.bind('featureOver', onLineOver)
			lines.bind('featureOut', onLineOut)

			lines.setOpacity(layerOpacity)

			if ((legendType == "lines") && (typeof(lineTypeSelected) !="undefined")){
				setTimeout(function(){triggerPointOrLineLegendClick(lineTypeSelected)}, 100)
			}
			$('#rangeSlider').slider().on('change', function (ev) {
					ev.preventDefault();
					layerOpacity.points = this.value / 100;
					//lines.setOpacity(layerOpacity);
					replaceQueryValue("layerOpacity", this.value)
			});
	})

	// add bordner density1 layer
	var cartoCSSDensity = "#layer { "+
		"[den1=1] {"+
			"polygon-pattern-file: url('http://maps.sco.wisc.edu/BordnerCoastal/BordnerIcon/pattern8.png');"+
			"polygon-pattern-alignment: local; polygon-pattern-gamma:1; polygon-pattern-simplify: 5; polygon-pattern-opacity: 0.45;"+
		"}"+
		"[den1=2] {"+
			"polygon-pattern-file: url('http://maps.sco.wisc.edu/BordnerCoastal/BordnerIcon/pattern7.png');"+
			"polygon-pattern-alignment: local; polygon-pattern-gamma:1; polygon-pattern-simplify: 5; polygon-pattern-opacity: 0.45;"+
		"}"+
		"[den1=3] {"+
			"polygon-pattern-file: url('http://maps.sco.wisc.edu/BordnerCoastal/BordnerIcon/pattern2.png');"+
			"polygon-pattern-alignment: local; polygon-pattern-gamma:1; polygon-pattern-simplify: 5; polygon-pattern-opacity: 0.45;"+
		"}"+
		"[den1=4] {"+
			"polygon-pattern-file: url('http://maps.sco.wisc.edu/BordnerCoastal/BordnerIcon/pattern5.png');"+
			"polygon-pattern-alignment: local; polygon-pattern-gamma:1; polygon-pattern-simplify: 5; polygon-pattern-opacity: 0.45;"+
		"}"+
	"}"
	cartodb.createLayer(map, {
      user_name: 'sco-admin',
      type: 'cartodb',
      sublayers: [{type: "cartodb",
			sql: 'SELECT * FROM final_coastal_polygons',
			cartocss: cartoCSSDensity,
			layerIndex: 6
	}]
	}, { https: true })
	.done(function(layer){
		density1 = layer;

	});

	// add bordner layer
	createStyles()
	cartoCSSRules = getPolyStyle("level1");
	// Promise for the first layer
	cartodb.createLayer(map, {
      user_name: 'sco-admin',
      type: 'cartodb',
      sublayers: [{type: "cartodb",
			sql: 'SELECT * FROM final_coastal_polygons',
			cartocss: cartoCSSRules,
			interactivity: infowindowVars,
			layerIndex:1
	},{type: "cartodb",
			sql: 'SELECT * FROM final_coastal_polygons',
			cartocss: cartoCSSRules,
			interactivity: ['cartodb_id','cov1', 'cov2'],
			layerIndex:2
	}]
    }, { https: true })
	.addTo(map) // add cartodb layer and basemap to map object
	.done(function(layer) {
		bordner = layer;
		//layer.setOpacity(layerOpacity);
		layer.setInteraction(true);
		setupSublayer(layer, 1, "visible");
		setupSublayer(layer, 2, "hidden");
		$('#rangeSlider').slider().on('change', function (ev) {
			ev.preventDefault();
			layerOpacity.polygons = this.value / 100;
			layer.setOpacity(layerOpacity);
			replaceQueryValue("layerOpacity", this.value)
		});
		layer.setOpacity(layerOpacity);
		layer.bind('featureOver', onPolyOver)
		layer.bind('featureOut', onPolyOut)

		//could add a render event if we updated the leaflet version

		//dispatch the filter, if required in the url parameter
		if ((typeof(level1Selected) != "undefined") && (legendType == "polygons")){
			dispatchLegendClick(level1Selected)
		}
		setupInfoWindow(bordner);
	});

	var cartoCSSPoints = getPointCSS('none')

	 cartodb.createLayer(map, {
	      user_name: 'sco-admin',
	      type: 'cartodb',
	      sublayers: [{type: "cartodb",
				sql: 'SELECT * FROM final_coastal_points',
				cartocss: cartoCSSPoints,
				interactivity: ['point_type'],
				layerIndex: 6
		}]
	}, { https: true })
			.addTo(map)
			.done(function(layer){
				points = layer
				points.setInteraction(true)
				points.bind('featureOver', onPointOver)
				points.bind('featureOut', onPointOut)
				points.setOpacity(layerOpacity)
				if ((legendType == "points") && (typeof(pointTypeSelected) !="undefined")){
					setTimeout(function(){triggerPointOrLineLegendClick(pointTypeSelected)}, 100)
				}
				$('#rangeSlider').slider().on('change', function (ev) {
						ev.preventDefault();
						layerOpacity = this.value / 100;
						//lines.setOpacity(layerOpacity);
						replaceQueryValue("layerOpacity", this.value)
				});
		})

	//add state boundary
	var cartoCSSState = "#layer {"+
  	"::case {"+
    "line-color:#d9d9d9;"+
    "[zoom < 7]{line-width:5;}"+
    "[zoom >= 7]{line-width:6;}"+
    "[zoom >= 9]{line-width:7;}"+
    "[zoom >= 10]{line-width:9;}"+
    "[zoom >= 11]{line-width:11;}"+
    "[zoom >= 12]{line-width:13;}"+
    "[zoom >= 13]{line-width:15;}"+
    "[zoom >= 14]{line-width:17;}"+
    "[zoom >= 15]{line-width:19;}"+
    "[zoom >= 16]{line-width:21;}"+
    "[zoom >= 17]{line-width:22;}"+
    "[zoom >= 18]{line-width:23;}"+
  	"}"+
  	"::fill {"+
    "line-color:#ff9595;"+
    "[zoom < 7]{line-width:2;}"+
    "[zoom >= 7]{line-width:2.5;}"+
	"[zoom >= 9]{line-width:3;}"+
    "[zoom >= 10]{line-width:3.5;}"+
    "[zoom >= 11]{line-width:4;}"+
    "[zoom >= 12]{line-width:4.5;}"+
    "[zoom >= 13]{line-width:5;}"+
    "[zoom >= 14]{line-width:5.5;}"+
    "[zoom >= 15]{line-width:6;}"+
    "[zoom >= 16]{line-width:6.5;}"+
    "[zoom >= 17]{line-width:6.75;}"+
    "[zoom >= 18]{line-width:7;}"+
  	"}"+
	"}"

	cartodb.createLayer(map, {
      user_name: 'sco-admin',
      type: 'cartodb',
      sublayers: [{type: "cartodb",
			sql: 'SELECT * FROM final_coastal_state_boundary',
			cartocss: cartoCSSState,
			layerIndex:8
	}]
	}, { https: true })
	.addTo(map);

	// //add stateful URL
	parseURL();

	setUpMap();

}; // end of onLoad


function parseURL(){
	//get URL parameters and set them as variables here
	//choose what feature types are displayed
	featureTypeParam = $.query.get('featureType')
	if (validateFeatureTypeParam(featureTypeParam)){
		legendType = featureTypeParam
	}

	//choose the basemap
	basemapParam = $.query.get('basemap');
	if (validateBasemapParam(basemapParam)){
		basemapChoice = basemapParam
	}

	//overlays
	//show counties?
	countyParam = $.query.get('showCounties')
	if (validateBooleanParam(countyParam)){
		countiesAreOn = countyParam;
	}
	//show PLSS overlays?
	PLSSParam = $.query.get('showPLSS')
	if (validateBooleanParam(PLSSParam)){
		townshipsAreOn = PLSSParam == "true";
	}

	//show labels?
	labelParam = $.query.get('showLabels')
	if (validateBooleanParam(labelParam)){
		labelsAreOn = labelParam == "true";
	}

//show density overlay
	densityParam = $.query.get('showDensity')
	if (validateBooleanParam(densityParam)){
		densityIsOn = densityParam == "true"
	}

	//histogram scale parameter
	histScaleParam = $.query.get("histogramScale")
	if(validateHistgoramScaleParam(histScaleParam)){
		histogramScale = histScaleParam
	}

	//show the info box
	showInfoBoxParam = $.query.get("showInfo")
	if(validateBooleanParam(showInfoBoxParam)){
		showInfoboxOnHover = showInfoBoxParam == "true";
	}

	var zoom = $.query.get('zoom')
	if ((!isNaN(+zoom)) && (+zoom > 0)){
			map.setZoom(zoom)
	}
	var lat = $.query.get('latitude')
	var lng =  $.query.get('longitude')


	if ((lat != '') && (lng != '') && (!isNaN(+lat)) && (!isNaN(+lng))){
		var center = new L.latLng(lat, lng)
		map.panTo(center)
	}

	//set feature type queries

	//select polygons
	var polygonParam = $.query.get("polygonFilter")
	if (validatePolygonFilterParam(polygonParam)){
		level1Selected = polygonParam;
	}

	//select lines
	var lineFilterParam = $.query.get("lineFilter")
	if (validateLineFilterParam(lineFilterParam)){
		lineTypeSelected = lineFilterParam
	}

	//select points
	var pointFilterParam = $.query.get("pointFilter");
	if (validatePointFilterParam(pointFilterParam)){
		pointTypeSelected = pointFilterParam
		//CS: console.log(pointTypeSelected)
	}

	//layer opacity
	var layerOpacityParam = $.query.get("layerOpacity");
	if (validateLayerOpacityParameter(layerOpacityParam)){
		layerOpacity = layerOpacityParam / 100
	}

} // end parse URL

function validateBasemapParam(param){
	var basemapChoices = ["streets", "satellite", "historic"]
	if (basemapChoices.indexOf(param) > -1){
		return true
	}else{
		return false
	}
}

function validateFeatureTypeParam(param){
	var featureTypeChoices = ["poylgons", "lines", "points"];
	if (featureTypeChoices.indexOf(param) > -1){
		return true;
	}else{
		return false;
	}
}

function validateBooleanParam(param){
	var paramIsTrue = param == "true"
	var paramIsFalse = param == "false"
	if (paramIsTrue || paramIsFalse){
		return true
	}
	return false;
}

function validateHistgoramScaleParam(param){
	var paramChoices = ["log", "linear"]
	if (paramChoices.indexOf(param) > -1){
		return true
	}
	return false;
}

function validatePolygonFilterParam(param){
	var paramChoices = _.keys(level1Membership)
	if (paramChoices.indexOf(param) > -1){
		return true
	}
	return false
}

function validateLineFilterParam(param){
	var paramChoices = _.pluck(lineLegend, "type")
	if (paramChoices.indexOf(param) > -1){
		return true
	}
	return false;
}

function validatePointFilterParam(param){
	//CS: console.log(param)
	var paramChoices = _.pluck(pointLegend, "type");
	//CS: console.log(paramChoices)
	if (paramChoices.indexOf(param) > -1){
		return true;
	}
	return false;
}

function validateLayerOpacityParameter(param){
	param = +param
	if ((!isNaN(param)) && (param >= 0) && (param <=100) && (param != '')){
		return true
	}
}


function triggerPointOrLineLegendClick(code){
	$('[data-type="' + code + '"]').trigger('click')
}

// function for setting up the two sublayers - will turn off the sublayer if it is "hidden"
function setupSublayer(layer, _levelEngaged, _visibility){
	window["sublayer" + _levelEngaged] = layer.getSubLayer(_levelEngaged - 1);
	if (_visibility == "hidden"){
		window["sublayer" + _levelEngaged].hide();
	}else{
		setupInteraction(layer, _levelEngaged, _visibility)
	}
}



function lookupClassFromCode(code){
	//get the object metadata corresponding to the cover code
	theClass = _.where(tempClasses2.classes, {code: code})[0]
	return theClass
}


//utility function that handle errors for formating the infowindow content
function getNameFromCode(code){
	//get the name from a code
	try{
		covClass = lookupClassFromCode(code)
		return covClass.name
	}catch(err){
		//covClass might be undefined
		//if the code is null
		return "Other"
	}
}

function getLevel1FromCode(code){
	//get the level one feature type from the cover code
	try{
		covClass = lookupClassFromCode(code);
		return covClass.level1
	}catch(err){
		return "Other"
	}
}

function translateDensity(den){
	var denTranslate
	if (den == 0){
		denTranslate = "Zero?"
	}else if(den === 1){
		denTranslate = "Good"
	}else if (den === 2){
		denTranslate = "Medium"
	}else if (den === 3){
		denTranslate = "Poor"
	}else if (den === 4){
		denTranslate = "Scattered"
	}
	return denTranslate
}

function formatCoverageForInfowindow(data){
	//prepare the data for templating in the infowindow
	//not totally necessary but makes the template cleaner
	//essential --  get the name for the coverage type here
	infowindowContent = {
		 coverage1: {
			 code: data.cov1,
			 name: getNameFromCode(data.cov1),
			 density:data.den1,
			 minDiameter: data.mindiam1,
			 maxDiameter: data.maxdiam1,
			 percentCover: data.pctcov1,
			 densityTranslate : translateDensity(data.den1)
		 },
		 coverage2: {
			 code: data.cov2,
			 name: getNameFromCode(data.cov2),
			 density: data.den2,
			 minDiameter:data.mindiam2,
			 maxDiameter: data.maxdiam2,
			 percentCover: data.pctcov2,
			 densityTranslate : translateDensity(data.den2)
		 },
		 coverage3: {
			 code:data.cov3,
			 name: getNameFromCode(data.cov3),
			 density: data.den3,
			 minDiameter: data.mindiam3,
			 maxDiameter: data.maxdiam3,
			 percentCover: data.pctcov3,
			 densityTranslate: translateDensity(data.den3)
		 },
		 coverage4: {
			 code: data.cov3,
			 name: getNameFromCode(data.cov4),
			 density: data.den4,
			 minDiameter: data.mindiam4,
			 maxDiameter: data.maxdiam4,
			 percentCover: data.pctcov4,
			 densityTranslate: translateDensity(data.den4)
		 }/*,
		 coverage5: {
			 code: data.cov5,
			 name: getNameFromCode(data.cov5),
			 density: data.den5,
			 minDiameter: data.mindiam5,
			 maxDiameter: data.maxdiam5,
			 percentCover: data.pctcov5,
			 densityTranslate : translateDensity(data.den5)
		 }*/
	}
	if (levelEngaged == 1){
		infowindowContent.levelname = getLevel1FromCode(data.cov1)
	}else if (levelEngaged == 2){
		infowindowContent.levelname = getLevel2FromCode(data.cov1)
	}
	return infowindowContent
}


// set up interaction upon map load or when level1 level2 is toggled
function setupInteraction(layer, _levelEngaged, _visibility){
	//////////////////////////////////////////////////////
	/* To construct a rudimentary popup on click (check .html for #infowindow_template) */
	// setupInfoWindow(layer)

	layer.bind('featureClick', onMapFeatureClick)
	layer.bind('featureClick',function(e, pos, latlng, data) {
            showFeature(data.cartodb_id)
    });
	//manage the population of the infobox

	setupGeocoderSearch()

	//disable mouse events when the table of contents is in use
	$("#layerList").on('mouseover', disableMapInteractionEvents)
	$("#layerList").on('mouseout', enableMapInteractionEvents)
	//make lists of color for using in the legend later
	level1Colors = makeLevel1ColorList();
	level2Colors = makeLevel2ColorList();

	//setup legend navigation
	$("#legend-back").click(function(d){
		// listenToPolyLegend() function now takes the place of this logic  
		//dispatchLegendClick(undefined)
	})

	$("#map").click(onMapClick)

	$('#legendModal').on('hidden.bs.modal', closeLegendTablet);

	map.on('drag', function(){
		map.panInsideBounds(bounds, {animate: false})
	})

	setupCopyToClipboard();

} //end setup interaction

function setupCopyToClipboard(){
	var cpbrd = new Clipboard("#copyButton");
}

function dockMobileInfowindow(){
	$("#mobile-clickwindow").hide();
}

function expandMobileInfowindow(){
	$("#mobile-clickwindow").show();
}

function destroyMobileInfowindow(){
	$("#mobile-clickwindow-holder").remove();
}

function enableDesktopMouseover(){
	$("#infobox").append("<p id='level1-set'></p>")
}


function setupInfoWindow(layer){
	// layer here should be bordner
	// infowindow = cdb.vis.Vis.addInfowindow(map, layer, infowindowVars, {
	// 	triggerEvent: "featureClick",
	// 	cursorInteraction: false
	// }).model.set({
	// 	'template' :  function(obj){
	// 		//!! important
	// 		//modify the object here before sending to templating engine
	// 		//lookup the classname
	// 		content = obj.content
	// 		windowContent = formatCoverageForInfowindow(content.data)
	// 		return _.template($('#infowindow_template').html())(windowContent);
	// 	}
	// });
	//


}

function destroyInfoWindow(){
	$(".cartodb-infowindow").remove(); //just take it off the dom
}

function onMapClick(){


	//close the info window on basemap click
	// if (desktopMode){
	// 	setTimeout(function(){
	// 		if(!isInfowindowOpen){
	// 			infowindow.set('visibility', false);
	// 		}
	// 			isInfowindowOpen = false;
	// 	}, 250) //timeout is important here in maintaining correct popup state
	// }
}

//functions for events on particular feature types
function onLineOver(e, latln, pxPos, data, layer){
	if (legendType == "lines"){
		var lineName = getPointOrLineNameFromCode(data.line_type, 'lines');
		//only dispaly the infobox if the feature is within its zoom level
		if (isFeatureInZoom(data.line_type, 'lines') && (showInfoboxOnHover) && desktopMode){
			if (typeof(lineTypeSelected) == "undefined"){
			$("#infobox").show()
			$("#level1-set").html(lineName)
			}else{
				if (data.line_type == lineTypeSelected){
					$("#infobox").show()
					$("#level1-set").html(lineName)
				}
			}
		}
	}
}

function onLineOut(e, latln, pxPos, data, layer){
	if (legendType == "lines" &&(!showInfoboxOnHover)){
		$("#infobox").hide()
	}
}

function onPointOver(e, latln, pxPos, data, layer){
	if (legendType == "points"){
			var pointName = getPointOrLineNameFromCode(data.point_type, 'points');
			if (isFeatureInZoom(data.point_type, 'points') && (showInfoboxOnHover)){
				if ((typeof(pointTypeSelected) != "undefined") && (data.point_type != pointTypeSelected) && desktopMode){
					return;
				}
				$("#infobox").show()
				$("#level1-set").html(pointName)
			}
	}
}

function onPointOut(e, latln, pxPos, data, layer){
	if(legendType == "points" &&(!showInfoboxOnHover)){
		$("#infobox").hide();
	}
}

function onPolyOver(e, latln, pxPos, data, layer){
	if ((legendType == "polygons") && showInfoboxOnHover && desktopMode){
		if (typeof(level1Selected) == 'undefined'){
			$("#infobox").show()
			level1 = getLevel1FromCode(data.cov1)
			$("#level1-set").html(level1)
		}else{
			var lev1 = getLevel1FromCode(data.cov1)
			var lev2 = getLevel2FromCode(data.cov1)
			if (levelEngaged == 1){
				var theLabel = lev1
			}else{
				var theLabel = lev2
			}
			if (lev1.toLowerCase() == level1Selected.toLowerCase()){
				$("#infobox").show()
				$("#level1-set").html(theLabel)
			}
		}
	}
}

function onPolyOut(e, latln, pxPos, data, layer){
	if (legendType == "polygons" &&(!showInfoboxOnHover)){
		$("#infobox").hide()
	}
}

function showFeature(cartodb_id) {
	sql2.execute("SELECT the_geom as the_geom from final_coastal_polygons WHERE cartodb_id = {{cartodb_id}}", {cartodb_id: cartodb_id} ).done(function(geojson) {
		if (polygon) {
		  map.removeLayer(polygon);
		}
		console.log(geojson)
		polygon = L.geoJson(geojson, { 
		  style: {
			color: "#000",
			fillColor: "#fff",
			fillOpacity: 0.0,
			weight: 2,
			opacity: 0.65
		  }
		}).addTo(map);
	});
	$( ".leaflet-popup-close-button" ).click(function() {
	  map.removeLayer(polygon)
	});
	
}

function isFeatureInZoom(code, featureType){
	var zooms = getZoomLevelsFromCode(code, featureType);
	var currentZoom = map.getZoom();
	return ((currentZoom >= zooms.minZoom) && (currentZoom <= zooms.maxZoom))
}

function getPointOrLineNameFromCode(code, featureType){

	if(featureType == "lines"){
		var featureSet = lineLegend;
	}else if (featureType == "points"){
		var featureSet = pointLegend;
	}
	var theMatch = _.where(featureSet, {type: code});
	if (typeof(theMatch[0]) == "undefined"){
		return "Not in legend"
	}
	var theName = theMatch[0].name;
	return theName

}

function getZoomLevelsFromCode(code, featureType){
	if(featureType == "lines"){
		var featureSet = lineLegend;
	}else if (featureType == "points"){
		var featureSet = pointLegend;
	}
	var theMatch = _.find(featureSet, function(d){return d.type == code});
	if (typeof(theMatch) == "undefined"){
		return "Not in legend"
	}
	var minZoom = theMatch.minZoom;
	var maxZoom = theMatch.maxZoom;
	return {minZoom: minZoom, maxZoom:maxZoom}
}


function getLevelProps(level, level1Selected){
	if (level == 1){
		var set = tempClasses2.classes
		var colorKey = "color1"
		var nameKey = "level1"
	}else if (level == 2){
		var set = level1Membership[level1Selected.toLowerCase().split(" ").join("_")]
		var colorKey = "color2"
		var nameKey = "level2"
	}
	var names = _.pluck(set, nameKey)
	var colors = _.pluck(set, colorKey)
	var className = _.pluck(set, "class");
	var props = _.zip(names, colors, className).map(function(obj){
		return _.object(["name", "color","class"], obj)
	})
	var props = _.sortBy(_.unique(props, function(d){return d.name}), "class");
	return props
}






function onMapFeatureClick(e, latln, pxPos, data, layer){
	map.panTo(latln)
	console.log(e)
	console.log(data)
	console.log(layer)
	//mark the infowindow as open
	isInfowindowOpen = true;
	//hide the infowindow if it's been filtered out by legend interaction
	if (+levelEngaged == 2){
		level1key = level1Selected.toLowerCase().split(" ").join("_")
		level1Members = level1Membership[level1key]
		level1MemberCodes = _.map(level1Members, function(d){return d.code})
		isAMember = _.contains(level1MemberCodes, data.cov1)
		if (!isAMember){
			// infowindow.set('visibility', false)
			return
		}
	}
	if(legendType == "points"){
		$(".cartodb-infowindow").hide()
		isInfowindowOpen = false;
	}
	if(legendType == "lines"){
		$(".cartodb-infowindow").hide()
		isInfowindowOpen = false;
	}
	
	if (!desktopMode){
		$("#infobox").show();
		windowContent = formatCoverageForInfowindow(data)
		$("#infobox").html(_.template($('#infowindow_template_mobile').html())(windowContent));
		$("#dock-mobile-info").click(function(){
			 toggleMobileClickWindow();
		})
	}else if (desktopMode){
		var linked = formatCoverageForInfowindow(data)
		var formatted = _.template($('#infowindow_template').html())(linked)
		p = L.popup({maxWidth: '300'})
			.setLatLng(latln)
			.setContent(formatted)
			.openOn(map)
	}
}


function toggleMobileClickWindow(){
	if (isMobileClickWindowOpen){
		dockMobileInfowindow();
		$("#dock-mobile-info").html("<span class='glyphicon glyphicon-chevron-down'></span>")
		isMobileClickWindowOpen = false;
	}else{
		isMobileClickWindowOpen = true;
		$("#dock-mobile-info").html("<span class='glyphicon glyphicon-chevron-up'></span>")
		expandMobileInfowindow();
	}
}






function disableMapInteractionEvents(){
	map._handlers.forEach(function(handler) {
	    handler.disable();
	});
}

function enableMapInteractionEvents(){
	map._handlers.forEach(function(handler) {
	    handler.enable();
	});
}

function setupGeocoderSearch(){
	// //render the template
	// var v = cdb.vis.Overlay.create("search", map.viz, {})
	// v.show();
	// $("#geocodeButton").append(v.render().el)
	// var searcher = v.render().el
	// // jquery magic to make it look nicer
	// $("geocodeButton").width('100%');
	// $(".cartodb-searchbox").width('100%');
	// $(".text").hide();
	// $("#geocodeButton").on('mouseover', function(){
	// 	$(".text").show();
	// 	$("#geocodeButtonIcon").replaceWith(searcher);
	// })
	// //close the geocoder when the map's been clicked or moved
	// map.on('click', function(){
	// 	$(".cartodb-searchbox").replaceWith('<span id="geocodeButtonIcon" class="button-icon-class glyphicon glyphicon-globe"></span>');
	// })
	// map.on('moveend', function(){
	// 	$(".cartodb-searchbox").replaceWith('<span id="geocodeButtonIcon" class="button-icon-class glyphicon glyphicon-globe"></span>');
	// })
	// if (typeof(L.control.geocoder) != "undefined"){
	// 	L.control.geocoder('mapzen-RsgxFds', {
	// 		bounds: bounds,
	// 		layers: ["street", "neighbourhood", "locality", "county", "region", "country"]
	// 	}).addTo(map);
	// }
}

// Sets everything up after pageload and map creation are complete
function setUpMap(){
	// Create a custom control in bottom left of map, then add html for the four buttons that will exist within this control
	map.addControl(new tabletCustomControl({position: "topleft"})); //Could also be: 'topleft', 'topright', 'bottomleft', 'bottomright'
	$(".tablet-custom-control")
		.attr("id", "tabletCustomControl")
		.html('<div data-toggle="tooltip" title="info" class="leaflet-bar leaflet-control leaflet-control-custom" id="infoButton" onClick="dispatchButtonClick(event, this.id)">' +
				'<span id="infoButtonIcon" class="button-icon-class glyphicon glyphicon-info-sign"></span>' +
			'</div></br>' +
			'<div data-toggle="tooltip" title="share" class="leaflet-bar leaflet-control leaflet-control-custom" id="shareButton" onClick="dispatchButtonClick(event, this.id)">' +
				'<span id="shareButtonIcon" class="button-icon-class glyphicon glyphicon-share-alt">' +
			'</div></br>' +
			'<div data-toggle="tooltip" title="layers" class="leaflet-bar leaflet-control leaflet-control-custom" id="layerListButton" onClick="dispatchButtonClick(event, this.id)">' +
				'<span id="layerListButtonIcon" class="button-icon-class glyphicon glyphicon-menu-hamburger">' +
			'</div></br>' +
			'<div data-toggle="tooltip" title="legend" class="leaflet-bar leaflet-control leaflet-control-custom" id="legendButton" onClick="dispatchButtonClick(event, this.id)">' +
				'<span id="legendButtonIcon" class="button-icon-class glyphicon glyphicon-stats">' +
			'</div></br>'
			// '<div data-toggle="tooltip" title="Search" class="leaflet-bar leaflet-control leaflet-control-custom" id="geocodeButton" onClick="dispatchButtonClick(event, this.id)">' +
			// 	'<span id="geocodeButtonIcon" class="button-icon-class glyphicon glyphicon-globe"></span>' +
			// '</div></br>'
		)

	map.addControl(new geolocationControl({position: 'bottomright'}));
	$(".geolocation-control").html(
		'<div id="geocodeSearchButton" class="geocode-search-button">' +
		'</div></br>' +
		'<div data-toggle="tooltip" title="Locate Me" class="leaflet-bar leaflet-control leaflet-control-custom" id="locateMeButton" onClick="dispatchButtonClick(event, this.id)">' +
			'<span id="shareButtonIcon" class="button-icon-class glyphicon glyphicon-map-marker">' +
		'</div></br>' +
		'<div data-toggle="tooltip" title="Reset Map" class="leaflet-bar leaflet-control leaflet-control-custom" id="goHomeButton" onClick="dispatchButtonClick(event, this.id)">' +
			'<span id="goHomeButtonIcon" class="button-icon-class glyphicon glyphicon-home">' +
		'</div></br>'
	)

	// Add leaflet geocoding plugin 
  var southWest = L.latLng(40.379312, -94.010668); // South west part of the Wisconsin region (somewhere in Iowa)  
  var northEast = L.latLng(48.958198, -86.273782); // Norht east part of the Wisconsin region (somewhere in UP Michigan) 	
		var bounds = L.latLngBounds(southWest, northEast);
		var geocodeIcon = L.icon({
			iconUrl: 'img/icons/marker.gif',
			iconSize:     [36.5, 36], 
			iconAnchor:   [18.25, 18], 
			popupAnchor:  [0.5, -9] 
		});
		var options = {
		//markers: false, // Will turn markers off altogether
		  markers: {icon: geocodeIcon},
		  //latlng: [map.getCenter().lat, map.getCenter().lng], // to search within a radius of the current map center
		  bounds: bounds, // note that bounds is only respected in the search functionality (what happens after you press return), not the autocomplete. See: https://github.com/mapzen/leaflet-geocoder/issues/108 for more.
		  placeholder: "Search",
		  attribution: null,
		  pointIcon: true,
		  polygonIcon: true,
		  //position: 'topright',
		  autocomplete: false, // Turn off autocomplete in order to get "bounds" option to work (also see line 769 and 772 in leaflet-geocoder-mapzen.js for the slight hack to make this work).
		  layers: ['venue','address','county','locality','region','localadmin','neighbourhood'] // Other options include: ['venue', 'address', 'country', 'region', 'county', 'locality', 'localadmin','neighbourhood'] 
		}
	  var geocoder = L.control.geocoder('search-te2euuB', options).addTo(map); // Note, Mapzen api is engaged through CS's github account
	  $('.leaflet-pelias-control').appendTo('#geocodeSearchButton')
	  $('.leaflet-pelias-search-icon').attr("data-toggle", "tooltip").attr("title","Search")
	$("#layerList")
		.html(
		//'<button class="btn btn-primary btn-sm btn-close layer-list-close-btn pull-right"><span class="glyphicon glyphicon-remove"></span></button>' +
		'<h4 class="layer-list-header">Table of Contents' +
		'<button type="button" class="close layer-list-close-btn" data-dismiss="modal" aria-label="Close">' +
			'<span aria-hidden="true">&times;</span>' +
		'</button>' +
		'</h4>' +
		'<div class="col-xs-12" id="layerListBody">' +
		'<label class="legend-label">Bordner Map Features</label>' +
			'<div class="feature-type-radio-group">' +
				'<div class="radio">' +
					'<label><input type="radio" name="featureType" id="featurePolygons">Land use/land cover</label>' +
				'</div>' +
				'<div class="radio">' +
					'<label><input type="radio" name="featureType" id="featurePoints">Buildings, economic, and natural features</label>' +
				'</div>' +
				'<div class="radio">' +
					'<label><input type="radio" name="featureType" id="featureLines">Transportation, water, and infrastructure</label>' +
				'</div>' +
			'</div>' +
			'<label class="legend-label">Additional Map Layers</label>' +
			'<div class="checkbox">' +
				'<label><input type="checkbox" name="overlayType" id="labelsOverlay">Base map labels</label>' +
			'</div>' +
			'<div class="checkbox">' +
				'<label><input type="checkbox" name="overlayType" id="counties" >County boundaries</label>' +
			'</div>' +
			'<div class="checkbox">' +
				'<label><input type="checkbox" name="overlayType" id="townships" >Public land survey township boundaries</label>' +
			'</div>' +
			'<div class="checkbox">' +
				'<label><input type="checkbox" name="overlayType" id="density1">Forest density</label>' +
			'</div>' +
			'<div id="densityLegend" class="checkbox" style="display:none">' +
				'<label><img src="https://maps.sco.wisc.edu/BordnerCoastal/BordnerIcon/pattern4.png" class="densityLegend"> Good</label><label class="checkbox-label-density"><img src="https://maps.sco.wisc.edu/BordnerCoastal/BordnerIcon/pattern3.png" class="densityLegend"> Medium</label><label  class="checkbox-label-density"><img src="https://maps.sco.wisc.edu/BordnerCoastal/BordnerIcon/pattern2.png" class="densityLegend"> Poor</label><label  class="checkbox-label-density"><img src="https://maps.sco.wisc.edu/BordnerCoastal/BordnerIcon/pattern1.png" class="densityLegend"> Scattered</label>' +
			'</div>' +
			'<label class="legend-label">Base Map</label>' +
			'<div class="radio">' +
				'<label><input type="radio" name="basemapType" id="streetsBasemap">Streets</label>' +
			'</div>' +
			'<div class="radio">' +
				'<label><input type="radio" name="basemapType" id="satelliteBasemap">Satellite</label>' +
			'</div>' +
			'<div class="radio">' +
				'<label><input type="radio" name="basemapType" id="historicBasemap" >1930s aerial photography</label>' +
			'</div>' +
			'<label class="legend-label">Land Use/Land Cover Opacity</label>' +
			'<input type="text" value="50" id="rangeSlider" data-slider-min="0" data-slider-max="100" data-slider-step="1" data-slider-value="' +  layerOpacity*100 + '" data-slider-ticks="[0, 100]"  / >' +
		'</div>')


	//Dynamic density legend
	$('#density1').click(function() {($(this).is(":checked")) ? $("#densityLegend").show() : $("#densityLegend").hide();});
	$('input[name=featureType]').click(function(){ turnOnFeatureType(this.id) });
	$('input[name=basemapType]').click(function(){ turnOnBasemap(this.id) });
	$('input[name=overlayType]').click(function(){ turnOnOverlay(this.id) });
	$("#showInfobox").change(function(){
		var isChecked = $(this).prop('checked');
		showInfoboxOnHover = isChecked
		replaceQueryValue("showInfo", isChecked);
		if (isChecked){
			$("#infoboxHolder").css({'top': '40px'})
		}else{
			$("#infoboxHolder").css({'top': '10px'})
			$("#infobox").hide();
		}
	})

	// Hide point, line or poly legend as appropriate
	// $("#polygonLegendHolder").addClass( "legend-holder-hidden" )
	// $("#lineLegendHolder").addClass( "legend-holder-hidden" )
	// $("#pointLegendHolder").addClass( "legend-holder-hidden" )

	// Explicitly set the feature type(will likely use a stateful URL parameter in the future to drive this)
	if (legendType == "polygons"){
		$( "#featurePolygons" ).trigger( "click" )
	}else if (legendType == "points"){
		$( "#featurePoints" ).trigger( "click" )
	}else if (legendType == "lines"){
		$( "#featureLines" ).trigger( "click" )
	}

	// $("#featurePoints").trigger("click")
		// --> $("#featurePolygons").prop("checked", true);
		// --> $("#featurePoints").prop("checked", true);
		// --> $("#featureLines").prop("checked", true);

	// Explicitly set current basemap and click its radio button
	//CS: console.log("basemapChoice")
	//CS: console.log(basemapChoice)
	switch(basemapChoice) {
		case "streets":
			currentBasemap = streetsBasemap;
			$( "#streetsBasemap" ).trigger( "click" );
			break;
		case "satellite":
			currentBasemap = satelliteBasemap;
			$( "#satelliteBasemap" ).trigger( "click" );
			break;
		case "historic":
			currentBasemap = historicBasemap;
			$( "#historicBasemap" ).trigger( "click" );
			break;
		default:
			//CS: console.log("unidentified basemap called")
			currentBasemap = streetsBasemap;
			$( "#streetsBasemap" ).trigger( "click" );
	}
	// Fade-in the toc button and give it a click handler
	$("#tocButton").addClass( "toc-button-unfade" );
	$("#tocButton").click(function(evt) { toggleLegend(evt) });
	// Engage Bootstrap-style tooltips
	$('[data-toggle="tooltip"]').tooltip();

	// Make a demonstration legend
	// demoLegend();

	// call jsMediaQuery to handle tablet/mobile thresholds upon screen resize, then call it once to configure the initial view
	$(window).resize(jsMediaQuery);
	jsMediaQuery();

	// For dynamic legend queries (in progress)
	map.on('moveend', function() {
		if (legendType == "polygons"){
			//CS: console.log("polygons.")
					drawThisView(map.getBounds(), map.getZoom(), levelEngaged, level1Selected);
		}else if (legendType == "lines"){
			//CS: console.log("lines")
			refreshLines();
		}else if (legendType == "points"){
			//CS: console.log("points")
			refreshPoints();
		}

		//update query string with zoom/extent
		replaceQueryValue("zoom", map.getZoom())
		var center = map.getCenter();
		var lat = center.lat;
		var lng = center.lng
		replaceQueryValue("latitude", lat);
		replaceQueryValue("longitude", lng);
	});

	$("#layerList").addClass("closed")
	isLayerListOpen = false;

	if (!desktopMode){
		isLegendOpen = false;
	}

	if (labelsAreOn){
		$("#labelsOverlay").trigger("click")
	}

	// //close the layer list when the close button is clicked
	$(".layer-list-close-btn").click(function(){
		//CS: console.log("been clicked")
		if (desktopMode){
			closeLayerListDesktop();
		}
	})


	map.on('move', function(){
		if (desktopMode){
			closeLayerListDesktop();
		}
	})
	
	$('#splashModal').modal('show');
	// Done, tell the console!
	//CS: console.log("setUpMap() complete. desktopMode = " + desktopMode)
}

function refreshLines(){
	if (typeof(lineTypeSelected) == "undefined"){
		showAllLines();
	}
}

function refreshPoints(){
	if (typeof(pointTypeSelected) == "undefined"){
		//CS: console.log("Refreshing all points")
		showAllPoints();
	}
}

// Media query for when the app traverses the tablet/desktop threshold
var firstCall = "yes"
var jsMediaQuery = function() {
	//CS: console.log("Called")
	if (window.matchMedia('(max-width: 767px)').matches){
		if (desktopMode){
			desktopMode = false;
			//CS: console.log("~~ tablet mode engaged")
			//CS: console.log("Transforming to tablet")
			transformToTablet();
		}
	}else{
		if (firstCall = "yes"){
			firstCall = "no"
			desktopMode = false;
			transformToTablet();
			desktopMode = true;
			transformToDesktop();
		}
		if (desktopMode === false){
			desktopMode = true;
			//CS: console.log("~~ desktop mode engaged")
			transformToDesktop();
		}
	}
};

// To turn on the appropriate feature type (line, point, poly) in the TOC legend
function turnOnFeatureType(featureTypeCalled){
	switch(featureTypeCalled) {
		case "featurePolygons":
			listenToPolyLegend()
			legendType = "polygons";
			$("#legend-header").text("Area Features")
			manageURLToPolygons();
			$("#legendHolder").removeClass("stylescroll").removeClass("autoscroll")
			drawThisView(map.getBounds(), map.getZoom(), levelEngaged, level1Selected)
			if ((typeof(lines) == "undefined") || (typeof(points) == "undefined")){
				setTimeout(function(featureTypeCalled){turnOnFeatureType(featureTypeCalled)}, 50) //this prevents on init load issues with undefined values
			}else{
				showOnlyPolygons();
				$("#rangeSlider").slider('setValue', layerOpacity*100);
				bordner.setOpacity(layerOpacity);
				dispatchLegendClick(cachedLevel1Selection)
			}
			break;
		case "featureLines":
			legendType = "lines"
			manageURLToLines();
			drawLineLegend();
			if ((typeof(bordner) == "undefined") || (typeof(points) == "undefined")){
				setTimeout(function(featureTypeCalled){turnOnFeatureType(featureTypeCalled)}, 50) //this prevents on init load issues with undefined values
			}else{
				resetPolygons();
				showOnlyLines();
				$("#rangeSlider").slider('setValue', layerOpacity*100);
				hideLevel1Label();
				$("#legend-back").hide();
			}
			$("#legend-header").text("Line Features").show();
			break;
		case "featurePoints":
			replaceQueryValue("featureType", "points");
			legendType = "points"
			manageURLToPoints();
			drawPointLegend();
			if ((typeof(lines) == "undefined") || (typeof(bordner) == "undefined")){
				setTimeout(function(featureTypeCalled){turnOnFeatureType(featureTypeCalled)}, 50) //this prevents on init load issues with undefined values
			}else{
				resetPolygons();
				showOnlyPoints();
				$("#rangeSlider").slider('setValue', layerOpacity*100);
				hideLevel1Label();
				$("#legend-back").hide();
			}
			$("#legend-header").text("Point Features").show();
			break;
		default:
			//CS: console.log("unidentified feature type called")
			/*switch(legendType){
				case "points":
					featureTypeCalled = "featurePoints"
					setTimeout(function(featureTypeCalled){
						$( "#featurePoints" ).trigger( "click" )
						//showOnlyPoints()				
					}, 500)
					break;
				case "lines":
					setTimeout(function(featureTypeCalled){
						$( "#featureLines" ).trigger( "click" )
						//showOnlyLines()				
					}, 500)
				case "polygons":
					break;
			}*/
			
	}
}

function resetPolygons(){
	levelEngaged = 1;
	level1Selected = undefined;
	hideLevel1Label();
}

function manageURLToPolygons(){
	replaceQueryValue("featureType", "polygons");
	replaceQueryValue("lineFilter", null)
	replaceQueryValue("pointFilter", null)
}

function manageURLToPoints(){
	replaceQueryValue("featureType", "points");
	replaceQueryValue("polygonFilter", null);
	replaceQueryValue("lineFilter", null);
}

function manageURLToLines(){
	replaceQueryValue("featureType", "lines");
	replaceQueryValue("polygonFilter", null);
	replaceQueryValue("pointFilter", null);
}

function showOnlyPolygons(){
	showNoPoints();
	showNoLines();
	showAllPolygons();
}

function showOnlyLines(){
	//showNoPolygons();
	showNoPoints();
	showAllLines();
	lines.bringToFront();
}

function showOnlyPoints(){
	//showNoPolygons();
	showNoLines();
	showAllPoints();
	points.bringToFront();
}

function showNoPolygons(){
		// bordner.setCartoCSS(getPolyStyle("none"))
		bordner.hide();
}

function showAllPolygons(){
	// bordner.setCartoCSS(getPolyStyle("level1"))
	bordner.show();
}

// To turn on the appropriate basemap, note, the radio button's id must match the basemap's variable name
function turnOnBasemap(basemapCalled){
	map.removeLayer(currentBasemap)
	map.addLayer(window[basemapCalled]);
	if(basemapCalled == "historicBasemap"){
		window[basemapCalled].eachLayer(function(layer){
			//CS: console.log(layer)
			layer.bringToBack();
		});
	}else{
		window[basemapCalled].bringToBack();
	}
	currentBasemap = window[basemapCalled]
	replaceQueryValue("basemap", basemapCalled.replace("Basemap", ""));
}

// To turn on the appropriate basemap, note, the radio button's id must match the basemap's variable name
function turnOnOverlay(overlayCalled){
	if (map.hasLayer(window[overlayCalled])){
		map.removeLayer(window[overlayCalled]);
		didAdd = false;
	}else{
		map.addLayer(window[overlayCalled]);
		didAdd = true;
	}
	reflectChangeLayerInQueryString(overlayCalled, didAdd)
}

function reflectChangeLayerInQueryString(overlayCalled, didAdd){
	if (overlayCalled == "counties"){
		replaceQueryValue("showCounties", didAdd)
	}else if (overlayCalled == "townships"){
		replaceQueryValue("showPLSS", didAdd)
	}else if (overlayCalled == "labelsOverlay"){
		replaceQueryValue("showLabels", didAdd)
	}else if (overlayCalled == "density1"){
		replaceQueryValue("showDensity", didAdd)
	}
}

// To dock/undock the table of contents from bottom
function toggleLegend(evt){
	evt.preventDefault();
	//CS: console.log(isLegendOpen)
	if (isLegendOpen){
		isLegendOpen = false;
		$("#tocButton").addClass('toc-button-closed').show();
		$("#tocButton").html("<span class='glyphicon glyphicon-chevron-up'></span>")
		$("#map").addClass('map-view-full')
		$("#toc").removeClass('toc-view-open')
		$("#toc").addClass('toc-view-closed')
		if (desktopMode){
			//CS: console.log("desktopMode")
			$("#neatline").show();
		}

		setTimeout(function(){ map.invalidateSize()}, 500)
	}else{ //is open
		isLegendOpen = true;
		$("#tocButton").removeClass("toc-button-closed")
		$("#tocButton").html("<span class='glyphicon glyphicon-chevron-down'></span>");
		$("#map").removeClass('map-view-full')
		$("#toc").addClass('toc-view-open')
		$("#toc").removeClass('toc-view-closed')

		if (legendType == "polygons"){
			setTimeout(function(){
				//CS: console.log(levelEngaged)
				//CS: console.log(level1Selected)
				drawThisView(map.getBounds(), map.getZoom(), levelEngaged, level1Selected)
			}, 100)
		}else if (legendType == "lines"){
			drawLineLegend();
		}else if (legendType == "points"){
			drawPointLegend();
		}
	}
}

// To configure desktop view (not called upon pageload - all HTML defaults to desktop styles)
function transformToDesktop(){
	//CS: console.log("Transforming to desktop")
	$("#tocModal").modal('hide');
	$("#infoModal").modal('hide');
	$("#aboutModal").modal('hide');

	$("#infoboxHolder").show();
	$("#infoboxHolder").show();

	//$("#level1Label").css({'bottom': '200px'})

	$("#toc").show();

	drawThisView(map.getBounds(), map.getZoom(), levelEngaged, level1Selected);

	$("#legend").appendTo("#toc");

	$("#infobox").removeClass("infobox-mobile")
	$("#infobox").addClass("infobox-desktop")

	// destroyMobileInfowindow();
	enableDesktopMouseover();
	isLegendOpen = true;

	$("#legend-back").removeClass("col-xs-8").addClass("col-sm-2")
	$("#level1Label").insertAfter("#legend-back");
	// if (typeof(bordner) != "undefined"){
	// 	//happens tablet --> desktop
	// 	setupInfoWindow(bordner);
	// }
}

// To configure tablet view (is called upon pageload)
function transformToTablet(){

	$("#infoboxHolder").hide();
	$("#infobox").hide();
	$("#level1Label").hide();
	$("#toc").hide();

	isLegendOpen = false;

	$("#infobox").addClass("infobox-mobile")
	$("#infobox").removeClass("infobox-desktop")

	map.closePopup();
	map.invalidateSize()

	$("#legend-back").addClass("col-xs-8").removeClass("col-sm-2")
	$("#level1Label").prependTo("#legend");
}

function mailTheView(e,clickID){
	//CS: console.log(e)
	//CS: console.log(clickID)
	document.location.href = "mailto:csee@wisc.edu?Subject=Coastal%20Bordner%20Feedback";
}

// Handles all click events from the 4 main UI buttons
function dispatchButtonClick(e, buttonClicked){
	
	e.preventDefault()
	e.stopPropagation()
	if (desktopMode == true){
		//CS: console.log("Dispatching button click in DESKTOP MODE")
		if (buttonClicked == 'locateMeButton'){
			geoLocate();
		}else if (buttonClicked == "layerListButton"){
			toggleLayerListDesktop();
			return
		} else if (buttonClicked == "infoButton"){
			 $("#aboutModal").modal('show');
			 return
		}else if (buttonClicked == "shareButton"){
			 configInfoShareModal();
			 return
		}else if (buttonClicked == 'geocodeButton'){
			//auto dispatches to the geocoderr
			return
		}else if (buttonClicked == "goHomeButton"){
			window.location = "./";
			return
		}else{
			//CS: console.log("Unknown button, returning...")
			return;
		}
	}else{
		//CS: console.log("Dispatching button click in TABLET MODE")
		//tablet mode
		if (buttonClicked == 'locateMeButton'){	
			geoLocate();
			return
		}else if (buttonClicked == "legendButton"){
			openLegendTablet();
			return
		}else if (buttonClicked == "layerListButton"){
			openLayerListTablet();
			return
		} else if (buttonClicked == "infoButton"){
			 $("#aboutModal").modal('show');
			 return
		}else if (buttonClicked == "shareButton"){
			 configInfoShareModal();
			 return
		}else if (buttonClicked == 'geocodeButton'){
			//auto dispatches to the geocoder
			return
		}else if (buttonClicked == "goHomeButton"){
			window.location = "./";
			return
		}else{
			//CS: console.log("Unknown button, returning...")
			return;
		}
	}

}

function toggleLayerListDesktop(){
	if (isLayerListOpen){
		closeLayerListDesktop()
	}else{
		openLayerListDesktop();
	}
}

function closeLayerListDesktop(){
	isLayerListOpen = false;
	$("#layerList").addClass('closed').removeClass('open')
	$("#layerList").hide();
}

function openLayerListDesktop(){
	isLayerListOpen = true;
	$("#layerList").addClass('open').removeClass('closed')
	$("#layerList").show();
}


function openLayerListTablet(){
	$("#layerListBody").appendTo("#modal-layerListHolder")
	$("#layerListModal").modal('show')
	$("#modal-layerListHolder").height('350px')
	$(".radio").css({'color': 'black'})
	$(".checkbox").css({'color': 'black'})
}

function closeLayerListTablet(){
	$("#modal-layerListHolder").empty();
}

function openLegendTablet(){
	$("#legendModal").modal('show');
	$("#legend").appendTo("#legendModalBody")
	$("legendHolder").addClass("legend-holder-modal")
	isLegendOpen = true;
	drawTabletLegend();
}



function drawTabletLegend(){
	setTimeout(function(){ //wait for modal to be open
		if (legendType == "polygons"){
			drawThisView(map.getBounds(), map.getZoom(), levelEngaged, level1Selected);
		}else if (legendType == "lines"){
			drawLineLegend()
		}else if (legendType == "points"){
			drawPointLegend();
		}
	}, 250)
	setTimeout(adjustTabletLegend, 500);
}


function adjustTabletLegend(){
	d3.selectAll(".axis").style("fill", "black");
	d3.selectAll(".axis").style("text-shadow", "none");
	d3.selectAll(" text").style("fill", "black");
}

function closeLegendTablet(){
	isLegendOpen = false;
}

// ...
function modalAttachTOC(){
	// if (desktopMode){
	// 	// nothing, yet
	// }else{
	// 	$( "#toc" ).appendTo( $( "#tocModalDialogue" ) );
	// 	$( "#toc" ).append($(".leaflet-control-container").addClass( "leaflet-control-container-tablet-custom" ));
	// }
}

// ...
function configInfoShareModal(){
		if (isLayerListOpen){
			toggleLayerListDesktop();
		}

		$("#theLink").text(window.location.href)
		$("#theLink").val (window.location.href)
		$("#infoModal").modal('show');
		$("#aboutModal").modal('hide');

}


function geoLocate(){
	navigator.geolocation.getCurrentPosition(displayUserLocation);
}

function displayUserLocation(pos){
	if (navIsOn){
		map.removeLayer(theLocation)
	}

	var lat = pos.coords.latitude;
	var lng = pos.coords.longitude
	// var point = new L.latLng(lat, lng);
	theLocation = L.circleMarker([lat, lng], {radius: 10}).bindPopup("<h6>You are here</h6>").addTo(map)
	navIsOn = true;
	map.setView([lat, lng])
}

// Whenever the modal is closed...
$('.modal').on('hidden.bs.modal', function () {
	//$("#map").append($(".leaflet-control-container").addClass( "leaflet-control-container-tablet-custom" ));
	$( "#legend" ).removeClass( "legend-off" );
})

// Handle toggle of the level 1/level 2 checkbox
function toggleCheckbox(checkObj){
	//CS: console.log(checkObj.checked) // true = level 2, false = level 1
}

// Extends the leaflet control for creating the buttons in the lower left of the map
var tabletCustomControl = L.Control.extend({
	options: {
		position: 'topleft'
	},
	onAdd: function (map) {
		var container = L.DomUtil.create('div', 'tablet-custom-control');
		return container;
	}
})

var geolocationControl = L.Control.extend({
	options: {
		position: "bottomright"
	},
	onAdd: function(map){
		var container = L.DomUtil.create("div", "geolocation-control")
		return container;
	}
})

var goHomeControl = L.Control.extend({
	options: {
		position: "bottomleft"
	},
	onAdd: function(map){
		var container = L.DomUtil.create("div", "go-home-control")
		return container;
	}
})



// Just a temp. function for demonstrating legend construction
function demoLegend(){
	var highestValue = 0;
	var highestValue2 = 0;
	var highestClass = "none";
	for (var key in tempClasses) {
		var value = tempClasses[key];
		if (value.level2frq > highestValue2){ highestValue2 = value.level2frq; highestClass = value.level2}
		if (!level1Classes.hasOwnProperty(value.level1)) {
			if (value.level1frq > highestValue){ highestValue = value.level1frq; }
			totalFeatures = totalFeatures + value.level1frq
			level1Classes[value.level1] = {"level1": value.level1 , "level1frq": value.level1frq , "hex1": value.hex1}
		}
	}
	level1Classes = _.indexBy(level1Classes, 'level1frq') // playing with http://underscorejs.org/
	var countKey = 0;
	for (var key in level1Classes) {
		var value = level1Classes[key];
		featurePct = (value.level1frq / highestValue) * 100
		$("#lineLegendHolder").append('<div class="histogram-div"; id=legend-'+level1Classes[key].level1+' style="height:' + String(featurePct) + '%; width:10%; left:' + (countKey * 10) + '%; background-color:' + value.hex1 + ';" >'
			+ '<div style="background-color:' + value.hex1 + ';" class="level-1-label-text rotate-text shade-level-1-label-text transition-class">' + level1Classes[key].level1 + '</div></div>')
		countKey++;
	}
}

//Gets the level 2 classes for a level 1 class and returns an array of objects
function getLegendSubclasses(levelClass){
	var subclasses = tempClasses2.classes.filter(function(e){
		return (e.level1 === levelClass);
	});

	var level2List = [];
	for(i = 0; i< subclasses.length; i++){
		if(level2List.indexOf(subclasses[i].level2) === -1){
			level2List.push(subclasses[i].level2);
		};
	};
	return level2List;
};

// Function called upon change in map extent or upon click of legend item
function drawThisView(boundsIn, zoomIn, _levelEngaged, _level1Selected){
		// level1 = (Deciduous)
		// level2 = (Scrub Oak)
		//var _levelEngaged = "1"
		////CS: console.log(zoomIn)
		if ((zoomIn >= semanticZoomLevel) && (legendType === "polygons")){
			//draw the legend
			if (_levelEngaged == "1"){
				//if overview (level1) do this
				cartoQuery = generateAllLayersQuery(boundsIn)
			}else{
				//detailed view of sing class
				cartoQuery = generateSpecificLayerQuery(boundsIn, _level1Selected)
			}
			// //CS: console.log(cartoQuery)
			sql.execute(cartoQuery)
				.done(function(data) {
					$("#legendHolder").empty();
					$("#legendLogLinear").empty();
					$("#legendLogLinear").append("<div class='btn-group pull-right' role='group'><a id='logHist' class='btn btn-default histbtn btn-sm'>Log</a><a id='linearHist' class='btn btn-default histbtn btn-sm'>Linear</a></div>")
					$("#logHist").click(function(){
						histogramScale = "log";
						$(this).addClass('active');
						$("#linearHist").removeClass('active');
						drawThisView(boundsIn, zoomIn, _levelEngaged, _level1Selected, histogramScale);
						replaceQueryValue("histogramScale", "log")
					})
					$("#linearHist").click(function(){
						histogramScale = "linear";
						drawThisView(boundsIn, zoomIn, _levelEngaged, _level1Selected);
						$(this).addClass('active');
						$("#logHist").removeClass('active');
						replaceQueryValue("histogramScale", "linear")
					})
					if (histogramScale == "log"){
						$("#logHist").addClass('active')
					}else{
						$("#linearHist").addClass('active')
					}
					if (desktopMode){
						drawPolygonHistogramDesktop(data, _levelEngaged, "#legendHolder", histogramScale);
					}else{
						drawPolygonHistogramTablet(data, _levelEngaged, "#legendHolder", histogramScale);
					}
					adjustTabletLegend()
				})
				.error(function(errors) {
					//CS: console.log("errors:" + errors);
				})
		}else{
			//zoom < 13
			drawPolyFilter("#legendHolder", _levelEngaged, _level1Selected)
			adjustTabletLegend()
		}
}

function generateAllLayersQuery(boundsIn){
	var cartoQuery = "SELECT cov1, shape_area FROM final_coastal_polygons WHERE the_geom && ST_SetSRID(ST_MakeBox2D(ST_Point(" +
		String(boundsIn._northEast.lng)+","+String(boundsIn._northEast.lat)+"), ST_Point(" +
		String(boundsIn._southWest.lng)+","+String(boundsIn._southWest.lat)+")), 4326) ORDER BY cov1 DESC"
		return cartoQuery
}

function generateSpecificLayerQuery(boundsIn, _level1Selected){
	var classesSelected = getLevel1MemberSearch(_level1Selected)
	var cartoQuery = "SELECT cov1, shape_area FROM final_coastal_polygons WHERE (" + classesSelected +
		") AND the_geom && ST_SetSRID(ST_MakeBox2D(ST_Point(" +
		String(boundsIn._northEast.lng)+","+String(boundsIn._northEast.lat)+"), ST_Point(" +
		String(boundsIn._southWest.lng)+","+String(boundsIn._southWest.lat)+")), 4326) ORDER BY cov1 DESC"
		return cartoQuery
}

function drawPolyFilterDesktop(el, _levelEngaged, _level1Selected){
		$(el).empty();
		var props = getLevelProps(_levelEngaged, _level1Selected);
		var width = $(el).width();
		var height = $(el).height() - 15;

		var margins = {top: 20, left: 30, right: 30, bottom: 100}

		if (height < 0){
			return;
		}

		if (height < 100){
			height = 150;
			margins.bottom = 50;
		}

		//dimension setup
		height = height - margins.top - margins.bottom;
		width = width - margins.left - margins.right;

		if (_levelEngaged == 2){
			var barWidth = 100
			var altWidth = props.length * barWidth;
			if (altWidth < width){
				width = altWidth
			}
		}
		

		//axes setup
		var xScale = d3.scale.ordinal().rangeRoundBands([0, width], 0.05)

		var yScale = d3.scale.linear().range([height, 0])

		var xAxis = d3.svg.axis()
			.scale(xScale)
			.orient('bottom')

		var svg = d3.select(el)
			.append('svg')
			.attr('width', width + margins.left + margins.right)
			.attr('height', height + margins.top + margins.bottom)
			.append('g')
				.attr('transform', "translate(" + margins.left + "," + margins.top + ")")

		xScale.domain(_.pluck(props, "name"))

		svg.append("g")
			.attr("class", " x axis selector-axis")
			.attr("transform", "translate(0,75)")
			.call(xAxis)
			.selectAll(".tick text")
				.call(wrap, xScale.rangeBand())

		// Define the div for the tooltip
		var tt = d3.select("#legendHolder").append("div")	
		    .attr("class", "legendTooltip");

		//these are the data-driven bars proportional to the area in the screen
		svg.selectAll('filter-swatch')
			.data(props)
			.enter().append('rect')
			.style('fill', function(d){return d.color})
			.attr('x', function(d){ return xScale(d.name)})
			.attr('data-name', function(d){return d.name})
			.attr('class', function(d){ return d.class.split(" ").join("_") + " filter-swatch"})
			.attr('width', xScale.rangeBand())
			.attr('data-fill', function(d){return d.color})
			.attr('y', 0)
			.attr('height', 75)
			.style('fill', function(d){
				return d.color
		})
		.on('click', function(d){
			if (levelEngaged == 1){
					dispatchLegendClick(d.name.toLowerCase())
			}else {
				window.open('about/#'+d.name.replace(/ |,|\.|\)|\(/g, "_"))
			}
		})
		//change colors on hover
		.on('mouseover', function(d){
			if (_levelEngaged == 1){
				var self = d3.select(this)
				//set old color so we can recover it
				var oldColor = self.style('fill')
				self.attr('data-fill', oldColor)
				var newColor = shadeRGBColor(oldColor, -0.25)
				self.style('fill', newColor)
				d3.selectAll("." + d.name.split(" ").join("_")).style('fill', newColor)
			}else {		
				/*
				var self = d3.select(this)
				//set old color so we can recover it
				var oldColor = self.style('fill')
				self.attr('data-fill', oldColor)
				var newColor = shadeRGBColor(oldColor, -0.25)
				self.style('fill', newColor)
				d3.selectAll("." + d.name.split(" ").join("_")).style('fill', newColor)	
                tt.style("left",d3.select(this).attr("x")+"px");
                tt.style("top", d3.select(this).attr("y")+"px");
                tt.style("display", "inline-block");
                tt.html("Class definition");
				*/
			}
			//make taller
			// self.attr('y', 0)
			// self.attr('height', height)
		})
		.on('mouseout', function(d){
			if (_levelEngaged == 1){
				var self = d3.select(this)
				var oldColor = self.attr('data-fill')
				self.style('fill', oldColor)
			 d3.selectAll("." + d.name.split(" ").join("_")).style('fill', oldColor)
			}else {
				var self = d3.select(this)
				var oldColor = self.attr('data-fill')
				self.style('fill', oldColor)
			 d3.selectAll("." + d.name.split(" ").join("_")).style('fill', oldColor)
				tt.style("display", "none");
			}
		})
}

function drawPolyFilterTablet(el, _levelEngaged, _level1Selected){
	//draw the filter swatches vertically instead of horizontally to improve readability of labels

	var props = getLevelProps(_levelEngaged, _level1Selected)
	//CS: console.log(props)
	$(el).empty();
		// //CS: console.log(summary)
		var width = $(el).width();
		var height = $(el).height() - 25;

		var margins = {top: 10, left: 200, right: 30, bottom: 10}

		//dimension setup
		height = height - margins.top - margins.bottom;
		width = width - margins.left - margins.right;

		// if (_levelEngaged == 2){
		// 	var barwidth = 125
		// 	var altWidth = barwidth *
		// }


		var barWidth = width;

		//axes setup
		var yScale = d3.scale.ordinal().rangeRoundBands([0, height], 0.05)


		var yAxis = d3.svg.axis()
			.scale(yScale)
			.orient('left')

		var svg = d3.select(el)
			.append('svg')
			.attr('width', width + margins.left + margins.right)
			.attr('height', height + margins.top + margins.bottom)
			.append('g')
				.attr('transform', "translate(" + margins.left + "," + margins.top + ")")

		yScale.domain(_.pluck(props, "name"))

		var tt = d3.select("#legendHolder").append("div")	
		    .attr("class", "legendTooltip");

		svg.append("g")
			.attr("class", "yx axis selector-axis")
			.call(yAxis)
			// .selectAll(".tick text")
			// 	.call(wrap, yScale.rangeBand())

				//these are the data-driven bars proportional to the area in the screen
		svg.selectAll('filter-swatch')
			.data(props)
			.enter().append('rect')
			.style('fill', function(d){return d.color})
			.attr('y', function(d){ return yScale(d.name)})
			.attr('data-name', function(d){return d.name})
			.attr('class', function(d){ return d.name.split(" ").join("_") + " filter-swatch"})
			.attr('height', yScale.rangeBand())
			.attr('data-fill', function(d){return d.color})
			.attr('x', 0)
			.attr('width', barWidth)
			.style('fill', function(d){
				return d.color
		})
		.style('opacity', 0.7)
		.on('click', function(d){
			if (levelEngaged == 1){
					dispatchLegendClick(d.name.toLowerCase())
			}else {
				window.open('about/#'+d.name.replace(/ |,|\.|\)|\(/g, "_"))
			}
		})
		//change colors on hover
		.on('mouseover', function(d){
			if (_levelEngaged == 1){
				var self = d3.select(this)
				//set old color so we can recover it
				var oldColor = self.style('fill')
				self.attr('data-fill', oldColor)
				var newColor = shadeRGBColor(oldColor, -0.25)
				self.style('fill', newColor)
				d3.selectAll("." + d.name.split(" ").join("_")).style('fill', newColor)
			}else {		
				/*
				var self = d3.select(this)
				//set old color so we can recover it
				var oldColor = self.style('fill')
				self.attr('data-fill', oldColor)
				var newColor = shadeRGBColor(oldColor, -0.25)
				self.style('fill', newColor)
				d3.selectAll("." + d.name.split(" ").join("_")).style('fill', newColor)	
                tt.style("left",d3.select(this).attr("x")+"px");
                tt.style("top", d3.select(this).attr("y")+"px");
                tt.style("display", "inline-block");
                tt.html("Class definition");
				*/
			}
			//make taller
			// self.attr('y', 0)
			// self.attr('height', height)
		})
		.on('mouseout', function(d){
			if (_levelEngaged == 1){
				var self = d3.select(this)
				var oldColor = self.attr('data-fill')
				self.style('fill', oldColor)
			 d3.selectAll("." + d.name.split(" ").join("_")).style('fill', oldColor)
			}else {
				var self = d3.select(this)
				var oldColor = self.attr('data-fill')
				self.style('fill', oldColor)
			 d3.selectAll("." + d.name.split(" ").join("_")).style('fill', oldColor)
				tt.style("display", "none");
			}
		})
}



function drawPolyFilter(el, _levelEngaged, _level1Selected){
	if (desktopMode){
		drawPolyFilterDesktop(el, _levelEngaged, _level1Selected)
	}else{
		//tablet mode has different orientation
		if (isLegendOpen){
					drawPolyFilterTablet(el, _levelEngaged, _level1Selected)
		}
	}
}


function getLevel1MemberSearch(_level1Selected){
	//get all of the cov1 codes that fall within the level1 label
	var classesSelected = "";
	var countClasses = 0;
	var operatorInclusion = ""
	var level1key = _level1Selected.toLowerCase().split(" ").join("_")
	jQuery.each(level1Membership[level1key], function(i, val) {
		if (countClasses == 1){
			operatorInclusion = " OR "
		}
		classesSelected = classesSelected + operatorInclusion + "(cov1 = '" + val.code + "')"
		countClasses++;
	})
	return classesSelected
}

function shadeRGBColor(color, percent) {
	//https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
    var f=color.split(","),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=parseInt(f[0].slice(4)),G=parseInt(f[1]),B=parseInt(f[2]);
    return "rgb("+(Math.round((t-R)*p)+R)+","+(Math.round((t-G)*p)+G)+","+(Math.round((t-B)*p)+B)+")";
}


function drawPolygonHistogramDesktop(data, _levelEngaged, el, histogramScale){
	var summary = summarize(data, _levelEngaged)
	// Reverse the summary to have bars draw descending from lef to right
	summary.reverse(); 

	var margins = {top: 20, left: 75, right: 30, bottom: 30}

	var height = $(el).height() - 125;
	if (height < 0){
		return;
	}

	if (height < 100){
		height = 150;
		margins.bottom = 50;
	}

	if (_levelEngaged == 2){
		//make the histogram scrunched to the left on detail
		var numClasses = summary.length;
		var barWidth = 125;
		var width = barWidth * numClasses;
		width += margins.left + margins.right;
		height+= 25;
	}else{
		//make it fill the whole legend box
		var width = $(el).width();
	}



	//dimension setup
	height = height - margins.top - margins.bottom;
	width = width - margins.left - margins.right;



	//axes setup
	var xScale = d3.scale.ordinal().rangeRoundBands([0, width], 0.05)
	if (histogramScale == "linear"){
		var yScale = d3.scale.linear().range([height, 0])
	}else if (histogramScale == "log"){
		var yScale = d3.scale.log().range([height, 0])
	}

	var xAxis = d3.svg.axis()
		.scale(xScale)
		.orient('bottom')

	var yAxis = d3.svg.axis()
		.scale(yScale)
		.orient('left')
		.ticks(5)

	if (histogramScale == "log"){ //make the ticks natural numbers instead of exp
				yAxis.tickFormat(function (d) {
		        return yScale.tickFormat(4,d3.format(",d"))(d)
		})
	}

	var svg = d3.select(el)
		.append('svg')
		.attr('width', width + margins.left + margins.right)
		.attr('height', height + margins.top + margins.bottom)
		.append('g')
			.attr('transform', "translate(" + margins.left + "," + margins.top + ")")

	xScale.domain(summary.map(function(d){return d.type }))
	yScale.domain([0.1, d3.max(summary, function(d){return d.area * polygonLegendFactor})])


	svg.append("g")
		.attr("class", " x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis)
		.selectAll(".tick text")
			.call(wrap, xScale.rangeBand())

	svg.append("g")
		.attr('class', 'y axis')
		.call(yAxis)

	//add a background rectange to listen for click events
	svg.selectAll("background")
		.data(summary)
		.enter()
			.append('rect')
			.attr('class', function(d){ return "background " + d.type.split(" ").join("_")})
			.style('fill', function(d){return d.color})
			.style('fill-opacity', 0.15)
			.attr('x', function(d){return xScale(d.type)})
			.attr('width', xScale.rangeBand())
			.attr('y', 0)
			.attr('height', height)
			.on('click', function(d){
				level1Selected = d.type.toLowerCase()
				if (_levelEngaged == 1){
						dispatchLegendClick(level1Selected)
				} else {
					//CS: console.log("A")
					//CS: console.log(d)
					window.open('about/#'+d.type.replace(/ |,|\.|\)|\(/g, "_"))
				}
			})
			//change colors on hover
			.on('mouseover', function(d){
				if (_levelEngaged == 1){
					var self = d3.select(this)
					//set old color so we can recover it
					var oldColor = self.style('fill')
					self.attr('data-fill', oldColor)
					var newColor = shadeRGBColor(oldColor, -0.25)
					self.style('fill', newColor)
					d3.selectAll("." + d.type.split(" ").join("_")).style('fill', newColor)
					self.attr('cursor', 'pointer')
				}
			})
			.on('mouseout', function(d){
				if (_levelEngaged == 1){
					var self = d3.select(this)
					var oldColor = self.attr('data-fill')
					self.style('fill', oldColor)
				 d3.selectAll("." + d.type.split(" ").join("_")).style('fill', oldColor)
				 self.attr('cursor', 'default')
				}
			})


			//these are the data-driven bars proportional to the area in the screen
	svg.selectAll('bar')
		.data(summary)
		.enter().append('rect')
		.attr('class', function(d){ return "background " + d.type.split(" ").join("_")})
		.style('fill', function(d){return d.color})
		.attr('x', function(d){ return xScale(d.type)})
		.attr('width', xScale.rangeBand())
		.attr('y', function(d){
			var scaledY = yScale(d.area * polygonLegendFactor);
			return scaledY})
		.attr('height', function(d){
			var scaledHeight = height - yScale(d.area * polygonLegendFactor)
			return scaledHeight})
			.on('click', function(d){
				level1Selected = d.type.toLowerCase()
				if (_levelEngaged == 1){
						dispatchLegendClick(level1Selected)
				} else {
					//CS: console.log("B")
					//CS: console.log(d)
					window.open('about/#'+d.type.replace(/ |,|\.|\)|\(/g, "_"))
				}
			})
			//change colors on hover
			.on('mouseover', function(d){
				if (_levelEngaged == 1){
					var self = d3.select(this)
					//set old color so we can recover it
					var oldColor = self.style('fill')
					self.attr('data-fill', oldColor)
					var newColor = shadeRGBColor(oldColor, -0.25)
					d3.selectAll("." + d.type.split(" ").join("_")).style('fill', newColor)
					self.attr('cursor', 'pointer')
				}
			})
			.on('mouseout', function(d){
				if (_levelEngaged == 1){
					var self = d3.select(this)
					var oldColor = self.attr('data-fill')
				  d3.selectAll("." + d.type.split(" ").join("_")).style('fill', oldColor)
					self.attr('cursor', 'default')
				}
			})


	svg.append('text')
		.attr('transform', 'rotate(-90)')
		.attr('y', 0-margins.left)
		.attr('x', 0 - (height / 2))
		.attr('dy', "1em")
		.attr('text-anchor', 'middle')
		.attr('fill', 'white')
		.attr('text-shadow', 'black 0.1em 0.1em 0.2em')
		.text("Acres")
} //end of the draw polygon legend function




function drawPolygonHistogramTablet(data, _levelEngaged, el, histogramScale){
	//draws the histogram on the y axis
	var height = +$(el).height() - 75;
	var width = +$(el).width();

	var summary = summarize(data, _levelEngaged)

	summary.reverse();

	var margins = {top: 20, left: 150, right: 30, bottom: 30}


	//dimension setup
	height = height - margins.top - margins.bottom;
	width = width - margins.left - margins.right;

	if (_levelEngaged == 2){
		var barHeight = 40;
		var altHeight = summary.length * barHeight;
		if (altHeight < height){
			height = altHeight
		}
	}

	if ((height < 0) || (width < 0)){
		return; //modal is closes
	}
	//axes setup
	var yScale = d3.scale.ordinal().rangeRoundBands([0, height], 0.05)
	if (histogramScale == "linear"){
		var xScale = d3.scale.linear().range([0, width])
	}else if (histogramScale == "log"){
		var xScale = d3.scale.log().range([0, width])
	}

	var yAxis = d3.svg.axis()
		.scale(yScale)
		.orient('left')

	var xAxis = d3.svg.axis()
		.scale(xScale)
		.orient('bottom')
		.ticks(5)

	if (histogramScale == "log"){ //make the ticks natural numbers instead of exp
				xAxis.tickFormat(function (d) {
		        return xScale.tickFormat(4, d3.format(",d"))(d)
		})
	}

	var svg = d3.select(el)
		.append('svg')
		.attr('width', width + margins.left + margins.right)
		.attr('height', height + margins.top + margins.bottom)
		.append('g')
			.attr('transform', "translate(" + margins.left + "," + margins.top + ")")

	yScale.domain(summary.map(function(d){return d.type }))
	xScale.domain([0.1, d3.max(summary, function(d){return d.area * polygonLegendFactor})])

	svg.append("g")
		.attr("class", " x axis tablet-hist")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis)

	svg.append("g")
		.attr('class', 'y axis tablet-hist')
		.call(yAxis)

	//add a background rectange to listen for click events
	svg.selectAll("background")
		.data(summary)
		.enter()
			.append('rect')
			.attr('class', function(d){ return "tablet-hist background " + d.type.split(" ").join("_")})
			.style('fill', function(d){return d.color})
			.style('fill-opacity', 0.15)
			.attr('y', function(d){
				return yScale(d.type)})
			.attr('height', yScale.rangeBand())
			.attr('x', 0)
			.attr('width', width)
			.on('click', function(d){
				level1Selected = d.type.toLowerCase()
				if (_levelEngaged == 1){
						dispatchLegendClick(level1Selected)
				} else {
					window.open('about/#'+d.type.replace(/ |,|\.|\)|\(/g, "_"))
				}
			})


			//these are the data-driven bars proportional to the area in the screen
	svg.selectAll('bar')
		.data(summary)
		.enter().append('rect')
		.attr('class', function(d){ return "background " + d.type.split(" ").join("_")})
		.style('fill', function(d){return d.color})
		.attr('y', function(d){ return yScale(d.type)})
		.attr('height', yScale.rangeBand())
		.attr('x', 0)
		.attr('width', function(d){
			var scaledWidth = xScale(d.area * polygonLegendFactor)
			return scaledWidth})
			.on('click', function(d){
				level1Selected = d.type.toLowerCase()
				if (_levelEngaged == 1){
						dispatchLegendClick(level1Selected)
				} else {
					window.open('about/#'+d.type.replace(/ |,|\.|\)|\(/g, "_"))
				}
			})
	svg.append('text')
		// .attr('transform', 'rotate(-90)')
		.attr('x', width - 10)
		.attr('y', height + 15)
		.attr('dy', "1em")
		.attr('text-anchor', 'middle')
		.attr('fill', 'white')
		.attr('text-shadow', 'black 0.1em 0.1em 0.2em')
		.text("Acres")


		$("#linearHist").addClass("tablet-hist-btn").addClass('btn btn-default')
		$("#logHist").addClass("tablet-hist-btn").addClass('btn btn-default')
} //end of the draw polygon legend function

function getColor1FromLevel1(level1){
	var which = _.where(level1Colors, {level1: level1})[0]
	return which.color
}

function getLevel2FromCode(code){
		//get the level one feature type from the cover code
	try{
		covClass = lookupClassFromCode(code);
		return covClass.level2
	}catch(err){
		return "Other"
	}
}

function getColor2FromLevel2(level2){
	var which = _.where(level2Colors, {level2: level2})[0]
	return which.color
}


function summarize(data, level){
	if (level == 1){
		var colorFn = getColor1FromLevel1;
		var prop = "level1"
		var accessor = getLevel1FromCode
	}else if (level==2){
		var colorFn = getColor2FromLevel2;
		var prop = "level2"
		var accessor = getLevel2FromCode;
	}
	var mapped = _.map(data.rows, function(d){
		d[prop] = accessor(d.cov1)
		return d
	})
	var grouped = _.groupBy(mapped, prop)
	var summed = _.map(grouped, function(g, key){
		var item =  {type: key,
			color: colorFn(key),
			area : _(g).reduce(function(m, x){ return m + x.shape_area;}, 0)}
		return item
	})
	var sorted = _.sortBy(summed, "area")
	//sometimes, there's an zero item that has a zero area on it -- remove that or it causes d3 errors
	if (sorted[0].area == 0){
		sorted.shift();
	}
	//CS: console.log(sorted)
	return sorted
}



function wrap(text, width) {
	//https://bl.ocks.org/mbostock/7555321
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
      }
    }
  });
}


function dispatchLegendClick(level1Selected){
	if ((+levelEngaged == 1)&&(level1Selected != undefined)){
		//go from level one to level 2
		levelEngaged = 2;
		$("#legend-back").show();
		$("#level1Label").show();
		$("#legend-header").hide();
		replaceQueryValue("polygonFilter", level1Selected.split(" ").join("_"))
	}else{
		//go from level 2 to level 1
		levelEngaged = 1;
		$("#legend-back").hide();
		$("#level1Label").hide();
		$("#legend-header").show();
		replaceQueryValue("polygonFilter", undefined)
	}
	// level1Selected = level1Selected;
	cachedLevel1Selection = level1Selected
	switchLevel(levelEngaged, level1Selected);
	drawThisView(map.getBounds(), map.getZoom(), levelEngaged, level1Selected);
}


function drawLineLegend(){
	//CS: console.log("Drawing line legend")
	$("#legendHolder").empty();
	$("#legendLogLinear").empty();
	$("#legendHolder").addClass("stylescroll").addClass('autoscroll')
	lineLegendSorted =  _.chain(lineLegend).sortBy("frequency").sortBy("class").unique(function(d){return d.group}).value()
	for (var i=0; i < lineLegendSorted.length; i++){
		var symbol = lineLegendSorted[i];
		var legendEntry = makePointOrLineLegendItem(symbol);
		$("#legendHolder").append(legendEntry)
	}
	listenToLineLegend();
}

function listenToLineLegend(){
	$(".legend-item").click(function(){
		var clickedType = $(this).data('type')
		var clickedName = $(this).data('name')
		lineTypeSelected = clickedType
		$(".legend-media").css({"opacity": 0.25})
		$(".legend-media").removeClass('active');
		$("#showAll").removeClass('active');
		$("#showNone").removeClass("active");
		showOneLine(clickedType)
		$("#level1Label").text(clickedName)
		$("#level1Label").show();
		var child = $($(this).children()[0])
		child.addClass('active')
		child.css({"opacity": 1})
		$("#legend-header").hide();
		$("#legend-back").show();
		$("#legend-back").unbind('click')
		$("#legend-back").bind('click', function(){
			showAllLines();
			$(".legend-media").css({'opacity': 1})
			$(".legend-media").removeClass('active');
			$("#level1Label").hide();
			$("#legend-header").show()
			$("#legend-back").hide();
			lineTypeSelected = undefined
		})
		replaceQueryValue("lineFilter", clickedType)
	})

	$(".legend-media").on('mouseover', function(e){
			var bkgrd = 'rgba(	179,68,50,.5)'
			$(this).css({'background': bkgrd})
	})

	$(".legend-media").on('mouseout', function(e){
			var bkgrd = 'rgba(	179,68,50, 0)'
			$(this).css({'background': bkgrd})
	})
}

function showNoLines(){
	var lineStyle = getLineCSS("none");
	lines.setCartoCSS(lineStyle);
}

function showAllLines(){
	var lineStyle = getLineCSS("all", map.getZoom());
	lines.setCartoCSS(lineStyle);
	lines.bringToFront();
}

function showOneLine(lineType){
	var lineStyle = getLineCSS(lineType);
	lines.setCartoCSS(lineStyle);
	lines.bringToFront();
}

function drawPointLegend(){
	$("#legendHolder").empty();
	$("#legendLogLinear").empty();
	$("#legendHolder").addClass("stylescroll").addClass('autoscroll');
	var pointlegendSorted = _.chain(pointLegend).sortBy("frequency").sortBy("class").unique(function(d){return d.group}).value()
	//CS: console.log(pointlegendSorted)
	for (var i=0; i < pointlegendSorted.length; i++){
		var symbol = pointlegendSorted[i];
		var legendEntry = makePointOrLineLegendItem(symbol);
		$("#legendHolder").append(legendEntry)
	}
	listenToPointLegend();
}


function listenToPointLegend(){
	$(".legend-item").click(function(){
		var clickedType = $(this).data('group')
		var clickedName = $(this).data('name')
		pointTypeSelected = clickedType;
		$(".legend-media").removeClass('active');
		$("#showAll").removeClass('active');
		$("#showNone").removeClass("active");
		$(".legend-media").css({"opacity": 0.25})
		showOnePoint(clickedType)
		$("#level1Label").text(clickedName)
		$("#level1Label").show();
		var child = $($(this).children()[0])
		child.addClass('active')
		child.css({"opacity": 1})
		$("#legend-header").hide();
		$("#legend-back").show();
		$("#legend-back").unbind('click')
		$("#legend-back").bind('click', function(){
			showAllPoints();
			$(".legend-media").css({'opacity': 1})
			$(".legend-media").removeClass('active');
			$("#level1Label").hide();
			$("#legend-header").show();
			$("#legend-back").hide();
			pointTypeSelected = undefined
		})
		replaceQueryValue("pointFilter", clickedType)
	})

	$(".legend-media").on('mouseover', function(e){
			var bkgrd = 'rgba(0, 0, 0, 0.5)'
			$(this).css({'background': bkgrd})
	})

	$(".legend-media").on('mouseout', function(e){
			var bkgrd = 'rgba(0, 0, 0, 0)'
			$(this).css({'background': bkgrd})
	})
}

function listenToPolyLegend(){
	$("#legend-back").unbind('click')
	$("#legend-back").bind('click', function(){
		dispatchLegendClick(undefined)
	})
}

function showNoPoints(){
	var pointStyle = getPointCSS("none");
	points.setCartoCSS(pointStyle);
}
function showAllPoints(){
	var pointStyle = getPointCSS("all", map.getZoom());
	points.setCartoCSS(pointStyle);
	points.bringToFront();
	//CS: console.log(basemapChoice);
}

function showOnePoint(pointType){
	var pointStyle = getPointCSS(pointType);
	points.setCartoCSS(pointStyle);
	points.bringToFront();
}



function makePointOrLineLegendItem(item){
	var legendItem = "<div class='col-xs-6 col-sm-3 col-md-3 col-lg-2 legend-item'  data-type='" + item.type + "' data-name='" + item.name + "' data-group='" + item.group + "'>"
	legendItem += "<div class='media legend-media'>"
	legendItem += "<div class='media-left'><img class='media-object' src='" + item.icon + "'/></div>"
	legendItem += "<div class='media-body'>" + item.name + "</div>"
	legendItem += "</div>"
	return legendItem
}


function displayLevel1Label(level1Selected){
	//display the selected level one so the user knows there was some change
	$("#level1Label").html(titleCase(level1Selected.split("_").join(" ")))

	//figure out positioning
	if (desktopMode){
		var boxHeight = $("#legendHolder").height();
		$("#level1Label").show();
	}else{
		$("#level1Label").show();
		$("#level1Label").prependTo("#legend");
		//$("#level1Label").hide();
	}
}

function hideLevel1Label(){
	$("#level1Label").html("")
	$("#level1Label").hide()
}

// called upon click of legend item
function switchLevel(_levelEngaged, _level1Selected){
	level1Selected = _level1Selected
	cartoCSSRules = getPolyStyle("level"+_levelEngaged, _level1Selected);
	if (_levelEngaged == 2){
		sublayer2.show();
		sublayer1.hide();
		sublayer2.setCartoCSS(cartoCSSRules)
		sublayer2.setInteraction(true)
		displayLevel1Label(_level1Selected)
		//if (!desktopMode){
			//$("#legendModalHeader").text(titleCase(_level1Selected))
		//}
	}else{
		sublayer1.show();
		sublayer2.hide();
		hideLevel1Label();
		$("#legendModalHeader").text("The Legend")
	}
}

//////////////////// Stock code for enabling map queries against CARTO server
var Map = cdb.core.View.extend({
	initialize: function() {
	  //CS: console.log("Map.initialize")
	  _.bindAll(this, '_initMap');
	  this.filters = this.options.filters;
	  this._getVizJson();
	  this._bindEvents();
	},

	_getVizJson: function() {
	  $.ajax({
		url: 'data.json',
		success: this._initMap,
		error: function() {
		  cdb.log.info('problems getting vizjson info, check tools.json url please')
		}
	  })
	},

	_initMap: function(data) {
	  var self = this;
	  cartodb.createVis(this.$el, data.vizjson, {search: true})
		.done(function(vis, layers) {
		  self.layers = layers[1];
		  self.map = vis.getNativeMap();
			var v = cdb.vis.Overlay.create('search', map.viz, {});
		});
	},

	_bindEvents: function() {
	  this.filters.bind('change', this._changeLayerGroup, this);
	},

	_changeLayerGroup: function(layers) {
	  var self = this;

	  _.each(layers, function(opts, i) {
		var pos = i.split('-')[1];
		var sublayer = self.layers.getSubLayer(pos);

		if (sublayer) {
		  sublayer.set(opts);
		}
	  });
	}

})
//////////////////// More stock code
var Filters = cdb.core.View.extend({

	initialize: function() {
	  //CS: console.log("Filters.initialize")
	  _.bindAll(this, 'render');
	  this._getActions();
	},

	render: function(data) {
	  this.clearSubViews();

	  var self = this;

	  if (!data.interactions) return false;
	  var buttons = data.interactions;

	  for (var i = 0, l = buttons.length; i < l; i++) {
		var a = new FiltersItem({ data: buttons[i] });
		a.bind('change', this._triggerChange, this)
		self.addView(a);
		self.$('ul').append(a.render().el);
	  }

	  return this;
	},

	_triggerChange: function(d) {
	  this._setSelectedFilter(d);
	  this.trigger('change', d.layers, this);
	},

	_setSelectedFilter: function(d) {
	  this.$('ul li a').removeClass('selected');
	  this.$('ul li a').each(function(i,a) {
		if ($(a).text() == d.text && $(a).attr('class') == d.className) {
		  $(a).addClass('selected')
		}
	  })
	},

	_getActions: function() {
	  $.ajax({
		url: 'data.json',
		success: this.render,
		error: function() {
		  cdb.log.info('oh no!, check your json location or if you are using a web server (Apache?)')
		}
	  })
	}
})
/////////////////////////////////////////
// create a word cloud just for fun...
var word_count = {};
function createWordCloud(hashedDivID, tempC, _drawLevel){
	////CS: console.log(tempC)
	$(hashedDivID).empty();
	for (var key in tempC) {
		var value = tempC[key];
		word_count[classConfigs[value.cov1]["level" + _drawLevel]] = value.groupSize;
	}
	var svg_location = hashedDivID
	var width = ($(document).width()) * 0.9
	var height = ($(document).height()) * 0.18

	var fill = d3.scale.category20();

	var word_entries = d3.entries(word_count);

	var xScale = d3.scale.linear()
	   .domain([0, d3.max(word_entries, function(d) {
		  return d.value;
		})
	   ])
	   .range([6,30]);

	d3.layout.cloud().size([width, height])
	  .timeInterval(20)
	  .words(word_entries)
	  .fontSize(function(d) { return xScale(+d.value); })
	  .text(function(d) { return d.key; })
	  .rotate(function() { return ~~(Math.random() * 2) * 45; })
	  .font("Impact")
	  .on("end", draw)
	  .start();

	function draw(words) {
	  d3.select(svg_location).append("svg")
		  .attr("preserveAspectRatio", "xMinYMin meet")
		  .attr("viewBox", "0 0 "+ String(width) +" "+ String(height))
		  //.attr("width", width)
		  //.attr("height", height)
		.append("g")
		  .attr("transform", "translate(" + [width >> 1, height >> 1] + ")")
		.selectAll("text")
		  .data(words)
		.enter().append("text")
		  .style("font-size", function(d) { return xScale(d.value) + "px"; })
		  .style("font-family", "Impact")
		  .style("fill", function(d, i) { return fill(i); })
		  .attr("text-anchor", "middle")
		  .attr("transform", function(d) {
			return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
		  })
		  .text(function(d) { return d.key; });
	}
	d3.layout.cloud().stop();
}

function titleCase(str) {
  var newstr = str.split(" ");
  for(i=0;i<newstr.length;i++){
    newstr[i] = newstr[i].charAt(0).toUpperCase() + newstr[i].substring(1).toLowerCase();
  }
   newstr = newstr.join(" ");
   return newstr;
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


function updateQueryString(key, value, url) {
    if (!url) url = window.location.href;
    var re = new RegExp("([?&])" + key + "=.*?(&|#|$)(.*)", "gi"),
        hash;

    if (re.test(url)) {
        if (typeof value !== 'undefined' && value !== null)
            return url.replace(re, '$1' + key + "=" + value + '$2$3');
        else {
            hash = url.split('#');
            url = hash[0].replace(re, '$1$3').replace(/(&|\?)$/, '');
            if (typeof hash[1] !== 'undefined' && hash[1] !== null)
                url += '#' + hash[1];
            return url;
        }
    }
    else {
        if (typeof value !== 'undefined' && value !== null) {
            var separator = url.indexOf('?') !== -1 ? '&' : '?';
            hash = url.split('#');
            url = hash[0] + separator + key + '=' + value;
            if (typeof hash[1] !== 'undefined' && hash[1] !== null)
                url += '#' + hash[1];
            return url;
        }
        else
            return url;
    }
}

function replaceQueryValue(key, value){
	newURL = updateQueryString(key, value);
	window.history.replaceState({path: newURL}, '', newURL)
}
