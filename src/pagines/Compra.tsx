import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import type { LiniaCarro } from '../tipus';

type Props = {
  linies: LiniaCarro[];
  onCompraFeta: () => void;
};

type FormData = {
  nom: string;
  correu: string;
  adreca: string;
  codiPostal: string;
  metodePagament: string;
  condicions: boolean;
};

type Errors = Partial<Record<keyof FormData, string>>;

const Compra: React.FC<Props> = ({ linies, onCompraFeta }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState<FormData>({
    nom: '',
    correu: '',
    adreca: '',
    codiPostal: '',
    metodePagament: 'targeta',
    condicions: false,
  });

  const [errors, setErrors] = useState<Errors>({});

  if (linies.length === 0) {
    return <Navigate to="/carro" replace />;
  }

  const validar = (): boolean => {
    const nousErrors: Errors = {};

    if (!form.nom.trim()) nousErrors.nom = 'El nombre es obligatorio.';
    if (!form.correu.includes('@')) nousErrors.correu = 'Correo electrónico no válido.';
    if (!form.adreca.trim()) nousErrors.adreca = 'La dirección es obligatoria.';
    if (!/^\d{5}$/.test(form.codiPostal)) nousErrors.codiPostal = 'El código postal debe tener 5 dígitos.';
    if (!form.condicions) nousErrors.condicions = 'Debes aceptar las condiciones.';

    setErrors(nousErrors);
    return Object.keys(nousErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validar()) {
      onCompraFeta();
      navigate('/confirmacio');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1>Finalizar Compra</h1>

      <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label>Nombre Completo:</label>
          <input
            type="text"
            value={form.nom}
            onChange={(e) => setForm({ ...form, nom: e.target.value })}
            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
          />
          {errors.nom && <span style={{ color: 'var(--color-esgotat)', fontSize: '0.85rem' }}>{errors.nom}</span>}
        </div>

        <div>
          <label>Correo Electrónico:</label>
          <input
            type="email"
            value={form.correu}
            onChange={(e) => setForm({ ...form, correu: e.target.value })}
            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
          />
          {errors.correu && <span style={{ color: 'var(--color-esgotat)', fontSize: '0.85rem' }}>{errors.correu}</span>}
        </div>

        <div>
          <label>Dirección de Envío:</label>
          <input
            type="text"
            value={form.adreca}
            onChange={(e) => setForm({ ...form, adreca: e.target.value })}
            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
          />
          {errors.adreca && <span style={{ color: 'var(--color-esgotat)', fontSize: '0.85rem' }}>{errors.adreca}</span>}
        </div>

        <div>
          <label>Código Postal (5 dígitos):</label>
          <input
            type="text"
            value={form.codiPostal}
            onChange={(e) => setForm({ ...form, codiPostal: e.target.value })}
            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
          />
          {errors.codiPostal && <span style={{ color: 'var(--color-esgotat)', fontSize: '0.85rem' }}>{errors.codiPostal}</span>}
        </div>

        <div>
          <label>Método de Pago:</label>
          <select
            value={form.metodePagament}
            onChange={(e) => setForm({ ...form, metodePagament: e.target.value })}
            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
          >
            <option value="targeta">Tarjeta de Crédito</option>
            <option value="paypal">PayPal</option>
            <option value="bizum">Bizum</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="checkbox"
              checked={form.condicions}
              onChange={(e) => setForm({ ...form, condicions: e.target.checked })}
            />
            Acepto los términos y condiciones de compra
          </label>
          {errors.condicions && <span style={{ color: 'var(--color-esgotat)', fontSize: '0.85rem' }}>{errors.condicions}</span>}
        </div>

        <button
          type="submit"
          style={{ padding: '12px', background: 'var(--color-marca)', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          Confirmar y Pagar
        </button>
      </form>
    </div>
  );
};

export default Compra;