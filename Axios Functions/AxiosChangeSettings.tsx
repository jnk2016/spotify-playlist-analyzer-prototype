import axios from 'axios';
import XAccessToken from './StaticToken';

export default{ 
    changeSettings: (email,fullName, street, city, state, zipcode, phone) =>
    axios({
    method: 'post',
    url:'http://127.0.0.1:5000/update-settings',
    headers:{
            'x-access-token': XAccessToken.getToken()
    },
    data:{
        "email_address": email,
        "full_name":fullName,
        "street_address":street,
        "city":city,
        "state":state,
        "zipcode":zipcode,
        "phone_number":phone,
    },
    })
    .then(response=>{
        console.log(response.data.statement);
        return true;
    })
    .catch(err =>{
        console.log(err, err.response);
        return err.response;
    })
}