import  { useState } from 'react'
import { Link ,useNavigate,createSearchParams} from 'react-router'


const Navbar = () => {
  const [search,setSearch]=useState<string>('')
  const navigate = useNavigate()

  function handleSearch(){
    const trimedSearch = search.trim()
    if(!trimedSearch) {
      alert("enter an movie name")
      return 
    }
     navigate({
      pathname:"/movies",
      search:`?${createSearchParams({q:trimedSearch})}`,
     })
     setSearch('')
  }

  return (
    <nav className='bg-gray-900 text-white p-4 py-5 flex justify-between items-center'>
     <Link to="/">
        <h2 className='text-xl font-bold text-red-600 '>Movie Finder</h2>
     </Link>
       
       <div className='flex items-center'>
        <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder='Enter your movie' title='searh'  type="text" className='w-full p-2 rounded-l-lg text-red-400 text-xl font-bold border-2 border-gray-400 bg-gray-900 focus:outline-none focus:border-red-500' />
        <button onClick={handleSearch} className='bg-red-500 h-full hover:bg-red-400 font-bold text-gray-900 rounded-r-lg p-3 cursor-pointer'> Search </button>

        <Link to="/favorites" className='text-3xl px-2 cursor-pointer'>
          ❤️
        </Link>
       </div>
    </nav>
  )
}

export default Navbar
