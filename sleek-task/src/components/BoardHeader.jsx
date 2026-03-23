import React, { useState, useRef } from 'react';
import ThemeToggle from './ThemeToggle';
import SearchBar from './SearchBar';
import { IconSettings, IconRefresh, IconMenu } from './Icons';
import '../styles/layout.css';

export default function BoardHeader({
  title, onTitleChange,
  theme, onThemeToggle,
  searchQuery, onSearchChange,
  priorityFilter, onPriorityFilter,
  assigneeFilter, onAssigneeFilter,
  assignees,
  onReset,
  onMenuToggle,
}) {
  const [editing, setEditing]   = useState(false);
  const [draft, setDraft]       = useState(title);
  const [menuOpen, setMenuOpen] = useState(false);
  const inputRef = useRef(null);
  const menuRef  = useRef(null);

  const startEdit = () => {
    setDraft(title);
    setEditing(true);
    setTimeout(() => inputRef.current?.select(), 0);
  };

  const commitEdit = () => {
    if (draft.trim()) onTitleChange(draft.trim());
    setEditing(false);
  };

  return (
    <header className="topbar">
      {/* Hamburger — mobile only */}
      <button className="topbar-menu-btn" onClick={onMenuToggle} aria-label="Open menu">
        <IconMenu size={16} />
      </button>

      {/* Title */}
      <div className="topbar-title-wrap">
        {editing ? (
          <input
            ref={inputRef}
            className="topbar-title-input"
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onBlur={commitEdit}
            onKeyDown={e => {
              if (e.key === 'Enter') commitEdit();
              if (e.key === 'Escape') setEditing(false);
            }}
          />
        ) : (
          <span className="topbar-title" onDoubleClick={startEdit} title="Double-click to rename">
            {title}
          </span>
        )}
      </div>

      <div className="topbar-divider" />

      {/* Search */}
      <SearchBar
        query={searchQuery}
        onQueryChange={onSearchChange}
        priorityFilter={priorityFilter}
        onPriorityFilter={onPriorityFilter}
        assigneeFilter={assigneeFilter}
        onAssigneeFilter={onAssigneeFilter}
        assignees={assignees}
      />

      {/* Right controls */}
      <div className="topbar-right">
        <ThemeToggle theme={theme} onToggle={onThemeToggle} />

        {/* Settings */}
        <div style={{ position: 'relative' }} ref={menuRef}>
          <button
            className={`icon-btn ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            title="Settings"
          >
            <IconSettings size={15} />
          </button>
          {menuOpen && (
            <div style={{
              position: 'absolute', top: 'calc(100% + 6px)', right: 0,
              background: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              boxShadow: 'var(--shadow-md)',
              zIndex: 100, minWidth: 180, padding: 4,
              animation: 'scaleIn 0.12s ease',
              transformOrigin: 'top right',
            }}>
              <button
                onClick={() => { onReset(); setMenuOpen(false); }}
                style={{
                  width: '100%', padding: '8px 12px', textAlign: 'left',
                  fontSize: 13, color: 'var(--text-primary)',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex', alignItems: 'center', gap: 8,
                  transition: 'background 0.1s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-surface-2)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <IconRefresh size={13} /> Reset to demo
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
