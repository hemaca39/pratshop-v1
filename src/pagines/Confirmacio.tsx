import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Confirmacio: React.FC = () => {
  const [numComanda] = useState(() => Math.floor(100000 + Math.random() * 900000));

  return (
    <div style={{ textAlign: 'center', padding: '40px 0' }}>
      <h1>¡Gracias por tu compra! 🎉</h1>
      <p style={{ fontSize: '1.2rem' }}>Tu pedido ha sido procesado correctamente.</p>
      <div style={{ margin: '20px 0', padding: '16px', background: 'var(--color-superficie)', display: 'inline-block', borderRadius: '8px' }}>
        <strong>Número de pedido:</strong> #{numComanda}
      </div>
      <br />
      <Link to="/" style={{ color: 'var(--color-marca)', fontWeight: 'bold' }}>
        Volver al Inicio
      </Link>
    </div>
  );
};

export default Confirmacio;