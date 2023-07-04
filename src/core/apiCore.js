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