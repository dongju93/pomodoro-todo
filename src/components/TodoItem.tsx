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
import type { Todo, TodoTag } from "../types/todo";

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem = ({ todo }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const { toggleTodo, deleteTodo, editTodo, startTimer, pauseTimer, updateTimer, completeTimer } =
    useTodoStore();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    if (Number.isNaN(dateObj.getTime())) {
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
  }, [todo.isRunning, todo.timeRemaining, todo.id, updateTimer, completeTimer]);

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
      Personal: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    };
    return colors[tagName];
  };

  const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;

  return (
    <div
      className={`group animate-in rounded-xl border bg-white p-4 shadow-sm transition-all hover:shadow-md dark:bg-slate-800 ${
        todo.completed ? "opacity-75" : ""
      } ${
        todo.isRunning
          ? "animate-pulse-glow border-indigo-400 bg-indigo-50/50 dark:border-indigo-500 dark:bg-indigo-950/20"
          : isOverdue
            ? "border-red-300 dark:border-red-700"
            : "border-slate-200 dark:border-slate-700"
      }`}
    >
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={() => toggleTodo(todo.id)}
          className={`mt-1 rounded-full p-2 transition-all ${
            todo.completed
              ? "bg-green-500 text-white"
              : "border-2 border-slate-300 hover:border-green-500 dark:border-slate-600"
          }`}
        >
          {todo.completed && <FiCheck className="h-4 w-4" />}
        </button>

        <div className="min-w-0 flex-1">
          {isEditing ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-700"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleEdit();
                  if (e.key === "Escape") setIsEditing(false);
                }}
              />
              <button
                type="button"
                onClick={handleEdit}
                className="rounded p-1 text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20"
              >
                <FiCheck className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="rounded p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <FiX className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div>
              <div className="mb-2 flex items-center gap-2">
                <h3
                  className={`font-medium ${
                    todo.completed
                      ? "text-slate-500 line-through"
                      : "text-slate-900 dark:text-slate-100"
                  }`}
                >
                  {todo.text}
                </h3>
                <span
                  className={`rounded-full px-2 py-1 font-medium text-xs ${getTagColor(todo.tag)}`}
                >
                  {todo.tag}
                </span>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-4 text-slate-500 text-sm">
                <span className="flex items-center gap-1">
                  <FiClock className="h-3 w-3" />
                  Added {formatDate(todo.dateAdded)}
                </span>
                {todo.dueDate && (
                  <span
                    className={`flex items-center gap-1 ${
                      isOverdue ? "font-medium text-red-500" : ""
                    }`}
                  >
                    <FiCalendar className="h-3 w-3" />
                    Due {formatDate(todo.dueDate)}
                    {isOverdue && <span className="text-red-500">⚠️</span>}
                  </span>
                )}
                {todo.dateCompleted && (
                  <span className="flex items-center gap-1 text-green-600">
                    <FiCheck className="h-3 w-3" />
                    Completed {formatDate(todo.dateCompleted)}
                  </span>
                )}
              </div>

              {todo.timeInMinutes && (
                <div className="mt-3 rounded-lg bg-slate-50 p-3 dark:bg-slate-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FiClock className="h-4 w-4 text-indigo-500" />
                      <span className="font-medium text-sm">
                        {todo.completed
                          ? "Completed!"
                          : typeof todo.timeRemaining === "number"
                            ? formatTime(todo.timeRemaining)
                            : "00:00"}
                      </span>
                      <span className="text-slate-500 text-xs">
                        / {formatTime(todo.timeInMinutes * 60)}
                      </span>
                    </div>

                    {!todo.completed && todo.timeRemaining && todo.timeRemaining > 0 && (
                      <button
                        type="button"
                        onClick={handleTimerToggle}
                        className={`rounded-lg p-2 transition-all ${
                          todo.isRunning
                            ? "bg-red-500 text-white hover:bg-red-600"
                            : "bg-indigo-500 text-white hover:bg-indigo-600"
                        }`}
                      >
                        {todo.isRunning ? (
                          <FiPause className="h-4 w-4" />
                        ) : (
                          <FiPlay className="h-4 w-4" />
                        )}
                      </button>
                    )}
                  </div>

                  {todo.timeInMinutes && typeof todo.timeRemaining === "number" && (
                    <div className="mt-2 h-2 w-full rounded-full bg-slate-200 dark:bg-slate-600">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-sm transition-all duration-1000 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400"
                        style={{
                          width: `${
                            ((todo.timeInMinutes * 60 - todo.timeRemaining) /
                              (todo.timeInMinutes * 60)) *
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

        <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          {!isEditing && !todo.completed && (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="rounded-lg p-2 text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-300"
            >
              <FiEdit2 className="h-4 w-4" />
            </button>
          )}
          <button
            type="button"
            onClick={() => deleteTodo(todo.id)}
            className="rounded-lg p-2 text-slate-400 transition-all hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20"
          >
            <FiTrash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
