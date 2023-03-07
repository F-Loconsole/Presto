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
// test attributo custom
let test = document.querySelector("#test");
// metodo per assegnare un attirbuto nuov0 ad un tag = .setAttribute()
// accetta 2 parametri stringa obbigatori:
// - nome attributo
// - valore

// Esempio di accesso ad un attributo aggiunto
// test.setAttribute("data-newAttrib", "Un saluto a tutti");
// test.addEventListener('click', ()=>{
//     console.log(test.dataset.newattrib);
// });

// Esempio di accesso ad un attributo di un altro tag
// test.setAttribute("data-newAttrib", '#test-img');
// test.addEventListener('click', ()=>{
//     let test_img = document.querySelector(test.dataset.newattrib);
//     test_img.classList.add('bg-warning');
// });

// --------------- setInterval -----------
let firstSpan = document.querySelector("#first-Span");
let secondSpan = document.querySelector("#second-Span");
let thirdSpan = document.querySelector("#third-Span");
function createInterval(finalNumber, element){
    let counter = 0;
    let interval = setInterval( ()=> {
        // console.log(counter);
        if (counter < finalNumber){
            counter++;
            element.innerHTML = counter;
        }
        else
            clearInterval(interval);
    }, 1)
}
let primaVolta = true;
// ------------- intersectionObserver() ----------
// oggetto precostruito del browser
// cattura gli elementi da visualizzare e lancia una funzione anonima
// riceve come parametro: ENTRIES elemento da osservare
// appena si osserva l'oggetto lancia la funzione
// per ogni entries che incontra ...
let h2Test = document.querySelector("#h2Test");
let observer = new IntersectionObserver( (entries)=>{
    entries.forEach( (entry) => {
        if (entry.isIntersecting && primaVolta) {
            // console.log('msg');
            createInterval(1000, firstSpan);
            createInterval(2000, secondSpan);
            createInterval(3000, thirdSpan);
            primaVolta = false;
        }
    });
});
observer.observe(h2Test);