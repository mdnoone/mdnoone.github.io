// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
require({cache:{"url:widgets/NearMe/item-list.html":'\x3cdiv class\x3d"esriCTItemlList"\x3e\r\n    \x3cdiv class\x3d"esriCTBackButton"\x3e\r\n        \x3cdiv class\x3d"esriCTItemLeftArrow"\x3e\r\n        \x3c/div\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv class\x3d"esriCTItemRightArrow"\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv class\x3d"esriCTItemCount esriCTLoadingIcon"\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv class\x3d"esriCTItemName"\x3e\r\n    \x3c/div\x3e\r\n\x3c/div\x3e\r\n'}});
define("dojo/_base/declare dijit/_WidgetBase dojo/dom-construct dojo/query dojo/_base/lang dijit/layout/ContentPane dojo/dom-attr dojo/dom-style dojo/dom-class dojo/on dojo/Deferred dojo/Evented dojo/promise/all jimu/dijit/Message jimu/dijit/TabContainer dojo/text!./item-list.html esri/Color esri/dijit/Directions esri/dijit/PopupTemplate esri/graphic esri/geometry/Point esri/geometry/Polyline esri/geometry/Polygon esri/SpatialReference esri/geometry/geometryEngine esri/layers/FeatureLayer esri/layers/GraphicsLayer esri/symbols/SimpleFillSymbol esri/symbols/SimpleLineSymbol esri/symbols/SimpleMarkerSymbol esri/tasks/query esri/units dojo/_base/fx".split(" "),function(z,
A,g,p,e,v,n,d,k,h,r,B,w,C,D,E,q,F,G,s,H,I,J,t,K,L,M,x,l,y,N,O,P){return z([A,B],{_itemListTemplate:E,_serviceArea:null,_operationalLayers:null,_selectedPoint:null,_panels:{},_currentPanel:null,map:null,config:null,folderUrl:null,loading:null,nls:null,parentDiv:null,outerContainer:null,_featureListContent:null,_featureInfoPanel:null,_directionInfoPanel:null,_tabContainer:null,_isNoFeature:null,_isSlide:!0,_loadAttachmentTimer:null,_failedLayers:[],_routeCalculated:!1,_selectedLayer:null,_selectedItem:null,
_selectedFeature:null,_selectedFeatureItem:null,_featureGraphicsLayer:null,_directionsWidget:null,postCreate:function(){this.domNode=g.create("div",{"class":"esriCTItemListMainContainer"},this.outerContainer);this._createPanels();this._loadFeatureLayers();this._featureGraphicsLayer=new M;this.map.addLayer(this._featureGraphicsLayer)},_createPanels:function(){var a;this._panels.layerListPanel=g.create("div",{"class":"esriCTLayerList"},this.domNode);this._panels.featureListPanel=g.create("div",{"class":"esriCTFeatureList"},
this.domNode);a=g.toDom(this._itemListTemplate).childNodes[0];k.add(a,"esriCTPanelHeader");this._panels.featureListPanel.appendChild(a);this._featureListContent=g.create("div",{"class":"esriCTFeatureListContent"},null);d.set(this._featureListContent,"color",this.config.fontColor);this._panels.featureListPanel.appendChild(this._featureListContent);this._attachEventOnBackButton(this._panels.featureListPanel);this._panels.infoPanel=g.create("div",{"class":"esriCTDirectionInfoPanel"},this.domNode);a=
g.toDom(this._itemListTemplate).childNodes[0];k.add(a,"esriCTPanelHeader");this._panels.infoPanel.appendChild(a);this._attachEventOnBackButton(this._panels.infoPanel);this._featureInfoPanel=new v({id:"divFeatureInfoContent"},null);this._featureInfoPanel.startup();this.map.webMapResponse.itemInfo.itemData.applicationProperties&&this.map.webMapResponse.itemInfo.itemData.applicationProperties.viewing.routing.enabled?(this._directionInfoPanel=new v({id:"divDirectionInfoContent"},null),this._directionInfoPanel.startup(),
this._tabContainer=new D({tabs:[{title:this.nls.informationTabTitle,content:this._featureInfoPanel},{title:this.nls.directionTabTitle,content:this._directionInfoPanel}]},g.create("div",{"class":"esriCTTabContainer"},this._panels.infoPanel)),this._tabContainer.startup(),h(this._tabContainer,"tabChanged",e.hitch(this,function(a){this.emit("tab-change",a);a===this.nls.directionTabTitle&&!this._routeCalculated&&this._initializeDirectionWidget();dijit.byId(this.parentDiv.id).resize()}))):(this._panels.infoPanel.appendChild(this._featureInfoPanel.domNode),
k.add(this._featureInfoPanel.domNode,"esriCTFeatureInfo"));dijit.byId(this.parentDiv.id).resize()},_attachEventOnBackButton:function(a){(a=p(".esriCTBackButton",a)[0])&&h(a,"click",e.hitch(this,function(a){a.stopPropagation();this._isSlide&&(this._isSlide=!1,this._selectedItem=null,this._clearGrahics(),this._isFeatureList?(this._isFeatureList=!1,this._clearDirections(),this._showPanel("featureListPanel",!0)):(this.loading.hide(),this._clearContent(this._featureListContent),this._selectedLayer=null,
this._isFeatureList=!1,this._showPanel("layerListPanel",!0)))}))},_loadFeatureLayers:function(){var a,b;this._operationalLayers=[];for(b=0;b<this.config.searchLayers.length;b++)this.config.searchLayers[b].popupInfo&&(a=new L(this.config.searchLayers[b].url,{infoTemplate:new G(this.config.searchLayers[b].popupInfo)}),a.title=this.config.searchLayers[b].title,this.config.searchLayers[b].definitionExpression&&a.setDefinitionExpression(this.config.searchLayers[b].definitionExpression),this.config.searchLayers[b].renderer&&
a.setRenderer(this.config.searchLayers[b].renderer),a.showAttachments=this.config.searchLayers[b].popupInfo.showAttachments,this._operationalLayers.push(a))},hasValidLayers:function(){return this._operationalLayers&&0<this._operationalLayers.length?!0:!1},_clearContent:function(a){a&&g.empty(a)},displayLayerList:function(a,b){var c,f=[];this.loading.hide();this._isSlide=this._isNoFeature=!0;this.clearResultPanel();this._setSeachedLocation(a);this._setServiceArea(b);this._failedLayers=[];if(1<this._operationalLayers.length){this._currentPanel=
this._panels.layerListPanel;d.set(this._currentPanel,"display","block");d.set(this._currentPanel,"left","0px");for(c=0;c<this._operationalLayers.length;c++)this._createItemTemplate(this._operationalLayers[c],f)}else this._onSingleLayerFound(f);w(f).then(e.hitch(this,function(){this._onFeatureCountComplete()}))},_onSingleLayerFound:function(a){var b;b=new r;a.push(b);(a=p(".esriCTBackButton",this._panels.featureListPanel)[0])&&d.set(a,"display","none");this._currentPanel=this._panels.featureListPanel;
d.set(this._currentPanel,"display","block");d.set(this._currentPanel,"left","0px");this._displayFeatureList(this._operationalLayers[0],b)},_createItemTemplate:function(a,b){var c;c=g.toDom(this._itemListTemplate).childNodes[0];k.add(c,"esriCTDisabled");d.set(c,"color",this.config.fontColor);this._currentPanel.appendChild(c);this._setItemName(c,a.title);this._queryForCountOnly(c,a,b);this._attachClickEvent(c,a,!0)},_setItemName:function(a,b){var c=p(".esriCTItemName",a)[0];c&&(n.set(c,"innerHTML",
b),n.set(c,"title",b))},_attachClickEvent:function(a,b){h(a,"click",e.hitch(this,function(c){!k.contains(a,"esriCTDisabled")&&this._isSlide&&(c.stopPropagation(),this._isSlide=!1,this._selectedItem=a,this._showPanel("featureListPanel"),this._displayFeatureList(b,null))}))},_displayFeatureList:function(a,b){this._clearContent(this._featureListContent);this._selectedLayer=a;this._setItemName(this._panels.featureListPanel,this._selectedLayer.title);this._queryForFeatureList(b)},_getQueryParams:function(){var a=
new N;a.geometry=this._serviceArea||this.map.extent;a.spatialRelationship="esriSpatialRelIntersects";a.outFields=["*"];return a},_queryForCountOnly:function(a,b,c){var f,m;m=this._getQueryParams();f=new r;b.queryCount(m,e.hitch(this,function(b){this._setItemCount(a,b,!0,!1);f.resolve()}),e.hitch(this,function(){this._setItemCount(a,0,!0,!0);this._failedLayers.push(b.title);f.resolve()}));c.push(f)},_onFeatureCountComplete:function(){this._isNoFeature&&(this.clearResultPanel(),d.set(this._panels.layerListPanel,
"display","block"),d.set(this._panels.layerListPanel,"left","0px"),g.create("div",{"class":"esriCTNoFeatureFound",innerHTML:this.nls.noFeatureFoundText},this._panels.layerListPanel));if(this._failedLayers.length){var a=this.nls.unableToFetchResults+"\n\x3c/t\x3e\x3cul\x3e\x3cli\x3e"+this._failedLayers.join("\n \x3c/li\x3e\x3cli\x3e")+"\x3c/li\x3e\x3c/ul\x3e";this._showMessage(a)}this.loading.hide();dijit.byId(this.parentDiv.id).resize()},_queryForFeatureList:function(a){this.loading.show();var b=
this._getQueryParams();this._selectedLayer.queryFeatures(b,e.hitch(this,function(b){0<b.features.length&&(this._isNoFeature=!1,this._creatFeatureList(b.features));a&&a.resolve()}),e.hitch(this,function(){this.loading.hide();this._failedLayers.push(this._selectedLayer.title);a&&a.resolve()}))},_setItemCount:function(a,b,c,f){var m=p(".esriCTItemCount",a)[0];m&&(k.remove(m,"esriCTLoadingIcon"),f?n.set(m,"innerHTML","(-)"):c?(n.set(m,"innerHTML","("+b+")"),b&&(this._isNoFeature=!1,k.remove(a,"esriCTDisabled"))):
n.set(m,"innerHTML",b.toFixed(2)+" "+this.config.bufferDistanceUnit.acronym))},_creatFeatureList:function(a){var b,c;a=this._getSortedFeatureList(a);for(b=0;b<a.length;b++)c=g.toDom(this._itemListTemplate).childNodes[0],k.add(c,"esriCTFeatureListItem"),this._featureListContent.appendChild(c),this._setItemName(c,a[b].getTitle()),this._setItemCount(c,a[b].distanceToLocation,!1,!1),this._attachEventOnFeatureDiv(c,a[b]);dijit.byId(this.parentDiv.id).resize();this.loading.hide()},_getSortedFeatureList:function(a){var b;
for(b=0;b<a.length;b++)a[b].distanceToLocation=K.distance(this._selectedPoint.geometry,a[b].geometry,this.config.bufferDistanceUnit.distanceUnit);a.sort(function(a,b){return a.distanceToLocation-b.distanceToLocation});return a},_attachEventOnFeatureDiv:function(a,b){h(a,"click",e.hitch(this,function(){this._setItemName(this._panels.infoPanel,this._selectedLayer.title);this._showPanel("infoPanel");this._tabContainer&&this._tabContainer.selectTab(this.nls.informationTabTitle);this._selectedFeatureItem=
a;this._selectedFeature=b;this._isFeatureList=!0;this._clearDirections();this._highlightFeatureOnMap();this._displayFeatureInfo(b);dijit.byId(this.parentDiv.id).resize()}))},_displayFeatureInfo:function(a){this._loadAttachmentTimer&&clearTimeout(this._loadAttachmentTimer);this._featureInfoPanel&&(this._featureInfoPanel.set("content",a.getContent()),this._checkAttachments())},_checkAttachments:function(){if(this._selectedLayer.hasAttachments&&this._selectedLayer.showAttachments){this.loading.show();
var a=p(".attachmentsSection",this._featureInfoPanel.domNode)[0];g.empty(a);k.remove(a,"hidden");this._loadAttachmentTimer=setTimeout(e.hitch(this,function(){this._showAttachments(this._selectedFeature,a,this._selectedLayer)}),500)}},_showAttachments:function(a,b,c){var f,m,d,u,h,n=[],l;a=a.attributes[c.objectIdField];g.empty(b);c.queryAttachmentInfos(a,e.hitch(this,function(a){if(a&&0<a.length){g.create("div",{innerHTML:this.nls.attachmentHeader,"class":"esriCTAttachmentHeader"},b);f=g.create("div",
{"class":"esriCTThumbnailContainer"},b);for(h=0;h<a.length;h++)l=new r,u=this.folderUrl+"images/no-attachment.png",-1<a[h].contentType.indexOf("image")&&(u=a[h].url),d=g.create("span",{"class":"esriCTAttachmentHolder col"},f),k.add(d,"esriCTImageLoader"),m=g.create("img",{alt:a[h].url,"class":"esriCTAttachmentImg esriCTAutoHeight",src:u},d),this._attachEventOnImage(m,l),n.push(l)}w(n).then(e.hitch(this,this._onAllAttachmentLoad));dijit.byId(this.parentDiv.id).resize()}))},_attachEventOnImage:function(a,
b){h(a,"load",e.hitch(this,function(a){this._onImageLoad(a);b.resolve()}));h(a,"click",e.hitch(this,this._displayImageAttachments));h(a,"error",e.hitch(this,function(a){this._onError(a);b.resolve()}))},_displayImageAttachments:function(a){window.open(a.target.alt)},_onImageLoad:function(a){k.remove(a.target.parentNode,"esriCTImageLoader");this._setImageDimensions(a.target)},_setImageDimensions:function(a){var b,c;c=a.parentElement;if(a&&0<a.offsetHeight&&(n.set(a,"originalHeight",a.offsetHeight),
d.set(a,"maxHeight",a.offsetHeight+"px"),d.set(a,"maxWidth",a.offsetWidth+"px"),b=parseFloat(n.get(a,"originalHeight")),c.offsetHeight<a.offsetHeight||b>c.offsetHeight))b=a.offsetWidth/a.offsetHeight,c=c.offsetHeight-2,b=Math.floor(c*b),k.remove(a,"esriCTAutoHeight"),d.set(a,"width",b+"px"),d.set(a,"height",c+"px")},_onError:function(a){k.remove(a.target.parentNode,"esriCTImageLoader")},_onAllAttachmentLoad:function(){this.loading.hide()},_setSeachedLocation:function(a){this._selectedPoint=a},_setServiceArea:function(a){this._serviceArea=
a},clearResultPanel:function(){this._isFeatureList=!1;this._clearContent(this._panels.layerListPanel);d.set(this._panels.featureListPanel,"display","none");d.set(this._panels.infoPanel,"display","none");this._clearContent(this._featureListContent);this._clearDirections();this._clearGrahics()},removeGraphicsLayer:function(){this._featureGraphicsLayer&&(this.map.removeLayer(this._featureGraphicsLayer),this._featureGraphicsLayer=null)},_clearGrahics:function(){this._featureGraphicsLayer&&this._featureGraphicsLayer.clear()},
_showPanel:function(a,b){d.set(this._panels[a],{display:"block",left:"-100%"});b?(this._slide(this._panels[a],-100,0),this._slide(this._currentPanel,0,100)):(this._slide(this._currentPanel,0,-100),this._slide(this._panels[a],100,0));this._currentPanelName=a;this._currentPanel=this._panels[a];dijit.byId(this.parentDiv.id).resize()},_slide:function(a,b,c){d.set(a,"display","block");d.set(a,"left",b+"%");P.animateProperty({node:a,properties:{left:{start:b,end:c,units:"%"}},duration:300,onEnd:e.hitch(this,
function(){d.set(a,"left",c);0===c?d.set(a,"display","block"):d.set(a,"display","none");this._isSlide=!0})}).play()},_showMessage:function(a){(new C({message:a})).message=a},_initializeDirectionWidget:function(){var a;this._directionsWidget||(dijit.byId("directionDijit")&&dijit.byId("directionDijit").destroy(),a={id:"directionDijit",map:this.map,directionsLengthUnits:O[this.config.directionLengthUnit.routeUnit],showTrafficOption:!1,dragging:!1,routeTaskUrl:this.config.routeService,routeSymbol:new l(this.config.symbols.routeSymbol)},
this.config.travelModeService&&""!==this.config.travelModeService&&(a.travelModesServiceUrl=this.config.travelModeService),this._directionsWidget=new F(a,g.create("div",{},null)),this._directionsWidget.startup(),h(this._directionsWidget,"directions-finish",e.hitch(this,function(){this._directionsWidget.zoomToFullRoute();dijit.byId(this.parentDiv.id).resize();this.loading.hide()})),this._directionInfoPanel.set("content",this._directionsWidget.domNode));this._routeSelectedLocations()},_clearDirections:function(){this._routeCalculated=
!1;this._directionsWidget&&this._directionsWidget.clearDirections()},_routeSelectedLocations:function(){var a=[];this._clearDirections();this._selectedPoint&&this._selectedFeature&&(this.loading.show(),a.push(this._selectedPoint),a.push(this._selectedFeature),this._directionsWidget.updateStops(a).then(e.hitch(this,function(){this._directionsWidget.getDirections();this._routeCalculated=!0}),e.hitch(this,function(){this.loading.hide();this._showMessage(this.nls.failedToGenerateRouteMsg)})))},_highlightFeatureOnMap:function(){var a;
this._clearGrahics();a=this._getHighLightSymbol(this._selectedFeature,this._selectedLayer);this._featureGraphicsLayer.add(a)},_getHighLightSymbol:function(a,b){switch(a.geometry.type){case "point":return this._getPointSymbol(a,b);case "polyline":return this._getPolyLineSymbol(a,b);case "polygon":return this._getPolygonSymbol(a)}},_getPointSymbol:function(a,b){var c,f,d,e,g;f=!1;c=new y(y.STYLE_SQUARE,null,new l(l.STYLE_SOLID,new q([0,255,255,1]),3));c.setColor(null);c.size=30;if(b&&b.renderer)if(b.renderer.symbol)c=
this._updatePointSymbolProperties(c,b.renderer.symbol);else if(b.renderer.infos&&0<b.renderer.infos.length){for(g=0;g<b.renderer.infos.length;g++)b.typeIdField?d=a.attributes[b.typeIdField]:b.renderer.attributeField&&(d=a.attributes[b.renderer.attributeField]),e=b.renderer.infos[g].value,void 0!==d&&(null!==d&&""!==d&&void 0!==e&&null!==e&&""!==e)&&d.toString()===e.toString()&&(f=!0,c=this._updatePointSymbolProperties(c,b.renderer.infos[g].symbol));f||b.renderer.defaultSymbol&&(c=this._updatePointSymbolProperties(c,
b.renderer.defaultSymbol))}f=new H(a.geometry.x,a.geometry.y,new t({wkid:a.geometry.spatialReference.wkid}));return new s(f,c,a.attributes)},_updatePointSymbolProperties:function(a,b){var c,f;b.hasOwnProperty("height")&&b.hasOwnProperty("width")&&(c=b.height,f=b.width,c=(c>f?c:f)+10,a.size=c);if(b.hasOwnProperty("size")&&(!c||c<b.size))a.size=b.size+10;b.hasOwnProperty("xoffset")&&(a.xoffset=b.xoffset);b.hasOwnProperty("yoffset")&&(a.yoffset=b.yoffset);return a},_getPolyLineSymbol:function(a,b){var c,
f,d,e;c=5;if(b&&b.renderer)if(b.renderer.symbol&&b.renderer.symbol.hasOwnProperty("width"))c=b.renderer.symbol.width;else if(b.renderer.infos&&0<b.renderer.infos.length)for(e=0;e<b.renderer.infos.length;e++)b.typeIdField?f=a.attributes[b.typeIdField]:b.renderer.attributeField&&(f=a.attributes[b.renderer.attributeField]),d=b.renderer.infos[e].value,void 0!==f&&(null!==f&&""!==f&&void 0!==d&&null!==d&&""!==d)&&(f.toString()===d.toString()&&b.renderer.infos[e].symbol.hasOwnProperty("width"))&&(c=b.renderer.infos[e].symbol.width);
else b.renderer.defaultSymbol&&b.renderer.defaultSymbol.hasOwnProperty("width")&&(c=b.renderer.defaultSymbol.width);c=new l(l.STYLE_SOLID,new q([0,255,255,1]),c);f=new I(new t({wkid:a.geometry.spatialReference.wkid}));a.geometry.paths&&0<a.geometry.paths.length&&f.addPath(a.geometry.paths[0]);return new s(f,c,a.attributes)},_getPolygonSymbol:function(a){var b,c;b=new x(x.STYLE_SOLID,new l(l.STYLE_SOLID,new q([0,255,255,1]),4),new q([0,0,0,0]));c=new J(new t({wkid:a.geometry.spatialReference.wkid}));
a.geometry.rings&&(c.rings=e.clone(a.geometry.rings));return new s(c,b,a.attributes)}})});