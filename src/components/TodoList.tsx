import { useTodoStore } from "../store/todoStore";
import { TodoFilters } from "./TodoFilters";
import { TodoItem } from "./TodoItem";

export const TodoList = () => {
    const { todos, filter, sortBy } = useTodoStore();

    const filteredTodos = todos.filter((todo) => {
        if (filter === "All") return true;
        return todo.tag === filter;
    });

    const sortedTodos = [...filteredTodos].sort((a, b) => {
        switch (sortBy) {
            case "dueDate":
                if (!a.dueDate && !b.dueDate) return 0;
                if (!a.dueDate) return 1;
                if (!b.dueDate) return -1;
                return (
                    new Date(a.dueDate).getTime() -
                    new Date(b.dueDate).getTime()
                );
            case "tag":
                return a.tag.localeCompare(b.tag);
            case "dateAdded":
            default:
                return (
                    new Date(b.dateAdded).getTime() -
                    new Date(a.dateAdded).getTime()
                );
        }
    });

    const activeTodos = sortedTodos.filter((todo) => !todo.completed);
    const completedTodos = sortedTodos.filter((todo) => todo.completed);

    if (todos.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center">
                    <span className="text-4xl">📝</span>
                </div>
                <h3 className="text-lg font-medium text-slate-600 dark:text-slate-400 mb-2">
                    No todos yet
                </h3>
                <p className="text-slate-500 dark:text-slate-500">
                    Add your first todo above to get started!
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <TodoFilters />

            {sortedTodos.length === 0 && filter !== "All" && (
                <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center">
                        <span className="text-2xl">🔍</span>
                    </div>
                    <h3 className="text-lg font-medium text-slate-600 dark:text-slate-400 mb-2">
                        No {filter.toLowerCase()} todos
                    </h3>
                    <p className="text-slate-500 dark:text-slate-500">
                        Try a different filter or add some{" "}
                        {filter.toLowerCase()} todos!
                    </p>
                </div>
            )}

            {activeTodos.length > 0 && (
                <div>
                    <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                        Active ({activeTodos.length})
                    </h2>
                    <div className="space-y-3">
                        {activeTodos.map((todo) => (
                            <TodoItem key={todo.id} todo={todo} />
                        ))}
                    </div>
                </div>
            )}

            {completedTodos.length > 0 && (
                <div>
                    <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        Completed ({completedTodos.length})
                    </h2>
                    <div className="space-y-3">
                        {completedTodos.map((todo) => (
                            <TodoItem key={todo.id} todo={todo} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
