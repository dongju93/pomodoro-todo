import type React from "react";
import { useState } from "react";
import { FiCalendar, FiClock, FiMoreHorizontal, FiPlus, FiTag } from "react-icons/fi";

import { useTodoStore } from "../store/todoStore";
import type { TodoTag } from "../types/todo";

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
        typeof timeInMinutes === "number" && timeInMinutes > 0 ? timeInMinutes : undefined;
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
      Personal: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    };
    return colors[tagName];
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 sm:mb-8">
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-lg sm:p-6 dark:border-slate-700 dark:bg-slate-800">
        <div className="flex gap-2 sm:gap-3">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a new todo..."
            className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:px-4 sm:py-3 sm:text-base dark:border-slate-600 dark:bg-slate-700"
          />
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`rounded-xl p-2 transition-all sm:p-3 ${
              showAdvanced
                ? "bg-indigo-500 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
            }`}
          >
            <FiMoreHorizontal className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <button
            type="submit"
            disabled={!text.trim()}
            className="transform rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2 font-medium text-white transition-all hover:scale-105 hover:from-indigo-600 hover:to-purple-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 sm:px-6 sm:py-3"
          >
            <FiPlus className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>

        {showAdvanced && (
          <div className="slide-in-from-top-2 animate-in space-y-3 duration-300">
            <div className="flex items-center gap-3">
              <FiTag className="h-5 w-5 text-slate-500" />
              <span className="w-16 text-slate-600 text-sm dark:text-slate-400">Tag:</span>
              <div className="flex gap-2">
                {(["Work", "Study", "Personal"] as TodoTag[]).map((tagOption) => (
                  <button
                    key={tagOption}
                    type="button"
                    onClick={() => setTag(tagOption)}
                    className={`rounded-full px-3 py-1 font-medium text-xs transition-all ${
                      tag === tagOption
                        ? getTagColor(tagOption)
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-400 dark:hover:bg-slate-600"
                    }`}
                  >
                    {tagOption}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <FiClock className="h-5 w-5 text-slate-500" />
              <span className="w-16 text-slate-600 text-sm dark:text-slate-400">Timer:</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setTimeInMinutes(25)}
                  className={`rounded-full px-3 py-1 font-medium text-xs transition-all ${
                    timeInMinutes === 25
                      ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-400 dark:hover:bg-slate-600"
                  }`}
                >
                  🍅 25min
                </button>
                <button
                  type="button"
                  onClick={() => setTimeInMinutes(5)}
                  className={`rounded-full px-3 py-1 font-medium text-xs transition-all ${
                    timeInMinutes === 5
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-400 dark:hover:bg-slate-600"
                  }`}
                >
                  ☕ 5min
                </button>
                <button
                  type="button"
                  onClick={() => setTimeInMinutes(15)}
                  className={`rounded-full px-3 py-1 font-medium text-xs transition-all ${
                    timeInMinutes === 15
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-400 dark:hover:bg-slate-600"
                  }`}
                >
                  ⚡ 15min
                </button>
              </div>
              <input
                type="number"
                value={timeInMinutes}
                onChange={(e) =>
                  setTimeInMinutes(e.target.value ? Number.parseInt(e.target.value) : "")
                }
                placeholder="0"
                min="1"
                max="120"
                className="w-20 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1 text-sm transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-700"
              />
              <span className="text-slate-500 text-sm">minutes</span>
            </div>

            <div className="flex items-center gap-3">
              <FiCalendar className="h-5 w-5 text-slate-500" />
              <span className="w-16 text-slate-600 text-sm dark:text-slate-400">Due:</span>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1 text-sm transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-700"
              />
              <span className="text-slate-500 text-sm">(optional)</span>
            </div>
          </div>
        )}
      </div>
    </form>
  );
};
