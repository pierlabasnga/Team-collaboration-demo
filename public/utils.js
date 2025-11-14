// Utility Functions

/**
 * Create a video card element
 */
function createVideoCard(workout, isSelected = false) {
    const card = document.createElement('div');
    card.className = `video-card ${isSelected ? 'selected' : ''}`;
    card.dataset.workoutId = workout.id;

    const thumbnail = document.createElement('div');
    thumbnail.className = 'video-card-thumbnail';
    thumbnail.innerHTML = `
        <div class="video-card-overlay">
            <div class="play-button">▶️</div>
        </div>
        ${workout.isOfficeHealth ? '<span class="tag tag-accent office-badge">Office Friendly</span>' : ''}
    `;

    const content = document.createElement('div');
    content.className = 'video-card-content';

    const title = document.createElement('h3');
    title.textContent = workout.title;

    const description = document.createElement('p');
    description.textContent = workout.description;

    const tags = document.createElement('div');
    tags.className = 'video-card-tags';
    tags.innerHTML = `
        <span class="video-card-tag">${categoryLabels.time[workout.duration]}</span>
        <span class="video-card-tag">${categoryLabels.bodyArea[workout.bodyArea]}</span>
        <span class="video-card-tag">${categoryLabels.goal[workout.goal]}</span>
    `;

    const button = document.createElement('button');
    button.className = 'btn btn-outline btn-full btn-sm';
    button.textContent = isSelected ? 'Playing' : 'Play Video';

    content.appendChild(title);
    content.appendChild(description);
    content.appendChild(tags);
    content.appendChild(button);

    card.appendChild(thumbnail);
    card.appendChild(content);

    return card;
}

/**
 * Create a challenge card element
 */
function createChallengeCard(challenge) {
    const card = document.createElement('div');
    card.className = 'challenge-card';

    const image = document.createElement('div');
    image.className = `challenge-image ${challenge.imageClass}`;

    const content = document.createElement('div');
    content.className = 'challenge-content';

    const title = document.createElement('div');
    title.className = 'challenge-title';
    title.textContent = challenge.title;

    const description = document.createElement('div');
    description.className = 'challenge-desc';
    description.textContent = challenge.description;

    const meta = document.createElement('div');
    meta.className = 'challenge-meta';

    const durationBadge = document.createElement('span');
    durationBadge.className = 'tag';
    durationBadge.innerHTML = `📅 ${challenge.duration}`;

    const difficultyClass = challenge.difficulty === 'beginner' ? '' : challenge.difficulty === 'intermediate' ? 'tag-secondary' : 'tag-destructive';
    const difficultyBadge = document.createElement('span');
    difficultyBadge.className = `tag ${difficultyClass}`;
    difficultyBadge.textContent = challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1);

    meta.appendChild(durationBadge);
    meta.appendChild(difficultyBadge);

    const btnGroup = document.createElement('div');
    btnGroup.className = 'challenge-btn-group';

    const downloadBtn = document.createElement('button');
    downloadBtn.className = 'btn btn-primary btn-full';
    downloadBtn.textContent = '⬇️ Download Printable Sheet';

    const startBtn = document.createElement('button');
    startBtn.className = 'btn btn-outline btn-full';
    startBtn.textContent = 'Start Challenge';

    btnGroup.appendChild(downloadBtn);
    btnGroup.appendChild(startBtn);

    content.appendChild(title);
    content.appendChild(description);
    content.appendChild(meta);
    content.appendChild(btnGroup);

    card.appendChild(image);
    card.appendChild(content);

    return card;
}

/**
 * Update video player and info
 */
function updateVideoPlayer(workout, playerId = 'youtube-player', titleId = 'selected-workout-title', descId = 'selected-workout-desc', tagsId = 'selected-workout-tags') {
    const player = document.getElementById(playerId);
    const titleEl = document.getElementById(titleId);
    const descEl = document.getElementById(descId);
    const tagsEl = document.getElementById(tagsId);

    if (player) {
        player.innerHTML = `<iframe src="https://www.youtube.com/embed/${workout.youtubeId}?rel=0" title="${workout.title}" class="youtube-iframe" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>`;
    }

    if (titleEl) titleEl.textContent = workout.title;
    if (descEl) descEl.textContent = workout.description;

    if (tagsEl) {
        tagsEl.innerHTML = `
            <span class="tag tag-primary">${categoryLabels.time[workout.duration]}</span>
            <span class="tag">${categoryLabels.bodyArea[workout.bodyArea]}</span>
            <span class="tag">${categoryLabels.goal[workout.goal]}</span>
            ${workout.isOfficeHealth ? '<span class="tag tag-accent">Office Friendly</span>' : ''}
        `;
    }
}

/**
 * Render video grid
 */
function renderVideoGrid(gridId, workoutsList, selectedWorkoutId, clickCallback) {
    const grid = document.getElementById(gridId);
    grid.innerHTML = '';

    workoutsList.forEach(workout => {
        const card = createVideoCard(workout, selectedWorkoutId === workout.id);
        card.addEventListener('click', () => clickCallback(workout));
        grid.appendChild(card);
    });
}

/**
 * Render challenges grid
 */
function renderChallengesGrid(challengesList) {
    const grid = document.getElementById('challenges-grid');
    grid.innerHTML = '';

    challengesList.forEach(challenge => {
        const card = createChallengeCard(challenge);
        grid.appendChild(card);
    });
}

/**
 * Get office health workouts
 */
function getOfficeHealthWorkouts() {
    return workouts.filter(w => w.isOfficeHealth);
}

/**
 * Filter workouts
 */
function filterWorkouts(filters) {
    return workouts.filter(workout => {
        if (filters.time && workout.duration !== filters.time) return false;
        if (filters.bodyArea && workout.bodyArea !== filters.bodyArea) return false;
        if (filters.goal && workout.goal !== filters.goal) return false;
        return true;
    });
}
