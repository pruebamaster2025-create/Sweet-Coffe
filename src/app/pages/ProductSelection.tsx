import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

const products = [
  { id: 1, name: "Cappuccino", price: 2.2, category: "bebida", isRecommended: true },
  { id: 2, name: "Latte", price: 2.5, category: "bebida", isRecommended: true },
  { id: 3, name: "Americano", price: 1.8, category: "bebida", isRecommended: true },
  { id: 4, name: "Espresso", price: 1.5, category: "bebida", isRecommended: false },
  { id: 5, name: "Mocha", price: 3.0, category: "bebida", isRecommended: false },
  { id: 6, name: "Croissant", price: 3.0, category: "postre", isRecommended: true },
  { id: 7, name: "Muffin", price: 2.5, category: "postre", isRecommended: false },
  { id: 8, name: "Brownie", price: 3.2, category: "postre", isRecommended: false },
  { id: 9, name: "Cheesecake", price: 4.0, category: "postre", isRecommended: false },
];

export function ProductSelection() {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [activeCategory, setActiveCategory] = useState("recomendados");
  const [searchValue, setSearchValue] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleProductSelect = (product: typeof products[0]) => {
    window.scrollTo(0, 0);
    setSelectedProduct(product);
    navigate("/personalizar", { state: { product } });
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
    setSearchValue("Cappuccino");
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
  };

  useEffect(() => {
    if (isSearchFocused && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchFocused]);

  const getFilteredProducts = () => {
    // If searching, filter by search value
    if (searchValue) {
      return products.filter(p => 
        p.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    // Filter by category
    switch (activeCategory) {
      case "bebidas":
        return products.filter(p => p.category === "bebida").slice(0, 4);
      case "postres":
        return products.filter(p => p.category === "postre").slice(0, 4);
      case "recomendados":
        return products.filter(p => p.isRecommended).slice(0, 4);
      case "todos":
      default:
        return [];
    }
  };

  const filteredProducts = getFilteredProducts();

  // For "Todos" category, get separate sections
  const recommendedProducts = products.filter(p => p.isRecommended).slice(0, 4);
  const bebidasProducts = products.filter(p => p.category === "bebida").slice(0, 4);
  const postresProducts = products.filter(p => p.category === "postre").slice(0, 4);

  return (
    <div className="min-h-screen bg-neutral-50" style={{paddingTop: "74px"}} >
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b-2 border-neutral-200 p-4 z-10 ">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate("/")}
            className="w-10 h-10 bg-neutral-200 flex items-center justify-center rounded-[16px]"
          >
            <span className="text-lg">←</span>
          </button>
          <h1 className="text-xl font-bold">Seleccionar producto</h1>
        </div>
      </div>

      {/* Info banner */}
      <div className="bg-neutral-500 text-white p-4 m-4 flex items-start gap-3 rounded-[16px]">
        <div className="w-8 h-8 bg-neutral-300 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
        </div>
        <div className="flex-1">
          <p className="font-medium mb-1">Gana recompensas con cada compra</p>
          <p className="text-sm opacity-90">Acumula estrellas y sube de nivel</p>
        </div>
      </div>

      {/* Quick action */}
      <div className="m-4 p-4 bg-white border-2 border-neutral-200 rounded-[16px]">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-neutral-200 flex items-center justify-center flex-shrink-0 rounded-[16px]">
            <span className="text-xs text-neutral-600">Repeat</span>
          </div>
          <div className="flex-1">
            <p className="font-bold">Repetir último pedido</p>
            <p className="text-sm text-neutral-600">Cappuccino + Croissant</p>
          </div>
          <button className="px-4 py-2 bg-neutral-600 text-white font-medium rounded-[16px]">
            $5.20
          </button>
        </div>
      </div>

      {/* Search bar */}
      <div className="mx-4 mb-4">
        <div className="relative">
          <input
            ref={searchInputRef}
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
            placeholder="Buscar productos..."
            className="w-full p-4 pr-12 bg-white border-2 border-neutral-300 rounded-[16px] focus:outline-none focus:border-neutral-600"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-neutral-300 rounded-full">
          </div>
        </div>
      </div>

      {/* Category tabs */}
      <div className="px-4 mb-4">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button 
            onClick={() => {
              setActiveCategory("recomendados");
              setSearchValue("");
            }}
            className={`px-4 py-2 font-medium whitespace-nowrap rounded-[999px] ${
              activeCategory === "recomendados" 
                ? "bg-neutral-600 text-white" 
                : "bg-white border-2 border-neutral-300"
            }`}
          >
            Recomendados
          </button>
          <button 
            onClick={() => {
              setActiveCategory("todos");
              setSearchValue("");
            }}
            className={`px-4 py-2 font-medium whitespace-nowrap rounded-[999px] ${
              activeCategory === "todos" 
                ? "bg-neutral-600 text-white" 
                : "bg-white border-2 border-neutral-300"
            }`}
          >
            Todos
          </button>
          <button 
            onClick={() => {
              setActiveCategory("bebidas");
              setSearchValue("");
            }}
            className={`px-4 py-2 font-medium whitespace-nowrap rounded-[999px] ${
              activeCategory === "bebidas" 
                ? "bg-neutral-600 text-white" 
                : "bg-white border-2 border-neutral-300"
            }`}
          >
            Bebidas
          </button>
          <button 
            onClick={() => {
              setActiveCategory("postres");
              setSearchValue("");
            }}
            className={`px-4 py-2 font-medium whitespace-nowrap rounded-[999px] ${
              activeCategory === "postres" 
                ? "bg-neutral-600 text-white" 
                : "bg-white border-2 border-neutral-300"
            }`}
          >
            Postres
          </button>
        </div>
      </div>

      {/* Products section */}
      <div className="px-4 pb-6">
        {/* Search results */}
        {searchValue && (
          <>
            <div className="flex items-center gap-2 mb-3">
              <h2 className="font-bold">Resultados de búsqueda</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {filteredProducts.map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleProductSelect(product)}
                  className="bg-white border-2 border-neutral-300 p-4 text-left hover:border-neutral-500 transition-colors rounded-[16px]"
                >
                  <div className="w-full h-24 bg-neutral-200 mb-3 flex items-center justify-center rounded-[16px]">
                    <span className="text-sm text-neutral-500">Imagen</span>
                  </div>
                  <p className="font-bold mb-1">{product.name}</p>
                  <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
                </button>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-8">
                <p className="text-neutral-500">No se encontraron productos</p>
              </div>
            )}
          </>
        )}

        {/* Todos category - show all sections */}
        {!searchValue && activeCategory === "todos" && (
          <>
            {/* Recomendados section */}
            <div className="mb-6">
              <h2 className="font-bold mb-3">Recomendados</h2>
              <div className="grid grid-cols-2 gap-3">
                {recommendedProducts.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleProductSelect(product)}
                    className="bg-white border-2 border-neutral-300 p-4 text-left hover:border-neutral-500 transition-colors rounded-[16px]"
                  >
                    <div className="w-full h-24 bg-neutral-200 mb-3 flex items-center justify-center rounded-[16px]">
                      <span className="text-sm text-neutral-500">Imagen</span>
                    </div>
                    <p className="font-bold mb-1">{product.name}</p>
                    <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Bebidas section */}
            <div className="mb-6">
              <h2 className="font-bold mb-3">Bebidas</h2>
              <div className="grid grid-cols-2 gap-3">
                {bebidasProducts.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleProductSelect(product)}
                    className="bg-white border-2 border-neutral-300 p-4 text-left hover:border-neutral-500 transition-colors rounded-[16px]"
                  >
                    <div className="w-full h-24 bg-neutral-200 mb-3 flex items-center justify-center rounded-[16px]">
                      <span className="text-sm text-neutral-500">Imagen</span>
                    </div>
                    <p className="font-bold mb-1">{product.name}</p>
                    <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Postres section */}
            <div>
              <h2 className="font-bold mb-3">Postres</h2>
              <div className="grid grid-cols-2 gap-3">
                {postresProducts.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleProductSelect(product)}
                    className="bg-white border-2 border-neutral-300 p-4 text-left hover:border-neutral-500 transition-colors rounded-[16px]"
                  >
                    <div className="w-full h-24 bg-neutral-200 mb-3 flex items-center justify-center rounded-[16px]">
                      <span className="text-sm text-neutral-500">Imagen</span>
                    </div>
                    <p className="font-bold mb-1">{product.name}</p>
                    <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Other categories - single section */}
        {!searchValue && activeCategory !== "todos" && (
          <>
            <div className="flex items-center gap-2 mb-3">
              <h2 className="font-bold">
                {activeCategory === "recomendados" 
                  ? "Más pedidos" 
                  : activeCategory === "bebidas"
                    ? "Bebidas"
                    : "Postres"}
              </h2>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {filteredProducts.map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleProductSelect(product)}
                  className="bg-white border-2 border-neutral-300 p-4 text-left hover:border-neutral-500 transition-colors rounded-[16px]"
                >
                  <div className="w-full h-24 bg-neutral-200 mb-3 flex items-center justify-center rounded-[16px]">
                    <span className="text-sm text-neutral-500">Imagen</span>
                  </div>
                  <p className="font-bold mb-1">{product.name}</p>
                  <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}