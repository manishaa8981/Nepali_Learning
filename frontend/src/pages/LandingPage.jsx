import { Play } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../componenets/Navbar";

export default function KidsLearningHomepage() {
  const [animatedShapes, setAnimatedShapes] = useState([]);

  useEffect(() => {
    const shapes = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 40 + 20,
      color: [
        "bg-yellow-300",
        "bg-pink-300",
        "bg-blue-300",
        "bg-green-300",
        "bg-purple-300",
        "bg-orange-300",
      ][i % 6],
      delay: Math.random() * 4,
    }));
    setAnimatedShapes(shapes);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 overflow-hidden">
      {/* Floating Animation Shapes */}
      <div className="fixed inset-0 pointer-events-none">
        {animatedShapes.map((shape) => (
          <div
            key={shape.id}
            className={`absolute rounded-full opacity-30 animate-bounce ${shape.color}`}
            style={{
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              width: `${shape.size}px`,
              height: `${shape.size}px`,
              animationDelay: `${shape.delay}s`,
              animationDuration: "4s",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Navbar />

        {/* Hero Section */}
        <section className="py-16 text-center">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl mb-4 p-12 shadow-2xl max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Learning is Fun! 🚀
            </h2>

            <p className="text-xl  text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
              शब्द सिक्ने रमाइलो तरिका, नयाँ शब्द र सही उच्चारण सिकौं!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/home"
                className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-green-500 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
              >
                <Play className="w-5 h-5" />
                <span>Start Learning</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 text-center">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                🌟
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                KidsLearn
              </span>
            </div>
            <p className="text-gray-600 mb-6">
              Making learning fun, one adventure at a time!
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
