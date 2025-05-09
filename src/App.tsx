import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import ScrollToTop from './components/ScrollToTop';
import About from './pages/About';
import Index from "./pages/Index";
import OnboardingScreen from "./pages/OnboardingScreen";
import NotFound from "./pages/NotFound";
// import MentorDashboard from "./pages/MentorDashboard";
import WaitlistSuccess from "./pages/WaitlistSuccess";
import ComingSoon from "./pages/ComingSoon";
import Why from "./pages/Why";
import SearchPage from "./pages/Search";
// import Waitlist from "./pages/Waitlist"; // Waitlist page was removed

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
            <Route path="/why" element={<Why />} />
            <Route path="/onboarding" element={<OnboardingScreen />} />
            {/* <Route path="/dashboard" element={<MentorDashboard />} /> */}
            <Route path="/coming-soon" element={<ComingSoon />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/about" element={<About />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
);

export default App;
