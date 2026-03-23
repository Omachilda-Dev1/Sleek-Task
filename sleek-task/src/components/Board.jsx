import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import Column from './Column';
import TaskDrawer from './TaskDrawer';
import BoardHeader from './BoardHeader';
import Sidebar from './Sidebar';
import StatsBar from './StatsBar';
import ToastContainer, { toast } from './Toast';
import { useBoard } from '../hooks/useBoard';
import { useTheme } from '../hooks/useTheme';
import { IconPlus } from './Icons';
import '../styles/layout.css';

export default function Board() {
  const {
    board, addTask, updateTask, deleteTask, duplicateTask,
    addColumn, updateColumn, deleteColumn,
    handleDragEnd, updateTitle, resetToDemo,
  } = useBoard();

  const { theme, toggle: toggleTheme } = useTheme();

  const [activeTask,      setActiveTask]      = useState(null);
  const [searchQuery,     setSearchQuery]     = useState('');
  const [priorityFilter,  setPriorityFilter]  = useState(null);
  const [assigneeFilter,  setAssigneeFilter]  = useState(null);
  const [activeView,      setActiveView]      = useState('board');
  const [quickAddColId,   setQuickAddColId]   = useState(null);

  // "N" key → quick-add in first column
  useEffect(() => {
    const handler = (e) => {
      const tag = e.target.tagName;
      if (e.key === 'n' && !e.ctrlKey && !e.metaKey && tag !== 'INPUT' && tag !== 'TEXTAREA') {
        const firstColId = board.columnOrder[0];
        if (firstColId) setQuickAddColId(firstColId);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [board.columnOrder]);

  const assignees = useMemo(() => {
    const set = new Set(Object.values(board.tasks).map(t => t.assignee).filter(Boolean));
    return [...set].sort();
  }, [board.tasks]);

  const handleDragEndWithToast = useCallback((result) => {
    const { destination, source } = result;
    if (!destination) return;
    if (destination.droppableId !== source.droppableId) {
      const destCol = board.columns[destination.droppableId];
      toast(`Moved to ${destCol?.title}`, 'success');
    }
    handleDragEnd(result);
  }, [handleDragEnd, board.columns]);

  const handleAddTask = useCallback((colId, data) => {
    addTask(colId, data);
    toast('Card added', 'success');
  }, [addTask]);

  const handleDeleteTask = useCallback((id) => {
    deleteTask(id);
    toast('Task deleted');
  }, [deleteTask]);

  const handleDuplicateTask = useCallback((id, colId) => {
    duplicateTask(id, colId);
    toast('Task duplicated', 'success');
  }, [duplicateTask]);

  const handleReset = useCallback(() => {
    resetToDemo();
    toast('Board reset to demo');
  }, [resetToDemo]);

  return (
    <div className="app-shell">
      <Sidebar board={board} activeView={activeView} onViewChange={setActiveView} />

      <div className="main-area">
        <BoardHeader
          title={board.title}
          onTitleChange={updateTitle}
          theme={theme}
          onThemeToggle={toggleTheme}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          priorityFilter={priorityFilter}
          onPriorityFilter={setPriorityFilter}
          assigneeFilter={assigneeFilter}
          onAssigneeFilter={setAssigneeFilter}
          assignees={assignees}
          onReset={handleReset}
        />

        <StatsBar board={board} />

        <DragDropContext onDragEnd={handleDragEndWithToast}>
          <div className="board-scroll">
            {board.columnOrder.map(colId => {
              const column = board.columns[colId];
              if (!column) return null;
              const tasks  = column.taskIds.map(id => board.tasks[id]).filter(Boolean);
              const isDone = column.title.toLowerCase() === 'done';
              return (
                <Column
                  key={colId}
                  column={column}
                  tasks={tasks}
                  isDone={isDone}
                  searchQuery={searchQuery}
                  priorityFilter={priorityFilter}
                  assigneeFilter={assigneeFilter}
                  onAddTask={handleAddTask}
                  onUpdateTask={updateTask}
                  onDeleteColumn={deleteColumn}
                  onUpdateColumn={updateColumn}
                  onDuplicateTask={handleDuplicateTask}
                  onOpenTask={setActiveTask}
                  quickAddActive={quickAddColId === colId}
                  onQuickAddDone={() => setQuickAddColId(null)}
                />
              );
            })}

            <button className="add-column-btn" onClick={() => { addColumn(); toast('Column added'); }}>
              <IconPlus size={14} /> New column
            </button>
          </div>
        </DragDropContext>
      </div>

      {activeTask && (
        <TaskDrawer
          task={activeTask}
          onClose={() => setActiveTask(null)}
          onUpdate={(id, updates) => {
            updateTask(id, updates);
            setActiveTask(prev => ({ ...prev, ...updates }));
            toast('Changes saved', 'success');
          }}
          onDelete={handleDeleteTask}
        />
      )}

      <ToastContainer />
    </div>
  );
}
