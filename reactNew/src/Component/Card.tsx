
import Button from './elem/Button'
import type { Note } from './Note'
type CardProps = {
  note: Note;

  onDelete: (id: number) => void;

  onEdit: (note: Note) => void;
}


const Card = ({note, onDelete,onEdit}: CardProps) => {
   
  return ( 
  <div className="max-w-sm max-h-52 bg-white rounded-lg shadow-md p-6 mb-4 ">
    <h5 className="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8">{note.title}</h5>
    <p className="text-body">{note.description}</p>
    
   <div className="mt-4 flex justify-between">
      <Button onClick={()=>onEdit(note)} className="bg-blue-500 hover:bg-gray-600 text-white  font-semibold py-2 px-4 rounded-md cursor-pointer transition-colors duration-300">
        Edit
      </Button>

      <Button onClick={()=>onDelete(note.id)} className="bg-red-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md cursor-pointer transition-colors duration-300 ml-2">
        Delete
      </Button>
    </div>
  </div>
  )
}

export default Card
