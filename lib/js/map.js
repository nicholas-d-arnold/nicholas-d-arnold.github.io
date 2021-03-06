/**
 * @author Nicholas Arnold
 */

window.onload = init;

///////////////////////////////////////
//			Global Variables		 //
///////////////////////////////////////

L_PREFER_CANVAS = true;
var map = null;
var data = null;
var result = null;
var max_zoom = 14;
var min_zoom = 2;
var selected_bounds = null;
var initial_center = [39.046690, -99.686395];
var initial_zoom = 3;
var marker;
var selected_id = 0;
var id = null;

///////////////////////////////////////
//			Geometry Styling		 //
///////////////////////////////////////

var parks_style = {
	"color" : "#6559A6",
	"weight" : 1,
	"opacity" : 0.65
}
var wilderness_style = {
	"color" : "#6FAA54",
	"weight" : 1,
	"opacity" : 0.65
}
var refuges_style = {
	"color" : "#897430",
	"weight" : 0.65
}
var petrol_style = {
	"color" : "#6D484A",
	"weight" : 0.65
}
var forests_style = {
	"color" : "#B05048",
	"weight" : 0.65
}
var iditarod_style = {
	"color" : "#5E8E73",
	"weight" : 1.25
}
var highlight_style = {
	"color" : "#FF6600",
	"weight" : 3
}
var default_style = {
	"color" : "#333333",
	"weight" : 1
}

///////////////////////////////////////
//			Loading Basemaps		 //
///////////////////////////////////////

/** Load Nat Geo Map - returns Leaflet Tile Layer **/
function loadNatGeoLayer() {
	var esriNatGeoURL = 'https://services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}';
	var natGeoLayer = new L.TileLayer(esriNatGeoURL, {
		attribution : 'Map data &copy; <a href="http://www.esri.com" target="_blank">ESRI</a>',
		maxZoom : max_zoom,
		minZoom : min_zoom
	});
	return natGeoLayer;
}

/** Load World Imagery Map - returns Leaflet Tile layer **/
function loadImageryLayer() {
	var esriImageryURL = 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
	var oceanFloorLayer = new L.TileLayer(esriImageryURL, {
		attribution : 'Map data &copy; <a href="http://www.esri.com" target="_blank">ESRI</a>',
		maxZoom : max_zoom,
		minZoom : min_zoom
	});
	return oceanFloorLayer;
}

/** Load World Topo Map - returns Leaflet Tile layer **/
function loadTopoLayer() {
	var esriTopoURL = 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}';
	var worldTopoLayer = new L.TileLayer(esriTopoURL, {
		attribution : 'Map data &copy; <a href="http://www.esri.com" target="_blank">ESRI</a>',
		maxZoom : max_zoom,
		minZoom : min_zoom
	});
	return worldTopoLayer;
}

function init() {

	map = new L.Map("Map", {
		center : initial_center,
		zoom : initial_zoom,
		maxZoom : 18, 
		scrollWheelZoom : false
	});

	selected_bounds = null;
	//	$("#ZoomToSelected").attr("disabled", "disabled");
	//	$("#FilterByThis").attr("disabled", "disabled");

	var greenIcon = L.icon({
	    iconUrl: './lib/img/marker-icon.png',
	     shadowUrl: './lib/img/marker-shadow.png'
	});



	var markersLived = [
		['CC0033',43.212956, -123.337581, 'Roseburg, OR','2014 - 2016'],
		['CC0033',45.426168, -117.273043, 'Enterprise, OR','2013 - 2014'],
		['CC0033',40.193377, -85.386360, 'Muncie, IN', '1998 - 2007'],
		['CC0033',39.658142, -78.928357, 'Frostburg, MD','2007 - 2012'],
		['CC0033',39.165325, -86.526386, 'Bloomington, IN','1989 - 1992'],
		['CC0033',33.450400, -88.818387, 'Starkville, MS','1992 - 1998'],		
		['CC0033',45.523062, -122.676481, 'Portland, OR','2012, 2013, 2017 - present'],
		['CC0033',44.851231, -123.186766, 'Independence, OR','2012 - 2013'],
		['CC0033',46.732388, -117.000165, 'Moscow, ID', '1986 - 1989'],
		['CC0033',45.365676, -122.612314, 'West Linn, OR','2016 - 2017']

	];

	var markerClusters = L.markerClusterGroup(); 

	for (var i = 0; i < markersLived.length; i++) {
		marker = new L.marker([markersLived[i][1],markersLived[i][2]])
			.bindPopup('<center><strong>' + markersLived[i][3] + '</strong><br>' + markersLived[i][4] + '</center>')
			//.addTo(map);
		markerClusters.addLayer(marker);
	}
	map.addLayer(markerClusters);

	var imageryLayer = loadImageryLayer();
	var natGeoLayer = loadNatGeoLayer();
	var worldTopoLayer = loadTopoLayer();
	worldTopoLayer.addTo(map);
	// add layer control for base layers
	var baseMaps = {
		"Satellite Imagery" : imageryLayer,
		"Nat Geo" : natGeoLayer,
		"Topography" : worldTopoLayer
	};

	///////////////////////////////////////
	//			Overlays				 //
	///////////////////////////////////////

	L.control.layers(baseMaps).addTo(map);
}