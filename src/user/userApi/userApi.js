export async function UserPurchaseHistory(userId,token){
    const response = await fetch(`https://backend-c1rf.onrender.com/api/orders/by/user/${userId}`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
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