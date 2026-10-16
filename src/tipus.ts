export type Categoria = 'Acción' | 'RPG' | 'Aventura' | 'Estrategia';

export type Producte = {
  id: string;
  nom: string;
  descripcio: string;
  preu: number;
  categoria: Categoria;
  estoc: number;
  imatge: string;
  destacat?: boolean;
};

export type LiniaCarro = {
  producte: Producte;
  quantitat: number;
};