import React from 'react';
import { IconLayout, IconInbox, IconBarChart, IconStar, IconCheckCircle, IconAlertCircle, IconClock } from './Icons';
import '../styles/layout.css';

export default function Sidebar({ board, activeView, onViewChange }) {
  const tasks      = Object.values(board.tasks);
  const total      = tasks.length;
  const done       = Object.values(board.columns).find(c => c.title === 'Done')?.taskIds.length || 0;
  const inProgress = Object.values(board.columns).find(c => c.title === 'In Progress')?.taskIds.length || 0;
  const overdue    = tasks.filter(t => {
    if (!t.dueDate) return false;
    return new Date(t.dueDate + 'T23:59:59') < new Date();
  }).length;
  const high       = tasks.filter(t => t.priority === 'high').length;

  const NAV = [
    { id: 'board',    label: 'Board',       icon: <IconLayout size={14} />,       badge: null },
    { id: 'inbox',    label: 'My Tasks',    icon: <IconInbox size={14} />,        badge: inProgress || null },
    { id: 'starred',  label: 'Starred',     icon: <IconStar size={14} />,         badge: null },
    { id: 'reports',  label: 'Reports',     icon: <IconBarChart size={14} />,     badge: null },
  ];

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-mark">S</div>
        <div className="sidebar-logo-text">
          <span className="sidebar-logo-name">Sleek Task</span>
          <span className="sidebar-logo-tagline">Tasks, beautifully managed.</span>
        </div>
      </div>

      {/* Nav */}
      <div className="sidebar-section">
        <div className="sidebar-section-label">Workspace</div>
        {NAV.map(item => (
          <button
            key={item.id}
            className={`sidebar-nav-item ${activeView === item.id ? 'active' : ''}`}
            onClick={() => onViewChange(item.id)}
          >
            {item.icon}
            {item.label}
            {item.badge && <span className="nav-badge">{item.badge}</span>}
          </button>
        ))}
      </div>

      {/* Quick stats */}
      <div className="sidebar-section" style={{ marginTop: 8 }}>
        <div className="sidebar-section-label">Overview</div>

        <div style={{ padding: '4px 0' }}>
          {[
            { label: 'Total tasks',   value: total,      icon: <IconLayout size={11} />,       color: 'var(--text-secondary)' },
            { label: 'Completed',     value: done,       icon: <IconCheckCircle size={11} />,  color: 'var(--priority-low)' },
            { label: 'In progress',   value: inProgress, icon: <IconClock size={11} />,        color: 'var(--priority-med)' },
            { label: 'Overdue',       value: overdue,    icon: <IconAlertCircle size={11} />,  color: 'var(--priority-high)' },
            { label: 'High priority', value: high,       icon: <IconStar size={11} />,         color: 'var(--accent)' },
          ].map(s => (
            <div key={s.label} className="sidebar-stat-row">
              <span className="sidebar-stat-label" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ color: s.color }}>{s.icon}</span>
                {s.label}
              </span>
              <span className="sidebar-stat-value" style={{ color: s.value > 0 && s.label === 'Overdue' ? 'var(--priority-high)' : undefined }}>
                {s.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Progress */}
      <div style={{ padding: '8px 12px', marginTop: 4 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
          <span style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Completion
          </span>
          <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-primary)' }}>
            {total > 0 ? Math.round((done / total) * 100) : 0}%
          </span>
        </div>
        <div style={{ height: 4, background: 'var(--border)', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${total > 0 ? (done / total) * 100 : 0}%`,
            background: 'var(--accent)',
            borderRadius: 2,
            transition: 'width 0.8s cubic-bezier(0.4,0,0.2,1)',
          }} />
        </div>
      </div>
    </aside>
  );
}
