export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Amjad Chaudhry</h1>
        <p className="text-xl text-gray-600 mb-8">Engineer · Educator · Traveler</p>
        <div className="flex justify-center gap-4">
          <a href="/blog" className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition">
            Read Blog
          </a>
          <a href="#about" className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition">
            About Me
          </a>
        </div>
      </section>

      {/* About */}
      <section id="about" className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">About</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-2xl mb-3">💻</div>
              <h3 className="font-semibold text-lg mb-2">Engineer</h3>
              <p className="text-gray-600 text-sm">Building technology that solves real problems.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-2xl mb-3">📚</div>
              <h3 className="font-semibold text-lg mb-2">Educator</h3>
              <p className="text-gray-600 text-sm">Sharing knowledge through writing and teaching.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-2xl mb-3">✈️</div>
              <h3 className="font-semibold text-lg mb-2">Traveler</h3>
              <p className="text-gray-600 text-sm">Exploring the world, one trip at a time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog preview */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Latest Posts</h2>
        <p className="text-gray-500">Essays and videos coming soon.</p>
        <a href="/blog" className="inline-block mt-4 text-blue-600 hover:underline">Browse all posts →</a>
      </section>
    </main>
  )
}
