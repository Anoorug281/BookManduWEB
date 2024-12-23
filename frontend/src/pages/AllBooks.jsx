import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import BookCard from '../components/BookCard'
const AllBooks = () => {
  const [Data,setData] = useState();
  useEffect(()=>{
      const fetch = async()=>{
         const response= await axios.get(
          "http://localhost:1000/api/user/get-all-books"
          )
          setData(response.data.data)
      }
      fetch()
  },[])
  return (
    <div className='bg-zinc-900 px-12 py-8 h-auto '>
      {" "}
           <h4 className='text-3xl text-yellow-100'>All Books</h4>
            {!Data && <div className='w-full h-[100%] flex items-center justify-center'><Loading/>{" "}</div>}
            <div className='my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4'>
                {Data && Data.map((items,i)=>(<div key={i}><BookCard data={items}/>(" ")</div>))}
            </div>  
    </div>
  )
}

export default AllBooks