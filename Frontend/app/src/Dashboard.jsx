import { useEffect, useState } from "react";

function Dashboard() {
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        async function fetchDashboard() {
            try {
                const response = await fetch(
                    "http://localhost:5000/dashboard",
                    {
                        method: "GET",
                        credentials: "include"
                    }
                );
                const data = await response.json();
                setSessions(data.sessions);
            } catch (err) {
                console.log(err);
            }
        }

        fetchDashboard();
    }, []);

    return (
        <div className="min-h-screen bg-black text-white p-10 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-cyan-500/10 blur-[150px] rounded-full" />
            <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-emerald-500/10 blur-[150px] rounded-full" />

            <div className="relative z-10">
                <h1 className="text-5xl font-black mb-10 bg-gradient-to-r from-cyan-300 via-white to-emerald-300 bg-clip-text text-transparent">
                    JWT Observatory Dashboard
                </h1>

                <div className="grid gap-6">
                    {sessions.map((session, index) => (
                        <div
                            key={index}
                            className="p-6 rounded-3xl border border-cyan-400/10 bg-white/[0.04] backdrop-blur-3xl shadow-[0_0_40px_rgba(34,211,238,0.08)]"
                        >
                            <h2 className="text-2xl font-bold text-cyan-200 mb-4">
                                {session.username}
                            </h2>
                            <div className="space-y-2 text-cyan-50/80">
                                <p>
                                    <span className="text-cyan-300">Email:</span>{" "}
                                    {session.email}
                                </p>
                                <p>
                                    <span className="text-cyan-300">IP Address:</span>{" "}
                                    {session.ip}
                                </p>
                                <p>
                                    <span className="text-cyan-300">Device:</span>{" "}
                                    {session.device}
                                </p>
                                <p>
                                    <span className="text-cyan-300">Method:</span>{" "}
                                    {session.method}
                                </p>
                                <p>
                                    <span className="text-cyan-300">URL:</span>{" "}
                                    {session.url}
                                </p>
                                <p>
                                    <span className="text-cyan-300">Protocol:</span>{" "}
                                    {session.protocol}
                                </p>
                                <p>
                                    <span className="text-cyan-300">Time:</span>{" "}
                                    {new Date(session.timestamp).toLocaleString()}
                                </p>
                                <p>
                                    <span className="text-cyan-300">Replay Attack:</span>{" "}
                                    {session.replayAttack ? "Detected" : "Safe"}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;