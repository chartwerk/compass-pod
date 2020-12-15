import { TimeSerie, Options } from '@chartwerk/base';
export declare type CompassDataParams = {
    radius: number;
};
export declare type CompassData = TimeSerie & Partial<CompassDataParams>;
export declare type CompassOptions = Options;
export declare enum CardinalDirections {
    N = 0,
    NE = 45,
    E = 90,
    SE = 135,
    S = 180,
    SW = 225,
    W = 270,
    NW = 315
}
