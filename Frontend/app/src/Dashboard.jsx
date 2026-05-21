import { useEffect, useState } from "react";

function Dashboard() {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDashboard() {
            try {
                const response = await fetch("http://localhost:5000/dashboard", {
                    method: "GET",
                    credentials: "include"
                });

                const data = await response.json();
                setSessions(data.sessions || []);
            } catch (err) {
                console.error("Dashboard fetch failed:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchDashboard();
    }, []);

    const totalSessions = sessions.length;
    const activeThreats = sessions.filter(s => s.replayAttack).length;
    const uniqueIps = new Set(sessions.map(s => s.ip)).size;

    const glassStyle =
        "bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] shadow-[0_8px_32px_0_rgba(15,23,42,0.3)]";

    return (
        <div className="min-h-screen bg-[#09090e] text-slate-100 font-sans selection:bg-violet-500/30 relative overflow-hidden antialiased">

            <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-violet-600/10 blur-[160px] rounded-full pointer-events-none" />

            <div className="absolute bottom-[10%] right-[-5%] w-[700px] h-[700px] bg-sky-500/10 blur-[180px] rounded-full pointer-events-none" />

            <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[500px] h-[500px] bg-indigo-500/5 blur-[140px] rounded-full pointer-events-none" />

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">

                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 pb-6 border-b border-white/[0.06]">

                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse" />

                            <p className="text-xs font-semibold tracking-widest text-sky-400 uppercase">
                                Live Security Feed
                            </p>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-sky-300 bg-clip-text text-transparent">
                            JWT Observatory
                        </h1>
                    </div>

                    <div className={`${glassStyle} px-4 py-2 rounded-xl flex items-center gap-3 text-sm`}>
                        <span className="text-slate-400">System Status:</span>

                        <span className="text-emerald-400 font-medium flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            Operational
                        </span>
                    </div>
                </header>

                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">

                    <div className={`${glassStyle} p-6 rounded-2xl relative overflow-hidden group transition-all duration-300 hover:border-white/[0.1]`}>
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-4xl">
                            
                        </div>

                        <p className="text-xs font-medium tracking-wider text-slate-400 uppercase">
                            Total Supervised Traffic
                        </p>

                        <h3 className="text-3xl font-bold mt-2 text-white">
                            {loading ? "..." : totalSessions}
                        </h3>

                        <p className="text-xs text-slate-500 mt-1">
                            Active cryptographic payloads tracked
                        </p>
                    </div>

                    <div className={`${glassStyle} p-6 rounded-2xl relative overflow-hidden group transition-all duration-300 hover:border-white/[0.1]`}>
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-4xl">
                            
                        </div>

                        <p className="text-xs font-medium tracking-wider text-slate-400 uppercase">
                            Unique Source Nodes
                        </p>

                        <h3 className="text-3xl font-bold mt-2 text-sky-300">
                            {loading ? "..." : uniqueIps}
                        </h3>

                        <p className="text-xs text-slate-500 mt-1">
                            Distinct remote IP nodes verified
                        </p>
                    </div>

                    <div
                        className={`${glassStyle} p-6 rounded-2xl relative overflow-hidden group transition-all duration-300 ${activeThreats > 0
                                ? "border-rose-500/20 bg-rose-950/5"
                                : "hover:border-white/[0.1]"
                            }`}
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 text-4xl">
                            
                        </div>

                        <p className="text-xs font-medium tracking-wider text-slate-400 uppercase">
                            Intercepted Replays
                        </p>

                        <h3
                            className={`text-3xl font-bold mt-2 ${activeThreats > 0
                                    ? "text-rose-400"
                                    : "text-slate-300"
                                }`}
                        >
                            {loading ? "..." : activeThreats}
                        </h3>

                        <p className="text-xs text-slate-500 mt-1">
                            Stale or cloned tokens rejected
                        </p>
                    </div>
                </section>

                <main className="space-y-4">

                    <div className="flex justify-between items-center px-2">
                        <h2 className="text-lg font-medium text-slate-300">
                            Monitored Sessions
                        </h2>

                        <span className="text-xs text-slate-500">
                            Showing {sessions.length} entries
                        </span>
                    </div>

                    {loading ? (
                        <div className="text-center py-20 text-slate-500 tracking-wide text-sm">
                            <span className="inline-block animate-spin mr-2">
                                ⏳
                            </span>

                            Syncing telemetry cluster...
                        </div>
                    ) : sessions.length === 0 ? (
                        <div className={`${glassStyle} text-center py-16 rounded-2xl text-slate-400 text-sm`}>
                            No active sessions broadcasted to this node.
                        </div>
                    ) : (
                        <div className="space-y-3.5">

                            {sessions.map((session, index) => (
                                <div
                                    key={index}
                                    className={`${glassStyle} p-5 md:p-6 rounded-2xl transition-all duration-300 hover:bg-white/[0.04] hover:translate-x-0.5 group`}
                                >
                                    <div className="flex flex-col lg:flex-row justify-between gap-4 items-start lg:items-center">
                                        <div className="flex items-start gap-4">

                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600/30 to-sky-500/20 border border-violet-500/20 flex items-center justify-center font-bold text-sm text-sky-200">
                                                {session.username?.substring(0, 2).toUpperCase() || "??"}
                                            </div>

                                            <div>
                                                <div className="flex flex-wrap items-center gap-2">

                                                    <h3 className="text-base font-semibold text-white tracking-wide">
                                                        {session.username}
                                                    </h3>

                                                    <span className="text-xs text-slate-400 bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.05]">
                                                        {session.email}
                                                    </span>
                                                </div>

                                                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-xs text-slate-400">

                                                    <span>
                                                        IP:
                                                        <span className="font-mono text-slate-300">
                                                            {" "}
                                                            {session.ip}
                                                        </span>
                                                    </span>

                                                    <span className="hidden sm:inline text-white/[0.1]">
                                                        |
                                                    </span>

                                                    <span>
                                                        Device:
                                                        <span className="text-slate-300">
                                                            {" "}
                                                            {session.device}
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto justify-start sm:justify-end">

                                            <div className="text-xs font-mono bg-slate-900/40 rounded-lg p-1.5 flex items-center gap-2 border border-white/[0.02]">

                                                <span
                                                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${session.method === "GET"
                                                            ? "bg-sky-500/10 text-sky-400"
                                                            : "bg-violet-500/10 text-violet-400"
                                                        }`}
                                                >
                                                    {session.method}
                                                </span>

                                                <span className="text-slate-300 pr-1.5">
                                                    {session.url}
                                                </span>
                                            </div>

                                            <span className="text-[11px] font-medium text-slate-400 px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                                                {session.protocol}
                                            </span>

                                            <span className="text-[11px] text-slate-400 font-mono bg-white/[0.03] px-2.5 py-1 rounded-lg border border-white/[0.05]">
                                                {new Date(session.timestamp).toLocaleTimeString([], {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                    second: "2-digit"
                                                })}
                                            </span>

                                            <span
                                                className={`text-xs font-medium px-2.5 py-1 rounded-lg transition-colors ${session.replayAttack
                                                        ? "bg-rose-500/10 text-rose-400 border border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.1)]"
                                                        : "bg-emerald-500/5 text-emerald-400 border border-emerald-500/10"
                                                    }`}
                                            >
                                                {session.replayAttack
                                                    ? "Replay Malice"
                                                    : "✓ Trusted"}
                                            </span>

                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default Dashboard;