import { useState } from "react";

interface Props{
    count:number;
    setCount:React.Dispatch<React.SetStateAction<number>>;
}


function Test(){

    const [task,setTask] = useState<string>('')
    const[todos,setTodo] = useState<string[]>([])

    function addTodo(){
    if(!task.trim()) return ;

    setTodo((prev)=>[...prev,task])

    setTask('')
    }

    function delTodo(index:number){
      setTodo(prev=>
        prev.filter((_,i) => i !== index)
      )
    }

    return(
        <div>
            
           <input
            title="task"
            type="text"
            value={task}
            onChange={(e)=>setTask(e.target.value)}
            placeholder="Enter task"
            />

            <button onClick={addTodo}  title="btnTask">
                Add 
            </button>

            <ul>
                {todos.map((todo,index)=>(
                    <li key={index}>
                       {todo}

                       <button onClick={()=>delTodo(index)} title="delbtn">
                          Delete
                       </button>
                    </li>
                ))}
            </ul>
        </div>         
    )
}

export default Test