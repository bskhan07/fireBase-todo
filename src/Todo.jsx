import React, { useEffect, useState } from 'react'
import { usefireBase } from './Context/FirebaseProvider'
import moment from 'moment'
const Todo = () => {
    const { addData, items, Delete, updateTask, loading } = usefireBase()
    const [input, setInput] = useState("")
    const [updateButton, setUpdateButton] = useState(false)
    const [updateId, setUpdateId] = useState(null)

    const [completeItem, setCompleteItem] = useState([])
    const addTask = (e) => {
        addData({ input: input, date: `Added at - ${moment().format('MMMM Do YYYY, h:mm:ss a')}`, id: new Date().getTime().toString() })
        setInput("")
    }

    const list = items?.docs?.map((item) => {
        return { ...item, item: item.data(), id: item.id }
    })


    const updateHandler = (input, id) => {
        setInput(input)
        setUpdateButton(true)
        setUpdateId(id)
    }

    const updateTaskHandler = (data) => {
        updateTask(data)
        setUpdateButton(false)
        setInput("")
    }

    const submitHandler = (e) => {
        e.preventDefault()
        updateButton ? updateTaskHandler({ updateId, input, date: `Update at - ${moment().format('MMMM Do YYYY, h:mm:ss a')}`, id: new Date().getTime().toString() }) : addTask()
    }

    const completeTaks = (data, id) => {
        setCompleteItem([...completeItem, data])
        Delete(id)
    }

    const comDelete = (id) => {
        const list = completeItem.filter((item) => {
            return item.id !== id
        })
        setCompleteItem(list)
    }
    return (
        <div className="container">
            <h1>ADD SOME TO DO</h1>
            <form onSubmit={submitHandler} className="form">
                <div className="inputDiv">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        required
                        type="text"
                        placeholder="Type Somthing Here"
                        className="input"
                    />

                    {
                        updateButton ? <button
                            style={{
                                cursor: "pointer"
                            }}
                            className="btn"
                            type="submit"
                        >
                            <i className="fa-solid fa-edit"></i>
                        </button> : <button style={{
                            cursor: "pointer"
                        }} className="btn" type="submit">
                            <i className="fa-solid fa-plus"></i>
                        </button>
                    }
                </div>
            </form>

            {
                loading ? <div className="loader">
                    <div className="square" id="sq1"></div>
                    <div className="square" id="sq2"></div>
                    <div className="square" id="sq3"></div>
                    <div className="square" id="sq4"></div>
                    <div className="square" id="sq5"></div>
                    <div className="square" id="sq6"></div>
                    <div className="square" id="sq7"></div>
                    <div className="square" id="sq8"></div>
                    <div className="square" id="sq9"></div>
                </div> :
                    list?.length == 0 ? <p style={{
                        color: 'white'
                    }}>NO Data Availible</p> :
                        <>
                            <div className="record">
                                {
                                    list?.map((item) => {
                                        return (
                                            <div key={item.id} className="each-record">
                                                <div className="info">
                                                    <h3>{item.item.input}</h3>
                                                    <div className="icons">
                                                        <i onClick={() => Delete(item.id)} style={{
                                                            cursor: "pointer"
                                                        }}
                                                            className="fa-solid fa-trash"
                                                        ></i>
                                                        <i onClick={() => updateHandler(item.item.input, item.id)} style={{
                                                            cursor: "pointer"
                                                        }}
                                                            className="fa-solid fa-edit"
                                                        ></i>
                                                        <i onClick={() => completeTaks(item.item, item.id)} style={{
                                                            cursor: "pointer"
                                                        }} className="fa-solid fa-check"></i>
                                                    </div>
                                                </div>
                                                <div className="update">
                                                    <p>{item.item.date}</p>
                                                    {item.item.updateDate ? <p style={{
                                                        marginTop: "10px"
                                                    }}>{item.item.updateDate}</p> : null}
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                        </>
            }
            <>


                {
                    loading ? null : completeItem.length == 0 ? <h1> No Task Completed </h1> : <>
                        <div className="complete-task">
                            <h2>Completed Tasks</h2>
                            <div className="record">
                                {
                                    completeItem.length == 0 ? <h1>No Task Complete</h1> : completeItem.map((item) => {
                                        return (
                                            <div key={item.id} className="each-record">
                                                <div className="info">
                                                    <h3>{item.input}</h3>
                                                    <div className="icons">
                                                        <i onClick={() => comDelete(item.id)} style={{
                                                            cursor: "pointer"
                                                        }}
                                                            className="fa-solid fa-trash"
                                                        ></i>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <button onClick={() => setCompleteItem([])}
                            className="button"
                        >
                            <span className="button-text">Romove All</span>
                            <div className="fill-container"></div>
                        </button>
                    </>
                }
            </>

        </div>
    )
}

export default Todo