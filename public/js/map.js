mapboxgl.accessToken =  mapToken;
    
const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 9 // starting zoom
});
console.log(coordinates);
const marker = new mapboxgl.Marker()
 .setLngLat(coordinates)
 .setPopup(new mapboxgl.Popup({offset: 25})
 .setHTML("<h5>We're here</h5>"))
 .addTo(map);


 