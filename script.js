// ====== DAY NAV — runs FIRST so it works even if map fails ======
document.querySelectorAll('#daynav button').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = document.getElementById(btn.dataset.target);
    if (target) {
      const top = target.getBoundingClientRect().top + window.pageYOffset - 12;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ====== TRIP DATA — every stop from the final plan ======
const TRIP = [
  // Day 1
  { day: 1, time: '13:15', name: 'Ljubljana Airport (LJU)', lat: 46.2286, lng: 14.4542, notes: 'Land 13:15. Pick up rental car, on the road by ~14:00.', mapsUrl: 'https://maps.google.com/?cid=2649348081297224101' },
  { day: 1, time: '14:50', name: 'Predjama Castle', lat: 45.8158, lng: 14.1269, notes: 'Castle in a cliff cave. ~1h with audio tour. Open till ~19:00 in June.', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJXSrK02gle0cRgayVIdFnl9g' },
  { day: 1, time: '17:00', name: 'Piran (overnight)', lat: 45.5274, lng: 13.5716, notes: 'Park at Garage Fornače. Drop bags and settle in.', mapsUrl: 'https://maps.google.com/?cid=11351832186093721264' },
  { day: 1, time: '18:30', name: 'Piran walls + old town', lat: 45.5274, lng: 13.5716, notes: '€3 walls at golden hour. Tartini Square, bell tower. Dinner at Fritolin pri Cantini.', mapsUrl: 'https://maps.google.com/?cid=11351832186093721264' },

  // Day 2
  { day: 2, time: '10:00', name: 'Škocjan Caves', lat: 45.6631, lng: 13.9892, notes: 'Booked 10:00 tour. ~2hrs, 12°C inside — bring a layer. No photos.', mapsUrl: 'https://maps.google.com/?cid=15611690651589705717' },
  { day: 2, time: '13:00', name: 'Muggia (lunch)', lat: 45.6025, lng: 13.7664, notes: 'Italian fishing village. Bring ID for border.', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJYxZpz5Rpe0cRiS2QcwLAmlY' },
  { day: 2, time: '14:30', name: 'Trieste — Piazza Unità', lat: 45.6501, lng: 13.7678, notes: 'Park at Saba Trieste Centrale. Walk Unity Square + Canal Grande.', mapsUrl: 'https://maps.google.com/?cid=493976732731572632' },
  { day: 2, time: '16:30', name: 'Miramare Castle', lat: 45.7025, lng: 13.7124, notes: 'Closes 18:30. €12 castle / gardens free. Last entry ~17:30.', mapsUrl: 'https://maps.google.com/?cid=6181852107812349808' },
  { day: 2, time: '18:45', name: 'Mesečev Zaliv (Moon Bay)', lat: 45.5375, lng: 13.6099, notes: 'Park at Strunjan church, 15min walk. Sunset at flysch cliffs.', mapsUrl: 'https://maps.google.com/?cid=17951649208889620390' },

  // Day 3
  { day: 3, time: '11:30', name: 'Tolminska korita', lat: 46.198, lng: 13.7402, notes: '€8. Park at P2 (free). Loop trail ~1hr.', mapsUrl: 'https://maps.google.com/?cid=1101534845471217171' },
  { day: 3, time: '13:30', name: 'Kobarid (lunch)', lat: 46.2477, lng: 13.5792, notes: 'Hiša Polonka (~€15) or Picerija Fedrig.', mapsUrl: 'https://maps.google.com/?cid=9708222543796046396' },
  { day: 3, time: '15:00', name: 'Slap Kozjak', lat: 46.2611, lng: 13.5914, notes: 'Park at Kobarid Fall lot. ~30min walk + €5 final stretch.', mapsUrl: 'https://maps.google.com/?cid=352688567483247001' },
  { day: 3, time: '17:30', name: 'Bovec (overnight)', lat: 46.3376, lng: 13.5517, notes: 'Dinner at Gostilna pod Lipco — local trout.', mapsUrl: 'https://maps.google.com/?cid=6716089797728621565' },

  // Day 4
  { day: 4, time: '09:30', name: 'Boka Waterfall', lat: 46.3214, lng: 13.482, notes: 'Tallest in Slovenia (106m). 15min steep climb.', mapsUrl: 'https://maps.google.com/?cid=16903501430656924984' },
  { day: 4, time: '11:30', name: 'Great Soča Gorge', lat: 46.3372, lng: 13.6459, notes: 'Velika Korita. Walk upstream — turquoise water, suspension bridges.', mapsUrl: 'https://maps.google.com/?cid=5425290612965934083' },
  { day: 4, time: '15:00', name: 'Soča River viewpoint', lat: 46.3, lng: 13.59, notes: 'Pullouts along road 203 between Bovec and Kobarid.', mapsUrl: 'https://www.google.com/maps/search/Soča+river+viewpoint+Bovec' },
  { day: 4, time: '17:30', name: 'Bovec (overnight)', lat: 46.3376, lng: 13.5517, notes: 'Optional: Virje waterfall or Mlinarica Gorge.', mapsUrl: 'https://maps.google.com/?cid=6716089797728621565' },

  // Day 5
  { day: 5, time: '10:00', name: 'Russian Chapel (Vršič)', lat: 46.4426, lng: 13.7677, notes: 'Free lot below chapel. Continue to summit (1611m).', mapsUrl: 'https://maps.google.com/?cid=11462141719188643707' },
  { day: 5, time: '12:00', name: 'Lake Jasna (lunch)', lat: 46.4740, lng: 13.7841, notes: 'Cute alpine lake. Lunch at Milka or Skipass.', mapsUrl: 'https://maps.google.com/?cid=10331928340943538000' },
  { day: 5, time: '14:30', name: 'Slap Peričnik', lat: 46.4392, lng: 13.8938, notes: 'Park at Mojstrana ski lot. 10min walk. Walk behind the falls.', mapsUrl: 'https://maps.google.com/?cid=3514961209664406345' },
  { day: 5, time: '16:30', name: 'Bled (overnight)', lat: 46.3636, lng: 14.0938, notes: 'Park at Hotel Park. Dinner at Gostilna Pri Planincu.', mapsUrl: 'https://maps.google.com/?cid=9497391439378712492' },

  // Day 6
  { day: 6, time: '09:00', name: 'Vintgar Gorge', lat: 46.3936, lng: 14.0857, notes: 'Pre-booked. Park free at Parking 2. ~2hrs total.', mapsUrl: 'https://maps.google.com/?cid=2503374199684783594' },
  { day: 6, time: '12:00', name: 'Lake Bled + Pletna', lat: 46.3636, lng: 14.0938, notes: '6km flat walk + boat to island. Try kremšnita.', mapsUrl: 'https://maps.google.com/?cid=9497391439378712492' },
  { day: 6, time: '17:00', name: 'Bled Castle + Café Belvedere', lat: 46.3699, lng: 14.1006, notes: '€19. Sunset over the lake.', mapsUrl: 'https://maps.google.com/?cid=990976632077902768' },

  // Day 7
  { day: 7, time: '08:30', name: 'Slap Savica', lat: 46.2927, lng: 13.7968, notes: '558 steps up. €3.50. Go early.', mapsUrl: 'https://maps.google.com/?cid=17742265464247319998' },
  { day: 7, time: '11:00', name: 'Mostnica Gorge', lat: 46.2961, lng: 13.8876, notes: 'From Stara Fužina. Heart-shaped section in first 45min.', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJRbUd0bmMekcRyXphl0sD0-Y' },
  { day: 7, time: '13:30', name: 'Gostilnica Štrudl (lunch)', lat: 46.2727, lng: 13.953, notes: 'Bohinjska Bistrica. Local žganci, bean stew. ~€10–15.', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJqw5ytKnyekcRMPxaC5AudRw' },
  { day: 7, time: '16:00', name: 'Ljubljana old town', lat: 46.0476, lng: 14.5063, notes: 'Park at Kongresni trg. Triple Bridge, river, castle funicular.', mapsUrl: 'https://maps.google.com/?cid=12831646701775312394' },

  // Day 8
  { day: 8, time: '08:45', name: 'Ljubljana Airport — return car', lat: 46.2286, lng: 14.4542, notes: '25min from city. Allow 15min for return.', mapsUrl: 'https://maps.google.com/?cid=2649348081297224101' }
];

const DAY_COLORS = {
  1: '#c8693c', 2: '#b8893a', 3: '#4a6b4a', 4: '#3a8e7e',
  5: '#2d5e7a', 6: '#5e3a6e', 7: '#8e3a3a', 8: '#5a544a'
};

// ====== INITIALIZE LEAFLET MAP ======
function initMap() {
  if (typeof L === 'undefined') {
    throw new Error('Leaflet failed to load from CDN');
  }

  const map = L.map('map', {
    zoomControl: true,
    scrollWheelZoom: false
  }).setView([46.05, 14.0], 8);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap, © CARTO',
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(map);

  const dayLayers = {};

  for (let day = 1; day <= 8; day++) {
    dayLayers[day] = L.layerGroup();
    const stops = TRIP.filter(s => s.day === day);
    const coords = stops.map(s => [s.lat, s.lng]);

    if (coords.length > 1) {
      L.polyline(coords, {
        color: DAY_COLORS[day],
        weight: 3,
        opacity: 0.55,
        dashArray: '6 8',
        lineCap: 'round'
      }).addTo(dayLayers[day]);
    }

    stops.forEach(stop => {
      const icon = L.divIcon({
        className: 'leaflet-day-marker-wrapper',
        html: `<div class="day-marker" data-day="${day}">${day}</div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });
      const marker = L.marker([stop.lat, stop.lng], { icon });
      marker.bindPopup(`
        <div class="popup-eyebrow" style="color:${DAY_COLORS[day]}">Day ${day}</div>
        <div class="popup-name">${stop.name}</div>
        <div class="popup-time">${stop.time}</div>
        <div class="popup-notes">${stop.notes}</div>
        <a class="popup-link" href="${stop.mapsUrl}" target="_blank" rel="noopener">Open in Maps ↗</a>
      `, { maxWidth: 260, closeButton: true });
      marker.addTo(dayLayers[day]);
    });

    dayLayers[day].addTo(map);
  }

  const allBounds = L.latLngBounds(TRIP.map(s => [s.lat, s.lng]));
  map.fitBounds(allBounds, { padding: [30, 30] });

  // Fix tile rendering when container size changes after init
  // (fonts loading, layout reflow on mobile, etc.)
  setTimeout(() => map.invalidateSize(), 100);
  window.addEventListener('load', () => map.invalidateSize());

  // ====== FILTER BUTTONS ======
  const filterButtons = document.querySelectorAll('.map-filter');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const day = btn.dataset.day;
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (day === 'all') {
        for (let d = 1; d <= 8; d++) {
          if (!map.hasLayer(dayLayers[d])) dayLayers[d].addTo(map);
        }
        map.fitBounds(allBounds, { padding: [30, 30] });
      } else {
        const targetDay = parseInt(day, 10);
        for (let d = 1; d <= 8; d++) {
          if (d === targetDay) {
            if (!map.hasLayer(dayLayers[d])) dayLayers[d].addTo(map);
          } else if (map.hasLayer(dayLayers[d])) {
            map.removeLayer(dayLayers[d]);
          }
        }
        const dayStops = TRIP.filter(s => s.day === targetDay);
        if (dayStops.length > 0) {
          const dayBounds = L.latLngBounds(dayStops.map(s => [s.lat, s.lng]));
          map.fitBounds(dayBounds, { padding: [50, 50], maxZoom: 11 });
        }
      }
    });
  });
}

try {
  initMap();
} catch (err) {
  console.warn('Map could not load:', err);
  const mapEl = document.getElementById('map');
  if (mapEl) {
    mapEl.innerHTML = '<div style="padding:40px 24px;text-align:center;font-family:Lora,serif;color:#5a544a;font-style:italic;">Map needs internet to load tiles. The day-by-day plan below works offline — tap any place name to open in Maps.</div>';
  }
  const filters = document.querySelector('.map-filters');
  if (filters) filters.style.display = 'none';
}
