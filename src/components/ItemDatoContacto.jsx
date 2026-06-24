const ICONOS_TIPO = {
  Personal: '◆',
  Trabajo: '▲',
  Casa: '●',
}

export default function ItemDatoContacto({ dato, onEliminar }) {
  const manejarEliminar = async () => {
    try {
      await onEliminar(dato.id_dato_contacto)
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="item-dato">
      <div className="item-dato__cabecera">
        <span className={`etiqueta-tipo etiqueta-tipo--${dato.tipo.toLowerCase()}`}>
          <span className="etiqueta-tipo__icono">{ICONOS_TIPO[dato.tipo]}</span>
          {dato.tipo}
        </span>
        <button
          className="boton-eliminar-dato"
          onClick={manejarEliminar}
          aria-label="Eliminar este dato"
          title="Eliminar este dato"
        >
          ×
        </button>
      </div>
      <div className="item-dato__cuerpo">
        {dato.correo && (
          <p className="item-dato__linea">
            <span className="item-dato__etiqueta">Correo</span> {dato.correo}
          </p>
        )}
        {dato.telefono && (
          <p className="item-dato__linea">
            <span className="item-dato__etiqueta">Teléfono</span> {dato.telefono}
          </p>
        )}
        {dato.direccion && (
          <p className="item-dato__linea">
            <span className="item-dato__etiqueta">Dirección</span> {dato.direccion}
          </p>
        )}
      </div>
    </div>
  )
}
