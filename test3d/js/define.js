var countyIDArr = [
	"ashlandWetlands",
	"bayfieldWetlands",
	"brownWetlands",
	"doorWetlands",
	"douglasWetlands",
	"ironWetlands",
	"kenoshaWetlands",
	"kewauneeWetlands",
	"marinetteWetlands",
	"ozaukeeWetlands",
	"racineWetlands",
	"sheboyganWetlands"
];
	
var waterIDArr = [
	"ashlandWater",
	"bayfieldWater",
	"brownWater",
	"doorWater",
	"douglasWater",
	"ironWater",
	"kenoshaWater",
	"kewauneeWater",
	"marinetteWater",
	"ozaukeeWater",
	"racineWater",
	"sheboyganWater"
];
	
var tempWaterLayers = [];
	
var countyNames = [
	"Ashland",
	"Bayfield",
	"Brown",
	"Door",
	"Douglas",
	"Iron",
	"Kenosha",
	"Kewaunee",
	"Marinette",
	"Ozaukee",
	"Racine",
	"Sheboygan"
];
	
var currentLayers = [];
var currentWaterLayers = [];
	
var tempLayers = [];
	
var hoverLayers = [
	"ashlandWetlands",
	"bayfieldWetlands",
	"brownWetlands",
	"doorWetlands",
	"douglasWetlands",
	"ironWetlands",
	"kenoshaWetlands",
	"kewauneeWetlands",
	"marinetteWetlands",
	"ozaukeeWetlands",
	"racineWetlands",
	"sheboyganWetlands",
	"county-fills",
	"landcover_A1"
];
	
var wetlandsLegendHolder;
var wetlandsLegend = [
	"A4",
	"A3",
	"B4",
	"C4",
	"C4b",
	"F4",
	"MF",
	"ER"
]
	
var tempMouseOverArr = [];
	
var fullDisplayControl = true;
var selectByCountyControl = false;

var waterDisplayControl = false;
var wetlandsDisplayControl = true;

var clickedCountyName;

var data;
var getCanvasControl = false;




function addMapSources() {
	map.addSource('ashlandWetlands', {
		'type': 'geojson',
		'data': 'data/wetlands/ashland_wetlands.geojson'
	});
		
	map.addSource('bayfieldWetlands', {
		'type': 'geojson',
		'data': 'data/wetlands/bayfield_wetlands.geojson'
	});
		
	map.addSource('brownWetlands', {
		'type': 'geojson',
		'data': 'data/wetlands/brown_wetlands.geojson'
	});
		
	map.addSource('doorWetlands', {
		'type': 'geojson',
		'data': 'data/wetlands/door_wetlands.geojson'
	});
		
	map.addSource('douglasWetlands', {
		'type': 'geojson',
		'data': 'data/wetlands/douglas_wetlands.geojson'
	});
		
	map.addSource('ironWetlands', {
		'type': 'geojson',
		'data': 'data/wetlands/iron_wetlands.geojson'
	});
		
	map.addSource('kenoshaWetlands', {
		'type': 'geojson',
		'data': 'data/wetlands/kenosha_wetlands.geojson'
	});
		
	map.addSource('kewauneeWetlands', {
		'type': 'geojson',
		'data': 'data/wetlands/kewaunee_wetlands.geojson'
	});
		
	map.addSource('marinetteWetlands', {
		'type': 'geojson',
		'data': 'data/wetlands/marinette_wetlands.geojson'
	});
		
	map.addSource('ozaukeeWetlands', {
		'type': 'geojson',
		'data': 'data/wetlands/ozaukee_wetlands.geojson'
	});
		
	map.addSource('racineWetlands', {
		'type': 'geojson',
		'data': 'data/wetlands/racine_wetlands.geojson'
	});
		
	map.addSource('sheboyganWetlands', {
		'type': 'geojson',
		'data': 'data/wetlands/sheboygan_wetlands.geojson'
	});
		
	map.addSource('ashlandWater', {
		'type': 'geojson',
		'data': 'data/water/ashlandWater.geojson'
	});
		
	map.addSource('bayfieldWater', {
		'type': 'geojson',
		'data': 'data/water/bayfieldWater.geojson'
	});
		
	map.addSource('brownWater', {
		'type': 'geojson',
		'data': 'data/water/brownWater.geojson'
	});
		
	map.addSource('doorWater', {
		'type': 'geojson',
		'data': 'data/water/doorWater.geojson'
	});
		
	map.addSource('douglasWater', {
		'type': 'geojson',
		'data': 'data/water/douglasWater.geojson'
	});
		
	map.addSource('ironWater', {
		'type': 'geojson',
		'data': 'data/water/ironWater.geojson'
	});
		
	map.addSource('kenoshaWater', {
		'type': 'geojson',
		'data': 'data/water/kenoshaWater.geojson'
	});
		
	map.addSource('kewauneeWater', {
		'type': 'geojson',
		'data': 'data/water/kewauneeWater.geojson'
	});
		
	map.addSource('marinetteWater', {
		'type': 'geojson',
		'data': 'data/water/marinetteWater.geojson'
	});
		
	map.addSource('ozaukeeWater', {
		'type': 'geojson',
		'data': 'data/water/ozaukeeWater.geojson'
	});
		
	map.addSource('racineWater', {
		'type': 'geojson',
		'data': 'data/water/racineWater.geojson'
	});
		
	map.addSource('sheboyganWater', {
		'type': 'geojson',
		'data': 'data/water/sheboyganWater.geojson'
	});
		
	map.addSource('coastalCounties', {
		'type': 'geojson',
		'data': 'data/counties.geojson'
	});
		
	map.addSource('single-point', {
		'type': 'geojson',
		'data': {
			'type': 'FeatureCollection',
			'features': []
		}
	});
};


function addCountyInitial() {
	map.addLayer({
		'id': 'county-fills',
		'type': 'fill',
		'source': 'coastalCounties',
		'layout': {
			'visibility': 'visible'
		},
		'paint': {
			'fill-color': '#f08',
			'fill-opacity': 0
		}
	});
		
	map.addLayer({
		'id': 'county-borders',
		'type': 'line',
		'source': 'coastalCounties',
		'layout': {
			'visibility': 'visible'
		},
		'paint': {
			'line-color': 'black',
			'line-width': 1
		}
	});
		
	map.addLayer({
		'id': 'county-hover',
		'type': 'fill',
		'source': 'coastalCounties',
		'layout': {
			'visibility': 'visible'
		},
		'paint': {
			'fill-color': '#f08',
			'fill-opacity': 1
		}
	});
		
	map.addLayer({
		'id': 'point',
		'source': 'single-point',
		'type': 'circle',
		'paint': {
			'circle-radius': 10,
			'circle-color': '#007cbf'
		}
	});
};

