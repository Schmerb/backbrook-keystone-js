// // // // // // // // // //
//
//      Google Maps
//
// // // // // // // // // //

'use strict';

const { uluru, GOOGLE_MAPS_API_KEY } = require('../../../config');

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Init map 
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
exports.initMap = () => {
    let map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: uluru,
        styles: myMapStyles
      });

    // let x = window.innerWidth >= 600 ? 10 : -20;
    let marker = new MarkerWithLabel({
        position: uluru,
        map: map,
        labelContent: "Backbrook Masonry Headquarters",
        labelAnchor: new google.maps.Point(-40, 10),
        labelClass: "google-maps-bbm-marker", // your desired CSS class
        labelInBackground: true,
        icon: {
            color: "red",
            url: 'assets/images/compressed/five-bricks.png'
        }
    });

    var center;
    google.maps.event.addDomListener(map, 'idle', () => {
        center = map.getCenter();
    });
    google.maps.event.addDomListener(window, 'resize', () => {
        // let x = window.innerWidth >= 600 ? 120 : 40;
        map.setCenter(center);
        // marker.setOptions({
        //     labelAnchor: new google.maps.Point(x, -20),
        // });
    });

    var infowindow = new google.maps.InfoWindow();
    google.maps.event.addDomListener(marker, 'click', function () {
        infowindow.setContent(`<div>
                                    <ul>
                                        <li>311 6th Avenue</li>
                                        <br>
                                        <li>Alpha, NJ 08865</li>
                                    </ul>
                                </div>`);
        infowindow.open(map, this);
    });
}

let myMapStyles = [
    {
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ebe3cd"
            }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#523735"
            }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#f5f1e6"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#c9b2a6"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#dcd2be"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#ae9e90"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dfd2ae"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dfd2ae"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#93817c"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#a5b076"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#447530"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f5f1e6"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#fdfcf8"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f8c967"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#e9bc62"
            }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#e98d58"
            }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#db8555"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#806b63"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dfd2ae"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#8f7d77"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#ebe3cd"
            }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dfd2ae"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#b9d3c2"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#92998d"
            }
        ]
    }
];