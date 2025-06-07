import "./App.css";

import { AddTodo } from "./components/AddTodo";
import { DarkModeToggle } from "./components/DarkModeToggle";
import { TodoList } from "./components/TodoList";
import { useNotifications } from "./hooks/useNotifications";

function App() {
    const {
        testNotification,
        requestPermission,
        getPermissionStatus,
        permission,
    } = useNotifications();
    const permissionInfo = getPermissionStatus();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            <div className="container mx-auto px-4 py-4 sm:py-8 max-w-4xl">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2 flex-wrap">
                        {permission === "denied" ? (
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-red-600 font-medium">
                                    알림 차단됨
                                </span>
                                <span className="text-xs text-slate-500">
                                    브라우저 설정에서 알림을 허용해주세요
                                </span>
                            </div>
                        ) : (
                            <>
                                <button
                                    onClick={testNotification}
                                    className="px-3 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                                >
                                    🧪 알림 테스트
                                </button>
                                {permission === "default" && (
                                    <button
                                        onClick={requestPermission}
                                        className="px-3 py-2 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
                                    >
                                        🔔 알림 허용
                                    </button>
                                )}
                                <span
                                    className={`text-xs font-medium ${permissionInfo.color}`}
                                >
                                    {permissionInfo.status}
                                </span>
                            </>
                        )}
                    </div>
                    <DarkModeToggle />
                </div>
                <header className="text-center mb-8 sm:mb-12">
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-lg sm:text-xl font-bold shadow-lg">
                            🍅
                        </div>
                        <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 bg-clip-text text-transparent dark:from-indigo-400 dark:via-purple-400 dark:to-indigo-300">
                            Pomodoro Todo
                        </h1>
                    </div>
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-md mx-auto px-4">
                        Boost your productivity with time-based todos and the
                        Pomodoro Technique
                    </p>
                </header>

                <main>
                    <AddTodo />
                    <TodoList />
                </main>
            </div>
        </div>
    );
}

export default App;
