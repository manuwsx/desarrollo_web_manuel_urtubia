const grafico_aves_torta = document.getElementById('graficoTortaAves').getContext('2d');
const grafico_barras_region = document.getElementById('graficoAvistamientoRegion').getContext('2d');

const grafico1 = new Chart(grafico_aves_torta, {
    type: 'pie',
    data: {
        labels: ['Acuáticas y Marinas', 'Rapaces', 'Cantoras', 'Trepadoras', 'Galliformes', 'Corredoras'],
        datasets: [{
            label: 'Cantidad de aves',
            data: [3, 2, 2, 2, 2, 1],
            backgroundColor: [
                '#4472c4',
                '#ed7d31',
                '#ffc000',
                '#70ad47',
                '#5b9bd5',
                '#706897'
            ],
            borderWidth: 1,
        }]
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Distribución de tipo de ave',
                font: {
                    size: 16
                }
            }
        }
    }
});

const grafico2 = new Chart(grafico_barras_region, {
    type: 'bar',
    data: {
        labels: [
            'Región de Magallanes y de la Antártica Chilena',
            'Región de Los Lagos',
            'Región de Los Ríos',
            'Región Metropolitana de Santiago',
            'Valparaíso',
            'Antofagasta',
            'Región de la Araucanía',
            'Región del Maule',
            'Región Aisén del Gral. Carlos Ibáñez del Campo'
        ],
        datasets: [{
            label: 'Cantidad de aves',
            data: [2, 2, 2, 1, 1, 1, 1, 1, 1],
            backgroundColor: [
                '#4472c4'
            ],
            borderWidth: 1,
        }]
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Avistamientos por Región',
                font: {
                    size: 16
                }
            }
        }
    }
});