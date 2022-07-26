const teamStartYears = {
    22: 1950,
    1: 1947,
    33: 1977,
    53: 1989,
    25: 1967,
    42: 1971,
    46: 1981,
    28: 1977,
    13: 1949,
    6: 1947,
    37: 1968,
    30: 1977,
    41: 1971,
    15: 1949,
    52: 1996,
    48: 1989,
    39: 1969,
    49: 1990,
    47: 2003,
    5: 1947,
    38: 1968,
    50: 1990,
    21: 1950,
    40: 1969,
    43: 1971,
    16: 1949,
    27: 1977,
    51: 1996,
    45: 1975,
    24: 1962
};

const statStartYears = {
    'MIN': 1952,
    '3PM': 1980,
    '3PA': 1980,
    'REB': 1951,
    'OREB': 1974,
    'DREB': 1974,
    'STL': 1974,
    'BLK': 1974,
    'TOV': 1978
}

export function teamChange(team) {
    // turn off all year options before given team start year, turn on all others
    const startYear = teamStartYears[team];
    [...document.getElementById('year-select').options].forEach(option => {
        if (option.value < startYear) {
            if (option.selected) option.selected = false;
            option.disabled = true;
            option.hidden = true;
        } else {
            option.disabled = false;
            option.hidden = false;
        }
    });
}

export function yearChange(year) {
    const statOptions = [...document.getElementById('stat-select').options]
    statOptions.forEach(option => {
        const statYear = statStartYears[option.value];
        if (statYear && year < statYear) {
            if (option.selected) {
                option.selected = false;
                statOptions[1].selected = true;
            }
            option.disabled = true;
            option.hidden = true;
        } else {
            option.disabled = false;
            option.hidden = false;
        }
    });

    const per36Option = document.getElementById('mode-select').options[1];
    if (year < 1952) {
        if (per36Option.selected) per36Option.selected = false;
        per36Option.disabled = true;
        per36Option.hidden = true;
    } else {
        per36Option.disabled = false;
        per36Option.hidden = false;
    }
}

export function modeChange(mode) {
    const minOption = document.getElementById('stat-select').options[0]
    if (mode === 'per36Minutes') {
        if (minOption.selected) {
            document.getElementById('stat-select')[1].selected = true;
        }
        minOption.disabled = true;
        minOption.hidden = true;
    } else {
        minOption.disabled = false;
        minOption.hidden = false;
    }
}