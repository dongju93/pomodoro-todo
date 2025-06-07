import { useEffect, useState } from "react";
import {
    FiCalendar,
    FiCheck,
    FiClock,
    FiEdit2,
    FiPause,
    FiPlay,
    FiTrash2,
    FiX,
} from "react-icons/fi";

import { useTodoStore } from "../store/todoStore";
import { Todo, TodoTag } from "../types/todo";

interface TodoItemProps {
    todo: Todo;
}

export const TodoItem = ({ todo }: TodoItemProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);
    const {
        toggleTodo,
        deleteTodo,
        editTodo,
        startTimer,
        pauseTimer,
        updateTimer,
        completeTimer,
    } = useTodoStore();

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs
            .toString()
            .padStart(2, "0")}`;
    };

    const formatDate = (date: Date | string) => {
        const dateObj = typeof date === "string" ? new Date(date) : date;
        if (isNaN(dateObj.getTime())) {
            return "Invalid date";
        }
        return new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }).format(dateObj);
    };

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;

        if (todo.isRunning && todo.timeRemaining && todo.timeRemaining > 0) {
            interval = setInterval(() => {
                const newTime = (todo.timeRemaining || 0) - 1;
                if (newTime <= 0) {
                    completeTimer(todo.id);
                } else {
                    updateTimer(todo.id, newTime);
                }
            }, 1000);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [
        todo.isRunning,
        todo.timeRemaining,
        todo.id,
        updateTimer,
        completeTimer,
    ]);

    const handleEdit = () => {
        if (editText.trim() && editText !== todo.text) {
            editTodo(todo.id, editText.trim());
        }
        setIsEditing(false);
    };

    const handleTimerToggle = () => {
        if (todo.isRunning) {
            pauseTimer(todo.id);
        } else {
            startTimer(todo.id);
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

    const isOverdue =
        todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;

    return (
        <div
            className={`group p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm border transition-all hover:shadow-md animate-in ${
                todo.completed ? "opacity-75" : ""
            } ${
                todo.isRunning
                    ? "border-indigo-400 dark:border-indigo-500 animate-pulse-glow bg-indigo-50/50 dark:bg-indigo-950/20"
                    : isOverdue
                    ? "border-red-300 dark:border-red-700"
                    : "border-slate-200 dark:border-slate-700"
            }`}
        >
            <div className="flex items-start gap-3">
                <button
                    onClick={() => toggleTodo(todo.id)}
                    className={`mt-1 p-2 rounded-full transition-all ${
                        todo.completed
                            ? "bg-green-500 text-white"
                            : "border-2 border-slate-300 dark:border-slate-600 hover:border-green-500"
                    }`}
                >
                    {todo.completed && <FiCheck className="w-4 h-4" />}
                </button>

                <div className="flex-1 min-w-0">
                    {isEditing ? (
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                className="flex-1 px-3 py-1 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") handleEdit();
                                    if (e.key === "Escape") setIsEditing(false);
                                }}
                                autoFocus
                            />
                            <button
                                onClick={handleEdit}
                                className="p-1 text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 rounded"
                            >
                                <FiCheck className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                            >
                                <FiX className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <h3
                                    className={`font-medium ${
                                        todo.completed
                                            ? "line-through text-slate-500"
                                            : "text-slate-900 dark:text-slate-100"
                                    }`}
                                >
                                    {todo.text}
                                </h3>
                                <span
                                    className={`px-2 py-1 text-xs font-medium rounded-full ${getTagColor(
                                        todo.tag
                                    )}`}
                                >
                                    {todo.tag}
                                </span>
                            </div>
                            <div className="flex items-center gap-4 mt-2 text-sm text-slate-500 flex-wrap">
                                <span className="flex items-center gap-1">
                                    <FiClock className="w-3 h-3" />
                                    Added {formatDate(todo.dateAdded)}
                                </span>
                                {todo.dueDate && (
                                    <span
                                        className={`flex items-center gap-1 ${
                                            isOverdue
                                                ? "text-red-500 font-medium"
                                                : ""
                                        }`}
                                    >
                                        <FiCalendar className="w-3 h-3" />
                                        Due {formatDate(todo.dueDate)}
                                        {isOverdue && (
                                            <span className="text-red-500">
                                                ⚠️
                                            </span>
                                        )}
                                    </span>
                                )}
                                {todo.dateCompleted && (
                                    <span className="flex items-center gap-1 text-green-600">
                                        <FiCheck className="w-3 h-3" />
                                        Completed{" "}
                                        {formatDate(todo.dateCompleted)}
                                    </span>
                                )}
                            </div>

                            {todo.timeInMinutes && (
                                <div className="mt-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <FiClock className="w-4 h-4 text-indigo-500" />
                                            <span className="text-sm font-medium">
                                                {todo.completed
                                                    ? "Completed!"
                                                    : typeof todo.timeRemaining ===
                                                      "number"
                                                    ? formatTime(
                                                          todo.timeRemaining
                                                      )
                                                    : "00:00"}
                                            </span>
                                            <span className="text-xs text-slate-500">
                                                /{" "}
                                                {formatTime(
                                                    todo.timeInMinutes * 60
                                                )}
                                            </span>
                                        </div>

                                        {!todo.completed &&
                                            todo.timeRemaining &&
                                            todo.timeRemaining > 0 && (
                                                <button
                                                    onClick={handleTimerToggle}
                                                    className={`p-2 rounded-lg transition-all ${
                                                        todo.isRunning
                                                            ? "bg-red-500 text-white hover:bg-red-600"
                                                            : "bg-indigo-500 text-white hover:bg-indigo-600"
                                                    }`}
                                                >
                                                    {todo.isRunning ? (
                                                        <FiPause className="w-4 h-4" />
                                                    ) : (
                                                        <FiPlay className="w-4 h-4" />
                                                    )}
                                                </button>
                                            )}
                                    </div>

                                    {todo.timeInMinutes &&
                                        typeof todo.timeRemaining ===
                                            "number" && (
                                            <div className="mt-2 w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2">
                                                <div
                                                    className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400 h-2 rounded-full transition-all duration-1000 shadow-sm"
                                                    style={{
                                                        width: `${
                                                            ((todo.timeInMinutes *
                                                                60 -
                                                                todo.timeRemaining) /
                                                                (todo.timeInMinutes *
                                                                    60)) *
                                                            100
                                                        }%`,
                                                    }}
                                                />
                                            </div>
                                        )}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {!isEditing && !todo.completed && (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all"
                        >
                            <FiEdit2 className="w-4 h-4" />
                        </button>
                    )}
                    <button
                        onClick={() => deleteTodo(todo.id)}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                    >
                        <FiTrash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};
