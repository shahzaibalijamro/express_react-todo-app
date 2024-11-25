//global arrays
const todoArr = [
    {
        todo: 'Placeholder To Do',
        id: Date.now()
    }
]
const doneArr = [
    {
        done: 'Placeholder Done',
        id: Date.now()
    }
]

const addTodo = (req, res) => {
    const { title } = req.body;
    if (!title) {
        res.status(400).json({
            message: "Title not recieved!"
        })
        return
    }
    todoArr.push({
        todo: title,
        id : Date.now(),
    })
    res.status(201).json({
        message: "To Do added",
        status: 201,
        todoArr,
    })
}


//gets all todos
const allTodo = (req,res)=>{
    res.status(200).json({
        message: "All To Do's",
        status : 200,
        todoArr
    })
}


//gets single todo
const singleTodo = (req,res)=>{
    const { id } = req.params;
    const index = todoArr.findIndex(item => item.id === +id);
    if (index === -1) {
        res.status(400).json({
            message : "Id not found!"
        })
        return
    }
    res.status(200).json({
        message: "Single To Do",
        status : 200,
        singleTodo : todoArr[index],
        todoArr,
    })
}


//deletes todos
const deleteTodo = (req,res)=>{
    const {id} = req.params;
    const index = todoArr.findIndex(item => item.id === +id)
    if (index === -1) {
        res.status(400).json({
            message : "Todo not found!"
        });
        return
    }
    const deletedTodo = todoArr[index]
    todoArr.splice(index,1);
    res.status(200).json({
        message: "To Do deleted",
        status : 200,
        deletedTodo,
        todoArr,
    })
}


//edits todos
const editTodo = (req,res)=>{
    const {id} = req.params;
    const index = todoArr.findIndex(item => item.id === +id)
    if (index === -1) {
        res.status(400).json({
            message : "Todo not found!"
        })
        return
    }
    const { updatedTitle } = req.body;
    if (!updatedTitle) {
        res.status(400).json({
            message : "Updated title not provided!"
        })
        return
    }
    todoArr[index].todo = updatedTitle;
    res.status(200).json({
        message: "To Do updated",
        status : 200,
        updatedTodo : todoArr[index],
        todoArr,
    })
}


//adds done
const addDone = (req,res) => {
    const {title} = req.body;
    const index = todoArr.findIndex(item => item.id === +id)
    if (!title | index === -1) {
        res.status(400).json({
            message : "Todo not found!"
        })
        return
    }
    doneArr.push({
        done: title,
        id : Date.now(),
    })
    todoArr.splice(index,1);
    res.status(201).json({
        message: "Done added",
        status : 201,
        doneArr,
    })
}


//gets all dones
const allDone = (req,res)=>{
    res.status(200).json({
        message: "All Dones",
        status : 200,
        doneArr
    })
}


//edits dones
const editDone = (req,res)=>{
    const {id} = req.params;
    const index = doneArr.findIndex(item => item.id === +id)
    if (index === -1) {
        res.status(400).json({
            message : "Done not found!"
        })
        return
    }
    const { updatedTitle } = req.body;
    if (!updatedTitle) {
        res.status(400).json({
            message : "Updated Done not provided!"
        })
        return
    }
    doneArr[index].done = updatedTitle;
    res.status(200).json({
        message: "Done updated",
        status : 200,
        updatedDone : doneArr[index],
        doneArr,
    })
}


//deletes dones
const deleteDone = (req,res)=>{
    const {id} = req.params;
    const index = doneArr.findIndex(item => item.id === +id)
    if (index === -1) {
        res.status(400).json({
            message : "Done not found!"
        });
        return
    }
    const deletedDone = doneArr[index]
    doneArr.splice(index,1);
    res.status(200).json({
        message: "Done deleted",
        status : 200,
        deletedDone,
        doneArr,
    })
}

export { addTodo , allTodo , editTodo , singleTodo , deleteTodo , addDone , allDone, editDone, deleteDone }