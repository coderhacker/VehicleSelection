
import manufacturersFromFile from '@/data/manufacturers.json';
import modelsFromFile from '@/data/models.json';
import typesFromFile from '@/data/types.json';

interface ManufacturerEntry {
  code: string;
  name: string;
}

interface ModelEntry {
  code: string;
  name: string;
  builtFrom?: string;
  builtTo?: string | null;
}

interface TypeEntry {
  code: string;
  name: string;
  builtFrom?: string;
  builtTo?: string | null;
  power?: string;
  cubicCapacity?: string;
  fuel?: string;
  makeName?: string | null;
  series?: string | null;
}

export const manufacturersData: ManufacturerEntry[] = manufacturersFromFile;
export const modelsData: ModelEntry[] = modelsFromFile;
export const typesData: TypeEntry[] = typesFromFile;

// The old Manufacturer interface and vehicleData array are no longer used.
// export interface Manufacturer {
//   name: string;
//   models: string[];
//   types: string[];
// }
// export const vehicleData: Manufacturer[] = [ ... ];
