// Workout Data
const workouts = [
    {
        id: "1",
        title: "Quick Desk Stretch Routine",
        description: "Perfect for office workers. Stretch your neck, shoulders, and back without leaving your desk.",
        youtubeId: "dQw4w9WgXcQ",
        duration: "1",
        bodyArea: "desk-stretches",
        goal: "de-stress",
        isOfficeHealth: true,
    },
    {
        id: "2",
        title: "5-Minute Core Blast",
        description: "No equipment needed. Strengthen your core with these 5 intense exercises.",
        youtubeId: "dQw4w9WgXcQ",
        duration: "5",
        bodyArea: "core-blast",
        goal: "post-lunch-energy",
        isOfficeHealth: false,
    },
    {
        id: "3",
        title: "Seated Leg Quickie",
        description: "Stay seated and work your legs with this quick routine.",
        youtubeId: "dQw4w9WgXcQ",
        duration: "1",
        bodyArea: "leg-quickie",
        goal: "post-lunch-energy",
        isOfficeHealth: true,
    },
    {
        id: "4",
        title: "3-Minute Wake-Up Routine",
        description: "Get energized and ready for the day with this quick wake-up sequence.",
        youtubeId: "dQw4w9WgXcQ",
        duration: "3",
        bodyArea: "full-body",
        goal: "wake-up",
        isOfficeHealth: false,
    },
    {
        id: "5",
        title: "Office Desk Yoga",
        description: "Gentle yoga stretches you can do right at your desk.",
        youtubeId: "dQw4w9WgXcQ",
        duration: "5",
        bodyArea: "desk-stretches",
        goal: "de-stress",
        isOfficeHealth: true,
    },
    {
        id: "6",
        title: "1-Minute Energy Boost",
        description: "Quick bursts of movement to boost your energy and focus.",
        youtubeId: "dQw4w9WgXcQ",
        duration: "1",
        bodyArea: "full-body",
        goal: "post-lunch-energy",
        isOfficeHealth: true,
    },
    {
        id: "7",
        title: "3-Minute Core Crunch",
        description: "Efficient core workout without equipment.",
        youtubeId: "dQw4w9WgXcQ",
        duration: "3",
        bodyArea: "core-blast",
        goal: "wake-up",
        isOfficeHealth: false,
    },
    {
        id: "8",
        title: "Standing Leg Quickie",
        description: "No desk needed. Quick leg exercises for any time.",
        youtubeId: "dQw4w9WgXcQ",
        duration: "3",
        bodyArea: "leg-quickie",
        goal: "post-lunch-energy",
        isOfficeHealth: false,
    },
];

// Category Labels
const categoryLabels = {
    time: {
        "1": "1 Minute",
        "3": "3 Minutes",
        "5": "5 Minutes",
    },
    bodyArea: {
        "desk-stretches": "Desk Stretches",
        "core-blast": "Core Blast",
        "leg-quickie": "Leg Quickie",
        "full-body": "Full Body",
    },
    goal: {
        "wake-up": "Wake Up",
        "de-stress": "De-Stress",
        "post-lunch-energy": "Post-Lunch Energy",
    },
};

// Challenges Data
const challenges = [
    {
        id: "1",
        title: "7-Day 5-Minute Plank Challenge",
        description:
            "Build core strength with progressive plank exercises over 7 days. Perfect for beginners looking to strengthen their core without equipment.",
        duration: "7 Days",
        difficulty: "beginner",
        imageClass: "blue",
    },
    {
        id: "2",
        title: "14-Day Desk Stretch Mastery",
        description:
            "Complete a series of targeted desk stretches to improve flexibility and reduce muscle tension from sitting.",
        duration: "14 Days",
        difficulty: "beginner",
        imageClass: "green",
    },
    {
        id: "3",
        title: "30-Day Full Body Burn",
        description:
            "A month-long challenge combining cardio, strength, and flexibility work with 5-minute daily sessions.",
        duration: "30 Days",
        difficulty: "intermediate",
        imageClass: "orange",
    },
];
