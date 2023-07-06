import queryString from 'query-string';
export async function getProduct(sortBy){
    const response = await fetch(`http://localhost:8080/api/products/?sort=${sortBy}&order=desc&amount=6`, {
        method: 'GET',
        }).catch(err => {
            console.log(err)
        });
        const result = await response.json();
        if(response.ok){
            return result
        }else{
            return result
        }
};
export async function getFilteredProducts(skip,limit,filters = {}){
    const data = {
        limit,
        skip,
        filters
    };
    const response = await fetch(`http://localhost:8080/api/products/by/Search`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        }).catch(err => {
            console.log(err)
        });
        const result = await response.json();
        if(response.ok){
            return result
        }else{
            return result
        }
};

export async function searchProduct(params){
    //this queryString package contains a method that takes a object and converts it to a query string
    const query = queryString.stringify(params)
    console.log(query)
    const response = await fetch(`http://localhost:8080/api/products/search?${query}`, {
        method: 'GET',
        }).catch(err => {
            console.log(err)
        });
        const result = await response.json();
        if(response.ok){
            return result
        }else{
            return result
        }
};
export async function relatedProduct(productId){
    const response = await fetch(`http://localhost:8080/api/products/related/${productId}`, {
        method: 'GET',
        }).catch(err => {
            console.log(err)
        });
        const result = await response.json();
        if(response.ok){
            return result
        }else{
            return result
        }
};

