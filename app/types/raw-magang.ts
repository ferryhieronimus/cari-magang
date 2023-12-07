import { Magang } from "./magang";

export type RawMagang = {
  data: Magang[];
  meta: {
    limit: number;
    offset: number;
    total: number;
  };
};
