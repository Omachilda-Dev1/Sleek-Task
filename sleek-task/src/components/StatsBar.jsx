import React from 'react';
import { IconLayout, IconAlertCircle, IconCheckCircle, IconTrendingUp } from './Icons';
import '../styles/layout.css';

export default function StatsBar({ board }) {
  const tasks      = Object.values(board.tasks);
  const total      = tasks.length;
  const doneCol    = Object.values(board.columns).find(c => c.title === 'Done');
  const done       = doneCol?.taskIds.length || 0;
  const overdue    = tasks.filter(t => t.dueDate && new Date(t.dueDate + 'T23:59:59') < new Date()).length;
  const inProgress = Object.values(board.columns).find(c => c.title === 'In Progress')?.taskIds.length || 0;
  const pct        = total > 0 ? Math.round((done / total) * 100) : 0;

  const STATS = [
    { label: 'Total Tasks',   value: total,      icon: <IconLayout size={14} />,       cls: 'grey' },
    { label: 'In Progress',   value: inProgress, icon: <IconTrendingUp size={14} />,   cls: 'amber' },
    { label: 'Completed',     value: done,        icon: <IconCheckCircle size={14} />, cls: 'green' },
    { label: 'Overdue',       value: overdue,     icon: <IconAlertCircle size={14} />, cls: 'pink' },
  ];

  return (
    <div className="stats-bar">
      {STATS.map((s, i) => (
        <div key={s.label} className="stat-item" style={{ animationDelay: `${i * 0.06}s` }}>
          <div className={`stat-icon ${s.cls}`}>{s.icon}</div>
          <div className="stat-info">
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        </div>
      ))}

      {/* Completion progress */}
      <div className="stat-item" style={{ gap: 10, animationDelay: '0.24s' }}>
        <div className="stat-info" style={{ minWidth: 32 }}>
          <span className="stat-value">{pct}%</span>
          <span className="stat-label">Done</span>
        </div>
        <div style={{ width: 80, height: 4, background: 'var(--border)', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${pct}%`,
            background: 'var(--accent)',
            borderRadius: 2,
            transition: 'width 1s cubic-bezier(0.4,0,0.2,1)',
            animation: 'progressFill 1s cubic-bezier(0.4,0,0.2,1) both',
            '--progress-target': `${pct}%`,
          }} />
        </div>
      </div>
    </div>
  );
}
