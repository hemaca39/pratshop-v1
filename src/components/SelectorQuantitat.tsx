import React from 'react';
import styles from './SelectorQuantitat.module.css';

type Props = {
  valor: number;
  minim?: number; // por defecto 1
  maxim: number;  // stock del producto
  onCanvi: (nouValor: number) => void;
};

const SelectorQuantitat: React.FC<Props> = ({ valor, minim = 1, maxim, onCanvi }) => {
  const decrementar = () => {
    if (valor > minim) onCanvi(valor - 1);
  };

  const incrementar = () => {
    if (valor < maxim) onCanvi(valor + 1);
  };

  return (
    <div className={styles.selector}>
      <button type="button" onClick={decrementar} disabled={valor <= minim}>-</button>
      <span className={styles.valor}>{valor}</span>
      <button type="button" onClick={incrementar} disabled={valor >= maxim}>+</button>
    </div>
  );
};

export default SelectorQuantitat;