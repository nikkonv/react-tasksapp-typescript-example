import React, { useState, useRef } from "react";
import "./App.css";

interface Task {
  name: string;
  done: boolean;
}

function App(): JSX.Element {
  const [newTask, setNewTask] = useState("");
  const [taskList, setTaskList] = useState<Task[]>([]);
  const taskInput = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);
  };

  const handleChangeTaskState = (i: number): void => {
    const tasksCpy: Task[] = [...taskList];
    tasksCpy[i].done = !tasksCpy[i].done;
    setTaskList(tasksCpy);
  };

  const addTask = (name: string): void => {
    const newTasks = [...taskList, { name, done: false }];
    setTaskList(newTasks);
  };

  const handleDeleteTask = (i: number): void => {
    const tasksCpy: Task[] = [...taskList];
    tasksCpy.splice(i, 1);
    setTaskList(tasksCpy);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    newTask.length > 0 && addTask(newTask);
    setNewTask("");
    taskInput.current?.focus();
  };

  return (
    <>
      <div className="container">
        <h1>Tasks APP</h1>
        <div className="break"></div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={handleChange}
            value={newTask}
            autoFocus
            ref={taskInput}
          />
          <button>Submit</button>
        </form>
        <section>
          {taskList.map((task: Task, i: number) => {
            return (
              <h4 key={i}>
                &middot;{" "}
                {task.done ? (
                  <span style={{ color: "#11AC79" }}>[Done]</span>
                ) : (
                  <span style={{ color: "#FFD700" }}>[Pending]</span>
                )}{" "}
                {task.name}{" "}
                <button onClick={() => handleChangeTaskState(i)}>
                  {task.done ? "✗" : "✓"}
                </button>
                <button onClick={() => handleDeleteTask(i)}>🗑</button>
              </h4>
            );
          })}
        </section>
      </div>
    </>
  );
}

export default App;
