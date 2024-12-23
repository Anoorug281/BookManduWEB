import React,{useState,useEffect} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Loading from './Loading'
import { GrLanguage } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { FaEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";

const ViewBookDetails = () => {

    const {id} = useParams()  
    const navigate = useNavigate()
    const [Data,setData] = useState();
    const isLoggedIn= useSelector((state)=> state.auth.isLoggedIn)
    const role= useSelector((state)=> state.auth.role)
    const headers= {
        id: localStorage.getItem("id"),
        authorization : `Bearer ${localStorage.getItem("token")}`,
        bookid: id
      }
    useEffect(()=>{
        const fetch = async()=>{
           const response= await axios.get(
            `http://localhost:1000/api/user/get-book-by-id/${id}`
            )
            setData(response.data.data)
        }
        fetch()
    },[])
   
    const handleFavourite = async()=>{
        const response = await axios.put("http://localhost:1000/api/user/add-book-to-favourite",{},{headers})
        alert(response.data.message)
    }
    const handleCart = async()=>{
        const response = await axios.post("http://localhost:1000/api/user/add-to-cart",{},{headers})
        alert(response.data.message)
    }
    const handleDeleteBook = async ()=>{
        const response = await axios.delete("http://localhost:1000/api/user/delete-book",{},{headers})
        alert(response.data.message)
        navigate("/add-books")
    }
  return (
    <>
        {Data &&  
        <div className='px-4 md:px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row gap-8'>
        <div className='w-full lg:w-3/6  '>
           <div className='flex flex-col lg:flex-row justify-around bg-zinc-800 p-12 rounded'>
           {" "}<img 
            src={Data.url} 
            alt="/"
            className='h-[50vh] md:h-[60vh] lg:h-[70vh] rounded'/>
            {isLoggedIn === true && role === "user" &&(
                <div className='flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-4 lg:mt-0'>
                <button className='bg-white rounded lg:rounded-full text-3xl p-3 text-red-600 flex items-center justify-center'
                onClick={handleFavourite}>
                    <FaHeart />{" "}<span className='ms-4 block lg:hidden'>Favourites</span>
                </button>
                <button className='text-white rounded mt-8 md:mt-0 lg:rounded-full text-3xl p-2  lg:mt-8 bg-blue-500 
                flex items-center justify-center' onClick={handleCart}>
                 <FaShoppingCart />{" "}
                 <span className='ms-4 block lg:hidden'>Add to Cart</span> 
                </button>
            </div>
            )}
            {isLoggedIn === true && role === "admin" &&(
                <div className='flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-4 lg:mt-0'>
                <Link to={`/updateBook/${id}`} className='bg-white rounded lg:rounded-full text-3xl p-3 text-red-600 flex items-center justify-center'>
                <FaEdit />{" "}
                <span className='ms-4 block lg:hidden'>Edit</span>
                </Link>
                <button className='text-red-500 rounded mt-8 md:mt-0 lg:rounded-full text-3xl p-2  lg:mt-8 bg-white flex items-center justify-center' 
                onClick={handleDeleteBook}>
                <MdOutlineDelete />
                <span className='ms-4 block lg:hidden'>Delete Book</span> 
                </button>
            </div>
            )}
           </div>
        </div>
        <div className='p-4 w-full lg:w-3/6 '>
        <h1 className='text-4xl text-zinc-300 font-semibold'>{Data.title}</h1>
        <p className='text-zinc-400 mt-1'>by {Data.author}</p>
        <p className='flex mt-4 items-center justify-start text-zinc-500'>{Data.desc}</p>
        <p className='flex mt-4 items-center justify-start text-zinc-400'><GrLanguage className='me-3' />{Data.language}</p>
        <p className='mt-4 text-zinc-100 text-3xl font-semibold'>Price: Rs.{Data.price}{" "}</p>
        </div>
    </div>}
        {!Data && <div className='h-screen bg-zinc-900 flex items-center justify-center'>
            <Loading/></div>}
    </>
  )
}

export default ViewBookDetails