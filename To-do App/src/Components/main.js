import React, { useState, useEffect } from 'react';
import './main.css';

const Main = () => {

    const [tasks, setTasks] = useState([]);
    const [isComplete, setIsComplete] = useState(false);
    const [completedTask, setCompletedTask] = useState([]);

    const [enteredTitle, setEnteredTitle] = useState('');
    const [enteredDescription, setEnteredDescription] = useState('');
    const [enteredDate, setEnteredDate] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        const newTask = {
            title: enteredTitle,
            description: enteredDescription,
            date: enteredDate,
        }
        const newTaskList = [...tasks]
        newTaskList.push(newTask)
        setTasks(newTaskList);
        localStorage.setItem('tasklist', JSON.stringify(newTaskList))

        setEnteredDate("")
        setEnteredDescription("")
        setEnteredTitle("")
    }

    const handleDelete = (index) => {
        const newTaskList = [...tasks]
        newTaskList.splice(index, 1);
        localStorage.setItem('tasklist', JSON.stringify(newTaskList))
        setTasks(newTaskList);
    }

    const handleComplete = (index) => {
        const now = new Date();
        let dd = now.getDate();
        let mm = now.getMonth() + 1;
        let yyyy = now.getFullYear();
        const completedOn = dd + '-' + mm + '-' + yyyy;
        const completedTaskList = {
            ...tasks[index],
            completedOn: completedOn
        }
        const updatedCompletedTask = [...completedTask];
        updatedCompletedTask.push(completedTaskList)
        setCompletedTask(updatedCompletedTask)
        handleDelete(index);
        localStorage.setItem(
            'completedtasks',
            JSON.stringify(updatedCompletedTask)
        );
    }

    const handleCompleteDelete = (index) => {
        const newTaskList = [...completedTask]
        newTaskList.splice(index, 1);
        localStorage.setItem('completedtasks', JSON.stringify(newTaskList))
        setCompletedTask(newTaskList);
    }

    useEffect(() => {
        const savedTask = JSON.parse(localStorage.getItem('tasklist'));
        const savedCompletedTask = JSON.parse(localStorage.getItem('completedtasks'));
        if (savedTask) {
            setTasks(savedTask)
        }
        if (savedCompletedTask) {
            setCompletedTask(savedCompletedTask)
        }
    }, [])


    return (
        <div>
            <h1 style={{ textAlign: "center" }}>TO-DO LIST</h1>
            <div className='add-task'>
                <form onSubmit={submitHandler}>
                    <div className='new-task-controls'>
                        <div className='new-task-control'>
                            <label>Title</label>
                            <input type='text'
                                onChange={(e) => setEnteredTitle(e.target.value)}
                                value={enteredTitle}
                                required />
                        </div>
                        <div className='new-task-control'>
                            <label>Description</label>
                            <input type='text'
                                onChange={(e) => setEnteredDescription(e.target.value)}
                                value={enteredDescription}
                                required />
                        </div>
                        <div className='new-task-control'>
                            <label>Date</label>
                            <input type='date'
                                onChange={(e) => setEnteredDate(e.target.value)}
                                value={enteredDate}
                                required />
                        </div>
                    </div>
                    <div className='new-task-actions'>
                        <button type='submit'>Add Task</button>
                    </div>
                </form>
            </div>

            <div>
                <button className={`button ${isComplete === false && 'active'}`} onClick={() => setIsComplete(false)}>Tasks</button>
                <button className={`button ${isComplete === true && 'active'}`} onClick={() => setIsComplete(true)}>Completed</button>
            </div>

            {!isComplete && tasks.map((task, index) => {
                return (
                    <div className='tasks' key={index}>
                        <div className='task-item'>
                            <div className='task-date'>
                                {task.date.toLocaleString('en-US', {
                                    day: 'numeric', month: 'numeric',
                                    year: 'numeric'
                                })}
                            </div>
                            <div className='task-item-description '>
                                <h2>{task.title}</h2>
                                <p>{task.description}</p>
                            </div>
                            <div>
                                <button className='task-item-delete'
                                    onClick={() => handleDelete(index)}>Delete</button>
                                <button className='task-item-complete'
                                    onClick={() => handleComplete(index)}>Complete</button>
                            </div>
                        </div>
                    </div>
                )
            }
            )}

            {isComplete && completedTask.map((task, index) => {
                return (
                    <div className='tasks' key={index}>
                        <div className='task-item'>
                            <div className='task-item-description '>
                                <h2>{task.title}</h2>
                                <p>{task.description}</p>
                                <p><small>Completed on: {task.completedOn}</small></p>
                            </div>
                            <div>
                                <button className='task-item-delete'
                                    onClick={() => handleCompleteDelete(index)}>Delete</button>
                            </div>
                        </div>
                    </div>
                )
            }
            )}

        </div>
    )
}

export default Main;
