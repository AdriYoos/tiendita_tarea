import Image from 'next/image';
import { BarraLateralElem } from './ElemBarra';
import { CiShoppingCart } from 'react-icons/ci';
import { LuBadgeHelp } from 'react-icons/lu';
import { FcShop, FcShipped } from 'react-icons/fc';
import { Fa500Px } from "react-icons/fa";
import { FaDrum } from "react-icons/fa";

const MenuElementos = [
  {
    path: '/menu/productos',
    icon: <FcShop />,
    title: 'Productos',
    subtitle: 'Gamer PC\'s'
  },
  {
    path: '/menu/producto',
    icon: <FcShipped />,
    title: 'Producto',
    subtitle: 'Orders ready'
  },
  {
    path: '/menu/carrito',
    icon: <CiShoppingCart />,
    title: 'Carrrito',
    subtitle: 'Review purchases'
  },
  {
    path: '/menu/acercaD',
    icon: <LuBadgeHelp />,
    title: 'ayuda',
    subtitle: 'Who we are'
  }
];



export const BarraLateral = () => {
    return (
      <aside className="w-64 h-screen bg-gradient-to-b from-blue-900 via-indigo-800 to-blue-700 text-white shadow-xl flex flex-col">
        <div className="p-6 border-b border-blue-800">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={160}
            height={60}
            priority
          />
        </div>
        <nav className="flex-1 p-6 space-y-4">
          {MenuElementos.map((item) => (
            <BarraLateralElem
              key={item.path}
              path={item.path}
              icon={item.icon}
              title={item.title}
              subtitle={item.subtitle}
            />
          ))}
        </nav>
      </aside>
    );
  }