export async function AdminApi(data, token,userId){
    const response = await fetch(`http://localhost:8080/api/category/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
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

export async function AddProduct(data, token,userId){
    const response = await fetch(`http://localhost:8080/api/product/${userId}`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: data
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