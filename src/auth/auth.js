
export async function User(data, action){
        const response = await fetch(`https://backend-c1rf.onrender.com/api/${action}`, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
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
//get and store the user token in the local storage
export const authenticate = (data, next) => {
    //this line checks first if the browser window or any tap is open to make sure this is executed on the cleint site not server
    if (typeof window != "undefined"){
        const expiration = new Date();
        expiration.setTime(expiration.getTime() + 30 * 1000);
        localStorage.setItem('expiration', expiration.toISOString());
        localStorage.setItem('jwt',JSON.stringify(data));
        next();
    }
};
//get expiration date
export function getTokenDuration() {
    const storedExpirationDate = localStorage.getItem('expiration');
    const expirationDate = new Date(storedExpirationDate);
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();
    return duration;
}
//signout user 
export const signout = async (next) => {
    if (typeof window != "undefined") {
        localStorage.removeItem('jwt');
        localStorage.removeItem('expiration');
        next();
        return fetch('https://backend-c1rf.onrender.com/api/logout', {
            method: 'POST',

        }).then(response => {
            console.log("signout",response)
        }).catch(err => {
            console.log(err)
        })
    }
};

//a method that helps get the token from the browser 
export const isAuthenticated = () => {
    if(typeof window == 'undefined') {
        return false
    }
    //const tokenDuration = getTokenDuration();
    //if (tokenDuration < 0) {
        //return false
    //}
    if(localStorage.getItem('jwt')){
        return localStorage.getItem('jwt')
    }else{
        return false
    }
};

export async function UpdateUserProfile(userId, token,profileData){
    const response = await fetch(`https://backend-c1rf.onrender.com/api/user/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profileData)
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