mapboxgl.accessToken = 'pk.eyJ1IjoiYm9yZG5lcndsZWkiLCJhIjoiY2lyZjd1a2tyMDA3dmc2bmtkcjUzaG5meCJ9.eswxCZSAnob59HR0wEaTpA';
	
var map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/bordnerwlei/civo4fjrl00162jpbhny9g23c',
	center: [-88.0198, 44.5192],
	zoom: 9,
	preserveDrawingBuffer: false,
	hash: false,
	pitch: 0.1
});


// disable map rotation using right click + drag
map.dragRotate.disable();

// disable map rotation using touch rotation gesture
map.touchZoomRotate.disableRotation();

	
map.on('load', function () {

	var popup = new mapboxgl.Popup({
		closeButton: false,
		closeOnClick: false
	});
});