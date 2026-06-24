import { useState } from 'react'
import ItemDatoContacto from './ItemDatoContacto'
import FormularioDatoContacto from './FormularioDatoContacto'

function iniciales(nombre, apellido) {
  return `${nombre.charAt(0)}${apellido.charAt(0)}`.toUpperCase()
}

export default function FichaContacto({
  contacto,
  onEliminarContacto,
  onAgregarDato,
  onEliminarDato,
}) {
  const [mostrarForm, setMostrarForm] = useState(false)
  const [eliminando, setEliminando] = useState(false)
  const [confirmarBorrado, setConfirmarBorrado] = useState(false)

  const datos = contacto.dato_contacto || []

  const manejarEliminarContacto = async () => {
    setEliminando(true)
    try {
      await onEliminarContacto(contacto.id_contacto)
    } catch (err) {
      alert(err.message)
      setEliminando(false)
    }
  }

  return (
    <article className={`ficha ${eliminando ? 'ficha--eliminando' : ''}`}>
      <div className="ficha__cabecera">
        <div className="ficha__avatar">{iniciales(contacto.nombre, contacto.apellido)}</div>
        <div className="ficha__nombre">
          <h3>
            {contacto.nombre} {contacto.apellido}
          </h3>
          <span className="ficha__contador">
            {datos.length === 0
              ? 'Sin datos de contacto'
              : `${datos.length} dato${datos.length > 1 ? 's' : ''} registrado${
                  datos.length > 1 ? 's' : ''
                }`}
          </span>
        </div>

        {!confirmarBorrado ? (
          <button
            className="boton-ficha-eliminar"
            onClick={() => setConfirmarBorrado(true)}
            aria-label="Eliminar contacto"
            title="Eliminar contacto"
            disabled={eliminando}
          >
            🗑
          </button>
        ) : (
          <div className="confirmar-borrado">
            <span>¿Eliminar?</span>
            <button onClick={manejarEliminarContacto} className="confirmar-borrado__si">
              Sí
            </button>
            <button
              onClick={() => setConfirmarBorrado(false)}
              className="confirmar-borrado__no"
            >
              No
            </button>
          </div>
        )}
      </div>

      <div className="ficha__divisor" />

      <div className="ficha__lista-datos">
        {datos.map((dato) => (
          <ItemDatoContacto
            key={dato.id_dato_contacto}
            dato={dato}
            onEliminar={(idDato) => onEliminarDato(contacto.id_contacto, idDato)}
          />
        ))}
      </div>

      {mostrarForm ? (
        <FormularioDatoContacto
          onAgregar={(dato) => onAgregarDato(contacto.id_contacto, dato)}
          onCancelar={() => setMostrarForm(false)}
        />
      ) : (
        <button className="boton-agregar-dato" onClick={() => setMostrarForm(true)}>
          + Agregar dato de contacto
        </button>
      )}
    </article>
  )
}
