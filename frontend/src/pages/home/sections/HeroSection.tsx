import type { FormEvent } from 'react'
import { Icon } from '../../../components/ui/Icon'
import { ScrollReveal } from '../../../components/ui/ScrollReveal'
import { heroStats, recentWinners, roomCards, trustBadges, leaderboardPlayers } from '../content'

type HeroSectionProps = {
  tagline: string
  gameCode: string
  onGameCodeChange: (value: string) => void
  onJoin: (event: FormEvent<HTMLFormElement>) => void
  onLaunch: (message: string) => void
  onOpenCreateQuiz: () => void
}

export function HeroSection({
  tagline,
  gameCode,
  onGameCodeChange,
  onJoin,
  onLaunch,
  onOpenCreateQuiz,
}: HeroSectionProps) {
  return (
    <section className="hero-section" id="create">
      <div className="hero-copy">
        <ScrollReveal variant="title">
          <div className="eyebrow-row">
            <span className="eyebrow">Live quiz platform</span>
            <span className="eyebrow eyebrow-glow">New rooms starting now</span>
          </div>

          <h1>
            Turn any moment into a live game.
            <span className="tagline-rotator" aria-live="polite">
              <span>{tagline}</span>
            </span>
          </h1>
        </ScrollReveal>

        <ScrollReveal variant="body">
          <p className="hero-copy-text">
            Buzzinga brings fast-paced quizzes, classroom control, team battles, and social competition into one home
            base. Create a room, share a code, and let the leaderboard do the talking.
          </p>
        </ScrollReveal>

        <ScrollReveal variant="body">
          <div className="hero-actions" id="join">
            <button className="primary-button primary-button-large" type="button" onClick={onOpenCreateQuiz}>
              Start Creating
            </button>
            <button className="secondary-button secondary-button-large" type="button" onClick={() => onLaunch('Quick join opened')}>
              Join Game
            </button>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="body">
          <form className="join-form" onSubmit={onJoin}>
            <label htmlFor="game-code">Join with game code</label>
            <div className="join-form-row">
              <span className="join-prefix">
                <Icon name="pin" />
              </span>
              <input
                id="game-code"
                name="game-code"
                value={gameCode}
                onChange={(event) => onGameCodeChange(event.target.value)}
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
        </ScrollReveal>

        <ScrollReveal variant="card">
          <div className="trust-strip" aria-label="Trust badges">
            {trustBadges.map((badge) => (
              <span key={badge} className="trust-badge">
                <Icon name="shield" />
                {badge}
              </span>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal variant="card">
          <div className="hero-stats">
            {heroStats.map((stat) => (
              <article key={stat.label} className="stat-pill">
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
              </article>
            ))}
          </div>
        </ScrollReveal>
      </div>

      <div className="hero-visual" aria-label="Live game preview">
        <ScrollReveal variant="title">
          <div className="floating-card floating-card-top">
            <span className="live-dot" />
            Daily challenge live
            <strong>Beat the class in 60 seconds</strong>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="card">
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
        </ScrollReveal>

        <ScrollReveal variant="card">
          <div className="room-strip">
            {roomCards.map((room) => (
              <article key={room.code} className={`room-card tone-${room.tone}`}>
                <span>{room.code}</span>
                <strong>{room.title}</strong>
                <p>{room.players}</p>
              </article>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal variant="card">
          <div className="ticker glass-card">
            <span className="card-kicker">Recent winners</span>
            <div className="ticker-track">
              {recentWinners.map((item) => (
                <span key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
