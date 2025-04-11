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

// Fetch and display driver stats
const showDriverCard = async (season, driverId) => {
    const url = `https://ergast.com/api/f1/${season}/driverStandings.json`;
    const data = await fetchData(url);
    const standings = data.MRData.StandingsTable.StandingsLists[0]?.DriverStandings;
  
    if (!standings) {
      driverCard.innerHTML = `<p>No data found for this season.</p>`;
      driverCard.classList.remove('hidden');
      return;
    }
  
    const driverData = standings.find(d => d.Driver.driverId === driverId);
  
    if (!driverData) {
      driverCard.innerHTML = `<p>No stats available for this driver in ${season}.</p>`;
      driverCard.classList.remove('hidden');
      return;
    }
  
    const { Driver, Constructors, points, wins, position } = driverData;
  
    driverCard.innerHTML = `
      <h2>${Driver.givenName} ${Driver.familyName} (${Driver.code || driverId.toUpperCase()})</h2>
      <p><span class="label">Nationality:</span> ${Driver.nationality}</p>
      <p><span class="label">Date of Birth:</span> ${Driver.dateOfBirth}</p>
      <p><span class="label">Team:</span> ${Constructors[0]?.name}</p>
      <p><span class="label">Points:</span> ${points}</p>
      <p><span class="label">Wins:</span> ${wins}</p>
      <p><span class="label">Standing:</span> ${position}</p>
    `;
  
    driverCard.classList.remove('hidden');
  };

  // Event listeners
seasonSelect.addEventListener('change', () => {
    const season = seasonSelect.value;
    populateDrivers(season);
    driverCard.classList.add('hidden');
  });
  
  driverSelect.addEventListener('change', () => {
    const season = seasonSelect.value;
    const driverId = driverSelect.value;
    if (driverId) {
      showDriverCard(season, driverId);
    } else {
      driverCard.classList.add('hidden');
    }
  });
  
  // Init on load
  (async () => {
    populateSeasons();
    await populateDrivers(seasonSelect.value);
  })();
