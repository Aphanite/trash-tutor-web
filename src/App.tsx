function App() {
  return (
    <div
      style={{
        minHeight: '100dvh',
        background: 'var(--dark-green)',
        color: 'var(--white)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 'var(--spacing-xl)',
        gap: 'var(--spacing-l)',
      }}
    >
      <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--light-green)' }}>
        Trash Tutor
      </h1>
      <p style={{ fontSize: '1.2rem', maxWidth: '400px', lineHeight: 1.6 }}>
        We're currently building <strong>Trash Tutor 2.0</strong> — a smarter, faster recycling guide.
      </p>
      <p style={{ color: 'var(--light-green)', fontSize: '0.95rem' }}>
        Check back soon!
      </p>
    </div>
  )
}

export default App
