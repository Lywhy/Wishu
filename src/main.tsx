import { TooltipProvider } from "@/components/ui/tooltip"
import { InterfaceMotion } from "@/components/catalog/catalog-primitives"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import { ThemeProvider } from "./components/theme-provider"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <TooltipProvider delay={350}>
        <InterfaceMotion>
          <App />
        </InterfaceMotion>
      </TooltipProvider>
    </ThemeProvider>
  </StrictMode>,
)
