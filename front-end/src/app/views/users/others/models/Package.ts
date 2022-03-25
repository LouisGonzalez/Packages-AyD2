import { Invoice } from "./Invoice";
import { Route } from "./Route";

export interface Package {
  id: number;
  idClient: number;
  route: Route;
  onWay: boolean;
  atDestination: boolean;
  retired: boolean;
  weight: number;
  noInvoice: number;
  invoice: Invoice;
  unitTotal: number;
  description: string;
  priority: boolean;
}
