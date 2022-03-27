import { Package } from "./Package";

export interface Invoice {
  id: number;
  nitClient: number;
  subTotal: number;
  total: number;
  dateEmit: string;
  nit: number;
  myPackages: Package;
}
