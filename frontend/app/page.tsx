"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Code, Trash2, Search, X, Edit3 } from "lucide-react";
import Modal from "@/components/Modal";

export default function Home() {
  const [snippets, setSnippets] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");
  const [mounted, setMounted] = useState(false);
  const [tags, setTags] = useState("");

  // Для модалки та редагування
  const [selectedSnippet, setSelectedSnippet] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  useEffect(() => {
    setMounted(true);
    fetchSnippets();
  }, [search]);

  const fetchSnippets = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/snippets`, {
        params: { q: search },
      });
      setSnippets(data.data || data);
    } catch (error) {
      console.error("Помилка завантаження");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ПЕРЕТВОРЕННЯ: розбиваємо рядок "js, react" на масив ["js", "react"]
    const tagsArray = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");

    try {
      await axios.post(`${API_URL}/snippets`, {
        title: title,
        content: content,
        type: "note",
        tags: tagsArray,
      });

      // Очищуємо всі поля після успіху
      setTitle("");
      setContent("");
      setTags("");
      fetchSnippets();
    } catch (error) {
      console.error("Помилка при збереженні:", error);
    }
  };

  // ФУНКЦІЯ ВИДАЛЕННЯ
  const deleteSnippet = async (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation(); // Щоб не відкривалася модалка при кліку на кошик
    if (!confirm("Видалити цей запис?")) return;
    try {
      await axios.delete(`${API_URL}/snippets/${id}`);
      setSelectedSnippet(null);
      fetchSnippets();
    } catch (error) {
      console.error("Помилка видалення");
    }
  };

  if (!mounted) return null;

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-8 bg-gray-50 min-h-screen">
      {/* Header  */}
      <header className="flex justify-between items-center border-b pb-4">
        <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
          Сховище сніпетів
        </h1>
        <div className="relative text-black">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Пошук..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-full outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>
      </header>

      {/*  форма створення  */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl border shadow-md space-y-4 text-black"
      >
        <h2 className="text-lg font-semibold flex items-center gap-2 text-slate-700">
          <Plus className="w-5 h-5 text-blue-500" /> Новий сніпет
        </h2>
        <input
          type="text"
          placeholder="Назва"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <textarea
          placeholder="Код тут..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border rounded h-32 font-mono text-sm outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          placeholder="Теги через кому (напр. js, database, react)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full p-2 border rounded outline-none focus:ring-2 focus:ring-blue-500 text-black shadow-sm"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Зберегти
        </button>
      </form>

      {/* Список сніпетів */}
      <div className="space-y-4 text-black">
        <h2 className="text-xl font-semibold text-slate-800">Ваші записи</h2>
        <div className="grid gap-4">
          {Array.isArray(snippets) &&
            snippets.map((s: any) => (
              <div
                key={s._id}
                onClick={() => setSelectedSnippet(s)}
                className="cursor-pointer group p-5 bg-white border rounded-xl shadow-sm hover:border-blue-300 transition relative"
              >
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <Code className="w-5 h-5 text-slate-400" />
                      <h3 className="font-bold text-lg text-blue-600">
                        {s.title}
                      </h3>
                    </div>
                    {/* --- НОВИЙ БЛОК З ТЕГАМИ --- */}
                    <div className="flex flex-wrap gap-2 mt-1">
                      {s.tags?.map((tag: string) => (
                        <span
                          key={tag}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSearch(tag);
                          }}
                          className="px-2 py-0.5 bg-blue-50 text-blue-500 text-[10px] font-medium rounded-md border border-blue-100 hover:bg-blue-100 transition-colors"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={(e) => deleteSnippet(s._id, e)}
                    className="text-gray-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                <pre className="mt-3 bg-slate-50 p-3 rounded-lg text-slate-600 text-xs truncate font-mono">
                  {s.content}
                </pre>
              </div>
            ))}
        </div>
      </div>

      {/* МОДАЛЬНЕ ВІКНО ДЕТАЛЕЙ */}
      {selectedSnippet && (
        <Modal
          isOpen={!!selectedSnippet}
          onClose={() => setSelectedSnippet(null)}
          title={selectedSnippet.title}
        >
          <div className="space-y-4 text-black">
            <pre className="bg-slate-900 text-blue-100 p-4 rounded-lg overflow-x-auto font-mono text-sm shadow-inner">
              {selectedSnippet.content}
            </pre>
            <div className="flex justify-end gap-3 pt-4 border-t">
              <button
                onClick={() => deleteSnippet(selectedSnippet._id)}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
              >
                <Trash2 className="w-4 h-4" /> Видалити
              </button>
              <button
                onClick={() => setSelectedSnippet(null)}
                className="px-4 py-2 bg-slate-100 rounded-lg hover:bg-slate-200 transition"
              >
                Закрити
              </button>
            </div>
          </div>
        </Modal>
      )}
    </main>
  );
}
