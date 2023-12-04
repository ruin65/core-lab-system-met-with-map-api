let objectIDs = [];
let currentArtworkIndex = 0;
const maxArtworksToShow = 10;
let currentSearchQuery = ''; // To store the current search query for YouTube videos

document.addEventListener('DOMContentLoaded', () => {
    loadArtworkWithImage();
    initializeMap(); // Initialize the map when the document is loaded
});

function loadArtworkWithImage() {
    if (currentArtworkIndex >= maxArtworksToShow) {
        displayEndMessage();
        return;
    }

    fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects')
        .then(response => response.json())
        .then(data => {
            objectIDs = data.objectIDs;
            tryLoadArtwork();
        });
}

function tryLoadArtwork() {
    if (currentArtworkIndex >= maxArtworksToShow) {
        displayEndMessage();
        return;
    }

    const randomIndex = Math.floor(Math.random() * objectIDs.length);
    const artId = objectIDs[randomIndex];

    fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${artId}`)
        .then(response => response.json())
        .then(artData => {
            if (artData.primaryImage && artData.country) {  // Check if artwork includes image and country
                updateArtworkDisplay(artData); // Update artwork and map display
                currentArtworkIndex++;
            } else {
                tryLoadArtwork();  // Try another artwork if conditions are not met
            }
        });
}




function displayEndMessage() {
    const artContainer = document.getElementById('artContainer');
    artContainer.innerHTML = '<p class="end-message-1">END</p> <br> <p class="end-message-2">No more options for today!</p>';
}


document.getElementById('dislikeButton').addEventListener('click', () => {
    loadArtworkWithImage();
    document.getElementById('artInfo').style.display = 'none';
    document.getElementById('nextButton').style.display = 'none';
});

document.getElementById('likeButton').addEventListener('click', () => {
    document.getElementById('artInfo').style.display = 'block';
    document.getElementById('nextButton').style.display = 'block';
});

document.getElementById('nextButton').addEventListener('click', () => {
    loadArtworkWithImage();
    document.getElementById('artInfo').style.display = 'none';
    document.getElementById('nextButton').style.display = 'none';
});



document.getElementById('dislikeButton').addEventListener('click', () => {
    animateAndLoadNextImage('left');
});

document.getElementById('nextButton').addEventListener('click', () => {
    animateAndLoadNextImage('right');
});

function animateAndLoadNextImage(direction) {
    const artImage = document.getElementById('artImage');
    artImage.style.opacity = '0';
    artImage.style.transform = `translateX(${direction === 'left' ? '-' : ''}100%)`;

    setTimeout(() => {
        resetImagePosition();
       
    }, 500); // 500 毫秒后执行，与 CSS 过渡时间相同
}

function resetImagePosition() {
    const artImage = document.getElementById('artImage');
    // 禁用过渡效果
    artImage.style.transition = 'none';

    // 重置图片位置和透明度
    artImage.style.opacity = '0';
    artImage.style.transform = 'translateX(0)';

    // 重新启用过渡效果
    setTimeout(() => {
        artImage.style.transition = '';
        artImage.style.opacity = '1'; // 现在改变透明度，以显示图片
    }, 100); // 使用非常短的延时确保位置变化已经完成
}


function updateArtworkDisplay(artworkData) {
    document.getElementById('artImage').src = artworkData.primaryImage;

    let artInfoText = `${artworkData.title}\n${artworkData.artistDisplayName}\n${artworkData.objectDate}`;
    // Additional info fields as before
    artInfoText += `\nCountry: ${artworkData.country}`;  
    artInfoText += artworkData.city ? `\nCity: ${artworkData.city}` : '';

    document.getElementById('artInfo').innerText = artInfoText;


    const countryName = artworkData.country; // Use country name for coordinates
    console.log("Country Name:", countryName); // Debugging log

    const coordinates = countryCoordinates[countryName];
    console.log("Coordinates:", coordinates); // Debugging log

    if (coordinates) {
        updateMapWithArtworkCity(coordinates.latitude, coordinates.longitude);
    } else {
        console.log("Coordinates not found for country: " + countryName);
    }
}

let map; // Define the map variable

function initializeMap() {
    if (!map) { 
        map = L.map('mapid').setView([40.7128, -74.0060], 13); // Default to New York City

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);
    }
}

function updateMapWithArtworkCity(latitude, longitude) {
    if (map) {
        map.setView([latitude, longitude], 13);
    }
}

// Mapping of countries to their latitude and longitude
const countryCoordinates = {
    "USA": { latitude: 37.0902, longitude: -95.7129 },
    "UK": { latitude: 55.3781, longitude: -3.4360 },
    "France": { latitude: 46.2276, longitude: 2.2137 },
    "Italy": { latitude: 41.8719, longitude: 12.5674 },
    "Greece": { latitude: 39.0742, longitude: 21.8243 },
    "Germany": { latitude: 51.1657, longitude: 10.4515 },
    "Egypt": { latitude: 26.8206, longitude: 30.8025 },
    "Japan": { latitude: 36.2048, longitude: 138.2529 },
    "China": { latitude: 35.8617, longitude: 104.1954 },
    "Mexico": { latitude: 23.6345, longitude: -102.5528 },
    "India": { latitude: 20.5937, longitude: 78.9629 },
    "Turkey": { latitude: 38.9637, longitude: 35.2433 },
    "Russia": { latitude: 61.5240, longitude: 105.3188 },
    "Brazil": { latitude: -14.2350, longitude: -51.9253 },
    "Canada": { latitude: 56.1304, longitude: -106.3468 },
    "Australia": { latitude: -25.2744, longitude: 133.7751 },
    "South Africa": { latitude: -30.5595, longitude: 22.9375 },
    "Spain": { latitude: 40.4637, longitude: -3.7492 },
    "Netherlands": { latitude: 52.1326, longitude: 5.2913 },
    "South Korea": { latitude: 35.9078, longitude: 127.7669 },
    "Argentina": { latitude: -38.4161, longitude: -63.6167 },
    "Sweden": { latitude: 60.1282, longitude: 18.6435 },
    "Norway": { latitude: 60.4720, longitude: 8.4689 },
};


function displayEndMessage() {
    const artContainer = document.getElementById('artContainer');
    artContainer.innerHTML = '<p class="end-message">END - No more options for today!</p>';
}




