import Head from 'next/head';

export default function Home() {
  const talent = [
    { id: 1, name: "Alice", role: "Actor", image: "https://via.placeholder.com/150" },
    { id: 2, name: "Ben", role: "Model", image: "https://via.placeholder.com/150" },
    { id: 3, name: "Clara", role: "Voiceover", image: "https://via.placeholder.com/150" },
  ];

  return (
    <>
      <Head>
        <title>CastConnect - Talent</title>
      </Head>

      <main className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Discover Talent</h1>

        <div className="mb-4 text-center">
          <input
            type="text"
            placeholder="Search talent..."
            className="px-4 py-2 w-full max-w-md border rounded shadow"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {talent.map((person) => (
            <div key={person.id} className="bg-white rounded-lg shadow p-4 text-center">
              <img src={person.image} alt={person.name} className="rounded-full mx-auto w-24 h-24 mb-4" />
              <h2 className="text-xl font-semibold">{person.name}</h2>
              <p className="text-gray-500">{person.role}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
