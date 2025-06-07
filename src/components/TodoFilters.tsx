import { FiArrowDown, FiFilter } from "react-icons/fi";

import { useTodoStore } from "../store/todoStore";
import { TodoTag } from "../types/todo";

export const TodoFilters = () => {
    const { filter, sortBy, setFilter, setSortBy } = useTodoStore();

    const getTagColor = (tagName: TodoTag | "All") => {
        const colors = {
            All: "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200",
            Work: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
            Study: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
            Personal:
                "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
        };
        return colors[tagName];
    };

    return (
        <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex flex-col gap-3 sm:gap-4">
                <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex items-center gap-2">
                        <FiFilter className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500" />
                        <span className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">
                            Filter:
                        </span>
                    </div>
                    <div className="flex gap-1 sm:gap-2 flex-wrap">
                        {(["All", "Work", "Study", "Personal"] as const).map(
                            (tagOption) => (
                                <button
                                    key={tagOption}
                                    onClick={() => setFilter(tagOption)}
                                    className={`px-2 sm:px-3 py-1 text-xs font-medium rounded-full transition-all ${
                                        filter === tagOption
                                            ? getTagColor(tagOption)
                                            : "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600"
                                    }`}
                                >
                                    {tagOption}
                                </button>
                            )
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex items-center gap-2">
                        <FiArrowDown className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500" />
                        <span className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">
                            Sort by:
                        </span>
                    </div>
                    <select
                        value={sortBy}
                        onChange={(e) =>
                            setSortBy(
                                e.target.value as
                                    | "dateAdded"
                                    | "dueDate"
                                    | "tag"
                            )
                        }
                        className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    >
                        <option value="dateAdded">Date Added</option>
                        <option value="dueDate">Due Date</option>
                        <option value="tag">Tag</option>
                    </select>
                </div>
            </div>
        </div>
    );
};
