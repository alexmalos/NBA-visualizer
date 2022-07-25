import * as d3 from "d3";
import loadData from "./loadData";

// colors for each team
const colors = {
    22: '#C8102E',
    1: '#007A33',
    33: '#777D84',
    53: '#00788C',
    25: '#CE1141',
    42: '#860038',
    46: '#00538C',
    28: '#0E2240',
    13: '#1C428A',
    6: '#1C428A',
    37: '#CE1141',
    30: '#002D62',
    41: '#1D428A',
    15: '#552583',
    52: '#5D76A9',
    48: '#98002E',
    39: '#00471B',
    49: '#236192',
    47: '#0C2340',
    5: '#003CA6',
    38: '#007AC1',
    50: '#0077C0',
    21: '#003DA6',
    40: '#1D1160',
    43: '#D00527',
    16: '#5A2D81',
    27: '#8E9093',
    51: '#CE1141',
    45: '#002B5C',
    24: '#002B5C'
};

class BubbleChart {
    constructor() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.teamId = document.getElementById('team-select').value;
        this.mode = document.getElementById('mode-select').value;
        this.stat = document.getElementById('stat-select').value;
        this.color = colors[this.teamId];

        //fetches data and then renders the chart
        loadData(this.teamId, this.mode).then(data => {
            this.data = data;
            this.playoffs = this.checkPlayoffs();
            this.setMaxGamesPlayed();
            this.render();
        });
    }

    checkPlayoffs() {
        const playoffsOption = document.getElementById('playoffs-select').options[1];
        if (this.data.length > 1) playoffsOption.disabled = false;
        else {
            playoffsOption.disabled = true;
            document.getElementById('playoffs-select').options[0].selected = true;
        }
        return !playoffsOption.disabled;
    }

    setMaxGamesPlayed() {
        const gamesPlayedArray = this.data[0].map(obj => obj.GP.value);
        const max = Math.max(...gamesPlayedArray)
        const minGamesRange = document.getElementById('min-games-range');
        minGamesRange.max = max;
        if (document.getElementById('mode-select').value === 'totals') {
            minGamesRange.value = 1;
            document.getElementById('range-value').innerHTML = 1;
        } else {
            minGamesRange.value = 29;
            document.getElementById('range-value').innerHTML = 29;
        }
    }

    generate(data) {
        const that = this;
        data ||= this.data;

        // get values from selectors
        this.stat = document.getElementById('stat-select').value;
        let minGames = document.getElementById('min-games-range').value;
        let dataIndex = 0;
        if (this.playoffs && document.getElementById('playoffs-select').value) {
            minGames = 1;
            dataIndex = 1;
            document.getElementById('min-games-div').classList.add('display-none');
        } else document.getElementById('min-games-div').classList.remove('display-none');

        // returns array of nodes with layout info for each data point
        return d3.pack()
            .size([that.width, that.height])
            .padding(5)(d3.hierarchy({ children: data[dataIndex] }).sum(d => {
                if (d[that.stat] && d.GP.value >= minGames) return d[that.stat].value;
            }))
            .children;
    }

    render() {
        const that = this;
        const nodes = this.generate();

        // select svg element
        const svg = d3.select('#bubble-chart')
            .style('width', that.width)
            .style('height', that.height);
    
        // clear any elements inside the svg
        svg.selectAll('*').remove();
    
        // populate svg with group elements
        const groups = svg.selectAll()
            .data(nodes)
            .enter().append('g')
            .attr('transform', `translate(${that.width / 2}, ${that.height / 2})`);
    
        // populate groups with circle elements
        const circles = groups.append('circle')
            .style('fill', that.color)
            .classed('circle', true);
    
        // populate groups with player images
        const images = groups.append('image')
            .attr('x', d => d.r * -1.25)
            .attr('y', d => d.r * -1.25 + d.r / 6.8)
            .attr('href', d => d.data.PLAYER.imageUrl)
            .attr("width", d => d.r * 2.5)
            .attr("height", d => d.r * 2.5)
            .attr('clip-path', d => `circle(${d.r} at ${d.r * 1.25} ${d.r * 1.25 - d.r / 6.8})`);

        groups.transition()
            .ease(d3.easeCubicInOut)
            .duration(600)
            .attr('transform', d => `translate(${d.x}, ${d.y})`);

        circles.transition()
            .ease(d3.easeCubicInOut)
            .duration(600)
            .attr('r', d => d.r);

        images.transition()
            .delay(250)
            .ease(d3.easeCubicInOut)
            .duration(600)
            .style('opacity', 1);

        // select tooltip div
        const tooltip = d3.select('.tooltip');

        // populate groups with invisible circles for hover functionality
        groups.append('circle')
            .classed('hover', true)
            .attr('r', d => d.r)
            .attr('opacity', '0')
            .on('mouseover', function (e, d) {
                tooltip.classed('display-none', false);
                tooltip.select('#player-name')
                    .text(d.data.PLAYER.display);
                tooltip.select('#stat-value')
                    .text(`${d.data[that.stat].display} ${that.statString.apply(that)}`);
        
                d3.select(this.parentNode).select('circle').attr('opacity', '.75');
            })
            .on('mousemove', e => tooltip.style('top', `${e.pageY}px`)
                .style('left', `${e.pageX + 10}px`))
            .on('mouseout', function () {
                d3.select(this.parentNode).select('circle').attr('opacity', '1');
                tooltip.classed('display-none', true);
            });
    }

    redraw(data) {
        const that = this;
        const nodes = this.generate(data);

        d3.selectAll('g').join().data(nodes).transition()
            .ease(d3.easeCubicInOut)
            .duration(600)
            .attr('transform', d => `translate(${d.x}, ${d.y})`);

        d3.selectAll('.circle').join().data(nodes).transition()
            .ease(d3.easeCubicInOut)
            .duration(600)
            .attr('r', d => d.r);

        d3.selectAll('image').join().data(nodes).transition()
            .ease(d3.easeCubicInOut)
            .duration(600)
            .attr('x', d => d.r * -1.25)
            .attr('y', d => d.r * -1.25 + d.r / 6.8)
            .attr("width", d => d.r * 2.5)
            .attr("height", d => d.r * 2.5)
            .attr('clip-path', d => `circle(${d.r} at ${d.r * 1.25} ${d.r * 1.25 - d.r / 6.8})`);

        // select tooltip div
        const tooltip = d3.select('.tooltip');

        d3.selectAll('.hover').join().data(nodes).attr('r', d => d.r)
        .on('mouseover', function (e, d) {
            tooltip.classed('display-none', false);
            tooltip.select('#player-name')
                .text(d.data.PLAYER.display);
            tooltip.select('#stat-value')
                .text(`${d.data[that.stat].display} ${that.statString.apply(that)}`);
    
            d3.select(this.parentNode).select('circle').attr('opacity', '.75');
        });
    }

    async changeMode(mode) {
        this.mode = mode;
        if (mode !== 'perGame') {
            const that = this;
            const data = await loadData(this.teamId, mode, this.data);
            data.forEach((obj, i) => {
                obj.sort((p1, p2) => {
                    if (that.data[i].findIndex(el => el.PLAYER.display === p1.PLAYER.display) < that.data[i].findIndex(el => el.PLAYER.display === p2.PLAYER.display)) return -1;
                    return 1;
                })
            });
            this.redraw(data);
        } else this.redraw();
    }

    statString() {
        let statString = this.stat;
        switch(this.mode) {
            case 'perGame':
                statString += ' / game';
                break;
            case 'per36Minutes':
                statString += ' / 36 min';
                break;
            case 'totals':
                statString = 'total ' + statString;
                break;
        }
        return statString;
    }
}

export default BubbleChart;