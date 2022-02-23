import { Destination } from "./destination";
import { Checkpoint } from "./Checkpoint";

export class Route{
    active: boolean;
    checkpoint: [Checkpoint]
    description: string;
    destination: Destination;
    packageOnRoute: number;
    totalPackages: number;
}