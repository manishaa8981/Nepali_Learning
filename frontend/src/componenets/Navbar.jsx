import { Link } from "react-router-dom";

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  {
    user ? (
      <button
        onClick={() => {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          window.location.reload();
        }}
        className="text-sm text-gray-700 hover:underline"
      >
        Logout
      </button>
    ) : (
      <Link to="/login" className="text-sm text-gray-700">
        Login
      </Link>
    );
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-serif font-bold text-gold-800">
          Kidzee
        </Link>

        {/* Menu Links */}
        <div className="space-x-6 hidden md:flex text-sm text-gray-700 font-medium">
          <Link to="/">Home</Link>
          <Link to="/pronounciation">Pronounciation</Link>
          <Link to="/quiz">Quiz</Link>
          <Link to="/vocab">Vocubalory</Link>
        </div>

        {/* Right-side icons */}
        <div className="space-x-4 flex items-center text-gray-700">
          {/* <Link to="/wishlist" title="Wishlist">
            💖
          </Link>
          <Link to="/cart" title="Cart">
            🛒
          </Link> */}
          <Link to="/login" title="Account">
            👤
          </Link>
        </div>
      </div>
    </nav>
  );
}
