let markersAll = [];
// Initialize and add the map
const initMap = () => {
    console.log("anda")

    fetchMarkers();
}

const addMarkersFiltered = (filterQuery, map) => {
    markersAll.forEach((marker) => {
        marker.setMap(null)
    })

    const markersFiltered = markersAll.filter((marker) => marker.customInfo === filterQuery)
    console.log(markersFiltered);

    markersFiltered.forEach((marker) => {
        marker.setMap(map);
    })
}



const fetchMarkers = async (map) => {
    try {
        const response = await fetch('assets/data/markers3.json');
        const json = await response.json();
        console.log(json);
        json.forEach(marker => addMarker (marker))
    } catch (error) {
        console.log(error)
    }
}

const addMarker = (map, marker) => {

    const { id, nombre, descripcion, lat, lng, type, img } = marker

    const contentString = `
<div class="info_wrapper">
    <div><img src="${img}"></div>
    <h2>${nombre}</h2>
    <h3>${type}</h3>
    <p>${descripcion}</p>
</div>
`

    const $infoWindow = document.querySelector('#cont-all')
    $infoWindow.innerHTML += contentString

    markerItem.addListener('click', () => {
        if(infoWindow){
            infoWindow.close();
        }
        infoWindow.open(map, markerItem)
    });
}

initMap();