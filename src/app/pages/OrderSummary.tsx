import { useNavigate, useLocation } from "react-router";
import { useState, useRef, useEffect } from "react";

interface LocationState {
  product?: {
    id: number;
    name: string;
    price: number;
  };
  size?: string;
  milk?: string;
  extras?: string[];
  total?: string;
}

export function OrderSummary() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  
  const product = state?.product || { name: "Cappuccino", price: 2.2 };
  const total = state?.total || "2.20";
  const [size, setSize] = useState(state?.size || "regular");
  const [milk, setMilk] = useState(state?.milk || "entera");
  const [extras, setExtras] = useState<string[]>(state?.extras || []);
  const [paymentMethod, setPaymentMethod] = useState("Tarjeta de crédito");
  const [paymentDetails, setPaymentDetails] = useState("•••• 4767");
  const [deliveryOption, setDeliveryOption] = useState("normal");

  const [showPaymentSheet, setShowPaymentSheet] = useState(false);
  const [showEditSheet, setShowEditSheet] = useState(false);

  const paymentScrollRef = useRef<HTMLDivElement>(null);
  const editScrollRef = useRef<HTMLDivElement>(null);

  // Drag to scroll functionality
  useEffect(() => {
    const setupDragScroll = (element: HTMLDivElement | null) => {
      if (!element) return;

      let isDown = false;
      let startY = 0;
      let scrollTop = 0;

      const handleMouseDown = (e: MouseEvent) => {
        isDown = true;
        element.style.cursor = 'grabbing';
        startY = e.pageY - element.offsetTop;
        scrollTop = element.scrollTop;
      };

      const handleMouseLeave = () => {
        isDown = false;
        element.style.cursor = 'grab';
      };

      const handleMouseUp = () => {
        isDown = false;
        element.style.cursor = 'grab';
      };

      const handleMouseMove = (e: MouseEvent) => {
        if (!isDown) return;
        e.preventDefault();
        const y = e.pageY - element.offsetTop;
        const walk = (y - startY) * 2; // Multiply for faster scroll
        element.scrollTop = scrollTop - walk;
      };

      element.style.cursor = 'grab';
      element.addEventListener('mousedown', handleMouseDown);
      element.addEventListener('mouseleave', handleMouseLeave);
      element.addEventListener('mouseup', handleMouseUp);
      element.addEventListener('mousemove', handleMouseMove);

      return () => {
        element.removeEventListener('mousedown', handleMouseDown);
        element.removeEventListener('mouseleave', handleMouseLeave);
        element.removeEventListener('mouseup', handleMouseUp);
        element.removeEventListener('mousemove', handleMouseMove);
      };
    };

    const cleanupPayment = setupDragScroll(paymentScrollRef.current);
    const cleanupEdit = setupDragScroll(editScrollRef.current);

    return () => {
      cleanupPayment?.();
      cleanupEdit?.();
    };
  }, [showPaymentSheet, showEditSheet]);

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

  const handlePaymentChange = (method: string, details: string) => {
    setPaymentMethod(method);
    setPaymentDetails(details);
    setShowPaymentSheet(false);
  };

  const handleConfirm = () => {
    navigate("/confirmacion", { state });
  };

  const formatOption = (option: string) => {
    const labels: { [key: string]: string } = {
      pequeño: "Pequeño",
      regular: "Regular",
      grande: "Grande",
      entera: "Leche entera",
      descremada: "Leche descremada",
      almendra: "Leche de almendra",
      soya: "Leche de soya",
      "extra-shot": "Shot extra de café",
      crema: "Crema batida",
      caramelo: "Jarabe de caramelo",
    };
    return labels[option] || option;
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col"  style={{paddingTop:"74px"}}>
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b-2 border-neutral-200 p-4 z-20">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate("/personalizar")}
            className="w-10 h-10 bg-neutral-200 flex items-center justify-center rounded-[16px]"
          >
            <span className="text-lg">←</span>
          </button>
          <h1 className="text-xl font-bold">Confirmar pedido</h1>
        </div>
      </div>
      {/* Delivery time estimate */}
      <div className="bg-neutral-200 text-neutral-800 p-4 mb-2 flex items-center gap-3">
        <div className="w-10 h-10 bg-neutral-300 rounded-full flex items-center justify-center flex-shrink-0">
        </div>
        <div>
          <p className="font-bold text-sm">Suma +1 estrella completando esta compra</p>
          <p className="text-xs">Te faltan 2 estrellas para subir de rango :O</p>
        </div>
      </div> 

      {/* Delivery time estimate */}
      {/* <div className="bg-neutral-500 text-white p-4 m-4 mb-2 flex items-center gap-3 rounded-[16px]">
        <div className="w-10 h-10 bg-neutral-300 rounded-full flex items-center justify-center flex-shrink-0">
        </div>
        <div>
          <p className="font-bold">Tiempo estimado</p>
          <p className="text-sm">15-20 minutos</p>
        </div>
      </div> */}

      <div className="flex-1 overflow-y-auto pb-32">
        {/* Delivery address */}
        <div className="bg-white border-2 border-neutral-200 m-4 mt-2 p-4 rounded-[16px]">
          <div className="flex items-center gap-2 mb-3">
            <h3 className="font-bold">Dirección de entrega</h3>
          </div>
          <div>
            <p className="font-medium">Oficina Principal</p>
            <p className="text-sm text-neutral-600">Av. Principal 123, Piso 4</p>
            <button className="mt-2 text-sm underline">Cambiar dirección</button>
          </div>
        </div>

        {/* Delivery options */}
        <div className="bg-white border-2 border-neutral-200 m-4 p-4 rounded-[16px]">
          <h3 className="font-bold mb-3">Opciones de entrega</h3>
          <div className="space-y-2">
            <button
              onClick={() => setDeliveryOption("rapida")}
              className={`w-full p-3 border-2 flex items-center justify-between rounded-[16px] ${
                deliveryOption === "rapida" 
                  ? "border-neutral-600 bg-neutral-100" 
                  : "border-neutral-300 bg-white"
              }`}
            >
              <div>
                <p className="font-medium text-left">Rápida</p>
                <p className="text-xs text-neutral-600 text-left">10-15 minutos</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">+$2.00</span>
                {deliveryOption === "rapida" && (
                  <div className="w-6 h-6 bg-neutral-600 flex items-center justify-center rounded-[16px]">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
            </button>
            <button
              onClick={() => setDeliveryOption("normal")}
              className={`w-full p-3 border-2 flex items-center justify-between rounded-[16px] ${
                deliveryOption === "normal" 
                  ? "border-neutral-600 bg-neutral-100" 
                  : "border-neutral-300 bg-white"
              }`}
            >
              <div>
                <p className="font-medium text-left">Normal</p>
                <p className="text-xs text-neutral-600 text-left">15-20 minutos</p>
              </div>
              {deliveryOption === "normal" && (
                <div className="w-6 h-6 bg-neutral-600 flex items-center justify-center rounded-[16px]">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </button>
            <button
              onClick={() => setDeliveryOption("esperar")}
              className={`w-full p-3 border-2 flex items-center justify-between rounded-[16px] ${
                deliveryOption === "esperar" 
                  ? "border-neutral-600 bg-neutral-100" 
                  : "border-neutral-300 bg-white"
              }`}
            >
              <div>
                <p className="font-medium text-left">Puedo esperar</p>
                <p className="text-xs text-neutral-600 text-left">25-30 minutos</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm ">-$0.50</span>
                {deliveryOption === "esperar" && (
                  <div className="w-6 h-6 bg-neutral-600 flex items-center justify-center rounded-[16px]">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Order details */}
       {/*  <div className="bg-white border-2 border-neutral-200 m-4 p-4 rounded-[16px]">
          <h3 className="font-bold mb-4">Detalle del pedido</h3>
          
          
          <div className="flex gap-3 pb-4 border-b-2 border-neutral-200">
            <div className="w-16 h-16 bg-neutral-200 flex items-center justify-center flex-shrink-0 rounded-[16px]">
              <span className="text-xs text-neutral-500">Img</span>
            </div>
            <div className="flex-1">
              <p className="font-bold">{product.name}</p>
              <p className="text-sm text-neutral-600 mt-1">• {formatOption(size)}</p>
              <p className="text-sm text-neutral-600">• {formatOption(milk)}</p>
              {extras.length > 0 && extras.map(extra => (
                <p key={extra} className="text-sm text-neutral-600">• {formatOption(extra)}</p>
              ))}
            </div>
            <div className="flex items-start">
              <p className="font-bold">x1</p>
            </div>
          </div>

          <button 
            onClick={() => setShowEditSheet(true)}
            className="w-full py-3 border-2 border-neutral-300 font-medium mt-4 hover:bg-neutral-100 transition-colors rounded-[16px]"
          >
            Editar
          </button>
        </div> */}

        {/* Payment method */}
        <div className="bg-white border-2 border-neutral-200 m-4 p-4 rounded-[16px]">
          <h3 className="font-bold mb-3">Método de pago</h3>
          <div className="flex items-center gap-3 p-3 border-2 border-neutral-300 rounded-[16px]">
            <div className="w-12 h-8 bg-neutral-200 flex items-center justify-center rounded-[16px]">
              <span className="text-xs font-bold">Pay</span>
            </div>
            <div className="flex-1">
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

        {/* Price breakdown */}
        <div className="bg-white border-2 border-neutral-200 m-4 p-4 rounded-[16px]">
          <h3 className="font-bold mb-3">Información de compra</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${total}</span>
            </div>
            <div className="flex justify-between text-sm text-neutral-600">
              <span>Costo de envío</span>
              <span>$1.00</span>
            </div>
            <div className="border-t-2 border-neutral-200 pt-3 mt-3 flex justify-between">
              <span className="font-bold text-lg">Total</span>
              <span className="font-bold text-lg">${(parseFloat(total) + 1).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer with CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-neutral-200 p-4 z-10">
        <button
          onClick={handleConfirm}
          className="w-full py-4 bg-neutral-600 text-white font-bold text-lg hover:bg-neutral-700 transition-colors rounded-[16px]"
        >
          Confirmar compra
        </button>
      </div>

      {/* Payment method bottom sheet */}
      {showPaymentSheet && (
        <>
          <div 
            className="fixed inset-0 z-30"
            style={{backgroundColor:"rgba(0,0,0,0.7)"}}
            onClick={() => setShowPaymentSheet(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[24px] z-40 flex flex-col max-h-[70vh]">
            {/* Header - Fixed */}
            <div className="p-6 pb-4 border-b border-neutral-200">
              <div className="w-12 h-1 bg-neutral-300 rounded-full mx-auto mb-4" />
              <h3 className="font-bold text-lg">Seleccionar método de pago</h3>
            </div>
            
            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto p-6 pt-4 scrollbar-hide" ref={paymentScrollRef}>
              <div className="space-y-3">
                <button
                  onClick={() => handlePaymentChange("Efectivo", "Pago contra entrega")}
                  className="w-full p-4 border-2 border-neutral-300 rounded-[16px] text-left hover:border-neutral-600 hover:bg-neutral-50 transition-colors"
                >
                  <p className="font-bold">Efectivo</p>
                  <p className="text-sm text-neutral-600">Pago contra entrega</p>
                </button>
                <button
                  onClick={() => handlePaymentChange("Tarjeta de crédito", "•••• 4767")}
                  className="w-full p-4 border-2 border-neutral-300 rounded-[16px] text-left hover:border-neutral-600 hover:bg-neutral-50 transition-colors"
                >
                  <p className="font-bold">Tarjeta de crédito</p>
                  <p className="text-sm text-neutral-600">•••• 4767</p>
                </button>
                <button
                  onClick={() => handlePaymentChange("Gift Card", "Saldo: $27.18")}
                  className="w-full p-4 border-2 border-neutral-300 rounded-[16px] text-left hover:border-neutral-600 hover:bg-neutral-50 transition-colors"
                >
                  <p className="font-bold">Gift Card</p>
                  <p className="text-sm text-neutral-600">Saldo disponible: $27.18</p>
                </button>
              </div>
            </div>

            {/* Footer - Fixed */}
            <div className="p-6 pt-4 border-t border-neutral-200">
              <button
                onClick={() => setShowPaymentSheet(false)}
                className="w-full py-3 bg-neutral-200 font-medium rounded-[16px]"
              >
                Cancelar
              </button>
            </div>
          </div>
        </>
      )}

      {/* Edit order bottom sheet */}
      {showEditSheet && (
        <>
          <div 
            className="fixed inset-0 z-30"            
            style={{backgroundColor:"rgba(0,0,0,0.7)"}}
            onClick={() => setShowEditSheet(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[24px] z-40 flex flex-col max-h-[85vh]">
            {/* Header - Fixed */}
            <div className="p-6 pb-4 border-b border-neutral-200">
              <div className="w-12 h-1 bg-neutral-300 rounded-full mx-auto mb-4" />
              <h3 className="font-bold text-lg">Editar pedido</h3>
            </div>
            
            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto p-6 pt-4 scrollbar-hide" ref={editScrollRef}>
              {/* Size selection */}
              <div className="mb-6">
                <h4 className="font-bold mb-3">Tamaño</h4>
                <div className="grid grid-cols-3 gap-3">
                  {sizes.map((sizeOption) => (
                    <button
                      key={sizeOption.id}
                      onClick={() => setSize(sizeOption.id)}
                      className={`p-3 border-2 flex flex-col items-center gap-2 rounded-[16px] ${
                        size === sizeOption.id 
                          ? "border-neutral-600 bg-neutral-100" 
                          : "border-neutral-300 bg-white"
                      }`}
                    >
                      <div className={`bg-neutral-200 rounded-[16px] flex items-center justify-center ${
                        sizeOption.id === "pequeño" ? "w-12 h-16" : sizeOption.id === "regular" ? "w-14 h-20" : "w-16 h-24"
                      }`}>
                        <span className="text-xs text-neutral-500">Cup</span>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium">{sizeOption.label}</p>
                        {sizeOption.price !== 0 && (
                          <p className="text-xs text-neutral-600">
                            {sizeOption.price > 0 ? '+' : ''}{sizeOption.price.toFixed(2)}
                          </p>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Milk selection */}
              <div className="mb-6">
                <h4 className="font-bold mb-3">Tipo de leche</h4>
                <div className="space-y-2">
                  {milkOptions.map((milkOption) => (
                    <button
                      key={milkOption.id}
                      onClick={() => setMilk(milkOption.id)}
                      className={`w-full p-3 border-2 flex items-center justify-between rounded-[16px] ${
                        milk === milkOption.id 
                          ? "border-neutral-600 bg-neutral-100" 
                          : "border-neutral-300 bg-white"
                      }`}
                    >
                      <span className="font-medium">{milkOption.label}</span>
                      {milk === milkOption.id && (
                        <div className="w-6 h-6 bg-neutral-600 flex items-center justify-center rounded-[16px]">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Extras */}
              <div className="mb-6">
                <h4 className="font-bold mb-1">Extras</h4>
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

            {/* Footer - Fixed */}
            <div className="p-6 pt-4 border-t border-neutral-200">
              <div className="flex gap-3">
                <button
                  onClick={() => setShowEditSheet(false)}
                  className="flex-1 py-3 bg-neutral-200 font-medium rounded-[16px]"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => setShowEditSheet(false)}
                  className="flex-1 py-3 bg-neutral-600 text-white font-bold rounded-[16px]"
                >
                  Guardar cambios
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}