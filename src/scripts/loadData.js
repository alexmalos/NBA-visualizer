async function loadData(options) {
    const year = document.getElementById('year-select').value;
    const {teamId, mode} = options;

    const response = await fetch(
        `https://cors-anywhere.herokuapp.com/https://api.statmuse.com/teams/v2/nba/${teamId}/${year}/player-stats?params%5BplayerStatsBreakdown%5D=${mode}`
    );
    let data = await response.json();
    data = data.grids
    if (data.length > 1 && data[1].name === "Play-In Tournament") {
        data.splice(1, 1);
    }
    return data;
}

export default loadData;