"use client";
import { X } from "lucide-react";

export default function Modal({ isOpen, onClose, title, children }: any) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-slate-800">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition"
          >
            <X className="w-6 h-6 text-slate-500" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
