import React, { useState, useEffect } from 'react';
import { IconX, IconTrash, IconFlag, IconCalendar, IconUser, IconTag, IconAlertCircle } from './Icons';
import { getAvatarColor } from '../utils/avatar';
import { formatCardId } from '../utils/id';
import { isOverdue } from '../utils/date';
import '../styles/drawer.css';

const FAKE_ACTIVITY = [
  { user: 'CO', text: 'changed priority to High',    time: '2h ago' },
  { user: 'AK', text: 'added a comment',             time: '5h ago' },
  { user: 'MJ', text: 'moved to In Progress',        time: '1d ago' },
  { user: 'ST', text: 'created this task',           time: '3d ago' },
];

export default function TaskDrawer({ task, onClose, onUpdate, onDelete }) {
  const [form, setForm]               = useState({ ...task });
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [tagInput, setTagInput]       = useState('');

  useEffect(() => { setForm({ ...task }); setConfirmDelete(false); }, [task]);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  const set = (field, value) => setForm(f => ({ ...f, [field]: value }));

  const handleSave = () => {
    if (!form.title.trim()) return;
    onUpdate(task.id, form);
    onClose();
  };

  const addTag = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
      e.preventDefault();
      const tag = tagInput.trim().toLowerCase().replace(/,/g, '');
      if (!form.tags?.includes(tag)) {
        set('tags', [...(form.tags || []), tag]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tag) => set('tags', (form.tags || []).filter(t => t !== tag));

  const overdue = isOverdue(form.dueDate);

  return (
    <>
      <div className="drawer-overlay" onClick={onClose} />
      <div className="drawer">
        <div className="drawer-header">
          <div className="drawer-header-left">
            <span className="drawer-task-id">{formatCardId(task.id)}</span>
            <h2 title={form.title}>{form.title || 'Untitled task'}</h2>
          </div>
          <button className="drawer-close" onClick={onClose}><IconX size={14} /></button>
        </div>

        <div className="drawer-body">
          {/* Overdue warning */}
          {overdue && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 7,
              padding: '8px 10px',
              background: 'var(--overdue-bg)',
              border: '1px solid rgba(232,24,90,0.25)',
              borderRadius: 'var(--radius-sm)',
              fontSize: 12, color: 'var(--priority-high)',
              fontWeight: 500,
              animation: 'scaleIn 0.15s ease',
            }}>
              <IconAlertCircle size={13} />
              This task is overdue
            </div>
          )}

          {/* Title */}
          <div className="drawer-field">
            <label className="drawer-label">Title</label>
            <input
              className="drawer-input"
              value={form.title}
              onChange={e => set('title', e.target.value)}
              placeholder="Task title"
            />
          </div>

          {/* Description */}
          <div className="drawer-field">
            <label className="drawer-label">Description</label>
            <textarea
              className="drawer-input drawer-textarea"
              value={form.description}
              onChange={e => set('description', e.target.value)}
              placeholder="Add a description..."
            />
          </div>

          {/* Priority */}
          <div className="drawer-field">
            <label className="drawer-label"><IconFlag size={10} /> Priority</label>
            <div className="priority-control">
              {[
                { value: 'high',   label: 'High',   color: '#E8185A' },
                { value: 'medium', label: 'Medium', color: '#D97706' },
                { value: 'low',    label: 'Low',    color: '#16A34A' },
              ].map(p => (
                <button
                  key={p.value}
                  className={`priority-option ${form.priority === p.value ? `active ${p.value}` : ''}`}
                  onClick={() => set('priority', p.value)}
                >
                  <span style={{
                    width: 6, height: 6, borderRadius: '50%',
                    background: form.priority === p.value ? p.color : 'var(--border-strong)',
                    flexShrink: 0,
                  }} />
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Due date */}
          <div className="drawer-field">
            <label className="drawer-label"><IconCalendar size={10} /> Due Date</label>
            <input
              className="drawer-input"
              type="date"
              value={form.dueDate}
              onChange={e => set('dueDate', e.target.value)}
              style={overdue ? { borderColor: 'var(--accent)', color: 'var(--priority-high)' } : {}}
            />
          </div>

          {/* Assignee */}
          <div className="drawer-field">
            <label className="drawer-label"><IconUser size={10} /> Assignee</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {form.assignee && (
                <div style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: getAvatarColor(form.assignee),
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 10, fontWeight: 700, color: '#fff', flexShrink: 0,
                }}>
                  {form.assignee}
                </div>
              )}
              <input
                className="drawer-input"
                value={form.assignee}
                onChange={e => set('assignee', e.target.value.toUpperCase().slice(0, 3))}
                placeholder="Initials (e.g. CO)"
                maxLength={3}
                style={{ flex: 1 }}
              />
            </div>
          </div>

          {/* Tags */}
          <div className="drawer-field">
            <label className="drawer-label"><IconTag size={10} /> Tags</label>
            <div className="tags-wrap" onClick={e => e.currentTarget.querySelector('input')?.focus()}>
              {(form.tags || []).map(tag => (
                <span key={tag} className="tag-chip">
                  {tag}
                  <button onClick={() => removeTag(tag)}><IconX size={9} /></button>
                </span>
              ))}
              <input
                className="tag-input"
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={addTag}
                placeholder={(form.tags || []).length === 0 ? 'Add tags...' : ''}
              />
            </div>
          </div>

          {/* Delete confirm */}
          {confirmDelete && (
            <div className="delete-confirm">
              <strong style={{ fontSize: 13 }}>Delete this task?</strong>
              <p>This action cannot be undone. The task will be permanently removed.</p>
              <div className="delete-confirm-actions">
                <button className="btn-confirm-delete" onClick={() => { onDelete(task.id); onClose(); }}>
                  Delete permanently
                </button>
                <button className="btn-cancel" onClick={() => setConfirmDelete(false)}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Activity */}
        <div className="drawer-activity">
          <div className="drawer-activity-title">Activity</div>
          {FAKE_ACTIVITY.map((a, i) => (
            <div key={i} className="activity-item" style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="activity-avatar" style={{ background: getAvatarColor(a.user) }}>{a.user}</div>
              <span className="activity-text"><strong>{a.user}</strong> {a.text}</span>
              <span className="activity-time">{a.time}</span>
            </div>
          ))}
        </div>

        <div className="drawer-footer">
          <button className="btn-primary" onClick={handleSave}>Save changes</button>
          <button className="btn-danger" onClick={() => setConfirmDelete(true)}>
            <IconTrash size={13} />
          </button>
        </div>
      </div>
    </>
  );
}
