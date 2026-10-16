const renderGraficos = (datos) => {
    // avistamientos por día
    const grafico_avistamientos_dia = document.getElementById('graficoAvistamientosDia');
    new Chart(grafico_avistamientos_dia, {
        type: 'line',
        data: {
            labels: datos.avistamientos_por_dia.labels,
            datasets: [{
                label: 'Avistamientos registrados',
                data: datos.avistamientos_por_dia.data,
                borderColor: '#4472c4',
                backgroundColor: 'rgba(68, 114, 196, 0.2)',
                fill: true,
                tension: 0.1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { precision: 0 }
                }
            }
        }
    });

    // total de avistamientos por tipo de ave
    const grafico_avistamientos_tipo = document.getElementById('graficoAvistamientosTipo');
    new Chart(grafico_avistamientos_tipo, {
        type: 'pie',
        data: {
            labels: datos.avistamientos_por_tipo_ave.labels,
            datasets: [{
                label: 'Cantidad de avistamientos',
                data: datos.avistamientos_por_tipo_ave.data,
                backgroundColor: [
                    '#4472c4', '#ed7d31', '#ffc000',
                    '#70ad47', '#5b9bd5', '#706897'
                ],
                borderWidth: 1
            }]
        },
    });

    // total de voluntarios por comuna
    const grafico_voluntarios_comuna = document.getElementById('graficoVoluntariosComuna');
    new Chart(grafico_voluntarios_comuna, {
        type: 'bar',
        data: {
            labels: datos.voluntarios_por_comuna.labels,
            datasets: [{
                label: 'Total de voluntarios',
                data: datos.voluntarios_por_comuna.data,
                backgroundColor: '#ed7d31',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { precision: 0 }
                }
            }
        }
    });
};

let fetchStats = (url) => {
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((ajaxResponse) => {
            console.log("Datos recibidos:", ajaxResponse);
            renderGraficos(ajaxResponse);
        })
        .catch((error) => {
            console.error(
                "There has been a problem with your fetch operation:",
                error
            );
        });
};

fetchStats('/get-stats');