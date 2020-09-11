import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'

export default {
    get(url) {
        return new Promise((resolve, reject) =>{        
            axios.get(url).then(res => {
                resolve(res.data);
            }).catch(err =>{
                reject(err.data)        
            })  
        })
    },
    post(url, data) {
        return new Promise((resolve, reject) => {
            axios.post(url + '?_=' + Date.now(), data)
            .then(res => {
                resolve(res.data);
            })
            .catch(err =>{
                reject(err.data)
            })
       })
    }
}
