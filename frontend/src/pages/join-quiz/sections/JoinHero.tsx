import type { FormEvent } from 'react'
import { Icon } from '../../../components/ui/Icon'
import { ScrollReveal } from '../../../components/ui/ScrollReveal'
import type { JoinHeroMessage } from '../types'

type JoinHeroProps = {
  message: JoinHeroMessage
  roomCode: string
  playerName: string
  onRoomCodeChange: (value: string) => void
  onPlayerNameChange: (value: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export function JoinHero({
  message,
  roomCode,
  playerName,
  onRoomCodeChange,
  onPlayerNameChange,
  onSubmit,
}: JoinHeroProps) {
  return (
    <section className="join-hero" aria-labelledby="join-hero-title">
      <div className="join-hero-copy">
        <ScrollReveal variant="title">
          <span className="eyebrow">Join quiz</span>
          <h1 id="join-hero-title">{message.title}</h1>
        </ScrollReveal>

        <ScrollReveal variant="body">
          <p className="join-hero-copy-text">{message.copy}</p>
        </ScrollReveal>

        <ScrollReveal variant="card">
          <form className="join-code-panel glass-card" onSubmit={onSubmit}>
            <div className="join-code-panel-head">
              <span className="card-kicker">Room code</span>
              <span className="timer-badge success">Live join</span>
            </div>

            <label className="join-code-label" htmlFor="room-code">
              Enter the code from the host screen
            </label>
            <div className="join-code-field">
              <span className="join-code-icon">
                <Icon name="pin" />
              </span>
              <input
                id="room-code"
                name="room-code"
                value={roomCode}
                onChange={(event) => onRoomCodeChange(event.target.value.toUpperCase())}
                placeholder="Enter room code"
                autoComplete="off"
                inputMode="text"
                autoCapitalize="characters"
                maxLength={8}
                aria-label="Room code"
              />
            </div>

            <label className="join-name-label" htmlFor="player-name">
              Display name
            </label>
            <input
              id="player-name"
              name="player-name"
              value={playerName}
              onChange={(event) => onPlayerNameChange(event.target.value)}
              placeholder="Your name"
              autoComplete="nickname"
              aria-label="Display name"
              className="join-name-input"
            />

            <button className="primary-button primary-button-large" type="submit">
              Join game
            </button>
          </form>
        </ScrollReveal>
      </div>

      <ScrollReveal variant="card">
        <div className="join-hero-visual glass-card">
          <div className="join-hero-visual-top">
            <span className="eyebrow eyebrow-glow">Now joining</span>
            <strong>Room ready for your tap.</strong>
          </div>

          <div className="join-hero-emblem" aria-hidden="true">
            <Icon name="spark" />
          </div>

          <div className="join-preview-card">
            <span className="card-kicker">Featured room</span>
            <strong>Buzzinga Cup</strong>
            <p>Watch the lobby animate as the room fills.</p>
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
