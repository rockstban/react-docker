import { productos as data, productos } from '../data/productos'
import Producto from '../components/Producto'
import useQuiosco from '../hooks/useQuiosco'

export default function Inicio() {

  const { categoriaActual } = useQuiosco()

  const productos = data.filter(producto => producto.categoria_id === categoriaActual.id)
  return (
    <>
      <h1 className='text-4xl font-black'>{categoriaActual.nombre}</h1>
      <p className='text-2xl my-10'>
        Escoge entre nuestras deliciosas opciones de menú.
      </p>
      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
        {productos.map(producto => (
          <Producto 
            key={producto.imagen}
            producto={producto}
          
          />

        ))}
      </div>
    </>
  )
}
