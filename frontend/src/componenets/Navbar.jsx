import { NavLink } from "react-router-dom";

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.reload();
  };

  const linkClasses = ({ isActive }) =>
    `font-medium transition-colors ${
      isActive
        ? "text-purple-600 border-b-2 border-purple-600 pb-1"
        : "text-gray-700 hover:text-purple-600"
    }`;

  return (
    <header className="py-6 sticky top-0 z-50">
      <div className="flex justify-between items-center bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl mx-4">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
            🌟
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Kidzee
          </h1>
        </div>

        {/* Menu Links */}
        <nav className="hidden md:flex space-x-8">
          <NavLink to="/" className={linkClasses}>
            Home
          </NavLink>
          <NavLink to="/home" className={linkClasses}>
            Learn
          </NavLink>
          <NavLink to="/pronounciation" className={linkClasses}>
            Pronunciation
          </NavLink>
          <NavLink to="/quiz" className={linkClasses}>
            Quiz
          </NavLink>
          <NavLink to="/vocab" className={linkClasses}>
            Vocabulary
          </NavLink>
        </nav>

        {/* Right Side: Account / Auth */}
        <div className="flex items-center space-x-4">
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg text-sm font-medium"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg text-sm font-medium"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
}
