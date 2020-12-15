import { ChartwerkBase, TickOrientation, TimeFormat, AxisFormat } from '@chartwerk/base';
import { CompassData, CompassOptions } from './types';
import * as d3 from 'd3';
export declare class ChartwerkCompassPod extends ChartwerkBase<CompassData, CompassOptions> {
    _metricsContainer: any;
    constructor(el: HTMLElement, _series?: CompassData[], _options?: CompassOptions);
    _renderMetrics(): void;
    renderGridCircles(): void;
    renderGridAxes(): void;
    get gridCirclesScale(): d3.ScaleLinear<number, number>;
    getRadiusScale(serie: CompassData): d3.ScaleLinear<number, number>;
    renderMetric(serie: CompassData): void;
    get radiusLength(): number;
    getRotateAngle(angle: number): number;
    getCardinalDirections(angle: number): string;
    onMouseOver(): void;
    onMouseMove(): void;
    onMouseOut(): void;
    renderSharedCrosshair(): void;
    hideSharedCrosshair(): void;
}
export declare const VueChartwerkCompassPodObject: {
    render(createElement: any): any;
    mixins: {
        props: {
            id: {
                type: StringConstructor;
                required: boolean;
            };
            series: {
                type: ArrayConstructor;
                required: boolean;
                default: () => any[];
            };
            options: {
                type: ObjectConstructor;
                required: boolean;
                default: () => {};
            };
        };
        watch: {
            id(): void;
            series(): void;
            options(): void;
        };
        mounted(): void;
        methods: {
            render(): void;
            renderChart(): void;
            appendEvents(): void;
            zoomIn(range: any): void;
            zoomOut(center: any): void;
            mouseMove(evt: any): void;
            mouseOut(): void;
            onLegendClick(idx: any): void;
        };
    }[];
    methods: {
        render(): void;
    };
};
export { CompassData, CompassOptions, TickOrientation, TimeFormat, AxisFormat };
