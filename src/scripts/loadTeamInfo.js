export default async function loadTeamInfo() {
    const teamId = document.getElementById('team-select').value;
    const year = document.getElementById('year-select').value;

    const response = await fetch(
        `https://kyrie-proxy.herokuapp.com/https://api.statmuse.com/teams/v2/nba/${teamId}/${year}/overview`
    );
    let data = await response.json();
    const standings = data.bio.standing;
    const stats = data.bio.statsSummary.stats;
    [...document.getElementById('team-info').children].forEach(el => {
        changeInfoElement(standings, stats, el);
    });
}

function changeInfoElement(standings, stats, el) {
    if (el.id === 'championship') {
        if (standings.championship) el.classList.remove('display-none');
        else el.classList.add('display-none');
    } else if (el.id === 'record') el.innerHTML = standings.record;
    else if (el.id === 'standing') {
        if (standings.conferenceRank) el.innerHTML = standings.conferenceRank;
        else el.innerHTML = standings.divisionRank;
    } else {
        if (stats[0].rank) {
            el.classList.remove('display-none');
            const statIndex = stats.findIndex(obj => obj.label === el.id);
            const tags = [...el.lastElementChild.children];
            tags[0].innerHTML = stats[statIndex].value;
            tags[1].innerHTML = stats[statIndex].rank;
        } else el.classList.add('display-none');
    }
}