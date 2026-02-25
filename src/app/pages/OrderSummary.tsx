import { useNavigate, useLocation } from "react-router";
import { useState, useRef, useEffect, useMemo } from "react";

interface LocationState {
  product?: {
    id: number;
    name: string;
    price: number;
  };
  size?: string;
  milk?: string;
  extras?: string[];
}

export function OrderSummary() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  const product = state?.product || {
    id: 1,
    name: "Cappuccino",
    price: 2.2,
  };

  const [size, setSize] = useState(state?.size || "regular");
  const [milk, setMilk] = useState(state?.milk || "entera");
  const [extras, setExtras] = useState<string[]>(state?.extras || []);
  const [deliveryOption, setDeliveryOption] = useState("normal");

  const [paymentMethod, setPaymentMethod] = useState("Tarjeta de crédito");
  const [paymentDetails, setPaymentDetails] = useState("•••• 4767");

  const [showPaymentSheet, setShowPaymentSheet] = useState(false);

  const paymentScrollRef = useRef<HTMLDivElement>(null);

  // -----------------------------
  // DATA
  // -----------------------------

  const sizes = [
    { id: "pequeño", label: "Pequeño", price: -0.3 },
    { id: "regular", label: "Regular", price: 0 },
    { id: "grande", label: "Grande", price: 0.5 },
  ];

  const extraOptions = [
    { id: "extra-shot", label: "Shot extra de café", price: 0.5 },
    { id: "crema", label: "Crema batida", price: 0.3 },
    { id: "caramelo", label: "Jarabe de caramelo", price: 0.4 },
  ];

  const deliveryOptions = [
    { id: "rapida", label: "Rápida", price: 2.0 },
    { id: "normal", label: "Normal", price: 1.0 },
    { id: "esperar", label: "Puedo esperar", price: -0.5 },
  ];

  // -----------------------------
  // CALCULOS DINÁMICOS
  // -----------------------------

  const subtotal = useMemo(() => {
    const sizePrice =
      sizes.find((s) => s.id === size)?.price || 0;

    const extrasPrice = extras.reduce((acc, extraId) => {
      const extra = extraOptions.find((e) => e.id === extraId);
      return acc + (extra?.price || 0);
    }, 0);

    return product.price + sizePrice + extrasPrice;
  }, [product.price, size, extras]);

  const shippingCost =
    deliveryOptions.find((d) => d.id === deliveryOption)?.price || 0;

  const total = subtotal + shippingCost;

  // -----------------------------
  // ACTIONS
  // -----------------------------

  const toggleExtra = (extraId: string) => {
    setExtras((prev) =>
      prev.includes(extraId)
        ? prev.filter((e) => e !== extraId)
        : [...prev, extraId]
    );
  };

  const handleConfirm = () => {
    window.scrollTo(0, 0);
    navigate("/confirmacion", {
      state: {
        product,
        size,
        milk,
        extras,
        subtotal,
        shippingCost,
        total,
      },
    });
  };

  const handlePaymentChange = (method: string, details: string) => {
    setPaymentMethod(method);
    setPaymentDetails(details);
    setShowPaymentSheet(false);
  };

  // -----------------------------
  // UI
  // -----------------------------

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col" style={{ paddingTop: "74px" }}>
      
      {/* HEADER */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b-2 border-neutral-200 p-4 z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/personalizar")}
            className="w-10 h-10 bg-neutral-200 flex items-center justify-center rounded-[16px]"
          >
            ←
          </button>
          <h1 className="text-xl font-bold">Confirmar pedido</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-32">

        {/* OPCIONES DE ENTREGA */}
        <div className="bg-white border-2 border-neutral-200 m-4 p-4 rounded-[16px]">
          <h3 className="font-bold mb-3">Opciones de entrega</h3>

          <div className="space-y-2">
            {deliveryOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setDeliveryOption(option.id)}
                className={`w-full p-3 border-2 flex items-center justify-between rounded-[16px] ${
                  deliveryOption === option.id
                    ? "border-neutral-600 bg-neutral-100"
                    : "border-neutral-300 bg-white"
                }`}
              >
                <span className="font-medium">{option.label}</span>
                <span>
                  {option.price >= 0 ? "+" : "-"}$
                  {Math.abs(option.price).toFixed(2)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* MÉTODO DE PAGO */}
        <div className="bg-white border-2 border-neutral-200 m-4 p-4 rounded-[16px]">
          <h3 className="font-bold mb-3">Método de pago</h3>

          <div className="flex items-center justify-between border-2 border-neutral-300 p-3 rounded-[16px]">
            <div>
              <p className="font-medium">{paymentMethod}</p>
              <p className="text-sm text-neutral-600">{paymentDetails}</p>
            </div>
            <button
              onClick={() => setShowPaymentSheet(true)}
              className="text-sm underline"
            >
              Cambiar
            </button>
          </div>
        </div>

        {/* INFORMACIÓN DE COMPRA */}
        <div className="bg-white border-2 border-neutral-200 m-4 p-4 rounded-[16px]">
          <h3 className="font-bold mb-3">Información de compra</h3>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-sm text-neutral-600">
              <span>Costo de envío</span>
              <span>
                {shippingCost >= 0 ? "+" : "-"}$
                {Math.abs(shippingCost).toFixed(2)}
              </span>
            </div>

            <div className="border-t-2 border-neutral-200 pt-3 mt-3 flex justify-between">
              <span className="font-bold text-lg">Total</span>
              <span className="font-bold text-lg">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-neutral-200 p-4">
        <button
          onClick={handleConfirm}
          className="w-full py-4 bg-neutral-600 text-white font-bold text-lg rounded-[16px]"
        >
          Confirmar compra
        </button>
      </div>
    </div>
  );
}