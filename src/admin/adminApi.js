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

export async function AddProduct(data, token,userId, method,params){
    console.log(params)
    var url = `http://localhost:8080/api/product/${userId}`;
    if(method === 'PUT'){
        const productId = params;
        url = `http://localhost:8080/api/product/${productId}/${userId}`;
    }
    const response = await fetch(url, {
        method: `${method}`,
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

export async function listOrders(userId,token){
    const response = await fetch(`http://localhost:8080/api/order/list/${userId}`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            'Authorization': `Bearer ${token}`
        }
        })

    const result = await response.json();
    if(response.ok) {
        return result
    }else{
        return result
    }
};

//get the default order status values
export async function getStatusValues(userId,token){
    const response = await fetch(`http://localhost:8080/api/order/status-value/${userId}`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            'Authorization': `Bearer ${token}`
        }
        })

    const result = await response.json();
    if(response.ok) {
        return result
    }else{
        return result
    }
};

//update order status
export async function updateOrderStatus(userId,token,orderId,status){
    const response = await fetch(`http://localhost:8080/api/order/${orderId}/status/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({status,orderId})
        })

    const result = await response.json();
    if(response.ok) {
        return result
    }else{
        return result
    }
};

//method that enables you to request to be a admin
export async function adminRequest(token,userId){
    const response = await fetch(`http://localhost:8080/api/admin/request/${userId}`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            'Authorization': `Bearer ${token}`
        }
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

//get all members requesting to be admins
export async function getAllAdminRequest(userId,token){
    const response = await fetch(`http://localhost:8080/api/adminrequest/${userId}`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            'Authorization': `Bearer ${token}`
        }
        })

    const result = await response.json();
    if(response.ok) {
        return result
    }else{
        return result
    }
};

//method to accept user admin request
export async function acceptUserRequest(adminId,token,userId){
     const response = await fetch(`http://localhost:8080/api/update/request/${userId}/${adminId}`, {
        method: 'PUT',
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        })
    const result = await response.json();
    if(response.ok) {
        return result
    }else{
        return result
    }
};

//cancel user request
export async function cancelUserRequest(token,userId){
    const response = await fetch(`http://localhost:8080/api/delete/request/${userId}`, {
        method: 'DELETE',
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        })

    const result = await response.json();
    if(response.ok) {
        return result
    }else{
        return result
    }
};

export async function getAllUsers(userId,token){
    const response = await fetch(`http://localhost:8080/api/all/users/${userId}`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            'Authorization': `Bearer ${token}`
        }
        })

    const result = await response.json();
    if(response.ok) {
        return result
    }else{
        return result
    }
};