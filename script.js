// Lista de imágenes basada en el contenido de la carpeta 'img'
const images = [
    'img/img001.jpg',
    'img/img001-2.jpg',
    'img/img002.jpg',
    'img/img002-2.jpg',
    'img/img003.jpg',
    'img/img003-2.jpg',
    'img/img004.jpg',
    'img/img005.jpg',
    'img/img006.jpg',
    'img/img007.jpg',
    'img/img008.jpg',
    'img/img009.jpg',
    'img/img010.jpg',
    'img/img011.jpg',
    'img/img012.jpg',
    'img/img013.jpg',
    'img/img014.jpg',
    'img/img015.jpg',
    'img/img016.jpg',
    'img/img017.jpg',
    'img/img018.jpg',
    'img/img019.jpg',
    'img/img020.jpg',
    'img/img021.jpg',
    'img/img022.jpg',
    'img/img023.jpg',
    'img/img024.jpg',
    'img/img025.jpg',
    'img/img026.jpg',
    'img/img027.jpg',
    'img/img028.jpg',
    'img/img029.jpg',
    'img/img030.jpg',
    'img/img031.jpg',
    'img/img032.jpg',
    'img/img033.jpg',
    'img/img034.jpg',
    'img/img035.jpg',
    'img/img036.jpg',
    'img/img037.jpg',
    'img/img038.jpg',
    'img/img039.jpg',
    'img/img040.jpg',
    'img/img041.jpg',
    'img/img042.jpg',
    'img/img043.jpg',
    'img/img044.jpg',
    'img/img045.jpg',
    'img/img046.jpg',
    'img/img047.jpg',
    'img/img048.jpg',
    'img/img049.jpg',
    'img/img050.jpg',
    'img/img051.jpg',
    'img/img052.jpg',
    'img/img053.jpg',
    'img/img054.jpg',
    'img/img055.jpg',
    'img/img056.jpg',
    'img/img057.jpg'
];

const grid = document.getElementById('mosaic-grid');
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const yearSpan = document.getElementById('year');
let currentIndex = 0;

// Actualizar año en footer
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// Cerrar modales al hacer click fuera
window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
    if (event.target == audioModal) {
        closeAudioModal();
    }
}

// Navegación con teclado
document.addEventListener('keydown', function(event) {
    if (modal.style.display === 'flex') {
        if (event.key === 'ArrowLeft') {
            changeImage(-1);
        } else if (event.key === 'ArrowRight') {
            changeImage(1);
        } else if (event.key === 'Escape') {
            closeModal();
        }
    }
    if (audioModal && audioModal.style.display === 'flex') {
        if (event.key === 'Escape') {
            closeAudioModal();
        }
    }
});

// Generar la grilla de imágenes
images.forEach((src, index) => {
    const item = document.createElement('div');
    item.className = 'mosaic-item';
    item.onclick = () => openModal(index);
    
    const img = document.createElement('img');
    img.src = src;
    img.alt = `Obra del Archivo General del Filete ${index + 1}`;
    img.loading = "lazy"; // Carga diferida para mejor rendimiento
    
    item.appendChild(img);
    grid.appendChild(item);
});

// Funciones del Modal
function openModal(index) {
    currentIndex = index;
    modal.style.display = 'flex';
    updateModalImage();
    document.body.style.overflow = 'hidden'; // Evitar scroll de fondo
}

// Permitir pasar a la siguiente imagen al hacer click en la imagen actual
modalImg.onclick = function(e) {
    e.stopPropagation(); // Evitar cerrar el modal si el evento burbujea
    changeImage(1);
};

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restaurar scroll
}

function changeImage(n) {
    currentIndex += n;
    if (currentIndex >= images.length) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = images.length - 1;
    }
    updateModalImage();
}

function updateModalImage() {
    // Efecto de fade simple
    modalImg.style.opacity = '0.5';
    modalImg.src = images[currentIndex];
    setTimeout(() => {
        modalImg.style.opacity = '1';
    }, 50);
}

const audioFiles = [
    { title: "Jorge Preloran entrevista a Carlos Carboni (Parte 1)", file: "entrevistas/Jorge Preloran entrevista a Carlos Carboni 01.mp3" },
    { title: "Jorge Preloran entrevista a Carlos Carboni (Parte 2)", file: "entrevistas/Jorge Preloran entrevista a Carlos Carboni 02.mp3" },
    { title: "Jorge Preloran entrevista a Carlos Carboni (Parte 3)", file: "entrevistas/Jorge Preloran entrevista a Carlos Carboni 03.mp3" },
    { title: "Roberto Del Villano entrevista a Carlos Carboni (Parte 1)", file: "entrevistas/Roberto Del Villano entrevista a Carlos Carboni 01.mp3" },
    { title: "Roberto Del Villano entrevista a Carlos Carboni (Parte 2)", file: "entrevistas/Roberto Del Villano entrevista a Carlos Carboni 02.mp3" }
];

let currentAudioIndex = -1;
const mainAudioPlayer = document.getElementById('main-audio-player');
const currentTrackTitle = document.getElementById('current-track-title');
const playPauseBtn = document.getElementById('play-pause-btn');
const audioListContainer = document.getElementById('audio-list');
const playlistDropdown = document.getElementById('playlist-dropdown');
const miniProgressBar = document.getElementById('mini-progress-bar');

// Inicializar lista de reproducción
if (audioListContainer) {
    renderAudioList();
}

function togglePlaylist() {
    if (playlistDropdown) {
        playlistDropdown.classList.toggle('show');
    }
}

// Cerrar playlist al hacer click fuera
window.addEventListener('click', function(e) {
    if (playlistDropdown && playlistDropdown.classList.contains('show')) {
        if (!e.target.closest('.header-audio-player')) {
            playlistDropdown.classList.remove('show');
        }
    }
});

function renderAudioList() {
    audioListContainer.innerHTML = '';
    audioFiles.forEach((audio, index) => {
        const item = document.createElement('div');
        item.className = 'audio-list-item';
        item.setAttribute('role', 'button');
        item.setAttribute('tabindex', '0');
        item.setAttribute('data-index', index);
        if (index === currentAudioIndex) item.classList.add('active');
        
        item.onclick = () => {
            loadAndPlayAudio(index);
            // Opcional: cerrar playlist al seleccionar
            // togglePlaylist(); 
        };
        
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                loadAndPlayAudio(index);
            }
        });
        
        const title = document.createElement('h4');
        title.textContent = audio.title;
        
        const icon = document.createElement('span');
        icon.className = 'audio-status-icon';
        // Icono simple para estado
        if (index === currentAudioIndex) {
             icon.innerHTML = mainAudioPlayer.paused ? '&#10074;&#10074;' : '&#9658;'; // Pausa o Play
        } else {
             icon.innerHTML = '&#9835;'; // Nota musical
        }
        
        item.appendChild(title);
        item.appendChild(icon);
        
        audioListContainer.appendChild(item);
    });
}

function loadAndPlayAudio(index) {
    if (index < 0 || index >= audioFiles.length) return;
    
    currentAudioIndex = index;
    const audio = audioFiles[index];
    
    // Si es el mismo audio y está pausado, reanudar
    // Usamos encodeURI para manejar espacios y caracteres especiales
    const encodedFilePath = encodeURI(audio.file);
    
    // Verificamos si la fuente actual ya contiene el archivo (navegadores a veces resuelven rutas absolutas)
    if (mainAudioPlayer.src.includes(encodedFilePath) || mainAudioPlayer.src.endsWith(encodedFilePath)) {
        if (mainAudioPlayer.paused) {
            mainAudioPlayer.play().catch(e => console.error("Error al reproducir:", e));
        }
    } else {
        mainAudioPlayer.src = encodedFilePath;
        mainAudioPlayer.play().catch(e => console.error("Error al cargar/reproducir:", e));
    }
    
    updatePlayerUI();
}

function updatePlayerUI() {
    // Actualizar título
    if (currentAudioIndex >= 0) {
        currentTrackTitle.textContent = audioFiles[currentAudioIndex].title;
    } else {
        currentTrackTitle.textContent = "Seleccione un audio";
    }
    
    // Actualizar icono de play/pause
    // SVG Icons
    const playIcon = '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
    const pauseIcon = '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';
    
    if (playPauseBtn) {
        playPauseBtn.innerHTML = mainAudioPlayer.paused ? playIcon : pauseIcon;
    }
    
    // Actualizar lista (clase active e iconos)
    renderAudioList();
}

function togglePlayAudio() {
    if (currentAudioIndex === -1) {
        // Si no hay audio seleccionado, reproducir el primero
        loadAndPlayAudio(0);
        return;
    }
    
    if (mainAudioPlayer.paused) {
        mainAudioPlayer.play();
    } else {
        mainAudioPlayer.pause();
    }
    updatePlayerUI();
}

function nextAudio() {
    let nextIndex = currentAudioIndex + 1;
    if (nextIndex >= audioFiles.length) nextIndex = 0; // Loop al principio
    loadAndPlayAudio(nextIndex);
}

function prevAudio() {
    let prevIndex = currentAudioIndex - 1;
    if (prevIndex < 0) prevIndex = audioFiles.length - 1; // Loop al final
    loadAndPlayAudio(prevIndex);
}

// Event listeners del reproductor
if (mainAudioPlayer) {
    mainAudioPlayer.addEventListener('play', updatePlayerUI);
    mainAudioPlayer.addEventListener('pause', updatePlayerUI);
    mainAudioPlayer.addEventListener('ended', () => {
        nextAudio(); // Autoplay siguiente
    });
    mainAudioPlayer.addEventListener('timeupdate', () => {
        if (mainAudioPlayer.duration) {
            const percent = (mainAudioPlayer.currentTime / mainAudioPlayer.duration) * 100;
            if (miniProgressBar) {
                miniProgressBar.style.width = percent + '%';
            }
        }
    });
}

