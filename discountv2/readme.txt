
To include in another html file or server, simply take the div with the id "map", 
the div with the id "myContainer", and the div with the id "myLoadingContainer" 
and copy them into the new file.

Along with those divs, you will need to include mapbox gl css, mapbox geocoder css, 
the custom css stylesheet (style.css), jquery js, mapbox gl js, mapbox geocoder js, 
and the custom javascript file (main.js).

You will also need to include the geojson file that is referencing the polygon layer.





(note: lines may change if you code or copy and paste into new documents)
To Change the Title Text:
	line 5 in main.js, enter value for "var titleText"

To Change or add subtext:
	line 6 in main.js, enter value for "var subText"
	
To Change first errorText:
	line 7 in main.js, enter value for "var errorText"
	
To Change second errorText:
	line 8 in main.js, enter value for "var errorText2"

To Change mapbox account and map styles:
	line 12 in main.js, enter new mapbox access token for "mapboxgl.accessToken"
	line 15 in main.js, enter new mapbox style url for "style:"

To Change initialize processing data loader text:
	line 30 in index.html, enter new text inside the "<p></p>" tags
	
To Change geocoder load speed (recommended to stay as is for minimal error):
	line 159 in main.js, enter new number in replacement of 1 for "width = width + 1"
	
To Change query result text for successful query WITH link:
	line 226 in main.js, enter new text for "link1.innerHTML"
	line 234 in main.js, enter new text for "link2.innerHTML"
	line 242 in main.js, enter new text for "link3.innerHTML"
	line 250 in main.js, enter new text for "link4.innerHTML"
	line 258 in main.js, enter new text for "link5.innerHTML"
	line 266 in main.js, enter new text for "link6.innerHTML"
	line 274 in main.js, enter new text for "link7.innerHTML"
	line 282 in main.js, enter new text for "link8.innerHTML"
	line 290 in main.js, enter new text for "link9.innerHTML"
	
To Change query result for successful query WITHOUT link:
	line 228 in main.js, enter new text for "link1.innerHTML"
	line 236 in main.js, enter new text for "link2.innerHTML"
	line 244 in main.js, enter new text for "link3.innerHTML"
	line 252 in main.js, enter new text for "link4.innerHTML"
	line 260 in main.js, enter new text for "link5.innerHTML"
	line 268 in main.js, enter new text for "link6.innerHTML"
	line 276 in main.js, enter new text for "link7.innerHTML"
	line 284 in main.js, enter new text for "link8.innerHTML"
	line 292 in main.js, enter new text for "link9.innerHTML"

