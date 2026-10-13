import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_TASK } from "../graphql/mutations";
import { GET_ALL_TASKS } from "../graphql/queries";

export default function TaskForm() {
  const [title, setTitle] = useState("");

  const [createTask, { loading, error }] = useMutation(CREATE_TASK, {
    // 5. Автообновление списка без перезагрузки страницы
    refetchQueries: [{ query: GET_ALL_TASKS }],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;

    try {
      await createTask({ variables: { title: trimmed } });
      setTitle(""); // после отправки поле очищается
    } catch {
      // ошибку покажет блок ниже (error из useMutation)
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label htmlFor="title">Новая задача</label>
      <div className="task-form-row">
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Например, сдать практическую по Apollo"
          disabled={loading}
        />
        <button type="submit" disabled={loading || !title.trim()}>
          {loading ? "Добавляем…" : "Добавить"}
        </button>
      </div>
      {error && (
        <p className="state state-error" role="alert">
          Не удалось создать задачу: {error.message}
        </p>
      )}
    </form>
  );
}
