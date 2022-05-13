import { Checkpoint } from "./Checkpoint";
import { Destination } from "./destination";

export class Route{
    id?: number;
    active?: boolean;
    name?: string;
    destinationId?: number;
    packagesOnRoute?: number;
    totalPackages?: number;
    destination?: Destination;
}
