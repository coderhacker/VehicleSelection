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
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { vehicleData } from '@/lib/vehicle-data';
import { CheckCircle, Car } from 'lucide-react'; // Added Car icon
import { useToast } from "@/hooks/use-toast";

interface SelectedDetails {
  manufacturer: string;
  model: string;
  type: string;
}

export default function VehicleSelector() {
  const [selectedManufacturer, setSelectedManufacturer] = useState<string | undefined>(undefined);
  const [selectedModel, setSelectedModel] = useState<string | undefined>(undefined);
  const [selectedType, setSelectedType] = useState<string | undefined>(undefined);

  const [availableModels, setAvailableModels] = useState<string[]>([]);
  const [availableTypes, setAvailableTypes] = useState<string[]>([]);

  const [confirmedDetails, setConfirmedDetails] = useState<SelectedDetails | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (selectedManufacturer) {
      const manufacturerData = vehicleData.find(m => m.name === selectedManufacturer);
      if (manufacturerData) {
        setAvailableModels(manufacturerData.models);
        setAvailableTypes(manufacturerData.types);
      } else {
        setAvailableModels([]);
        setAvailableTypes([]);
      }
      setSelectedModel(undefined);
      setSelectedType(undefined);
      setConfirmedDetails(null); // Reset confirmation when manufacturer changes
    } else {
      setAvailableModels([]);
      setAvailableTypes([]);
      setSelectedModel(undefined);
      setSelectedType(undefined);
      setConfirmedDetails(null);
    }
  }, [selectedManufacturer]);

  useEffect(() => {
    // Reset type if model changes and type was dependent on model (not current logic, but good practice)
    // Also reset confirmation
    setSelectedType(undefined);
    setConfirmedDetails(null);
  }, [selectedModel]);
  
  useEffect(() => {
    // Reset confirmation if type changes
    setConfirmedDetails(null);
  }, [selectedType]);

  const manufacturers = useMemo(() => vehicleData.map(m => m.name), []);

  const handleConfirm = () => {
    if (selectedManufacturer && selectedModel && selectedType) {
      const newDetails = {
        manufacturer: selectedManufacturer,
        model: selectedModel,
        type: selectedType,
      };
      setConfirmedDetails(newDetails);
      toast({
        title: "Selection Confirmed!",
        description: `${newDetails.manufacturer} ${newDetails.model} (${newDetails.type}) selected.`,
        action: <CheckCircle className="text-green-500" />,
      });
    }
  };

  const isFormComplete = !!selectedManufacturer && !!selectedModel && !!selectedType;

  return (
    <Card className="w-full shadow-xl border-2 border-primary/20 rounded-lg overflow-hidden">
      <CardHeader className="bg-muted/30 p-6">
        <div className="flex items-center space-x-3">
          <Car className="h-8 w-8 text-primary" />
          <div>
            <CardTitle className="text-2xl text-foreground">Vehicle Configuration</CardTitle>
            <CardDescription className="text-muted-foreground">
              Choose your vehicle's manufacturer, model, and type.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <div className="space-y-1.5">
            <Label htmlFor="manufacturer-select" className="text-sm font-medium">Manufacturer</Label>
            <Select value={selectedManufacturer} onValueChange={setSelectedManufacturer}>
              <SelectTrigger id="manufacturer-select" className="w-full transition-all duration-150 ease-in-out hover:border-primary focus:ring-primary focus:border-primary">
                <SelectValue placeholder="Select Manufacturer" />
              </SelectTrigger>
              <SelectContent>
                {manufacturers.map(m => (
                  <SelectItem key={m} value={m}>{m}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="model-select" className="text-sm font-medium">Model</Label>
            <Select value={selectedModel} onValueChange={setSelectedModel} disabled={!selectedManufacturer || availableModels.length === 0}>
              <SelectTrigger id="model-select" className="w-full transition-all duration-150 ease-in-out hover:border-primary focus:ring-primary focus:border-primary">
                <SelectValue placeholder={selectedManufacturer ? "Select Model" : "Select Manufacturer First"} />
              </SelectTrigger>
              <SelectContent>
                {availableModels.length > 0 ? availableModels.map(model => (
                  <SelectItem key={model} value={model}>{model}</SelectItem>
                )) : <div className="p-4 text-sm text-muted-foreground">No models available.</div>}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="type-select" className="text-sm font-medium">Type</Label>
            <Select value={selectedType} onValueChange={setSelectedType} disabled={!selectedManufacturer || availableTypes.length === 0}>
              <SelectTrigger id="type-select" className="w-full transition-all duration-150 ease-in-out hover:border-primary focus:ring-primary focus:border-primary">
                <SelectValue placeholder={selectedManufacturer ? "Select Type" : "Select Manufacturer First"} />
              </SelectTrigger>
              <SelectContent>
                {availableTypes.length > 0 ? availableTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                )) : <div className="p-4 text-sm text-muted-foreground">No types available.</div>}
              </SelectContent>
            </Select>
          </div>
        </div>

        {confirmedDetails && (
          <Card className="mt-6 bg-green-50 border border-green-200 shadow-sm transition-all duration-300 ease-in-out animate-in fade-in-50">
            <CardHeader className="flex flex-row items-center space-x-3 p-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <CardTitle className="text-lg text-green-800">Selection Confirmed</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-1 px-4 pb-4">
              <p><strong className="font-medium text-foreground/90">Manufacturer:</strong> {confirmedDetails.manufacturer}</p>
              <p><strong className="font-medium text-foreground/90">Model:</strong> {confirmedDetails.model}</p>
              <p><strong className="font-medium text-foreground/90">Type:</strong> {confirmedDetails.type}</p>
            </CardContent>
          </Card>
        )}
      </CardContent>
      <CardFooter className="p-6 bg-muted/30">
        <Button
          onClick={handleConfirm}
          disabled={!isFormComplete}
          className="w-full text-lg py-3 transition-all duration-150 ease-in-out transform hover:scale-105 active:scale-95"
          aria-label="Confirm selection"
        >
          OK
        </Button>
      </CardFooter>
    </Card>
  );
}
