
//------configuramos los parametros para la geolocalizacion----
let options={
    enableHighAccuracy: true,
    timeout: 5000,
    maximunAge: 5
}
//--------------------Geolocalizacion----------------
if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(
        success, 
        error, 
        options
    )
}else{
    alert("Los servicios de geolocalizacion no estan disponibles");
}

function success(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    let map = L.map('map',{
        center:[latitude, longitude],
        zoom: 14
    })
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'Mi openStreerMap'}).addTo(map);
    
    //--------Definimos los iconos------
    let inicio = L.icon({
        iconUrl:'../assets/images/leaf-green.png',
        shadowUrl:'../assets/images/leaf-shadow.png',
        iconSize:[38, 95],
        shadowSize:[50, 64],
        iconAnchor:[22, 94],
        shadowAnchor:[4, 62],
        popupAnchor:[-3, -76]
    })

    let final = L.icon({
        iconUrl:'../assets/images/leaf-red.png',
        shadowUrl:'../assets/images/leaf-shadow.png',
        iconSize:[38, 95],
        shadowSize:[50, 64],
        iconAnchor:[22, 94],
        shadowAnchor:[4, 62],
        popupAnchor:[-3, -76]
    })

    let track = L.icon({
        iconUrl:'../assets/images/leaf-orange.png',
        shadowUrl:'../assets/images/leaf-shadow.png',
        iconSize:[38, 95],
        shadowSize:[50, 64],
        iconAnchor:[22, 94],
        shadowAnchor:[4, 62],
        popupAnchor:[-3, -76]
    })
    //-------Calculamos la ruta-----
    let control = L.Routing.control({
        waypoints:[
            L.latLng(latitude, longitude),
            L.latLng(47.404289, 9.734783)
        ],
        language: 'es',
        createMarker:function(i, wp, nWps){
            switch(i){
                case 0:
                    return L.marker(wp.latLng,{icon: inicio, draggable:true}).bindPopup("Inicio");
                case nWps-1:
                    return L.marker(wp.latLng,{icon: final, draggable:true}).bindPopup("Final");
                default:
                    return L.marker(wp.latLng,{icon: track, draggable:true}).bindPopup("Paso intermedio");
            }
        }
    }).addTo(map);
}

function error(){
    let map = L.map('map',{
        center:[47.404289, 9.734783],
        zoom: 14
    })
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'Mi openStreerMap'}).addTo(map)
}