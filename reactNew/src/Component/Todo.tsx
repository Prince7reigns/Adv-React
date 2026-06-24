import { useState } from 'react'

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

const Todo = () => {
    const[task, setTask] = useState<string>('')
    const[todos,setTodos]=useState<Todo[]>([])

    function creatTask(){
     const newTodo:Todo={
      id: Date.now(),
      text:task,
      completed: true
     }
     setTodos((prev)=>[...prev,newTodo]) 
     setTask('')
    }

    function deleteTodo(index:number){
        setTodos(todos.filter((t)=>t.id!== index))
    }
  return (
    <div>
      <div>
        <input 
          title='task' 
          type="text" 
          value={task}
          onChange={(e)=>setTask(e.target.value)}
          placeholder='enter your task'
        />

        <button 
         onClick={creatTask}
         title='addBtn'
        >
           add
        </button>
      </div>

      <ul>
        {todos.map((t)=>(
          <li key={t.id}>
            {t.text + "   " + t.completed}
              
            <button onClick={()=>deleteTodo(t.id)}> 
                remove
            </button>
          </li>  
        ))}
      </ul>
    </div>
  )
}

export default Todo
