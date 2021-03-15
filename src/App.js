import Header from "./components/Header";
import Footer from "./components/Footer";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import About from "./components/About";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { TaskService } from "./services/TaskService";

function App() {
  const taskService = new TaskService();
  const [tasks, setTasks] = useState([]);
  const [showAddTask, setShowAddTask] = useState(false);

  const toggleShowAddTask = () => {
    setShowAddTask(!showAddTask);
  };

  const addTask = (task) => {
    taskService.addTask(task);
    const newTasks = [...tasks, task];
    setTasks(newTasks);
  };

  const deleteTask = (id) => {
    taskService.deleteTask(id);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleReminder = (id) => {
    let toggledTask;
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          toggledTask = { ...task, reminder: !task.reminder };
          return toggledTask;
        } else {
          return task;
        }
      })
    );

    if (toggledTask) {
      taskService.updateTask(toggledTask);
    }
  };

  const loadTasks = (tasks) => {
    setTasks(tasks);
  };

  useEffect(() => taskService.getTasks().then((tasks) => loadTasks(tasks)), []);

  return (
    <Router>
      <div className="container">
        <Header
          title="Task Tracker"
          onAdd={toggleShowAddTask}
          showAdd={showAddTask}
        />

        <Route
          exact
          path="/"
          render={(props) => (
            <>
              {showAddTask ? <AddTask onAdd={addTask} /> : null}
              <Tasks
                tasks={tasks}
                onDelete={deleteTask}
                onToggle={toggleReminder}
              />
            </>
          )}
        />
        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
