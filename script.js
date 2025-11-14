// --- 1. Video Data Store (Replace with real YouTube IDs and descriptions) ---
const videoData = [
    {
        id: 1,
        title: "1-Minute Energy Boost",
        description: "A simple, no-sweat routine to shake off the mid-day slump.",
        youtubeId: "vB-06_xQy9M", // Replace with a real ID
        tags: ["1-minute", "desk-stretches", "post-lunch-energy"],
    },
    {
        id: 2,
        title: "3-Minute Core Quickie",
        description: "Tighten your core without even getting on the floor.",
        youtubeId: "I_rQ_M-Xf5Q",
        tags: ["3-minutes", "core-blast", "wake-up"],
    },
    {
        id: 3,
        title: "5-Minute Leg Quickie",
        description: "Wake up those lower body muscles in a flash.",
        youtubeId: "I_rQ_M-Xf5Q",
        tags: ["5-minutes", "leg-quickie"],
    },
    {
        id: 4,
        title: "2-Minute De-Stress Breathwork",
        description: "A quick breathing and stretch routine for instant calm.",
        youtubeId: "s7uN0gO7yLg",
        tags: ["3-minutes", "desk-stretches", "de-stress"],
    },
    // Add more video objects here
];

// --- 2. DOM Elements ---
const loginContainer = document.getElementById('login-container');
const mainContent = document.getElementById('main-content');
const loginForm = document.getElementById('login-form');
const logoutBtn = document.getElementById('logout-btn');
const loginMessage = document.getElementById('login-message');
const videoCardsContainer = document.getElementById('video-cards-container');
const videoEmbed = document.getElementById('video-embed');
const tagButtons = document.getElementById('tag-buttons');

// --- 3. Initial Setup ---

// Function to generate and display the video cards
function renderVideoCards(videos) {
    videoCardsContainer.innerHTML = ''; // Clear existing cards
    videos.forEach(video => {
        const card = document.createElement('div');
        card.className = 'video-card';
        card.setAttribute('data-id', video.id);
        
        // Simple thumbnail placeholder (Replace with actual YouTube thumbnails)
        const thumbnailUrl = `https://img.youtube.com/vi/${video.youtubeId}/default.jpg`;

        card.innerHTML = `
            <img src="${thumbnailUrl}" alt="${video.title} thumbnail">
            <div class="card-info">
                <h4>${video.title}</h4>
                <p>Tags: ${video.tags.join(', ')}</p>
                <button class="play-btn" data-video-id="${video.youtubeId}">Play</button>
            </div>
        `;
        videoCardsContainer.appendChild(card);
    });
}

// Function to update the main video player
function loadVideo(videoId) {
    const embedCode = `
        <iframe 
            width="100%" 
            height="400" 
            src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
        </iframe>
    `;
    videoEmbed.innerHTML = embedCode;

    // Optional: Update Title/Description based on videoData
    const video = videoData.find(v => v.youtubeId === videoId);
    if (video) {
        document.getElementById('video-title').textContent = video.title;
        document.getElementById('video-description').textContent = video.description;
    }
}

// Function to handle tag filtering
function filterVideos(tag) {
    // 1. Update active button state
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.filter-btn[data-tag="${tag}"]`).classList.add('active');

    // 2. Filter data
    const filtered = tag === 'all' 
        ? videoData 
        : videoData.filter(video => video.tags.includes(tag));

    // 3. Render filtered cards
    renderVideoCards(filtered);

    // 4. Load the first video of the filtered list (optional)
    if (filtered.length > 0) {
        loadVideo(filtered[0].youtubeId);
    }
}

// --- 4. Event Listeners ---

// ** A. Login Handler **
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simple Front-End Validation (Client-Side Only)
    if (username === 'guest' && password === '123') {
        loginContainer.classList.add('hidden');
        mainContent.classList.remove('hidden');
        loginMessage.classList.add('hidden');
        
        // Load initial video list and featured video
        renderVideoCards(videoData);
        loadVideo(videoData[0].youtubeId);

    } else {
        loginMessage.textContent = "Invalid username or password. Try 'guest' and '123'.";
        loginMessage.classList.remove('hidden');
    }
});

// ** B. Logout Handler **
logoutBtn.addEventListener('click', function() {
    mainContent.classList.add('hidden');
    loginContainer.classList.remove('hidden');
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    loginMessage.classList.add('hidden');
});

// ** C. Play Button & Tag Filter Handlers **
document.addEventListener('click', function(e) {
    // Handle Play Button Click
    if (e.target.classList.contains('play-btn')) {
        const videoId = e.target.getAttribute('data-video-id');
        loadVideo(videoId);
    }
    
    // Handle Filter Button Click
    if (e.target.classList.contains('filter-btn')) {
        const tag = e.target.getAttribute('data-tag');
        filterVideos(tag);
    }
});

// ** D. Generate Filter Buttons (You might want to do this more robustly) **
// A simplified way to add the main filter buttons on load
function generateFilterButtons() {
    // Hardcoding the list for simplicity, but you could generate this dynamically
    const filtersHtml = `
        <button class="filter-btn active" data-tag="all">All Workouts</button>
        <button class="filter-btn" data-tag="1-minute">1 Minute</button>
        <button class="filter-btn" data-tag="3-minutes">3 Minutes</button>
        <button class="filter-btn" data-tag="5-minutes">5 Minutes</button>
        <button class="filter-btn" data-tag="desk-stretches">Desk Stretches</button>
        <button class="filter-btn" data-tag="core-blast">Core Blast</button>
        <button class="filter-btn" data-tag="leg-quickie">Leg Quickie</button>
        <button class="filter-btn" data-tag="wake-up">Wake Up</button>
        <button class="filter-btn" data-tag="de-stress">De-Stress</button>
        <button class="filter-btn" data-tag="post-lunch-energy">Energy</button>
    `;
    tagButtons.innerHTML = filtersHtml;
}

// Initialize on page load
generateFilterButtons();