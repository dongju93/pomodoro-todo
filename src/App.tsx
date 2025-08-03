import "./App.css";

import { AddTodo } from "./components/AddTodo";
import { DarkModeToggle } from "./components/DarkModeToggle";
import { TodoList } from "./components/TodoList";
import { useNotifications } from "./hooks/useNotifications";

function App() {
  const { testNotification, requestPermission, getPermissionStatus, permission } =
    useNotifications();
  const permissionInfo = getPermissionStatus();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto max-w-4xl px-4 py-4 sm:py-8">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {permission === "denied" ? (
              <div className="flex items-center gap-2">
                <span className="font-medium text-red-600 text-xs">알림 차단됨</span>
                <span className="text-slate-500 text-xs">
                  브라우저 설정에서 알림을 허용해주세요
                </span>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  onClick={testNotification}
                  className="rounded-lg bg-blue-500 px-3 py-2 text-sm text-white transition-all hover:bg-blue-600"
                >
                  🧪 알림 테스트
                </button>
                {permission === "default" && (
                  <button
                    type="button"
                    onClick={requestPermission}
                    className="rounded-lg bg-green-500 px-3 py-2 text-sm text-white transition-all hover:bg-green-600"
                  >
                    🔔 알림 허용
                  </button>
                )}
                <span className={`font-medium text-xs ${permissionInfo.color}`}>
                  {permissionInfo.status}
                </span>
              </>
            )}
          </div>
          <DarkModeToggle />
        </div>
        <header className="mb-8 text-center sm:mb-12">
          <div className="mb-4 inline-flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 font-bold text-lg text-white shadow-lg sm:h-12 sm:w-12 sm:text-xl">
              🍅
            </div>
            <h1 className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 bg-clip-text font-bold text-2xl text-transparent sm:text-4xl dark:from-indigo-400 dark:via-purple-400 dark:to-indigo-300">
              Pomodoro Todo
            </h1>
          </div>
          <p className="mx-auto max-w-md px-4 text-slate-600 text-sm sm:text-base dark:text-slate-400">
            Boost your productivity with time-based todos and the Pomodoro Technique
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
