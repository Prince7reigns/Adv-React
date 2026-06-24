import { type SetStateAction } from 'react'
import Input from './elem/Input'
import Button from './elem/Button'

type NavbarProps = {
  search:string,
  setSearch:React.Dispatch<SetStateAction<string>>,
  handleSearch: () => void;
}

const Navbar = ({search,setSearch,handleSearch}:NavbarProps) => {
  return (
    <div className='w-full p-4 bg-gray-800 text-white flex items-center gap-5 mb-4 rounded-lg shadow-md '>
      <h1 className='text-2xl font-bold'> 
        Note App
      </h1>

      <Input
        type="text"
        title='searchBarInput'
        className=" w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 "
        placeholder='enter note title'
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
      />

         <Button
          title='searchBtn'
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md cursor-pointer transition-colors duration-300"
         >
            Search
        </Button>
    </div>
  )
}

export default Navbar
