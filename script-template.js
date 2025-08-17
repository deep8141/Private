// Global variables
let currentImageIndex = 0;
let images = [];
let currentMode = 'gallery';
let isAuthenticated = false;

// Pagination variables
let currentPage = 1;
let itemsPerPage = 50;
let totalPages = 1;

// Password configuration - CHANGE THIS TO YOUR DESIRED PASSWORD
const GALLERY_PASSWORD = 'SukhDeep';

// DOM elements
const passwordModal = document.getElementById('passwordModal');
const mainContent = document.getElementById('mainContent');
const passwordInput = document.getElementById('passwordInput');
const submitPassword = document.getElementById('submitPassword');
const passwordError = document.getElementById('passwordError');

const galleryModeBtn = document.getElementById('galleryMode');
const viewModeBtn = document.getElementById('viewMode');
const galleryContainer = document.getElementById('galleryContainer');
const viewContainer = document.getElementById('viewContainer');
const galleryGrid = document.getElementById('galleryGrid');
const viewerImage = document.getElementById('viewerImage');
const imageCounter = document.getElementById('imageCounter');
const imageName = document.getElementById('imageName');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const closeViewer = document.getElementById('closeViewer');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCounter = document.getElementById('lightboxCounter');
const lightboxName = document.getElementById('lightboxName');
const closeLightbox = document.getElementById('closeLightbox');

// Pagination DOM elements
const pageInfo = document.getElementById('pageInfo');
const imageCount = document.getElementById('imageCount');
const firstPage = document.getElementById('firstPage');
const prevPage = document.getElementById('prevPage');
const nextPage = document.getElementById('nextPage');
const lastPage = document.getElementById('lastPage');
const pageNumbers = document.getElementById('pageNumbers');
const itemsPerPageSelect = document.getElementById('itemsPerPage');

// Image and video files - AUTO-GENERATED FROM IMAGE FOLDER
const mediaFiles = [
    // This will be automatically replaced by the generator script
    'placeholder.jpg'
];

// Supported file extensions
const SUPPORTED_EXTENSIONS = {
    images: ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg'],
    videos: ['.mp4', '.webm', '.ogg', '.avi', '.mov', '.mkv']
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    setupPasswordProtection();
    
    // Only initialize gallery if already authenticated (for page refresh)
    if (isAuthenticated) {
        initializeGallery();
        setupEventListeners();
        loadImages();
    }
});

// Password Protection Functions
function setupPasswordProtection() {
    // Check if user is already authenticated (for page refresh)
    if (sessionStorage.getItem('galleryAuthenticated') === 'true') {
        isAuthenticated = true;
        showGallery();
        return;
    }
    
    // Setup password form event listeners
    submitPassword.addEventListener('click', validatePassword);
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            validatePassword();
        }
    });
    
    // Focus on password input
    passwordInput.focus();
}

function validatePassword() {
    const enteredPassword = passwordInput.value.trim();
    
    if (enteredPassword === '') {
        showPasswordError('Please enter a password');
        return;
    }
    
    if (enteredPassword === GALLERY_PASSWORD) {
        // Correct password
        isAuthenticated = true;
        sessionStorage.setItem('galleryAuthenticated', 'true');
        showGallery();
    } else {
        // Wrong password
        showPasswordError('Incorrect password. Please try again.');
        passwordInput.value = '';
        passwordInput.focus();
        
        // Add shake animation
        passwordModal.classList.add('shake');
        setTimeout(() => {
            passwordModal.classList.remove('shake');
        }, 500);
    }
}

function showPasswordError(message) {
    passwordError.textContent = message;
    passwordError.style.display = 'block';
    
    // Clear error after 3 seconds
    setTimeout(() => {
        passwordError.style.display = 'none';
    }, 3000);
}

function showGallery() {
    // Hide password modal
    passwordModal.classList.remove('active');
    
    // Show main content
    mainContent.classList.add('active');
    
    // Initialize gallery
    initializeGallery();
    setupEventListeners();
    loadImages();
}

// Initialize gallery
function initializeGallery() {
    // Create media objects with metadata
    images = mediaFiles.map((filename, index) => {
        const ext = '.' + filename.split('.').pop().toLowerCase();
        const isVideo = SUPPORTED_EXTENSIONS.videos.includes(ext);
        
        return {
            id: index,
            src: `image/${filename}`,
            name: filename.replace(/\.[^/.]+$/, '').replace(/^Snapchat-/, 'Photo ').replace(/^(\w+)-/, '$1 '),
            alt: `${isVideo ? 'Video' : 'Image'} ${index + 1}`,
            type: isVideo ? 'video' : 'image',
            extension: ext
        };
    });
    
    console.log(`🎉 Loaded ${images.length} media files!`);
    console.log(`📊 With ${itemsPerPage} items per page, you'll have ${Math.ceil(images.length / itemsPerPage)} pages`);
    console.log(`📁 First few files:`, images.slice(0, 5).map(f => f.src));
    console.log(`📁 Total files available: ${mediaFiles.length}`);
    
    // Calculate total pages
    calculateTotalPages();
}

// Setup event listeners
function setupEventListeners() {
    // Mode switching
    galleryModeBtn.addEventListener('click', () => switchMode('gallery'));
    viewModeBtn.addEventListener('click', () => switchMode('view'));
    
    // Navigation
    prevBtn.addEventListener('click', showPreviousImage);
    nextBtn.addEventListener('click', showNextImage);
    closeViewer.addEventListener('click', () => switchMode('gallery'));
    
    // Lightbox
    closeLightbox.addEventListener('click', closeLightboxModal);
    
    // Pagination
    firstPage.addEventListener('click', () => goToPage(1));
    prevPage.addEventListener('click', () => goToPage(currentPage - 1));
    nextPage.addEventListener('click', () => goToPage(currentPage + 1));
    lastPage.addEventListener('click', () => goToPage(totalPages));
    itemsPerPageSelect.addEventListener('change', handleItemsPerPageChange);
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
    
    // Close lightbox on outside click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightboxModal();
        }
    });
}

// Pagination Functions
function calculateTotalPages() {
    totalPages = Math.ceil(images.length / itemsPerPage);
    if (currentPage > totalPages) {
        currentPage = totalPages || 1;
    }
}

function getCurrentPageImages() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return images.slice(startIndex, endIndex);
}

function goToPage(page) {
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    loadImages();
    updatePagination();
}

function handleItemsPerPageChange() {
    itemsPerPage = parseInt(itemsPerPageSelect.value);
    currentPage = 1; // Reset to first page
    calculateTotalPages();
    loadImages();
    updatePagination();
}

function updatePagination() {
    // Update page info
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    
    // Update image count
    const startIndex = (currentPage - 1) * itemsPerPage + 1;
    const endIndex = Math.min(currentPage * itemsPerPage, images.length);
    imageCount.textContent = `Showing ${startIndex}-${endIndex} of ${images.length} files`;
    
    // Update navigation buttons
    firstPage.disabled = currentPage === 1;
    prevPage.disabled = currentPage === 1;
    nextPage.disabled = currentPage === totalPages;
    lastPage.disabled = currentPage === totalPages;
    
    // Generate page numbers
    generatePageNumbers();
}

function generatePageNumbers() {
    pageNumbers.innerHTML = '';
    
    if (totalPages <= 7) {
        // Show all page numbers if 7 or fewer pages
        for (let i = 1; i <= totalPages; i++) {
            createPageNumber(i);
        }
    } else {
        // Show smart pagination with ellipsis
        if (currentPage <= 4) {
            // Show first 5 pages + ellipsis + last page
            for (let i = 1; i <= 5; i++) {
                createPageNumber(i);
            }
            createEllipsis();
            createPageNumber(totalPages);
        } else if (currentPage >= totalPages - 3) {
            // Show first page + ellipsis + last 5 pages
            createPageNumber(1);
            createEllipsis();
            for (let i = totalPages - 4; i <= totalPages; i++) {
                createPageNumber(i);
            }
        } else {
            // Show first page + ellipsis + current page ± 1 + ellipsis + last page
            createPageNumber(1);
            createEllipsis();
            for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                createPageNumber(i);
            }
            createEllipsis();
            createPageNumber(totalPages);
        }
    }
}

function createPageNumber(pageNum) {
    const pageBtn = document.createElement('button');
    pageBtn.className = `page-number ${pageNum === currentPage ? 'active' : ''}`;
    pageBtn.textContent = pageNum;
    pageBtn.addEventListener('click', () => goToPage(pageNum));
    pageNumbers.appendChild(pageBtn);
}

function createEllipsis() {
    const ellipsis = document.createElement('span');
    ellipsis.className = 'page-number ellipsis';
    ellipsis.textContent = '...';
    pageNumbers.appendChild(ellipsis);
}

// Load images into gallery
function loadImages() {
    galleryGrid.innerHTML = '';
    
    const currentPageImages = getCurrentPageImages();
    
    currentPageImages.forEach((media, index) => {
        const galleryItem = createGalleryItem(media, index);
        galleryGrid.appendChild(galleryItem);
    });
    
    updatePagination();
}

// Create gallery item (supports both images and videos)
function createGalleryItem(media, index) {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.dataset.index = index;
    
    if (media.type === 'video') {
        // Create video thumbnail
        item.innerHTML = `
            <video src="${media.src}" preload="metadata" muted>
                Your browser does not support the video tag.
            </video>
            <div class="video-overlay">
                <i class="fas fa-play-circle"></i>
            </div>
            <div class="gallery-item-info">
                <h3>${media.name}</h3>
                <span class="media-type">Video</span>
            </div>
        `;
        
        // Add video click event
        item.addEventListener('click', () => {
            if (currentMode === 'gallery') {
                openVideoLightbox(media.id);
            }
        });
        
    } else {
        // Create image item
        item.innerHTML = `
            <img src="${media.src}" alt="${media.alt}" loading="lazy">
            <div class="gallery-item-info">
                <h3>${media.name}</h3>
                <span class="media-type">Image</span>
            </div>
        `;
        
        // Add image click event
        item.addEventListener('click', () => {
            if (currentMode === 'gallery') {
                openLightbox(media.id);
            }
        });
    }
    
    return item;
}

// Switch between gallery and view modes
function switchMode(mode) {
    currentMode = mode;
    
    // Update button states
    galleryModeBtn.classList.toggle('active', mode === 'gallery');
    viewModeBtn.classList.toggle('active', mode === 'view');
    
    // Update container visibility
    galleryContainer.classList.toggle('active', mode === 'gallery');
    viewContainer.classList.toggle('active', mode === 'view');
    
    // If switching to view mode, show first image
    if (mode === 'view') {
        currentImageIndex = 0;
        showImage(currentImageIndex);
    }
}

// Show image in view mode
function showImage(index) {
    if (index < 0 || index >= images.length) return;
    
    currentImageIndex = index;
    const media = images[index];
    
    if (media.type === 'video') {
        // Handle video in view mode
        showVideoInViewer(media);
    } else {
        // Handle image in view mode
        showImageInViewer(media);
    }
}

function showImageInViewer(media) {
    // Clear any existing video
    const existingVideo = viewerImage.parentNode.querySelector('video');
    if (existingVideo) {
        existingVideo.remove();
    }
    
    viewerImage.style.display = 'block';
    viewerImage.src = media.src;
    viewerImage.alt = media.alt;
    
    updateViewerInfo(media);
}

function showVideoInViewer(media) {
    // Hide image and show video
    viewerImage.style.display = 'none';
    
    // Remove existing video if any
    const existingVideo = viewerImage.parentNode.querySelector('video');
    if (existingVideo) {
        existingVideo.remove();
    }
    
    // Create video element
    const video = document.createElement('video');
    video.src = media.src;
    video.controls = true;
    video.style.maxWidth = '100%';
    video.style.maxHeight = '70vh';
    video.style.borderRadius = '10px';
    video.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
    
    viewerImage.parentNode.insertBefore(video, viewerImage);
    
    updateViewerInfo(media);
}

function updateViewerInfo(media) {
    imageCounter.textContent = `${currentImageIndex + 1} / ${images.length}`;
    imageName.textContent = media.name;
    
    // Update navigation button states
    prevBtn.disabled = currentImageIndex === 0;
    nextBtn.disabled = currentImageIndex === images.length - 1;
}

// Show previous image
function showPreviousImage() {
    if (currentImageIndex > 0) {
        // Add animation class
        prevBtn.classList.add('prev');
        nextBtn.classList.remove('next');
        showImage(currentImageIndex - 1);
    }
}

// Show next image
function showNextImage() {
    if (currentImageIndex < images.length - 1) {
        // Add animation class
        nextBtn.classList.add('next');
        prevBtn.classList.remove('prev');
        showImage(currentImageIndex + 1);
    }
}

// Open lightbox for images
function openLightbox(index) {
    currentImageIndex = index;
    const media = images[index];
    
    if (media.type === 'video') {
        openVideoLightbox(index);
        return;
    }
    
    lightboxImage.src = media.src;
    lightboxImage.alt = media.alt;
    lightboxCounter.textContent = `${index + 1} / ${images.length}`;
    lightboxName.textContent = media.name;
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Open video lightbox
function openVideoLightbox(index) {
    currentImageIndex = index;
    const media = images[index];
    
    // Clear existing content
    lightboxImage.style.display = 'none';
    const existingVideo = lightbox.querySelector('video');
    if (existingVideo) {
        existingVideo.remove();
    }
    
    // Create video element
    const video = document.createElement('video');
    video.src = media.src;
    video.controls = true;
    video.style.maxWidth = '100%';
    video.style.maxHeight = '100%';
    video.style.borderRadius = '10px';
    
    lightboxImage.parentNode.insertBefore(video, lightboxImage);
    
    lightboxCounter.textContent = `${index + 1} / ${images.length}`;
    lightboxName.textContent = media.name;
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close lightbox
function closeLightboxModal() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Reset lightbox content
    lightboxImage.style.display = 'block';
    const video = lightbox.querySelector('video');
    if (video) {
        video.remove();
    }
}

// Handle keyboard navigation
function handleKeyboardNavigation(e) {
    if (lightbox.classList.contains('active')) {
        switch(e.key) {
            case 'Escape':
                closeLightboxModal();
                break;
            case 'ArrowLeft':
                if (currentImageIndex > 0) {
                    openLightbox(currentImageIndex - 1);
                }
                break;
            case 'ArrowRight':
                if (currentImageIndex < images.length - 1) {
                    openLightbox(currentImageIndex + 1);
                }
                break;
        }
    } else if (currentMode === 'view') {
        switch(e.key) {
            case 'ArrowLeft':
                showPreviousImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
            case 'Escape':
                switchMode('gallery');
                break;
        }
    }
}

// Add touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next image
            if (currentMode === 'view') {
                showNextImage();
            } else if (lightbox.classList.contains('active')) {
                if (currentImageIndex < images.length - 1) {
                    openLightbox(currentImageIndex + 1);
                }
            }
        } else {
            // Swipe right - previous image
            if (currentMode === 'view') {
                showPreviousImage();
            } else if (lightbox.classList.contains('active')) {
                if (currentImageIndex > 0) {
                    openLightbox(currentImageIndex - 1);
                }
            }
        }
    }
}

// Preload media for better performance
function preloadMedia() {
    images.forEach(media => {
        if (media.type === 'image') {
            const img = new Image();
            img.src = media.src;
            img.onerror = () => console.warn(`Failed to preload image: ${media.name}`);
        } else if (media.type === 'video') {
            const video = document.createElement('video');
            video.src = media.src;
            video.preload = 'metadata';
            video.onerror = () => console.warn(`Failed to preload video: ${media.name}`);
        }
    });
}

// Initialize preloading after gallery is loaded
setTimeout(() => {
    if (isAuthenticated && images.length > 0) {
        preloadMedia();
    }
}, 1000);

// Add shake animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    .shake {
        animation: shake 0.5s ease-in-out;
    }
    
    .video-overlay {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 3rem;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
        pointer-events: none;
    }
    
    .media-type {
        font-size: 0.8rem;
        color: #718096;
        font-weight: 500;
    }
`;
document.head.appendChild(style);
