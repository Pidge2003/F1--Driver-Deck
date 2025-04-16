const raceSchedule = document.getElementById('schedule-list')
const seasonSelect = document.getElementById('season')

const populateSchedule = () => {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 2010; year--) {
        const choice = document.createElement("option");
        choice.value = year;
        choice.textContent = year; 
        seasonSelect.appendChild(choice);
    }
    seasonSelect.value = currentYear;
};

const fetchRaceData = async (season) => {
    try {
        const response = await fetch(`https://ergast.com/api/f1/${season}.json`);
        const data = await response.json();
        return data.MRData.RaceTable.Races; // Extract the races array
    } catch (error) {
        console.error('Error fetching race data:', error);
        return []; // Return an empty array in case of error
    }
};

const displayRaces = (races) => {
    raceSchedule.innerHTML = ''; // Clear the previous race list
    if (races.length === 0) {
        raceSchedule.innerHTML = '<p>No races found for this season.</p>';
        return;
    }

    races.forEach(race => {
        const raceCard = document.createElement('div');
        raceCard.classList.add('race-card');
        
        raceCard.innerHTML = `
            <h3>Round ${race.round}: ${race.raceName}</h3>
            <p><strong>Date:</strong> ${race.date} ${race.time ? `@ ${race.time.replace('Z', '')}` : ''}</p>
            <p><strong>Location:</strong> ${race.Circuit.Location.locality}, ${race.Circuit.Location.country}</p>
            <p><strong>Circuit:</strong> ${race.Circuit.circuitName}</p>
        `;

        raceSchedule.appendChild(raceCard);
    });
};


seasonSelect.addEventListener('change', async () => {
    const selectedSeason = seasonSelect.value;
    const races = await fetchRaceData(selectedSeason);
    displayRaces(races);
});

populateSchedule();