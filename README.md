<div align="center">
  <img src="frontend/public/buzzinga-1200x-high-resolution-color-logo.png" alt="Buzzinga Logo" width="600">
  
  <p align="center">
    <b>High-energy, real-time multiplayer quiz platform.</b>
    <br />
    <a href="#🚀-quick-start">Quick Start</a>
    ·
    <a href="https://github.com/AdityaDotEnv/Buzzinga/issues">Report Bug</a>
    ·
    <a href="https://github.com/AdityaDotEnv/Buzzinga/pulls">Request Feature</a>
  </p>
</div>

---

Buzzinga is a high-energy, real-time multiplayer quiz platform designed for modern engagement. Whether you're hosting a trivia night, a classroom review, or a corporate icebreaker, Buzzinga delivers a premium, low-latency experience with vibrant aesthetics and seamless interactions.

## ✨ Features

- **Real-Time Multiplayer**: Instant state synchronization via Socket.IO for hosts and players.
- **Dynamic Quiz Builder**: Create quizzes manually with a powerful editor or generate them using AI.
- **Warp-Speed Joining**: Join rooms instantly via 6-digit PINs with hyperdrive-themed transitions.
- **Advanced Control Tower**: Hosts can manage question phases, monitor player performance, and track leaderboard shifts in real-time.
- **Premium Aesthetics**: Sentry-inspired design system featuring dark modes, vibrant gradients, and fluid Framer Motion animations.
- **Secure Authentication**: JWT-based session management and role-based access control.

## 🛠️ Tech Stack

### Frontend

- **Framework**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4 + Custom Vanilla CSS
- **State Management**: Redux Toolkit
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Networking**: Socket.IO Client + Fetch API

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Real-Time**: Socket.IO
- **Validation**: Zod
- **Security**: JWT + Bcrypt + Helmet

## 🚀 Quick Start

### Prerequisites

- Node.js (v20+)
- MongoDB (Local or Atlas)

### 1. Clone the Repository

```bash
git clone https://github.com/AdityaDotEnv/Buzzinga.git
cd Buzzinga
```

### 2. Set Up Environment Variables

Create a `.env` file in the `server/` directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

### 3. Install Dependencies

```bash
# Install frontend dependencies
cd frontend
npm install

# Install server dependencies
cd ../server
npm install
```

### 4. Run Development Servers

```bash
# Start backend (from /server)
npm run dev

# Start frontend (from /frontend)
npm run dev
```

## 🏗️ Architecture

Buzzinga follows a decoupled client-server architecture:

- **`frontend/`**: A Vite-powered SPA. Features atomic component design, centralized state in Redux, and specialized hooks for socket management.
- **`server/`**: An Express server utilizing a Singleton `GameManager` to handle in-memory game states for high performance, while persisting room and quiz data to MongoDB for long-term consistency.
- **Live Sync**: Uses a "Broadcast State" pattern where the server acts as the source of truth, emitting optimized delta updates to clients on every state change.

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## ⚖️ License

Distributed under the MIT License. See `LICENSE` for more information.
