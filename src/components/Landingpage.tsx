import Head from "next/head";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-200 via-white to-gray-300 flex flex-col items-center justify-around">
      <Head>
        <title>My Blog</title>
        <meta
          name="description"
          content="Blog about emerging technologies and software"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="w-full py-4 flex justify-between items-center px-8">
        <div className="text-2xl font-bold">
          SilverTech <span className="text-indigo-600">{`{Pulse}`}</span>
        </div>
        <nav className="space-x-4">
          <Link href="#" className="hover:underline">
            Home
          </Link>
          <Link href="#" className="hover:underline">
            About
          </Link>
          <Link href="#" className="hover:underline">
            Tech News
          </Link>
          <Link href="#" className="hover:underline">
            Categories
          </Link>
        </nav>
        <div className="space-x-6">
          <button className="bg-indigo-500 text-white px-4 py-2 rounded">
            <Link href="/auth/signup">Sign Up</Link>
          </button>
          <button className="bg-black text-white px-4 py-2 rounded">
            <Link href="/home">Get Started</Link>
          </button>
        </div>
      </header>

      <main className="flex-1  flex flex-col items-center  text-center px-8 justify-around">
        <h1 className="text-5xl font-bold mb-4">
          Welcome to{" "}
          <span className="text-indigo-600">{`{SilverTechPulse}`}</span> - Your
          Daily Dose of Tech News
        </h1>
        {/* <p className="text-lg mb-8">
          Stay {`{Updated}`} with the Latest in Technology
        </p> */}

        <div className="flex flex-col justify-center items-center space-y-4  w-[60%] ">
          <p className="text-center text-xl mb-4">
            Discover the newest advancements, trends, and insights in the world
            of technology. From AI breakthroughs to the latest gadgets, our
            platform brings you fresh and relevant tech news daily. Join our
            community of tech enthusiasts and share your own insights by
            creating and writing blogs.
          </p>
          <button className="bg-black text-white px-8 py-4 rounded text-lg">
            <Link href="/home">Get Started</Link>
          </button>
        </div>
        <div className="mt-8 flex justify-center items-center w-full  space-x-4 flex-wrap">
          <div className=" flex  justify-center items-center w-[70%] max-xlg:flex-col max-xlg:space-y-4">
            <div className="flex-1">
              <div className="bg-white p-4 rounded shadow-xl text-start min-h-[200px] w-[350px] border border-gray-400">
                <h2 className="text-2xl font-bold text-center">
                  Latest Articles
                </h2>
                <ol className="space-y-2 my-2 w-[90%]">
                  <li>- AI and Machine Learning: What’s New in 2024</li>
                  <li>- Top 10 Gadgets to Watch Out for This Year</li>
                  <li>- Blockchain Beyond Cryptocurrency</li>
                </ol>
              </div>
            </div>

            <div className="flex-1 flex justify-center items-center mx-4">
              <div className="bg-white p-4 rounded shadow-xl text-start min-h-[200px] w-[350px] border border-gray-400">
                <h2 className="text-2xl font-bold text-center">Trending Now</h2>
                <ol className="space-y-2 my-2">
                  <p>- Quantum Computing: The Next Frontier</p>
                  <p>- 5G: Revolutionizing Connectivity</p>
                  <p>- Augmented Reality in Everyday Life</p>
                </ol>
              </div>
            </div>
            <div className="flex-1">
              <div className="bg-white p-4 rounded shadow-xl text-start min-h-[200px] min-w-[350px] border border-gray-400 mx-2">
                <h2 className="text-2xl font-bold text-center">
                  Editor’s Picks
                </h2>
                <ol className="space-y-2 my-2">
                  <p>- The Rise of Autonomous Vehicles</p>
                  <p>- Cybersecurity Trends to Keep an Eye On</p>
                  <p>- The Future of Remote Work Technologies</p>
                </ol>
              </div>
            </div>

            <div className="flex-1">
              <div className="bg-white p-4 rounded shadow-xl text-start min-h-[200px] min-w-[350px] border border-gray-400">
                <h2 className="text-2xl font-bold text-center">
                  Top Categories
                </h2>
                <ol className="space-y-2 my-2">
                  <p>- Artificial Intelligence</p>
                  <p>- Gadgets and Devices</p>
                  <p>- Software Development</p>
                  <p>- Cybersecurity</p>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
