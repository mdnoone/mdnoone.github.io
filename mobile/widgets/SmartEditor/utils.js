// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.

define("dojo/_base/declare dojo/_base/lang dojo/_base/array esri/geometry/Extent jimu/utils esri/dijit/AttributeInspector".split(" "),function(l,k,g,m,n,p){var e={};e.ATI=l([p],{constructor:function(){this._aiConnects=[];this._selection=[];this._toolTips=[]}});e.checkIfFieldAliasAlreadyExists=function(a,c){return 0<=a.split(",").indexOf(c)};e.pointToExtent=function(a,c,b){var d=a.extent.getWidth()/a.width;b*=d;return new m(c.x-b,c.y-b,c.x+b,c.y+b,a.spatialReference)};e.filterOnlyUpdatedAttributes=
function(a,c,b){var d={},f;for(f in a)a.hasOwnProperty(f)&&(f===b.objectIdField||f===b.globalIdField?d[f]=a[f]:null===a[f]&&""===c[f]||a[f]===c[f]||(d[f]=a[f]));return d};e.mergeFieldInfosWithConfiguration=function(a,c){var b=[],d=this.getDefaultEditableFieldInfos(a,!0);c&&c.fieldInfos?(g.forEach(c.fieldInfos,function(a){g.some(d,function(c){if(a.fieldName===c.fieldName)return b.push(this.mergeLastToFirst(c,a)),!0},this)},this),g.forEach(d,function(a){0===g.filter(b,function(c){return c.fieldName===
a.fieldName},this).length&&b.push(a)},this)):b=d;return b};e.getDefaultEditableFieldInfos=function(a,c){var b=[],d=this.getFieldInfosFromWebmap(a);if(void 0===d||null===d)d=this.getFieldInfosLayer(a);g.forEach(d,function(a){a.isEditable=a.editable;a.fieldName=a.name;a.canPresetValue=!1;!0===a.editable&&!0===c?b.push(k.clone(a)):!1===c&&b.push(k.clone(a))});return b};e.getFieldInfosFromWebmap=function(a){var c=null,b=a.getPopupInfo();b&&b.fieldInfos&&(c=[],g.forEach(b.fieldInfos,function(b){g.some(a.layerObject.fields,
function(a){if(a.name===b.fieldName)return a=this.mergeFirstToLast(b,a),a.format&&a.format.dateFormat&&a.format.dateFormat.toLowerCase()&&0<=a.format.dateFormat.toLowerCase().indexOf("time")&&(a.format.time=!0),c.push(a),!0},this)},this));return c};e.getFieldInfosLayer=function(a){var c=[];a&&a.layerObject&&g.forEach(a.layerObject.fields,function(a){var b=n.getDefaultPortalFieldInfo(a),b=this.mergeFirstToLast(b,a);b.format&&b.format.dateFormat&&b.format.dateFormat.toLowerCase()&&0<=b.format.dateFormat.toLowerCase().indexOf("time")&&
(b.format.time=!0);b.visible=!0;c.push(b)},this);return c};e.getConfigInfos=function(a,c,b,d){var f=[];g.forEach(a.getLayerInfoArrayOfWebmap(),function(a){var e=!1;"Feature Layer"===a.layerObject.type&&a.layerObject.url&&(a.layerObject.isEditable&&a.layerObject.isEditable()&&b?e=!0:b&&!1===b&&(e=!0));if(!0===e){var h=this.getConfigInfo(a,c);h.layerInfo=a;!0===h.featureLayer.layerAllowsDelete&&!1===h.featureLayer.layerAllowsCreate&&!1===h.featureLayer.layerAllowsUpdate?console.warn(h.layerInfo.title+
" delete only not supported"):d&&!0===d?!0===g.some(c,function(a){return a.featureLayer.id===h.featureLayer.id})&&f.push(h):f.push(h)}},this);return f};e.getConfigInfo=function(a,c){var b=null,d=this.createDefaultConfigInfo(a);!1===g.some(c,function(c){return c.featureLayer&&c.featureLayer.id===a.layerObject.id?(b=k.clone(c),b.fieldInfos=this.mergeFieldInfosWithConfiguration(a,b),b=this.mergeDefaultWithConfig(b,d),b._editFlag=!0):!1},this)&&(b=d);return b};e.mergeDefaultWithConfig=function(a,c){a.featureLayer=
c.featureLayer;!0===a.allowDelete&&!1===a.featureLayer.layerAllowsDelete&&(a.allowDelete=!1);!1===a.disableGeometryUpdate&&!1===a.featureLayer.layerAllowGeometryUpdates&&(a.disableGeometryUpdate=!0);!1===a.featureLayer.layerAllowsCreate&&!0===a.featureLayer.layerAllowsUpdate&&(a.allowUpdateOnly=!0);return a};e.createDefaultConfigInfo=function(a){var c=!1,b=!1,d=!1,f=!1;try{var e=a.layerObject.getEditCapabilities();e.canCreate&&(c=!0);e.canUpdate&&(f=b=!0);e.canDelete&&(d=!0)}catch(q){a.layerObject.hasOwnProperty("capabilities")&&
(-1===String(a.layerObject.capabilities).indexOf("Update")&&-1===String(a.layerObject.capabilities).indexOf("Delete")&&-1===String(a.layerObject.capabilities).indexOf("Create")&&-1!==String(a.layerObject.capabilities).indexOf("Editing")?c=d=b=!0:(-1!==String(a.layerObject.capabilities).indexOf("Update")&&(f=b=!0),-1!==String(a.layerObject.capabilities).indexOf("Delete")&&(d=!0),-1!==String(a.layerObject.capabilities).indexOf("Create")&&(c=!0)))}a.layerObject.hasOwnProperty("allowGeometryUpdates")&&
(f=a.layerObject.allowGeometryUpdates);return{featureLayer:{id:a.layerObject.id,layerAllowsCreate:c,layerAllowsUpdate:b,layerAllowsDelete:d,layerAllowGeometryUpdates:f},disableGeometryUpdate:!f,allowUpdateOnly:!c,allowDelete:!1,fieldInfos:this.mergeFieldInfosWithConfiguration(a,null),_editFlag:!1}};e.mergeLastToFirst=function(){for(var a={},c=0,b=arguments.length,d;c<b;c++)for(d in arguments[c])arguments[c].hasOwnProperty(d)&&(a[d]=arguments[c][d]);return a};e.mergeFirstToLast=function(){for(var a=
{},c=arguments.length-1,b;0<=c;c--)for(b in arguments[c])arguments[c].hasOwnProperty(b)&&(a[b]=arguments[c][b]);return a};e.isObjectEmpty=function(a){if(a)for(var c in a)if(a.hasOwnProperty(c))return!1;return!0};e.addDateTimeFormat=function(a){a&&a.format&&null!==a.format&&a.format.dateFormat&&null!==a.format.dateFormat&&0<=a.format.dateFormat.toString().toUpperCase().indexOf("TIME")&&(a.format.time=!0)};return e});