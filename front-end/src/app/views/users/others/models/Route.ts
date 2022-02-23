import { Checkpoint } from "./Checkpoint";
import { Destination } from "./destination";

export class Route{
    active: boolean;
    checkpoint: [Checkpoint]
    description: string;
    destination: Destination;
    packageOnRoute: number;
    totalPackages: number;
}