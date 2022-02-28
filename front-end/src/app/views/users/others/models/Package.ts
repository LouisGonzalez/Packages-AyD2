export interface Package {
  id: number;
  idClient: number;
  route: number;
  onWay: boolean;
  atDestination: boolean;
  retired: boolean;
  weight: number;
  noInvoice: number;
  unitTotal: number;
  description: string;
}
