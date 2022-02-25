import { Checkpoint } from "./Checkpoint";
import { Destination } from "./destination";

export class Route{
    id ?: number;
    active: boolean;
    checkpoint: [Checkpoint]
    description: string;
    destination: Destination;
    packageOnRoute: number;
    totalPackages: number;
}