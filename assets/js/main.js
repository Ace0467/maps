let markersAll = []
// Initialize and add the map
window.initMap = () => {
  // The location of Uluru
  const maimo = { lat: -34.610490, lng: -58.440860 }; //esto es maimo!
  const uluru = { lat: -25.344, lng: 131.036 };
  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: maimo,
    styles: styles,
    streetViewControl: false,
    fullscreenControl: false,
    mapTypeControlOptions: {
      mapTypeIds: []
    },
    zoomControlOptions: {
      position: google.maps.ControlPosition.LEFT_CENTER
    }
  });
  // The marker, positioned at Uluru
  const marker = new google.maps.Marker({
    //position: maimo,
    map: map,
  });

  fetchMarkers(map);

  const $filter = document.querySelectorAll('.handleFilter')

  $filter.forEach((filter) => {
    filter.addEventListener('click', (e) => {
      const filterQuery = filter.innerHTML
      console.log(filterQuery);
      addMarkersFiltered(filterQuery, map)
    })
  })

  const $filterReset = document.querySelector('.handleFilterReset')
  $filterReset.addEventListener('click', () => {
    markersAll.forEach((marker) => { //Limpiamos el mapa
      marker.setMap(null) //lo quitamos del mapa
    })
    markersAll.forEach((marker) => { //Agregamos los markers filtrados
      marker.setMap(map) //lo agregamos al mapa
    })
  })
}



const addMarkersFiltered = (filterQuery, map) => {

  markersAll.forEach((marker) => {

    marker.setMap(null)

  })
  console.log(filterQuery)
  const markersFiltered = markersAll.filter((marker) => marker.customInfo === filterQuery)
  console.log(marker.customInfo)
  console.log(markersFiltered)

  markersFiltered.forEach((marker) => {

    marker.setMap(map)

  })

}

const fetchMarkers = async (map) => {

  try {
    const response = await fetch('assets/data/markers.json')
    const json = await response.json()
    console.log(json)
    json.forEach(marker => addMarker(map, marker))
  } catch (error) {
    console.log(error)
  }

}

const addMarker = (map, marker) => {

  const { id, nombre, descripcion, lat, lng, type } = marker


  const markerItem = new google.maps.Marker(
    {
      position: { lat: lat, lng: lng },
      map: map,
      customInfo: type
    }
  );
  markerItem.setMap(map)
  markersAll.push(markerItem)

  const contentString = `
      <div class="info-wrapper">
      <h2>${nombre}</h2>
      <h3>${type}</h3>
      <p>${descripcion}</p>
      </div>
      `
  const infoWindow = new google.maps.InfoWindow({
    content: contentString
  })

  markerItem.addListener('click', () => {
    infoWindow.open(map, markerItem)
  })

}