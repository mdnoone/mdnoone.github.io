var map;
require(["esri/map", "dojo/domReady!"], function(Map) {
	map = new Map("mapDiv", {
		basemap: "topo",
		center: [-122.45, 37.75],
		zoom: 13
	});
});