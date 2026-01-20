import React from 'react';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const StudentDashboard: React.FC = () => {
  const handleReportClick = () => {
    window.location.href = '/report';
  };

  interface Issue {
    _id: string;
    title: string;
    status: string;
    createdAt: string;
    priority: string;
  }

  const [issues, setIssues] = React.useState<Issue[]>([]);
  const [loading, setLoading] = React.useState(true);


  React.useEffect(() => {
    const fetchMyIssues = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/issues/my-issues`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setIssues(data);
        }
      } catch (error) {
        console.error('Failed to fetch issues:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyIssues();
  }, []);

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      backgroundColor: '#000000',
      minHeight: '100vh',
      width: '100%',
      margin: '0',
      padding: '60px 20px',
      color: '#f8fafc',
    },
    contentWrapper: {
      maxWidth: '800px',
      margin: '0 auto',
    },
    header: {
      marginBottom: '48px',
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: '800',
      marginBottom: '12px',
      letterSpacing: '-0.025em',
      color: '#ffffff',
    },
    welcomeText: {
      fontSize: '1.125rem',
      color: '#94a3b8',
      margin: 0,
    },
    actionCard: {
      backgroundColor: '#1e293b',
      borderRadius: '16px',
      padding: '32px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
      border: '1px solid #334155',
      marginBottom: '48px',
    },
    button: {
      backgroundColor: '#3b82f6',
      color: '#ffffff',
      padding: '14px 28px',
      borderRadius: '10px',
      fontSize: '1rem',
      fontWeight: '600',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.3)',
      outline: 'none',
    },
    section: {
      marginTop: '24px',
    },
    sectionTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      marginBottom: '20px',
      color: '#e2e8f0',
    },
    placeholderBox: {
      padding: '60px 40px',
      textAlign: 'center',
      backgroundColor: '#1e293b',
      borderRadius: '12px',
      border: '2px dashed #334155',
    },
    placeholderText: {
      color: '#64748b',
      fontSize: '1rem',
      maxWidth: '400px',
      margin: '0 auto',
      lineHeight: '1.6',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        <header style={styles.header}>
          <h1 style={styles.title}>Student Dashboard</h1>
          <p style={styles.welcomeText}>Welcome back to your portal. View your progress or get help with any academic issues.</p>
        </header>

        <div style={styles.actionCard}>
          <button
            style={styles.button}
            onClick={handleReportClick}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#2563eb';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(59, 130, 246, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#3b82f6';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(59, 130, 246, 0.3)';
            }}
          >
            Report an Issue
          </button>
        </div>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>My Reported Issues</h2>
          <div style={styles.placeholderBox}>
            {loading ? (
              <p style={styles.placeholderText}>Loading your issues...</p>
            ) : issues.length > 0 ? (
              <div style={{ display: 'grid', gap: '16px' }}>
                {issues.map((issue) => (
                  <div key={issue._id} style={{
                    backgroundColor: '#0f172a',
                    padding: '20px',
                    borderRadius: '8px',
                    textAlign: 'left',
                    border: '1px solid #334155'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#f1f5f9' }}>{issue.title}</h3>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '0.875rem',
                        backgroundColor: issue.status === 'solved' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(59, 130, 246, 0.2)',
                        color: issue.status === 'solved' ? '#34d399' : '#60a5fa'
                      }}>
                        {issue.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.875rem' }}>
                      Reported on {new Date(issue.createdAt).toLocaleDateString()} • {issue.priority.toUpperCase()} Priority
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p style={styles.placeholderText}>
                You haven't reported any issues yet. When you submit a report, you'll be able to track its status and updates right here.
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default StudentDashboard;