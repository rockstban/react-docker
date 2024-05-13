import useQuiosco from "../hooks/useQuiosco"
import Categoria from "./Categoria"

export default function Sidebar() {

   const { categorias } = useQuiosco()

  return (
    <aside className="md:w-72">
      <div className="p-4">
        <img 
            className="w-80"
            src="img/logo2.jpg"
            alt="Imagen entrada"
        
        />

      </div>

      <div className="mt-10">
         {categorias.map( categoria => (
            <Categoria 
                key={categoria.id}
                categoria={categoria}
            />
         ))} 
      </div>

      <div className="my-5 px-5">
         <button
            type="button"
            className="text-center bg-black w-full p-3 font-bold text-white truncate"
         >
            Cancelar Orden
         </button>
      </div>   

    </aside>
  )
}
