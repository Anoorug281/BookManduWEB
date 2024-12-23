import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import BookCard from './BookCard'
const Favourites = () => {
    const [FavouriteBooks, setFavouriteBooks] = useState()
    const headers = {
        id:localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    }
    useEffect(()=>{
        const fetch = async()=>{
            const response = await axios.get(
                "http://localhost:1000/api/user/get-favourite-books",
                {headers}
            )
            alert(response.data.data)
        }
        fetch()
    },[FavouriteBooks])
  return (
    <>
        {FavouriteBooks && FavouriteBooks.length === 0 && (<div className='text-5xl font-semibold text-zinc-300 flex items-center justify-center flex-colw-full h-[100%]  '>
            No Favourite Books
            <img src='./star.png' alt='star' className='h-[20vh] my-8'/></div>)}

    
    <div className='grid grid-col-4 gap-4'>
        {FavouriteBooks && FavouriteBooks.map((items,i)=>(
            <div key={i}>
                <BookCard data={items} favourite={true}/>
            </div>
        ))} 
    </div>
    </>
  )
}

export default Favourites