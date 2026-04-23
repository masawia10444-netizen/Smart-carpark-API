import React, { useState } from 'react';
import './index.css';

const API_GROUPS = [
  {
    title: 'Getting Started',
    links: ['Introduction', 'Authentication', 'Errors']
  },
  {
    title: 'Core Services',
    links: ['Dashboard', 'Overview', 'Transactions', 'Payments']
  },
  {
    title: 'Administration',
    links: ['Users', 'Pricing', 'Devices', 'System Settings']
  }
];

const ENDPOINTS = {
  Auth: [
    { method: 'POST', url: '/api/v1/auth/login', title: 'User Login', desc: 'Authenticate user and receive access tokens.' },
    { method: 'POST', url: '/api/v1/auth/refresh', title: 'Refresh Token', desc: 'Request a new access token using a refresh token.' }
  ],
  Dashboard: [
    { method: 'GET', url: '/api/v1/dashboard', title: 'Daily Summary', desc: 'Real-time overview of today\'s car park activity.' }
  ],
  Transactions: [
    { method: 'GET', url: '/api/v1/transactions', title: 'List Transactions', desc: 'Retrieve a paginated list of all parking records.' },
    { method: 'POST', url: '/api/v1/transactions/:id/payment', title: 'Process Payment', desc: 'Confirm payment for a specific transaction.' }
  ]
};

function App() {
  const [activeTab, setActiveTab] = useState('Introduction');

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo-area">
          <div className="logo-icon"></div>
          <div className="logo-text">Carpark Ops</div>
        </div>

        {API_GROUPS.map((group, idx) => (
          <div key={idx} className="nav-section">
            <h3 className="nav-title">{group.title}</h3>
            {group.links.map(link => (
              <a 
                key={link} 
                href={`#${link}`} 
                className={`nav-link ${activeTab === link ? 'active' : ''}`}
                onClick={() => setActiveTab(link)}
              >
                {link}
              </a>
            ))}
          </div>
        ))}
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="fade-in">
          <h1>API Reference</h1>
          <p className="description">
            Welcome to the Smart Carpark API documentation. This guide provides all the technical details needed to integrate with our parking management system.
          </p>
        </header>

        <section id="Endpoints" className="fade-in">
          <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Core Endpoints</h2>
          
          {Object.entries(ENDPOINTS).map(([group, endpoints]) => (
            <div key={group} style={{ marginBottom: '4rem' }}>
              <h3 style={{ marginBottom: '1.5rem', color: 'var(--accent-color)' }}>{group}</h3>
              {endpoints.map((ep, i) => (
                <div key={i} className="api-card">
                  <span className={`method-tag method-${ep.method.toLowerCase()}`}>{ep.method}</span>
                  <span className="api-url">{ep.url}</span>
                  <h4 className="card-title">{ep.title}</h4>
                  <p className="card-desc">{ep.desc}</p>
                  
                  <div className="code-block">
                    <div className="code-header">
                      <span>Request Example (JSON)</span>
                      <button className="copy-btn">Copy</button>
                    </div>
                    <pre style={{ color: '#ecf0f1' }}>
{`curl -X ${ep.method} http://localhost:8080${ep.url} \\
  -H "Authorization: Bearer <TOKEN>" \\
  -H "Content-Type: application/json"`}
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </section>

        <footer style={{ marginTop: '6rem', padding: '2rem 0', borderTop: '1px solid var(--border-color)', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          &copy; 2026 Smart Carpark Pro System. All rights reserved.
        </footer>
      </main>
    </div>
  );
}

export default App;
