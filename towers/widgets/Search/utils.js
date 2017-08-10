// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.

define("dojo/_base/lang dojo/_base/array dojo/Deferred dojo/when dojo/promise/all jimu/portalUtils esri/lang esri/request".split(" "),function(e,f,l,m,g,n,h,p){return{map:null,layerInfosObj:null,appConfig:null,_esriLocatorRegExp:/geocode(.){0,3}\.arcgis.com\/arcgis\/rest\/services\/World\/GeocodeServer/g,setMap:function(a){this.map=a},setLayerInfosObj:function(a){this.layerInfosObj=a},setAppConfig:function(a){this.appConfig=a},getConfigInfo:function(a){if(a&&a.sources&&0<a.sources.length){var b=null;
return this.searchLayer(this.map)&&a.upgradeFromGeocoder?(b=this.map.itemInfo.itemData.applicationProperties.viewing.search,b=f.map(b.layers,e.hitch(this,function(a,b){b.hintText=a;return this._getQueryTypeGeocoder(b)},b.hintText)),g(b).then(e.hitch(this,function(d){a.sources=[].concat(d).concat(a.sources);return a}))):a}return m(this._getSoucesFromPortalAndWebmap()).then(e.hitch(this,function(a){return{allPlaceholder:"",showInfoWindowOnSelect:!0,sources:a}}))},_getSoucesFromPortalAndWebmap:function(){var a=
[],b=null;this.searchLayer(this.map)&&(b=this.map.itemInfo.itemData.applicationProperties.viewing.search,f.forEach(b.layers,e.hitch(this,function(b,c){c.hintText=b;a.push(this._getQueryTypeGeocoder(c))},b.hintText)));return n.getPortalSelfInfo(this.appConfig.portalUrl).then(e.hitch(this,function(b){if((b=b.helperServices&&b.helperServices.geocode)&&0<b.length)for(var c=0,q=b.length;c<q;c++){var k=b[c];k&&a.push(this._processSingleLine(k))}return g(a).then(e.hitch(this,function(a){for(var b=[],d=0;d<
a.length;d++){var c=a[d];c&&(c&&"query"===c.type||(c={name:c.name||this._getGeocodeName(c.url),url:c.url,singleLineFieldName:c.singleLineFieldName,placeholder:c.placeholder||c.name||this._getGeocodeName(c.url),maxResults:6,searchInCurrentMapExtent:!1,type:"locator"}),b.push(c))}return b}))}))},_getQueryTypeGeocoder:function(a){var b=this.map.getLayer(a.id),d=null,c=null,e=null,e=h.isDefined(a.subLayer)?a.id+"_"+a.subLayer:a.id,d=this.layerInfosObj.traversal(function(a){return a.id===e?(c=a,!0):!1});
return b&&d&&c?(d=h.isDefined(a.subLayer)?c.url||b.url+"/"+a.subLayer:c.url||b.url,{name:c.title,layerId:e,url:d,placeholder:a.hintText,searchFields:[a.field.name],displayField:a.field.name,exactMatch:a.field.exactMatch||!1,maxResults:6,searchInCurrentMapExtent:!1,type:"query"}):null},_isEsriLocator:function(a){this._esriLocatorRegExp.lastIndex=0;return this._esriLocatorRegExp.test(a)},_processSingleLine:function(a){if(a.singleLineFieldName)return a;if(this._isEsriLocator(a.url))return a.singleLineFieldName=
"SingleLine",a;var b=new l;p({url:a.url,content:{f:"json"},handleAs:"json",callbackParamName:"callback"}).then(e.hitch(this,function(d){d.singleLineAddressField&&d.singleLineAddressField.name?(a.singleLineFieldName=d.singleLineAddressField.name,b.resolve(a)):(console.warn(a.url+"has no singleLineFieldName"),b.resolve(null))}),e.hitch(this,function(a){console.error(a);b.resolve(null)}));return b.promise},_getGeocodeName:function(a){if("string"!==typeof a)return"geocoder";a=a.split("/");return a[a.length-
2]||"geocoder"},getGeocoderName:function(a){return this._getGeocodeName(a)},hasAppSearchInfo:function(a){return a.itemInfo&&a.itemInfo.itemData&&a.itemInfo.itemData.applicationProperties&&a.itemInfo.itemData.applicationProperties.viewing&&a.itemInfo.itemData.applicationProperties.viewing.search},searchLayer:function(a){if(!this.hasAppSearchInfo(a))return!1;a=a.itemInfo.itemData.applicationProperties.viewing.search;return!a.enabled||0===a.layers.length?!1:!0}}});