import { useNavigate } from "react-router-dom"

export default function CardSearchItem({product}){
    const navigate = useNavigate();
    
    function Navigation(product){
        console.log(product)
        navigate(`/event/${product._id}`)
    }
    return (
        <>
            <div className="search-item" onClick={() => Navigation(product)} >
                <div>
                    <img src={`http://localhost:8080/api/product/photo/${product._id}`} alt="icon" width="40" height="40" className="rounded-circle border border-white"/>
                </div>
                <div>
                    <div className="search-result-title">
                        {product.name}
                    </div>
                </div>
            </div>
        </>
    )
}