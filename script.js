const seasonSelect = document.getElementById('season-select');
const driverSelect = document.getElementById('driver-select');
const driverCard = document.getElementById('driver-card');

// Utility to fetch JSON
const fetchData = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

// Populate season dropdown (e.g., from 2010 to current)
const populateSeasons = () => {
  const currentYear = new Date().getFullYear();
  for (let year = currentYear; year >= 2010; year--) {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    seasonSelect.appendChild(option);
  }
  seasonSelect.value = currentYear; // default to current
};

// Populate driver dropdown based on selected season
const populateDrivers = async (season) => {
  driverSelect.innerHTML = `<option value="">Select a driver</option>`;

  const url = `https://ergast.com/api/f1/${season}/drivers.json`;
  const data = await fetchData(url);
  const drivers = data.MRData.DriverTable.Drivers;

  drivers.forEach(driver => {
    const option = document.createElement('option');
    option.value = driver.driverId;
    option.textContent = `${driver.givenName} ${driver.familyName}`;
    driverSelect.appendChild(option);
  });
};

