import { useNavigate } from "react-router-dom";
export function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-neutral-50" style={{paddingBottom: "70px"}}>
      {/* Brand */}
      <div className="p-6">
        <h1 className="text-2xl font-serif italic text-neutral-700">Sweet & Coffee</h1>
      </div>

      {/* User greeting */}
      <div className="mx-4 p-4 bg-white border-2 border-neutral-200 rounded-[16px] flex items-center gap-3">
        <div className="w-14 h-14 bg-neutral-300 rounded-[16px] flex items-center justify-center">
          <span className="text-xs text-neutral-600">Avatar</span>
        </div>
        <div>
          <p className="font-bold">Hola, Mayra Romero</p>
          <p className="text-sm text-neutral-600">¿Sweet o coffee?... Elige tu mood :)</p>
        </div>
      </div>

      {/* Account section */}
      <div className="px-4 pt-6 pb-3">
        <h2 className="text-sm font-bold text-neutral-600">Cuenta</h2>
      </div>

      {/* Gamification banner */}
      <div className="mx-4 p-4 bg-neutral-500 text-white rounded-[16px] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-neutral-300 rounded-full flex items-center justify-center">
          </div>
          <div>
            <p className="text-sm font-medium">Empieza tu día con un cappuccino</p>
            <p className="text-xs opacity-90">y gana tu próxima estrella para subir de rango</p>
          </div>
        </div>
        <button className="w-6 h-6 flex items-center justify-center">
          <span className="text-lg">×</span>
        </button>
      </div>

      {/* Coffee wallet */}
      <div className="mx-4 mt-4 bg-white border-2 border-neutral-300 rounded-[16px] overflow-hidden">
        <div className="bg-neutral-600 text-white p-3 flex items-center justify-between">
          <p className="font-bold">Coffee wallet</p>
          <div className="flex items-center gap-1">
            <div className="w-5 h-5 bg-neutral-300 rounded-full flex items-center justify-center">
              <span className="text-xs text-neutral-600">★</span>
            </div>
            <span className="font-bold">8/10</span>
          </div>
        </div>
        <div className="p-4">
          <p className="text-sm text-neutral-600 mb-1">Saldo total:</p>
          <div className="flex items-end gap-2">
            <p className="text-3xl font-bold">$27.18</p>
            <p className="text-sm text-neutral-600 mb-1">+ $4.00 en saldo ganado</p>
          </div>
        </div>
      </div>

      {/* Actions section */}
      <div className="px-4 pt-6 pb-3">
        <h2 className="text-sm font-bold text-neutral-600">Acciones</h2>
      </div>

      {/* Action cards */}
      <div className="px-4 grid grid-cols-2 gap-3 pb-6">
        <button
          onClick={() => navigate("/seleccionar-producto")}
          className="bg-white border-2 border-neutral-300 rounded-[16px] p-4 text-left hover:border-neutral-500 transition-colors"
        >
          <div className="w-12 h-12 bg-neutral-200 rounded-[16px] mb-3 flex items-center justify-center">
            <span className="text-xs text-neutral-600">Cart</span>
          </div>
          <p className="font-bold mb-1">Hacer un pedido</p>
          <p className="text-xs text-neutral-600">A domicilio o para consumir en el local</p>
        </button>

        <button className="bg-white border-2 border-neutral-300 rounded-[16px] p-4 text-left">
          <div className="w-12 h-12 bg-neutral-200 rounded-[16px] mb-3 flex items-center justify-center">
            <span className="text-xs text-neutral-600">Card</span>
          </div>
          <p className="font-bold mb-1">Recargar saldo</p>
          <p className="text-xs text-neutral-600">Con tarjeta de crédito, débito o gift-card</p>
        </button>

        <button className="bg-white border-2 border-neutral-300 rounded-[16px] p-4 text-left">
          <div className="w-12 h-12 bg-neutral-200 rounded-[16px] mb-3 flex items-center justify-center">
            <span className="text-xs text-neutral-600">Gift</span>
          </div>
          <p className="font-bold mb-1">Enviar e-gift</p>
          <p className="text-xs text-neutral-600">Tarjeta digital con saldo válido en la app</p>
        </button>

        <button className="bg-neutral-600 text-white rounded-[16px] p-4 text-left">
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-[16px] mb-3 flex items-center justify-center">
            <span className="text-xs">Code</span>
          </div>
          <p className="font-bold mb-1">Mostrar código</p>
          <p className="text-xs opacity-90">Registra tu compra y gana estrellas</p>
        </button>
      </div>

      {/* Bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-neutral-200 flex items-center justify-around py-3">
        <button className="flex flex-col items-center gap-1">
          <div className="w-6 h-6 bg-neutral-600 rounded-[8px]"></div>
          <span className="text-xs font-medium">Inicio</span>
        </button>
        <button className="flex flex-col items-center gap-1">
          <div className="w-6 h-6 bg-neutral-300 rounded-[8px]"></div>
          <span className="text-xs text-neutral-500">Estrellas</span>
        </button>
        <button className="flex flex-col items-center gap-1">
          <div className="w-6 h-6 bg-neutral-300 rounded-[8px]"></div>
          <span className="text-xs text-neutral-500">Cupones</span>
        </button>
        <button className="flex flex-col items-center gap-1">
          <div className="w-6 h-6 bg-neutral-300 rounded-[8px]"></div>
          <span className="text-xs text-neutral-500">Locales</span>
        </button>
        <button className="flex flex-col items-center gap-1">
          <div className="w-6 h-6 bg-neutral-300 rounded-[8px]"></div>
          <span className="text-xs text-neutral-500">Promos</span>
        </button>
      </div>
    </div>
  );
}