function initializePage(){ 
        navigator.geolocation.getCurrentPosition(initMap)
        initMap()
}

function initMap(pos){
        if (pos!= undefined) {
                u_coords = pos.coords;
                var coords ={lat: u_coords.latitude, lng: u_coords.longitude} 
                var map = new google.maps.Map(document.getElementById('map'), {
                        zoom: 16,
                        center: coords 
                });
                addMarkers(map, coords)
        }
}

function addMarkers(map, coords) {
        var r = new XMLHttpRequest()
        sendstring = "login=CCqBXEWf" + "&lat=" + coords.lat + "&lng=" + coords.lng
        r.open("POST","https://defense-in-derpth.herokuapp.com/sendLocation" ,true)
        r.setRequestHeader("Content-type", "application/x-www-form-urlencoded")

        r.onreadystatechange = function() {
                if (r.readyState == 4 && r.status == 200) {
                        parsed = JSON.parse(r.responseText)
                        console.log(parsed)
                        for (landmark in parsed.landmarks) {
                                var marker = new google.maps.Marker({
                                        position: {lat: parsed.landmarks[landmark].geometry.coordinates[0] , lng: parsed.landmarks[landmark].geometry.coordinates[1] },
                                        map: map,
                                });
                                //console.log(marker)
                        }
                        for (person in parsed.people) {
                                var marker = new google.maps.Marker({
                                        position: {lat: parsed.people[person].lat , lng: parsed.people[person].lng },
                                        map: map,
                                });
                                //console.log(marker)
                        }
                } 
        }; 
        r.send(sendstring)
}
