import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { Todo, TodoStore, TodoTag } from "../types/todo";

export const useTodoStore = create<TodoStore>()(
    persist(
        (set, get) => ({
            todos: [],
            filter: "All",
            sortBy: "dateAdded",

            addTodo: (
                text: string,
                tag: TodoTag,
                timeInMinutes?: number,
                dueDate?: Date
            ) => {
                const newTodo: Todo = {
                    id: crypto.randomUUID(),
                    text,
                    tag,
                    completed: false,
                    dateAdded: new Date(),
                    dueDate,
                    timeInMinutes,
                    timeRemaining: timeInMinutes
                        ? timeInMinutes * 60
                        : undefined,
                    isRunning: false,
                    isPaused: false,
                };

                set((state) => ({
                    todos: [...state.todos, newTodo],
                }));
            },

            setFilter: (filter: TodoTag | "All") => {
                set({ filter });
            },

            setSortBy: (sortBy: "dateAdded" | "dueDate" | "tag") => {
                set({ sortBy });
            },

            toggleTodo: (id: string) => {
                set((state) => ({
                    todos: state.todos.map((todo) =>
                        todo.id === id
                            ? {
                                  ...todo,
                                  completed: !todo.completed,
                                  dateCompleted: !todo.completed
                                      ? new Date()
                                      : undefined,
                                  isRunning: false,
                                  isPaused: false,
                              }
                            : todo
                    ),
                }));
            },

            deleteTodo: (id: string) => {
                set((state) => ({
                    todos: state.todos.filter((todo) => todo.id !== id),
                }));
            },

            editTodo: (id: string, text: string) => {
                set((state) => ({
                    todos: state.todos.map((todo) =>
                        todo.id === id ? { ...todo, text } : todo
                    ),
                }));
            },

            startTimer: (id: string) => {
                set((state) => ({
                    todos: state.todos.map((todo) =>
                        todo.id === id
                            ? { ...todo, isRunning: true, isPaused: false }
                            : { ...todo, isRunning: false }
                    ),
                }));
            },

            pauseTimer: (id: string) => {
                set((state) => ({
                    todos: state.todos.map((todo) =>
                        todo.id === id
                            ? { ...todo, isRunning: false, isPaused: true }
                            : todo
                    ),
                }));
            },

            updateTimer: (id: string, timeRemaining: number) => {
                set((state) => ({
                    todos: state.todos.map((todo) =>
                        todo.id === id ? { ...todo, timeRemaining } : todo
                    ),
                }));
            },

            completeTimer: (id: string) => {
                const { todos } = get();
                const todo = todos.find((t) => t.id === id);

                if (todo) {
                    // Show notification with proper Mac handling
                    if ("Notification" in window) {
                        if (Notification.permission === "granted") {
                            new Notification("🍅 Pomodoro Complete!", {
                                body: `"${todo.text}" timer has finished!`,
                                tag: "pomodoro-complete",
                                requireInteraction: true,
                                silent: false,
                            });
                        } else if (Notification.permission !== "denied") {
                            // Request permission and show notification if granted
                            Notification.requestPermission().then(
                                (permission) => {
                                    if (permission === "granted") {
                                        new Notification(
                                            "🍅 Pomodoro Complete!",
                                            {
                                                body: `"${todo.text}" timer has finished!`,
                                                tag: "pomodoro-complete",
                                                requireInteraction: true,
                                                silent: false,
                                            }
                                        );
                                    }
                                }
                            );
                        }
                    }

                    set((state) => ({
                        todos: state.todos.map((t) =>
                            t.id === id
                                ? {
                                      ...t,
                                      completed: true,
                                      dateCompleted: new Date(),
                                      isRunning: false,
                                      isPaused: false,
                                      timeRemaining: 0,
                                  }
                                : t
                        ),
                    }));
                }
            },
        }),
        {
            name: "pomodoro-todo-storage",
            storage: createJSONStorage(() => localStorage),
            onRehydrateStorage: () => (state) => {
                if (state) {
                    // Migrate existing todos that don't have tags
                    state.todos = state.todos.map((todo: any) => ({
                        ...todo,
                        tag: todo.tag || "Personal", // Default tag for existing todos
                        dateAdded:
                            typeof todo.dateAdded === "string"
                                ? new Date(todo.dateAdded)
                                : todo.dateAdded,
                        dateCompleted: todo.dateCompleted
                            ? typeof todo.dateCompleted === "string"
                                ? new Date(todo.dateCompleted)
                                : todo.dateCompleted
                            : undefined,
                        dueDate: todo.dueDate
                            ? typeof todo.dueDate === "string"
                                ? new Date(todo.dueDate)
                                : todo.dueDate
                            : undefined,
                    }));
                }
            },
        }
    )
);
