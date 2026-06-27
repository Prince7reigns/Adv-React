
import { Play, Star, Search, Tv } from "lucide-react";
import { Link } from "react-router";

const featuredMovies = [
  {
    title: "Avengers: Endgame",
    year: "2019",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600",
  },
  {
    title: "The Batman",
    year: "2022",
    image:
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=600",
  },
  {
    title: "Interstellar",
    year: "2014",
    image:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600",
  },
  {
    title: "Dune",
    year: "2021",
    image:
      "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=600",
  },
  {
    title: "Joker",
    year: "2019",
    image:
      "https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?w=600",
  },
  {
    title: "John Wick",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600",
  },
];

const genres = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Sci-Fi",
  "Fantasy",
  "Animation",
  "Thriller",
];

const Home = () => {
  return (
    <div className="bg-black text-white">

      {/* HERO */}
      <section
        className="relative h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1600)",
        }}
      >
        <div className="absolute inset-0 bg-black/75" />

        <div className="relative z-10 max-w-3xl text-center px-6">

          <h1 className="text-5xl md:text-7xl font-black leading-tight">
            Unlimited Movies,
            <span className="text-red-600"> Endless Entertainment</span>
          </h1>

          <p className="mt-6 text-lg text-gray-300">
            Explore thousands of blockbuster movies from every genre.
            Discover ratings, cast, trailers and build your own watchlist.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-10">

            <Link to="/favorites" className="border border-gray-500 hover:border-white transition px-8 py-4 rounded-xl">
              My Watchlist
            </Link>

          </div>
        </div>
      </section>

      {/* FEATURED MOVIES */}

      <section className="max-w-7xl mx-auto py-20 px-6">

        <h2 className="text-4xl font-bold mb-10">
          Featured Movies
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {featuredMovies.map((movie) => (
            <div
              key={movie.title}
              className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-red-600 transition group"
            >
              <div className="aspect-[2/3] overflow-hidden">

                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />

              </div>

              <div className="p-5">

                <h3 className="text-xl font-bold">
                  {movie.title}
                </h3>

                <div className="flex justify-between items-center mt-3">

                  <span className="text-gray-400">
                    {movie.year}
                  </span>

                  <span className="flex items-center gap-1 text-yellow-400">
                    <Star size={16} fill="currentColor" />
                    8.5
                  </span>

                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GENRES */}

      <section className="bg-zinc-950 py-20">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold mb-10">
            Browse by Genre
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

            {genres.map((genre) => (
              <div
                key={genre}
                className="bg-zinc-900 rounded-xl border border-zinc-800 p-8 text-center hover:bg-red-600 hover:border-red-600 cursor-pointer transition"
              >
                <FilmIcon />
                <p className="mt-4 text-lg font-semibold">
                  {genre}
                </p>
              </div>
            ))}

          </div>

        </div>

      </section>

      {/* WHY CHOOSE */}

      <section className="max-w-7xl mx-auto py-20 px-6">

        <h2 className="text-4xl font-bold mb-10">
          Why MovieHub?
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          <Feature
            icon={<Search size={36} />}
            title="Fast Search"
            text="Find any movie instantly with a powerful search."
          />

          <Feature
            icon={<Star size={36} />}
            title="IMDb Ratings"
            text="See trusted ratings before watching."
          />

          <Feature
            icon={<Play size={36} />}
            title="Huge Collection"
            text="Explore thousands of popular movies."
          />

          <Feature
            icon={<Tv size={36} />}
            title="Modern UI"
            text="Beautiful Netflix-inspired interface."
          />

        </div>

      </section>

      {/* WATCH ANYWHERE */}

      <section className="bg-zinc-950 py-24">

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

          <img
            src="https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=900"
            alt="Watch Movies"
            className="rounded-3xl shadow-2xl"
          />

          <div>

            <h2 className="text-5xl font-bold">
              Watch Anywhere
            </h2>

            <p className="text-gray-400 mt-6 leading-8 text-lg">
              Enjoy your favorite movies from your desktop,
              laptop, tablet, or mobile device with a clean,
              responsive interface.
            </p>

            <ul className="space-y-5 mt-10">

              <li>✅ Beautiful Netflix-inspired Design</li>

              <li>✅ Lightning Fast Search Experience</li>

              <li>✅ Responsive on Every Device</li>

              <li>✅ High Quality Movie Posters</li>

              <li>✅ Save Movies to Watchlist</li>

            </ul>

          </div>

        </div>

      </section>

    </div>
  );
};

function Feature({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center hover:border-red-600 transition">
      <div className="text-red-600 flex justify-center mb-5">
        {icon}
      </div>

      <h3 className="text-xl font-bold mb-3">
        {title}
      </h3>

      <p className="text-gray-400">
        {text}
      </p>
    </div>
  );
}

function FilmIcon() {
  return (
    <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center mx-auto text-2xl">
      🎬
    </div>
  );
}

export default Home;
