import React from 'react';
import { Link } from 'react-router-dom';

const NoTrobada: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', padding: '40px 0' }}>
      <h1>404 - Página no encontrada 😕</h1>
      <p>La dirección que buscas no existe o ha sido movida.</p>
      <Link to="/" style={{ color: 'var(--color-marca)', fontWeight: 'bold' }}>
        Volver a la Página Principal
      </Link>
    </div>
  );
};

export default NoTrobada;