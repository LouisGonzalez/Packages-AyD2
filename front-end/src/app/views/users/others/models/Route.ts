import { Checkpoint } from "./Checkpoint";
import { Destination } from "./destination";

export class Route{
    active: boolean;
    checkpoints?: [Checkpoint]
    name: string;
    destination: Destination;
    packageOnRoute: number;
    totalPackages: number;
}