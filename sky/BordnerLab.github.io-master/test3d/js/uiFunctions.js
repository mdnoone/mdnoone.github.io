var toolbarControl = 0;
function toggleToolbar() {
	if (toolbarControl == 0) {
		document.getElementById("toolbar").style.transform = "translate(0)";
		document.getElementById("grabHandleToggle").className = "fa fa-angle-double-right";
		toolbarControl = 1;
		return toolbarControl;
	} else if (toolbarControl > 0) {
		document.getElementById("toolbar").style.transform = "";
		document.getElementById("grabHandleToggle").className = "fa fa-angle-double-left";
		toolbarControl = 0;
		return toolbarControl;
	}
};

function fullDisplay(id) {
	if (fullDisplayControl == false) {
		document.getElementById("currentCountyBox").innerHTML = "";
		clearLayers();
		fullDisplayControl = true;
		selectByCountyControl = false;
		
		map.setLayoutProperty("county-fills", "visibility", "none");
		/*map.setLayoutProperty("county-borders", "visibility", "none");*/
		map.setLayoutProperty("county-hover", "visibility", "none");
		
		document.getElementById(id).style.background = "blue";
		document.getElementById(id).style.color = "white";
		document.getElementById("button02").style.background = "#fff";
		document.getElementById("button02").style.color = "black";
		
		
		var z;
		for (z=0; z < countyIDArr.length; z++) {
			displayWetlands(countyIDArr[z]);
		}
		var n;
		for (n=0; n < waterIDArr.length; n++) { 
			displayWaterFeatures(waterIDArr[n]);
		}
	} else if (fullDisplayControl == true) {
		alert("already selected");
	}
};

function selectByCounty(id) {
	if (selectByCountyControl == false) {
		selectByCountyControl = true;
		fullDisplayControl = false;
		
		document.getElementById(id).style.background = "blue";
		document.getElementById(id).style.color = "white";
		document.getElementById("button01").style.background = "#fff";
		document.getElementById("button01").style.color = "black";
		
		
		
		
		map.setLayoutProperty("county-fills", "visibility", "visible");
		map.setLayoutProperty("county-hover", "visibility", "visible");
		clearLayers();
		map.setFilter("county-fills", null);
	} else if (selectByCountyControl == true) {
		alert("already selected");
	}
};

function displaySettingsMenu() {
	alert('display settings menu enabled');
};

function homePageFunction() {
	document.getElementById("homePageBackground").style.transform = "translate(100%)";
	document.getElementById("homePage").style.transform = "translate(100%)";
};