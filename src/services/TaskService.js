import Tasks from "../components/Tasks";

const TASK_SERVICE_URL = "http://localhost:5000/tasks/";

export class TaskService {
  async getTasks() {
    return fetch(TASK_SERVICE_URL).then((response) => response.json());
  }

  deleteTask(id) {
    fetch(TASK_SERVICE_URL + id, {
      method: "DELETE",
    });
  }

  async saveTask(task, method) {
    const url = TASK_SERVICE_URL + ("id" in task ? task.id : "");
    const res = await fetch(url, {
      method: method,
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });
    return await res.json();
  }

  async addTask(task) {
    return await this.saveTask(task, "POST");
  }

  async updateTask(task) {
    return await this.saveTask(task, "PUT");
  }
}
