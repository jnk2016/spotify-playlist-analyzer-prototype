import axios from 'axios'
import XAccessToken from './StaticToken'
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

export default{ 
    experiment_odometer: (curr_mil, extra_mil, lease_prog) =>
    axios({
    method: 'post',
    url:'http://127.0.0.1:5000/experiment-odometer',
    headers:{
            'x-access-token': XAccessToken.getToken()
        
    },
    data:{
            current_mileage: curr_mil,
            extra_mileage: extra_mil,
            lease_progress: lease_prog
    },
    })
    .then(response=>{
        console.log(response.data);
        
        return response.data;
    })
    .catch(err =>{
        console.log(err, err.response);
        return true;
    })
}