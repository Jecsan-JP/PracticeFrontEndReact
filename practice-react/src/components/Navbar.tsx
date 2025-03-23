import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white font-bold text-xl">
          Mi App
        </Link>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-gray-300">
            Inicio
          </Link>
          <Link to="/about" className="text-white hover:text-gray-300">
            Acerca de
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 