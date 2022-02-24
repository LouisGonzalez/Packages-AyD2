import { Operator } from './Operator';
import { Route } from './Route';

export class Checkpoint{
    description: string;
    queueCapacity: number;
    operationFee: number;
    assignedOperator ?: Operator;
    route: Route;
    pakageOnQueue: number;
    active ?: boolean;
    id ?: number;
}