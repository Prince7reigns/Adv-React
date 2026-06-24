import { useState } from "react";
import Navbar from "./Navbar";
import Button from "./elem/Button";
import Input from "./elem/Input";
import Card from "./Card";
import Weather from "./Weather";


export  type Note = {
  id: number;
  title: string;
  description: string;
}


const Note = () => {
    const [editingId, setEditingId] =useState<number | null>(null);
   const[title,setTitle] = useState<string>('')
   const[description,setDescription] = useState<string>('')
   const [notes,setNotes] = useState<Note[]>([])
   const [search, setSearch] = useState<string>('');

   function handleSearch(){
      if(search){
         setNotes(prev=>
            prev.filter((note)=>note.title !== search)
         )
      }
   }

   function handleAddNote(title:string,description:string):void{

      if(!title.trim() || !description.trim()) return

      if(editingId !== null){

         setNotes(prev=>
            prev.map(note=>
               note.id === editingId ? 
               {
                  ...note,
                  title,
                  description
               }:
               note
            )
         )
         setEditingId(null)

      }else{
         const newnote:Note = {
        id: Date.now(),
        title: title,
        description: description
      }

      setNotes((prev)=>[...prev,newnote])
      }
      setTitle('')
      setDescription('')
   }

   function onEdit(note:Note){

        setTitle(note.title)
        setDescription(note.description)
        setEditingId(note.id)   
   }
   
   function onDelete(id:number){
      setNotes((prev)=>prev.filter((n)=>n.id !== id))
   }
  return (
    <div>
      <div className="min-h-screen">
    <Navbar handleSearch={handleSearch} search={search} setSearch={setSearch}/>

    <div className=" grid grid-cols-3 h-screen p-4 rounded-lg">

        <div className="col-span-2 grid grid-cols-3 gap-4 bg-blue-200 p-4 rounded-lg shadow-md mb-4"> 
         <div> 
             {notes.map((note)=>(
              <div key={note.id}>
               <Card
                note={note}
                onEdit={onEdit}
                onDelete={onDelete}
              />
              </div>
           ))}
          </div>
   
          
        </div>

         <div className="col-span-1 flex flex-col items-center gap-2 m-4 h-min bg-white p-4 rounded-lg shadow-md">

            <Input
             type="text"
             title="description"
             placeholder="enter note title"
             value={title}
             className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
             onChange={(e)=>setTitle(e.target.value)}
            />

            <textarea
              title="description"
              placeholder="enter note description"
              value={description}
              className="border  border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full h-48 resize-none"
              onChange={(e)=>setDescription(e.target.value)}
            />
            <Button
              title='addBtn'
              onClick={()=>handleAddNote(title,description)}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-8 rounded-md cursor-pointer transition-colors duration-300 ml-2 text-lg"
            >
              {editingId === null ? "Add Note" : "Update Note"}
            </Button>
         </div>
    </div>

    <Weather/>
   </div>
    </div>
  )
}

export default Note
