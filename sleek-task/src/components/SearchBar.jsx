import React, { useState, useRef, useEffect } from 'react';
import { IconSearch, IconX, IconChevronDown, IconFilter } from './Icons';
import '../styles/searchbar.css';

const PRIORITIES = [
  { value: 'high',   label: 'High',   color: '#E8185A' },
  { value: 'medium', label: 'Medium', color: '#D97706' },
  { value: 'low',    label: 'Low',    color: '#16A34A' },
];

export default function SearchBar({
  query, onQueryChange,
  priorityFilter, onPriorityFilter,
  assigneeFilter, onAssigneeFilter,
  assignees,
}) {
  const [priorityOpen, setPriorityOpen] = useState(false);
  const [assigneeOpen, setAssigneeOpen] = useState(false);
  const priorityRef = useRef(null);
  const assigneeRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (priorityRef.current && !priorityRef.current.contains(e.target)) setPriorityOpen(false);
      if (assigneeRef.current && !assigneeRef.current.contains(e.target)) setAssigneeOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="searchbar-wrap">
      <div className="searchbar-input-wrap">
        <span className="searchbar-icon"><IconSearch size={13} /></span>
        <input
          className="searchbar-input"
          type="text"
          placeholder="Search tasks..."
          value={query}
          onChange={e => onQueryChange(e.target.value)}
        />
      </div>

      <div className="filter-chips">
        {/* Priority */}
        <div className="filter-dropdown" ref={priorityRef}>
          <button
            className={`filter-btn ${priorityFilter ? 'active' : ''}`}
            onClick={() => setPriorityOpen(o => !o)}
          >
            <IconFilter size={11} />
            {priorityFilter
              ? PRIORITIES.find(p => p.value === priorityFilter)?.label
              : 'Priority'}
            <IconChevronDown size={11} />
          </button>
          {priorityOpen && (
            <div className="filter-menu">
              {PRIORITIES.map(p => (
                <div
                  key={p.value}
                  className={`filter-menu-item ${priorityFilter === p.value ? 'selected' : ''}`}
                  onClick={() => { onPriorityFilter(priorityFilter === p.value ? null : p.value); setPriorityOpen(false); }}
                >
                  <span className="priority-dot-sm" style={{ background: p.color }} />
                  {p.label}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Assignee */}
        <div className="filter-dropdown" ref={assigneeRef}>
          <button
            className={`filter-btn ${assigneeFilter ? 'active' : ''}`}
            onClick={() => setAssigneeOpen(o => !o)}
          >
            {assigneeFilter || 'Assignee'}
            <IconChevronDown size={11} />
          </button>
          {assigneeOpen && (
            <div className="filter-menu">
              {assignees.map(a => (
                <div
                  key={a}
                  className={`filter-menu-item ${assigneeFilter === a ? 'selected' : ''}`}
                  onClick={() => { onAssigneeFilter(assigneeFilter === a ? null : a); setAssigneeOpen(false); }}
                >
                  {a}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Active chips */}
        {priorityFilter && (
          <span className="active-chip">
            {PRIORITIES.find(p => p.value === priorityFilter)?.label}
            <button onClick={() => onPriorityFilter(null)}><IconX size={10} /></button>
          </span>
        )}
        {assigneeFilter && (
          <span className="active-chip">
            {assigneeFilter}
            <button onClick={() => onAssigneeFilter(null)}><IconX size={10} /></button>
          </span>
        )}
      </div>
    </div>
  );
}
