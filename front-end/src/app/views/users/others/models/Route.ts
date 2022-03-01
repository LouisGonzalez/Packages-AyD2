import { Checkpoint } from "./Checkpoint";

export class Route{
    id?: number;
    active?: boolean;
    checkpoints?: [Checkpoint]
    name?: string;
    destinationId?: number;
    packagesOnRoute?: number;
    totalPackages?: number;
}
