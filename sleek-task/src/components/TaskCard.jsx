import React, { useState, useRef } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { formatDate, isOverdue } from '../utils/date';
import { getAvatarColor } from '../utils/avatar';
import { formatCardId } from '../utils/id';
import { IconCalendar, IconCopy, IconMessageSquare, IconPaperclip, IconAlertCircle } from './Icons';
import '../styles/card.css';

const PRIORITY_COLOR = {
  high:   'var(--priority-high)',
  medium: 'var(--priority-med)',
  low:    'var(--priority-low)',
};

export default function TaskCard({ task, index, isDone, dimmed, onOpen, onDuplicate, onTitleChange }) {
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft]     = useState(task.title);
  const titleRef = useRef(null);

  const overdue        = isOverdue(task.dueDate);
  const formattedDate  = formatDate(task.dueDate);
  const avatarColor    = getAvatarColor(task.assignee);
  const priorityColor  = PRIORITY_COLOR[task.priority] || 'var(--border-strong)';

  const startTitleEdit = (e) => {
    e.stopPropagation();
    setTitleDraft(task.title);
    setEditingTitle(true);
    setTimeout(() => titleRef.current?.select(), 0);
  };

  const commitTitle = () => {
    if (titleDraft.trim()) onTitleChange(task.id, titleDraft.trim());
    setEditingTitle(false);
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={[
            'task-card',
            overdue && !isDone ? 'overdue' : '',
            isDone ? 'done' : '',
            snapshot.isDragging ? 'dragging' : '',
            dimmed ? 'dimmed' : '',
          ].filter(Boolean).join(' ')}
          style={{
            '--card-priority-color': overdue && !isDone ? 'var(--overdue-border)' : priorityColor,
            ...provided.draggableProps.style,
          }}
          onClick={() => !editingTitle && onOpen(task)}
        >
          {/* Top row */}
          <div className="card-top">
            <span className={`card-priority-badge ${task.priority}`}>
              <span className="priority-dot" />
              {task.priority}
            </span>
            <span className="card-id">{formatCardId(task.id)}</span>
          </div>

          {/* Title */}
          {editingTitle ? (
            <textarea
              ref={titleRef}
              className="card-title-input"
              value={titleDraft}
              onChange={e => setTitleDraft(e.target.value)}
              onBlur={commitTitle}
              onClick={e => e.stopPropagation()}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); commitTitle(); }
                if (e.key === 'Escape') setEditingTitle(false);
              }}
              rows={2}
            />
          ) : (
            <div className="card-title" onDoubleClick={startTitleEdit}>
              {task.title}
            </div>
          )}

          {/* Tags */}
          {task.tags?.length > 0 && (
            <div className="card-tags">
              {task.tags.map(tag => (
                <span key={tag} className="card-tag">{tag}</span>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="card-footer">
            <div className="card-meta">
              {formattedDate && (
                <span className={`card-meta-item ${overdue && !isDone ? 'overdue' : ''}`}>
                  {overdue && !isDone
                    ? <IconAlertCircle size={11} />
                    : <IconCalendar size={11} />
                  }
                  {formattedDate}
                </span>
              )}
              {task.comments > 0 && (
                <span className="card-meta-item">
                  <IconMessageSquare size={11} />
                  {task.comments}
                </span>
              )}
              {task.attachments > 0 && (
                <span className="card-meta-item">
                  <IconPaperclip size={11} />
                  {task.attachments}
                </span>
              )}
            </div>

            <div className="card-footer-right">
              <div className="card-actions">
                <button
                  className="card-action-btn"
                  title="Duplicate"
                  onClick={e => { e.stopPropagation(); onDuplicate(task.id); }}
                >
                  <IconCopy size={12} />
                </button>
              </div>
              {task.assignee && (
                <div
                  className="card-assignee"
                  style={{ background: avatarColor }}
                  title={task.assignee}
                >
                  {task.assignee}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}
