// Threat Map Module
let threatMap = null;
let markers = [];

function initThreatMap() {
    threatMap = L.map('threatMap').setView([20, 0], 2);
    
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(threatMap);
    
    // Simulated attack locations
    const attackLocations = [
        { lat: 40.7128, lng: -74.0060, city: 'New York', intensity: 'Critical' },
        { lat: 51.5074, lng: -0.1278, city: 'London', intensity: 'High' },
        { lat: 35.6762, lng: 139.6503, city: 'Tokyo', intensity: 'Medium' },
        { lat: -33.8688, lng: 151.2093, city: 'Sydney', intensity: 'High' },
        { lat: 55.7558, lng: 37.6173, city: 'Moscow', intensity: 'Critical' },
        { lat: 31.2304, lng: 121.4737, city: 'Shanghai', intensity: 'Medium' }
    ];
    
    attackLocations.forEach(loc => {
        const marker = L.circleMarker([loc.lat, loc.lng], {
            radius: 12,
            fillColor: loc.intensity === 'Critical' ? '#ef4444' : '#f97316',
            color: '#fff',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.7
        }).addTo(threatMap);
        
        marker.bindPopup(`<b>${loc.city}</b><br>Threat Level: ${loc.intensity}<br>Active Attack Detected`);
        markers.push(marker);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('threatMap')) {
        initThreatMap();
    }
});