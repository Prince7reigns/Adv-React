import './App.css'
import Input from './Componets/Input'
import Card from './Componets/Card'
import React, { useEffect, useState } from 'react'

export type Expense = {
  id:number,
  title: string
  category: string
  amount: number
  date: string
}

function App() {

  const [expense,setExpense] = useState<Expense>({
    id:0,
    title:"",
    category:"",
    amount:0,
    date:""
  })

  const[expenses,setExpenses]=useState<Expense[]>(()=>{
    const saved = localStorage.getItem('expenses')
    return saved
    ? JSON.parse(saved)
    :
    []
  })
  const[editId,setEditId]=useState<number | null >(null)

  const[filter,setFilter] = useState<string >('')
  //const[totalAmu,setTotalAmu]=useState<number>(0)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>){
   const{ name , value } = e.target

   setExpense((prev:Expense)=>({
    ...prev,
    [name]:
       name === 'amount'
    ? value === ''
      ? 0
      : Number(value)
    : value
   }))}
  
   function creatExpense(exp:Expense){

    if(!exp.title.trim()){
      alert("Please enter a title")
      return 
    }

    if(!exp.category.trim()){
       alert("Please enter a category");
       return
    }

    if(exp.amount <= 0){
      console.log(exp.amount)
      alert("Please enter a Valid Amount");
      return
    }

    if(!exp.date.trim()){
      alert("Please enter a Valid date")
      return
    }

    if(editId !== null){
      setExpenses(prev=>
        
        prev.map(exps=>
          exps.id === editId ?
          {
             ...exps,
             title:exp.title,
             category:exp.category,
             date:exp.date,
             amount:Number(exp.amount)
          }:
          exps
        )
      )
      setEditId(null)
      setExpense({
        id:0,
        title:"",
        category:"",
        amount:0,
        date:""
      })
      return
    }else{
      const newExpens:Expense ={
        id:Date.now(),
        title:exp.title,
        category:exp.category,
        amount:Number(exp.amount),
        date:exp.date
    }

    setExpenses(prev=>[...prev,newExpens])
    
    setExpense({
      id:0,
      title:"",
      category:"",
      amount:0,
      date:""
    })
    }
   }

    function deleteExpense(id:number){
      setExpenses(expenses.filter(exp=>exp.id!==id))
    }


    function editExpense(exp:Expense){
      
      setExpense({
        id:exp.id,
        title:exp.title,
        date:exp.date,
        category:exp.category,
        amount:exp.amount
      })

     setEditId(exp.id)
    }
    

    useEffect(() => {
      localStorage.setItem(
        'expenses',
        JSON.stringify(expenses)
      );
    }, [expenses]);

    const filtered = expenses.filter(
      exp => exp.category === filter
    );

    const totalAmu = filter.trim()  ?
       filtered.reduce((acc,exp)=>acc + exp.amount, 0)
       :
       expenses.reduce((acc,exp)=>acc + exp.amount,0)

    const categoryTotals = expenses.reduce((acc, exp) => {
      if (acc[exp.category]) {
        acc[exp.category] += exp.amount;
      } else {
        acc[exp.category] = exp.amount;
      }
      return acc;
    }, {} as Record<string, number>);

    const highestExpense = expenses.length > 0 ?
    expenses.reduce(
      (highest,exp) =>
        exp.amount > highest.amount ?
        exp:
        highest
    ) : null

   
  return (
   <div className="min-h-screen bg-gray-950 text-white">
       
       <nav className='bg-gray-900 text-white p-4 flex justify-between'>
         <h2 className='text-2xl font-bold hover:text-blue-100 cursor-pointer'>Expense App</h2>
         <p>{highestExpense?.amount}</p>
         <p>{highestExpense?.category}</p>
        <p className=' text-2xl font-extrabold ml-5'>
          Total {filter} :<span className='text-red-400'>{totalAmu}₹</span>
        </p>
       </nav>

       <div className="h-screen grid grid-cols-3">
          <div className="col-span-2 h-screen text-white p-4">
           <div className='flex justify-between'>
             <h1 className="text-3xl font-bold mb-6">
               Recent Expenses 
              <span className='text-indigo-500 m-3'>
              
                {filter ? filtered.length : expenses.length}
              </span>
             </h1>

            <div  className="relative p-0.5 rounded-lg overflow-hidden">
            
              {/* Moving border */}
              <div className="absolute inset-0 rounded-lg bg-[linear-gradient(90deg,#8b5cf6,#3b82f6,#06b6d4,#22c55e,#f59e0b,#ef4444,#8b5cf6)] bg-size-[300%_100%] animate-[move_4s_linear_infinite]"/>
            
              <select
                value={filter}
                onChange={(e)=>setFilter(e.target.value)}
                name="category"
                id="category"
                aria-label="Category"
                className="relative z-10 w-full bg-gray-900 text-white text-xl  font-bold p-3 rounded-md outline-none appearance-none">
                <option value="">All Category</option>
                <option value="food">Food</option>
                <option value="transportation">Transportation</option>
                <option value="entertainment">Entertainment</option>
                <option value="utilities">Utilities</option>
                <option value="other">Other</option>
              </select>
            
            </div>
           </div>

           {filter.trim() ? 
           <div>
             {filtered.map((exp)=>(
               <div key={exp.id}>
                <Card
                expense={exp}
                onDelete={deleteExpense}
                onEdit={editExpense}
               />
               </div>
             ))}
           </div>
            : 
           <div>
             {expenses.map((exp)=>(
               <div key={exp.id}>
                <Card
                expense={exp}
                onDelete={deleteExpense}
                onEdit={editExpense}
               />
               </div>
             ))}
           </div>}
         </div>

          <div className="col-span-1 bg-gray-800 text-white p-4 pt-7">
             <div className="flex flex-col items-center bg-indigo-700 shadow-2xl rounded-lg p-2 shadow-gray-950">
              <h1 className="text-2xl font-bold mb-4 mt-4">
                Add Expense
              </h1>
              
              <Input
               className="w-full p-3.5 m-2 rounded-lg text-white text-xl font-bold border-2 border-gray-400 bg-gray-900 focus:outline-none focus:border-blue-500"
               placeholder="Enter expense title"
               name='title'
               value={expense.title}
               onChange={handleChange}
              />

              <Input
               className="w-full p-3 m-2 rounded-lg text-white text-xl font-bold border-2 border-gray-400 bg-gray-900 focus:outline-none focus:border-blue-500"
               placeholder="Enter Amount"
               name='amount'
               value={Number.isNaN(expense.amount) ? '' : expense.amount}
               onChange={handleChange}
              />

              <Input
               type="date"
               name='date'
               className="w-full p-3 m-2 rounded-lg text-white text-xl font-bold border-2 border-gray-400 bg-gray-900 focus:outline-none focus:border-blue-500"
               placeholder="Enter Date"
               value={expense.date}
               onChange={handleChange}
              />

              <label htmlFor="category" className="sr-only">Category</label>
              <select name='category' value={expense.category} onChange={handleChange} id="category" aria-label="Category" className="w-full p-3 m-2 rounded-lg text-white text-xl font-bold border-2 border-gray-400 bg-gray-900 focus:outline-none focus:border-blue-500">
                <option value="">Select Category</option>
                <option value="food">Food</option>
                <option value="transportation">Transportation</option>
                <option value="entertainment">Entertainment</option>
                <option value="utilities">Utilities</option>
                <option value="other">Other</option>
              </select>

              <button onClick={()=> creatExpense(expense)} className={` text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-3 cursor-pointer  transition-all duration-150  hover:scale-105 active:scale-95 ${editId?"bg-green-800 hover:bg-green-700":"bg-slate-800 hover:bg-slate-700"}`}>
                {editId ? "Update Expense" : "Add Expense"}
              </button>
             </div>

             <div className='flex flex-col m-5 text-white text-xl font-bold bg-slate-900 shadow-2xl rounded-lg p-5 gap-2 shadow-gray-950'>
                <h1>Total Expenses</h1>

                <p className='text-red-400'>₹{totalAmu}</p>

                {Object.entries(categoryTotals).map(([category, amount]) => (
                  <p key={category}>{category.charAt(0).toUpperCase() + category.slice(1)}: ₹{amount}</p>
                ))}

             </div>
          </div>
       </div>

      </div>
  
  )
}


export default App
