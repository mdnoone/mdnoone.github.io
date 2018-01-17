
// keeps track of clicked county 
var clickedCountyName;

var hoveredCountyLandcover; // storing variable
var hoveredCountyPoint;		// storing variable
var hoveredCountyLine;		// storing variable

var legendHoverCover;		// storing variable

var keepV2Info = true;		// control variable	

// list of layers to allow hover functions
var hoverLayers = [
	"Agriculture",
	"Deciduous Forest",
	"Other",
	"Urban",
	"Barren",
	"Shrubland",
	"Wetlands",
	"Coniferous Forest",
	"Mixed Forest",
	"Unknown Cover",
	"pointMerge",
	"lineMerge"
];

// list of major landcover layers
var landcoverLayers = [
	"Agriculture",
	"Deciduous Forest",
	"Other",
	"Urban",
	"Barren",
	"Shrubland",
	"Wetlands",
	"Coniferous Forest",
	"Mixed Forest",
	"Unknown Cover"
];

// list of point layers
var pointLayerNames = [
	"pointMerge"
];

// list of line layers
var lineLayerNames = [
	"lineMerge"
];

// for legend, aggregates
var mainLegend = [
	["AG", "#E59966", "Agriculture"],
	["UR", "#C0392A", "Urban"],
	["BA", "#AFB7C0", "Barren"],
	["SL", "#FAD79E", "Shrubland"],
	["MF", "#A66ABE", "Mixed Forest"],
	["WL", "#5FAEE3", "Wetlands"],
	["DF", "#54C083", "Deciduous Forest"],
	["CF", "#19703E", "Coniferous Forest"],
	["O", "#76D6C3", "Other"],
	["U", "#FADC70", "Unknown"]
];

// for point legend
var pointLayers = [
	['C', 'Cemetery', 'Cpoint', '#E6B0AA'],
	['CF', 'Cheese Factory', 'CFpoint', '#D2B4DE'],
	['CH', 'Church', 'CHpoint', '#A9CCE3'],
	['CR', 'Cannery', 'CRpoint', '#A2D9CE'],
	['E', 'Erosion', 'Epoint', '#ABEBC6'],
	['F/G', 'Filling Station/Garage', 'F/Gpoint', '#F9E79F'],
	['FB', 'Farm', 'FBpoint', '#EDBB99'],
	['FF', 'Fur Farm', 'FFpoint', '#CD6155'],
	['FT', 'Fire Tower', 'FTpoint', '#E59966'],
	['GC', 'Golf Course', 'GCpoint', '#28B463'],
	['GL', 'Grist Mill', 'GLpoint', '#FADBD8'],
	['GP', 'Gravel Pit', 'GPpoint', '#EB984E'],
	['H', 'Hotel', 'Hpoint', '#F4D03F'],
	['O', 'Orchard', 'Opoint', '#58D68D'],
	['OH', 'Occupied House', 'OHpoint', '#AED6F1'],
	['OSCH', 'Occupied School', 'OSCHpoint', '#5499C7'],
	['Qu', 'Quarry', 'Qupoint', '#AF7AC5'],
	['S', 'Store', 'Spoint', '#EC7063'],
	['SH', 'Summer House', 'SHpoint', '#F5CBA7'],
	['SL', 'Saw Mill', 'SLpoint', '#FAD7A0'],
	['SP', 'Spring', 'SPpoint', '#A9DFBF'],
	['T', 'Tavern', 'Tpoint', '#A3E4D7'],
	['TH', 'Townhall', 'THpoint', '#AED6F1'],
	['U', 'Unknown', 'Upoint', '#D7BDE2'],
	['VH', 'Vacant House', 'VHpoint', '#F5B7B1']
];

var filterPointLayer = [];	// storing list
// list for filtering points
var filtersForPoints = [
	"all"
];

// for line legend
var lineLayers = [
	['ARR', 'Abandoned Railroad', 'Arrline' , '#F5B7B1'],
	['BL', 'Shoreline', 'BLline', '#D7BDE2'],
	['CB', 'Civil Town Boundary', 'CBline', '#58D68D'],
	['DD', 'Drainage Ditch', 'DDline', '#FAD7A0'],
	['FL', 'Non-drivable Fire Lane', 'FLline', '#EC7063'],
	['HR', 'Hard Surfaced Road', 'HRline', '#ABEBC6'],
	['I', 'Intermittent Stream', 'Iline', '#AED6F1'],
	['ID', 'Improved Dirt Road', 'IDline', '#EB984E'],
	['IG', 'Improved Gravel Road', 'IGline', '#E6B0AA'],
	['PL', 'Power Line', 'PLline', '#A2D9CE'],
	['R', 'Stream', 'Rline', '#5499C7'],
	['RR', 'Railroad', 'RRline', '#F9E79F'],
	['TL', 'Telephone Line', 'TLline', '#E8F8F5'],
	['TR', 'Trail', 'TRline', '#EAFAF1'],
	['U', 'Unknown', 'Uline', '#FDEDEC'],
	['UD', 'Unimproved Dirt Road', 'UDline', '#F5EEF8'],
	['UG', 'Unimproved Gravel Road', 'UGline', '#F9EBEA']
];

var filterLineLayer = [];	// storing list
// for filtering lines
var filtersForLines = [
	"all"
];

// all landcover layers
var combinationLayers = [
	['A3', '#fbb03b', 'Swamp Hardwoods'],
	['A4', '#2980B9', 'Tagalder, Willow, Dogwood, Etc.'],
	['B4', '#e55e5e', 'Cat Tail Marsh'],
	['C4', '#3bb2d0', 'Grass Marsh'],
	['C4b', '#ccc', 'Sedge Marsh'],
	['AP', '#D98880', 'Abandoned Pasture'],
	['BB', '#C39BD3', 'Blueberry'],
	['C', '#7FB3D5', 'Cleared Cropland'],
	['CS', '#5DADE2', 'Cultivated Stump Land'],
	['F4', '#76D7C4', 'Cranberry Marsh'],
	['FP', '#7DCEA0', 'Forest Plantation'],
	['P', '#F1C40F', 'Pasture'],
	['PP', '#FDEBD0', 'Permanent Pasture'],
	['SP', '#A93226', 'Stump Pasture'],
	['OR', '#D6DBDF', 'Orchard'],
	['ARPT', '#D98880', 'Airport'],
	['CM', '#C39BD3', 'Cemetery'],
	['CT', '#7FB3D5', 'City'],
	['FF', '#5DADE2', 'Fur Farm'],
	['FG', '#76D7C4', 'Fair Grounds'],
	['FX', '#7DCEA0', 'Fox Farm'],
	['GC', '#F1C40F', 'Golf Course'],
	['MY', '#FDEBD0', 'Mill Yard'],
	['Qz', '#A93226', 'Quarry'],
	['CA', '#D6DBDF', 'Camp'],
	['PD', '#5D6D7E', 'Public Dump'],
	['U', '#E67E22', 'U -'],
	['CL', '#D98880', 'Clay Pit'],
	['GP', '#C39BD3', 'Gravel Pit'],
	['MF', '#7FB3D5', 'Mud Flats'],
	['RO', '#5DADE2', 'Rock Outcrop'],
	['A', '#76D7C4', 'Abandoned'],
	['CPP', '#7DCEA0', 'Poor Land Previously Cropped'],
	['O', '#F1C40F', 'Open'],
	['A1', '#D98880', 'Upland Hardwoods'],
	['A2', '#C39BD3', 'Hemlock with Hardwood'],
	['B', '#7FB3D5', 'Birch'],
	['C1', '#5DADE2', 'Popple with White Birch'],
	['C1b', '#76D7C4', 'Inferior C1'],
	['D', '#7DCEA0', 'Scrub Oak'],
	['D1', '#F1C40F', 'Oak - Hickory'],
	['D1b', '#FDEBD0', 'Inferior D1'],
	['D1u', '#A93226', 'Good Quality with White Oak'],
	['D1uu', '#D6DBDF', 'Medium Gr. Mostly Red Oak'],
	['D3b', '#5D6D7E', 'Balsam'],
	['BD', '#D98880', 'Beaver Dam'],
	['BF', '#C39BD3', 'Beaver Flowage'],
	['BP', '#7FB3D5', 'Beaver Pond'],
	['IS', '#5DADE2', 'Island'],
	['D5', '#76D7C4', 'Recent Burn'],
	['D5b', '#7DCEA0', 'Dead Timber'],
	['S', '#F1C40F', 'Stump'],
	['Blowdown', '#FDEBD0', 'Blowdown'],
	['Cutover', '#A93226', 'Cutover'],
	['Rcnt. Cut', '#D6DBDF', 'Recent Cut'],
	['Slash', '#5D6D7E', 'Slash'],
	['D4', '#D98880', 'Leather Leaf'],
	['E1', '#C39BD3', 'Pin Cherry'],
	['E4', '#7FB3D5', 'Weedy Peat'],
	['UG', '#5DADE2', 'Unknown Grassland'],
	['B2', '#D98880', 'White Pine'],
	['B3', '#C39BD3', 'White Cedar'],
	['C2', '#7FB3D5', 'Norway Pine'],
	['C3', '#5DADE2', 'Tamarack'],
	['D2', '#76D7C4', 'Jack Pine'],
	['D3', '#7DCEA0', 'Black Spruce'],
	['B1', '#D98880', 'Hardwood with Conifers'],
	['B1b', '#C39BD3', 'Inferior B1'],
	['UF', '#7FB3D5', 'Unknown Forest'],
	['A5', '#D98880', 'A5 -'],
	['AA', '#C39BD3', 'AA -'],
	['AC', '#7FB3D5', 'AC -'],
	['AR', '#5DADE2', 'AR -'],
	['CCC', '#76D7C4', 'CCC -'],
	['CP', '#7DCEA0', 'CP -'],
	['D3u', '#F1C40F', 'D3u -'],
	['E2', '#FDEBD0', 'E2 -'],
	['F', '#A93226', 'F -'],
	['OA', '#D6DBDF', 'OA -'],
	['OC', '#5D6D7E', 'OC -']
];

// wetland landcover layers
var wetlandsLayers = [
	['A3', '#fbb03b', 'Swamp Hardwoods'],
	['A4', '#2980B9', 'Tagalder, Willow, Dogwood, Etc.'],
	['B4', '#e55e5e', 'Cat Tail Marsh'],
	['C4', '#3bb2d0', 'Grass Marsh'],
	['C4b', '#ccc', 'Sedge Marsh']
];

// agriculture landcover layers
var agricultureLayers = [
	['AP', '#D98880', 'Abandoned Pasture'],
	['BB', '#C39BD3', 'Blueberry'],
	['C', '#7FB3D5', 'Cleared Cropland'],
	['CS', '#5DADE2', 'Cultivated Stump Land'],
	['F4', '#76D7C4', 'Cranberry Marsh'],
	['FP', '#7DCEA0', 'Forest Plantation'],
	['P', '#F1C40F', 'Pasture'],
	['PP', '#FDEBD0', 'Permanent Pasture'],
	['SP', '#A93226', 'Stump Pasture'],
	['OR', '#D6DBDF', 'Orchard']
];

// urban landcover layers
var urbanLayers = [
	['ARPT', '#D98880', 'Airport'],
	['CM', '#C39BD3', 'Cemetery'],
	['CT', '#7FB3D5', 'City'],
	['FF', '#5DADE2', 'Fur Farm'],
	['FG', '#76D7C4', 'Fair Grounds'],
	['FX', '#7DCEA0', 'Fox Farm'],
	['GC', '#F1C40F', 'Golf Course'],
	['MY', '#FDEBD0', 'Mill Yard'],
	['Qz', '#A93226', 'Quarry'],
	['CA', '#D6DBDF', 'Camp'],
	['PD', '#5D6D7E', 'Public Dump'],
	['U', '#E67E22', 'U -']
];

// barren landcover layers
var barrenLayers = [
	['CL', '#D98880', 'Clay Pit'],
	['GP', '#C39BD3', 'Gravel Pit'],
	['MF', '#7FB3D5', 'Mud Flats'],
	['RO', '#5DADE2', 'Rock Outcrop'],
	['A', '#76D7C4', 'Abandoned'],
	['CPP', '#7DCEA0', 'Poor Land Previously Cropped'],
	['O', '#F1C40F', 'Open']
];

// deciduous forest landcover layers
var deciduousforestLayers = [
	['A1', '#D98880', 'Upland Hardwoods'],
	['A2', '#C39BD3', 'Hemlock with Hardwood'],
	['B', '#7FB3D5', 'Birch'],
	['C1', '#5DADE2', 'Popple with White Birch'],
	['C1b', '#76D7C4', 'Inferior C1'],
	['D', '#7DCEA0', 'Scrub Oak'],
	['D1', '#F1C40F', 'Oak - Hickory'],
	['D1b', '#FDEBD0', 'Inferior D1'],
	['D1u', '#A93226', 'Good Quality with White Oak'],
	['D1uu', '#D6DBDF', 'Medium Gr. Mostly Red Oak'],
	['D3b', '#5D6D7E', 'Balsam']
];

// other landcover layers
var otherLayers = [
	['BD', '#D98880', 'Beaver Dam'],
	['BF', '#C39BD3', 'Beaver Flowage'],
	['BP', '#7FB3D5', 'Beaver Pond'],
	['IS', '#5DADE2', 'Island'],
	['D5', '#76D7C4', 'Recent Burn'],
	['D5b', '#7DCEA0', 'Dead Timber'],
	['S', '#F1C40F', 'Stump'],
	['Blowdown', '#FDEBD0', 'Blowdown'],
	['Cutover', '#A93226', 'Cutover'],
	['Rcnt. Cut', '#D6DBDF', 'Recent Cut'],
	['Slash', '#5D6D7E', 'Slash']
];

// shrubland landcover layers
var shrublandLayers = [
	['D4', '#D98880', 'Leather Leaf'],
	['E1', '#C39BD3', 'Pin Cherry'],
	['E4', '#7FB3D5', 'Weedy Peat'],
	['UG', '#5DADE2', 'Unknown Grassland']
];

// confierous forest landcover layers
var coniferousforestLayers = [
	['B2', '#D98880', 'White Pine'],
	['B3', '#C39BD3', 'White Cedar'],
	['C2', '#7FB3D5', 'Norway Pine'],
	['C3', '#5DADE2', 'Tamarack'],
	['D2', '#76D7C4', 'Jack Pine'],
	['D3', '#7DCEA0', 'Black Spruce']
];

// mixed forest landcover layers
var mixedforestLayers = [
	['B1', '#D98880', 'Hardwood with Conifers'],
	['B1b', '#C39BD3', 'Inferior B1'],
	['UF', '#7FB3D5', 'Unknown Forest']
];

// unknown landcover layers
var unknownLayers = [
	['A5', '#D98880', 'A5 -'],
	['AA', '#C39BD3', 'AA -'],
	['AC', '#7FB3D5', 'AC -'],
	['AR', '#5DADE2', 'AR -'],
	['CCC', '#76D7C4', 'CCC -'],
	['CP', '#7DCEA0', 'CP -'],
	['D3u', '#F1C40F', 'D3u -'],
	['E2', '#FDEBD0', 'E2 -'],
	['F', '#A93226', 'F -'],
	['OA', '#D6DBDF', 'OA -'],
	['OC', '#5D6D7E', 'OC -']
];

var waterDisplayControl = false;	// control variable
var wetlandsDisplayControl = true;	// control variable

var data;
var getCanvasControl = false;


var toggle01Control = true;	// control variable
var toggle02Control = true;	// control variable
var toggle03Control = false;	// control variable
var toggle04Control = false;	// control variable

// layers to include in adjusting opacity
var opacityLayers = [
	"Agriculture",
	"Deciduous Forest",
	"Other",
	"Urban",
	"Barren",
	"Shrubland",
	"Wetlands",
	"Coniferous Forest",
	"Mixed Forest",
	"Unknown Cover",
	"coastalWaters"
];

// layers for adjusting line opacity
var lineOpacityLayers = [];

var symbolOpacityLayers = [];

var threeDControl = false;

// function to add sources to map
// here is where you can add additional data, 
// other than the major landcover, points, line, and water data
function addMapSources() {
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

// function to add layers to map
// first you would add the source in the function above,
// then you would add the layer to the map from that source
function addCountyInitial() {
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
		'id': 'point',
		'source': 'single-point',
		'type': 'circle',
		'paint': {
			'circle-radius': 10,
			'circle-color': '#007cbf'
		}
	});
};



	
	
	
	
	
	
