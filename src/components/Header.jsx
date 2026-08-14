export default function Header({ theme, onToggleTheme }) {
  return (
    <header className="topbar">
      <div className="wrap topbar-inner">
        <h1>
          <span className="leaf">🍁</span> 메이플랜드 캐시템 메소 환산기
        </h1>
        <button
          type="button"
          className="ghost-btn"
          onClick={onToggleTheme}
          aria-label={theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
}
