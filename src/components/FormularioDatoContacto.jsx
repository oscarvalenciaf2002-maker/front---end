import { useState } from 'react'

const TIPOS = ['Personal', 'Trabajo', 'Casa']

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const TELEFONO_REGEX = /^[+]?[0-9\s()-]{6,20}$/

export default function FormularioDatoContacto({ onAgregar, onCancelar }) {
  const [tipo, setTipo] = useState('Personal')
  const [correo, setCorreo] = useState('')
  const [telefono, setTelefono] = useState('')
  const [direccion, setDireccion] = useState('')
  const [errores, setErrores] = useState({})
  const [enviando, setEnviando] = useState(false)

  const validar = () => {
    const nuevosErrores = {}

    if (!correo.trim() && !telefono.trim() && !direccion.trim()) {
      nuevosErrores.general =
        'Completa al menos un dato: correo, teléfono o dirección.'
    }

    if (correo.trim() && !EMAIL_REGEX.test(correo.trim())) {
      nuevosErrores.correo = 'Ingresa un correo válido (ej: nombre@dominio.com).'
    }
    if (correo.trim().length > 150) {
      nuevosErrores.correo = 'Máximo 150 caracteres.'
    }

    if (telefono.trim() && !TELEFONO_REGEX.test(telefono.trim())) {
      nuevosErrores.telefono = 'Ingresa un teléfono válido (solo números, +, espacios).'
    }
    if (telefono.trim().length > 20) {
      nuevosErrores.telefono = 'Máximo 20 caracteres.'
    }

    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  const manejarEnvio = async (e) => {
    e.preventDefault()
    if (!validar()) return

    setEnviando(true)
    try {
      await onAgregar({
        tipo,
        correo: correo.trim(),
        telefono: telefono.trim(),
        direccion: direccion.trim(),
      })
      setCorreo('')
      setTelefono('')
      setDireccion('')
      setTipo('Personal')
      setErrores({})
    } catch (err) {
      setErrores({ general: err.message })
    } finally {
      setEnviando(false)
    }
  }

  return (
    <form className="form-dato" onSubmit={manejarEnvio}>
      {errores.general && (
        <p className="mensaje-error mensaje-error--bloque">{errores.general}</p>
      )}

      <div className="campo">
        <label>Tipo</label>
        <div className="selector-tipo">
          {TIPOS.map((t) => (
            <button
              type="button"
              key={t}
              className={`chip-tipo ${tipo === t ? 'chip-tipo--activo' : ''}`}
              onClick={() => setTipo(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="campo">
        <label htmlFor="correo">Correo electrónico</label>
        <input
          id="correo"
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          placeholder="nombre@correo.com"
          className={errores.correo ? 'input--error' : ''}
        />
        {errores.correo && <span className="mensaje-error">{errores.correo}</span>}
      </div>

      <div className="campo">
        <label htmlFor="telefono">Teléfono</label>
        <input
          id="telefono"
          type="tel"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          placeholder="+56 9 1234 5678"
          className={errores.telefono ? 'input--error' : ''}
        />
        {errores.telefono && (
          <span className="mensaje-error">{errores.telefono}</span>
        )}
      </div>

      <div className="campo">
        <label htmlFor="direccion">Dirección</label>
        <textarea
          id="direccion"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          placeholder="Calle, número, comuna, ciudad"
          rows={2}
        />
      </div>

      <div className="tarjeta-form__acciones">
        <button type="button" className="boton boton--fantasma" onClick={onCancelar}>
          Cancelar
        </button>
        <button type="submit" className="boton boton--principal" disabled={enviando}>
          {enviando ? 'Agregando…' : 'Agregar dato'}
        </button>
      </div>
    </form>
  )
}
