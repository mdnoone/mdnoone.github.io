function determineClick(feature) {
	clickedCountyName = feature.properties.COUNTY_NAM;	
};



function takeScreenshot() {
	//window.open(window.location.href, '_blank');
	var data1 = map.getCanvas().toDataURL("image/png");
	/*var canvas = map.getCanvas();
	var dataURL = canvas.toDataURL("image/png");
	*/
	//console.log(data);
	//window.location.href = data;
	window.open(data1);
};

















function changeLegendAndMapWetlands(){
	map.setPaintProperty('Wetlands', 'fill-color', {
		property: 'Cov1',
		type: 'categorical',
		stops: [
			['A3', '#fbb03b'],
			['A4', '#223b53'],
			['B4', '#e55e5e'],
			['C4', '#3bb2d0'],
			['C4b', '#ccc']]
	});
				
	var c;
	for(c=0; c < mainLegend.length; c++){
		var placeholder = mainLegend[c][0];
		var remove = document.getElementById(placeholder);
					
		var p1 = document.getElementById("legendv2").lastElementChild;
		var p2 = p1.childNodes[0];
		var p3 = p2.childNodes[0];
		p2.removeChild(p3);
	}
				
	var backHolder = document.createElement('DIV');
	var textBackHolder = document.createTextNode("Back");
	backHolder.setAttribute("class", "legendSquarev2");
	backHolder.setAttribute("onclick", "clickLegendBack('Wetlands')");
	var m1 = document.getElementById("legendv2").lastElementChild;
	var m2 = m1.childNodes[0];
	backHolder.appendChild(textBackHolder);
	m2.appendChild(backHolder);
				
	var v;
	for(v=0; v < wetlandsLayers.length; v++){
		var placeholder = document.createElement('DIV');
		var placeholder2 = document.createElement('DIV');
		var idHold = wetlandsLayers[v][0];
		var colorHold = "background:" + wetlandsLayers[v][1];
		var textholder = document.createTextNode(idHold);
					
					
		placeholder.setAttribute("class", "legendSquare");
		placeholder2.setAttribute("class", "circleLegend");
		placeholder2.setAttribute("id", idHold);
		placeholder2.setAttribute("style", colorHold);
		placeholder2.setAttribute("onclick", "clickSpecificLegend(this.id)")
					
		var placeholder3 = document.getElementById("legendv2").lastElementChild;
		var placeholder4 = placeholder3.childNodes[0];
		placeholder4.appendChild(placeholder);
		placeholder.appendChild(placeholder2);
		placeholder2.appendChild(textholder);
	}
};


function changeLegendAndMapAgriculture(){
	map.setPaintProperty('Agriculture', 'fill-color', {
		property: 'Cov1',
		type: 'categorical',
		stops: [
			['AP', '#D98880'],
			['BB', '#C39BD3'],
			['C', '#7FB3D5'],
			['CS', '#5DADE2'],
			['F4', '#76D7C4'],
			['FP', '#7DCEA0'],
			['P', '#F1C40F'],
			['PP', '#FDEBD0'],
			['SP', '#873600'],
			['OR', '#D6DBDF']]
	});
				
	var c;
	for(c=0; c < mainLegend.length; c++){
		var placeholder = mainLegend[c][0];
		var remove = document.getElementById(placeholder);
					
		var p1 = document.getElementById("legendv2").lastElementChild;
		var p2 = p1.childNodes[0];
		var p3 = p2.childNodes[0];
		p2.removeChild(p3);
	}
				
	var backHolder = document.createElement('DIV');
	var textBackHolder = document.createTextNode("Back");
	backHolder.setAttribute("class", "legendSquarev2");
	backHolder.setAttribute("onclick", "clickLegendBack('Agriculture')");
	var m1 = document.getElementById("legendv2").lastElementChild;
	var m2 = m1.childNodes[0];
	backHolder.appendChild(textBackHolder);
	m2.appendChild(backHolder);
				
	var v;
	for(v=0; v < agricultureLayers.length; v++){
		var placeholder = document.createElement('DIV');
		var placeholder2 = document.createElement('DIV');
		var idHold = agricultureLayers[v][0];
		var colorHold = "background:" + agricultureLayers[v][1];
		var textholder = document.createTextNode(idHold);
					
					
		placeholder.setAttribute("class", "legendSquare");
		placeholder2.setAttribute("class", "circleLegend");
		placeholder2.setAttribute("id", idHold);
		placeholder2.setAttribute("style", colorHold);
		placeholder2.setAttribute("onclick", "clickSpecificLegend(this.id)")
					
		var placeholder3 = document.getElementById("legendv2").lastElementChild;
		var placeholder4 = placeholder3.childNodes[0];
		placeholder4.appendChild(placeholder);
		placeholder.appendChild(placeholder2);
		placeholder2.appendChild(textholder);
	}
};

function changeLegendAndMapUrban(){
	map.setPaintProperty('Urban', 'fill-color', {
		property: 'Cov1',
		type: 'categorical',
		stops: [
			['ARPT', '#D98880'],
			['CM', '#C39BD3'],
			['CT', '#7FB3D5'],
			['FF', '#5DADE2'],
			['FG', '#76D7C4'],
			['FX', '#7DCEA0'],
			['GC', '#F1C40F'],
			['MY', '#FDEBD0'],
			['Qz', '#873600'],
			['CA', '#D6DBDF'],
			['PD', '#2C3E50'],
			['U', '#641E16']]
	});
				
	var c;
	for(c=0; c < mainLegend.length; c++){
		var placeholder = mainLegend[c][0];
		var remove = document.getElementById(placeholder);
					
		var p1 = document.getElementById("legendv2").lastElementChild;
		var p2 = p1.childNodes[0];
		var p3 = p2.childNodes[0];
		p2.removeChild(p3);
	}
				
	var backHolder = document.createElement('DIV');
	var textBackHolder = document.createTextNode("Back");
	backHolder.setAttribute("class", "legendSquarev2");
	backHolder.setAttribute("onclick", "clickLegendBack('Urban')");
	var m1 = document.getElementById("legendv2").lastElementChild;
	var m2 = m1.childNodes[0];
	backHolder.appendChild(textBackHolder);
	m2.appendChild(backHolder);
				
	var v;
	for(v=0; v < urbanLayers.length; v++){
		var placeholder = document.createElement('DIV');
		var placeholder2 = document.createElement('DIV');
		var idHold = urbanLayers[v][0];
		var colorHold = "background:" + urbanLayers[v][1];
		var textholder = document.createTextNode(idHold);
					
					
		placeholder.setAttribute("class", "legendSquare");
		placeholder2.setAttribute("class", "circleLegend");
		placeholder2.setAttribute("id", idHold);
		placeholder2.setAttribute("style", colorHold);
		placeholder2.setAttribute("onclick", "clickSpecificLegend(this.id)")
					
		var placeholder3 = document.getElementById("legendv2").lastElementChild;
		var placeholder4 = placeholder3.childNodes[0];
		placeholder4.appendChild(placeholder);
		placeholder.appendChild(placeholder2);
		placeholder2.appendChild(textholder);
	}
};


function changeLegendAndMapBarren(){
	map.setPaintProperty('Barren', 'fill-color', {
		property: 'Cov1',
		type: 'categorical',
		stops: [
			['CL', '#D98880'],
			['GP', '#C39BD3'],
			['MF', '#7FB3D5'],
			['RO', '#5DADE2'],
			['A', '#76D7C4'],
			['CPP', '#7DCEA0'],
			['O', '#F1C40F']]
	});
				
	var c;
	for(c=0; c < mainLegend.length; c++){
		var placeholder = mainLegend[c][0];
		var remove = document.getElementById(placeholder);
					
		var p1 = document.getElementById("legendv2").lastElementChild;
		var p2 = p1.childNodes[0];
		var p3 = p2.childNodes[0];
		p2.removeChild(p3);
	}
				
	var backHolder = document.createElement('DIV');
	var textBackHolder = document.createTextNode("Back");
	backHolder.setAttribute("class", "legendSquarev2");
	backHolder.setAttribute("onclick", "clickLegendBack('Barren')");
	var m1 = document.getElementById("legendv2").lastElementChild;
	var m2 = m1.childNodes[0];
	backHolder.appendChild(textBackHolder);
	m2.appendChild(backHolder);
				
	var v;
	for(v=0; v < barrenLayers.length; v++){
		var placeholder = document.createElement('DIV');
		var placeholder2 = document.createElement('DIV');
		var idHold = barrenLayers[v][0];
		var colorHold = "background:" + barrenLayers[v][1];
		var textholder = document.createTextNode(idHold);
					
					
		placeholder.setAttribute("class", "legendSquare");
		placeholder2.setAttribute("class", "circleLegend");
		placeholder2.setAttribute("id", idHold);
		placeholder2.setAttribute("style", colorHold);
		placeholder2.setAttribute("onclick", "clickSpecificLegend(this.id)")
					
		var placeholder3 = document.getElementById("legendv2").lastElementChild;
		var placeholder4 = placeholder3.childNodes[0];
		placeholder4.appendChild(placeholder);
		placeholder.appendChild(placeholder2);
		placeholder2.appendChild(textholder);
	}
};

function changeLegendAndMapDeciduousForest(){
	map.setPaintProperty('Deciduous Forest', 'fill-color', {
		property: 'Cov1',
		type: 'categorical',
		stops: [
			['A1', '#D98880'],
			['A2', '#C39BD3'],
			['B', '#7FB3D5'],
			['C1', '#5DADE2'],
			['C1b', '#76D7C4'],
			['D', '#7DCEA0'],
			['D1', '#F1C40F'],
			['D1b', '#FDEBD0'],
			['D1u', '#873600'],
			['D1uu', '#D6DBDF'],
			['D3b', '#2C3E50']]
	});
				
	var c;
	for(c=0; c < mainLegend.length; c++){
		var placeholder = mainLegend[c][0];
		var remove = document.getElementById(placeholder);
					
		var p1 = document.getElementById("legendv2").lastElementChild;
		var p2 = p1.childNodes[0];
		var p3 = p2.childNodes[0];
		p2.removeChild(p3);
	}
				
	var backHolder = document.createElement('DIV');
	var textBackHolder = document.createTextNode("Back");
	backHolder.setAttribute("class", "legendSquarev2");
	backHolder.setAttribute("onclick", "clickLegendBack('Deciduous Forest')");
	var m1 = document.getElementById("legendv2").lastElementChild;
	var m2 = m1.childNodes[0];
	backHolder.appendChild(textBackHolder);
	m2.appendChild(backHolder);
				
	var v;
	for(v=0; v < deciduousforestLayers.length; v++){
		var placeholder = document.createElement('DIV');
		var placeholder2 = document.createElement('DIV');
		var idHold = deciduousforestLayers[v][0];
		var colorHold = "background:" + deciduousforestLayers[v][1];
		var textholder = document.createTextNode(idHold);
					
					
		placeholder.setAttribute("class", "legendSquare");
		placeholder2.setAttribute("class", "circleLegend");
		placeholder2.setAttribute("id", idHold);
		placeholder2.setAttribute("style", colorHold);
		placeholder2.setAttribute("onclick", "clickSpecificLegend(this.id)")
					
		var placeholder3 = document.getElementById("legendv2").lastElementChild;
		var placeholder4 = placeholder3.childNodes[0];
		placeholder4.appendChild(placeholder);
		placeholder.appendChild(placeholder2);
		placeholder2.appendChild(textholder);
	}
};

function changeLegendAndMapOther(){
	map.setPaintProperty('Other', 'fill-color', {
		property: 'Cov1',
		type: 'categorical',
		stops: [
			['BD', '#D98880'],
			['BF', '#C39BD3'],
			['BP', '#7FB3D5'],
			['IS', '#5DADE2'],
			['D5', '#76D7C4'],
			['D5b', '#7DCEA0'],
			['S', '#F1C40F'],
			['Blowdown', '#FDEBD0'],
			['Cutover', '#873600'],
			['Rcnt. Cut', '#D6DBDF'],
			['Slash', '#2C3E50']]
	});
				
	var c;
	for(c=0; c < mainLegend.length; c++){
		var placeholder = mainLegend[c][0];
		var remove = document.getElementById(placeholder);
					
		var p1 = document.getElementById("legendv2").lastElementChild;
		var p2 = p1.childNodes[0];
		var p3 = p2.childNodes[0];
		p2.removeChild(p3);
	}
				
	var backHolder = document.createElement('DIV');
	var textBackHolder = document.createTextNode("Back");
	backHolder.setAttribute("class", "legendSquarev2");
	backHolder.setAttribute("onclick", "clickLegendBack('Other')");
	var m1 = document.getElementById("legendv2").lastElementChild;
	var m2 = m1.childNodes[0];
	backHolder.appendChild(textBackHolder);
	m2.appendChild(backHolder);
				
	var v;
	for(v=0; v < otherLayers.length; v++){
		var placeholder = document.createElement('DIV');
		var placeholder2 = document.createElement('DIV');
		var idHold = otherLayers[v][0];
		var colorHold = "background:" + otherLayers[v][1];
		var textholder = document.createTextNode(idHold);
					
					
		placeholder.setAttribute("class", "legendSquare");
		placeholder2.setAttribute("class", "circleLegend");
		placeholder2.setAttribute("id", idHold);
		placeholder2.setAttribute("style", colorHold);
		placeholder2.setAttribute("onclick", "clickSpecificLegend(this.id)")
					
		var placeholder3 = document.getElementById("legendv2").lastElementChild;
		var placeholder4 = placeholder3.childNodes[0];
		placeholder4.appendChild(placeholder);
		placeholder.appendChild(placeholder2);
		placeholder2.appendChild(textholder);
	}
};

function changeLegendAndMapShrubland(){
	map.setPaintProperty('Shrubland', 'fill-color', {
		property: 'Cov1',
		type: 'categorical',
		stops: [
			['D4', '#D98880'],
			['E1', '#C39BD3'],
			['E4', '#7FB3D5'],
			['UG', '#5DADE2']]
	});
				
	var c;
	for(c=0; c < mainLegend.length; c++){
		var placeholder = mainLegend[c][0];
		var remove = document.getElementById(placeholder);
					
		var p1 = document.getElementById("legendv2").lastElementChild;
		var p2 = p1.childNodes[0];
		var p3 = p2.childNodes[0];
		p2.removeChild(p3);
	}
				
	var backHolder = document.createElement('DIV');
	var textBackHolder = document.createTextNode("Back");
	backHolder.setAttribute("class", "legendSquarev2");
	backHolder.setAttribute("onclick", "clickLegendBack('Shrubland')");
	var m1 = document.getElementById("legendv2").lastElementChild;
	var m2 = m1.childNodes[0];
	backHolder.appendChild(textBackHolder);
	m2.appendChild(backHolder);
				
	var v;
	for(v=0; v < shrublandLayers.length; v++){
		var placeholder = document.createElement('DIV');
		var placeholder2 = document.createElement('DIV');
		var idHold = shrublandLayers[v][0];
		var colorHold = "background:" + shrublandLayers[v][1];
		var textholder = document.createTextNode(idHold);
					
					
		placeholder.setAttribute("class", "legendSquare");
		placeholder2.setAttribute("class", "circleLegend");
		placeholder2.setAttribute("id", idHold);
		placeholder2.setAttribute("style", colorHold);
		placeholder2.setAttribute("onclick", "clickSpecificLegend(this.id)")
					
		var placeholder3 = document.getElementById("legendv2").lastElementChild;
		var placeholder4 = placeholder3.childNodes[0];
		placeholder4.appendChild(placeholder);
		placeholder.appendChild(placeholder2);
		placeholder2.appendChild(textholder);
	}
};

function changeLegendAndMapConiferousForest(){
	map.setPaintProperty('Coniferous Forest', 'fill-color', {
		property: 'Cov1',
		type: 'categorical',
		stops: [
			['B2', '#D98880'],
			['B3', '#C39BD3'],
			['C2', '#7FB3D5'],
			['C3', '#5DADE2'],
			['D2', '#76D7C4'],
			['D3', '#7DCEA0']]
	});
				
	var c;
	for(c=0; c < mainLegend.length; c++){
		var placeholder = mainLegend[c][0];
		var remove = document.getElementById(placeholder);
					
		var p1 = document.getElementById("legendv2").lastElementChild;
		var p2 = p1.childNodes[0];
		var p3 = p2.childNodes[0];
		p2.removeChild(p3);
	}
				
	var backHolder = document.createElement('DIV');
	var textBackHolder = document.createTextNode("Back");
	backHolder.setAttribute("class", "legendSquarev2");
	backHolder.setAttribute("onclick", "clickLegendBack('Coniferous Forest')");
	var m1 = document.getElementById("legendv2").lastElementChild;
	var m2 = m1.childNodes[0];
	backHolder.appendChild(textBackHolder);
	m2.appendChild(backHolder);
				
	var v;
	for(v=0; v < coniferousforestLayers.length; v++){
		var placeholder = document.createElement('DIV');
		var placeholder2 = document.createElement('DIV');
		var idHold = coniferousforestLayers[v][0];
		var colorHold = "background:" + coniferousforestLayers[v][1];
		var textholder = document.createTextNode(idHold);
					
					
		placeholder.setAttribute("class", "legendSquare");
		placeholder2.setAttribute("class", "circleLegend");
		placeholder2.setAttribute("id", idHold);
		placeholder2.setAttribute("style", colorHold);
		placeholder2.setAttribute("onclick", "clickSpecificLegend(this.id)")
					
		var placeholder3 = document.getElementById("legendv2").lastElementChild;
		var placeholder4 = placeholder3.childNodes[0];
		placeholder4.appendChild(placeholder);
		placeholder.appendChild(placeholder2);
		placeholder2.appendChild(textholder);
	}
};

function changeLegendAndMapMixedForest(){
	map.setPaintProperty('Mixed Forest', 'fill-color', {
		property: 'Cov1',
		type: 'categorical',
		stops: [
			['B1', '#D98880'],
			['B1b', '#C39BD3'],
			['UF', '#7FB3D5']]
	});
				
	var c;
	for(c=0; c < mainLegend.length; c++){
		var placeholder = mainLegend[c][0];
		var remove = document.getElementById(placeholder);
					
		var p1 = document.getElementById("legendv2").lastElementChild;
		var p2 = p1.childNodes[0];
		var p3 = p2.childNodes[0];
		p2.removeChild(p3);
	}
				
	var backHolder = document.createElement('DIV');
	var textBackHolder = document.createTextNode("Back");
	backHolder.setAttribute("class", "legendSquarev2");
	backHolder.setAttribute("onclick", "clickLegendBack('Mixed Forest')");
	var m1 = document.getElementById("legendv2").lastElementChild;
	var m2 = m1.childNodes[0];
	backHolder.appendChild(textBackHolder);
	m2.appendChild(backHolder);
				
	var v;
	for(v=0; v < mixedforestLayers.length; v++){
		var placeholder = document.createElement('DIV');
		var placeholder2 = document.createElement('DIV');
		var idHold = mixedforestLayers[v][0];
		var colorHold = "background:" + mixedforestLayers[v][1];
		var textholder = document.createTextNode(idHold);
					
					
		placeholder.setAttribute("class", "legendSquare");
		placeholder2.setAttribute("class", "circleLegend");
		placeholder2.setAttribute("id", idHold);
		placeholder2.setAttribute("style", colorHold);
		placeholder2.setAttribute("onclick", "clickSpecificLegend(this.id)")
					
		var placeholder3 = document.getElementById("legendv2").lastElementChild;
		var placeholder4 = placeholder3.childNodes[0];
		placeholder4.appendChild(placeholder);
		placeholder.appendChild(placeholder2);
		placeholder2.appendChild(textholder);
	}
};

function changeLegendAndMapUnknown(){
	map.setPaintProperty('Unknown Cover', 'fill-color', {
		property: 'Cov1',
		type: 'categorical',
		stops: [
			['A5', '#D98880'],
			['AA', '#C39BD3'],
			['AC', '#7FB3D5'],
			['AR', '#5DADE2'],
			['CCC', '#76D7C4'],
			['CP', '#7DCEA0'],
			['D3u', '#F1C40F'],
			['E2', '#FDEBD0'],
			['F', '#873600'],
			['OA', '#D6DBDF'],
			['OC', '#2C3E50']]
	});
				
	var c;
	for(c=0; c < mainLegend.length; c++){
		var placeholder = mainLegend[c][0];
		var remove = document.getElementById(placeholder);
					
		var p1 = document.getElementById("legendv2").lastElementChild;
		var p2 = p1.childNodes[0];
		var p3 = p2.childNodes[0];
		p2.removeChild(p3);
	}
				
	var backHolder = document.createElement('DIV');
	var textBackHolder = document.createTextNode("Back");
	backHolder.setAttribute("class", "legendSquarev2");
	backHolder.setAttribute("onclick", "clickLegendBack('Unknown')");
	var m1 = document.getElementById("legendv2").lastElementChild;
	var m2 = m1.childNodes[0];
	backHolder.appendChild(textBackHolder);
	m2.appendChild(backHolder);
				
	var v;
	for(v=0; v < unknownLayers.length; v++){
		var placeholder = document.createElement('DIV');
		var placeholder2 = document.createElement('DIV');
		var idHold = unknownLayers[v][0];
		var colorHold = "background:" + unknownLayers[v][1];
		var textholder = document.createTextNode(idHold);
					
					
		placeholder.setAttribute("class", "legendSquare");
		placeholder2.setAttribute("class", "circleLegend");
		placeholder2.setAttribute("id", idHold);
		placeholder2.setAttribute("style", colorHold);
		placeholder2.setAttribute("onclick", "clickSpecificLegend(this.id)")
					
		var placeholder3 = document.getElementById("legendv2").lastElementChild;
		var placeholder4 = placeholder3.childNodes[0];
		placeholder4.appendChild(placeholder);
		placeholder.appendChild(placeholder2);
		placeholder2.appendChild(textholder);
	}
};


function clickSpecificLegend(source) {
	var xm;
	for(xm=0; xm < combinationLayers.length; xm++) {
		placeMe = combinationLayers[xm][0];
		console.log(source);
		if (placeMe == source) {
			placeYou = combinationLayers[xm][2];
			alert(placeYou);
		} else {
			return
		}
	}
	
};