import axios from 'axios';
import XAccessToken from '../Axios Functions/StaticToken';

export default{ 
    login: (email, password, navigation) =>
    axios({
    method: 'get',
    url:'http://127.0.0.1:5000/login',
    auth:{
            username: email,
            password: password,
            
            // username: 'stuartsmall96@gmail.com',
            // password: 'SeniorDesign2020!'
        }
    })
    .then(response=>{
        var xToken = new XAccessToken();
        XAccessToken.token = response.data.token;
        console.log(response.data);
        navigation.navigate('Home', { screen: 'Home'});        
        return response.data;
    })
    .catch(err =>{
        console.log(err, err.response);
        return true;
    })
}