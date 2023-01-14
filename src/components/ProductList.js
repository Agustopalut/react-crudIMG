import React,{useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {useNavigate} from "react-router-dom"
import axios from "axios"
import Alert from 'react-bootstrap/Alert';

const ProductList = () => {
  const [products,setproducts] = useState([]);
  const [msg,setmsg] = useState("")
  const [variant,setvariant] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    getproduct()
  },[]);

  async function getproduct () {
    const response = await axios.get("http://localhost:5050/products")
    setproducts(response.data)
  }

  const deleteproducts = async (id) => {
    const tanya = window.confirm("apakah anda benar ingin menghapus data?")
    if (tanya) {
      try {
        await axios.delete(`http://localhost:5050/products/${id}`)
        getproduct()
        setvariant("success")
        setmsg("data berhasil di hapus")
        setTimeout(() => {
          setmsg("")
        },2000)
      } catch (error) {
        console.log(error)
      }
    }else {
      
    }
  }

  return (
    <div>
      <div className='add w-100 d-flex mt-3 justify-content-center'>
        <Button variant="primary" onClick={() => navigate("/add")}>Add product</Button>
      </div>
      {msg ? (
                <Alert variant={variant} >
                  <p>{msg}</p>
                </Alert>
              ):(
                ""
              )}
      <div className='d-flex flex-wrap justify-content-center mt-3'>
        {products.map(product => (
         <Card className='ms-2' style={{ width: '18rem' }}>
      <img className='img-product' height="300px" src={product.url} />
      <Card.Body>
        <Card.Title>{product.nama}</Card.Title>
        <Button variant="primary" onClick={() => navigate(`/update/${product.id}`)}>Update</Button>
        <Button variant="danger" onClick={() => deleteproducts(product.id)} className='ms-2'>Delete</Button>
      </Card.Body>
      </Card> 
        ))}
      </div>  
    </div>
  )
}

export default ProductList