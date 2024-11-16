
import { vizor_plane_earth } from 'vizor_geo_three';
import { vi_Collection } from 'vizor_collections';
import { GeoLayer } from 'vizor_geo_layer';
import { vi_Window } from 'vizor_gui_tools';

const position =  { top: '150px', left: '0px', bottom: 'auto', right: 'auto' };

const w = new vi_Window('myNewWindow', 'Hello, this is just a window', 300, 300, 'PROYECTOS ',{
        backgroundColor: '#ffffff',
        closeButton: true,
        showCloseButton: true,
        position: { ...position },
    });



window.vizor_project_data_sources = [
    {"id":"28e092b4-7ac7-493b-86c3-df3d4807d788","name":"dallas"}
];

const Center = {latitude: 25.6783587, longitude: -100.368862}
window.CUBE_GLOBAL={};
window.CUBE_GLOBAL.CENTER = Center;
window.CUBE_GLOBAL.MAP_SCALE = 1000;
       
window.vizor_domain = 'https://server.vizor.studio';

const coleccion = new vi_Collection({datasource:"dallas"});

coleccion.on('dallas:loaded', (result) => {

	console.log('Event received:', result);	
   
    const layer = new GeoLayer("buildings", result.result.data);
	layer.depthFactor = 12;
	const mesh_buildings = layer.getBuildings({merge: true, collider: false});	
	map.addLayer(mesh_buildings);

});


//var map = new vizor_plane_earth(document.getElementById("myDiv"));
var map = new vizor_plane_earth(w);
map.setCenter(25.670174,  -100.37292);

coleccion.load();