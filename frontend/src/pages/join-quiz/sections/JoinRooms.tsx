import { roomPreviews } from '../content'

export function JoinRooms() {
  return (
    <section className="join-rooms" aria-labelledby="join-rooms-title">
      <div className="section-heading section-heading-tight">
        <span className="eyebrow">Rooms</span>
        <h2 id="join-rooms-title">Live rooms waiting for players.</h2>
      </div>

      <div className="join-room-grid">
        {roomPreviews.map((room) => (
          <article key={room.code} className="join-room-card glass-card">
            <div className={`join-room-banner ${room.tone}`}>
              <span>{room.code}</span>
              <strong>{room.title}</strong>
            </div>
            <div className="join-room-body">
              <p>{room.players}</p>
              <a href="#">Open lobby</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
