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

const audioModal = document.getElementById('audioModal');

function openAudioModal(event) {
    if (event) event.preventDefault();
    if (audioModal) {
        audioModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeAudioModal() {
    if (audioModal) {
        audioModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        // Pausar audios al cerrar
        const audios = document.querySelectorAll('audio');
        audios.forEach(audio => {
            audio.pause();
            audio.currentTime = 0;
        });
    }
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
});

// Lista de archivos de audio
const audioFiles = [
    { title: "Jorge Preloran entrevista a Carlos Carboni (Parte 1)", file: "entrevistas/Jorge Preloran entrevista a Carlos Carboni 01.mp3" },
    { title: "Jorge Preloran entrevista a Carlos Carboni (Parte 2)", file: "entrevistas/Jorge Preloran entrevista a Carlos Carboni 02.mp3" },
    { title: "Jorge Preloran entrevista a Carlos Carboni (Parte 3)", file: "entrevistas/Jorge Preloran entrevista a Carlos Carboni 03.mp3" },
    { title: "Roberto Del Villano entrevista a Carlos Carboni (Parte 1)", file: "entrevistas/Roberto Del Villano entrevista a Carlos Carboni 01.mp3" },
    { title: "Roberto Del Villano entrevista a Carlos Carboni (Parte 2)", file: "entrevistas/Roberto Del Villano entrevista a Carlos Carboni 02.mp3" }
];

const audioGrid = document.getElementById('audio-grid');

if (audioGrid) {
    audioFiles.forEach(audio => {
        const item = document.createElement('div');
        item.className = 'audio-item';
        
        const title = document.createElement('h4');
        title.textContent = audio.title;
        
        const audioPlayer = document.createElement('audio');
        audioPlayer.controls = true;
        audioPlayer.src = audio.file;
        
        item.appendChild(title);
        item.appendChild(audioPlayer);
        audioGrid.appendChild(item);
    });
}
