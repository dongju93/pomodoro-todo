import React, { useState } from "react";
import {
    FiCalendar,
    FiClock,
    FiMoreHorizontal,
    FiPlus,
    FiTag,
} from "react-icons/fi";

import { useTodoStore } from "../store/todoStore";
import { TodoTag } from "../types/todo";

export const AddTodo = () => {
    const [text, setText] = useState("");
    const [tag, setTag] = useState<TodoTag>("Personal");
    const [timeInMinutes, setTimeInMinutes] = useState<number | "">("");
    const [dueDate, setDueDate] = useState("");
    const [showAdvanced, setShowAdvanced] = useState(false);
    const addTodo = useTodoStore((state) => state.addTodo);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (text.trim()) {
            const timeValue =
                typeof timeInMinutes === "number" && timeInMinutes > 0
                    ? timeInMinutes
                    : undefined;
            const dueDateValue = dueDate ? new Date(dueDate) : undefined;
            addTodo(text.trim(), tag, timeValue, dueDateValue);
            setText("");
            setTimeInMinutes("");
            setDueDate("");
            setTag("Personal");
            setShowAdvanced(false);
        }
    };

    const getTagColor = (tagName: TodoTag) => {
        const colors = {
            Work: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
            Study: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
            Personal:
                "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
        };
        return colors[tagName];
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6 sm:mb-8">
            <div className="flex flex-col gap-4 p-4 sm:p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
                <div className="flex gap-2 sm:gap-3">
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Add a new todo..."
                        className="flex-1 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                    <button
                        type="button"
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        className={`p-2 sm:p-3 rounded-xl transition-all ${
                            showAdvanced
                                ? "bg-indigo-500 text-white"
                                : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                        }`}
                    >
                        <FiMoreHorizontal className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button
                        type="submit"
                        disabled={!text.trim()}
                        className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:from-indigo-600 hover:to-purple-700 transition-all transform hover:scale-105 active:scale-95"
                    >
                        <FiPlus className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                </div>

                {showAdvanced && (
                    <div className="space-y-3 animate-in slide-in-from-top-2 duration-300">
                        <div className="flex items-center gap-3">
                            <FiTag className="w-5 h-5 text-slate-500" />
                            <span className="text-sm text-slate-600 dark:text-slate-400 w-16">
                                Tag:
                            </span>
                            <div className="flex gap-2">
                                {(
                                    ["Work", "Study", "Personal"] as TodoTag[]
                                ).map((tagOption) => (
                                    <button
                                        key={tagOption}
                                        type="button"
                                        onClick={() => setTag(tagOption)}
                                        className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
                                            tag === tagOption
                                                ? getTagColor(tagOption)
                                                : "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600"
                                        }`}
                                    >
                                        {tagOption}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-3 flex-wrap">
                            <FiClock className="w-5 h-5 text-slate-500" />
                            <span className="text-sm text-slate-600 dark:text-slate-400 w-16">
                                Timer:
                            </span>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => setTimeInMinutes(25)}
                                    className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
                                        timeInMinutes === 25
                                            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                            : "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600"
                                    }`}
                                >
                                    🍅 25min
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setTimeInMinutes(5)}
                                    className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
                                        timeInMinutes === 5
                                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                            : "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600"
                                    }`}
                                >
                                    ☕ 5min
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setTimeInMinutes(15)}
                                    className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
                                        timeInMinutes === 15
                                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                            : "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600"
                                    }`}
                                >
                                    ⚡ 15min
                                </button>
                            </div>
                            <input
                                type="number"
                                value={timeInMinutes}
                                onChange={(e) =>
                                    setTimeInMinutes(
                                        e.target.value
                                            ? parseInt(e.target.value)
                                            : ""
                                    )
                                }
                                placeholder="0"
                                min="1"
                                max="120"
                                className="w-20 px-3 py-1 text-sm bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                            />
                            <span className="text-sm text-slate-500">
                                minutes
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            <FiCalendar className="w-5 h-5 text-slate-500" />
                            <span className="text-sm text-slate-600 dark:text-slate-400 w-16">
                                Due:
                            </span>
                            <input
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                className="px-3 py-1 text-sm bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                            />
                            <span className="text-sm text-slate-500">
                                (optional)
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </form>
    );
};
