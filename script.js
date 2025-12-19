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
    'img/img027.jpg'
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

// Cerrar modal al hacer click fuera de la imagen
window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
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
