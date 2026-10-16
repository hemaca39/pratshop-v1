import React from 'react';
import { Outlet } from 'react-router-dom';
import Capcalera from './Capcalera';

type Props = {
  unitatsTotals: number;
};

const Disposicio: React.FC<Props> = ({ unitatsTotals }) => {
  return (
    <div>
      <Capcalera unitatsTotals={unitatsTotals} />
      <main style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Disposicio;