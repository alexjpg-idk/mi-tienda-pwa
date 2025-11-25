import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { useCart } from '../CartContext';

// IMPORTAMOS FIREBASE
import { db } from '../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { agregarAlCarrito } = useCart();

  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);

  // EFECTO: Buscar el producto en Firebase cuando carga la página
  useEffect(() => {
    const buscarProducto = async () => {
      try {
        const idNumerico = parseInt(id);
        const productosRef = collection(db, "productos");
        const q = query(productosRef, where("id", "==", idNumerico));
        
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          const docData = snapshot.docs[0].data();
          setProducto(docData);
        } else {
          setProducto(null); 
        }
      } catch (error) {
        console.error("Error buscando producto en Firebase:", error);
      } finally {
        setCargando(false);
      }
    };

    buscarProducto();
  }, [id]);

  if (cargando) {
    return (
      <div className="page-container" style={{textAlign:'center', padding: '50px'}}>
        <h2 style={{color: '#E83332'}}>Cargando detalles... ⏳</h2>
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="page-container" style={{textAlign: 'center', padding: '50px'}}>
        <h1>Producto no encontrado (404)</h1>
        <p>No existe un producto con el ID {id} en la base de datos.</p>
        <button onClick={() => navigate('/')} style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}>
            Volver a la tienda
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    agregarAlCarrito(producto);
    alert(`¡"${producto.nombre}" agregado al carrito!`);
  }

  return (
    <div className="page-container">
        {/* INYECTAMOS ESTILOS CSS PARA RESPONSIVIDAD */}
        <style>{`
          /* Estilo Base (PC y Tablets grandes) */
          .product-detail-layout {
            display: flex;
            gap: 40px;
            align-items: flex-start;
          }

          .detail-image-container {
            flex: 1;
            max-width: 500px;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            padding: 10px;
            background-color: #fff;
          }

          .detail-info-container {
            flex: 1;
            padding-top: 10px;
          }

          .product-title {
            font-size: 2em;
            color: #333;
            margin: 10px 0;
            line-height: 1.2;
          }

          .product-price {
            font-size: 2.5em;
            color: #E83332;
            font-weight: bold;
            margin: 15px 0;
          }

          .action-buttons {
            display: flex;
            gap: 15px;
            margin-top: 30px;
          }

          .btn-add, .btn-cart {
            flex: 1;
            padding: 15px;
            font-size: 1.1em;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-weight: bold;
            transition: opacity 0.2s;
          }

          .btn-add {
            background-color: #ff9100; /* Naranja AliExpress */
            color: white;
          }

          .btn-cart {
            background-color: #E83332; /* Rojo AliExpress */
            color: white;
          }

          /* --- MEDIA QUERY: MÓVIL (Pantallas menores a 768px) --- */
          @media (max-width: 768px) {
            .product-detail-layout {
              flex-direction: column; /* Cambia a columna vertical */
              gap: 20px;
            }

            .detail-image-container {
              max-width: 100%; /* Imagen ocupa todo el ancho */
              width: 100%;
              border: none; /* Quitamos borde en móvil para look más limpio */
              padding: 0;
            }

            .product-title {
              font-size: 1.5em; /* Título un poco más pequeño */
            }

            .product-price {
              font-size: 2em;
            }

            .action-buttons {
              flex-direction: column; /* Botones uno encima del otro */
              position: fixed; /* Opcional: Fijar botones abajo estilo App */
              bottom: 0;
              left: 0;
              right: 0;
              background: white;
              padding: 15px;
              box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
              margin: 0;
              z-index: 100;
            }
            
            /* Ajuste para que el contenido no quede tapado por los botones fijos */
            .detail-info-container {
              padding-bottom: 100px; 
            }
          }
        `}</style>

        <button 
            onClick={() => navigate('/')} 
            style={{ background: 'transparent', color: '#666', border: 'none', marginBottom: '20px', padding: 0, textDecoration: 'underline', cursor: 'pointer' }}
        >
            &larr; Volver a ofertas
        </button>

      <div className="product-detail-layout">
        
        {/* COLUMNA 1: IMAGEN */}
        <div className="detail-image-container">
          <img 
            src={producto.imgUrl} 
            alt={producto.nombre} 
            style={{ width: '100%', height: 'auto', borderRadius: '8px', display: 'block' }}
            onError={(e) => { 
                e.target.onerror = null; 
                e.target.src = "[https://placehold.co/400x400/E83332/white?text=FOTO+PENDIENTE](https://placehold.co/400x400/E83332/white?text=FOTO+PENDIENTE)";
            }}
          />
        </div>
        
        {/* COLUMNA 2: INFORMACIÓN */}
        <div className="detail-info-container">
          <span style={{ backgroundColor: '#f5f5f5', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8em', color: '#666', textTransform: 'uppercase' }}>
            {producto.categoria || 'General'}
          </span>
          
          <h1 className="product-title">{producto.nombre}</h1>
          
          <div className="product-price">
            MX${producto.precio}
            <span style={{ fontSize: '0.4em', color: '#999', fontWeight: 'normal', marginLeft: '10px' }}>
                Impuestos incluidos
            </span>
          </div>

          <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#fafafa', borderRadius: '8px', border: '1px solid #eee' }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#333', fontSize: '1.1em' }}>Descripción</h3>
            <p style={{ lineHeight: '1.6', color: '#555', margin: 0 }}>
                {producto.descripcion || "Sin descripción disponible."}
            </p>
          </div>

          {/* Botones de Acción (Se adaptan con CSS) */}
          <div className="action-buttons">
            <button onClick={handleAddToCart} className="btn-add">
                Añadir al Carrito
            </button>
            
            <button onClick={() => navigate('/carrito')} className="btn-cart">
                Ir a Pagar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;