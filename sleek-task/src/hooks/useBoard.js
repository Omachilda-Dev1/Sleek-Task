import { useState, useEffect, useCallback } from 'react';
import { DEMO_BOARD } from '../constants/demo';
import { loadBoard, saveBoard } from './usePersistence';
import { generateId, generateTaskId } from '../utils/id';

export function useBoard() {
  const [board, setBoard] = useState(() => loadBoard() || DEMO_BOARD);

  useEffect(() => {
    saveBoard(board);
  }, [board]);

  const updateBoard = useCallback((updater) => {
    setBoard(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      return next;
    });
  }, []);

  // ── Task actions ──
  const addTask = useCallback((columnId, taskData) => {
    updateBoard(prev => {
      const id = generateTaskId(prev.tasks);
      const task = {
        id,
        title: taskData.title || 'Untitled task',
        description: taskData.description || '',
        priority: taskData.priority || 'medium',
        dueDate: taskData.dueDate || '',
        assignee: taskData.assignee || '',
        tags: taskData.tags || [],
        comments: 0,
        attachments: 0,
        createdAt: new Date().toISOString(),
      };
      return {
        ...prev,
        tasks: { ...prev.tasks, [id]: task },
        columns: {
          ...prev.columns,
          [columnId]: {
            ...prev.columns[columnId],
            taskIds: [...prev.columns[columnId].taskIds, id],
          },
        },
      };
    });
  }, [updateBoard]);

  const updateTask = useCallback((taskId, updates) => {
    updateBoard(prev => ({
      ...prev,
      tasks: {
        ...prev.tasks,
        [taskId]: { ...prev.tasks[taskId], ...updates },
      },
    }));
  }, [updateBoard]);

  const deleteTask = useCallback((taskId) => {
    updateBoard(prev => {
      const tasks = { ...prev.tasks };
      delete tasks[taskId];
      const columns = {};
      for (const [cid, col] of Object.entries(prev.columns)) {
        columns[cid] = { ...col, taskIds: col.taskIds.filter(id => id !== taskId) };
      }
      return { ...prev, tasks, columns };
    });
  }, [updateBoard]);

  const duplicateTask = useCallback((taskId, columnId) => {
    updateBoard(prev => {
      const original = prev.tasks[taskId];
      const id = generateTaskId(prev.tasks);
      const copy = { ...original, id, title: original.title + ' (copy)', createdAt: new Date().toISOString() };
      const col = prev.columns[columnId];
      const idx = col.taskIds.indexOf(taskId);
      const newTaskIds = [...col.taskIds];
      newTaskIds.splice(idx + 1, 0, id);
      return {
        ...prev,
        tasks: { ...prev.tasks, [id]: copy },
        columns: { ...prev.columns, [columnId]: { ...col, taskIds: newTaskIds } },
      };
    });
  }, [updateBoard]);

  // ── Column actions ──
  const addColumn = useCallback(() => {
    updateBoard(prev => {
      const id = generateId('col');
      const col = { id, title: 'New Column', accentColor: '#71717A', taskIds: [] };
      return {
        ...prev,
        columns: { ...prev.columns, [id]: col },
        columnOrder: [...prev.columnOrder, id],
      };
    });
  }, [updateBoard]);

  const updateColumn = useCallback((columnId, updates) => {
    updateBoard(prev => ({
      ...prev,
      columns: {
        ...prev.columns,
        [columnId]: { ...prev.columns[columnId], ...updates },
      },
    }));
  }, [updateBoard]);

  const deleteColumn = useCallback((columnId) => {
    updateBoard(prev => {
      const columns = { ...prev.columns };
      delete columns[columnId];
      return {
        ...prev,
        columns,
        columnOrder: prev.columnOrder.filter(id => id !== columnId),
      };
    });
  }, [updateBoard]);

  // ── Drag end ──
  const handleDragEnd = useCallback((result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    updateBoard(prev => {
      const srcCol = prev.columns[source.droppableId];
      const dstCol = prev.columns[destination.droppableId];

      if (srcCol.id === dstCol.id) {
        const newIds = [...srcCol.taskIds];
        newIds.splice(source.index, 1);
        newIds.splice(destination.index, 0, draggableId);
        return {
          ...prev,
          columns: { ...prev.columns, [srcCol.id]: { ...srcCol, taskIds: newIds } },
        };
      }

      const srcIds = [...srcCol.taskIds];
      srcIds.splice(source.index, 1);
      const dstIds = [...dstCol.taskIds];
      dstIds.splice(destination.index, 0, draggableId);

      return {
        ...prev,
        columns: {
          ...prev.columns,
          [srcCol.id]: { ...srcCol, taskIds: srcIds },
          [dstCol.id]: { ...dstCol, taskIds: dstIds },
        },
      };
    });
  }, [updateBoard]);

  // ── Board title ──
  const updateTitle = useCallback((title) => {
    updateBoard(prev => ({ ...prev, title }));
  }, [updateBoard]);

  // ── Reset ──
  const resetToDemo = useCallback(() => {
    setBoard(DEMO_BOARD);
  }, []);

  return {
    board,
    addTask,
    updateTask,
    deleteTask,
    duplicateTask,
    addColumn,
    updateColumn,
    deleteColumn,
    handleDragEnd,
    updateTitle,
    resetToDemo,
  };
}
