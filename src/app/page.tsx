import VehicleSelector from '@/components/vehicle-selector';
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 bg-background">
      <div className="w-full max-w-2xl space-y-8">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-foreground tracking-tight">
            Auto<span className="text-primary">Spec</span>
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Select your vehicle details below.
          </p>
        </header>
        <VehicleSelector />
      </div>
      <Toaster />
    </main>
  );
}
