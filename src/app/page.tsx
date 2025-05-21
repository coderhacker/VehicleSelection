import VehicleSelector from '@/components/vehicle-selector';
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-8 bg-background">
      <div className="w-full max-w-2xl space-y-8">
        <header className="text-left w-full mb-6">
          <h1 className="text-4xl font-bold text-foreground tracking-tight">
            Vehicle Selection
          </h1>
        </header>
        <VehicleSelector />
      </div>
      <Toaster />
    </main>
  );
}
