function Header() {
  return (
    <div className="header">
      <div className="app-logo">
        <img src="/logo7.png" alt="MegaBridge" />
      </div>
      <div className="user-area">
        <button className="notif-btn" aria-label="Notifications">🔔</button>
        <div className="user-pill">
          <div className="user-avatar">J</div>
          <span className="user-name">Josh</span>
          <span className="chevron-down">▾</span>
        </div>
      </div>
    </div>
  )
}

export default Header
