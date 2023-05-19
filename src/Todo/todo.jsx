import React, { useState } from 'react';
import {AiOutlineDelete} from 'react-icons/ai'
import {BiEdit} from 'react-icons/bi' 
import './todo.css'

function Task({ task, onToggleComplete, onDelete, onEdit }) {
  const [editedName, setEditedName] = useState(task.name);
  const [isEditing, setIsEditing] = useState(false);

  const handleToggleComplete = () => {
    onToggleComplete(task.id);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onEdit(task.id, editedName);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedName(task.name);
  };

  const handleDeleteClick = () => {
    onDelete(task.id);
  };

  return (
    <div className='taskModifying'>
      <input className='checkbox'
        type="checkbox"
        checked={task.completed}
        onChange={handleToggleComplete}
      />
      {isEditing ? (
        <input  className='value'
          type="text"
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
        />
      ) : (
      <div className='value'>
        {task.name}
        </div>
      )}
      {isEditing ? (
        <div className="save-cancel" >
          <button className='save' onClick={handleSaveClick}>Save</button>
          <button className='cancel' onClick={handleCancelClick}>Cancel</button>
        </div>
      ) : (
        <div className='edit-delete'>
          <button 
          className='edit'
          onClick={handleEditClick}><BiEdit /></button>

          <button  className='delete'
      onClick={handleDeleteClick}><AiOutlineDelete/></button>
        </div>
        
      )}
     
    </div>
  );
}

function TaskList({ tasks, onToggleComplete, onDelete, onEdit }) {
  return (
    <div>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  const addTask = (name) => {
    const newTask = {
      id: Date.now(),
      name,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const toggleComplete = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const editTask = (taskId, newName) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const filterTasks = (taskList) => {
    if (filter === 'completed') {
      return taskList.filter((task) => task.completed);
    } else if (filter === 'incomplete') {
      return taskList.filter((task) => !task.completed);
    }
    return taskList;
  };

  const clearCompletedTasks = () => {
    const updatedTasks = tasks.filter((task) => !task.completed);
    setTasks(updatedTasks);
  };

  return (
    <div className='todo-main-container'>
       <div className="header"><h3>Todo </h3></div>
      <div className='buttons'>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={() => setFilter('incomplete')}>Incomplete</button>
        <button onClick={clearCompletedTasks}>Clear Completed</button>
      </div>
      <input className='Add-task'
        type="text"
        placeholder="Add a new task"
        onKeyDown={(e) => {
          if (e.key === 'Enter' && e.target.value.trim() !== '') {
            addTask(e.target.value.trim());
            e.target.value = '';
          }
        }}
      />
      <div className='taskLists'>
      <TaskList 
        tasks={filterTasks(tasks)}
        onToggleComplete={toggleComplete}
        onDelete={deleteTask}
        onEdit={editTask}

      />
      </div>
    </div>

  );
}

export default App;
