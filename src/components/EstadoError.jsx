export default function EstadoError({ mensaje, onReintentar }) {
  return (
    <div className="estado-info estado-info--error">
      <p className="estado-info__icono">⚠</p>
      <p>{mensaje}</p>
      <button className="boton boton--principal" onClick={onReintentar}>
        Reintentar
      </button>
    </div>
  )
}
