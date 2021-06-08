import React, { useEffect, useState } from 'react'
// Importing Actor
import ToDoApp from '../../actor';

// Importing global styles
import '../assets/css/styles.css'

function App() {
    const [allToDos, setAllToDos] = useState([]);
    useEffect(() => {
        ToDoApp.showToDos()
            .then((todos) => {
                console.log(todos)
                setAllToDos(todos)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    console.log(allToDos)
    return (
        <>
            <div className="container">
                <h1>Setup from scratch using webpack</h1>
            </div>
            <div className="container1">
                {allToDos.length <= 0 ? <h1>Loading...</h1>
                    :
                    <div>
                        <h1>To Do from backend motoko</h1>

                        <h1>Title:</h1><p>{allToDos[0].title}</p>
                        <h1>Description:</h1><p>{allToDos[0].description}</p>
                        <h1>IsCompleted:</h1><p>{allToDos[0].completed?"Yes":"No"}</p>
                    </div>
                }
            </div>
        </>
    )
}

export default App
