import BubbleChart from "./scripts/bubbleChart";
import * as setOptions from "./scripts/checker";

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
        modeSelect[0].selected = true;
        setOptions.teamChange(teamSelect.value);
        chart = new BubbleChart();
    });
    modeSelect.addEventListener('change', () => {
        setOptions.modeChange(modeSelect.value);
        chart.changeMode(modeSelect.value);
    });
    yearSelect.addEventListener('change', () => {
        modeSelect[0].selected = true;
        setOptions.yearChange(yearSelect.value);
        chart = new BubbleChart();
    });
    statSelect.addEventListener('change', () => {
        chart.redraw();
    });
    minGamesSelect.addEventListener('change', () => {
        chart.redraw();
    });
    minGamesSelect.addEventListener('input', () => {
        document.getElementById('range-value').innerHTML = minGamesSelect.value;
    });
    playoffsSelect.addEventListener('change', () => {
        chart.redraw();
    });
})

