


$('.scroll-pane').jScrollPane({
	verticalDragMinHeight: 20,
	verticalDragMaxHeight: 20
});



var api = $('.scroll-pane').data('jsp');
var throttleTimeout;
$(window).bind(
	'resize',
	function()
	{
		if (!throttleTimeout) {
			throttleTimeout = setTimeout(
				function()
				{
					api.reinitialise();
					throttleTimeout = null;
				},
				50
			);
		}
	}
);

var toolbarControl = 0;
function toggleToolbar() {
	if (toolbarControl == 0) {
		document.getElementById("toolbar").style.left = "50px";
		document.getElementById("grabHandleToggle").className = "fa fa-angle-left fa-3x";
		toolbarControl = 1;
		return toolbarControl;
	} else if (toolbarControl > 0) {
		document.getElementById("toolbar").style.left = "0px";
		document.getElementById("grabHandleToggle").className = "fa fa-angle-right fa-3x";
		toolbarControl = 0;
		return toolbarControl;
	}
};


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
};

function circleToolTip(args) {
	return args.value + "%";
};

function circleToggleColor(source) {
	switch (source) {
		case "toggle01":
			if (toggle01Control == false) {
				document.getElementById(source).style.background = "#5499C7";
				toggle01Control = true;
				
				opacityLayers.push('Agriculture', 'Deciduous Forest', 'Other', 'Urban', 'Barren', 'Shrubland', 'Wetlands', 'Coniferous Forest', 'Mixed Forest', 'Unknown Cover');
				break;
			} else if (toggle01Control == true) {
				document.getElementById(source).style.background = "#fff";
				toggle01Control = false;
				
				var a;
				for(a=0; a < landcoverLayers.length; a++){
					var placeholder = landcoverLayers[a];
					var index = opacityLayers.indexOf(placeholder);
					if (index != -1){
						opacityLayers.splice(index, 1);
					}
				}
				
				break;
			}
		case "toggle02":
			if (toggle02Control == false) {
				document.getElementById(source).style.background = "#5499C7";
				toggle02Control = true;
				
				opacityLayers.push('coastalWaters');
				break;
			} else if (toggle02Control == true) {
				document.getElementById(source).style.background = "#fff";
				toggle02Control = false;
				
				var index2 = opacityLayers.indexOf('coastalWaters');
				if (index != -1){
					opacityLayers.splice(index2, 1);
				}
				
				break;
			}
		case "toggle03":
			if (toggle03Control == false) {
				document.getElementById(source).style.background = "#5499C7";
				toggle03Control = true;
				break;
			} else if (toggle03Control == true) {
				document.getElementById(source).style.background = "#fff";
				toggle03Control = false;
				break;
			}
		case "toggle04":
			if (toggle04Control == false) {
				document.getElementById(source).style.background = "#5499C7";
				toggle04Control = true;
				
			} else if (toggle04Control == true) {
				document.getElementById(source).style.background = "#fff";
				toggle04Control = false;
				
			}
	}
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


var toggleThreeDdisplayControl = 0;
function toggleThreeDdisplay(source) {
	
	if (toggleThreeDdisplayControl == 0) {
		document.getElementById(source).style.background = "#1F618D";
		document.getElementById(source).style.color = "white";
		map.setPitch(35);
		threeDControl = true;
		toggleThreeDdisplayControl = 1;
		
		
		window.history.pushState("hello", "test", "testCopy");
		
		
	} else if (toggleThreeDdisplayControl > 0) {
		document.getElementById(source).style.background = "";
		document.getElementById(source).style.color = "";
		map.setPitch(0.1);
		threeDControl = false;
		toggleThreeDdisplayControl = 0;
		window.history.back();
	}
};

var showButton02ControlsControl = 0;
function showButton02Controls() {
	if (showButton02ControlsControl == 0) {
		document.getElementById("button02").style.color = "#fff";
		document.getElementById("button02").style.background = "#154360";
		map.setStyle('mapbox://styles/bordnerwlei/cis24cuiv0002gtkop2y3wnuc');
		showButton02ControlsControl = 1;
	} else if (showButton02ControlsControl > 0) {
		document.getElementById("button02").style.color = "black";
		document.getElementById("button02").style.background = "#fff";
		map.setStyle('mapbox://styles/bordnerwlei/cirf7wsrr0003g8nlogxrqxyr');
		showButton02ControlsControl = 0;
	}	
};

var showButton03ControlsControl = 0;
function showButton03Controls() {
	if (showButton03ControlsControl == 0) {
		document.getElementById("button03").style.color = "#fff";
		document.getElementById("button03").style.background = "#154360";
		showButton03ControlsControl = 1;
	} else if (showButton03ControlsControl > 0) {
		document.getElementById("button03").style.color = "black";
		document.getElementById("button03").style.background = "#fff";
		showButton03ControlsControl = 0;
	}	
};


var alterLegendInfoClickControl = 0;
function alterLegendInfoClick(source) {
	var sourcePlaceholder = document.getElementById(source);
	
	if (alterLegendInfoClickControl == 0) {
		switch (source) {
			case "AG":
				map.setLayoutProperty('Agriculture', 'visibility', 'visible');
				
				changeLegendAndMapAgriculture();
				
				map.setLayoutProperty('Urban', 'visibility', 'none');
				map.setLayoutProperty('Barren', 'visibility', 'none');
				map.setLayoutProperty('Shrubland', 'visibility', 'none');
				map.setLayoutProperty('Mixed Forest', 'visibility', 'none');
				map.setLayoutProperty('Wetlands', 'visibility', 'none');
				map.setLayoutProperty('Deciduous Forest', 'visibility', 'none');
				map.setLayoutProperty('Coniferous Forest', 'visibility', 'none');
				map.setLayoutProperty('Other', 'visibility', 'none');
				map.setLayoutProperty('Unknown Cover', 'visibility', 'none');
				break;
			case "UR":
				map.setLayoutProperty('Urban', 'visibility', 'visible');
				
				changeLegendAndMapUrban();
				
				map.setLayoutProperty('Agriculture', 'visibility', 'none');
				map.setLayoutProperty('Barren', 'visibility', 'none');
				map.setLayoutProperty('Shrubland', 'visibility', 'none');
				map.setLayoutProperty('Mixed Forest', 'visibility', 'none');
				map.setLayoutProperty('Wetlands', 'visibility', 'none');
				map.setLayoutProperty('Deciduous Forest', 'visibility', 'none');
				map.setLayoutProperty('Coniferous Forest', 'visibility', 'none');
				map.setLayoutProperty('Other', 'visibility', 'none');
				map.setLayoutProperty('Unknown Cover', 'visibility', 'none');
				break;
			case "BA":
				map.setLayoutProperty('Barren', 'visibility', 'visible');
				
				changeLegendAndMapBarren();
				
				map.setLayoutProperty('Urban', 'visibility', 'none');
				map.setLayoutProperty('Agriculture', 'visibility', 'none');
				map.setLayoutProperty('Shrubland', 'visibility', 'none');
				map.setLayoutProperty('Mixed Forest', 'visibility', 'none');
				map.setLayoutProperty('Wetlands', 'visibility', 'none');
				map.setLayoutProperty('Deciduous Forest', 'visibility', 'none');
				map.setLayoutProperty('Coniferous Forest', 'visibility', 'none');
				map.setLayoutProperty('Other', 'visibility', 'none');
				map.setLayoutProperty('Unknown Cover', 'visibility', 'none');
				break;
			case "SL":
				map.setLayoutProperty('Shrubland', 'visibility', 'visible');
				
				changeLegendAndMapShrubland();
				
				map.setLayoutProperty('Urban', 'visibility', 'none');
				map.setLayoutProperty('Barren', 'visibility', 'none');
				map.setLayoutProperty('Agriculture', 'visibility', 'none');
				map.setLayoutProperty('Mixed Forest', 'visibility', 'none');
				map.setLayoutProperty('Wetlands', 'visibility', 'none');
				map.setLayoutProperty('Deciduous Forest', 'visibility', 'none');
				map.setLayoutProperty('Coniferous Forest', 'visibility', 'none');
				map.setLayoutProperty('Other', 'visibility', 'none');
				map.setLayoutProperty('Unknown Cover', 'visibility', 'none');
				break;
			case "MF":
				map.setLayoutProperty('Mixed Forest', 'visibility', 'visible');
				
				changeLegendAndMapMixedForest();
				
				map.setLayoutProperty('Urban', 'visibility', 'none');
				map.setLayoutProperty('Barren', 'visibility', 'none');
				map.setLayoutProperty('Shrubland', 'visibility', 'none');
				map.setLayoutProperty('Agriculture', 'visibility', 'none');
				map.setLayoutProperty('Wetlands', 'visibility', 'none');
				map.setLayoutProperty('Deciduous Forest', 'visibility', 'none');
				map.setLayoutProperty('Coniferous Forest', 'visibility', 'none');
				map.setLayoutProperty('Other', 'visibility', 'none');
				map.setLayoutProperty('Unknown Cover', 'visibility', 'none');
				break;
			case "WL":
				map.setLayoutProperty('Wetlands', 'visibility', 'visible');
				
				changeLegendAndMapWetlands();
				
				map.setLayoutProperty('Urban', 'visibility', 'none');
				map.setLayoutProperty('Barren', 'visibility', 'none');
				map.setLayoutProperty('Shrubland', 'visibility', 'none');
				map.setLayoutProperty('Mixed Forest', 'visibility', 'none');
				map.setLayoutProperty('Agriculture', 'visibility', 'none');
				map.setLayoutProperty('Deciduous Forest', 'visibility', 'none');
				map.setLayoutProperty('Coniferous Forest', 'visibility', 'none');
				map.setLayoutProperty('Other', 'visibility', 'none');
				map.setLayoutProperty('Unknown Cover', 'visibility', 'none');
				break;
			case "DF":
				map.setLayoutProperty('Deciduous Forest', 'visibility', 'visible');
				
				changeLegendAndMapDeciduousForest();
				
				map.setLayoutProperty('Urban', 'visibility', 'none');
				map.setLayoutProperty('Barren', 'visibility', 'none');
				map.setLayoutProperty('Shrubland', 'visibility', 'none');
				map.setLayoutProperty('Mixed Forest', 'visibility', 'none');
				map.setLayoutProperty('Wetlands', 'visibility', 'none');
				map.setLayoutProperty('Agriculture', 'visibility', 'none');
				map.setLayoutProperty('Coniferous Forest', 'visibility', 'none');
				map.setLayoutProperty('Other', 'visibility', 'none');
				map.setLayoutProperty('Unknown Cover', 'visibility', 'none');
				break;
			case "CF":
				map.setLayoutProperty('Coniferous Forest', 'visibility', 'visible');
				
				changeLegendAndMapConiferousForest();
				
				map.setLayoutProperty('Urban', 'visibility', 'none');
				map.setLayoutProperty('Barren', 'visibility', 'none');
				map.setLayoutProperty('Shrubland', 'visibility', 'none');
				map.setLayoutProperty('Mixed Forest', 'visibility', 'none');
				map.setLayoutProperty('Wetlands', 'visibility', 'none');
				map.setLayoutProperty('Deciduous Forest', 'visibility', 'none');
				map.setLayoutProperty('Agriculture', 'visibility', 'none');
				map.setLayoutProperty('Other', 'visibility', 'none');
				map.setLayoutProperty('Unknown Cover', 'visibility', 'none');
				break;
			case "O":
				map.setLayoutProperty('Other', 'visibility', 'visible');
				
				changeLegendAndMapOther();
				
				map.setLayoutProperty('Urban', 'visibility', 'none');
				map.setLayoutProperty('Barren', 'visibility', 'none');
				map.setLayoutProperty('Shrubland', 'visibility', 'none');
				map.setLayoutProperty('Mixed Forest', 'visibility', 'none');
				map.setLayoutProperty('Wetlands', 'visibility', 'none');
				map.setLayoutProperty('Deciduous Forest', 'visibility', 'none');
				map.setLayoutProperty('Coniferous Forest', 'visibility', 'none');
				map.setLayoutProperty('Agriculture', 'visibility', 'none');
				map.setLayoutProperty('Unknown Cover', 'visibility', 'none');
				break;
			case "U":
				map.setLayoutProperty('Unknown Cover', 'visibility', 'visible');
				
				changeLegendAndMapUnknown();
				
				map.setLayoutProperty('Urban', 'visibility', 'none');
				map.setLayoutProperty('Barren', 'visibility', 'none');
				map.setLayoutProperty('Shrubland', 'visibility', 'none');
				map.setLayoutProperty('Mixed Forest', 'visibility', 'none');
				map.setLayoutProperty('Wetlands', 'visibility', 'none');
				map.setLayoutProperty('Deciduous Forest', 'visibility', 'none');
				map.setLayoutProperty('Coniferous Forest', 'visibility', 'none');
				map.setLayoutProperty('Other', 'visibility', 'none');
				map.setLayoutProperty('Agriculture', 'visibility', 'none');
				
		}
		//alterLegendInfoClickControl = 1;
	} else if (alterLegendInfoClickControl > 0) {
		map.setLayoutProperty('Unknown Cover', 'visibility', 'visible');
				
		map.setLayoutProperty('Urban', 'visibility', 'visible');
		map.setLayoutProperty('Barren', 'visibility', 'visible');
		map.setLayoutProperty('Shrubland', 'visibility', 'visible');
		map.setLayoutProperty('Mixed Forest', 'visibility', 'visible');
		map.setLayoutProperty('Wetlands', 'visibility', 'visible');
		map.setLayoutProperty('Deciduous Forest', 'visibility', 'visible');
		map.setLayoutProperty('Coniferous Forest', 'visibility', 'visible');
		map.setLayoutProperty('Other', 'visibility', 'visible');
		map.setLayoutProperty('Agriculture', 'visibility', 'visible');
		alterLegendInfoClickControl = 0;
	}
};


function alterLegendInfo(source) {
	var placeholder = document.getElementById("legendv2Info");
	var sourcePlaceholder = document.getElementById(source);
	switch (source) {
		case "AG":
			placeholder.innerHTML = "Agriculture";
			placeholder.style.background = "#E59966";
			placeholder.style.border = "1px solid #ddd";
			break;
		case "UR":
			placeholder.innerHTML = "Urban";
			placeholder.style.background = "#C03921";
			placeholder.style.border = "1px solid #ddd";
			break;
		case "BA":
			placeholder.innerHTML = "Barren";
			placeholder.style.background = "#AFB7C0";
			placeholder.style.border = "1px solid #ddd";
			break;
		case "SL":
			placeholder.innerHTML = "Shrubland";
			placeholder.style.background = "#FAD79E";
			placeholder.style.border = "1px solid #ddd";
			break;
		case "MF":
			placeholder.innerHTML = "Mixed Forest";
			placeholder.style.background = "#A66ABE";
			placeholder.style.border = "1px solid #ddd";
			break;
		case "WL":
			placeholder.innerHTML = "Wetlands";
			placeholder.style.background = "#5FAEE3";
			placeholder.style.border = "1px solid #ddd";
			break;
		case "DF":
			placeholder.innerHTML = "Deciduous Forest";
			placeholder.style.background = "#54C083";
			placeholder.style.border = "1px solid #ddd";
			break;
		case "CF":
			placeholder.innerHTML = "Coniferous Forest";
			placeholder.style.background = "#19703E";
			placeholder.style.border = "1px solid #ddd";
			break;
		case "O":
			placeholder.innerHTML = "Other";
			placeholder.style.background = "#76D6C3";
			placeholder.style.border = "1px solid #ddd";
			break;
		case "U":
			placeholder.innerHTML = "Unknown";
			placeholder.style.background = "#FADC70";
			placeholder.style.border = "1px solid #ddd";
	}
};

function exitLegendInfo(source) {
	var placeholder = document.getElementById("legendv2Info");
	var sourcePlaceholder = document.getElementById(source);
	
	placeholder.innerHTML = "";
	placeholder.style.background = "transparent";
	placeholder.style.border = "1px solid transparent";
};

function clickLegendBack(source) {
	document.getElementById("loadingScreen").style.visibility = "visible";
	// Show all layers
	map.setLayoutProperty('Agriculture', 'visibility', 'visible');
	map.setLayoutProperty('Deciduous Forest', 'visibility', 'visible');
	map.setLayoutProperty('Other', 'visibility', 'visible');
	map.setLayoutProperty('Urban', 'visibility', 'visible');
	map.setLayoutProperty('Barren', 'visibility', 'visible');
	map.setLayoutProperty('Shrubland', 'visibility', 'visible');
	map.setLayoutProperty('Wetlands', 'visibility', 'visible');
	map.setLayoutProperty('Coniferous Forest', 'visibility', 'visible');
	map.setLayoutProperty('Mixed Forest', 'visibility', 'visible');
	map.setLayoutProperty('Unknown Cover', 'visibility', 'visible');
	
	// hide wetlands layer
	map.setPaintProperty('Wetlands', 'fill-color', '#5FAEE3');
	map.setPaintProperty('Agriculture', 'fill-color', '#E59966');
	map.setPaintProperty('Urban', 'fill-color', '#C0392A');
	map.setPaintProperty('Barren', 'fill-color', '#AFB7C0');
	map.setPaintProperty('Shrubland', 'fill-color', '#FAD79E');
	map.setPaintProperty('Mixed Forest', 'fill-color', '#A66ABE');
	map.setPaintProperty('Deciduous Forest', 'fill-color', '#54C083');
	map.setPaintProperty('Coniferous Forest', 'fill-color', '#19703E');
	map.setPaintProperty('Other', 'fill-color', '#76D6C3');
	map.setPaintProperty('Unknown Cover', 'fill-color', '#FADC70');
	
	// remove back button
	var m1 = document.getElementById("legendv2").lastElementChild;
	var m2 = m1.childNodes[0];
	var m3 = m2.childNodes[0];
	m2.removeChild(m3);
	
	// remove wetlands legend
	if (source == 'Wetlands'){
		var v;
		for(v=0; v < wetlandsLayers.length; v++){
			var p1 = document.getElementById("legendv2").lastElementChild;
			var p2 = p1.childNodes[0];
			var p3 = p2.childNodes[0];
			p2.removeChild(p3);
		}
	} else if (source == 'Agriculture') {
		var v;
		for (v=0; v < agricultureLayers.length; v++) {
			var p1 = document.getElementById("legendv2").lastElementChild;
			var p2 = p1.childNodes[0];
			var p3 = p2.childNodes[0];
			p2.removeChild(p3);
		}
	} else if (source == 'Urban') {
		var v;
		for (v=0; v < urbanLayers.length; v++) {
			var p1 = document.getElementById("legendv2").lastElementChild;
			var p2 = p1.childNodes[0];
			var p3 = p2.childNodes[0];
			p2.removeChild(p3);
		}
	} else if (source == 'Barren') {
		var v;
		for (v=0; v < barrenLayers.length; v++) {
			var p1 = document.getElementById("legendv2").lastElementChild;
			var p2 = p1.childNodes[0];
			var p3 = p2.childNodes[0];
			p2.removeChild(p3);
		}
	} else if (source == 'Deciduous Forest') {
		var v;
		for (v=0; v < deciduousforestLayers.length; v++) {
			var p1 = document.getElementById("legendv2").lastElementChild;
			var p2 = p1.childNodes[0];
			var p3 = p2.childNodes[0];
			p2.removeChild(p3);
		}
	} else if (source == 'Other') {
		var v;
		for (v=0; v < otherLayers.length; v++) {
			var p1 = document.getElementById("legendv2").lastElementChild;
			var p2 = p1.childNodes[0];
			var p3 = p2.childNodes[0];
			p2.removeChild(p3);
		}
	} else if (source == 'Shrubland') {
		var v;
		for (v=0; v < shrublandLayers.length; v++) {
			var p1 = document.getElementById("legendv2").lastElementChild;
			var p2 = p1.childNodes[0];
			var p3 = p2.childNodes[0];
			p2.removeChild(p3);
		}
	} else if (source == 'Coniferous Forest') {
		var v;
		for (v=0; v < coniferousforestLayers.length; v++) {
			var p1 = document.getElementById("legendv2").lastElementChild;
			var p2 = p1.childNodes[0];
			var p3 = p2.childNodes[0];
			p2.removeChild(p3);
		}
	} else if (source == 'Mixed Forest') {
		var v;
		for (v=0; v < mixedforestLayers.length; v++) {
			var p1 = document.getElementById("legendv2").lastElementChild;
			var p2 = p1.childNodes[0];
			var p3 = p2.childNodes[0];
			p2.removeChild(p3);
		}
	} else if (source == 'Unknown') {
		var v;
		for (v=0; v < unknownLayers.length; v++) {
			var p1 = document.getElementById("legendv2").lastElementChild;
			var p2 = p1.childNodes[0];
			var p3 = p2.childNodes[0];
			p2.removeChild(p3);
		}
	}
	
	// populate with original legend
	var f;
	for(f=0; f < mainLegend.length; f++){
		var placeholder = document.createElement('DIV');
		var placeholder2 = document.createElement('DIV');
		var idHold = mainLegend[f][0];
		var colorHold = "background:" + mainLegend[f][1];
		var textholder = document.createTextNode(idHold);
					
					
		placeholder.setAttribute("class", "legendSquare");
		placeholder2.setAttribute("class", "circleLegend");
		placeholder2.setAttribute("id", idHold);
		placeholder2.setAttribute("style", colorHold);
		placeholder2.setAttribute("onclick", "alterLegendInfoClick(this.id)");
		placeholder2.setAttribute("onmouseover", "alterLegendInfo(this.id)");
		placeholder2.setAttribute("onmouseout", "exitLegendInfo(this.id)");
					
		var placeholder3 = document.getElementById("legendv2").lastElementChild;
		var placeholder4 = placeholder3.childNodes[0];
		placeholder4.appendChild(placeholder);
		placeholder.appendChild(placeholder2);
		placeholder2.appendChild(textholder);
	}
	
	// remove text inside legend tooltip
	var tooltipRef = document.getElementById("legendv2Info");
	tooltipRef.innerHTML = "";
	tooltipRef.style.background = "transparent";
	tooltipRef.style.border = "1px solid transparent";
	
	setTimeout(
		function(){
			document.getElementById("loadingScreen").style.visibility = "hidden";
		}, 2500);
	
};


var showMorePolyInfoControl = 0;
function showMorePolyInfo(source) {
	
	if (showMorePolyInfoControl == 0) {
		document.getElementById("upArrow").setAttribute("class", "fa fa-angle-double-down fa-2x");
		document.getElementById("polyClickedInfoBox").style.transform = "translate(0, 0)";
		
		showMorePolyInfoControl = 1;
	} else if (showMorePolyInfoControl > 0) {
		document.getElementById("upArrow").setAttribute("class", "fa fa-angle-double-up fa-2x");
		document.getElementById("polyClickedInfoBox").style.transform = "translate(0, 75px)";
		
		showMorePolyInfoControl = 0;
	}
}







