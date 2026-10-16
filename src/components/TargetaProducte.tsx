import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import type { Producte } from '../tipus';
import styles from './TargetaProducte.module.css';

type Props = {
  producte: Producte;
};

const TargetaProducte: React.FC<Props> = ({ producte }) => {
  const isEsgotat = producte.estoc === 0;

  return (
    <div className={clsx(styles.targeta, isEsgotat && styles.esgotat)}>
      <div>
        <img src={producte.imatge} alt={producte.nom} className={styles.imatge} />
        <h3 className={styles.nom}>{producte.nom}</h3>
        <p>{producte.descripcio}</p>
      </div>
      <div>
        <div className={styles.preu}>{producte.preu.toFixed(2)} €</div>
        {isEsgotat ? (
          <span className={styles.textEsgotat}>Agotado</span>
        ) : (
          <Link to={`/producte/${producte.id}`} className={styles.botoDetall}>
            Ver detalles
          </Link>
        )}
      </div>
    </div>
  );
};

export default TargetaProducte;