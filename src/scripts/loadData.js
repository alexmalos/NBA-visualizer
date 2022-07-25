async function loadData(teamId, mode) {
    const year = document.getElementById('year-select').value;

    const response = await fetch(
        `https://cors-anywhere.herokuapp.com/https://api.statmuse.com/teams/v2/nba/${teamId}/${year}/player-stats?params%5BplayerStatsBreakdown%5D=${mode}`
    );
    let data = await response.json();
    if (data.grids.length > 1 && data.grids[1].name === "Play-In Tournament") data.grids.splice(1, 1);
    data = data.grids.map(obj => obj.rows);
    if (data.length > 1) {
        data[1] = data[0].map((player) => {
            const i = data[1].findIndex(el => el.PLAYER.display === player.PLAYER.display);
            if (i === -1) {
                return {
                    "3P%": {
                        "display": "38.0",
                        "value": 0
                    },
                    "3PA": {
                        "display": "11.7",
                        "value": 0
                    },
                    "3PM": {
                        "display": "4.5",
                        "value": 0
                    },
                    "AST": {
                        "display": "6.3",
                        "value": 0
                    },
                    "BLK": {
                        "display": "0.4",
                        "value": 0
                    },
                    "DREB": {
                        "display": "4.7",
                        "value": 0
                    },
                    "FG%": {
                        "display": "43.7",
                        "value": 0
                    },
                    "FGA": {
                        "display": "19.1",
                        "value": 0
                    },
                    "FGM": {
                        "display": "8.4",
                        "value": 0
                    },
                    "FT%": {
                        "display": "92.3",
                        "value": 0
                    },
                    "FTA": {
                        "display": "4.7",
                        "value": 0
                    },
                    "FTM": {
                        "display": "4.3",
                        "value": 0
                    },
                    "GP": {
                        "display": "64",
                        "entity": {
                            "baseResourcePath": "nba/players/787",
                            "display": "Stephen Curry",
                            "domain": "NBA",
                            "id": "787",
                            "parameters": {
                                "playerStatsBreakdown": "perGame",
                                "seasonType": "regularSeason",
                                "seasonYear": 2022
                            },
                            "type": "player"
                        },
                        "value": 0
                    },
                    "GS": {
                        "display": "64",
                        "value": 0
                    },
                    "MIN": {
                        "display": "34.5",
                        "value": 0
                    },
                    "OREB": {
                        "display": "0.5",
                        "value": 0
                    },
                    "PF": {
                        "display": "2.0",
                        "value": 0
                    },
                    "PLAYER": {
                        "display": "Stephen Curry",
                        "entity": {
                            "baseResourcePath": "nba/players/787",
                            "display": "Stephen Curry",
                            "domain": "NBA",
                            "id": "787",
                            "parameters": {
                                "playerStatsBreakdown": "perGame",
                                "seasonType": "regularSeason"
                            },
                            "type": "player"
                        },
                        "imageUrl": "https://cdn.statmuse.com/img/nba/players/golden-state-warriors-stephen-curry2021-min-1---hw2hav_b.png",
                        "value": "Curry, Stephen"
                    },
                    "PTS": {
                        "display": "25.5",
                        "value": 0
                    },
                    "REB": {
                        "display": "5.2",
                        "value": 0
                    },
                    "STL": {
                        "display": "1.3",
                        "value": 0
                    },
                    "TOV": {
                        "display": "3.2",
                        "value": 0
                    }
                }
            } else return data[1][i];
        })
    }
    return data;
}

export default loadData;