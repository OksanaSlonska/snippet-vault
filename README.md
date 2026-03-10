# 🚀 Snippet Vault — Fullstack Application

Персональний менеджер код-сніпетів та нотаток. Проєкт створений для організації бази знань розробника.

## 🛠 Технологічний стек

- **Frontend:** Next.js 14, React, Axios, CSS Modules.
- **Backend:** NestJS, TypeScript, Mongoose.
- **Database:** MongoDB Atlas (Cloud).
- **Validation:** class-validator, class-transformer.

## 📋 Функціонал

- [x] Створення нових сніпетів (назва, зміст, тип).
- [x] Зберігання даних у хмарній базі MongoDB.
- [x] Пошук по сніпетах у реальному часі.
- [x] Повна валідація даних на рівні API.

## ⚙️ Як запустити проєкт

1. Створіть файл `.env` у папці `backend` та додайте `MONGO_URL`.
2. Запустіть бекенд: `cd backend && npm run start:dev`.
3. Запустіть фронтенд: `cd frontend && npm run dev`.
