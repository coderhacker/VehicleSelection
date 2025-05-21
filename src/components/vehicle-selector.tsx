
"use client";

import { useState, useEffect, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { manufacturersData, modelsData, typesData } from '@/lib/vehicle-data';

interface ManufacturerEntry {
  code: string;
  name: string;
}

interface ModelEntry {
  code: string;
  name: string;
}

interface TypeEntry {
  code: string;
  name: string;
  power?: string;
  cubicCapacity?: string;
}

interface SelectedDetails {
  manufacturer: string;
  model: string;
  type: string;
  power: string;
  cubicCapacity: string;
}

export default function VehicleSelector() {
  const [selectedManufacturer, setSelectedManufacturer] = useState<string | undefined>('undefined');
  const [selectedModel, setSelectedModel] = useState<string | undefined>(undefined);
  const [selectedType, setSelectedType] = useState<string | undefined>(undefined);
  const [confirmedDetails, setConfirmedDetails] = useState<SelectedDetails | null>(null);

  // Sort manufacturers by name
  const sortedManufacturers: ManufacturerEntry[] = useMemo(() =>
    [...manufacturersData].sort((a, b) => a.name.localeCompare(b.name)),
    []
  );

  // Sort all models by name
  const allModels: ModelEntry[] = useMemo(() =>
    [...modelsData].sort((a, b) => a.name.localeCompare(b.name)),
    []
  );

  // Sort all types by name
  const allTypes: TypeEntry[] = useMemo(() =>
    [...typesData].sort((a, b) => a.name.localeCompare(b.name)),
    []
  );

  // Effect to reset model and type if manufacturer changes or is cleared
  useEffect(() => {
    setSelectedModel(undefined);
    setSelectedType(undefined);
    // Confirmed details should also be cleared if the basis of selection changes
    setConfirmedDetails(null); 
  }, [selectedManufacturer]);

  // Effect to reset type if model changes or is cleared
  useEffect(() => {
    setSelectedType(undefined);
    // Confirmed details should also be cleared
    setConfirmedDetails(null); 
  }, [selectedModel]);
  
  // Effect to clear confirmed details if type changes or is cleared
  useEffect(() => {
    setConfirmedDetails(null);
  }, [selectedType]);

  const handleConfirm = () => {
    if (selectedManufacturer && selectedModel && selectedType) {
      const manufacturerDetail = sortedManufacturers.find(m => m.name === selectedManufacturer);
      const modelDetail = allModels.find(m => m.name === selectedModel);
      const typeDetail = allTypes.find(t => t.name === selectedType);
      
      const newDetails: SelectedDetails = {
        manufacturer: manufacturerDetail?.name || "N/A",
        model: modelDetail?.name || "N/A",
        type: typeDetail?.name || "N/A",
        power: typeDetail?.power || "N/A",
        cubicCapacity: typeDetail?.cubicCapacity || "N/A",
      };
      setConfirmedDetails(newDetails);
    }
  };

  const handleReset = () => {
    setSelectedManufacturer(undefined);
    setSelectedModel(undefined); // This will also be handled by useEffect on selectedManufacturer change
    setSelectedType(undefined);   // This will also be handled by useEffect on selectedModel/selectedManufacturer change
    setConfirmedDetails(null); // This will also be handled by useEffects
  };

  const isFormComplete = !!selectedManufacturer && !!selectedModel && !!selectedType;

  return (
    <>
      <Card className="w-full shadow-md">
        <CardHeader className="p-6">
          <CardTitle className="text-xl font-semibold text-foreground">Selection by criteria</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-5 items-center">
            <Label htmlFor="manufacturer-select" className="text-sm text-foreground justify-self-start">Manufacturer:</Label>
            <Select value={selectedManufacturer} onValueChange={setSelectedManufacturer}>
              <SelectTrigger id="manufacturer-select" className="w-full">
                <SelectValue placeholder="-- Select Manufacturer --" />
              </SelectTrigger>
              <SelectContent>
                {sortedManufacturers.map(m => (
                  <SelectItem key={m.code} value={m.name}>{m.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Label htmlFor="model-select" className="text-sm text-foreground justify-self-start">Vehicle Model:</Label>
            <Select
              value={selectedModel}
              onValueChange={setSelectedModel}
              disabled={!selectedManufacturer || allModels.length === 0}
            >
              <SelectTrigger id="model-select" className="w-full">
                <SelectValue placeholder="-- Select Model --" />
              </SelectTrigger>
              <SelectContent>
                {allModels.length > 0 ? allModels.map(model => (
                  <SelectItem key={model.code} value={model.name}>{model.name}</SelectItem>
                )) : (
                  <div className="p-2 text-sm text-muted-foreground">
                    {selectedManufacturer ? "No models available" : "Select Manufacturer First"}
                  </div>
                )}
              </SelectContent>
            </Select>

            <Label htmlFor="type-select" className="text-sm text-foreground justify-self-start">Vehicle Type:</Label>
            <Select
              value={selectedType}
              onValueChange={setSelectedType}
              disabled={!selectedModel || allTypes.length === 0}
            >
              <SelectTrigger id="type-select" className="w-full">
                <SelectValue placeholder="-- Select Type --" />
              </SelectTrigger>
              <SelectContent>
                {allTypes.length > 0 ? allTypes.map(type => (
                  <SelectItem key={type.code} value={type.name}>{type.name}</SelectItem>
                )) : (
                  <div className="p-2 text-sm text-muted-foreground">
                    {selectedModel ? "No types available" : "Select Model First"}
                  </div>
                )}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="p-6 flex justify-end space-x-3">
          <Button
            variant="outline"
            onClick={handleReset}
            className="px-6"
          >
            RESET
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!isFormComplete}
            className="px-8 bg-primary hover:bg-primary/90"
            aria-label="Confirm selection"
          >
            OK
          </Button>
        </CardFooter>
      </Card>

      {confirmedDetails && (
        <Card className="w-full shadow-md mt-8 animate-in fade-in-0 duration-500 ease-out">
          <CardHeader className="p-6">
            <CardTitle className="text-xl font-semibold text-foreground">Your selection</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
              <div>
                <span className="text-sm font-medium text-muted-foreground">Manufacturer Name:</span>
                <p className="text-sm text-foreground mt-0.5">{confirmedDetails.manufacturer}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">Power:</span>
                <p className="text-sm text-foreground mt-0.5">{confirmedDetails.power}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">Model Name:</span>
                <p className="text-sm text-foreground mt-0.5">{confirmedDetails.model}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">CubicCapacity:</span>
                <p className="text-sm text-foreground mt-0.5">{confirmedDetails.cubicCapacity}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
