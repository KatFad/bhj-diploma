/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (opt = {}) => {
    const xhr = new XMLHttpRequest;
    let url = opt.url;
    let formData;
    if (opt.method === 'GET') {
        url = new URL(window.location.href.slice(0, -1) + opt.url);
    
        if (opt.data) {
            for (let key in opt.data) {
                    url.searchParams.set(key, opt.data[key]);
            };
        };
    } else {
        formData = new FormData;
        if (opt.data) {
            for (let key in opt.data) {
                formData.append(key, opt.data[key]);
            };
        };    
    };    

     try {
            xhr.open(opt.method, url);
            xhr.responseType = 'json';
            xhr.send(formData);
    }
    catch (err) {
            callback(err);
    }    
    
    xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
            opt.callback(null, xhr.response);
        } else {
            opt.callback(xhr.statustext, null);
        }
        }); 
};
