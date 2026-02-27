let chart1, chart2;

async function buscarUsuario() {
    const nombre = document.getElementById('nombreBusqueda').value.trim();
    
    try {
        const respuesta = await fetch("http://localhost:3000/usuarios");
        const datos = await respuesta.json();

        const j = datos.find(u => u.player_name.toLowerCase() === nombre.toLowerCase());

        if (j) {
            document.getElementById('stats-section').classList.remove('hidden');
            
            // Actualizar Tarjetas
            document.getElementById('stat-name').innerText = j.player_name;
            document.getElementById('stat-kills').innerText = j.kills.toLocaleString();
            document.getElementById('stat-xp').innerText = Number(j.xp).toLocaleString();
            
            const winRate = ((j.wins / (j.wins + j.losess)) * 100).toFixed(1);
            document.getElementById('stat-winrate').innerText = winRate + "%";

            // Renderizar Gráficos al final
            actualizarGraficos(j);
        } else {
            alert("Usuario no encontrado");
        }
    } catch (e) { console.error(e); }
}

function actualizarGraficos(j) {
    if (chart1) chart1.destroy();
    if (chart2) chart2.destroy();

    // Gráfico Circular (Kills vs Headshots)
    chart1 = new Chart(document.getElementById('precisionChart'), {
        type: 'doughnut',
        data: {
            labels: ['Headshots', 'Normal Kills'],
            datasets: [{
                data: [j.headshots, j.kills - j.headshots],
                backgroundColor: ['#00d4ff', '#2d333b']
            }]
        }
    });

    // Gráfico de Barras (Wins vs Losses)
    chart2 = new Chart(document.getElementById('winLossChart'), {
        type: 'bar',
        data: {
            labels: ['Wins', 'Losses'],
            datasets: [{
                label: 'Cantidad',
                data: [j.wins, j.losess],
                backgroundColor: ['#00ff88', '#e94560']
            }]
        }
    });
}