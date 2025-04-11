const seasonSelect = document.getElementById("season");
const driverSelect = document.getElementById("driver");
const driverCard = document.getElementById("driver-card");
const nameEl = document.getElementById("driver-name");
const nationalityEl = document.getElementById("driver-nationality");
const dobEl = document.getElementById("driver-dob");
const numberEl = document.getElementById("driver-number");
const winsEl = document.getElementById("driver-wins");
const teamEl = document.getElementById("driver-team");

const populateSeasons = () => {
  const currentYear = new Date().getFullYear();
  for (let year = currentYear; year >= 2010; year--) {
    const opt = document.createElement("option");
    opt.value = year;
    opt.textContent = year;
    seasonSelect.appendChild(opt);
  }
  seasonSelect.value = currentYear;
};

const loadDrivers = async (season) => {
  const res = await fetch(`https://ergast.com/api/f1/${season}/drivers.json`);
  const data = await res.json();
  const drivers = data.MRData.DriverTable.Drivers;

  driverSelect.innerHTML = `<option value="">Select a driver</option>`;
  drivers.forEach(driver => {
    const option = document.createElement("option");
    option.value = driver.driverId;
    option.textContent = `${driver.givenName} ${driver.familyName}`;
    driverSelect.appendChild(option);
  });
};

const loadDriverStats = async (season, driverId) => {
  const res = await fetch(`https://ergast.com/api/f1/${season}/drivers/${driverId}/driverStandings.json`);
  const data = await res.json();
  const standings = data.MRData.StandingsTable.StandingsLists[0];

  if (!standings || !standings.DriverStandings.length) {
    driverCard.classList.add("hidden");
    return;
  }

  const info = standings.DriverStandings[0];
  const driver = info.Driver;
  const constructor = info.Constructors[0];

  nameEl.textContent = `${driver.givenName} ${driver.familyName}`;
  nationalityEl.textContent = driver.nationality;
  dobEl.textContent = driver.dateOfBirth;
  numberEl.textContent = driver.permanentNumber || "N/A";
  winsEl.textContent = info.wins;
  teamEl.textContent = constructor.name;

  driverCard.classList.remove("hidden");
};

seasonSelect.addEventListener("change", () => {
  loadDrivers(seasonSelect.value);
  driverCard.classList.add("hidden");
});

driverSelect.addEventListener("change", () => {
  if (driverSelect.value) {
    loadDriverStats(seasonSelect.value, driverSelect.value);
  } else {
    driverCard.classList.add("hidden");
  }
});

// Init
populateSeasons();
loadDrivers(seasonSelect.value);
