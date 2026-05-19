import { useState } from "react";

function App() {

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    age: ""
  });

  // Handle Input Change
  function handleChange(e) {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  // Handle Submit
  async function handleSubmit(e) {

    e.preventDefault();

    try {

      const response = await fetch("http://localhost:5000/register", {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        credentials: "include",

        body: JSON.stringify(formData)
      });

      const data = await response.json();

      console.log(data);

      alert(data.message);

    } catch (err) {

      console.log(err);

      alert("Something went wrong");
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">

      <div className="w-full max-w-md rounded-3xl p-8 border border-cyan-400/20 bg-gradient-to-br from-[#0b1f24] via-[#102820] to-[#0a1620] shadow-[0_10px_50px_rgba(34,211,238,0.15)]">

        <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
          Create Account
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="bg-white/5 backdrop-blur-md text-cyan-100 placeholder:text-cyan-200/40 px-4 py-3 rounded-2xl border border-cyan-400/10 outline-none focus:border-emerald-300 transition"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="bg-white/5 backdrop-blur-md text-cyan-100 placeholder:text-cyan-200/40 px-4 py-3 rounded-2xl border border-cyan-400/10 outline-none focus:border-emerald-300 transition"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="bg-white/5 backdrop-blur-md text-cyan-100 placeholder:text-cyan-200/40 px-4 py-3 rounded-2xl border border-cyan-400/10 outline-none focus:border-emerald-300 transition"
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            className="bg-white/5 backdrop-blur-md text-cyan-100 placeholder:text-cyan-200/40 px-4 py-3 rounded-2xl border border-cyan-400/10 outline-none focus:border-emerald-300 transition"
          />

          <button
            type="submit"
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