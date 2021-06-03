let markersAll = [];
// Initialize and add the map
window.initMap = () => {
    const $icon = document.querySelector('#config')
    // The location of Uluru
    const kmcero = { lat: 43.73493885616994, lng: 7.420440355137973 };
    // The map, centered at km cero
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 13,
        center: kmcero,
        styles: styles,
        streetViewControl: false,
        fullscreenControl: false,
        mapTypeControlOptions: {
            mapTypeIds: []
        },
        zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER
        }
    });
    // The marker, positioned at km cero
    const marker = new google.maps.Marker({
        //position: kmcero,
        map: map,
    });

    fetchMarkers(map);

    const $filter = document.querySelectorAll('.handleFilter')

    $filter.forEach((filter) => {
        filter.addEventListener('click', (e) => {
            console.log(filter.innerHTML)
            const filterQuery = filter.innerHTML;
            addMarkersFiltered(filterQuery, map)
        })
    })
    
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
    
    const $filterType = document.querySelectorAll('.handleFilterType')
    
    $filterType.forEach((filterType) => {
        filterType.addEventListener('click', (e) => {
            console.log(filterType.innerHTML)
            const filterQuery = filterType.innerHTML;
            addMarkersFilteredType(filterQuery, map)
        })
    })
    
    const addMarkersFilteredType = (filterQuery, map) => {
        markersAll.forEach((marker) => {
            marker.setMap(null)
        })

        const markersFilteredType = markersAll.filter((marker) => marker.customInfoType === filterQuery)
        console.log(markersFilteredType);

        markersFilteredType.forEach((marker) => {
            marker.setMap(map);
        })
    }
    
    const $filterReset = document.querySelector('.handleFilterReset')
    $filterReset.addEventListener('click', () => {
        markersAll.forEach((marker) => {
            marker.setMap(null)
        })
        markersAll.forEach((marker) => {
            marker.setMap(map)
        })
    })


}
const fetchMarkers = async (map) => {
    try {
        const response = await fetch('assets/data/markers3.json');
        const json = await response.json();
        console.log(json);
        json.forEach(marker => addMarker(map, marker))
    } catch (error) {
        console.log(error)
    }
}

const addMarker = (map, marker) => {

    const { id, nombre, descripcion, lat, lng, type, img, continente } = marker

    const icons = {
        'Autodromo': '/assets/img/autodromo.png',
        'Circuito urbano': '/assets/img/street.png',
    }

    const markerItem = new google.maps.Marker({
        position: { lat: lat, lng: lng },
        map: map,
        customInfo: type,
        customInfoType: continente,
        icon: icons[type]
    })
    markerItem.setMap(map);
    markersAll.push(markerItem);

    const contentString = `
    <div class="info_wrapper">
    <div><img src="${img}"></div>
    <h2>${nombre}</h2>
    <h3>${type}</h3>
    <p>${descripcion}</p>
    </div>
`

    const infoWindow = new google.maps.InfoWindow({
        content: contentString
    })

    markerItem.addListener('click', () => {
        if (infoWindow) {
            infoWindow.close();
        }
        infoWindow.open(map, markerItem)
    });
}