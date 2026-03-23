const STORAGE_KEY = 'sleek_task_board';
const VERSION_KEY = 'sleek_task_version';
const CURRENT_VERSION = '2';

// Bust stale cache from previous version
if (localStorage.getItem(VERSION_KEY) !== CURRENT_VERSION) {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.setItem(VERSION_KEY, CURRENT_VERSION);
}

export function loadBoard() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const board = JSON.parse(raw);
    // Validate shape — must have columnOrder array and columns/tasks objects
    if (!Array.isArray(board.columnOrder) || !board.columns || !board.tasks) return null;
    return board;
  } catch {
    return null;
  }
}

export function saveBoard(board) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(board));
  } catch {
    // storage full or unavailable
  }
}

export function clearBoard() {
  localStorage.removeItem(STORAGE_KEY);
}
