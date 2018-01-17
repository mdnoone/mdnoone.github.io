

$("#slider").roundSlider({
	min:0,
	max:100,
	step:1,
	value: 100,
	radius: 40,
	width: 10,
	handleSize: 22,
	startAngle: 315,
	endAngle: "+360",
	animation: true,
	showTooltip: true,
	editableToolTip: false,
	readOnly: false,
	disabled: false,
	keyboardAction: true,
	mouseScrollAction: false,
	sliderType: "min-range",
	circleShape: "pie",
	handleShape: "round",
	lineCap: "square",
	
	beforeCreate: null,
	create: null,
	start: null,
	drag: null,
	change: onCircleChange,
	stop: null,
	tooltipFormat: circleToolTip
});

function onCircleChange (e) {
	var circleValue = e.value;
	var n;
	for (n=0; n < opacityLayers.length; n++) {
		map.setPaintProperty(opacityLayers[n], 'fill-opacity', parseInt(circleValue, 10) / 100);
	}
	
	var na;
	for (na=0; na < lineOpacityLayers.length; na++) {
		map.setPaintProperty(lineOpacityLayers[na], 'line-opacity', parseInt(circleValue, 10) / 100);
	}
	
	
	var nb;
	for (nb=0; nb < symbolOpacityLayers.length; nb++) {
		map.setPaintProperty(symbolOpacityLayers[nb], 'circle-opacity', parseInt(circleValue, 10) / 100);
	}
	
};

function circleToolTip(args) {
	return args.value + "%";
};



var displaySearchBarControl = 0;
function displaySearchBar() {
	if (displaySearchBarControl == 0) {
		document.getElementById("geocoder-container").style.visibility = "visible";
		document.getElementById("geocoder-container").style.width = "200px";
		document.getElementById("searchBarToggle").className = "fa fa-times fa-3x";
		displaySearchBarControl = 1;
	} else if (displaySearchBarControl > 0) {
		document.getElementById("geocoder-container").style.visibility = "hidden";
		document.getElementById("geocoder-container").style.width= "0px";
		document.getElementById("searchBarToggle").className = "fa fa-search fa-3x";
		displaySearchBarControl = 0;
	}
};

var showOpacityControlsControl = 0;
function showOpacityControls() {
	if (showOpacityControlsControl == 0) {
		document.getElementById("button01").style.color = "#fff";
		document.getElementById("button01").style.background = "#154360";
		
		document.getElementById("circleSliderContainer").style.left = "10px";
		document.getElementById("slider").style.left = "20px";
		document.getElementById("circleSliderControls").style.left = "110px";
		showOpacityControlsControl = 1;
	} else if (showOpacityControlsControl > 0) {
		document.getElementById("button01").style.color = "black";
		document.getElementById("button01").style.background = "#fff";
		
		document.getElementById("circleSliderContainer").style.left = "-300px";
		document.getElementById("slider").style.left = "-290px";
		document.getElementById("circleSliderControls").style.left = "-190px";
		showOpacityControlsControl = 0;
	}
};

function closeOpacityControls() {
	document.getElementById("circleSliderContainer").style.left = "-300px";
	document.getElementById("slider").style.left = "-290px";
	document.getElementById("circleSliderControls").style.left = "-190px";
	
	document.getElementById("button01").style.color = "black";
	document.getElementById("button01").style.background = "#fff";
	showOpacityControlsControl = 0;
};







