import { TimeSerie, Options } from '@chartwerk/base';

export type CompassDataParams = {
  radius: number;
}
export type CompassData = TimeSerie & Partial<CompassDataParams>;
export type CompassOptions = Options;

export enum CardinalDirections {
  N = 0,
  NE = 45,
  E = 90,
  SE = 135,
  S = 180,
  SW = 225,
  W = 270,
  NW = 315
}
