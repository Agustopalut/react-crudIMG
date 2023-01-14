import React,{useState,useEffect} from 'react'
import axios from "axios"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useNavigate} from "react-router-dom"
import Alert from 'react-bootstrap/Alert';

export const Addproduct = () => {
    const [title,settitle] = useState("")
    const [preview,setpreview] = useState("")
    const [file,setfile] = useState("")
    const [msg,setmsg] = useState("")
    const navigate = useNavigate()
    
    const loadimage = async (e) => {
      // untuk preview image di frontend
      const image = e.target.files[0]
      setfile(image)
      setpreview(URL.createObjectURL(image))
    }

    const addproduct = async (e) => {

      e.preventDefault()
      const data = new FormData()
      data.append('title',title)
      data.append('file',file)
      try {
        await axios.post("http://localhost:5050/products",data,{
          headers:{
            "Content-type":"multipart/form-data"
          }
        })

        navigate("/")
      } catch (error) {
        if(error.response) {
          navigate("/add")
          setmsg(error.response.data.msg)
        }
      }
    }


  return (
    <div className='parents w-100  d-flex justify-content-center align-items-center'>
        <div className='box-form'>
            <h3>Add product</h3>
            <div className='form'>
            <Form onSubmit={addproduct}>
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
        <Form.Control type="file" className='input-file' onChange={loadimage} />
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
