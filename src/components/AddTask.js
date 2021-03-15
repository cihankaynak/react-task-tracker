import { useState } from "react";

const AddTask = ({ onAdd }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    if (!newTask.text) {
      alert("Please provide a valid task!");
      return;
    }
    onAdd(newTask);
    setTask({ ...newTask, text: "", day: "", reminder: false });
  };

  const task = {
    text: "",
    day: "",
    reminder: false,
  };

  const [newTask, setTask] = useState(task);

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Task</label>
        <input
          type="text"
          value={newTask.text}
          placeholder="Add Task"
          onChange={(e) => setTask({ ...newTask, text: e.target.value })}
        />
      </div>
      <div className="form-control">
        <label>Day & Time</label>
        <input
          type="text"
          value={newTask.day}
          placeholder="Day & Time"
          onChange={(e) => setTask({ ...newTask, day: e.target.value })}
        />
      </div>
      <div className="form-control form-control-check">
        <label>Set Reminder</label>
        <input
          type="checkbox"
          value={newTask.reminder}
          checked={newTask.reminder}
          onChange={(e) =>
            setTask({ ...newTask, reminder: e.currentTarget.checked })
          }
        />
      </div>
      <input className="btn btn-block" type="submit" value="Save Task" />
    </form>
  );
};

export default AddTask;
