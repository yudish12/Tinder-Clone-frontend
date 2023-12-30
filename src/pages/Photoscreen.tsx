import { Button } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { FaPlus } from "react-icons/fa"
import { useAppDispatch, useAppSlector } from "../redux/store"
import { getUser, logout, uploadPhotos } from "../redux/slices/AuthSlice"
import { useNavigate } from "react-router-dom"


const Photoscreen = () => {
  const dispatch = useAppDispatch();
  const photoData = useRef(new FormData());
  const userState = useAppSlector((state)=>state.authSliceReducer)  

  const navigate = useNavigate()
  
  const [image1,setImage1] = useState<string|undefined>(userState.user?.photos[0])
  const [image2,setImage2] = useState<string|undefined>(userState.user?.photos[1]);

  const uploadfile1 = (e:React.ChangeEvent<HTMLInputElement>)=>{
    if(e.target.files){
      const objectUrl = URL.createObjectURL(e.target.files[0]);
      console.log(objectUrl)
      setImage1(objectUrl)
      photoData.current.append('photos',e.target.files[0])
      console.log(photoData.current.getAll('photos'))
    }
  }

  const uploadfile2 = (e:React.ChangeEvent<HTMLInputElement>)=>{
    if(e.target.files){
      const objectUrl = URL.createObjectURL(e.target.files[0]);
      setImage2(objectUrl)
      photoData.current.append('photos',e.target.files[0])
      console.log(photoData.current.getAll('photos'))
    }
  }

  const uploadPhotosSubmit = ()=>{
    dispatch(uploadPhotos(photoData))
  }

  useEffect(()=>{
    if(!userState.user && userState.token)dispatch(getUser(userState.token))
    if(!userState.user && !userState.token && localStorage.getItem('user')!=null){
      const tk = JSON.parse(localStorage.getItem('user')!)
      dispatch(getUser(tk.token))
    }
    if(userState.user){
      setImage1(userState.user?.photos[0])
      setImage2(userState.user?.photos[1])
    }
  },[userState.user])

  if(userState.loading){
    return <div>Loading....</div>
  }

  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-6" >
      <label className="col-span-2 xl:col-span-1" htmlFor="file-1">
       <div
          style={{minHeight:"150px"}}
            className="rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground px-4 py-2 group border border-primary/20 h-[190px] items-center justify-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="radix-:r4:"
            data-state="closed"
          >
            {!image1?
              <>
                <FaPlus style={{fontSize:"1.25rem",color:"white"}} />
                  <p className="font-bold align-middle text-center text-lg lg:text-xl text-white text-muted-foreground group-hover:text-primary">
                    Add Image 1
                  </p>
              </>:
              <>
                <img className="h-full" src={image1} alt="image1" />
              </>
            }
            
          </div>
        </label>
        <input onChange={uploadfile1}   id="file-1" className="hidden" type="file" accept="image/*" />
        <label className="col-span-2 xl:col-span-1" htmlFor="file-2">
       <div
          style={{minHeight:"150px"}}
            className="rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground px-4 py-2 group border border-primary/20 h-[190px] items-center justify-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="radix-:r4:"
            data-state="closed"
          >
            {!image2?
              <>
                <FaPlus style={{fontSize:"1.25rem",color:"white"}} />
                  <p className="font-bold align-middle text-center text-lg lg:text-xl text-muted-foreground text-white group-hover:text-primary">
                    Add Image 2
                  </p>
              </>:
              <>
                <img src={image2} alt="image1" />
              </>
            }
          </div>
        </label>
        <input onChange={uploadfile2}  id="file-2" className="hidden" type="file" accept="image/*" />
        <Button onClick={uploadPhotosSubmit} variant="contained" className="col-span-2" >
            Upload
        </Button>
        <Button onClick={()=>{
          dispatch(logout())
          navigate('/landing')
        }} color="primary" variant="contained" className="col-span-2" >
            Logout
        </Button>
    </div>
  )
}

export default Photoscreen