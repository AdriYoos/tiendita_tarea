import { Fruta } from '@/app/interface/Fruta'

import Image from "next/image"

interface Props {
    params: { id: string }
}

const fallbackImage =
    "https://static.wikia.nocookie.net/onepiece/images/e/e5/SMILE_Infobox.png/revision/latest?cb=20240727224621&path-prefix=pt"

export default async function ProductoPage({ params }: Props) {
    const res = await fetch(`http://localhost:3001/frutas/completo/${params.id}`)

    if (!res.ok) {
        return <div className="p-10 text-center text-red-600">❌ Producto no encontrado</div>
    }

    const fruta: Fruta = await res.json()
    const imageSrc = fruta.filename?.startsWith("https://images.api-onepiece.com/fruits/") && fruta.filename.length > 50
        ? fruta.filename
        : fallbackImage

    return (
        <section className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow">
            <div className="relative w-full pt-[100%] mb-6 bg-gray-50 rounded-lg overflow-hidden">
                <Image
                    src={imageSrc}
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    alt={fruta.roman_name}
                    className="object-contain p-4"
                    priority
                />
            </div>

            <h1 className="text-3xl font-bold text-center text-slate-800 mb-2">{fruta.name}</h1>
            <h2 className="text-xl text-center text-slate-600 italic mb-4">{fruta.roman_name}</h2>

            <p className="text-md text-slate-700 mb-4">
                <strong>Tipo:</strong> {fruta.type}
            </p>

            <p className="text-md text-slate-700 mb-4">
                <strong>Descripción:</strong> {fruta.description}
            </p>

            <p className="text-md text-slate-700 mb-4">
                <strong>Precio:</strong> ${fruta.precio}
            </p>
        </section>
    )
}
