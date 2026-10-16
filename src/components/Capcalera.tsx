import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Capcalera.module.css';

type Props = {
  unitatsTotals: number;
};

const Capcalera: React.FC<Props> = ({ unitatsTotals }) => {
  return (
    <header className={styles.capcalera}>
      <NavLink to="/" className={styles.logo}>
        🎮 GamerZone
      </NavLink>
      <nav className={styles.nav}>
        <NavLink to="/" className={({ isActive }) => (isActive ? styles.actiu : styles.link)}>
          Inicio
        </NavLink>
        <NavLink to="/cataleg" className={({ isActive }) => (isActive ? styles.actiu : styles.link)}>
          Catálogo
        </NavLink>
        <NavLink to="/carro" className={({ isActive }) => (isActive ? styles.actiu : styles.link)}>
          Carrito {unitatsTotals > 0 && <span className={styles.globus}>{unitatsTotals}</span>}
        </NavLink>
      </nav>
    </header>
  );
};

export default Capcalera;