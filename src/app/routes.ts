import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { ProductSelection } from "./pages/ProductSelection";
import { Customization } from "./pages/Customization";
import { OrderSummary } from "./pages/OrderSummary";
import { PostPurchaseFeedback } from "./pages/PostPurchaseFeedback";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/seleccionar-producto",
    Component: ProductSelection,
  },
  {
    path: "/personalizar",
    Component: Customization,
  },
  {
    path: "/resumen",
    Component: OrderSummary,
  },
  {
    path: "/confirmacion",
    Component: PostPurchaseFeedback,
  },
]);
