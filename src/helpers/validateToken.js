function validateToken(token){
        return new Date().getTime()<JSON.parse(atob(token.split(".")[1])).exp*1000;
}

export default validateToken;