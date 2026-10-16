import React from 'react';
import { PRODUCTES } from '../dades/productes';
import TargetaProducte from '../components/TargetaProducte';

const Inici: React.FC = () => {
  const destacats = PRODUCTES.filter((p) => p.destacat);

  return (
    <div>
      <h1>Bienvenido a GamerZone 🎮</h1>
      <p>Tu tienda definitiva de videojuegos. Encuentra las mejores ofertas en títulos de RPG, Acción, Aventura y Estrategia.</p>

      <h2>Productos Destacados</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        {destacats.map((p) => (
          <TargetaProducte key={p.id} producte={p} />
        ))}
      </div>
    </div>
  );
};

export default Inici;