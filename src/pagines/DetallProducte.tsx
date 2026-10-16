import React, { useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { PRODUCTES } from '../dades/productes';
import type { Producte } from '../tipus';
import SelectorQuantitat from '../components/SelectorQuantitat';

type Props = {
  onAfegir: (producte: Producte, quantitat: number) => void;
};

const DetallProducte: React.FC<Props> = ({ onAfegir }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const producte = PRODUCTES.find((p) => p.id === id);

  const [quantitat, setQuantitat] = useState(1);

  if (!producte) {
    return <Navigate to="/404" replace />;
  }

  const handleAfegir = () => {
    onAfegir(producte, quantitat);
    navigate('/carro');
  };

  return (
    <div>
      <button onClick={() => navigate(-1)} style={{ marginBottom: '16px', cursor: 'pointer', padding: '6px 12px' }}>
        ← Volver
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
        <img src={producte.imatge} alt={producte.nom} style={{ width: '100%', borderRadius: '8px' }} />
        <div>
          <h1>{producte.nom}</h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--color-marca)' }}>Categoría: {producte.categoria}</p>
          <p>{producte.descripcio}</p>
          <h2 style={{ color: 'var(--color-preu)' }}>{producte.preu.toFixed(2)} €</h2>
          <p>Stock disponible: {producte.estoc}</p>

          {producte.estoc > 0 ? (
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginTop: '24px' }}>
              <SelectorQuantitat valor={quantitat} maxim={producte.estoc} onCanvi={setQuantitat} />
              <button
                onClick={handleAfegir}
                style={{ padding: '10px 20px', background: 'var(--color-marca)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Añadir al Carrito
              </button>
            </div>
          ) : (
            <p style={{ color: 'var(--color-esgotat)', fontWeight: 'bold' }}>Producto sin stock.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetallProducte;