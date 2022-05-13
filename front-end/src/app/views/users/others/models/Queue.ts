import { Package } from "./Package";

export type Queue = {
  queue? : number;
  packages : Package;
  position : number;
}
