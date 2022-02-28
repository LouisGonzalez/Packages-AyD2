import { Checkpoint } from "./Checkpoint";
import { Destination } from "./destination";

export class Route{
    id: number;
    active: boolean;
    checkpoints?: [Checkpoint]
    name: string;
    destination: Destination;
    packageOnRoute: number;
    totalPackages: number;
}
