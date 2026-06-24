import { useState } from 'react'

export default function FormularioContacto({ onAgregar }) {
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [errores, setErrores] = useState({})
  const [enviando, setEnviando] = useState(false)
  const [abierto, setAbierto] = useState(false)

  const validar = () => {
    const nuevosErrores = {}
    if (!nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es obligatorio.'
    } else if (nombre.trim().length > 100) {
      nuevosErrores.nombre = 'Máximo 100 caracteres.'
    }

    if (!apellido.trim()) {
      nuevosErrores.apellido = 'El apellido es obligatorio.'
    } else if (apellido.trim().length > 100) {
      nuevosErrores.apellido = 'Máximo 100 caracteres.'
    }

    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  const manejarEnvio = async (e) => {
    e.preventDefault()
    if (!validar()) return

    setEnviando(true)
    try {
      await onAgregar(nombre.trim(), apellido.trim())
      setNombre('')
      setApellido('')
      setErrores({})
      setAbierto(false)
    } catch (err) {
      setErrores({ general: err.message })
    } finally {
      setEnviando(false)
    }
  }

  if (!abierto) {
    return (
      <button className="boton-ficha-nueva" onClick={() => setAbierto(true)}>
        <span className="boton-ficha-nueva__icono">+</span>
        Nueva ficha de contacto
      </button>
    )
  }

  return (
    <form className="tarjeta-form" onSubmit={manejarEnvio}>
      <h2 className="tarjeta-form__titulo">Nueva ficha</h2>

      {errores.general && (
        <p className="mensaje-error mensaje-error--bloque">{errores.general}</p>
      )}

      <div className="campo">
        <label htmlFor="nombre">Nombre</label>
        <input
          id="nombre"
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ej: María"
          maxLength={100}
          className={errores.nombre ? 'input--error' : ''}
          autoFocus
        />
        {errores.nombre && <span className="mensaje-error">{errores.nombre}</span>}
      </div>

      <div className="campo">
        <label htmlFor="apellido">Apellido</label>
        <input
          id="apellido"
          type="text"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          placeholder="Ej: González"
          maxLength={100}
          className={errores.apellido ? 'input--error' : ''}
        />
        {errores.apellido && (
          <span className="mensaje-error">{errores.apellido}</span>
        )}
      </div>

      <div className="tarjeta-form__acciones">
        <button
          type="button"
          className="boton boton--fantasma"
          onClick={() => {
            setAbierto(false)
            setErrores({})
            setNombre('')
            setApellido('')
          }}
        >
          Cancelar
        </button>
        <button type="submit" className="boton boton--principal" disabled={enviando}>
          {enviando ? 'Guardando…' : 'Guardar contacto'}
        </button>
      </div>
    </form>
  )
}
