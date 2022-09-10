/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (opt = {}) => {
    const xhr = new XMLHttpRequest;
    let url = opt.url;
    const formData= new FormData;
    if (opt.method === 'GET') {
        url += '?' + Object.entries(opt.data).map(
            ([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        ).join('&');
       
    } else {
        Object.entries(opt.data).forEach(element => formData.append(...element));    
    };    

     try {
            xhr.open(opt.method, url);
            xhr.responseType = 'json';
            if(opt.method === 'GET') {
                xhr.send();
            } else {
                xhr.send(formData);
            }
    }
    catch (err) {
            callback(err);
    }    
    
    xhr.onreadystatechange = () => {
        if(xhr.readyState === XMLHttpRequest.DONE){
            let err = null;
            let resp = null;
      
            if (xhr.status != 200) { 
                alert(`Ошибка ${xhr.status}: ${xhr.statusText}`); 
            } else { 
                const rr = xhr.response;
                if(rr && rr.success) {          //rr?.success
                    resp = rr;
                }else {
                    err = rr;
                } 
              }
            options.callback(err, resp)
        };
    }
};
