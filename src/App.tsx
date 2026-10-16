import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import type { LiniaCarro, Producte } from './tipus';
import Disposicio from './components/Disposicio';
import Inici from './pagines/Inici';
import Cataleg from './pagines/Cataleg';
import DetallProducte from './pagines/DetallProducte';
import Carro from './pagines/Carro';
import Compra from './pagines/Compra';
import Confirmacio from './pagines/Confirmacio';
import NoTrobada from './pagines/NoTrobada';

export function App() {
  const [carro, setCarro] = useState<LiniaCarro[]>(() => {
    try {
      const deLocal = localStorage.getItem('pratshop_carro');
      return deLocal ? JSON.parse(deLocal) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('pratshop_carro', JSON.stringify(carro));
  }, [carro]);

  const unitatsTotals = carro.reduce((acc, item) => acc + item.quantitat, 0);

  const afegirAlCarro = (producte: Producte, quantitat: number) => {
    setCarro((prev) => {
      const existeix = prev.find((item) => item.producte.id === producte.id);
      if (existeix) {
        return prev.map((item) =>
          item.producte.id === producte.id
            ? { ...item, quantitat: Math.min(item.quantitat + quantitat, producte.estoc) }
            : item
        );
      }
      return [...prev, { producte, quantitat }];
    });
  };

  const canviarUnitats = (id: string, novesUnitats: number) => {
    setCarro((prev) =>
      prev.map((item) => (item.producte.id === id ? { ...item, quantitat: novesUnitats } : item))
    );
  };

  const eliminarLinia = (id: string) => {
    setCarro((prev) => prev.filter((item) => item.producte.id !== id));
  };

  const buidarCarro = () => {
    setCarro([]);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Disposicio unitatsTotals={unitatsTotals} />}>
          <Route index element={<Inici />} />
          <Route path="cataleg" element={<Cataleg />} />
          <Route path="producte/:id" element={<DetallProducte onAfegir={afegirAlCarro} />} />
          <Route
            path="carro"
            element={
              <Carro
                linies={carro}
                onCanviarUnitats={canviarUnitats}
                onEliminar={eliminarLinia}
                onBuidar={buidarCarro}
              />
            }
          />
          <Route path="compra" element={<Compra linies={carro} onCompraFeta={buidarCarro} />} />
          <Route path="confirmacio" element={<Confirmacio />} />
          <Route path="*" element={<NoTrobada />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;