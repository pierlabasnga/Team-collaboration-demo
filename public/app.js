// Main Application Logic

class MicroFitApp {
    constructor() {
        this.currentPage = 'home';
        this.selectedWorkout = workouts[0];
        this.selectedOfficeWorkout = getOfficeHealthWorkouts()[0];
        this.filters = {
            time: null,
            bodyArea: null,
            goal: null,
        };
        this.init();
    }

    /**
     * Initialize the app
     */
    init() {
        this.setupRouting();
        this.setupEventListeners();
        this.renderHomePage();
        this.navigateToPage('home');
    }

    /**
     * Setup hash-based routing
     */
    setupRouting() {
        const handleRoute = () => {
            const hash = window.location.hash.slice(1) || '/';
            const path = hash.startsWith('/') ? hash : '/' + hash;

            if (path === '/' || path === '') {
                this.navigateToPage('home');
            } else if (path === '/office-health') {
                this.navigateToPage('office-health');
            } else if (path === '/challenges') {
                this.navigateToPage('challenges');
            } else {
                this.navigateToPage('notfound');
            }
        };

        window.addEventListener('hashchange', handleRoute);

        // Trigger initial navigation
        handleRoute();
    }

    /**
     * Navigate to a page
     */
    navigateToPage(page) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(p => {
            p.classList.remove('active');
        });

        // Show the selected page
        const pageEl = document.getElementById(page + '-page');
        if (pageEl) {
            pageEl.classList.add('active');
            this.currentPage = page;

            // Initialize page-specific content
            if (page === 'home') {
                this.renderHomePage();
            } else if (page === 'office-health') {
                this.renderOfficeHealthPage();
            } else if (page === 'challenges') {
                this.renderChallengesPage();
            }
        }
    }

    /**
     * Render home page
     */
    renderHomePage() {
        // Render initial video grid
        const filteredWorkouts = filterWorkouts(this.filters);
        renderVideoGrid('video-grid', filteredWorkouts, this.selectedWorkout.id, (workout) => {
            this.selectedWorkout = workout;
            updateVideoPlayer(workout);
            this.renderHomePage();
        });

        // Update video player with selected workout
        updateVideoPlayer(this.selectedWorkout);

        // Update count
        document.getElementById('workout-count').textContent = `(${filteredWorkouts.length})`;

        // Update grid title
        const hasFilters = this.filters.time || this.filters.bodyArea || this.filters.goal;
        document.getElementById('grid-title').innerHTML = hasFilters
            ? `Filtered Results <span class="accent">(${filteredWorkouts.length})</span>`
            : `All Workouts <span class="accent">(${filteredWorkouts.length})</span>`;

        // Setup filter buttons
        this.setupFilterButtons();
    }

    /**
     * Render office health page
     */
    renderOfficeHealthPage() {
        const officeWorkouts = getOfficeHealthWorkouts();

        // Render video grid
        renderVideoGrid('office-video-grid', officeWorkouts, this.selectedOfficeWorkout.id, (workout) => {
            this.selectedOfficeWorkout = workout;
            updateVideoPlayer(workout, 'office-youtube-player', 'office-selected-title', 'office-selected-desc', 'office-selected-tags');
            this.renderOfficeHealthPage();
        });

        // Update video player
        updateVideoPlayer(this.selectedOfficeWorkout, 'office-youtube-player', 'office-selected-title', 'office-selected-desc', 'office-selected-tags');

        // Update count
        document.getElementById('office-count').textContent = `(${officeWorkouts.length})`;
    }

    /**
     * Render challenges page
     */
    renderChallengesPage() {
        renderChallengesGrid(challenges);
    }

    /**
     * Setup filter button event listeners
     */
    setupFilterButtons() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const clearBtn = document.getElementById('clear-filters-btn');

        filterBtns.forEach(btn => {
            // Remove previous listeners by cloning
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);

            // Add new listener
            newBtn.addEventListener('click', () => {
                const filterType = newBtn.dataset.filter;
                const filterValue = newBtn.dataset.value;

                if (this.filters[filterType] === filterValue) {
                    this.filters[filterType] = null;
                } else {
                    this.filters[filterType] = filterValue;
                }

                this.renderHomePage();
            });
        });

        // Update button states
        filterBtns.forEach(btn => {
            const filterType = btn.dataset.filter;
            const filterValue = btn.dataset.value;

            if (this.filters[filterType] === filterValue) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Show/hide clear button
        const hasFilters = this.filters.time || this.filters.bodyArea || this.filters.goal;
        if (hasFilters) {
            clearBtn.style.display = 'block';
            clearBtn.onclick = () => {
                this.filters = { time: null, bodyArea: null, goal: null };
                this.renderHomePage();
            };
        } else {
            clearBtn.style.display = 'none';
        }
    }

    /**
     * Setup general event listeners
     */
    setupEventListeners() {
        // Logo click to home
        document.querySelector('.logo')?.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.hash = '#/';
        });

        // Navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');
                window.location.hash = href;
            });
        });
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new MicroFitApp();
});
