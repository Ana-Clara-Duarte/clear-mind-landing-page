const cards = document.querySelectorAll(".img1");

cards.forEach(card => {

    const hint = card.querySelector(".drag-hint");

    let posicaoX = 0;
    let posicaoY = 0;

    let inicioX = 0;
    let inicioY = 0;

    let arrastando = false;

    card.addEventListener("pointerdown", (e) => {

        arrastando = true;

        card.setPointerCapture(e.pointerId);

        inicioX = e.clientX;
        inicioY = e.clientY;

        if (hint) {
            hint.remove();
        }

    });

    card.addEventListener("pointermove", (e) => {

        if (!arrastando) return;

        posicaoX += e.clientX - inicioX;
        posicaoY += e.clientY - inicioY;

        card.style.translate = `${posicaoX}px ${posicaoY}px`;

        inicioX = e.clientX;
        inicioY = e.clientY;

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

menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");

    const aberto = menu.classList.contains("active");

    menuToggle.setAttribute("aria-expanded", aberto);
});