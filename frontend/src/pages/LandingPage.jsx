import Navbar from "../componenets/Navbar";

const LandingPage = () => {
  const showMessage = (message) => {
    alert(message); // For now use alert for messages
  };

  const selectCategory = (category) => {
    const messages = {
      letters: "Danny Dragon says: Let's learn the ABC together! 🐲✨",
      numbers: "Oliver Owl hoots: Time to count! Who-o-o's ready? 🦉🔢",
      shapes: "Bella Butterfly whispers: Let's find shapes everywhere! 🦋🔺",
      colors: "Luna Unicorn sparkles: Colors make magic happen! 🦄🌈",
      animals: "Freddie Frog croaks: Let's hop into nature! 🐸🌿",
      fruits: "Ruby Rabbit nibbles: Healthy foods taste amazing! 🐰🥕",
    };
    showMessage(messages[category]);
  };

  const startGame = (game) => {
    const messages = {
      memory: "Let's test your memory! 🧠✨",
      puzzle: "Puzzle time! Put the pieces together! 🧩",
      quiz: "Quiz time! You can do it! 🤔💭",
      drawing: "Time to be creative! Draw something awesome! 🎨✏️",
    };
    showMessage(messages[game]);
  };

  const startLearning = () => {
    showMessage(
      "🎉 Welcome to your learning adventure! Choose any category to begin! 🌟"
    );
  };

  const categories = [
    {
      id: "letters",
      icon: "🐲",
      title: "Letters & ABC",
      desc: "Learn the alphabet with Danny Dragon",
    },
    {
      id: "numbers",
      icon: "🦉",
      title: "Numbers & Counting",
      desc: "Count with Oliver the Wise Owl",
    },
    {
      id: "shapes",
      icon: "🦋",
      title: "Shapes & Patterns",
      desc: "Discover shapes with Bella Butterfly",
    },
    {
      id: "colors",
      icon: "🦄",
      title: "Colors & Art",
      desc: "Paint rainbows with Luna Unicorn",
    },
    {
      id: "animals",
      icon: "🐸",
      title: "Animals & Nature",
      desc: "Explore with Freddie the Frog",
    },
    {
      id: "fruits",
      icon: "🐰",
      title: "Fruits & Foods",
      desc: "Eat healthy with Ruby Rabbit",
    },
  ];

  const games = [
    {
      id: "memory",
      icon: "🧠",
      title: "Memory Match",
      desc: "Match the pairs!",
    },
    {
      id: "puzzle",
      icon: "🧩",
      title: "Puzzle Time",
      desc: "Complete the puzzle!",
    },
    { id: "quiz", icon: "❓", title: "Fun Quiz", desc: "Answer questions!" },
    { id: "drawing", icon: "✏️", title: "Draw & Color", desc: "Be creative!" },
  ];

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-blue-300 to-pink-300 p-4 font-comic">
        <header className="text-center mb-10 animate-bounceIn">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 via-green-400 to-blue-400 bg-clip-text text-transparent mb-2 shadow-sm">
            KIDS LEARNING WORLD
          </h1>
          <div
            className="w-28 h-28 bg-gradient-to-tr from-blue-300 to-blue-700 rounded-full mx-auto flex items-center justify-center text-5xl shadow-lg hover:scale-110 transform transition-all duration-300 cursor-pointer animate-float"
            onClick={() => showMessage("Hi there! I'm Freddie the Frog! 🐸")}
          >
            🐸
          </div>
          <p className="text-xl text-gray-800 mt-4">
            🌟 Let's Learn and Have Fun Together! 🌟
          </p>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white rounded-2xl p-6 text-center shadow-xl hover:scale-105 transform transition-all duration-300 cursor-pointer"
              onClick={() => selectCategory(cat.id)}
            >
              <div className="text-5xl mb-3 animate-pulse">{cat.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">
                {cat.title}
              </h3>
              <p className="text-sm text-gray-500">{cat.desc}</p>
            </div>
          ))}
        </section>

        <section className="bg-white rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl text-center font-bold bg-gradient-to-r from-red-400 to-green-400 bg-clip-text text-transparent mb-6">
            🎮 Fun Learning Games
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {games.map((game) => (
              <div
                key={game.id}
                className="bg-gradient-to-br from-indigo-400 to-purple-600 text-white p-4 rounded-xl text-center cursor-pointer hover:scale-105 transform transition duration-300"
                onClick={() => startGame(game.id)}
              >
                <div className="text-4xl mb-2">{game.icon}</div>
                <h4 className="font-bold text-lg">{game.title}</h4>
                <p className="text-sm">{game.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <button
          onClick={startLearning}
          className="block mx-auto mt-10 bg-gradient-to-r from-teal-500 to-teal-400 text-white font-bold text-lg py-3 px-8 rounded-full shadow-md hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300"
        >
          🚀 Start Learning Adventure!
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
