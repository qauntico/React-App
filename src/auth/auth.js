
export async function User(data, action){
        const response = await fetch(`http://localhost:8080/api/${action}`, {
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

export const authenticate = (data, next) => {
    //this line checks first if the browser window or any tap is open to make sure this is executed on the cleint site not server
    if (typeof window != "undefined"){
        localStorage.setItem('jwt',JSON.stringify(data));
        next();
    }
};

export const signout = async (next) => {
    if (typeof window != "undefined") {
        localStorage.removeItem('jwt');
        next()
        return fetch('http://localhost:8080/api/signout', {
            method: 'GET',

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
    if(localStorage.getItem('jwt')){
        return localStorage.getItem('jwt')
    }else{
        return false
    }
};