// console.log("Pass");
// control = document.querySelector("#control");
// console.log(control);
let mainNav = document.querySelector("#mainNav");

let logoYellow = document.querySelector('.logoYellow');
let logoBlue = document.querySelector('.logoBlue');

let ruotato=false;
let navIcon = document.querySelector("#navIcon");
navIcon.addEventListener('click', ()=>{
    if (! ruotato){
        navIcon.classList.remove('fa-flip-vertical');
    }
    else {
        navIcon.classList.add('fa-flip-vertical');
        ruotato = ! ruotato;
    }
});
window.addEventListener('scroll', ()=>{
    if (window.scrollY > 0){
        mainNav.style.backgroundColor = '#885100';
        mainNav.style.height = '90px';
        logoYellow.classList.add("d-none");
        logoBlue.classList.remove("d-none");
    }
    else{
        mainNav.style.backgroundColor = 'transparent';
        mainNav.style.height = '55px';
        logoYellow.classList.remove("d-none");
        logoBlue.classList.add("d-none");
   }
});

// ----------------------------------------------------
// .Json = JavaScript Object notation
// Usato per trasmettere dati "pesanti"
// formato adatto all'interscambio di dati fra applicazioni client/server.
// La funzione asincrona FETCH trasforma i dati di un file
// .json in una promise
// Il metodo .then() converte i dati del .json catturati con fetch
// e accetta come parametro che rappresenta la risposta che deve essere convertita
// in file .js attraverso il metodo .json()
// Il secondo .then() ha come parametro i dati convertiti ("data")
fetch("./annunci.json").then( (response)=> response.json()).then( (data)=> {
    // console.log(data);

    // Filtro per Categoria
    let categoryWrapper = document.querySelector("#categoryWrapper");
    let cardsWrapper = document.querySelector("#cardsWrapper");
    setCategoryFilter();
    
    // filtro per prezzo
    let priceInput = document.querySelector("#priceInput");
    let incrementNumber = document.querySelector("#incrementNumber");
    setPriceInput();
    priceInput.addEventListener('input', ()=>{
        incrementNumber.innerHTML = priceInput.value;
        filterdByPrice(priceInput.value);
    });
    
    // Filtro per parola
    let wordInput =document.querySelector("#wordInput");
    wordInput.addEventListener('input', ()=>{
        filterdByWord(wordInput.value);
    });

    function filterdByWord(nome){
        let filtered = data.filter( (annuncio)=> annuncio.name.toLowerCase().includes(nome.toLowerCase()));
        showCards(filtered);
    }    
    function setCategoryFilter() {
        let categories = data.map( (annuncio)=> annuncio.category )
        let uniqueCategories = [];
        categories.forEach(category => {
            if ( ! uniqueCategories.includes(category) )
                uniqueCategories.push(category);
        });
        // console.log(uniqueCategories);
        // creazione dinamica dei pulsanti radio
        uniqueCategories.forEach( (category)=>{
            let div = document.createElement("div");
            div.classList.add("form-check");
            div.innerHTML = `
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="${category}">
                <label class="form-check-label" for="${category}">
                   ${category}
                </label>
            `;
            categoryWrapper.appendChild(div);
        }); 
        showCards(data);
        let checkInputs = document.querySelectorAll(".form-check-input");
        checkInputs.forEach( (checkInput)=> {
            checkInput.addEventListener('click', ()=>{
                filterdByCategory(checkInput.id);
            })
        });
 
        function filterdByCategory(categoria){
            if (categoria != "All"){
                let filtered = data.filter( (annuncio)=> annuncio.category == categoria);
                // console.log(filtered);
                showCards(filtered);
            } else{
                // console.log(data);
                showCards(data);
            }
        }
    }
    function showCards(array){
        cardsWrapper.innerHTML = "";
        array.sort( (a,b) => ( Number(a.price) - Number(b.price)));
        array.forEach( (element, i)=> {
            let div = document.createElement("div");
            div.classList.add("col-12", "col-md-3", "my-3", "d-flex",  "justify-content-center");
            div.innerHTML = `
                <div class="announcementCard">
                    <div class="card-head">
                        <img src="https://picsum.photos/${200+i}" alt="immagine custom sito vetrina">  
                    </div>
                    <p class="h3">${element.name}</p>
                    <p class="h3">${element.category}</p>
                    <p class="h3">${element.price} €</p>
                </div>
            `;
            cardsWrapper.appendChild(div);
        });
    }
    function setPriceInput(){
        let prices = data.map( (annuncio)=> Number(annuncio.price) );
        let maxPrice = Math.max(...prices);
        // Math.max non accetta un array. Richiede una serie di parametri. L'operatore spread (...) fornisce tutti i valori dell'array come singoli parametri.
        // console.log(prices);
        // console.log(maxPrice);
        priceInput.max = Math.ceil(maxPrice);
        priceInput.value = Math.ceil(maxPrice);
        incrementNumber.innerHTML = Math.ceil(maxPrice);
    }
    function filterdByPrice(prezzo){
        let filtered = data.filter( (annuncio)=> Number(annuncio.price) <= prezzo);
        showCards(filtered);
    }
}) 