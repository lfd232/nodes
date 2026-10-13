# Менеджер задач — React + Apollo Client (Тема 2.3)

## Запуск
1. Сервер (тема 2.2): `uvicorn main:app --reload` → http://localhost:8000
2. React: `npm install` и `npm run dev` → http://localhost:5173

## Что подгонять под свой сервер
- `src/apolloClient.js` — `GRAPHQL_URI` (путь обычно `/graphql`).
- `src/graphql/queries.js` и `mutations.js` — имена полей/мутаций и тип `id`
  (`Int!` или `ID!`). Strawberry переводит `all_tasks` → `allTasks`,
  `create_task` → `createTask`, `complete_task` → `completeTask`.
- В CORSMiddleware сервера должен быть `allow_origins=["http://localhost:5173"]`.
  Пример в `server_reference/main.py`.

## Соответствие требованиям
1. ApolloClient + ApolloProvider — `src/apolloClient.js`, `src/main.jsx`
2. useQuery `allTasks`, поля id/title/done + вложенный `category` — `TaskList.jsx`
3. loading и error — `TaskList.jsx`
4. useMutation + variables, очистка поля — `TaskForm.jsx`
5. refetchQueries после мутации — `TaskForm.jsx`, `TaskList.jsx`
6. Запросы/мутации в `src/graphql/`
7. Доп. мутация `completeTask` — кнопка «Выполнить»
