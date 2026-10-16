import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCTES } from '../dades/productes';
import TargetaProducte from '../components/TargetaProducte';
import type { Categoria } from '../tipus';

const categories: Categoria[] = ['Acción', 'RPG', 'Aventura', 'Estrategia'];

const Cataleg: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const cerca = searchParams.get('cerca') || '';
  const categoriaFiltre = searchParams.get('categoria') || '';

  const actualitzarCerca = (text: string) => {
    setSearchParams((prev) => {
      if (text) prev.set('cerca', text);
      else prev.delete('cerca');
      return prev;
    });
  };

  const actualitzarCategoria = (cat: string) => {
    setSearchParams((prev) => {
      if (cat) prev.set('categoria', cat);
      else prev.delete('categoria');
      return prev;
    });
  };

  const productesFiltrats = PRODUCTES.filter((p) => {
    const coincideixNom = p.nom.toLowerCase().includes(cerca.toLowerCase());
    const coincideixCategoria = categoriaFiltre ? p.categoria === categoriaFiltre : true;
    return coincideixNom && coincideixCategoria;
  });

  return (
    <div>
      <h1>Catálogo de Videojuegos</h1>

      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={cerca}
          onChange={(e) => actualitzarCerca(e.target.value)}
          style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--color-borde)', background: 'var(--color-superficie)', color: 'white' }}
        />

        <select
          value={categoriaFiltre}
          onChange={(e) => actualitzarCategoria(e.target.value)}
          style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--color-borde)', background: 'var(--color-superficie)', color: 'white' }}
        >
          <option value="">Todas las categorías</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <p>{productesFiltrats.length} de {PRODUCTES.length} productos</p>

      {productesFiltrats.length === 0 ? (
        <p>No se han encontrado videojuegos con estos filtros.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          {productesFiltrats.map((p) => (
            <TargetaProducte key={p.id} producte={p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Cataleg;