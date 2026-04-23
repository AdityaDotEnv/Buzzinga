import { ScrollReveal } from '../../../components/ui/ScrollReveal'
import { leaderboardPlayers, trendingQuizzes } from '../content'

export function ExploreSection() {
  return (
    <section className="extras-section" id="explore">
      <div className="extras-left">
        <ScrollReveal variant="title">
          <div className="section-heading section-heading-tight">
            <span className="eyebrow">Discover</span>
            <h2>Trending quizzes with motion-first cards and quick join actions.</h2>
          </div>
        </ScrollReveal>

        <div className="quiz-grid">
          {trendingQuizzes.map((quiz, index) => (
            <ScrollReveal key={quiz.title} variant="card" delay={index * 0.05}>
              <article className="quiz-card glass-card">
                <div className={`quiz-cover ${quiz.theme}`}>
                  <span>{quiz.category}</span>
                  <strong>{quiz.difficulty}</strong>
                </div>
                <div className="quiz-body">
                  <h3>{quiz.title}</h3>
                  <p>{quiz.players}</p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <div className="extras-right">
        <ScrollReveal variant="card">
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
        </ScrollReveal>

        <ScrollReveal variant="card">
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
        </ScrollReveal>
      </div>
    </section>
  )
}
