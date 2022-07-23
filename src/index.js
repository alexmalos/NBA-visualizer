import BubbleChart from "./scripts/bubbleChart";

document.addEventListener('DOMContentLoaded', () => {
    // renders initial chart
    let chart = new BubbleChart();

    // saves selectors to variables
    const teamSelect = document.getElementById('team-select');
    const statSelect = document.getElementById('stat-select');
    const minGamesSelect = document.getElementById('min-games-range');
    const playoffsSelect = document.getElementById('playoffs-select');
    const modeSelect = document.getElementById('mode-select');
    const yearSelect = document.getElementById('year-select');

    // sets event listeners to render a new chart when each selector is changed
    teamSelect.addEventListener('change', () => {
        chart = new BubbleChart();
    });
    modeSelect.addEventListener('change', () => {
        chart = new BubbleChart();
    });
    yearSelect.addEventListener('change', () => {
        chart = new BubbleChart();
    });
    statSelect.addEventListener('change', () => {
        chart.render();
    });
    minGamesSelect.addEventListener('change', () => {
        chart.render();
    });
    minGamesSelect.addEventListener('input', () => {
        document.getElementById('range-value').innerHTML = minGamesSelect.value;
    });
    playoffsSelect.addEventListener('change', () => {
        chart.render();
    });
})

