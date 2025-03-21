// script.js
let map, infoWindow;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 6,
    });
    infoWindow = new google.maps.InfoWindow();

    // Get user's current location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent("You are here.");
            infoWindow.open(map);
            map.setCenter(pos);
            displayDeviceInfo(pos);
        }, () => {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ? "Error: The Geolocation service failed." : "Error: Your browser doesn't support geolocation.");
    infoWindow.open(map);
}

function displayDeviceInfo(pos) {
    // Display device information
    const deviceInfo = `Device: ${navigator.userAgent}`;
    document.getElementById("device-info").innerText = deviceInfo;

    // Display battery information
    navigator.getBattery().then((battery) => {
        const batteryInfo = `Battery Level: ${Math.round(battery.level * 100)}%`;
        document.getElementById("battery-info").innerText = batteryInfo;
    });

    // Fetch IP address and location
    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            const ipInfo = `IP Address: ${data.ip}`;
            const locationInfo = `Location: ${data.city}, ${data.region}, ${data.country}`;
            document.getElementById("ip-info").innerText = ipInfo;
            document.getElementById("location-info").innerText = locationInfo;
        })
        .catch(error => console.error('Error fetching IP data:', error));
}