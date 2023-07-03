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