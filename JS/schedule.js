const raceSchedule = document.getElementById('schedule-list')
const seasonSelect = document.getElementById('season')

const populateSchedule = () => {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 2010; year--) {
        const choice = document.createElement("option");
        choice.value = year;
        choice.textContent = year; 
        raceSchedule.appendChild(choice);
    }
    raceSchedule.value = currentYear;
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
}


seasonSelect.addEventListener('change', function(){
    const selectedSeason = seasonSelect.value;
});