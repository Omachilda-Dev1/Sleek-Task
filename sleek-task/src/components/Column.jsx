import React, { useState, useRef, useEffect } from 'react';
import { Droppable } from '@hello-pangea/dnd';
import TaskCard from './TaskCard';
import AddTaskForm from './AddTaskForm';
import { COLUMN_ACCENT_COLORS } from '../constants/colors';
import { IconPlus, IconEdit, IconTrash, IconPalette, IconMoreHoriz } from './Icons';
import '../styles/column.css';

export default function Column({
  column, tasks, isDone,
  searchQuery, priorityFilter, assigneeFilter,
  onAddTask, onUpdateTask, onDeleteColumn, onUpdateColumn,
  onDuplicateTask, onOpenTask,
  quickAddActive, onQuickAddDone,
}) {
  const [addingCard, setAddingCard]       = useState(false);
  const [editingTitle, setEditingTitle]   = useState(false);
  const [titleDraft, setTitleDraft]       = useState(column.title);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [menuOpen, setMenuOpen]           = useState(false);
  const titleInputRef = useRef(null);
  const menuRef       = useRef(null);

  // Quick-add from keyboard shortcut
  useEffect(() => {
    if (quickAddActive) { setAddingCard(true); onQuickAddDone?.(); }
  }, [quickAddActive, onQuickAddDone]);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const canDelete = tasks.length === 0;

  const startTitleEdit = () => {
    setTitleDraft(column.title);
    setEditingTitle(true);
    setMenuOpen(false);
    setTimeout(() => titleInputRef.current?.select(), 0);
  };

  const commitTitle = () => {
    if (titleDraft.trim()) onUpdateColumn(column.id, { title: titleDraft.trim() });
    setEditingTitle(false);
  };

  const matchesFilter = (task) => {
    const q = searchQuery.toLowerCase();
    const matchSearch   = !q || task.title.toLowerCase().includes(q) || (task.description || '').toLowerCase().includes(q) || (task.tags || []).some(t => t.includes(q));
    const matchPriority = !priorityFilter || task.priority === priorityFilter;
    const matchAssignee = !assigneeFilter || task.assignee === assigneeFilter;
    return matchSearch && matchPriority && matchAssignee;
  };

  const hasFilter = searchQuery || priorityFilter || assigneeFilter;
  const doneCount = isDone ? tasks.length : 0;
  const progressPct = isDone && tasks.length > 0 ? 100 : 0;

  return (
    <div className="column" style={{ '--column-accent': column.accentColor }}>
      {/* Header */}
      <div className="column-header">
        <div className="column-title-wrap">
          <span className="column-dot" />
          {editingTitle ? (
            <input
              ref={titleInputRef}
              className="column-title-input"
              value={titleDraft}
              onChange={e => setTitleDraft(e.target.value)}
              onBlur={commitTitle}
              onKeyDown={e => {
                if (e.key === 'Enter') commitTitle();
                if (e.key === 'Escape') setEditingTitle(false);
              }}
            />
          ) : (
            <span className="column-title" onDoubleClick={startTitleEdit} title="Double-click to rename">
              {column.title}
            </span>
          )}
          <span className="column-count">{tasks.length}</span>
        </div>

        <div className="column-actions">
          <button
            className="column-action-btn"
            title="Add card"
            onClick={() => setAddingCard(true)}
          >
            <IconPlus size={13} />
          </button>

          {/* More menu */}
          <div style={{ position: 'relative' }} ref={menuRef}>
            <button
              className="column-action-btn"
              onClick={() => setMenuOpen(o => !o)}
              title="More options"
            >
              <IconMoreHoriz size={14} />
            </button>
            {menuOpen && (
              <div style={{
                position: 'absolute', top: 'calc(100% + 4px)', right: 0,
                background: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                boxShadow: 'var(--shadow-md)',
                zIndex: 100, minWidth: 160, padding: 4,
                animation: 'scaleIn 0.12s ease',
                transformOrigin: 'top right',
              }}>
                <button
                  onClick={startTitleEdit}
                  style={{
                    width: '100%', padding: '7px 10px', textAlign: 'left',
                    fontSize: 12, color: 'var(--text-primary)',
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex', alignItems: 'center', gap: 7,
                    transition: 'background 0.1s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-surface-2)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <IconEdit size={12} /> Rename
                </button>
                <button
                  onClick={() => { setShowColorPicker(o => !o); setMenuOpen(false); }}
                  style={{
                    width: '100%', padding: '7px 10px', textAlign: 'left',
                    fontSize: 12, color: 'var(--text-primary)',
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex', alignItems: 'center', gap: 7,
                    transition: 'background 0.1s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-surface-2)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <IconPalette size={12} /> Change color
                </button>
                <div style={{ height: 1, background: 'var(--border)', margin: '3px 0' }} />
                <button
                  onClick={() => canDelete ? (onDeleteColumn(column.id), setMenuOpen(false)) : null}
                  data-tip={!canDelete ? 'Remove all tasks first' : undefined}
                  style={{
                    width: '100%', padding: '7px 10px', textAlign: 'left',
                    fontSize: 12,
                    color: canDelete ? '#DC2626' : 'var(--text-muted)',
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex', alignItems: 'center', gap: 7,
                    cursor: canDelete ? 'pointer' : 'not-allowed',
                    transition: 'background 0.1s',
                  }}
                  onMouseEnter={e => canDelete && (e.currentTarget.style.background = '#FEE2E2')}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <IconTrash size={12} /> Delete column
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Color picker */}
      {showColorPicker && (
        <div className="color-picker-row">
          {COLUMN_ACCENT_COLORS.map(c => (
            <div
              key={c.value}
              className={`color-swatch ${column.accentColor === c.value ? 'active' : ''}`}
              style={{ background: c.value }}
              title={c.label}
              onClick={() => { onUpdateColumn(column.id, { accentColor: c.value }); setShowColorPicker(false); }}
            />
          ))}
        </div>
      )}

      {/* Progress bar for Done column */}
      {isDone && tasks.length > 0 && (
        <div className="column-progress">
          <div className="column-progress-track">
            <div
              className="column-progress-fill"
              style={{ '--progress-target': '100%', width: '100%' }}
            />
          </div>
        </div>
      )}

      {/* Task list */}
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`column-task-list ${snapshot.isDraggingOver ? 'drag-over' : ''}`}
          >
            {tasks.length === 0 && !addingCard && (
              <div className="column-empty">Drop tasks here</div>
            )}
            {tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                isDone={isDone}
                dimmed={hasFilter && !matchesFilter(task)}
                onOpen={onOpenTask}
                onDuplicate={(id) => onDuplicateTask(id, column.id)}
                onTitleChange={(id, title) => onUpdateTask(id, { title })}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {/* Footer */}
      <div className="column-footer">
        {addingCard ? (
          <AddTaskForm
            onAdd={(data) => { onAddTask(column.id, data); setAddingCard(false); }}
            onCancel={() => setAddingCard(false)}
          />
        ) : (
          <button className="add-card-trigger" onClick={() => setAddingCard(true)}>
            <IconPlus size={12} /> Add a card
          </button>
        )}
      </div>
    </div>
  );
}
