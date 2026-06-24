import { useState, useMemo } from 'react'
import { useContactos } from './hooks/useContactos'
import FormularioContacto from './components/FormularioContacto'
import FichaContacto from './components/FichaContacto'
import EstadoCarga from './components/EstadoCarga'
import EstadoError from './components/EstadoError'
import EstadoVacio from './components/EstadoVacio'
import './App.css'

function App() {
  const {
    contactos,
    cargando,
    error,
    cargarContactos,
    agregarContacto,
    eliminarContacto,
    agregarDatoContacto,
    eliminarDatoContacto,
  } = useContactos()

  const [busqueda, setBusqueda] = useState('')

  const contactosFiltrados = useMemo(() => {
    if (!busqueda.trim()) return contactos
    const termino = busqueda.trim().toLowerCase()
    return contactos.filter((c) =>
      `${c.nombre} ${c.apellido}`.toLowerCase().includes(termino)
    )
  }, [contactos, busqueda])

  return (
    <div className="app">
      <header className="cabecera">
        <div className="cabecera__contenido">
          <p className="cabecera__eyebrow">Agenda</p>
          <h1>Mi agenda de contactos</h1>
          <p className="cabecera__subtitulo">
            {contactos.length} contacto{contactos.length !== 1 ? 's' : ''} guardado
            {contactos.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="cabecera__textura" aria-hidden="true" />
      </header>

      <main className="contenedor">
        <div className="barra-superior">
          <div className="buscador">
            <span className="buscador__icono">🔍</span>
            <input
              type="text"
              placeholder="Buscar contacto…"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
        </div>

        <FormularioContacto onAgregar={agregarContacto} />

        {cargando && <EstadoCarga />}

        {!cargando && error && (
          <EstadoError mensaje={error} onReintentar={cargarContactos} />
        )}

        {!cargando && !error && contactos.length === 0 && <EstadoVacio />}

        {!cargando && !error && contactos.length > 0 && contactosFiltrados.length === 0 && (
          <div className="estado-info">
            <p>No se encontraron contactos para "{busqueda}".</p>
          </div>
        )}

        {!cargando && !error && contactosFiltrados.length > 0 && (
          <div className="grilla-fichas">
            {contactosFiltrados.map((contacto) => (
              <FichaContacto
                key={contacto.id_contacto}
                contacto={contacto}
                onEliminarContacto={eliminarContacto}
                onAgregarDato={agregarDatoContacto}
                onEliminarDato={eliminarDatoContacto}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default App
