


$("#slider").roundSlider({
	min:0,
	max:100,
	step:1,
	value: circleValue,
	radius: 75,
	width: 20,
	handleSize: 30,
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
	circleValue = e.value;
	console.log(circleValue);
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




function removeLandingPage() {
	document.getElementById("landingPage").style.opacity = "0";
	
	setTimeout(
		function() {
			document.getElementById("loadingScreen").style.visibility = "visible";
		}, 100);
		
	setTimeout(
		function(){
			var item = document.getElementById("landingPage");
			item.parentNode.removeChild(item);
		}, 1500);
			
	setTimeout(
		function(){
			document.getElementById("loadingScreen").style.visibility = "hidden";
			MoveStoryModeForward();
		}, 4000);
}


function landingPageButtonOver() {
	document.getElementById("mapStart").style.background = "#1F618D";
};

function landingPageButtonOut() {
	document.getElementById("mapStart").style.background = "transparent";
};
	




