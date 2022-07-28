import BubbleChart from "./scripts/bubbleChart";
import * as setOptions from "./scripts/setOptions";
import loadTeamInfo from "./scripts/loadTeamInfo";

document.addEventListener('DOMContentLoaded', () => {
    // renders initial chart
    loadTeamInfo();
    let chart = new BubbleChart();
    chart.changeColorsOnPage();

    // saves selectors to variables
    const teamSelect = document.getElementById('team-select');
    const minGamesSelect = document.getElementById('min-games-range');
    const modeSelect = document.getElementById('mode-select');
    const yearSelect = document.getElementById('year-select');

    // sets event listeners to render a new chart when each selector is changed
    teamSelect.addEventListener('change', () => {
        modeSelect[0].selected = true;
        setOptions.teamChange(teamSelect.value);
        loadTeamInfo();
        chart = new BubbleChart();
        chart.changeColorsOnPage();
    });

    modeSelect.addEventListener('change', () => {
        setOptions.modeChange(modeSelect.value);
        chart.changeMode(modeSelect.value);
    });

    yearSelect.addEventListener('change', () => {
        modeSelect[0].selected = true;
        setOptions.yearChange(yearSelect.value);
        loadTeamInfo();
        chart = new BubbleChart();
    });

    document.getElementById('stat-select').addEventListener('change', () => {
        chart.redraw();
    });

    minGamesSelect.addEventListener('change', () => {
        chart.redraw();
    });

    minGamesSelect.addEventListener('input', () => {
        document.getElementById('range-value').innerHTML = minGamesSelect.value;
    });
    
    document.getElementById('playoffs-select').addEventListener('change', () => {
        chart.redraw();
    });

    document.getElementById('github').addEventListener('click', () => {
        window.open('https://github.com/alexmalos/NBA-visualizer', '_blank');
    });

    const about = document.getElementById('about');
    const aboutText = document.getElementById('about-text');

    about.addEventListener('mouseover', () => {
        aboutText.classList.remove('display-none');
    })
    
    about.addEventListener('mouseout', () => {
        aboutText.classList.add('display-none');
    })
})
