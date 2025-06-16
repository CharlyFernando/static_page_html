const frases_random = [
    "Te quiero mucho tostona",
    "Le tengo celos a unos pixeles, (o como era?)",
    "Te amo Sharon <3",
    "La chela la da toda",
    "Te quiero mucho (pero amor aprende a posicionarte en lol U.u)",
    "Perdón por ser pendejo a veces",
    "a veces...",
    "cuando estoy extrañando tu piel...",
    "tus ojos, que llenan de profundidad el sentido de mi vida",
    "a veces...",
    //"me siento triste...",
    "pero siempre...",
    "recuerdo que nos queremos...",
    "a nuestra manera la verdad jajaja",
    //"a veces...",
    "siento que puedo perderte... ",
    "quiero aprenderle al rakan",
    "te amo sharon enserio te amo mucho <3"
]

const matrix_html = document.getElementById("matrix") // obtenemos el div de nuestro html
const duracionCaida = 8 * 1000; // Aumentado a 8 segundos para que caiga más lento
const gap = 1000 // Aumentado a 1 segundo entre cada caída

// Array de colores incluyendo un rojo claro
const colores = [
    '#ff6b6b', // rojo claro
    '#4ecdc4', // turquesa
    '#45b7d1', // azul claro
    '#96ceb4', // verde menta
    '#ffeead', // amarillo claro
    '#ff9999', // rosa claro
    '#9b59b6', // morado
    '#3498db'  // azul
];

// Como generamos un drop¡

function drop(text, xPos){
    const element = document.createElement("div");
    element.className = "drop";
    element.textContent = text;
    element.style.left = xPos + "px";
    element.style.animationDuration = duracionCaida + "ms";
    // Asignar color aleatorio
    element.style.color = colores[Math.floor(Math.random() * colores.length)];
    matrix_html.append(element);

    // Limpiar el elemento después de la animación
    element.addEventListener("animationend", () => {
        element.remove();
    });

    // Limpiar el elemento si la página está en segundo plano
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            element.remove();
        }
    });
}

function cascadaOrdenada(){
    frases_random.forEach((txt, i) => {
        setTimeout(() => {
           const x = (window.innerWidth / (frases_random.length + 1)) * (i + 1);
           drop(txt, x);
        }, i * gap);
    });
}

function cascadaRandom(){
    const max = frases_random.length;
    /*for (let i = 0; i < 20; i++){
        setTimeout(() => {
            const txt = frases_random[Math.floor(Math.random() * max)]
            const x = Math.random() * window.innerWidth;
            drop(txt, x);
        }, i * (gap/2));
    }*/
    const txt = frases_random[Math.floor(Math.random() * max)];
    const x = Math.random() * window.innerWidth;
    drop(txt, x);
}

function explode (x, y){
    for(let i = 0; i < 10; i++){
        const lbl = document.createElement("div");
        lbl.className = "explode";
        lbl.textContent = "Te quiero sharon";
        lbl.style.left = x + "px";
        lbl.style.top = y + "px";

        const dx = (Math.random() - 0.5) * 300 + "px";
        const dy = (Math.random() - 0.5)* 300 + "px";
        lbl.style.setProperty("--dx", dx);
        lbl.style.setProperty("--dy", dy);
        document.body.append(lbl);

        lbl.addEventListener("animationend", () => lbl.remove());
    }
}

// 6. Iniciar todo
window.addEventListener("load", () => {
    // Limpiar cualquier elemento existente al cargar
    matrix_html.innerHTML = '';
    
    // Iniciar la cascada ordenada una vez
    cascadaOrdenada();
    
    // Iniciar la cascada aleatoria infinita con un intervalo más largo
    setInterval(() => {
        // Limpiar elementos antiguos si hay demasiados
        const drops = document.getElementsByClassName('drop');
        if (drops.length > 20) {
            for (let i = 0; i < drops.length - 20; i++) {
                drops[i].remove();
            }
        }
        cascadaRandom();
    }, gap);
});
  
// 7. Click listener
document.body.addEventListener("click", e => {
    explode(e.clientX, e.clientY);
});