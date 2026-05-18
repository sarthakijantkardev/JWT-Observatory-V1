function App() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl p-8 border border-cyan-400/20 bg-gradient-to-br from-[#0b1f24] via-[#102820] to-[#0a1620] shadow-[0_10px_50px_rgba(34,211,238,0.15)]">

        <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
          Create Account
        </h1>

        <form
          action="/register"
          method="post"
          className="flex flex-col gap-4"
        >
          <input
            type="text"
            placeholder="Username"
            className="bg-white/5 backdrop-blur-md text-cyan-100 placeholder:text-cyan-200/40 px-4 py-3 rounded-2xl border border-cyan-400/10 outline-none focus:border-emerald-300 transition"
          />

          <input
            type="text"
            placeholder="Email"
            className="bg-white/5 backdrop-blur-md text-cyan-100 placeholder:text-cyan-200/40 px-4 py-3 rounded-2xl border border-cyan-400/10 outline-none focus:border-emerald-300 transition"
          />

          <input
            type="password"
            placeholder="Password"
            className="bg-white/5 backdrop-blur-md text-cyan-100 placeholder:text-cyan-200/40 px-4 py-3 rounded-2xl border border-cyan-400/10 outline-none focus:border-emerald-300 transition"
          />

          <input
            type="text"
            placeholder="Age"
            className="bg-white/5 backdrop-blur-md text-cyan-100 placeholder:text-cyan-200/40 px-4 py-3 rounded-2xl border border-cyan-400/10 outline-none focus:border-emerald-300 transition"
          />

          <button
            className="mt-2 py-3 rounded-2xl font-semibold text-black bg-gradient-to-r from-cyan-300 to-emerald-300 hover:scale-[1.02] transition duration-300 shadow-lg shadow-cyan-500/20 cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;