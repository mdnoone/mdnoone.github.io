function determineClick(feature) {
	clickedCountyName = feature.properties.COUNTY_NAM;	
};




var storyModeControl = 0;
var storyTextHeader = document.getElementById("storyNavigationHeader");
var storySubTextHeader = document.getElementById("storySubContextHeader");
var storySubTextBody = document.getElementById("storySubContextBody");
function MoveStoryModeForward() {
	if (storyModeControl == 0) {
		storyModeControl = 1;
		map.flyTo({
			center: [-91.872, 46.25538],
			zoom: 11,
			pitch: 0.01,
			bearing: 0,
			animate: true
		});
		storyTextHeader.innerHTML = "Chippewa Flowage";
		storySubTextHeader.innerHTML = "Chippewa Flowage";
		storySubTextBody.innerHTML = "Information here on the Chippewa Flowage.";
		document.getElementById("rightArrow").style.visibility = "visible";
		document.getElementById("storySubContext").style.visibility = "visible";
		document.getElementById("leftArrowText").innerHTML = "";
		document.getElementById("rightArrowText").innerHTML = "Chippewa Flowage 1";
		
		
		map.setLayoutProperty('coastalWaters', 'visibility', 'none');
		map.setLayoutProperty('Agriculture', 'visibility', 'none');
		map.setLayoutProperty('Deciduous Forest', 'visibility', 'none');
		map.setLayoutProperty('Other', 'visibility', 'none');
		map.setLayoutProperty('Urban', 'visibility', 'none');
		map.setLayoutProperty('Barren', 'visibility', 'none');
		map.setLayoutProperty('Shrubland', 'visibility', 'none');
		map.setLayoutProperty('Wetlands', 'visibility', 'none');
		map.setLayoutProperty('Coniferous Forest', 'visibility', 'none');
		map.setLayoutProperty('Mixed Forest', 'visibility', 'none');
		map.setLayoutProperty('Unknown Cover', 'visibility', 'none');
		
	} else if (storyModeControl == 1) {
		storyModeControl = 2;
		map.flyTo({
			center: [-91.872, 46.25538],
			zoom: 13,
			pitch: 20,
			bearing: 20,
			animate: true
		});
		storyTextHeader.innerHTML = "Chippewa Flowage 1";
		storySubTextHeader.innerHTML = "Chippewa Flowage 1";
		storySubTextBody.innerHTML = "Information here on the Chippewa Flowage 1.";
		document.getElementById("leftArrow").style.visibility = "visible";
		document.getElementById("leftArrowText").innerHTML = "Chippewa Flowage";
		document.getElementById("rightArrowText").innerHTML = "Chippewa Flowage 2";
		
		map.setLayoutProperty('coastalWaters', 'visibility', 'visible');
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
		
		map.setPaintProperty("coastalWaters", "fill-opacity", parseInt(circleValue, 10) / 100);
		map.setPaintProperty("Agriculture", "fill-opacity", parseInt(circleValue, 10) / 100);
		map.setPaintProperty("Deciduous Forest", "fill-opacity", parseInt(circleValue, 10) / 100);
		map.setPaintProperty("Other", "fill-opacity", parseInt(circleValue, 10) / 100);
		map.setPaintProperty("Urban", "fill-opacity", parseInt(circleValue, 10) / 100);
		map.setPaintProperty("Barren", "fill-opacity", parseInt(circleValue, 10) / 100);
		map.setPaintProperty("Shrubland", "fill-opacity", parseInt(circleValue, 10) / 100);
		map.setPaintProperty("Wetlands", "fill-opacity", parseInt(circleValue, 10) / 100);
		map.setPaintProperty("Coniferous Forest", "fill-opacity", parseInt(circleValue, 10) / 100);
		map.setPaintProperty("Mixed Forest", "fill-opacity", parseInt(circleValue, 10) / 100);
		map.setPaintProperty("Unknown Cover", "fill-opacity", parseInt(circleValue, 10) / 100);
		document.getElementById("slider").style.opacity = "1";
		document.getElementById("circleSliderContainer").style.opacity = "1";
		
		opacityLayers.push('coastalWaters', 'Agriculture', 'Deciduous Forest', 'Other', 'Urban', 'Barren', 'Shrubland', 'Wetlands', 'Coniferous Forest', 'Mixed Forest', 'Unknown Cover');
	} else if (storyModeControl == 2) {
		storyModeControl = 3;
		map.flyTo({
			center: [-91.872, 46.25538],
			zoom: 13,
			pitch: 25,
			bearing: -20,
			animate: true
		});
		storyTextHeader.innerHTML = "Chippewa Flowage 2";
		storySubTextHeader.innerHTML = "Chippewa Flowage 2";
		storySubTextBody.innerHTML = "Information here on the Chippewa Flowage 2.";
		document.getElementById("leftArrowText").innerHTML = "Chippewa Flowage 1";
		document.getElementById("rightArrowText").innerHTML = "River at White City";
	} else if (storyModeControl == 3) {
		storyModeControl = 4;
		map.flyTo({
			center: [-90.6785, 46.3181],
			zoom: 13,
			pitch: 0.01,
			bearing: 0,
			animate: true
		});
		storyTextHeader.innerHTML = "River at White City";
		storySubTextHeader.innerHTML = "River at White City";
		storySubTextBody.innerHTML = "Information here on the River at White City.";
		document.getElementById("leftArrowText").innerHTML = "Chippewa Flowage 2";
		document.getElementById("rightArrowText").innerHTML = "River at White City 1";
		
		map.setLayoutProperty('coastalWaters', 'visibility', 'none');
		map.setLayoutProperty('Agriculture', 'visibility', 'none');
		map.setLayoutProperty('Deciduous Forest', 'visibility', 'none');
		map.setLayoutProperty('Other', 'visibility', 'none');
		map.setLayoutProperty('Urban', 'visibility', 'none');
		map.setLayoutProperty('Barren', 'visibility', 'none');
		map.setLayoutProperty('Shrubland', 'visibility', 'none');
		map.setLayoutProperty('Wetlands', 'visibility', 'none');
		map.setLayoutProperty('Coniferous Forest', 'visibility', 'none');
		map.setLayoutProperty('Mixed Forest', 'visibility', 'none');
		map.setLayoutProperty('Unknown Cover', 'visibility', 'none');
		
		map.setPaintProperty("coastalWaters", "fill-opacity", 0);
		map.setPaintProperty("Agriculture", "fill-opacity", 0);
		map.setPaintProperty("Deciduous Forest", "fill-opacity", 0);
		map.setPaintProperty("Other", "fill-opacity", 0);
		map.setPaintProperty("Urban", "fill-opacity", 0);
		map.setPaintProperty("Barren", "fill-opacity", 0);
		map.setPaintProperty("Shrubland", "fill-opacity", 0);
		map.setPaintProperty("Wetlands", "fill-opacity", 0);
		map.setPaintProperty("Coniferous Forest", "fill-opacity", 0);
		map.setPaintProperty("Mixed Forest", "fill-opacity", 0);
		map.setPaintProperty("Unknown Cover", "fill-opacity", 0);
		document.getElementById("slider").style.opacity = "0";
		document.getElementById("circleSliderContainer").style.opacity = "0";
		
		opacityLayers.length = 0;
	} else if (storyModeControl == 4) {
		storyModeControl = 5;
		map.flyTo({
			center: [-90.6785, 46.3181],
			zoom: 13,
			pitch: 20,
			bearing: 20,
			animate: true
		});
		storyTextHeader.innerHTML = "River at White City 1";
		storySubTextHeader.innerHTML = "River at White City 1";
		storySubTextBody.innerHTML = "Information here on the River at White City 1";
		document.getElementById("leftArrowText").innerHTML = "River at White City";
		document.getElementById("rightArrowText").innerHTML = "River at White City 2";
		
		map.setLayoutProperty('coastalWaters', 'visibility', 'visible');
		
		map.setPaintProperty("coastalWaters", "fill-opacity", parseInt(circleValue, 10) / 100);
		document.getElementById("slider").style.opacity = "1";
		document.getElementById("circleSliderContainer").style.opacity = "1";
		
		opacityLayers.push('coastalWaters');
	} else if (storyModeControl == 5) {
		storyModeControl = 6;
		map.flyTo({
			center: [-90.6785, 46.3181],
			zoom: 13,
			pitch: 25,
			bearing: -20,
			animate: true
		});
		storyTextHeader.innerHTML = "River at White City 2";
		storySubTextHeader.innerHTML = "River at White City 2";
		storySubTextBody.innerHTML = "Information here on the River at White City 2";
		document.getElementById("leftArrowText").innerHTML = "River at White City 1";
		document.getElementById("rightArrowText").innerHTML = "Lakes in Ashland County";
	} else if (storyModeControl == 6) {
		storyModeControl = 7;
		map.flyTo({
			center: [-90.8785, 46.115569],
			zoom: 13,
			pitch: 0.01,
			bearing: 0,
			animate: true
		});
		storyTextHeader.innerHTML = "Lakes in Ashland County";
		storySubTextHeader.innerHTML = "Lakes in Ashland County";
		storySubTextBody.innerHTML = "Information here on the Lakes in Ashland County.";
		document.getElementById("leftArrowText").innerHTML = "River at White City 2";
		document.getElementById("rightArrowText").innerHTML = "Lakes in Ashland County 1";
		
		map.setLayoutProperty('coastalWaters', 'visibility', 'none');
		
		map.setPaintProperty("coastalWaters", "fill-opacity", 0);
		document.getElementById("slider").style.opacity = "0";
		document.getElementById("circleSliderContainer").style.opacity = "0";
		
		opacityLayers.length = 0;
	} else if (storyModeControl == 7) {
		storyModeControl = 8;
		map.flyTo({
			center: [-90.8785, 46.115569],
			zoom: 13,
			pitch: 20,
			bearing: 20,
			animate: true
		});
		storyTextHeader.innerHTML = "Lakes in Ashland County 1";
		storySubTextHeader.innerHTML = "Lakes in Ashland County 1";
		storySubTextBody.innerHTML = "Information here on the Lakes in Ashland County 1.";
		document.getElementById("leftArrowText").innerHTML = "Lakes in Ashland County";
		document.getElementById("rightArrowText").innerHTML = "Lakes in Ashland County 2";
		
		map.setLayoutProperty('coastalWaters', 'visibility', 'visible');
		
		map.setPaintProperty("coastalWaters", "fill-opacity", parseInt(circleValue, 10) / 100);
		document.getElementById("slider").style.opacity = "1";
		document.getElementById("circleSliderContainer").style.opacity = "1";
		
		opacityLayers.push('coastalWaters');
	} else if (storyModeControl == 8) {
		storyModeControl = 9;
		map.flyTo({
			center: [-90.8785, 46.115569],
			zoom: 13,
			pitch: 25,
			bearing: -20,
			animate: true
		});
		storyTextHeader.innerHTML = "Lakes in Ashland County 2";
		storySubTextHeader.innerHTML = "Lakes in Ashland County 2";
		storySubTextBody.innerHTML = "Information here on the Lakes in Ashland County 2.";
		document.getElementById("leftArrowText").innerHTML = "Lakes in Ashland County 1";
		document.getElementById("rightArrowText").innerHTML = "Gile Flowage";
	} else if (storyModeControl == 9) {
		storyModeControl = 10;
		map.flyTo({
			center: [-90.23016, 46.3976],
			zoom: 12,
			pitch: 0.01,
			bearing: 0,
			animate: true
		});
		storyTextHeader.innerHTML = "Gile Flowage";
		storySubTextHeader.innerHTML = "Gile Flowage";
		storySubTextBody.innerHTML = "Information here on the Gile Flowage.";
		document.getElementById("leftArrowText").innerHTML = "Lakes in Ashland County 2";
		document.getElementById("rightArrowText").innerHTML = "Gile Flowage 1";
		
		map.setPaintProperty("coastalWaters", "fill-opacity", parseInt(circleValue, 10) / 100);
		document.getElementById("slider").style.opacity = "0";
		document.getElementById("circleSliderContainer").style.opacity = "0";
	} else if (storyModeControl == 10) {
		storyModeControl = 11;
		map.flyTo({
			center: [-90.23016, 46.3976],
			zoom: 12,
			pitch: 20,
			bearing: 20,
			animate: true
		});
		storyTextHeader.innerHTML = "Gile Flowage 1";
		storySubTextHeader.innerHTML = "Gile Flowage 1";
		storySubTextBody.innerHTML = "Information here on the Gile Flowage 1.";
		document.getElementById("leftArrowText").innerHTML = "Gile Flowage";
		document.getElementById("rightArrowText").innerHTML = "Gile Flowage 2";
		
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
		
		map.setPaintProperty("Agriculture", "fill-opacity", parseInt(circleValue, 10) / 100);
		map.setPaintProperty("Deciduous Forest", "fill-opacity", parseInt(circleValue, 10) / 100);
		map.setPaintProperty("Other", "fill-opacity", parseInt(circleValue, 10) / 100);
		map.setPaintProperty("Urban", "fill-opacity", parseInt(circleValue, 10) / 100);
		map.setPaintProperty("Barren", "fill-opacity", parseInt(circleValue, 10) / 100);
		map.setPaintProperty("Shrubland", "fill-opacity", parseInt(circleValue, 10) / 100);
		map.setPaintProperty("Wetlands", "fill-opacity", parseInt(circleValue, 10) / 100);
		map.setPaintProperty("Coniferous Forest", "fill-opacity", parseInt(circleValue, 10) / 100);
		map.setPaintProperty("Mixed Forest", "fill-opacity", parseInt(circleValue, 10) / 100);
		map.setPaintProperty("Unknown Cover", "fill-opacity", parseInt(circleValue, 10) / 100);
		document.getElementById("slider").style.opacity = "1";
		document.getElementById("circleSliderContainer").style.opacity = "1";
		
		opacityLayers.push('Agriculture', 'Deciduous Forest', 'Other', 'Urban', 'Barren', 'Shrubland', 'Wetlands', 'Coniferous Forest', 'Mixed Forest', 'Unknown Cover');
	} else if (storyModeControl == 11) {
		storyModeControl = 12;
		map.flyTo({
			center: [-90.23016, 46.3976],
			zoom: 12,
			pitch: 25,
			bearing: -20,
			animate: true
		});
		storyTextHeader.innerHTML = "Gile Flowage 2";
		storySubTextHeader.innerHTML = "Gile Flowage 2";
		storySubTextBody.innerHTML = "Information here on the Gile Flowage 2.";
		document.getElementById("leftArrowText").innerHTML = "Gile Flowage 1";
		document.getElementById("rightArrowText").innerHTML = "Lakes in Door County";
		
		map.setLayoutProperty('Agriculture', 'visibility', 'none');
		map.setLayoutProperty('Deciduous Forest', 'visibility', 'none');
		map.setLayoutProperty('Other', 'visibility', 'none');
		map.setLayoutProperty('Urban', 'visibility', 'none');
		map.setLayoutProperty('Barren', 'visibility', 'none');
		map.setLayoutProperty('Shrubland', 'visibility', 'none');
		map.setLayoutProperty('Coniferous Forest', 'visibility', 'none');
		map.setLayoutProperty('Mixed Forest', 'visibility', 'none');
		map.setLayoutProperty('Unknown Cover', 'visibility', 'none');
		
		map.setPaintProperty("Agriculture", "fill-opacity", 0);
		map.setPaintProperty("Deciduous Forest", "fill-opacity", 0);
		map.setPaintProperty("Other", "fill-opacity", 0);
		map.setPaintProperty("Urban", "fill-opacity", 0);
		map.setPaintProperty("Barren", "fill-opacity", 0);
		map.setPaintProperty("Shrubland", "fill-opacity", 0);
		map.setPaintProperty("Wetlands", "fill-opacity", parseInt(circleValue, 10) / 100);
		map.setPaintProperty("Coniferous Forest", "fill-opacity", 0);
		map.setPaintProperty("Mixed Forest", "fill-opacity", 0);
		map.setPaintProperty("Unknown Cover", "fill-opacity", 0);
		
		opacityLayers.length = 0;
		opacityLayers.push('coastalWaters', 'Wetlands');
	} else if (storyModeControl == 12) {
		storyModeControl = 13;
		map.flyTo({
			center: [-87.2341, 45.04789],
			zoom: 11,
			pitch: 0.01,
			bearing: 0,
			animate: true
		});
		storyTextHeader.innerHTML = "Lakes in Door County";
		storySubTextHeader.innerHTML = "Lakes in Door County";
		storySubTextBody.innerHTML = "Information here on the Lakes in Door County.";
		document.getElementById("leftArrowText").innerHTML = "Gile Flowage 2";
		document.getElementById("rightArrowText").innerHTML = "Lakes in Door County 1";
		
		map.setLayoutProperty('coastalWaters', 'visibility', 'none');
		map.setLayoutProperty('Wetlands', 'visibility', 'none');
		
		map.setPaintProperty("coastalWaters", "fill-opacity", 0);
		map.setPaintProperty("Wetlands", "fill-opacity", 0);
		document.getElementById("slider").style.opacity = "0";
		document.getElementById("circleSliderContainer").style.opacity = "0";
		
		opacityLayers.length = 0;
	} else if (storyModeControl == 13) {
		storyModeControl = 14;
		map.flyTo({
			center: [-87.2341, 45.04789],
			zoom: 11,
			pitch: 20,
			bearing: -20,
			animate: true
		});
		storyTextHeader.innerHTML = "Lakes in Door County 1";
		storySubTextHeader.innerHTML = "Lakes in Door County 1";
		storySubTextBody.innerHTML = "Information here on the Lakes in Door County 1.";
		document.getElementById("leftArrowText").innerHTML = "Lakes in Door County";
		document.getElementById("rightArrowText").innerHTML = "Lakes in Door County 2";
		
		map.setLayoutProperty('coastalWaters', 'visibility', 'visible');
		map.setLayoutProperty('Wetlands', 'visibility', 'visible');
		
		map.setPaintProperty("coastalWaters", "fill-opacity", parseInt(circleValue, 10) / 100);
		map.setPaintProperty("Wetlands", "fill-opacity", parseInt(circleValue, 10) / 100);
		document.getElementById("slider").style.opacity = "1";
		document.getElementById("circleSliderContainer").style.opacity = "1";
		
		opacityLayers.push('coastalWaters', 'Wetlands');
	} else if (storyModeControl == 14) {
		storyModeControl = 15;
		map.flyTo({
			center: [-87.2341, 45.04789],
			zoom: 11,
			pitch: 25,
			bearing: -20,
			animate: true
		});
		storyTextHeader.innerHTML = "Lakes in Door County 2";
		storySubTextHeader.innerHTML = "Lakes in Door County 2";
		storySubTextBody.innerHTML = "Information here on the Lakes in Door County 2.";
		document.getElementById("leftArrowText").innerHTML = "Lakes in Door County 1";
		document.getElementById("rightArrowText").innerHTML = "Green Bay";
	} else if (storyModeControl == 15) {
		storyModeControl = 16;
		map.flyTo({
			center: [-88.01247, 44.51006],
			zoom: 11,
			pitch: 0.01,
			bearing: 0,
			animate: true
		});
		storyTextHeader.innerHTML = "Green Bay";
		storySubTextHeader.innerHTML = "Green Bay";
		storySubTextBody.innerHTML = "Information here on Green Bay.";
		document.getElementById("leftArrowText").innerHTML = "Lakes in Door County 2";
		document.getElementById("rightArrowText").innerHTML = "Green Bay 1";
		
		map.setLayoutProperty('coastalWaters', 'visibility', 'none');
		map.setLayoutProperty('Wetlands', 'visibility', 'none');
		
		map.setPaintProperty("coastalWaters", "fill-opacity", 0);
		map.setPaintProperty("Wetlands", "fill-opacity", 0);
		document.getElementById("slider").style.opacity = "0";
		document.getElementById("circleSliderContainer").style.opacity = "0";
		
		opacityLayers.length = 0;
	} else if (storyModeControl == 16) {
		storyModeControl = 17;
		map.flyTo({
			center: [-88.01247, 44.51006],
			zoom: 11,
			pitch: 20,
			bearing: 20,
			animate: true
		});
		storyTextHeader.innerHTML = "Green Bay 1";
		storySubTextHeader.innerHTML = "Green Bay 1";
		storySubTextBody.innerHTML = "Information here on Green Bay 1.";	
		document.getElementById("leftArrowText").innerHTML = "Green Bay";
		document.getElementById("rightArrowText").innerHTML = "Green Bay 2";
		
		map.setLayoutProperty('coastalWaters', 'visibility', 'visible');
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
		
		map.setPaintProperty("coastalWaters", "fill-opacity", parseInt(circleValue, 10) / 100);
		map.setPaintProperty("Agriculture", "fill-opacity", parseInt(circleValue, 10) / 100);
		map.setPaintProperty("Deciduous Forest", "fill-opacity", parseInt(circleValue, 10) / 100);
		map.setPaintProperty("Other", "fill-opacity", parseInt(circleValue, 10) / 100);
		map.setPaintProperty("Urban", "fill-opacity", parseInt(circleValue, 10) / 100);
		map.setPaintProperty("Barren", "fill-opacity", parseInt(circleValue, 10) / 100);
		map.setPaintProperty("Shrubland", "fill-opacity", parseInt(circleValue, 10) / 100);
		map.setPaintProperty("Wetlands", "fill-opacity", parseInt(circleValue, 10) / 100);
		map.setPaintProperty("Coniferous Forest", "fill-opacity", parseInt(circleValue, 10) / 100);
		map.setPaintProperty("Mixed Forest", "fill-opacity", parseInt(circleValue, 10) / 100);
		map.setPaintProperty("Unknown Cover", "fill-opacity", parseInt(circleValue, 10) / 100);
		document.getElementById("slider").style.opacity = "1";
		document.getElementById("circleSliderContainer").style.opacity = "1";
		
		opacityLayers.push('coastalWaters', 'Agriculture', 'Deciduous Forest', 'Other', 'Urban', 'Barren', 'Shrubland', 'Wetlands', 'Coniferous Forest', 'Mixed Forest', 'Unknown Cover');
	} else if (storyModeControl == 17) {
		storyModeControl = 18;
		map.flyTo({
			center: [-88.01247, 44.51006],
			zoom: 11,
			pitch: 25,
			bearing: -20,
			animate: true
		});
		storyTextHeader.innerHTML = "Green Bay 2";
		storySubTextHeader.innerHTML = "Green Bay 2";
		storySubTextBody.innerHTML = "Information here on Green Bay 2.";
		document.getElementById("rightArrow").style.visibility = "hidden";
		document.getElementById("leftArrowText").innerHTML = "Green Bay 1";
		document.getElementById("rightArrowText").innerHTML = "";
		
		map.setLayoutProperty('coastalWaters', 'visibility', 'none');
		map.setLayoutProperty('Agriculture', 'visibility', 'none');
		map.setLayoutProperty('Deciduous Forest', 'visibility', 'none');
		map.setLayoutProperty('Other', 'visibility', 'none');
		map.setLayoutProperty('Barren', 'visibility', 'none');
		map.setLayoutProperty('Shrubland', 'visibility', 'none');
		map.setLayoutProperty('Coniferous Forest', 'visibility', 'none');
		map.setLayoutProperty('Mixed Forest', 'visibility', 'none');
		map.setLayoutProperty('Unknown Cover', 'visibility', 'none');
		
		map.setPaintProperty("coastalWaters", "fill-opacity", 0);
		map.setPaintProperty("Agriculture", "fill-opacity", 0);
		map.setPaintProperty("Deciduous Forest", "fill-opacity", 0);
		map.setPaintProperty("Other", "fill-opacity", 0);
		map.setPaintProperty("Urban", "fill-opacity", parseInt(circleValue, 10) / 100);
		map.setPaintProperty("Barren", "fill-opacity", 0);
		map.setPaintProperty("Shrubland", "fill-opacity", 0);
		map.setPaintProperty("Wetlands", "fill-opacity", parseInt(circleValue, 10) / 100);
		map.setPaintProperty("Coniferous Forest", "fill-opacity", 0);
		map.setPaintProperty("Mixed Forest", "fill-opacity", 0);
		map.setPaintProperty("Unknown Cover", "fill-opacity", 0);
		
		opacityLayers.length = 0;
		opacityLayers.push('Urban');
	} else {
	
	}
};


function MoveStoryModeBackward() {
	if (storyModeControl == 18) {
		storyModeControl = 17;
		map.flyTo({
			center: [-88.01247, 44.51006],
			zoom: 11,
			pitch: 20,
			bearing: 20,
			animate: true
		});
		storyTextHeader.innerHTML = "Green Bay 1";
		storySubTextHeader.innerHTML = "Green Bay 1";
		storySubTextBody.innerHTML = "Information here on Green Bay 1.";
		document.getElementById("rightArrow").style.visibility = "visible";
		document.getElementById("leftArrowText").innerHTML = "Gile Flowage";
		document.getElementById("rightArrowText").innerHTML = "Green Bay";
		
		map.setLayoutProperty('coastalWaters', 'visibility', 'visible');
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
		
		map.setPaintProperty("coastalWaters", "fill-opacity", parseInt(circleValue, 10) / 100);
		map.setPaintProperty("Agriculture", "fill-opacity", parseInt(circleValue, 10) / 100);
		map.setPaintProperty("Deciduous Forest", "fill-opacity", parseInt(circleValue, 10) / 100);
		map.setPaintProperty("Other", "fill-opacity", parseInt(circleValue, 10) / 100);
		map.setPaintProperty("Urban", "fill-opacity", parseInt(circleValue, 10) / 100);
		map.setPaintProperty("Barren", "fill-opacity", parseInt(circleValue, 10) / 100);
		map.setPaintProperty("Shrubland", "fill-opacity", parseInt(circleValue, 10) / 100);
		map.setPaintProperty("Wetlands", "fill-opacity", parseInt(circleValue, 10) / 100);
		map.setPaintProperty("Coniferous Forest", "fill-opacity", parseInt(circleValue, 10) / 100);
		map.setPaintProperty("Mixed Forest", "fill-opacity", parseInt(circleValue, 10) / 100);
		map.setPaintProperty("Unknown Cover", "fill-opacity", parseInt(circleValue, 10) / 100);
		
		opacityLayers.push('coastalWaters', 'Agriculture', 'Deciduous Forest', 'Other', 'Barren', 'Shrubland', 'Wetlands', 'Coniferous Forest', 'Mixed Forest', 'Unknown Cover');
	} else if (storyModeControl == 17) {
		storyModeControl = 16;
		map.flyTo({
			center: [-88.01247, 44.51006],
			zoom: 11,
			pitch: 0.01,
			bearing: 0,
			animate: true
		});
		storyTextHeader.innerHTML = "Green Bay";
		storySubTextHeader.innerHTML = "Green Bay";
		storySubTextBody.innerHTML = "Information here on Green Bay.";
		document.getElementById("rightArrow").style.visibility = "visible";
		document.getElementById("leftArrowText").innerHTML = "Gile Flowage";
		document.getElementById("rightArrowText").innerHTML = "Green Bay";
		
		map.setLayoutProperty('coastalWaters', 'visibility', 'none');
		map.setLayoutProperty('Agriculture', 'visibility', 'none');
		map.setLayoutProperty('Deciduous Forest', 'visibility', 'none');
		map.setLayoutProperty('Other', 'visibility', 'none');
		map.setLayoutProperty('Urban', 'visibility', 'none');
		map.setLayoutProperty('Barren', 'visibility', 'none');
		map.setLayoutProperty('Shrubland', 'visibility', 'none');
		map.setLayoutProperty('Wetlands', 'visibility', 'none');
		map.setLayoutProperty('Coniferous Forest', 'visibility', 'none');
		map.setLayoutProperty('Mixed Forest', 'visibility', 'none');
		map.setLayoutProperty('Unknown Cover', 'visibility', 'none');
		
		map.setPaintProperty("coastalWaters", "fill-opacity", 0);
		map.setPaintProperty("Agriculture", "fill-opacity", 0);
		map.setPaintProperty("Deciduous Forest", "fill-opacity", 0);
		map.setPaintProperty("Other", "fill-opacity", 0);
		map.setPaintProperty("Urban", "fill-opacity", 0);
		map.setPaintProperty("Barren", "fill-opacity", 0);
		map.setPaintProperty("Shrubland", "fill-opacity", 0);
		map.setPaintProperty("Wetlands", "fill-opacity", 0);
		map.setPaintProperty("Coniferous Forest", "fill-opacity", 0);
		map.setPaintProperty("Mixed Forest", "fill-opacity", 0);
		map.setPaintProperty("Unknown Cover", "fill-opacity", 0);
		document.getElementById("slider").style.opacity = "0";
		document.getElementById("circleSliderContainer").style.opacity = "0";
		
		opacityLayers.length = 0;
	} else if (storyModeControl == 16) {
		storyModeControl = 15;
		map.flyTo({
			center: [-87.2341, 45.04789],
			zoom: 11,
			pitch: 25,
			bearing: -20,
			animate: true
		});
		storyTextHeader.innerHTML = "Lakes in Door County 2";
		storySubTextHeader.innerHTML = "Lakes in Door County 2";
		storySubTextBody.innerHTML = "Information here on the Lakes in Door County 2.";
		document.getElementById("rightArrow").style.visibility = "visible";
		document.getElementById("leftArrowText").innerHTML = "Gile Flowage";
		document.getElementById("rightArrowText").innerHTML = "Green Bay";
		
		map.setLayoutProperty('coastalWaters', 'visibility', 'visible');
		map.setLayoutProperty('Wetlands', 'visibility', 'visible');
		
		map.setPaintProperty("coastalWaters", "fill-opacity", parseInt(circleValue, 10) / 100);
		map.setPaintProperty("Wetlands", "fill-opacity", parseInt(circleValue, 10) / 100);
		document.getElementById("slider").style.opacity = "0";
		document.getElementById("circleSliderContainer").style.opacity = "0";
		
		opacityLayers.push('coastalWaters', 'Wetlands');
	} else if (storyModeControl == 15) {
		storyModeControl = 14;
		map.flyTo({
			center: [-87.2341, 45.04789],
			zoom: 11,
			pitch: 20,
			bearing: 20,
			animate: true
		});
		storyTextHeader.innerHTML = "Lakes in Door County 1";
		storySubTextHeader.innerHTML = "Lakes in Door County 1";
		storySubTextBody.innerHTML = "Information here on the Lakes in Door County 1.";
		document.getElementById("rightArrow").style.visibility = "visible";
		document.getElementById("leftArrowText").innerHTML = "Gile Flowage";
		document.getElementById("rightArrowText").innerHTML = "Green Bay";
	} else if (storyModeControl == 14) {
		storyModeControl = 13;
		map.flyTo({
			center: [-87.2341, 45.04789],
			zoom: 11,
			pitch: 0.01,
			bearing: 0,
			animate: true
		});
		storyTextHeader.innerHTML = "Lakes in Door County";
		storySubTextHeader.innerHTML = "Lakes in Door County";
		storySubTextBody.innerHTML = "Information here on the Lakes in Door County.";
		document.getElementById("rightArrow").style.visibility = "visible";
		document.getElementById("leftArrowText").innerHTML = "Gile Flowage";
		document.getElementById("rightArrowText").innerHTML = "Green Bay";
		
		map.setLayoutProperty('coastalWaters', 'visibility', 'none');
		map.setLayoutProperty('Wetlands', 'visibility', 'none');
		
		map.setPaintProperty("coastalWaters", "fill-opacity", 0);
		map.setPaintProperty("Wetlands", "fill-opacity", 0);
		document.getElementById("slider").style.opacity = "0";
		document.getElementById("circleSliderContainer").style.opacity = "0";
		
		opacityLayers.length = 0;
	} else if (storyModeControl == 13) {
		storyModeControl = 12;
		map.flyTo({
			center: [-90.23016, 46.3976],
			zoom: 12,
			pitch: 25,
			bearing: -20,
			animate: true
		});
		storyTextHeader.innerHTML = "Gile Flowage 2";
		storySubTextHeader.innerHTML = "Gile Flowage 2";
		storySubTextBody.innerHTML = "Gile Flowage 2";
		document.getElementById("leftArrowText").innerHTML = "Lakes in Ashland County";
		document.getElementById("rightArrowText").innerHTML = "Lakes in Door County";
		
		map.setLayoutProperty('coastalWaters', 'visibility', 'visible');
		map.setLayoutProperty('Wetlands', 'visibility', 'visible');
		
		map.setPaintProperty("coastalWaters", "fill-opacity", parseInt(circleValue, 10) / 100);
		map.setPaintProperty("Wetlands", "fill-opacity", parseInt(circleValue, 10) / 100);
		document.getElementById("slider").style.opacity = "1";
		document.getElementById("circleSliderContainer").style.opacity = "1";
		
		opacityLayers.push('coastalWaters', 'Wetlands');
	} else if (storyModeControl == 12) {
		storyModeControl = 11;
		map.flyTo({
			center: [-90.23016, 46.3976],
			zoom: 12,
			pitch: 20,
			bearing: 20,
			animate: true
		});
		storyTextHeader.innerHTML = "Gile Flowage 1";
		storySubTextHeader.innerHTML = "Gile Flowage 1";
		storySubTextBody.innerHTML = "Gile Flowage 1";
		document.getElementById("leftArrowText").innerHTML = "Lakes in Ashland County";
		document.getElementById("rightArrowText").innerHTML = "Lakes in Door County";
		
		map.setLayoutProperty('Agriculture', 'visibility', 'visible');
		map.setLayoutProperty('Deciduous Forest', 'visibility', 'visible');
		map.setLayoutProperty('Other', 'visibility', 'visible');
		map.setLayoutProperty('Urban', 'visibility', 'visible');
		map.setLayoutProperty('Barren', 'visibility', 'visible');
		map.setLayoutProperty('Shrubland', 'visibility', 'visible');
		map.setLayoutProperty('Coniferous Forest', 'visibility', 'visible');
		map.setLayoutProperty('Mixed Forest', 'visibility', 'visible');
		map.setLayoutProperty('Unknown Cover', 'visibility', 'visible');
		
		map.setPaintProperty("Agriculture", "fill-opacity", parseInt(circleValue, 10) / 100);
		map.setPaintProperty("Deciduous Forest", "fill-opacity", parseInt(circleValue, 10) / 100);
		map.setPaintProperty("Other", "fill-opacity", parseInt(circleValue, 10) / 100);
		map.setPaintProperty("Urban", "fill-opacity", parseInt(circleValue, 10) / 100);
		map.setPaintProperty("Barren", "fill-opacity", parseInt(circleValue, 10) / 100);
		map.setPaintProperty("Shrubland", "fill-opacity", parseInt(circleValue, 10) / 100);
		map.setPaintProperty("Coniferous Forest", "fill-opacity", parseInt(circleValue, 10) / 100);
		map.setPaintProperty("Mixed Forest", "fill-opacity", parseInt(circleValue, 10) / 100);
		map.setPaintProperty("Unknown Cover", "fill-opacity", parseInt(circleValue, 10) / 100);
		
		opacityLayers.push('Agriculture', 'Deciduous Forest', 'Other', 'Urban', 'Barren', 'Shrubland', 'Coniferous Forest', 'Mixed Forest', 'Unknown Cover');
	} else if (storyModeControl == 11) {
		storyModeControl = 10;
		map.flyTo({
			center: [-90.23016, 46.3976],
			zoom: 12,
			pitch: 0.01,
			bearing: 0,
			animate: true
		});
		storyTextHeader.innerHTML = "Gile Flowage";
		storySubTextHeader.innerHTML = "Gile Flowage";
		storySubTextBody.innerHTML = "Gile Flowage";
		document.getElementById("leftArrowText").innerHTML = "Lakes in Ashland County";
		document.getElementById("rightArrowText").innerHTML = "Lakes in Door County";
		
		map.setLayoutProperty('Agriculture', 'visibility', 'none');
		map.setLayoutProperty('Deciduous Forest', 'visibility', 'none');
		map.setLayoutProperty('Other', 'visibility', 'none');
		map.setLayoutProperty('Urban', 'visibility', 'none');
		map.setLayoutProperty('Barren', 'visibility', 'none');
		map.setLayoutProperty('Shrubland', 'visibility', 'none');
		map.setLayoutProperty('Wetlands', 'visibility', 'none');
		map.setLayoutProperty('Coniferous Forest', 'visibility', 'none');
		map.setLayoutProperty('Mixed Forest', 'visibility', 'none');
		map.setLayoutProperty('Unknown Cover', 'visibility', 'none');
		
		map.setPaintProperty("Agriculture", "fill-opacity", 0);
		map.setPaintProperty("Deciduous Forest", "fill-opacity", 0);
		map.setPaintProperty("Other", "fill-opacity", 0);
		map.setPaintProperty("Urban", "fill-opacity", 0);
		map.setPaintProperty("Barren", "fill-opacity", 0);
		map.setPaintProperty("Shrubland", "fill-opacity", 0);
		map.setPaintProperty("Wetlands", "fill-opacity", 0);
		map.setPaintProperty("Coniferous Forest", "fill-opacity", 0);
		map.setPaintProperty("Mixed Forest", "fill-opacity", 0);
		map.setPaintProperty("Unknown Cover", "fill-opacity", 0);
		document.getElementById("slider").style.opacity = "0";
		document.getElementById("circleSliderContainer").style.opacity = "0";
		
		opacityLayers.length = 0;
		opacityLayers.push('coastalWaters');
	} else if (storyModeControl == 10) {
		storyModeControl = 9;
		map.flyTo({
			center: [-90.8785, 46.115569],
			zoom: 13,
			pitch: 25,
			bearing: -20,
			animate: true
		});
		storyTextHeader.innerHTML = "Lakes in Ashland County 2";
		storySubTextHeader.innerHTML = "Lakes in Ashland County 2";
		storySubTextBody.innerHTML = "Information here on the Lakes in Ashland County 2.";
		document.getElementById("leftArrowText").innerHTML = "River at White City";
		document.getElementById("rightArrowText").innerHTML = "Gile Flowage";
		
		document.getElementById("slider").style.opacity = "1";
		document.getElementById("circleSliderContainer").style.opacity = "1";
	}else if (storyModeControl == 9) {
		storyModeControl = 8;
		map.flyTo({
			center: [-90.8785, 46.115569],
			zoom: 13,
			pitch: 20,
			bearing: 20,
			animate: true
		});
		storyTextHeader.innerHTML = "Lakes in Ashland County 1";
		storySubTextHeader.innerHTML = "Lakes in Ashland County 1";
		storySubTextBody.innerHTML = "Information here on the Lakes in Ashland County 1.";
		document.getElementById("leftArrowText").innerHTML = "River at White City";
		document.getElementById("rightArrowText").innerHTML = "Gile Flowage";
		
	} else if (storyModeControl == 8) {
		storyModeControl = 7;
		map.flyTo({
			center: [-90.8785, 46.115569],
			zoom: 13,
			pitch: 0.01,
			bearing: 0,
			animate: true
		});
		storyTextHeader.innerHTML = "Lakes in Ashland County";
		storySubTextHeader.innerHTML = "Lakes in Ashland County";
		storySubTextBody.innerHTML = "Information here on the Lakes in Ashland County.";
		document.getElementById("leftArrowText").innerHTML = "River at White City";
		document.getElementById("rightArrowText").innerHTML = "Gile Flowage";
		
		map.setLayoutProperty('coastalWaters', 'visibility', 'none');
		
		map.setPaintProperty("coastalWaters", "fill-opacity", 0);
		document.getElementById("slider").style.opacity = "0";
		document.getElementById("circleSliderContainer").style.opacity = "0";
		
		opacityLayers.length = 0;
	} else if (storyModeControl == 7) {
		storyModeControl = 6;
		map.flyTo({
			center: [-90.6785, 46.3181],
			zoom: 13,
			pitch: 25,
			bearing: -20,
			animate: true
		});
		storyTextHeader.innerHTML = "River at White City 2";
		storySubTextHeader.innerHTML = "River at White City 2";
		storySubTextBody.innerHTML = "Information here on the River at White City 2.";
		document.getElementById("leftArrowText").innerHTML = "Chippewa Flowage";
		document.getElementById("rightArrowText").innerHTML = "Lakes in Ashland County";
		
		map.setLayoutProperty('coastalWaters', 'visibility', 'visible');
		
		map.setPaintProperty("coastalWaters", "fill-opacity", parseInt(circleValue, 10) / 100);
		document.getElementById("slider").style.opacity = "1";
		document.getElementById("circleSliderContainer").style.opacity = "1";
		
		opacityLayers.push('coastalWaters');
	} else if (storyModeControl == 6) {
		storyModeControl = 5;
		map.flyTo({
			center: [-90.6785, 46.3181],
			zoom: 13,
			pitch: 20,
			bearing: 20,
			animate: true
		});
		storyTextHeader.innerHTML = "River at White City 1";
		storySubTextHeader.innerHTML = "River at White City 1";
		storySubTextBody.innerHTML = "Information here on the River at White City 1.";
		document.getElementById("leftArrowText").innerHTML = "Chippewa Flowage";
		document.getElementById("rightArrowText").innerHTML = "Lakes in Ashland County";
	} else if (storyModeControl == 5) {
		storyModeControl = 4;
		map.flyTo({
			center: [-90.6785, 46.3181],
			zoom: 13,
			pitch: 0.01,
			bearing: 0,
			animate: true
		});
		storyTextHeader.innerHTML = "River at White City";
		storySubTextHeader.innerHTML = "River at White City";
		storySubTextBody.innerHTML = "Information here on the River at White City.";
		document.getElementById("leftArrowText").innerHTML = "Chippewa Flowage";
		document.getElementById("rightArrowText").innerHTML = "Lakes in Ashland County";
		
		map.setLayoutProperty('coastalWaters', 'visibility', 'none');
		
		map.setPaintProperty("coastalWaters", "fill-opacity", 0);
		document.getElementById("slider").style.opacity = "0";
		document.getElementById("circleSliderContainer").style.opacity = "0";
		
		opacityLayers.length = 0;
	} else if (storyModeControl == 4) {
		storyModeControl = 3;
		map.flyTo({
			center: [-91.872, 46.25538],
			zoom: 11,
			pitch: 25,
			bearing: -20,
			animate: true
		});
		storyTextHeader.innerHTML = "Chippewa Flowage 2";
		storySubTextHeader.innerHTML = "Chippewa Flowage 2";
		storySubTextBody.innerHTML = "Information here on the Chippewa Flowage 2.";
		document.getElementById("leftArrowText").innerHTML = "";
		document.getElementById("rightArrowText").innerHTML = "River at White City";
		
		map.setLayoutProperty('coastalWaters', 'visibility', 'visible');
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
		
		map.setPaintProperty("coastalWaters", "fill-opacity", parseInt(circleValue, 10) / 100);
		map.setPaintProperty("Agriculture", "fill-opacity", parseInt(circleValue, 10) / 100);
		map.setPaintProperty("Deciduous Forest", "fill-opacity", parseInt(circleValue, 10) / 100);
		map.setPaintProperty("Other", "fill-opacity", parseInt(circleValue, 10) / 100);
		map.setPaintProperty("Urban", "fill-opacity", parseInt(circleValue, 10) / 100);
		map.setPaintProperty("Barren", "fill-opacity", parseInt(circleValue, 10) / 100);
		map.setPaintProperty("Shrubland", "fill-opacity", parseInt(circleValue, 10) / 100);
		map.setPaintProperty("Wetlands", "fill-opacity", parseInt(circleValue, 10) / 100);
		map.setPaintProperty("Coniferous Forest", "fill-opacity", parseInt(circleValue, 10) / 100);
		map.setPaintProperty("Mixed Forest", "fill-opacity", parseInt(circleValue, 10) / 100);
		map.setPaintProperty("Unknown Cover", "fill-opacity", parseInt(circleValue, 10) / 100);
		document.getElementById("slider").style.opacity = "1";
		document.getElementById("circleSliderContainer").style.opacity = "1";
		
		opacityLayers.push('coastalWaters', 'Agriculture', 'Deciduous Forest', 'Other', 'Urban', 'Barren', 'Shrubland', 'Wetlands', 'Confierous Forest', 'Mixed Forest', 'Unknown Cover');
	} else if (storyModeControl == 3) {
		storyModeControl = 2;
		map.flyTo({
			center: [-91.872, 46.25538],
			zoom: 11,
			pitch: 20,
			bearing: 20,
			animate: true
		});
		storyTextHeader.innerHTML = "Chippewa Flowage 1";
		storySubTextHeader.innerHTML = "Chippewa Flowage 1";
		storySubTextBody.innerHTML = "Information here on the Chippewa Flowage 1.";
		document.getElementById("leftArrowText").innerHTML = "";
		document.getElementById("rightArrowText").innerHTML = "";
	} else if (storyModeControl == 2) {
		storyModeControl = 1;
		map.flyTo({
			center: [-91.872, 46.25538],
			zoom: 11,
			pitch: 0.01,
			bearing: 0,
			animate: true
		});
		storyTextHeader.innerHTML = "Chippewa Flowage";
		storySubTextHeader.innerHTML = "Chippewa Flowage";
		storySubTextBody.innerHTML = "Information here on the Chippewa Flowage.";
		document.getElementById("leftArrow").style.visibility = "hidden";
		document.getElementById("leftArrowText").innerHTML = "";
		document.getElementById("rightArrowText").innerHTML = "River at White City";
		
		map.setLayoutProperty('coastalWaters', 'visibility', 'none');
		map.setLayoutProperty('Agriculture', 'visibility', 'none');
		map.setLayoutProperty('Deciduous Forest', 'visibility', 'none');
		map.setLayoutProperty('Other', 'visibility', 'none');
		map.setLayoutProperty('Urban', 'visibility', 'none');
		map.setLayoutProperty('Barren', 'visibility', 'none');
		map.setLayoutProperty('Shrubland', 'visibility', 'none');
		map.setLayoutProperty('Wetlands', 'visibility', 'none');
		map.setLayoutProperty('Coniferous Forest', 'visibility', 'none');
		map.setLayoutProperty('Mixed Forest', 'visibility', 'none');
		map.setLayoutProperty('Unknown Cover', 'visibility', 'none');
		
		map.setPaintProperty("coastalWaters", "fill-opacity", 0);
		map.setPaintProperty("Agriculture", "fill-opacity", 0);
		map.setPaintProperty("Deciduous Forest", "fill-opacity", 0);
		map.setPaintProperty("Other", "fill-opacity", 0);
		map.setPaintProperty("Urban", "fill-opacity", 0);
		map.setPaintProperty("Barren", "fill-opacity", 0);
		map.setPaintProperty("Shrubland", "fill-opacity", 0);
		map.setPaintProperty("Wetlands", "fill-opacity", 0);
		map.setPaintProperty("Coniferous Forest", "fill-opacity", 0);
		map.setPaintProperty("Mixed Forest", "fill-opacity", 0);
		map.setPaintProperty("Unknown Cover", "fill-opacity", 0);
		document.getElementById("slider").style.opacity = "0";
		document.getElementById("circleSliderContainer").style.opacity = "0";
		
		opacityLayers.length = 0;
	} else if (storyModeControl == 1) {
	
	} else if (storyModeControl == 0) {
	
	}
};

