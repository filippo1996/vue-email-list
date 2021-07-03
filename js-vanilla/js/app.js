//variabili globali
let li = '';

/**
 * Avviamo il programma solo quando si preme il bottone submit
 */
document.getElementById('submit').addEventListener('click', ele => {
    hiddenElementHTML('error');
    const inputQtyEmail = document.getElementById('qtyEmail').value;
    //console.log(inputQtyEmail);
    try{
        if(isNaN(inputQtyEmail)) throw new Error('Valore non corretto');
        if(inputQtyEmail <= 0) throw new Error('Valore minimo 1');
        const qty = inputQtyEmail;
        apiEmail(qty, printEmail);
    } catch(e) {
        console.log(e);
        getError(e);
    }
});


/**
 * Richiesta api via ajax XMLHttpRequest
 */
function XmlHttpRequest(method, url){
    return new Promise((resolve, reject) => {
        let xhttp = new XMLHttpRequest();
        xhttp.open(method, url, true);
        xhttp.onload = function (){
            if(xhttp.readyState === 4 && xhttp.status === 200){
                let response = xhttp.response;
                resolve(JSON.parse(response));
            } else {
                reject({
                    status: xhttp.status,
                    statusText: xhttp.statusText
                });
            }
        };
        xhttp.onerror = function(){
            reject({
                status: '',
                statusText: 'Connessione internet assente oppure il server non è raggiungibile'
            });
        };
        xhttp.send();
    });
}

/**
 * Richiesta api via ajax Fetch
 */
function fetchApi(method, url){
    return fetch(url, {
        method: method
    });
}


/**
 * Logica del programma
 * @param {number} number 
 * @param {function printEmail(params) {
 */
async function apiEmail(number, callback){
    //Rimuoviamo il campo input
    hiddenElementHTML('input');
    //Facciamo comparire lo spinner
    showElementHTML('load');
    mails: for(let i = 0; i < number; i++){
        try{
            //const response = await XmlHttpRequest('GET', 'https://flynn.boolean.careers/exercises/api/random/mail');
            let response = await fetchApi('GET', 'https://flynn.boolean.careers/exercises/api/random/mail');
            if(!response.ok) throw new Error('Qualcosa è andato storto');
            response = await response.json();
            //console.log(response);
            //Load function coreProgram
            callback(i, number, response);
        } catch(e){
            console.log(e);
            hiddenElementHTML('load');
            //getError(e.statusText + ' ' + e.status);
            getError(e);
            break mails;
        } finally {
            //Quando il ciclo termina rimuoviamo lo spinner
            if((i + 1) === +number) hiddenElementHTML('load');
        }
    }
}

/**
 * Funzione che stampa gli indirizzi email nell'html
 * @param {object} obj 
 */
function printEmail(count, qty, obj){
    console.log(obj);
    //let {success, response} = obj;
    li += `<li class="list"><a href="${obj.response}">${count + 1} ) ${obj.response}</a></li>`;
    if(count + 1 === +qty){
        document.getElementById('email').innerHTML = li;
    }
}

/**
 * Funzione che nasconde l'elemento dall'HTML
 * @param {string} strId 
 */
function hiddenElementHTML(strId){
    const element = document.getElementById(strId);
    element.classList.add('hidden');
}

/**
 * Funzione che mostra l'elemento nell'HTML
 * @param {string} strId 
 */
 function showElementHTML(strId){
    const element = document.getElementById(strId);
    element.classList.remove('hidden');
}


/**
 * Funzione che stampa o rimuove l'errore sull'html
 * @param {string} str 
 */
function getError(str){
    const error = document.getElementById('error');
    error.classList.remove('hidden');
    error.innerHTML = str;
}



/*
response.then(result => {
    console.log(result);
}).catch(error => {
    console.log(error);
});
*/