import { useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface LocationState {
  product?: {
    name: string;
    price: number;
  };
  total?: string;
}

export function PostPurchaseFeedback() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  const product = state?.product || { name: "Cappuccino" };
  const [showModal, setShowModal] = useState(false);

  const handleNewOrder = () => {
    window.scrollTo(0, 0);
    navigate("/");
  };
  useEffect(() => {
  const timer = setTimeout(() => {
    setShowModal(true);
  }, 3000);

  return () => clearTimeout(timer);
}, []);
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col"  style={{paddingTop:"160px"}}>

        {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b-2 border-neutral-200 p-4 z-10 "style={{height:"74px"}}>
        <div className="flex items-center justify-center gap-3"> 
          <h1 className="text-xl font-bold">Detalle de tu compra</h1>
        </div>
      </div>

      {/* Banner */}
      <div className="fixed left-0 right-0 bg-neutral-200 text-neutral-800 p-4 mb-2 flex items-center gap-3" style={{top: "74px"}}>
        <div className="w-10 h-10 bg-neutral-300 rounded-full flex items-center justify-center flex-shrink-0">
        </div>
        <div>
          <p className="font-bold text-lg">Estamos trabajando en tu pedido</p>
          <p className="text-sm">Tiempo estimado de entrega 25 min.</p>
        </div>
      </div>  

      {/* Tracking info */}
      <div className="bg-white border-2 border-neutral-200 m-4 mb-2 p-4 rounded-[16px]">
        <h3 className="font-bold mb-3">Estado del pedido</h3>
        <div className="flex items-start gap-3">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-neutral-600 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            <div className="w-0.5 h-12 bg-neutral-300"></div>
          </div>
          <div className="flex-1 pb-3">
            <p className="font-bold">Confirmado</p>
            <p className="text-sm text-neutral-600">
              Tu pedido fue recibido
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-neutral-300 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-neutral-100 rounded-full"></div>
            </div>
            <div className="w-0.5 h-12 bg-neutral-300"></div>
          </div>
          <div className="flex-1 pb-3">
            <p className="font-bold text-neutral-400">
              En preparación
            </p>
            <p className="text-sm text-neutral-400">
              Próximo paso
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-neutral-300 rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-neutral-100 rounded-full"></div>
          </div>
          <div className="flex-1">
            <p className="font-bold text-neutral-400">
              Entregado
            </p>
            <p className="text-sm text-neutral-400">
              15-20 min
            </p>
          </div>
        </div>
      </div>

      {/* Order info */}
      <div className="bg-white border-2 border-neutral-200 m-4 mt-2 p-4 rounded-[16px]">
        <p className="text-lg text-neutral-900 mb-3 font-bold">
         Detalles del pedido
        </p>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-neutral-600">Producto:</span>
            <span className="font-bold">{product.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-600">
              Número de pedido:
            </span>
            <span className="font-medium">#A-2847</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-600">
              Método de pago:
            </span>
            <span className="font-medium">
              Tarjeta •••• 4767
            </span>
          </div>
          <div className="flex justify-between pt-2 border-t-2 border-neutral-200">
            <span className="font-bold">Total pagado:</span>
            <span className="font-bold text-lg">$3.20</span>
          </div>
        </div>
      </div> 
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-left justify-left px-4"  style={{backgroundColor:"rgba(0,0,0,0.7)"}}>
            <div className="bg-white w-full rounded-t-3xl p-6 animate-fadeIn fixed bottom-0 left-0 right-0">
              
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-neutral-800"
              >
                ✕
              </button>

              <p className="text-sm text-neutral-800 font-semibold mb-3">
                Sumaste +1 estrella
              </p>

              <div className="w-16 h-16 bg-neutral-200 rounded-full mb-4">
               
              </div>

              <h2 className="text-lg font-bold text-left mb-2">
                ¡Felicidades, conseguiste una nueva estrella!
              </h2>

              <p className="text-sm text-neutral-600 text-left mb-6">
                Has ganado una estrella con tu compra. Ahora llevas 8 acumuladas. Al alcanzar 10, recibirás un bono de $2,00 en tu cuenta.              
              </p>

              <button className="w-full py-3 text-white bg-neutral-600 font-bold rounded-full">
                Ver mis estrellas
              </button>
            </div>
          </div>
        )}
      {/* Action buttons */}
      <div className="p-4 space-y-3 pb-6">
        <button
          onClick={handleNewOrder}
          className="w-full py-3 bg-neutral-600 text-white font-bold text-lg hover:bg-neutral-700 transition-colors rounded-[16px]"
        >
         Ir al inicio
        </button>
        <button 
            onClick={() => navigate("/seleccionar-producto")}
            className="w-full py-3 bg-white border-2 border-neutral-300 font-bold text-lg hover:bg-neutral-100 transition-colors rounded-[16px]">
          Realizar otro pedido
        </button>
      </div>
    </div>
  );
 
}
