import { useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    age: ""
  });

  function handleChange(e) {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {

    e.preventDefault();

    try {

      const response = await fetch(
        "http://localhost:5000/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          credentials: "include",

          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();

      console.log(data);

      alert(data.message);

      localStorage.setItem("token", data.token);

      navigate("/dashboard");

    } catch (err) {

      console.log(err);

      alert("Something went wrong");
    }
  }

  return (

    <div className="min-h-screen bg-black overflow-hidden relative flex items-center justify-center px-4">

      <div className="absolute top-[-150px] left-[-150px] w-[500px] h-[500px] bg-cyan-500/20 blur-[120px] rounded-full" />

      <div className="absolute bottom-[-180px] right-[-180px] w-[500px] h-[500px] bg-emerald-500/20 blur-[120px] rounded-full" />

      <div
        className="
          relative
          w-full
          max-w-md
          p-8
          rounded-[24px]
          border
          border-cyan-400/20
          bg-white/[0.04]
          backdrop-blur-3xl
          shadow-[0_0_80px_rgba(34,211,238,0.12)]
          overflow-hidden
        "
      >

        <div className="absolute inset-[1px] rounded-[22px] border border-white/5 pointer-events-none" />

        <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />

        <div className="relative z-10">

          <h1
            className="
              text-4xl
              font-black
              tracking-tight
              text-center
              bg-gradient-to-r
              from-cyan-200
              via-white
              to-emerald-200
              bg-clip-text
              text-transparent
            "
          >
            JWT Observatory
          </h1>

          <p className="text-center text-cyan-100/40 mt-2 mb-8 tracking-[3px] text-xs uppercase">
            Secure Authentication System
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >

            {[
              {
                type: "text",
                name: "username",
                placeholder: "Username"
              },
              {
                type: "email",
                name: "email",
                placeholder: "Email"
              },
              {
                type: "password",
                name: "password",
                placeholder: "Password"
              },
              {
                type: "number",
                name: "age",
                placeholder: "Age"
              }
            ].map((field) => (

              <div key={field.name} className="relative group">

                <div
                  className="
                    absolute
                    -inset-[1px]
                    rounded-2xl
                    bg-gradient-to-r
                    from-cyan-400/0
                    via-cyan-400/20
                    to-emerald-400/0
                    opacity-0
                    group-focus-within:opacity-100
                    blur-sm
                    transition-all
                    duration-500
                  "
                />

                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="
                    relative
                    w-full
                    px-5
                    py-4
                    rounded-2xl
                    bg-black/30
                    border
                    border-white/10
                    backdrop-blur-2xl
                    text-cyan-50
                    placeholder:text-cyan-100/25
                    outline-none
                    transition-all
                    duration-300
                    focus:border-cyan-300/40
                    focus:bg-black/40
                    focus:shadow-[0_0_25px_rgba(34,211,238,0.12)]
                  "
                />

              </div>
            ))}

            <button
              type="submit"
              className="
                mt-3
                rounded-2xl
                py-4
                font-bold
                tracking-[2px]
                uppercase
                text-cyan-50
                border
                border-white/10
                bg-white/[0.06]
                backdrop-blur-2xl
                shadow-[0_0_30px_rgba(34,211,238,0.10)]
                transition-all
                duration-300
                hover:bg-white/[0.08]
                hover:border-cyan-300/20
                active:scale-[0.99]
                hover:cursor-pointer
              "
            >
              Create Account
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default App;