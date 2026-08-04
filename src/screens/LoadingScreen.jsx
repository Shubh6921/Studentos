import React from 'react';

const LoadingScreen = () => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.spinner}></div>
        <h1 style={styles.title}>StudentOS</h1>
        <p style={styles.subtitle}>Setting up your digital space...</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vw',
    height: '100vh',
    backgroundColor: 'var(--bg-primary)',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-sans)',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '2px solid var(--border-color)',
    borderTop: '2px solid var(--text-primary)',
    borderRadius: '50%',
    animation: 'spin 1s cubic-bezier(0.16, 1, 0.3, 1) infinite',
    marginBottom: '24px',
  },
  title: {
    fontSize: '24px',
    fontWeight: '600',
    letterSpacing: '-0.02em',
    margin: '0 0 8px 0',
  },
  subtitle: {
    fontSize: '14px',
    color: 'var(--text-secondary)',
    margin: 0,
  },
};

// We will inject keyframes if not defined in main.css
// But wait, standard CSS animations might not run from inline styles for keyframes.
// We can add a simple `<style>` tag to the loading screen to define keyframes!
const LoadingScreenWithStyles = () => {
  return (
    <>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <LoadingScreen />
    </>
  );
};

export default LoadingScreenWithStyles;
