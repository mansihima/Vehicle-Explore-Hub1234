import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import LoadingScreen from "./components/LoadingScreen";
import VehicleExperiencePage from "./pages/VehicleExperiencePage";
import { useState } from "react";

const queryClient = new QueryClient();

const MODEL_URL = import.meta.env.VITE_MAIN_MODEL_URL ?? "/car-model.glb";

function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LoadingScreen onComplete={() => setLoaded(true)} />
        {loaded && <VehicleExperiencePage modelUrl={MODEL_URL} />}
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
