'use client'
import { useState } from "react"

interface Props {
  value?: number
  id: number
}

export const Contador = ({ value = 0, id }: Props) => {
  const [count, setCount] = useState(value)
  const [loading, setLoading] = useState(false)

  const updateCantidad = async (nuevaCantidad: number) => {
    setLoading(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/frutas/inventario/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cantidad: nuevaCantidad }),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Error inesperado')
      setCount(nuevaCantidad)
    } catch (error) {
      alert("❌ Error al actualizar inventario: " + error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <span className='text-6xl font-bold'>{count}</span>
      <div className="flex my-6">
        <button
          onClick={() => updateCantidad(count + 1)}
          disabled={loading}
          className="flex items-center justify-center p-2 rounded-xl bg-green-700 text-white hover:bg-green-600 transition-all w-[100px] mr-2"
        >
          +1
        </button>

        <button
          onClick={() => count > 0 && updateCantidad(count - 1)}
          disabled={loading || count <= 0}
          className="flex items-center justify-center p-2 rounded-xl bg-red-700 text-white hover:bg-red-600 transition-all w-[100px]"
        >
          -1
        </button>
      </div>
    </>
  )
}
