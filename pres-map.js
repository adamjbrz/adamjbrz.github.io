// Presentations map: one pin per in-person talk, clustered; year filter
// (highlighted year navy, everything else gray). Online talks have no pin.
(function () {
  var el = document.getElementById("pres-map");
  var bar = document.getElementById("map-filter");
  if (!el || !bar || typeof L === "undefined") return;

  var NAVY = "#2b4a7e";
  var GRAY = "#b6bcc7";

  // n = venue/talk, c = city, y = year
  var talks = [
    // Upcoming
    { n: "APSA 2026", c: "Boston", y: "Upcoming", lat: 42.3601, lng: -71.0589 },
    { n: "AI in Social Science Conference", c: "Chicago", y: "Upcoming", lat: 41.8781, lng: -87.6298 },
    { n: "Political Economy Seminar, LSE", c: "London", y: "Upcoming", lat: 51.5144, lng: -0.1165 },
    // 2026
    { n: "EEA-ESEM Conference", c: "Dublin", y: 2026, lat: 53.3438, lng: -6.2546 },
    { n: "NBER Summer Institute", c: "Cambridge, MA", y: 2026, lat: 42.3770, lng: -71.1167 },
    { n: "Text-as-Data Conference", c: "Bath", y: 2026, lat: 51.3781, lng: -2.3264 },
    { n: "SIOE Conference, INSEAD", c: "Fontainebleau", y: 2026, lat: 48.4241, lng: 2.6928 },
    { n: "ERINN Conference", c: "University of Namur", y: 2026, lat: 50.4661, lng: 4.8613 },
    { n: "C40 Centre Talk", c: "London", y: 2026, lat: 51.5072, lng: -0.1276 },
    { n: "Public Policy Review, LSE", c: "London", y: 2026, lat: 51.5144, lng: -0.1165 },
    { n: "Narratives in Policymaking, LSE (panel)", c: "London", y: 2026, lat: 51.5144, lng: -0.1165 },
    { n: "North American Winter Meeting of the Econometric Society", c: "Philadelphia", y: 2026, lat: 39.9526, lng: -75.1652 },
    // 2025
    { n: "European Winter Meeting of the Econometric Society", c: "Nicosia", y: 2025, lat: 35.1856, lng: 33.3823 },
    { n: "Research Seminar, Humboldt University", c: "Berlin", y: 2025, lat: 52.5178, lng: 13.3939 },
    { n: "SIOE Conference", c: "Sydney", y: 2025, lat: -33.8888, lng: 151.1872 },
    { n: "WEHC", c: "Lund", y: 2025, lat: 55.7058, lng: 13.1932 },
    { n: "Narratives and Culture in Historical Perspective, LSE", c: "London", y: 2025, lat: 51.5144, lng: -0.1165 },
    { n: "IBEO Political Economy Workshop", c: "Alghero", y: 2025, lat: 40.5579, lng: 8.3190 },
    { n: "Public Policy Review, LSE", c: "London", y: 2025, lat: 51.5144, lng: -0.1165 },
    { n: "Public Policy Review, LSE", c: "London", y: 2025, lat: 51.5144, lng: -0.1165 },
    { n: "Deliberation and Cohesion Seminar, LSE", c: "London", y: 2025, lat: 51.5144, lng: -0.1165 },
    { n: "Deliberation and Cohesion Seminar, LSE", c: "London", y: 2025, lat: 51.5144, lng: -0.1165 },
    { n: "PSPE Seminar, LSE", c: "London", y: 2025, lat: 51.5144, lng: -0.1165 },
    { n: "Choice Research Centre Seminar", c: "University of Leicester", y: 2025, lat: 52.6220, lng: -1.1256 },
    { n: "Behavioural Political Economy Workshop, LSE (discussant)", c: "London", y: 2025, lat: 51.5144, lng: -0.1165 },
    { n: "Economics Group Seminar, King's College London", c: "London", y: 2025, lat: 51.5115, lng: -0.1160 },
    // 2024
    { n: "PSPE Symposium, LSE", c: "London", y: 2024, lat: 51.5144, lng: -0.1165 },
    { n: "Classical Liberalism Symposium, LSE", c: "London", y: 2024, lat: 51.5144, lng: -0.1165 },
    { n: "NICEP Political Economy Seminar", c: "University of Nottingham", y: 2024, lat: 52.9384, lng: -1.1950 },
    // 2023
    { n: "HM Treasury OLG Workshop", c: "London", y: 2023, lat: 51.5010, lng: -0.1246 },
    { n: "IES Workshop, UC Berkeley", c: "Berkeley", y: 2023, lat: 37.8719, lng: -122.2585 },
    // 2022
    { n: "Lindau Meeting on Economic Sciences", c: "Lindau", y: 2022, lat: 47.5460, lng: 9.6840 },
    { n: "WEHC Conference", c: "Paris", y: 2022, lat: 48.8566, lng: 2.3522 },
    { n: "EHES Conference", c: "University of Groningen", y: 2022, lat: 53.2194, lng: 6.5629 },
    { n: "Political Science and Political Economy Work in Progress Seminar, LSE", c: "London", y: 2022, lat: 51.5144, lng: -0.1165 },
    { n: "Micro Theory Student Workshop", c: "Oxford", y: 2022, lat: 51.7534, lng: -1.2540 },
    // 2021
    { n: "Macrohistory Workshop", c: "University of Bonn", y: 2021, lat: 50.7336, lng: 7.1022 },
    { n: "Monetary Policy Conference", c: "University of Manchester", y: 2021, lat: 53.4668, lng: -2.2339 },
    { n: "Micro Theory Student Workshop", c: "Oxford", y: 2021, lat: 51.7534, lng: -1.2540 },
    { n: "Socioeconomics Research Seminar", c: "Vienna University of Economics and Business", y: 2021, lat: 48.2132, lng: 16.4082 },
    { n: "Economic History Society Annual Conference", c: "University of Warwick", y: 2021, lat: 52.3793, lng: -1.5615 },
    // 2020
    { n: "Economic & Social History Graduate Seminar", c: "Oxford", y: 2020, lat: 51.7534, lng: -1.2540 },
    { n: "Micro Theory Student Workshop", c: "Oxford", y: 2020, lat: 51.7534, lng: -1.2540 },
    // 2019
    { n: "Research Seminar, Humboldt University", c: "Berlin", y: 2019, lat: 52.5178, lng: 13.3939 },
    { n: "CFP Wellbeing Workshop", c: "University of Utrecht", y: 2019, lat: 52.0857, lng: 5.1719 },
    { n: "European Historical Economics Society Conference", c: "Paris School of Economics", y: 2019, lat: 48.8320, lng: 2.3455 },
    { n: "Financial History Workshop", c: "Goethe University Frankfurt", y: 2019, lat: 50.1264, lng: 8.6653 },
    { n: "Lunchtime Seminar", c: "University of Manchester", y: 2019, lat: 53.4668, lng: -2.2339 },
    // 2016
    { n: "Best Undergraduate Paper Competition, International Atlantic Economic Society", c: "Washington, D.C.", y: 2016, lat: 38.9072, lng: -77.0369 }
  ];

  var activeYear = "All";
  var markers = [];
  var cluster = null;

  function markerColor(t) {
    return (activeYear === "All" || String(t.y) === activeYear) ? NAVY : GRAY;
  }

  function applyFilter() {
    markers.forEach(function (m) {
      m.marker.setStyle({ fillColor: markerColor(m.talk) });
    });
    if (cluster) cluster.refreshClusters();
  }

  var map = L.map("pres-map", { scrollWheelZoom: false });

  L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
    maxZoom: 19
  }).addTo(map);

  cluster = L.markerClusterGroup({
    maxClusterRadius: 34,
    showCoverageOnHover: false,
    iconCreateFunction: function (c) {
      var highlighted = c.getAllChildMarkers().some(function (k) {
        return k.options.fillColor === NAVY;
      });
      return L.divIcon({
        html: "<span>" + c.getChildCount() + "</span>",
        className: "pres-cluster" + (highlighted ? "" : " pres-cluster-muted"),
        iconSize: [30, 30]
      });
    }
  });

  var bounds = [];
  talks.forEach(function (t) {
    var m = L.circleMarker([t.lat, t.lng], {
      radius: 6,
      color: "#ffffff",
      weight: 1.5,
      fillColor: markerColor(t),
      fillOpacity: 0.9
    });
    m.bindPopup("<strong>" + t.n + "</strong><br>" + t.c + " · " + t.y);
    cluster.addLayer(m);
    markers.push({ marker: m, talk: t });
    bounds.push([t.lat, t.lng]);
  });

  map.addLayer(cluster);
  map.fitBounds(bounds, { padding: [24, 24] });

  // Year filter chips: "All" first and default
  var years = ["All", "Upcoming", 2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2016];
  years.forEach(function (y) {
    var b = document.createElement("button");
    b.type = "button";
    b.textContent = y;
    b.className = "map-chip" + (String(y) === activeYear ? " active" : "");
    b.addEventListener("click", function () {
      activeYear = String(y);
      var chips = bar.querySelectorAll(".map-chip");
      for (var i = 0; i < chips.length; i++) chips[i].classList.remove("active");
      b.classList.add("active");
      applyFilter();
    });
    bar.appendChild(b);
  });
})();
