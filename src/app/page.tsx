"use client";

import { useState } from "react";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Next.jsでアプリを作る", completed: true },
    { id: 2, text: "Vercelにデプロイする", completed: false },
  ]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text: trimmed, completed: false },
    ]);
    setInput("");
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) addTodo();
  };

  const remaining = todos.filter((t) => !t.completed).length;

  return (
    <main className="min-h-screen bg-[#f8f7f4] flex items-start justify-center pt-20 px-4">
      <div className="w-full max-w-md">
        {/* ヘッダー */}
        <div className="mb-8">
          <h1 className="text-3xl font-light tracking-widest text-gray-800">
            ToDo
          </h1>
          <p className="mt-1 text-sm text-gray-400 tracking-wide">
            {remaining === 0
              ? "すべてのタスクが完了しました"
              : `残り ${remaining} 件のタスク`}
          </p>
        </div>

        {/* 入力フォーム */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="新しいタスクを入力..."
            className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-300 outline-none focus:border-gray-400 transition-colors shadow-sm"
          />
          <button
            onClick={addTodo}
            disabled={!input.trim()}
            className="bg-gray-800 hover:bg-gray-700 disabled:bg-gray-200 text-white disabled:text-gray-400 rounded-xl px-5 py-3 text-sm font-medium transition-colors shadow-sm cursor-pointer disabled:cursor-not-allowed"
          >
            追加
          </button>
        </div>

        {/* タスクリスト */}
        <ul className="space-y-2">
          {todos.length === 0 && (
            <li className="text-center text-gray-300 text-sm py-10 tracking-wide">
              タスクがありません
            </li>
          )}
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-sm group"
            >
              {/* チェックボックス */}
              <button
                onClick={() => toggleTodo(todo.id)}
                className="flex-shrink-0 w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center transition-colors cursor-pointer hover:border-gray-500"
                style={{
                  backgroundColor: todo.completed ? "#1a1a1a" : "transparent",
                  borderColor: todo.completed ? "#1a1a1a" : undefined,
                }}
                aria-label={todo.completed ? "未完了に戻す" : "完了にする"}
              >
                {todo.completed && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </button>

              {/* テキスト */}
              <span
                className={`flex-1 text-sm tracking-wide transition-colors ${
                  todo.completed
                    ? "line-through text-gray-300"
                    : "text-gray-700"
                }`}
              >
                {todo.text}
              </span>

              {/* 削除ボタン */}
              <button
                onClick={() => deleteTodo(todo.id)}
                className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-400 transition-all cursor-pointer"
                aria-label="削除"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </li>
          ))}
        </ul>

        {/* フッター：完了済み一括削除 */}
        {todos.some((t) => t.completed) && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setTodos((prev) => prev.filter((t) => !t.completed))}
              className="text-xs text-gray-300 hover:text-gray-500 transition-colors tracking-wide cursor-pointer"
            >
              完了済みを削除
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
