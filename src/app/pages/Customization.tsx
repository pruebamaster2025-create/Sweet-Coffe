import { useNavigate, useLocation } from "react-router";
import { useState } from "react";

interface LocationState {
  product?: {
    id: number;
    name: string;
    price: number;
    category: string;
  };
}

export function Customization() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  const product = state?.product || { name: "Cappuccino", price: 2.2 };

  const [selectedSize, setSelectedSize] = useState("regular");
  const [selectedMilk, setSelectedMilk] = useState("entera");
  const [extras, setExtras] = useState<string[]>([]);

  const sizes = [
    { id: "pequeño", label: "Pequeño", price: -0.3 },
    { id: "regular", label: "Regular", price: 0 },
    { id: "grande", label: "Grande", price: 0.5 },
  ];

  const milkOptions = [
    { id: "entera", label: "Leche entera" },
    { id: "descremada", label: "Leche descremada" },
    { id: "almendra", label: "Leche de almendra" },
    { id: "soya", label: "Leche de soya" },
  ];

  const extraOptions = [
    { id: "extra-shot", label: "Shot extra de café", price: 0.5 },
    { id: "crema", label: "Crema batida", price: 0.3 },
    { id: "caramelo", label: "Jarabe de caramelo", price: 0.4 },
  ];

  const toggleExtra = (extraId: string) => {
    setExtras(prev => 
      prev.includes(extraId) 
        ? prev.filter(e => e !== extraId)
        : [...prev, extraId]
    );
  };

  const calculateTotal = () => {
    let total = product.price;
    const sizePrice = sizes.find(s => s.id === selectedSize)?.price || 0;
    total += sizePrice;
    
    extras.forEach(extraId => {
      const extraPrice = extraOptions.find(e => e.id === extraId)?.price || 0;
      total += extraPrice;
    });
    
    return total.toFixed(2);
  };

  const handleContinue = () => {
    navigate("/resumen", { 
      state: { 
        product,
        size: selectedSize,
        milk: selectedMilk,
        extras,
        total: calculateTotal()
      } 
    });
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col"  style={{paddingTop: "74px"}}>
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b-2 border-neutral-200 p-4">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate("/seleccionar-producto")}
            className="w-10 h-10 bg-neutral-200 flex items-center justify-center rounded-[16px]"
          >
            <span className="text-lg">←</span>
          </button>
          <h1 className="text-xl font-bold">Personalizar pedido</h1>
        </div>
      </div>

      {/* Product preview */}
      <div className="bg-white border-2 border-neutral-200 p-4 m-4 mb-2 rounded-[16px]">
        <div className="flex gap-3">
          <div className="w-20 h-20 bg-neutral-200 flex items-center justify-center flex-shrink-0 rounded-[16px]">
            <span className="text-xs text-neutral-500">Imagen</span>
          </div>
          <div className="flex-1">
            <h2 className="font-bold text-lg">{product.name}</h2>
            <p className="text-neutral-600">Precio base: ${product.price.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Customization options */}
      <div className="flex-1 overflow-y-auto pb-32">
        {/* Size selection */}
        <div className="bg-white border-2 border-neutral-200 p-4 m-4 mt-2 rounded-[16px]">
          <h3 className="font-bold mb-3">Tamaño</h3>
          <div className="grid grid-cols-3 gap-3">
            {sizes.map((size) => (
              <button
                key={size.id}
                onClick={() => setSelectedSize(size.id)}
                className={`p-3 border-2 flex flex-col justify-center items-center gap-2 rounded-[16px] ${
                  selectedSize === size.id 
                    ? "border-neutral-600 bg-neutral-100" 
                    : "border-neutral-300 bg-white"
                }`}
              >
                <div className={`bg-neutral-200 rounded-[16px] flex items-center justify-center ${
                  size.id === "pequeño" ? "w-12 h-16" : size.id === "regular" ? "w-14 h-20" : "w-16 h-24"
                }`}>
                  <span className="text-xs text-neutral-500">Cup</span>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium">{size.label}</p>
                  {size.price !== 0 && (
                    <p className="text-xs text-neutral-600">
                      {size.price > 0 ? '+' : ''}{size.price.toFixed(2)}
                    </p>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Milk selection */}
        <div className="bg-white border-2 border-neutral-200 p-4 m-4 rounded-[16px]">
          <h3 className="font-bold mb-3">Tipo de leche</h3>
          <div className="space-y-2">
            {milkOptions.map((milk) => (
              <button
                key={milk.id}
                onClick={() => setSelectedMilk(milk.id)}
                className={`w-full p-3 border-2 flex items-center justify-between rounded-[16px] ${
                  selectedMilk === milk.id 
                    ? "border-neutral-600 bg-neutral-100" 
                    : "border-neutral-300 bg-white"
                }`}
              >
                <span className="font-medium">{milk.label}</span>
                {selectedMilk === milk.id && (
                  <div className="w-6 h-6 bg-neutral-600 flex items-center justify-center rounded-[16px]">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Extras */}
        <div className="bg-white border-2 border-neutral-200 p-4 m-4 rounded-[16px]">
          <h3 className="font-bold mb-1">Extras</h3>
          <p className="text-sm text-neutral-600 mb-3">Selecciona los que quieras</p>
          <div className="space-y-2">
            {extraOptions.map((extra) => (
              <button
                key={extra.id}
                onClick={() => toggleExtra(extra.id)}
                className={`w-full p-3 border-2 flex items-center justify-between rounded-[16px] ${
                  extras.includes(extra.id) 
                    ? "border-neutral-600 bg-neutral-100" 
                    : "border-neutral-300 bg-white"
                }`}
              >
                <span className="font-medium">{extra.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm">+${extra.price.toFixed(2)}</span>
                  {extras.includes(extra.id) && (
                    <div className="w-6 h-6 bg-neutral-600 flex items-center justify-center rounded-[16px]">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer with price and CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-neutral-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="font-bold">Total</span>
          <span className="text-2xl font-bold">${calculateTotal()}</span>
        </div>
        <button
          onClick={handleContinue}
          className="w-full py-3 bg-neutral-600 text-white font-bold text-lg hover:bg-neutral-700 transition-colors rounded-[16px]"
        >
          Continuar
        </button>
      </div>
    </div>
  );
}