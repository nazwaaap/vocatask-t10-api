import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPencilAlt, FaSignOutAlt, FaPlusSquare, FaCheckCircle, FaTrash } from 'react-icons/fa';
import { getUserProfile } from '../api/user';

const Task = () => {
  const [name, setName] = useState('');
  const [profileUrl, setProfileUrl] = useState('');
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const fetchTasks = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:8080/api/tasks', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }

      const data = await response.json();
      console.log('Fetched tasks:', data); 
      setTasks(data.data || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfile = await getUserProfile();
        setName(userProfile.name);
        setProfileUrl(userProfile.photo_url || 'default-profile.jpg');
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleAddTask = async () => {
    if (newTask.trim()) {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:8080/api/tasks', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title: newTask }),
        });

        if (!response.ok) {
          throw new Error('Failed to add task');
        }

        const result = await response.json();
        setTasks(prevTasks => [...prevTasks, result.data]);
        setNewTask('');
      } catch (error) {
        console.error('Error adding task:', error);
        alert('Failed to add task. Please try again.');
      }
    }
  };

  const toggleTaskStatus = async (taskId) => {
    if (!taskId) {
      console.error('Task ID is undefined');
      return;
    }

    const token = localStorage.getItem('token');
    try {
      const currentTask = tasks.find(task => task._id === taskId);
      if (!currentTask) return;

      const response = await fetch(`http://localhost:8080/api/tasks/${taskId}/done`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isDone: !currentTask.isDone })  
      });

      if (!response.ok) {
        throw new Error(`Failed to update task. Status: ${response.status}`);
      }

      const updatedTaskData = await response.json();
      console.log('Updated task response:', updatedTaskData);

      setTasks(prevTasks =>
        prevTasks.map(task =>
          task._id === taskId
            ? { ...task, isDone: !task.isDone }  
            : task
        )
      );
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Failed to update task status. Please try again.');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!taskId) {
      console.error('Task ID is undefined');
      return;
    }

    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:8080/api/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete task. Status: ${response.status}`);
      }

      setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task. Please try again.');
    }
  };

  const ProfileSection = () => (
    <div className="h-full bg-customNavy flex flex-col justify-center items-center max-w-xs sm:max-w-lg px-4 py-5 sm:px-6 sm:py-7 rounded-xl space-y-5 shadow-md">
      <img className="w-25 h-25 sm:w-28 sm:h-28 rounded-full hover:scale-110" src={profileUrl} alt="Profile" />
      <h5 className="text-center text-purple-50 text-xs">
        Welcome Back, <span className="font-bold">{name}</span>!
      </h5>
      <Link to="/UpdateProfile">
        <button className="w-full flex justify-center items-center text-purple-50 bg-gradient-to-r from-gray-500 to-gray-700 hover:scale-105 font-medium rounded-lg text-xs px-3 py-2 space-x-1">
          <FaPencilAlt className="w-4 h-4 text-purple-50" />
          <p className="text-purple-50 font-medium">Edit Profile</p>
        </button>
      </Link>
      <Link to="/">
        <button className="w-full flex justify-center items-center text-purple-50 bg-gradient-to-r from-red-500 to-red-700 hover:scale-105 font-medium rounded-lg text-xs px-3 py-2 space-x-1">
          <FaSignOutAlt className="w-4 h-4 text-purple-50" />
          <p>Sign Out</p>
        </button>
      </Link>
    </div>
  );

  const TasksToDoSection = () => {
    const incompleteTasks = tasks.filter(task => !task.isDone);
    
    return (
      <div className="flex flex-col space-y-2 text-purple-50 text-xs">
        <h5>Task to do - {incompleteTasks.length}</h5>
        {incompleteTasks.map((task) => (
          <div
            key={task._id}
            className="flex justify-between items-center p-3 mb-2 bg-white text-black rounded-md hover:bg-yellow-50 shadow-lg"
          >
            <p className="font-medium text-sm">{task.title}</p>
            <div className="flex flex-row space-x-2">
              <button
                onClick={() => toggleTaskStatus(task._id)}
                type="button"
                className="p-1 inline-flex items-center justify-center h-6 w-6 text-gray-600 hover:text-green-500 hover:scale-110 transition-all"
              >
                <FaCheckCircle className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDeleteTask(task._id)}
                type="button"
                className="p-1 inline-flex items-center justify-center h-6 w-6 text-gray-600 hover:text-red-500 hover:scale-110 transition-all"
              >
                <FaTrash className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const DoneTasksSection = () => {
    const completedTasks = tasks.filter(task => task.isDone);
    
    return (
      <div className="flex flex-col space-y-2 text-purple-50 text-xs">
        <h5>Done - {completedTasks.length}</h5>
        {completedTasks.map((task) => (
          <div 
            key={task._id}
            className="flex justify-between items-center p-3 mb-2 bg-green-50 text-green-700 rounded-md"
          >
            <p className="font-medium line-through text-sm">{task.title}</p>
            <button
              onClick={() => handleDeleteTask(task._id)}
              type="button"
              className="p-1 inline-flex items-center justify-center h-6 w-6 text-gray-600 hover:text-red-500 hover:scale-110 transition-all"
            >
              <FaTrash className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 gap-y-3 sm:gap-4 justify-center items-center sm:grid-cols-4 sm:max-w-4xl">
      <ProfileSection />
      <div className="bg-customNavy col-span-3 flex flex-col max-w-xs sm:max-w-3xl px-4 py-6 sm:px-6 sm:py-7 rounded-xl space-y-6 shadow-md">
        <div className="flex space-x-3">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task"
            className="bg-gray-50 text-gray-900 text-xs p-3 rounded-md w-full"
          />
          <button
            type="button"
            onClick={handleAddTask}
            className="p-2 inline-flex items-center justify-center h-10 w-10 text-purple-50 bg-yellow-500 rounded-md hover:bg-yellow-600"
          >
            <FaPlusSquare />
          </button>
        </div>
        <TasksToDoSection />
        <DoneTasksSection />
      </div>
    </div>
  );
};

export default Task;