async function loadData(teamId, mode) {
    const year = document.getElementById('year-select').value;
    mode ||= 'perGame';

    const response = await fetch(
        `https://kyrie-proxy.herokuapp.com/https://api.statmuse.com/teams/v2/nba/${teamId}/${year}/player-stats?params%5BplayerStatsBreakdown%5D=${mode}`
    );
    let data = await response.json();
    if (data.grids.length > 1 && data.grids[1].name === "Play-In Tournament") data.grids.splice(1, 1);
    data = data.grids.map(obj => obj.rows);
    if (data.length > 1) {
        data[1] = data[0].map((player) => {
            const i = data[1].findIndex(el => el.PLAYER.display === player.PLAYER.display);
            if (i === -1) {
                return {
                    "GP": { "value": 0 },
                    "PLAYER": { "display": "zzz" }
                }
            }
            return data[1][i];
        })
    }
    return data;
}

export default loadData;