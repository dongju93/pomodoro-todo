export type TodoTag = "Work" | "Study" | "Personal";

export interface Todo {
    id: string;
    text: string;
    completed: boolean;
    dateAdded: Date;
    dateCompleted?: Date;
    dueDate?: Date;
    tag: TodoTag;
    timeInMinutes?: number;
    timeRemaining?: number;
    isRunning?: boolean;
    isPaused?: boolean;
}

export interface TodoStore {
    todos: Todo[];
    filter: TodoTag | "All";
    sortBy: "dateAdded" | "dueDate" | "tag";
    addTodo: (
        text: string,
        tag: TodoTag,
        timeInMinutes?: number,
        dueDate?: Date
    ) => void;
    toggleTodo: (id: string) => void;
    deleteTodo: (id: string) => void;
    editTodo: (id: string, text: string) => void;
    setFilter: (filter: TodoTag | "All") => void;
    setSortBy: (sortBy: "dateAdded" | "dueDate" | "tag") => void;
    startTimer: (id: string) => void;
    pauseTimer: (id: string) => void;
    updateTimer: (id: string, timeRemaining: number) => void;
    completeTimer: (id: string) => void;
}
