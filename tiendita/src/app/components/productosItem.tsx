"use client"

import type { SimpleFruta} from '@/app/interface/intex'
import Image from "next/image"
import Link from "next/link"

export const FrutaItem = ({ roman_name, precio, filename, type, id }: SimpleFruta ) => {
  const fallbackImage =
    "https://static.wikia.nocookie.net/onepiece/images/e/e5/SMILE_Infobox.png/revision/latest?cb=20240727224621&path-prefix=pt"

  const imageSrc =
    filename?.startsWith("https://images.api-onepiece.com/fruits/") && filename.length > 50 ? filename : fallbackImage

  return (
    <div className="h-full">
      <article className="rounded-xl bg-white p-5 shadow-md hover:shadow-xl transform hover:scale-102 transition duration-300 h-full flex flex-col border border-gray-100">
        <div className="flex flex-col h-full">
          {/* Contenedor de imagen con relación de aspecto fija */}
          <div className="relative w-full pt-[100%] bg-gray-50 rounded-lg overflow-hidden mb-4">
            <Image
              src={imageSrc || "/placeholder.svg"}
              fill
              sizes="(max-width: 768px) 100vw, 300px"
              alt={roman_name}
              className="object-contain p-4"
              priority
            />
          </div>

          {/* Contenido */}
          <div className="flex-grow flex flex-col">
            <h2 className="text-slate-800 font-bold text-lg text-center mb-1 line-clamp-2">{roman_name}</h2>
            <p className="text-sm text-slate-500 text-center mb-4 italic">{type}</p>

            <div className="mt-auto flex items-center justify-between">
              <div className="bg-blue-50 px-3 py-1.5 rounded-lg m-3">
                <p className="text-lg font-bold text-blue-600">${precio}</p>
              </div>

              <Link
                href={`/menu/producto/${id}`}
                className="flex items-center space-x-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2 text-white hover:from-blue-600 hover:to-blue-700 transition shadow-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
                <span className="text-sm font-medium">Ver producto</span>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
