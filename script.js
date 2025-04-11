const seasonSelect = document.getElementById('season-select');
const driverSelect = document.getElementById('driver-select');
const driverCard = document.getElementById('driver-card');

// Utility to fetch JSON
const fetchData = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};