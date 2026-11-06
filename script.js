 
// CANVAS - RASTRO PONTILHADO

const canvas = document.querySelector("#canvas-rastro");
const ctx = canvas.getContext("2d");

let pontos = [];

function ajustarCanvas() {

    const escala = window.devicePixelRatio || 1;

    canvas.width = window.innerWidth * escala;
    canvas.height = window.innerHeight * escala;

    ctx.setTransform(escala, 0, 0, escala, 0, 0);

}

ajustarCanvas();

window.addEventListener("resize", ajustarCanvas);


// Criar partículas
function criarPonto(x, y) {

    pontos.push({

        x: x,
        y: y,

        tamanho: Math.random() * 2 + 2,

        opacidade: 1,

        velocidade: Math.random() * 0.010 + 0.000

    });

}


// Desenhar e atualizar partículas
function animarRastro() {

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);


    for (let i = pontos.length - 1; i >= 0; i--) {

        const ponto = pontos[i];

        ctx.beginPath();

        ctx.arc(
            ponto.x,
            ponto.y,
            ponto.tamanho,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = `rgba(0, 0, 0, ${ponto.opacidade})`;

        ctx.fill();

        ponto.opacidade -= ponto.velocidade;

        ponto.tamanho *= 0.995;

        if (ponto.opacidade <= 0) {

            pontos.splice(i, 1);

        }

    }

    requestAnimationFrame(animarRastro);

}

animarRastro();



// ARRASTE DOS CARDS


const cards = document.querySelectorAll(".img1");

cards.forEach(card => {

    const hint = card.querySelector(".drag-hint");

    let posicaoX = 0;
    let posicaoY = 0;

    let inicioX = 0;
    let inicioY = 0;

    let arrastando = false;

    let ultimoPontoX = 0;
    let ultimoPontoY = 0;

    // Distância vertical do rastro
    const distanciaAbaixo = 35;

    card.addEventListener("pointerdown", (e) => {

        arrastando = true;

        card.setPointerCapture(e.pointerId);

        inicioX = e.clientX;
        inicioY = e.clientY;

        ultimoPontoX = e.clientX;
        ultimoPontoY = e.clientY;

        if (hint) {
            hint.remove();
        }

    });


    card.addEventListener("pointermove", (e) => {

        if (!arrastando) return;

        const movimentoX = e.clientX - inicioX;
        const movimentoY = e.clientY - inicioY;

        posicaoX += movimentoX;
        posicaoY += movimentoY;

        card.style.translate = `${posicaoX}px ${posicaoY}px`;

        inicioX = e.clientX;
        inicioY = e.clientY;


        // Criar pontos durante o movimento

        const distancia = Math.hypot(
            e.clientX - ultimoPontoX,
            e.clientY - ultimoPontoY
        );

        if (distancia >= 8) {

            criarPonto(
                e.clientX,
                e.clientY + distanciaAbaixo
            );

            ultimoPontoX = e.clientX;
            ultimoPontoY = e.clientY;

        }

    });


    card.addEventListener("pointerup", () => {

        arrastando = false;

    });


    card.addEventListener("pointercancel", () => {

        arrastando = false;

    });

});



const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");

if (menuToggle && menu) {

    menuToggle.addEventListener("click", () => {

        menu.classList.toggle("active");

        const aberto = menu.classList.contains("active");

        menuToggle.setAttribute("aria-expanded", aberto);

    });

}
