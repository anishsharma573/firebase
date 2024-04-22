import { useEffect, useState } from 'react'

import './App.css'
import { Auth } from './components/auth'
import { db ,auth, storage} from './config/firebaseconfig'
import { getDocs,collection,addDoc ,deleteDoc,doc,updateDoc} from 'firebase/firestore'
import { ref ,uploadBytes} from 'firebase/storage'


function App() {
  const [movieList, setMovieList] = useState([])

  //new movie state

  const [movieTitle, setMovieTitle] = useState("")
  const [newReleaseDate, setNewReleaseDate] = useState("0")
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false)
  //update title state
  const [updatedTitle, setUpdatedTitle] = useState("")
  //file upload state
  const [fileUpload, setFileUpload] = useState(null)

  const movieCollectionRef=collection(db,"movies")
  const getMovieList =async()=>{
    try {
     const data = await getDocs(movieCollectionRef)
     const filteredData = data.docs.map((doc)=>({...doc.data(),
     id:doc.id}))
     console.log(filteredData)
     setMovieList(filteredData)
    } catch (error) {
     console.error(error)
    }
   
    
  }
//delete the movie
  const deleteMovie = async(id)=>{
    const movieDoc=doc(db,"movies",id)
    await deleteDoc(movieDoc)
    getMovieList();

   }
// update the title
const updateMovieTitle = async(id)=>{
  const movieDoc=doc(db,"movies",id)
  await updateDoc(movieDoc,{title:updatedTitle})
  getMovieList();

 }
  useEffect(()=>{
    const getMovieList =async()=>{
      try {
       const data = await getDocs(movieCollectionRef)
       const filteredData = data.docs.map((doc)=>({...doc.data(),
       id:doc.id}))
       console.log(filteredData)
       setMovieList(filteredData)
      } catch (error) {
       console.error(error)
      }
     
      
         }
    getMovieList();
  },[])

  const onSubmitMovie = async()=>{
   try {
    await addDoc(movieCollectionRef,
      {title:movieTitle,
        releaseDate:newReleaseDate,
        receiveAnOscar:isNewMovieOscar,
      userId: auth?.currentUser?.uid});
        getMovieList();
   } catch (error) {
    console.error(error);
   }
  }

  const uploadFile = async ()=>{
    if(!fileUpload) return;
    const filesFolderRef = ref(storage,`projectFile/${fileUpload.name}`)
  try {
    await uploadBytes(filesFolderRef,fileUpload)
  } catch (error) {
    console.error(error);
  }
  }

  return (
    <div >
      <h1>Firebase</h1>
      <Auth/>
<div>
  <input placeholder='movieTitle' onChange={(e)=>setMovieTitle(e.target.value)}/> 
  <input placeholder='releaseDate' type='number' onChange={(e)=>setNewReleaseDate(Number(e.target.value))}/> 
  <input  type='checkbox' checked ={isNewMovieOscar} onChange={(e)=>setIsNewMovieOscar(e.target.checked)}/> 
  <label >ReceivedAnOscar</label>
  <button onClick={onSubmitMovie}>Submit Movie</button>


</div>

      <div>
        {movieList.map((movie)=>(
          <div>
            <h1 style={{color: movie.receiveAnOscar?"green":"red"}}>{movie.title}</h1>
            <p>{movie.releaseDate}</p>
            <button onClick={()=>deleteMovie(movie.id)}>Delete Movie</button>
            <input onChange={(e)=>setUpdatedTitle(e.target.value)}placeholder='new title' />
            <button onClick={()=>updateMovieTitle(movie.id)}>Update title</button>
          </div>
        ))}
      </div>
      <div>
        <input type="file" onChange={(e)=>setFileUpload(e.target.files[0])}/>

        <button onClick={uploadFile}>Upload File</button>
      </div>
    </div>
  )
}

export default App
