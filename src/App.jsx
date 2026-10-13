import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

export default function App() {
  return (
    <main className="app">
      <h1>Менеджер задач</h1>
      <TaskForm />
      <TaskList />
    </main>
  );
}
