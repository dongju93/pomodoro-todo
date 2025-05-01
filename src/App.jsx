import "./App.css";

import { useState } from "react";

import viteLogo from "/vite.svg";

import reactLogo from "./assets/react.svg";

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            <div className="container mx-auto px-4 py-12">
                <div className="flex justify-center gap-10 mb-10">
                    <a
                        href="https://vite.dev"
                        target="_blank"
                        rel="noreferrer"
                        className="group relative"
                    >
                        <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 blur transition duration-300 group-hover:opacity-70"></div>
                        <img
                            src={viteLogo}
                            className="relative h-24 w-24 transition-transform duration-300 hover:rotate-[-8deg]"
                            alt="Vite logo"
                        />
                    </a>
                    <a
                        href="https://react.dev"
                        target="_blank"
                        rel="noreferrer"
                        className="group relative"
                    >
                        <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-cyan-400 to-sky-500 opacity-0 blur transition duration-300 group-hover:opacity-70"></div>
                        <img
                            src={reactLogo}
                            className="relative h-24 w-24 animate-spin motion-reduce:animate-none"
                            alt="React logo"
                        />
                    </a>
                </div>
                <h1 className="text-4xl font-bold mb-10 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
                    Vite + React
                </h1>
                <div className="max-w-md mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden p-8 border border-slate-200 dark:border-slate-700 transition-all hover:shadow-xl">
                    <button
                        className="w-full px-4 py-3 mb-6 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium tracking-wide transition-all hover:from-purple-700 hover:to-indigo-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 focus:outline-none"
                        onClick={() => setCount((count) => count + 1)}
                    >
                        <span className="flex items-center justify-center">
                            <span className="mr-2">Count is</span>
                            <span className="bg-white/20 px-2 py-1 rounded-md text-sm">
                                {count}
                            </span>
                        </span>
                    </button>
                    <p className="text-slate-600 dark:text-slate-300">
                        Edit{" "}
                        <code className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-sm font-mono">
                            src/App.jsx
                        </code>{" "}
                        and save to test HMR
                    </p>
                </div>
                <p className="mt-8 text-slate-500 dark:text-slate-400 text-sm text-center">
                    Click on the Vite and React logos to learn more
                </p>
            </div>
        </div>
    );
}

export default App;
