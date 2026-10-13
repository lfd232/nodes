import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_TASKS } from "../graphql/queries";
import { COMPLETE_TASK } from "../graphql/mutations";

export default function TaskList() {
  const { loading, error, data, refetch } = useQuery(GET_ALL_TASKS);

  // Дополнительная мутация: отметить задачу как выполненную
  const [completeTask, { loading: completing, error: completeError }] =
    useMutation(COMPLETE_TASK, {
      refetchQueries: [{ query: GET_ALL_TASKS }],
    });

  // Состояние loading
  if (loading) {
    return (
      <p className="state" role="status">
        <span className="spinner" aria-hidden="true" /> Загрузка задач…
      </p>
    );
  }

  // Состояние error: понятное сообщение, а не пустой экран
  if (error) {
    return (
      <div className="state state-error" role="alert">
        <p>
          Не удалось загрузить задачи. Проверьте, что GraphQL-сервер запущен
          на http://localhost:8000.
        </p>
        <p className="muted">Подробности: {error.message}</p>
        <button onClick={() => refetch()}>Повторить</button>
      </div>
    );
  }

  const tasks = data?.allTasks ?? [];

  if (tasks.length === 0) {
    return <p className="state muted">Задач пока нет. Добавьте первую выше.</p>;
  }

  return (
    <>
      {completeError && (
        <p className="state state-error" role="alert">
          Не удалось отметить задачу: {completeError.message}
        </p>
      )}
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={task.done ? "task done" : "task"}>
            <div className="task-main">
              <span className="task-title">{task.title}</span>
              <span className="task-meta">
                #{task.id} · категория:{" "}
                {task.category ? task.category.name : "без категории"}
              </span>
            </div>
            {task.done ? (
              <span className="badge">Выполнено</span>
            ) : (
              <button
                disabled={completing}
                onClick={() =>
                  completeTask({ variables: { id: Number(task.id) } })
                }
              >
                Выполнить
              </button>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
