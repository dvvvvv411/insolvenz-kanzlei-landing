
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import Leistungen from "./pages/Leistungen";
import Insolvenzrecht from "./pages/Insolvenzrecht";
import Gesellschaftsrecht from "./pages/Gesellschaftsrecht";
import Vertragsrecht from "./pages/Vertragsrecht";
import Arbeitsrecht from "./pages/Arbeitsrecht";
import UeberUns from "./pages/UeberUns";
import Kontakt from "./pages/Kontakt";
import Erstberatung from "./pages/Erstberatung";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import AGB from "./pages/AGB";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/leistungen" element={<Leistungen />} />
          <Route path="/leistungen/insolvenzrecht" element={<Insolvenzrecht />} />
          <Route path="/leistungen/gesellschaftsrecht" element={<Gesellschaftsrecht />} />
          <Route path="/leistungen/vertragsrecht" element={<Vertragsrecht />} />
          <Route path="/leistungen/arbeitsrecht" element={<Arbeitsrecht />} />
          <Route path="/ueber-uns" element={<UeberUns />} />
          <Route path="/kontakt" element={<Kontakt />} />
          <Route path="/erstberatung" element={<Erstberatung />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
          <Route path="/agb" element={<AGB />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
