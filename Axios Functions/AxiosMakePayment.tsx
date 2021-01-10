import axios from 'axios';
import XAccessToken from './StaticToken';

export default{ 
    MakePayment: (statementId, paymentAmount) =>
    axios({
    method: 'post',
    url:`http://127.0.0.1:5000/payment/${statementId}`,
    headers:{
            'x-access-token': XAccessToken.getToken()
    },
    data:{
        "payment_amount": paymentAmount,
    },
    })
    .then(response=>{
        console.log(response.data);
        return response.data.message;
    })
    .catch(err =>{
        console.log(err, err.response);
        return false;
    })
}