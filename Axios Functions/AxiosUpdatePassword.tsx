import axios from 'axios';
import XAccessToken from './StaticToken';

export default{ 
    updatePassword: (oldP, newP, confirmNew) =>
    axios({
    method: 'post',
    url:'http://127.0.0.1:5000/change-password',
    headers:{
            'x-access-token': XAccessToken.getToken()
    },
    data:{
        "old_password": oldP,
        "new_password":newP,
        "confirm_new_password":confirmNew,
    },
    })
    .then(response=>{
        console.log(response.data.statement);
        return response.data.message;
    })
    .catch(err =>{
        console.log(err, err.response);
        return err.response.data;
    })
}