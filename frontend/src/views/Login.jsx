import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <>
    <h1 className="text-4xl font-black">Iniciar Sesión</h1>
    <p>¡Únete al mejor restaurante de Quito!</p>
    <div className=" bg-white shadow-md rounded-md mt-10 px-5 py-10">
        <form>

        <div className="mb-4">
                <label
                    className="text-slate-800"
                    htmlFor="email"
                >Email:</label>
                <input
                  type="email"
                  id="email"
                  className="mt-2 w-full p-3 bg-gray-50"
                  name="email"
                  placeholder="Coloca tu correo electrónico"
                />
            </div>
            
            <div className="mb-4">
                <label
                    className="text-slate-800"
                    htmlFor="password"
                >Contraseña:</label>
                <input
                  type="password"
                  id="password"
                  className="mt-2 w-full p-3 bg-gray-50"
                  name="password"
                  placeholder="Ingresa tu contraseña"
                />
            </div>

            

            <input
                type="submit"
                value="Iniciar Sesión"
                className=" bg-green-600 hover:bg-green-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
            />

        </form>
    </div>

    <nav className="mt-5">
            <Link to="/auth/registro">
              ¿Aún no formas parte de nuestra familia? Únete a nosotros.
            </Link> 

    </nav>
    </>
  )
}
