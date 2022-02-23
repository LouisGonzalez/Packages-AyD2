import { Checkpoint } from "./Checkpoint";
import { Destination } from "./Destination";

export class Route{
    active: boolean;
    checkpoint: [Checkpoint]
    description: string;
    destination: Destination;
    packageOnRoute: number;
    totalPackages: number;
}