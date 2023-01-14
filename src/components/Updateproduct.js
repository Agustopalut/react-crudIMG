import React,{useState,useEffect} from 'react'
import axios from "axios"
import { useParams,useNavigate } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export const Updateproduct = () => {
  const {userid} =useParams(); //mendapatkan parameter dari url nya.
  const [msg,setmsg] = useState("")
  const [title,settitle] = useState("")
  const [file,setfile] = useState("")
  const [preview,setpreview] = useState("")

  const navigate = useNavigate()
  useEffect(() => {
    loaddatauser()
  },[])
  
  const loaddatauser = async (e) => {
    try {
      const response = await axios.get(`http://localhost:5050/products/${userid}`)
      setpreview(response.data.url)
      settitle(response.data.nama)
      setfile(response.data.image)
    } catch (error) {
      if (error.response) {
        setmsg(error.response.data.msg)
      }
    }
  }
  
  const updateproduct= async (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append("title",title)
    data.append("file",file)
    try {
      await axios.patch(`http://localhost:5050/products/${userid}`,data,{
        headers:{
          "Content-type":"multipart/form-data"
        }
      })

      navigate("/")
      
    } catch (error) {
      if(error.response) {
        setmsg(error.response.data.msg)
        
      }
    }
  }

  const loadfile = (e) => {
    const image = e.target.files[0]
    setfile(image)
    setpreview(URL.createObjectURL(image))
  }

  return (
    <div className='parents w-100  d-flex justify-content-center align-items-center'>
        <div className='box-form'>
            <h3>Add product</h3>
            <div className='form'>
            <Form onSubmit={updateproduct}>
              {msg ? (
                <Alert variant="danger" >
                  <p>{msg}</p>
                </Alert>
              ):(
                ""
              )}
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" value={title} placeholder="Enter title" onChange={(e) => settitle(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>File </Form.Label>
        <Form.Control type="file" className='input-file' onChange={loadfile} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
            </div>
            {preview ? (
              <img src={preview} className="preview-img" height="300" /> //jika ada image nya
            ):(
              "" //jika tidak ada image nya
            )}
        </div>
    </div>
  )
}
