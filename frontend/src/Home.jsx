import { Link } from "react-router-dom"


const Home = () => {
  return (
    <div className="container mt-3">
      
        <div className='bg-light p-5 mt-4 rounded-3'>
            <h1>Welcome to the simple POS for small cafe business</h1>
            <p>Labore tempor ipsum duis ea exercitation laboris laborum mollit qui exercitation.</p>
            <p>If you have an issue, call 1234567 anytime</p>
            <Link to='/products' className='btn btn-primary'>Click here to sell products</Link></div>
    </div>
  )
}

export default Home