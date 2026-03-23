import React, { useState, useEffect, useRef } from 'react';
import { IconX } from './Icons';

export default function AddTaskForm({ onAdd, onCancel }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const inputRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onCancel(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onCancel]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ title: title.trim(), priority });
    setTitle('');
  };

  const PRIOS = [
    { value: 'high',   color: '#E8185A' },
    { value: 'medium', color: '#D97706' },
    { value: 'low',    color: '#16A34A' },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--accent)',
        borderRadius: 'var(--radius)',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        animation: 'cardEnter 0.2s cubic-bezier(0.34,1.56,0.64,1)',
        boxShadow: '0 0 0 3px var(--accent-light)',
      }}
    >
      <textarea
        ref={inputRef}
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Task title..."
        rows={2}
        style={{
          background: 'transparent',
          border: 'none',
          outline: 'none',
          resize: 'none',
          fontSize: 13,
          fontWeight: 500,
          color: 'var(--text-primary)',
          lineHeight: 1.45,
          width: '100%',
        }}
        onKeyDown={e => {
          if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(e); }
        }}
      />

      {/* Priority quick-pick */}
      <div style={{ display: 'flex', gap: 4 }}>
        {PRIOS.map(p => (
          <button
            key={p.value}
            type="button"
            onClick={() => setPriority(p.value)}
            style={{
              flex: 1,
              padding: '4px 0',
              borderRadius: 'var(--radius-sm)',
              fontSize: 10,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              border: `1px solid ${priority === p.value ? p.color : 'var(--border)'}`,
              background: priority === p.value ? p.color + '22' : 'transparent',
              color: priority === p.value ? p.color : 'var(--text-muted)',
              transition: 'all 0.12s',
            }}
          >
            {p.value}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 6 }}>
        <button
          type="submit"
          style={{
            flex: 1,
            padding: '7px 12px',
            background: 'var(--accent)',
            color: 'var(--text-on-accent)',
            borderRadius: 'var(--radius)',
            fontSize: 12,
            fontWeight: 600,
            transition: 'background 0.15s, transform 0.12s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--accent-hover)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--accent)'}
        >
          Add card
        </button>
        <button
          type="button"
          onClick={onCancel}
          style={{
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg-surface-2)',
            color: 'var(--text-muted)',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--border)',
          }}
        >
          <IconX size={13} />
        </button>
      </div>
    </form>
  );
}
