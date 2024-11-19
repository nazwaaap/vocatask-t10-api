import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPencilAlt, FaSignOutAlt, FaPlusSquare, FaCheckCircle, FaTrash } from 'react-icons/fa';

const Task = () => {
  const name = 'Nazwa';
  const profileUrl = '../../public/fotoprofile.jpg';
  const listTasks = [
    { id: 1, description: 'To study React fundamentals', done: false },
    { id: 2, description: 'To study Git basics with GitHub', done: false },
    { id: 3, description: 'To study JavaScript and DOM manipulation', done: false },
    { id: 4, description: 'To study backend with Node.js and Express.js', done: false },
    { id: 5, description: 'To study CRUD and database management with MongoDB', done: false }
  ];

  const [tasks, setTasks] = useState(listTasks);
  const [newTask, setNewTask] = useState('');

  // Add a new task
  const handleAddTask = () => {
    if (newTask.trim()) {
      const newTaskObject = { id: tasks.length + 1, description: newTask, done: false };
      setTasks([...tasks, newTaskObject]);
      setNewTask('');
    }
  };

  // Toggle task completion status
  const toggleTaskStatus = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task)));
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Profile Section
  const ProfileSection = () => (
    <div className="h-full bg-customNavy flex flex-col justify-center items-center max-w-xs sm:max-w-lg px-4 py-5 sm:px-6 sm:py-7 rounded-xl space-y-5 shadow-md">
      <img className="w-25 h-25 sm:w-28 sm:h-28 rounded-full hover:scale-110" src={profileUrl} alt="Profile"/>
      <h5 className="text-center text-purple-50 text-xs">
        Welcome Back, <span className="font-bold">{name}</span>!
      </h5>
      <Link to="/UpdateProfile">
        <button className="w-full flex justify-center items-center text-purple-50 bg-gradient-to-r from-gray-500 to-gray-700 hover:scale-105 font-medium rounded-lg text-xs px-3 py-2 space-x-1">
          <FaPencilAlt className="w-4 h-4 text-purple-50"/>
          <p className="text-purple-50 font-medium">Edit Profile</p>
        </button>
      </Link>
      <Link to="/">
        <button className="w-full flex justify-center items-center text-purple-50 bg-gradient-to-r from-red-500 to-red-700 hover:scale-105 font-medium rounded-lg text-xs px-3 py-2 space-x-1">
          <FaSignOutAlt className="w-4 h-4 text-purple-50"/>
          <p>Sign Out</p>
        </button>
      </Link>
    </div>
  );

  // Tasks to do Section
  const TasksToDoSection = () => (
    <div className="flex flex-col space-y-2 text-purple-50 text-xs">
      <h5>Task to do - {tasks.filter((task) => !task.done).length}</h5>
      {tasks
        .filter((task) => !task.done)
        .map((task) => (
          <div key={task.id} className="flex justify-between items-center p-3 mb-2 bg-gray-100 text-gray-700 rounded-md hover:bg-yellow-50">
            <p className="font-medium text-xs">{task.description}</p>
            <div className="flex flex-row space-x-2">
              <button
                onClick={() => toggleTaskStatus(task.id)}
                type="button"
                className="p-1 inline-flex items-center justify-center h-6 w-6 text-gray-600 hover:text-green-500 hover:scale-110 transition-all">
                <FaCheckCircle className="w-4 h-4"/>
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                type="button"
                className="p-1 inline-flex items-center justify-center h-6 w-6 text-gray-600 hover:text-red-500 hover:scale-110 transition-all">
                <FaTrash className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
    </div>
  );

  // Done tasks Section
  const DoneTasksSection = () => (
    <div className="flex flex-col space-y-2 text-purple-50 text-xs">
      <h5>Done - {tasks.filter((task) => task.done).length}</h5>
      {tasks
        .filter((task) => task.done)
        .map((task) => (
          <div key={task.id} className="flex justify-between items-center p-3 mb-2 bg-green-50 text-green-700 rounded-md">
            <p className="font-medium line-through text-sm">{task.description}</p>
          </div>
        ))}
    </div>
  );

  return (
    <div className="grid grid-cols-1 gap-y-3 sm:gap-4 justify-center items-center sm:grid-cols-4 sm:max-w-4xl">
      {/* Profile Section */}
      <ProfileSection />

      {/* Task Management Section */}
      <div className="bg-customNavy col-span-3 flex flex-col max-w-xs sm:max-w-3xl px-4 py-6 sm:px-6 sm:py-7 rounded-xl space-y-6 shadow-md">
        <div className="flex space-x-3">
          <input
            type="text"
            name="task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="bg-gray-50 text-gray-900 text-xs p-3 rounded-md w-full"
            placeholder="Add a new task"/>
          <button onClick={handleAddTask} className="bg-yellow-500 rounded-sm px-2 py-2 hover:scale-110">
            <FaPlusSquare className="w-5 h-5 text-purple-50"/>
          </button>
        </div>

        <TasksToDoSection />

        <DoneTasksSection />
      </div>
    </div>
  );
};

export default Task;