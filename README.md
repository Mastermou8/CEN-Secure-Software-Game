# CEN-Secure-Architecture-Game
The purpose of this game is to educate people into taking the proper security measures when securing a software.

Software structure:
secure-architecture-game/
│
├── index.html                  # Landing page / login screen
│
├── pages/
│   ├── dashboard.html          # Scenario selection screen
│   ├── game.html               # Active gameplay (drag/drop components)
│   ├── results.html            # Score + feedback screen
│   └── admin.html              # Admin panel for feedback submission
│
├── css/
│   ├── global.css              # CSS variables, resets, typography
│   ├── index.css               # Login/landing styles
│   ├── dashboard.css           # Scenario card grid styles
│   ├── game.css                # Game board, drag-drop UI
│   └── results.css             # Score display, feedback panel
│
├── js/
│   ├── auth.js                 # Login, session handling
│   ├── scenarios.js            # Scenario data + loading logic
│   ├── game.js                 # Core gameplay logic (drag/drop, timer)
│   ├── scoring.js              # Score calculation algorithm
│   ├── feedback.js             # Feedback rendering
│   └── api.js                  # Centralized fetch calls to your backend
│
├── data/
│   └── scenarios.json          # Scenario definitions, correct answers
│
└── assets/
    ├── icons/                  # Security component icons (firewall, etc.)
    └── images/                 # Any background/UI images
