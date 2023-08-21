import { useEffect, useRef, useState } from "react"
import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner';
import { ComponentToPrint } from "./ComponentToPrint";
import { useReactToPrint } from 'react-to-print';
const Pos = () => {
    const [products,setProducts] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    const [cart,setCart] = useState([]);
    const [totalAmount,setTotalAmount] = useState(0)
useEffect(()=>{
    axios.get('http://localhost:5000/products').then((res)=>{setProducts(res.data)}).catch((err)=>{console.log(err.message);setIsLoading(true)});
},[]);
const removeProduct = async(product)=>{
  const newCart = await cart.filter(i=>i.id !== product.id);
  setCart(newCart)
}
const addProductToCart=async(product)=>{
  let findProductInCart = await cart.find(i=>{return i.id === product.id});
  
  if(findProductInCart){
    let newCart = [];
    let newItem;
    cart.forEach(cartItem=>{
      if(cartItem.id === product.id){
        newItem = {
          ...cartItem,
          quantity:cartItem.quantity + 1,
          totalAmount: cartItem.price * (cartItem.quantity + 1)
        }
        newCart.push(newItem);

      }else{
        newCart.push(cartItem);
      }
    })
    setCart(newCart)

    
  }else{
    let newItem ={
      ...product,
      'quantity':1,
      'totalAmount':product.price,
    }
    setCart([...cart,newItem])
  }
 
}
const componentRef = useRef();

const handlePrint = useReactToPrint({
  content: () => componentRef.current,
});


useEffect(()=>{
  let newTotalAmount = 0;
  cart.forEach((icart)=>{
    newTotalAmount = newTotalAmount + parseInt(icart.totalAmount)
  })
  setTotalAmount(newTotalAmount)
},[cart]);
  return (
   <div>
     <div className='row'>
        <div className='col-lg-8'>
        {isLoading ? <Spinner animation="border" role="status" className="m-auto">
  <span className="visually-hidden">Loading...</span></Spinner> : <div className='row'>
              {products.map((product, key) =>
                <div key={key} className='col-lg-4 mb-4'>
                  <div className='pos-item px-3 text-center border' onClick={()=>addProductToCart(product)}>
                      <p>{product.name}</p>
                      <img src={product.image} className="img-fluid" alt={product.name} />
                      <p>${product.price}</p>
                  </div>
                </div>
              )}
            </div>}
        </div>
        <div className='col-lg-4'>
        <div style={{display: "none"}}>
                <ComponentToPrint cart={cart} totalAmount={totalAmount} ref={componentRef}/>
              </div>
              <div className='table-responsive bg-dark'>
                <table className='table table-responsive table-dark table-hover'>
                  <thead>
                    <tr>
                      <td>#</td>
                      <td>Name</td>
                      <td>Price</td>
                      <td>Qty</td>
                      <td>Total</td>
                      <td>Action</td>
                    </tr>
                  </thead>
                  <tbody>
                    { cart ? cart.map((cartProduct, key) => <tr key={key}>
                      <td>{cartProduct.id}</td>
                      <td>{cartProduct.name}</td>
                      <td>{cartProduct.price}</td>
                      <td>{cartProduct.quantity}</td>
                      <td>{cartProduct.totalAmount}</td>
                      <td>
                        <button className='btn btn-danger btn-sm' onClick={() => removeProduct(cartProduct)}>Remove</button>
                      </td>

                    </tr>)

                    : 'No Item in Cart'}
                  </tbody>
                </table>
                <h2 className='px-2 text-white'>Total Amount: ${totalAmount}</h2>
              </div>
              <div className='mt-3'>
                { totalAmount !== 0 ? <div>
                  <button className='btn btn-primary' onClick={handlePrint}>
                    Pay Now
                  </button>

                </div> : 'Please add a product to the cart'

                }
              </div>


        </div>
        </div>
   </div>
  )
}

export default Pos


