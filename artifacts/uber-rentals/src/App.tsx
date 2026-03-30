import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import LoadingScreen from "./components/LoadingScreen";
import VehicleExperiencePage from "./pages/VehicleExperiencePage";
import { useState } from "react";

const queryClient = new QueryClient();

function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LoadingScreen onComplete={() => setLoaded(true)} />
        {loaded && <VehicleExperiencePage modelUrl="/car-model.glb" />}
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
