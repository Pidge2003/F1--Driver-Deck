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