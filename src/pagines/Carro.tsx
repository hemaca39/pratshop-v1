import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { LiniaCarro } from '../tipus';
import SelectorQuantitat from '../components/SelectorQuantitat';

type Props = {
  linies: LiniaCarro[];
  onCanviarUnitats: (id: string, novesUnitats: number) => void;
  onEliminar: (id: string) => void;
  onBuidar: () => void;
};

const Carro: React.FC<Props> = ({ linies, onCanviarUnitats, onEliminar, onBuidar }) => {
  const navigate = useNavigate();

  const totalImport = linies.reduce((sum, item) => sum + item.producte.preu * item.quantitat, 0);

  if (linies.length === 0) {
    return (
      <div>
        <h1>Tu Carrito está vacío 🛒</h1>
        <p>No tienes ningún videojuego en el carrito.</p>
        <Link to="/cataleg" style={{ color: 'var(--color-marca)', fontWeight: 'bold' }}>
          Ir al Catálogo
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Tu Carrito de Compras</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {linies.map((item) => (
          <div
            key={item.producte.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px',
              background: 'var(--color-superficie)',
              borderRadius: '8px',
              border: '1px solid var(--color-borde)',
            }}
          >
            <div>
              <h3>{item.producte.nom}</h3>
              <p>{item.producte.preu.toFixed(2)} € / unidad</p>
            </div>

            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <SelectorQuantitat
                valor={item.quantitat}
                maxim={item.producte.estoc}
                onCanvi={(val) => onCanviarUnitats(item.producte.id, val)}
              />
              <span style={{ fontWeight: 'bold', width: '80px', textAlign: 'right' }}>
                {(item.producte.preu * item.quantitat).toFixed(2)} €
              </span>
              <button
                onClick={() => onEliminar(item.producte.id)}
                style={{ background: 'var(--color-esgotat)', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}
              >
                X
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={onBuidar} style={{ background: 'transparent', color: 'var(--color-esgotat)', border: '1px solid var(--color-esgotat)', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' }}>
          Vaciar Carrito
        </button>

        <div>
          <h2>Total: {totalImport.toFixed(2)} €</h2>
          <button
            onClick={() => navigate('/compra')}
            style={{ padding: '12px 24px', background: 'var(--color-marca)', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Proceder al Pago
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carro;