// app/frutas/page.tsx
import { SimpleFruta } from '@/app/interface/SimpleFruta'
import { FrutaItem } from '@/app/components/productosItem'

const getFrutas = async (): Promise<SimpleFruta[]> => {
    const res = await fetch('http://localhost:3001/frutas/simple'); // tu API real
    const data = await res.json();
    return data;
};

export default async function FrutasPage() {
    const frutas = await getFrutas();

    return (
        <div className="bg-white">

            <div className="pt-32  bg-white">
                <h1 className="text-center text-2xl font-bold text-gray-800">All Products</h1>
            </div>

            <div className="py-10 bg-gray-100">
                <div className="mx-auto grid max-w-6xl  grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

                    {frutas.map((fruta, index) => (
                        <FrutaItem key={index} {...fruta} />
                    ))}
                </div>
            </div>
        </div>
    );
}
