import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom'; 
import { useCart } from '../CartContext';

// IMPORTAMOS FIREBASE
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

function HomePage() {
  const { agregarAlCarrito } = useCart();
  
  // Estado para guardar los productos que vienen de la nube
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Estados para filtros
  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");

  // 1. CARGAR DATOS DE FIREBASE AL INICIAR
  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        // Referencia a la colección "productos"
        const productosRef = collection(db, "productos");
        const snapshot = await getDocs(productosRef);
        
        // Convertimos los documentos de Firebase a un array normal
        const listaProductos = snapshot.docs.map(doc => ({
          ...doc.data(), // Esto trae: nombre, precio, imgUrl, id, etc.
          // OJO: Firebase tiene su propio ID raro, pero usaremos tu campo "id" numérico
        }));
        
        setProductos(listaProductos);
      } catch (error) {
        console.error("Error conectando a Firebase:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerProductos();
  }, []);

  // 2. Obtener categorías dinámicas (ej. "animals", "Ropa")
  const categorias = ["Todas", ...new Set(productos.map(p => p.categoria))];

  // 3. Filtrado
  const productosFiltrados = useMemo(() => {
    return productos.filter(prod => {
      // Usamos el operador ?. por si algún producto no tiene nombre o categoría
      const coincideNombre = prod.nombre?.toLowerCase().includes(busqueda.toLowerCase());
      const coincideCategoria = categoriaSeleccionada === "Todas" || prod.categoria === categoriaSeleccionada;
      return coincideNombre && coincideCategoria;
    });
  }, [busqueda, categoriaSeleccionada, productos]);

  if (cargando) {
    return (
      <div className="page-container" style={{textAlign:'center', padding: '50px'}}>
        <h2 style={{color: '#E83332'}}>Cargando tienda desde la nube... ☁️</h2>
      </div>
    );
  }

  return (
    <div className="page-container">
      {/* --- SECCIÓN DE BUSCADOR Y FILTROS --- */}
      <div className="filtros-container" style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
        <h2 style={{ margin: '0 0 15px 0', color: '#333' }}>🔍 Encuentra lo que buscas</h2>
        
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <input 
            type="text" 
            placeholder="Buscar producto..." 
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            style={{ flex: 1, padding: '10px', border: '1px solid #ddd', borderRadius: '4px', minWidth: '200px' }}
          />

          <select 
            value={categoriaSeleccionada}
            onChange={(e) => setCategoriaSeleccionada(e.target.value)}
            style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
          >
            {categorias.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <h1>Ofertas de Hoy ({productosFiltrados.length})</h1>
      
      <div className="catalogo">
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map(prod => (
            <div key={prod.id} className="producto-card">
              <Link to={`/producto/${prod.id}`}>
                <div className="product-image-container">
                  <img 
                    src={prod.imgUrl} 
                    alt={prod.nombre} 
                    className="product-image" 
                    onError={(e) => { 
                      e.target.onerror = null; 
                      e.target.src = "https://placehold.co/400x400/E83332/white?text=FOTO+PENDIENTE";
                    }}
                  />
                </div>
              </Link>
              
              <Link to={`/producto/${prod.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                <h3>{prod.nombre}</h3>
              </Link>
              
              {prod.categoria && (
                <span style={{ fontSize: '0.8em', backgroundColor: '#f0f0f0', padding: '3px 8px', borderRadius: '10px', color: '#666' }}>
                  {prod.categoria}
                </span>
              )}

              <p className="price-tag">MX${prod.precio}</p>
              
              <button onClick={() => agregarAlCarrito(prod)}>
                Añadir al Carrito
              </button>
            </div>
          ))
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '50px', color: '#666' }}>
            <h3>😕 No encontramos productos que coincidan con tu búsqueda.</h3>
            <button onClick={() => {setBusqueda(""); setCategoriaSeleccionada("Todas")}} style={{ marginTop: '10px', background: '#333' }}>
              Ver todo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;