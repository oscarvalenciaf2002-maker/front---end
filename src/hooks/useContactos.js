import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useContactos() {
  const [contactos, setContactos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  const cargarContactos = useCallback(async () => {
    setCargando(true)
    setError(null)
    try {
      const { data, error: errorConsulta } = await supabase
        .from('contacto')
        .select('*, dato_contacto(*)')
        .order('id_contacto', { ascending: false })

      if (errorConsulta) throw errorConsulta

      setContactos(data || [])
    } catch (err) {
      console.error('Error al cargar contactos:', err)
      setError(
        'No se pudieron cargar los contactos. Verifica tu conexión e intenta de nuevo.'
      )
    } finally {
      setCargando(false)
    }
  }, [])

  useEffect(() => {
    cargarContactos()
  }, [cargarContactos])

  const agregarContacto = async (nombre, apellido) => {
    const { data, error: errorInsercion } = await supabase
      .from('contacto')
      .insert([{ nombre, apellido }])
      .select()
      .single()

    if (errorInsercion) {
      throw new Error('No se pudo guardar el contacto. Intenta de nuevo.')
    }

    setContactos((prev) => [{ ...data, dato_contacto: [] }, ...prev])
    return data
  }

  const eliminarContacto = async (idContacto) => {
    const { error: errorEliminar } = await supabase
      .from('contacto')
      .delete()
      .eq('id_contacto', idContacto)

    if (errorEliminar) {
      throw new Error('No se pudo eliminar el contacto. Intenta de nuevo.')
    }

    setContactos((prev) =>
      prev.filter((c) => c.id_contacto !== idContacto)
    )
  }

  const agregarDatoContacto = async (idContacto, dato) => {
    const payload = {
      id_contacto: idContacto,
      tipo: dato.tipo,
      correo: dato.correo || null,
      telefono: dato.telefono || null,
      direccion: dato.direccion || null,
    }

    const { data, error: errorInsercion } = await supabase
      .from('dato_contacto')
      .insert([payload])
      .select()
      .single()

    if (errorInsercion) {
      throw new Error('No se pudo agregar el dato de contacto.')
    }

    setContactos((prev) =>
      prev.map((c) =>
        c.id_contacto === idContacto
          ? { ...c, dato_contacto: [...(c.dato_contacto || []), data] }
          : c
      )
    )
    return data
  }

  const eliminarDatoContacto = async (idContacto, idDatoContacto) => {
    const { error: errorEliminar } = await supabase
      .from('dato_contacto')
      .delete()
      .eq('id_dato_contacto', idDatoContacto)

    if (errorEliminar) {
      throw new Error('No se pudo eliminar el dato de contacto.')
    }

    setContactos((prev) =>
      prev.map((c) =>
        c.id_contacto === idContacto
          ? {
              ...c,
              dato_contacto: c.dato_contacto.filter(
                (d) => d.id_dato_contacto !== idDatoContacto
              ),
            }
          : c
      )
    )
  }

  return {
    contactos,
    cargando,
    error,
    cargarContactos,
    agregarContacto,
    eliminarContacto,
    agregarDatoContacto,
    eliminarDatoContacto,
  }
}
