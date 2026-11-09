const filasAvistamiento = document.querySelectorAll('.fila-avistamiento');

filasAvistamiento.forEach((fila) => {
    fila.addEventListener('click', () => {
        window.location.href = fila.dataset.href;
    });
});