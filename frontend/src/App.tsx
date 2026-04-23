import { useEffect, useState, type FormEvent } from 'react'
import './App.css'

type IconName =
  | 'spark'
  | 'play'
  | 'trophy'
  | 'chart'
  | 'users'
  | 'pin'
  | 'search'
  | 'shield'
  | 'bolt'
  | 'gift'
  | 'menu'
  | 'close'

type Feature = {
  title: string
  description: string
  icon: IconName
  accent: string
}

type Quiz = {
  title: string
  category: string
  difficulty: string
  players: string
  theme: string
}

type LeaderboardPlayer = {
  name: string
  score: number
  delta: number
  avatar: string
}

type TimelineStep = {
  title: string
  copy: string
  icon: IconName
}

const taglines = ['Learn Faster', 'Play Smarter', 'Compete Live', 'Host Instantly']

const heroStats = [
  { label: 'Live rooms today', value: '12.4K' },
  { label: 'Avg. join time', value: '8 sec' },
  { label: 'Completion rate', value: '94%' },
]

const trustBadges = ['No install required', 'Classroom ready', 'Built for teams']

const socialStats = [
  { label: 'Players joined', value: '2.8M' },
  { label: 'Quizzes created', value: '84K' },
  { label: 'Community rating', value: '4.9/5' },
  { label: 'Countries active', value: '42' },
]

const features: Feature[] = [
  {
    title: 'Live Multiplayer Quizzes',
    description:
      'Launch a room in seconds, let players join by PIN, and keep the energy moving with real-time scoring.',
    icon: 'bolt',
    accent: 'violet',
  },
  {
    title: 'AI Quiz Generator',
    description:
      'Turn a topic, prompt, or source into a full game draft with questions, answers, and difficulty tuning.',
    icon: 'spark',
    accent: 'fuchsia',
  },
  {
    title: 'Real-time Leaderboards',
    description:
      'Rank updates animate live so every answer feels like a race to the top.',
    icon: 'trophy',
    accent: 'amber',
  },
  {
    title: 'Classroom Mode',
    description:
      'Teacher-friendly controls for attendance, pacing, moderation, and end-of-class summaries.',
    icon: 'users',
    accent: 'cyan',
  },
  {
    title: 'Team Battles',
    description:
      'Split the room into squads, track momentum, and create comeback moments worth sharing.',
    icon: 'shield',
    accent: 'emerald',
  },
  {
    title: 'Analytics Dashboard',
    description:
      'See who struggled, which question spiked, and where to improve the next round.',
    icon: 'chart',
    accent: 'rose',
  },
]

const trendingQuizzes: Quiz[] = [
  {
    title: 'World Capitals Lightning Round',
    category: 'Geography',
    difficulty: 'Medium',
    players: '1.2K playing',
    theme: 'from-cyan-500 to-blue-500',
  },
  {
    title: 'Startup Trivia Night',
    category: 'Business',
    difficulty: 'Hard',
    players: '860 playing',
    theme: 'from-fuchsia-500 to-violet-500',
  },
  {
    title: '90s Music Speed Run',
    category: 'Music',
    difficulty: 'Easy',
    players: '2.4K playing',
    theme: 'from-amber-400 to-rose-500',
  },
  {
    title: 'Math Relay Arena',
    category: 'Classroom',
    difficulty: 'Medium',
    players: '540 playing',
    theme: 'from-emerald-400 to-cyan-500',
  },
]

const leaderboardPlayers: LeaderboardPlayer[] = [
  { name: 'Nova', score: 980, delta: 24, avatar: 'N' },
  { name: 'Jordan', score: 940, delta: 18, avatar: 'J' },
  { name: 'Ari', score: 912, delta: 12, avatar: 'A' },
  { name: 'Mina', score: 866, delta: 9, avatar: 'M' },
  { name: 'You', score: 842, delta: 33, avatar: 'Y' },
]

const timeline: TimelineStep[] = [
  {
    title: 'Create',
    copy: 'Start from scratch, generate with AI, or remix a trending quiz template.',
    icon: 'spark',
  },
  {
    title: 'Host',
    copy: 'Share the game code, launch the room, and watch the lobby come alive.',
    icon: 'pin',
  },
  {
    title: 'Compete',
    copy: 'Answer fast, climb the board, and unlock streaks, badges, and rematches.',
    icon: 'trophy',
  },
]

const recentWinners = ['Mina won the daily challenge', 'Nova streak: 8 games', 'Team Delta claimed a comeback']

const roomCards = [
  { code: 'B7N4', title: 'History Sprint', players: '128 joined', tone: 'violet' },
  { code: 'Q9X2', title: 'Team Brainwave', players: '64 joined', tone: 'cyan' },
  { code: 'K2L8', title: 'Lunch Break Trivia', players: '41 joined', tone: 'amber' },
]

const footerColumns = [
  {
    title: 'Product',
    links: ['Create Quiz', 'Join Game', 'Leaderboards', 'Analytics'],
  },
  {
    title: 'Solutions',
    links: ['Classroom Mode', 'Team Battles', 'Events', 'Community Play'],
  },
  {
    title: 'Resources',
    links: ['Help Center', 'Templates', 'Guides', 'Status'],
  },
  {
    title: 'Company',
    links: ['About', 'Careers', 'Contact', 'Privacy'],
  },
]

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [taglineIndex, setTaglineIndex] = useState(0)
  const [gameCode, setGameCode] = useState('')
  const [notice, setNotice] = useState<string | null>(null)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTaglineIndex((current) => (current + 1) % taglines.length)
    }, 3200)

    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!notice) return

    const timer = window.setTimeout(() => setNotice(null), 2800)
    return () => window.clearTimeout(timer)
  }, [notice])

  const handleLaunch = (message: string) => {
    setNotice(message)
    setMobileMenuOpen(false)
  }

  const handleJoin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const cleanCode = gameCode.trim().toUpperCase()
    if (!cleanCode) {
      setNotice('Enter a game code to join')
      return
    }

    handleLaunch(`Joining room ${cleanCode}`)
  }

  return (
    <div className="app-shell">
      <div className="app-background" aria-hidden="true">
        <span className="orb orb-one" />
        <span className="orb orb-two" />
        <span className="grid" />
      </div>

      <header className="navbar">
        <a className="brand" href="#home" aria-label="Buzzinga home">
          <span className="brand-mark">B</span>
          <span className="brand-copy">
            Buzzinga<span aria-hidden="true">!</span>
          </span>
        </a>

        <nav className="nav-links" aria-label="Primary navigation">
          <a href="#home">Home</a>
          <a href="#create">Create Quiz</a>
          <a href="#join">Join Quiz</a>
          <a href="#explore">Explore Quizzes</a>
          <a href="#leaderboards">Leaderboards</a>
        </nav>

        <div className="nav-actions">
          <details className="profile-menu">
            <summary>
              <span className="avatar avatar-small">U</span>
              Profile
            </summary>
            <div className="menu-panel">
              <a href="#">Dashboard</a>
              <a href="#">Achievements</a>
              <a href="#">Settings</a>
            </div>
          </details>
          <a className="ghost-button" href="#login">
            Log in
          </a>
          <button className="primary-button" type="button" onClick={() => handleLaunch('Sign up flow opened')}>
            Sign up
          </button>
        </div>

        <button
          className="icon-button mobile-toggle"
          type="button"
          aria-label="Open menu"
          onClick={() => setMobileMenuOpen((value) => !value)}
        >
          <Icon name={mobileMenuOpen ? 'close' : 'menu'} />
        </button>
      </header>

      {mobileMenuOpen ? (
        <div className="mobile-drawer" role="dialog" aria-modal="true" aria-label="Mobile navigation">
          <div className="mobile-drawer-header">
            <span className="brand-copy">Buzzinga!</span>
            <button className="icon-button" type="button" onClick={() => setMobileMenuOpen(false)}>
              <Icon name="close" />
            </button>
          </div>
          <a href="#home" onClick={() => setMobileMenuOpen(false)}>
            Home
          </a>
          <a href="#create" onClick={() => setMobileMenuOpen(false)}>
            Create Quiz
          </a>
          <a href="#join" onClick={() => setMobileMenuOpen(false)}>
            Join Quiz
          </a>
          <a href="#explore" onClick={() => setMobileMenuOpen(false)}>
            Explore Quizzes
          </a>
          <a href="#leaderboards" onClick={() => setMobileMenuOpen(false)}>
            Leaderboards
          </a>
          <div className="mobile-drawer-actions">
            <a className="ghost-button" href="#login">
              Log in
            </a>
            <button className="primary-button" type="button" onClick={() => handleLaunch('Sign up flow opened')}>
              Sign up
            </button>
          </div>
        </div>
      ) : null}

      <main id="home">
        <section className="hero-section" id="create">
          <div className="hero-copy">
            <div className="eyebrow-row">
              <span className="eyebrow">Live quiz platform</span>
              <span className="eyebrow eyebrow-glow">New rooms starting now</span>
            </div>

            <h1>
              Turn any moment into a live game.
              <span className="tagline-rotator" aria-live="polite">
                <span>{taglines[taglineIndex]}</span>
              </span>
            </h1>

            <p className="hero-copy-text">
              Buzzinga brings fast-paced quizzes, classroom control, team battles, and social competition into one
              home base. Create a room, share a code, and let the leaderboard do the talking.
            </p>

            <div className="hero-actions" id="join">
              <button className="primary-button primary-button-large" type="button" onClick={() => handleLaunch('Quiz builder opened')}>
                Start Creating
              </button>
              <button className="secondary-button secondary-button-large" type="button" onClick={() => handleLaunch('Quick join opened')}>
                Join Game
              </button>
            </div>

            <form className="join-form" onSubmit={handleJoin}>
              <label htmlFor="game-code">Join with game code</label>
              <div className="join-form-row">
                <span className="join-prefix">
                  <Icon name="pin" />
                </span>
                <input
                  id="game-code"
                  name="game-code"
                  value={gameCode}
                  onChange={(event) => setGameCode(event.target.value)}
                  placeholder="Enter PIN"
                  inputMode="text"
                  autoComplete="off"
                  aria-label="Game code"
                />
                <button className="primary-button" type="submit">
                  Join
                </button>
              </div>
            </form>

            <div className="trust-strip" aria-label="Trust badges">
              {trustBadges.map((badge) => (
                <span key={badge} className="trust-badge">
                  <Icon name="shield" />
                  {badge}
                </span>
              ))}
            </div>

            <div className="hero-stats">
              {heroStats.map((stat) => (
                <article key={stat.label} className="stat-pill">
                  <span>{stat.label}</span>
                  <strong>{stat.value}</strong>
                </article>
              ))}
            </div>
          </div>

          <div className="hero-visual" aria-label="Live game preview">
            <div className="floating-card floating-card-top">
              <span className="live-dot" />
              Daily challenge live
              <strong>Beat the class in 60 seconds</strong>
            </div>

            <div className="visual-stage">
              <div className="visual-orbit visual-orbit-one" />
              <div className="visual-orbit visual-orbit-two" />

              <article className="leaderboard-card glass-card" id="leaderboards">
                <div className="card-head">
                  <div>
                    <span className="card-kicker">Live leaderboard</span>
                    <h2>Final sprint</h2>
                  </div>
                  <div className="timer-badge">00:18</div>
                </div>

                <div className="leaderboard-list">
                  {leaderboardPlayers.map((player, index) => (
                    <div key={player.name} className={`leaderboard-row ${player.name === 'You' ? 'is-you' : ''}`}>
                      <span className="rank">{index + 1}</span>
                      <span className="avatar">{player.avatar}</span>
                      <div className="leaderboard-meta">
                        <strong>{player.name}</strong>
                        <span>{player.score} pts</span>
                      </div>
                      <span className="delta positive">+{player.delta}</span>
                    </div>
                  ))}
                </div>
              </article>

              <article className="hero-float hero-float-left glass-card">
                <span className="card-kicker">Players joined</span>
                <strong>128</strong>
                <span>Live now in History Sprint</span>
              </article>

              <article className="hero-float hero-float-right glass-card">
                <span className="card-kicker">Streak bonus</span>
                <strong>+250</strong>
                <span>Fast answer streak unlocked</span>
              </article>

              <div className="avatar-ring" aria-hidden="true">
                {['A', 'B', 'C', 'D', 'E', 'F'].map((letter) => (
                  <span key={letter} className="avatar avatar-ring-item">
                    {letter}
                  </span>
                ))}
              </div>
            </div>

            <div className="room-strip">
              {roomCards.map((room) => (
                <article key={room.code} className={`room-card tone-${room.tone}`}>
                  <span>{room.code}</span>
                  <strong>{room.title}</strong>
                  <p>{room.players}</p>
                </article>
              ))}
            </div>

            <div className="ticker glass-card">
              <span className="card-kicker">Recent winners</span>
              <div className="ticker-track">
                {recentWinners.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="social-proof-section">
          <div className="section-heading">
            <span className="eyebrow">Proof</span>
            <h2>Built for classrooms, communities, and competitive teams.</h2>
          </div>

          <div className="social-proof-grid">
            <div className="social-stats glass-card">
              {socialStats.map((stat) => (
                <article key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </article>
              ))}
            </div>

            <div className="testimonial-card glass-card">
              <p>
                “We use Buzzinga to turn review sessions into a race. Students want to win the next round, which
                means they actually keep playing.”
              </p>
              <div className="testimonial-meta">
                <span className="avatar">T</span>
                <div>
                  <strong>Priya, Teacher</strong>
                  <span>High school social studies</span>
                </div>
              </div>
            </div>

            <div className="logo-wall glass-card" aria-label="Community logos">
              <span>Northstar Academy</span>
              <span>Orbit Labs</span>
              <span>Trivia Club</span>
              <span>Team Nova</span>
            </div>
          </div>
        </section>

        <section className="feature-section" aria-labelledby="feature-grid-title">
          <div className="section-heading">
            <span className="eyebrow">Features</span>
            <h2 id="feature-grid-title">Everything the homepage needs to sell the game loop.</h2>
          </div>

          <div className="feature-grid">
            {features.map((feature) => (
              <article key={feature.title} className={`feature-card glass-card accent-${feature.accent}`}>
                <div className="feature-icon">
                  <Icon name={feature.icon} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <span className="feature-hover-note">Hover for live demo energy</span>
              </article>
            ))}
          </div>
        </section>

        <section className="timeline-section" aria-labelledby="how-it-works-title">
          <div className="section-heading">
            <span className="eyebrow">How it works</span>
            <h2 id="how-it-works-title">Create, host, and compete in one scroll.</h2>
          </div>

          <div className="timeline">
            <div className="timeline-track" aria-hidden="true" />
            {timeline.map((step, index) => (
              <article key={step.title} className="timeline-step glass-card">
                <span className="timeline-index">0{index + 1}</span>
                <div className="timeline-icon">
                  <Icon name={step.icon} />
                </div>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="extras-section" id="explore">
          <div className="extras-left">
            <div className="section-heading section-heading-tight">
              <span className="eyebrow">Discover</span>
              <h2>Trending quizzes with motion-first cards and quick join actions.</h2>
            </div>

            <div className="quiz-grid">
              {trendingQuizzes.map((quiz) => (
                <article key={quiz.title} className="quiz-card glass-card">
                  <div className={`quiz-cover ${quiz.theme}`}>
                    <span>{quiz.category}</span>
                    <strong>{quiz.difficulty}</strong>
                  </div>
                  <div className="quiz-body">
                    <h3>{quiz.title}</h3>
                    <p>{quiz.players}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="extras-right">
            <article className="leaderboard-preview glass-card">
              <div className="card-head">
                <div>
                  <span className="card-kicker">Live room</span>
                  <h2>Buzzinga Cup</h2>
                </div>
                <span className="timer-badge success">95% accuracy</span>
              </div>
              <div className="leaderboard-list compact">
                {leaderboardPlayers.slice(0, 4).map((player, index) => (
                  <div key={player.name} className={`leaderboard-row ${player.name === 'You' ? 'is-you' : ''}`}>
                    <span className="rank">{index + 1}</span>
                    <span className="avatar">{player.avatar}</span>
                    <div className="leaderboard-meta">
                      <strong>{player.name}</strong>
                      <span>{player.score} pts</span>
                    </div>
                    <span className="delta positive">+{player.delta}</span>
                  </div>
                ))}
              </div>
            </article>

            <article className="mini-stack">
              <div className="daily-challenge glass-card">
                <span className="card-kicker">Daily challenge</span>
                <strong>Answer 10 in a row</strong>
                <p>Unlock a badge and trigger confetti when you win.</p>
              </div>
              <div className="join-pin-card glass-card">
                <span className="card-kicker">Floating PIN widget</span>
                <strong>Join with code</strong>
                <div className="pin-chips">
                  <span>8F2A</span>
                  <span>Q1LM</span>
                  <span>R9VN</span>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="cta-section">
          <div className="cta-card glass-card">
            <span className="eyebrow">Ready</span>
            <h2>Ship your first game in minutes.</h2>
            <p>
              Buzzinga is the fast path from idea to live competition. Create the quiz, share the PIN, and let the
              room take over.
            </p>
            <div className="hero-actions">
              <button className="primary-button primary-button-large" type="button" onClick={() => handleLaunch('Create quiz flow opened')}>
                Create Quiz Free
              </button>
              <button className="secondary-button secondary-button-large" type="button" onClick={() => handleLaunch('Join quiz flow opened')}>
                Join a Live Game
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-brand">
          <div className="brand">
            <span className="brand-mark">B</span>
            <span className="brand-copy">Buzzinga!</span>
          </div>
          <p>Competitive quizzes with classroom-grade clarity and game-night energy.</p>
        </div>

        <div className="footer-columns">
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3>{column.title}</h3>
              {column.links.map((link) => (
                <a key={link} href="#">
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>
      </footer>

      <div className={`notice-bar ${notice ? 'is-visible' : ''}`} role="status" aria-live="polite">
        {notice}
      </div>
    </div>
  )
}

function Icon({ name }: { name: IconName }) {
  switch (name) {
    case 'spark':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8L12 2Zm7 10 1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3Z" />
        </svg>
      )
    case 'play':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8 5v14l11-7L8 5Z" />
        </svg>
      )
    case 'trophy':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 4h10v3h3v2c0 3.3-2.2 6-5 6-.6 0-1.2-.1-1.8-.3A4 4 0 0 1 13 17v2h3v2H8v-2h3v-2a4 4 0 0 1-.2-2.3C10.2 15.9 9.6 16 9 16c-2.8 0-5-2.7-5-6V7h3V4Zm0 3H6v1c0 2 1.1 4 3 4 .7 0 1.1-.1 1.6-.3A8.9 8.9 0 0 1 7 7Zm10 0a8.9 8.9 0 0 1-3.6 4.7c.5.2.9.3 1.6.3 1.9 0 3-2 3-4V7h-1Z" />
        </svg>
      )
    case 'chart':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 19V5h2v12h12v2H5Zm4-3V9h2v7H9Zm4 0V7h2v9h-2Zm4 0v-5h2v5h-2Z" />
        </svg>
      )
    case 'users':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm6 0a3 3 0 1 0-3-3 3 3 0 0 0 3 3ZM3 20v-1c0-2.8 2.7-5 6-5s6 2.2 6 5v1H3Zm12 0v-1c0-1.1-.3-2.2-.9-3.1 1.2-.1 2.4.1 3.4.7 1.1.6 1.8 1.6 1.8 2.9v.5h-4.3Z" />
        </svg>
      )
    case 'pin':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2a6 6 0 0 0-6 6c0 4.2 6 14 6 14s6-9.8 6-14a6 6 0 0 0-6-6Zm0 8.5A2.5 2.5 0 1 1 12 5a2.5 2.5 0 0 1 0 5.5Z" />
        </svg>
      )
    case 'search':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m15.5 14 4.5 4.5-1.5 1.5L14 15.5a7 7 0 1 1 1.5-1.5ZM10 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" />
        </svg>
      )
    case 'shield':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2 5 5v6c0 5 3.2 8.7 7 11 3.8-2.3 7-6 7-11V5l-7-3Zm-1 12-3-3 1.4-1.4L11 11.2l3.6-3.6L16 9l-5 5Z" />
        </svg>
      )
    case 'bolt':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M13 2 4 14h6l-1 8 9-12H12l1-8Z" />
        </svg>
      )
    case 'gift':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20 7h-2.2A3 3 0 0 0 13 3.8L12 5l-1-1.2A3 3 0 0 0 6.2 7H4v4h8V7h2v4h8V7Zm-10 6H4v8h6v-8Zm2 0v8h8v-8h-8Z" />
        </svg>
      )
    case 'menu':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 7h16v2H4V7Zm0 8h16v2H4v-2Zm0-4h16v2H4v-2Z" />
        </svg>
      )
    case 'close':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 5.6 5.6 6 11.6 12l-6 6 .4.4L12 12.4l6 6 .4-.4-6-6 6-6-.4-.4-6 6-6-6Z" />
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2 4 7v10l8 5 8-5V7l-8-5Z" />
        </svg>
      )
  }
}

export default App
