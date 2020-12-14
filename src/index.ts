import { ChartwerkBase, VueChartwerkBaseMixin, TickOrientation, TimeFormat, AxisFormat } from '@chartwerk/base';

import { CompassData, CompassOptions, CardinalDirections } from './types';

import * as d3 from 'd3';
import * as _ from 'lodash';


export class ChartwerkCompassPod extends ChartwerkBase<CompassData, CompassOptions> {
  _metricsContainer: any;

  constructor(el: HTMLElement, _series: CompassData[] = [], _options: CompassOptions = {}) {
    super(d3, el, _series, _options);
  }

  _renderMetrics(): void {
    if(this.isSeriesUnavailable === true) {
      this._renderNoDataPointsMessage();
      return;
    }
    this.renderGridCircles();
    this.renderGridAxes();
    this.renderMetric(this._series[0]);
  }

  renderGridCircles(): void {
    let gridCircles = this._chartContainer.append('g')
      .attr('class', 'gris-circles axis')
      .selectAll('g')
      .data(this.gridCirclesScale.ticks(5).slice(1))
      .enter().append('g');

    gridCircles.append('circle')
      .style('fill', 'none')
      .style('stroke', '#777')
      .style('stroke-dasharray', '1,4')
      .attr('cx', this.width / 2)
      .attr('cy', this.height / 2)
      .attr('r', this.gridCirclesScale);
  }

  renderGridAxes(): void {
    let gridAxes = this._chartContainer.append('g')
      .attr('class', 'grid-axes axis')
      .selectAll('g')
      // TODO: move 45 to const or option
      .data(d3.range(0, 360, 45))
      .enter().append('g');

    gridAxes.append('line')
      .attr('x1', this.width / 2)
      .attr('y1', this.height / 2)
      .style('fill', 'none')
      .style('stroke', '#777')
      .style('stroke-dasharray', '1,4')
      .attr('x2', (d) => this.width / 2 + this.radiusLength * Math.cos(d * Math.PI / 180))
      .attr('y2', (d) => this.height / 2 + this.radiusLength * Math.sin(d * Math.PI / 180));

    gridAxes.append('text')
      .attr('x', (d) => this.width / 2 + (this.radiusLength + 10) * Math.cos(d * Math.PI / 180))
      .attr('y', (d) => this.height / 2 + (this.radiusLength + 10) * Math.sin(d * Math.PI / 180))
      .attr('dy', '.35em')
      .attr('dx', (d) => d === 90 || d === 270 ? '-.35em' : null)
      .style('text-anchor', (d) => d < 270 && d > 90 ? 'end' : null)
      .style('fill', 'black')
      .style('font', '16px sans-serif')
      .text((d) => this.getCardinalDirections(d));
  }

  get gridCirclesScale(): d3.ScaleLinear<number, number> {
    return d3.scaleLinear()
      .domain([0, 3])
      .range([0, this.radiusLength]);
  }

  getRadiusScale(serie: CompassData): d3.ScaleLinear<number, number> {
    // TODO: refactor radius option
    return d3.scaleLinear()
      .domain([0, serie.radius])
      .range([0, this.radiusLength])
  }

  renderMetric(serie: CompassData): void {
    const radScale = this.getRadiusScale(serie);

    this._chartContainer.append('g')
      .attr('class', 'circles')
      .selectAll('g')
      .data(serie.datapoints)
      .enter()
      .append('circle')
      .attr('class', 'cpoint')
      .attr('cx', (d) => {
        // get angle and radius
        const an = d[0] - 90;
        const ra = radScale(d[1]);
        const x = ra * Math.cos(an * Math.PI / 180);
        return this.width / 2 + x;
      })
      .attr('cy', (d) => {
        const an = d[0] - 90;
        const ra = radScale(d[1]);
        const y = ra * Math.sin(an * Math.PI / 180);
        return this.height / 2 + y;
      })
      .attr('r', 4)
      .attr('fill', 'red');
  }

  get radiusLength(): number {
    return this.width / 2 - 10;
  }

  getRotateAngle(angle: number): number {
    // TODO: it's hack, use rotate instead
    // becase d3 starts from left side instead of top
    let rotateAngle = angle + 90;
    if (rotateAngle >= 360) {
      rotateAngle = rotateAngle - 360;
    }
    return rotateAngle;
  }

  getCardinalDirections(angle: number): string {
    switch (this.getRotateAngle(angle)) {
      case (CardinalDirections.N):
        return 'N';
      case (CardinalDirections.NE):
        return 'NE';
      case (CardinalDirections.E):
        return 'E';
      case (CardinalDirections.SE):
        return 'SE';
      case (CardinalDirections.S):
        return 'S';
      case (CardinalDirections.SW):
        return 'SW';
      case (CardinalDirections.W):
        return 'W';
      case (CardinalDirections.NW):
        return 'NW';
    }
    return '';
  }

  onMouseOver(): void {
    // TODO: add
  }

  onMouseMove(): void {
    // TODO: add
  }

  onMouseOut(): void {
    // TODO: add
  }

  renderSharedCrosshair(): void {}
  hideSharedCrosshair(): void {}
}

// it is used with Vue.component, e.g.: Vue.component('chartwerk-compass-pod', VueChartwerkCompassPodObject)
export const VueChartwerkCompassPodObject = {
  // alternative to `template: '<div class="chartwerk-compass-pod" :id="id" />'`
  render(createElement) {
    return createElement(
      'div',
      {
        class: { 'chartwerk-compass-pod': true },
        attrs: { id: this.id }
      }
    )
  },
  mixins: [VueChartwerkBaseMixin],
  methods: {
    render() {
      const pod = new ChartwerkCompassPod(document.getElementById(this.id), this.series, this.options);
      pod.render();
    }
  }
};

export { CompassData, CompassOptions, TickOrientation, TimeFormat, AxisFormat };
