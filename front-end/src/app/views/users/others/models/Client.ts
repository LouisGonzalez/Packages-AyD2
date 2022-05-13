import { Invoice } from "./Invoice";

export interface Client {
  name: string;
  lastname: string;
  age: number;
  CUI: number;
  NIT: number;
  id: number;
  cui: number;
  nit: number;
  address: string;
  myInvoices: Invoice[];

  /*Variables especificamente para reportes*/
  totalIngresos: number;
}
