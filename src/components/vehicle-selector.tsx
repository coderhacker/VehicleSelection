
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

interface SelectedDetails {
  manufacturer: string;
  model: string;
  type: string;
  power: string;
  cubicCapacity: string;
}

export default function VehicleSelector() {
  const [selectedManufacturer, setSelectedManufacturer] = useState<string | undefined>(undefined);
  const [selectedModel, setSelectedModel] = useState<string | undefined>(undefined);
  const [selectedType, setSelectedType] = useState<string | undefined>(undefined);
  const [confirmedDetails, setConfirmedDetails] = useState<SelectedDetails | null>(null);

  const sortedManufacturers = useMemo(() =>
    [...manufacturersData].sort((a, b) => a.name.localeCompare(b.name)),
    []
  );
  const sortedModels = useMemo(() =>
    [...modelsData].sort((a, b) => a.name.localeCompare(b.name)),
    []
  );
  const sortedTypes = useMemo(() =>
    [...typesData].sort((a, b) => a.name.localeCompare(b.name)),
    []
  );

  useEffect(() => {
    setSelectedModel(undefined);
    setSelectedType(undefined);
    setConfirmedDetails(null);
  }, [selectedManufacturer]);

  useEffect(() => {
    setSelectedType(undefined);
    setConfirmedDetails(null);
  }, [selectedModel]);
  
  useEffect(() => {
    setConfirmedDetails(null);
  }, [selectedType]);

  const handleConfirm = () => {
    if (selectedManufacturer && selectedModel && selectedType) {
      // Find the first matching type by name. If names are not unique, this picks the first one.
      const typeDetail = typesData.find(t => t.name === selectedType);
      const newDetails = {
        manufacturer: selectedManufacturer,
        model: selectedModel,
        type: selectedType,
        power: typeDetail?.power || "N/A",
        cubicCapacity: typeDetail?.cubicCapacity || "N/A",
      };
      setConfirmedDetails(newDetails);
    }
  };

  const handleReset = () => {
    setSelectedManufacturer(undefined);
    // setSelectedModel and setSelectedType will be reset by their respective useEffect hooks
    // setConfirmedDetails(null); // Also reset by useEffect
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
              disabled={!selectedManufacturer || sortedModels.length === 0}
            >
              <SelectTrigger id="model-select" className="w-full">
                <SelectValue placeholder="-- Select Model --" />
              </SelectTrigger>
              <SelectContent>
                {sortedModels.length > 0 ? sortedModels.map(model => (
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
              disabled={!selectedModel || sortedTypes.length === 0}
            >
              <SelectTrigger id="type-select" className="w-full">
                <SelectValue placeholder="-- Select Type --" />
              </SelectTrigger>
              <SelectContent>
                {sortedTypes.length > 0 ? sortedTypes.map(type => (
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
            className="px-8"
            aria-label="Confirm selection"
          >
            OK
          </Button>
        </CardFooter>
      </Card>

      {confirmedDetails && (
        <Card className="w-full shadow-md mt-8">
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
