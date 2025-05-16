import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div style={styles.wrapper}>
      <header style={styles.header}>
        <h1 style={{ margin: 0 }}>Сайт про Ягуарів</h1>
      </header>

      <main style={styles.main}>
        <Outlet /> {/* Виводяться Home, Morphology, Nutrition тощо */}
      </main>

      <footer style={styles.footer}>
        <p style={{ margin: 0 }}>© 2025 Jaguar Info</p>
      </footer>
    </div>
  );
}

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  header: {
    height: '60px',
    background: '#e0ffe0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  main: {
    flex: 1,
    overflowY: 'auto',
    background: '#fff',
  },
  footer: {
    height: '50px',
    background: '#d0f0d0',
    textAlign: 'center',
    lineHeight: '50px',
    flexShrink: 0,
  },
};

export default App;