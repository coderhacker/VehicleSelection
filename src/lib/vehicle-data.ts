export interface Manufacturer {
  name: string;
  models: string[];
  types: string[];
}

export const vehicleData: Manufacturer[] = [
  {
    name: "Toyota",
    models: ["Camry", "RAV4", "Corolla", "Tacoma", "Highlander", "Prius", "Sienna"],
    types: ["Sedan", "SUV", "Truck", "Hatchback", "Hybrid", "Minivan", "Coupe"],
  },
  {
    name: "Honda",
    models: ["Civic", "Accord", "CR-V", "Pilot", "Odyssey", "HR-V", "Ridgeline"],
    types: ["Sedan", "SUV", "Minivan", "Hatchback", "Coupe", "Truck"],
  },
  {
    name: "Ford",
    models: ["F-150", "Explorer", "Mustang", "Escape", "Bronco", "Ranger", "Maverick"],
    types: ["Truck", "SUV", "Coupe", "Sedan", "Off-road", "Hatchback", "Electric"],
  },
  {
    name: "BMW",
    models: ["3 Series", "5 Series", "X3", "X5", "M3", "X1", "7 Series", "i4"],
    types: ["Sedan", "SUV", "Coupe", "Convertible", "Performance", "Luxury", "Electric"],
  },
  {
    name: "Mercedes-Benz",
    models: ["C-Class", "E-Class", "GLC", "S-Class", "AMG GT", "A-Class", "EQS"],
    types: ["Sedan", "SUV", "Coupe", "Luxury", "Performance", "Convertible", "Electric"],
  },
  {
    name: "Chevrolet",
    models: ["Silverado", "Equinox", "Tahoe", "Camaro", "Traverse", "Bolt EV"],
    types: ["Truck", "SUV", "Performance", "Sedan", "Electric", "Hatchback"],
  },
  {
    name: "Nissan",
    models: ["Altima", "Rogue", "Sentra", "Titan", "Pathfinder", "Leaf"],
    types: ["Sedan", "SUV", "Truck", "Hatchback", "Electric", "Sports Car"],
  },
];
