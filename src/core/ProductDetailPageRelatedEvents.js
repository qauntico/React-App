import { Link } from "react-router-dom"
export default function RelatedProduct({relatedProductDetail}){
    

    return (
        <>
            <li>
                <Link className="d-flex flex-column flex-lg-row gap-3 align-items-start align-items-lg-center py-3 link-body-emphasis text-decoration-none border-top" to={`/event/${relatedProductDetail._id}`}>
                <img src={`http://localhost:8080/api/product/photo/${relatedProductDetail._id}`} alt="icon" width="90%" height="96" className="bd-placeholder-img" />
                <div className="col-lg-8">
                    <h6 className="mb-0">{relatedProductDetail.name}</h6>
                    <small className="text-body-secondary">Start Date: {relatedProductDetail.startDate.slice(0, 10)}</small>
                </div>
                </Link>
            </li>
        </>
    )
}