// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
define("dojo/_base/declare dojo/_base/lang dojo/_base/Color dojo/_base/array dojo/DeferredList dojo/Deferred dojo/dom-class dojo/dom-construct dojo/dom-geometry dojo/dom-style dojo/on esri/graphic esri/Color esri/layers/FeatureLayer esri/symbols/SimpleMarkerSymbol esri/symbols/SimpleLineSymbol esri/symbols/Font esri/symbols/TextSymbol esri/tasks/query esri/geometry/geometryEngine jimu/utils ./analysisUtils".split(" "),function(K,l,E,C,F,x,m,v,L,G,A,H,M,D,I,J,N,O,P,y,Q,r){return K("ProximityInfo",
null,{featureCount:0,mapServiceLayer:!1,loading:!1,queryOnLoad:!1,incidentCount:0,constructor:function(a,e,h){this.tab=a;this.container=e;this.parent=h;this.graphicsLayer=this.incident=null;this.specialFields={};this.dateFields={};this.config=h.config;this.baseLabel=""!==a.label?a.label:a.layerTitle?a.layerTitle:a.layers},queryTabCount:function(a,e,h,g){var c=new x;this.incidentCount=a.length;var b=[this.tab.tabLayers[0]];this.mapServiceLayer&&1<this.tab.tabLayers.length&&(b=[this.tab.tabLayers[1]]);
if(0<this.tab.tabLayers.length&&this.tab.tabLayers[0].url&&-1<this.tab.tabLayers[0].url.indexOf("MapServer")){this.mapServiceLayer=!0;var d;"undefined"!==typeof this.tab.tabLayers[0].infoTemplate?(this.summaryLayer=this.tab.tabLayers[0],this.summaryLayer.hasOwnProperty("loaded")&&this.summaryLayer.loaded?(this.summaryFields=this._getFields(this.summaryLayer),this._performQuery(a,e,h,g,b).then(function(a){c.resolve(a)})):(d=new D(this.summaryLayer.url),d.infoTemplate=this.tab.tabLayers[0].infoTemplate,
b=[d],this.tab.tabLayers=b,A(d,"load",l.hitch(this,function(){this.summaryLayer=d;this.summaryFields=this._getFields(this.summaryLayer);this._performQuery(a,e,h,g,b).then(function(a){c.resolve(a)})})))):this.loading||(d=new D(this.tab.tabLayers[0].url),this.loading=!0,A(d,"load",l.hitch(this,function(){this.summaryLayer=d;this.summaryFields=this._getFields(this.summaryLayer);for(var b=this.tab.tabLayers[0].url.split("MapServer/")[1],k=this.parent.map.itemInfo.itemData.operationalLayers,p=0;p<k.length;p++){var t=
k[p];if("undefined"!==typeof t.layerObject&&t.layerObject.infoTemplates&&(t=t.layerObject.infoTemplates[b])){d.infoTemplate=t.infoTemplate;break}}this.tab.tabLayers=[d];this.loading=!1;this._performQuery(a,e,h,g,this.tab.tabLayers).then(function(a){c.resolve(a)})})))}this.mapServiceLayer||this._performQuery(a,e,h,g,b).then(function(a){c.resolve(a)});return c},_performQuery:function(a,e,h,g,c){var b=new x,d=[],f,k;0<e.length?k=r.getGeoms(e):0<a.length&&(k=r.getGeoms(a));this.summaryGeoms=k;if(0<k.length)for(a=
0;a<k.length;a++)d=k[a],e=r.createDefArray(c,d),f=0===a?d=e:d=f.concat(e);(new F(d)).then(l.hitch(this,function(a){for(var d=0,e=0;e<a.length;e++){var c=a[e][1];isNaN(c)?c&&c.features?d+=c.features.length:c&&"undefined"!==typeof c.length&&(d+=c.length):d+=c}this.updateTabCount(d,h,g);b.resolve(d)}));return b},updateTabCount:function(a,e,h){this.featureCount=a;r.updateTabCount(this.featureCount,e,h,this.baseLabel,this.incidentCount)},updateForIncident:function(a,e,h,g,c,b){this.incidentCount=a.length;
this.allFields="undefined"!==typeof c&&"undefined"!==typeof b?c?!0:b:!1;var d="undefined"!==typeof g,f;C.forEach(this.tab.tabLayers,l.hitch(this,function(c){if("undefined"!==typeof c.empty&&c.url){var b=new D(c.url);A(b,"load",l.hitch(this,function(){this.tab.tabLayers=[b];d?(f=new x,this.processIncident(a,e,h,g).then(l.hitch(this,function(a){f.resolve(a)}),l.hitch(this,function(a){console.error(a);f.reject(a)}))):this.processIncident(a,e,h,g)}))}else d?(f=new x,this.processIncident(a,e,h,g).then(l.hitch(this,
function(a){f.resolve(a)}),l.hitch(this,function(a){console.error(a);f.reject(a)}))):this.processIncident(a,e,h,g)}));if(d)return f},processIncident:function(a,e,h,g){this.incidents=a;var c=[],b;if(0===e.length)for(var d=0;d<a.length;d++)b=a[d],b=b.geometry?b.geometry:b,"polygon"===b.type?(e.push(b),c.push({geometry:b,buffer:b})):c.push({geometry:void 0,buffer:void 0});else for(d=0;d<a.length;d++){b=a[d];var f=e[d].geometry?e[d].geometry:e[d];b=b.geometry?b.geometry:b;c.push({geometry:b,buffer:f})}if(0!==
e.length){for(a=0;a<c.length;a++)if(e=c[a].buffer,"undefined"!==typeof e)for(b=0;b<c.length;b++)if(b!==a&&(d=c[b].buffer,"undefined"!==typeof d&&y.overlaps(e,d))){c[a].buffer=y.difference(e,d);c[b].buffer=y.difference(d,e);d=y.union(d,e);d=y.difference(d,c[a].buffer);d=y.difference(d,c[b].buffer);if(Array.isArray(c[a].geometry)){if(Array.isArray(c[b].geometry))for(f=0;f<c[b].geometry.length;f++)c[a].geometry.push(c[b].geometry[f]);else c[a].geometry.push(c[b].geometry);f=c[a].geometry}else if(f=[],
f.push(c[a].geometry),Array.isArray(c[b].geometry))for(var k=0;k<c[b].geometry.length;k++)f.push(c[b].geometry[k]);else f.push(c[b].geometry);c.push({geometry:f,buffer:d})}var p,t="undefined"!==typeof g;t?p=new x:(this.container.innerHTML="",m.add(this.container,"loading"));var q=[];this.graphicsLayer=h;h=this.tab.tabLayers[0];var n=this._getFields(h);g=[];for(a=0;a<c.length;a++)e=new P,e.returnGeometry=!0,e.geometry=c[a].buffer,e.outFields="true"===this.parent.config.csvAllFields||!0===this.parent.config.csvAllFields?
["*"]:n,"undefined"!==typeof h.queryFeatures&&g.push(h.queryFeatures(e));(new F(g)).then(l.hitch(this,function(a){for(var d=0;d<a.length;d++){var b=a[d][1];if(b&&b.features)for(var b=b.features,e=c[d].geometry,f=0;f<b.length;f++){var g=b[f],h=g.geometry,k;if(Array.isArray(e)){var l;for(k=0;k<e.length;k++){var m=r.getDistance(e[k],h,this.parent.config.distanceUnits);if("undefined"===typeof l||m<l)l=m}k=l;h={DISTANCE:l}}else k=r.getDistance(e,h,this.parent.config.distanceUnits),h={DISTANCE:k};for(m=
0;m<n.length;m++)h[n[m]]=g.attributes[n[m]];!0===this.config.csvAllFields||"true"===this.config.csvAllFields?g.attributes.DISTANCE=k:g.attributes=h;q.push(g)}}q.sort(r.compareDistance);t?p.resolve({graphics:q,analysisResults:q.length,context:this}):this._processResults(q)}),l.hitch(this,function(a){console.error(a);p.reject(a)}));if(t)return p}},_processResults:function(a){this.container.innerHTML="";m.remove(this.container,"loading");this.graphicsLayer.clear();if("point"!==a[0].geometry.type)for(var e=
a.length-1;0<=e;e--)"undefined"===typeof a[e].geometry.getExtent()&&a.splice(e,1);var e=v.create("div",{"class":"SAT_tabPanelContent"},this.container),h=this.parent.nls[this.parent.config.distanceUnits],g=v.create("div",{},e);m.add(g,"SATcolExport");m.add(g,this.parent.lightTheme?"lightThemeBorder":"darkThemeBorder");g=v.create("div",{title:this.parent.nls.downloadCSV},g);m.add(g,"btnExport");A(g,"click",l.hitch(this,this._exportToCSV,a));var c;"undefined"!==typeof this.tab.advStat&&"undefined"!==
typeof this.tab.advStat.stats&&"undefined"!==typeof this.tab.advStat.stats.outFields?c=this.tab.advStat.stats.outFields:(c=[],0<this.tab.tabLayers.length&&C.forEach(this.tab.tabLayers,l.hitch(this,function(a){"undefined"!==typeof a.popupInfo?C.forEach(a.popupInfo.fieldInfos,l.hitch(this,function(a){if(a.visible){var b={value:0};b.expression=a.fieldName;b.label=a.label;c.push(b)}})):a.infoTemplate?C.forEach(a.infoTemplate.info.fieldInfos,l.hitch(this,function(a){if(a.visible){var b={value:0};b.expression=
a.fieldName;b.label=a.label;c.push(b)}})):C.forEach((a.layerObject?a.layerObject:a).fields,l.hitch(this,function(a){var b={value:0};b.expression=a.name;b.label=a.alias;c.push(b)}))})));for(var g=220,b=0;b<a.length;b++){var d=b+1,f=a[b],k=f.geometry,p=k;"point"!==k.type&&(p=k.getExtent().getCenter());var k=f.attributes,t;"point"===this.incidents[0].geometry.type&&(t=Math.round(100*k.DISTANCE)/100+" "+h+" ("+this.parent.nls.approximate+")");var q="",n=0;if("undefined"!==typeof c)for(var w=0;w<c.length;w++){var y=
c[w],z;for(z in k)if("DISTANCE"!==z&&3>n&&y.expression===z){var u=r.getFieldValue(z,k[z],this.specialFields,this.dateFields,"longMonthDayYear"),u="undefined"!==typeof u&&null!==u?Q.stripHTML(u.toString()):"",B;if(f._layer&&f._layer.fields){var x=r.getField(f._layer.fields,z);x&&(B=x.alias)}if("undefined"===typeof B||B in[""," ",null,void 0])B=z;r.isURL(u)?u='\x3ca href\x3d"'+u+'" target\x3d"_blank" style\x3d"color: inherit;"\x3e'+B+"\x3c/a\x3e":r.isEmail(u)&&(u='\x3ca href\x3d"mailto:'+u+'" style\x3d"color: inherit;"\x3e'+
B+"\x3c/a\x3e");q+=u+"\x3cbr/\x3e";n+=1}}f=v.create("div",{},e);m.add(f,"SATcolRec");m.add(f,this.parent.lightTheme?"lightThemeBorder":"darkThemeBorder");n=v.create("div",{},f);m.add(n,"SATcolRecBar");w=v.create("div",{innerHTML:d},n);m.add(w,"SATcolRecNum");G.set(w,"backgroundColor",this.parent.config.activeColor);A(w,"click",l.hitch(this,this._zoomToLocation,p));t&&(w=v.create("div",{innerHTML:t},n),m.add(w,"SATcolDistance"));this.parent.config.enableRouting&&(n=v.create("div",{title:this.parent.nls.get_directions},
n),m.add(n,"SATcolDir"),A(n,"click",l.hitch(this,this._routeToIncident,p)));q=v.create("div",{"class":"SATcolWrap",innerHTML:q},f);m.add(q,"SATcolInfo");g+=L.position(f).w;q=new J(J.STYLE_SOLID,new E.fromString(this.parent.config.activeMapGraphicColor),1);q=new I(I.STYLE_CIRCLE,24,q,new E.fromString(this.parent.config.activeMapGraphicColor));f=new N;f.family="Arial";f.size="12px";d=new O(d,f,new M(this.parent.config.fontColor));d.setOffset(0,-4);this.graphicsLayer.add(new H(p,q,k));this.graphicsLayer.add(new H(p,
d,k))}G.set(e,"width",g+"px")},_exportToCSV:function(a,e,h,g){a=r.exportToCSV(a,e,h,g,{type:"proximity",baseLabel:this.baseLabel,csvAllFields:this.parent.config.csvAllFields,layer:this.tab.tabLayers[0],opLayers:this.parent.opLayers,nlsValue:this.parent.nls.proximity,nlsCount:this.parent.nls.count});this.summaryLayer=a.summaryLayer;return a.details},_getFields:function(a){a=r.getFields(a,this.tab,this.allFields,this.parent);this.dateFields=a.dateFields;this.specialFields=a.specialFields;return a.fields},
_zoomToLocation:function(a){this.parent.zoomToLocation(a)},_routeToIncident:function(a){this.parent.routeToIncident(a)}})});