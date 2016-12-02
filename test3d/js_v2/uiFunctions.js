
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







