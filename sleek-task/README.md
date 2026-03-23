# Sleek Task

Tasks, beautifully managed.

A production-grade Kanban board built with React. Designed to feel like a premium productivity tool — bold color, intentional typography, and fluid interactions throughout.

---

## Overview

Sleek Task is a fully client-side Kanban application with drag-and-drop task management, real-time filtering, a persistent board state, and a polished light/dark theme system. It ships with 20 realistic demo tasks across five columns and zero external UI dependencies.

---

## Tech Stack

- React 19 — functional components and hooks only
- @hello-pangea/dnd — drag and drop
- Vite — build tooling
- CSS custom properties — theming and design tokens, no Tailwind
- localStorage — board persistence
- Google Fonts — DM Sans (400, 500, 600)

---

## Features

### Board

- Five default columns: Backlog, To Do, In Progress, In Review, Done
- Horizontally scrollable board layout
- Inline editable board title (double-click)
- Add and delete columns
- Column accent color picker (6 presets)
- Inline column rename (double-click)
- Column deletion blocked when tasks are present, with tooltip

### Drag and Drop

- Tasks draggable between and within columns
- Column background transitions on drag-over
- Spring physics on drop via cubic-bezier easing
- Toast notification on cross-column move

### Task Cards

- Priority badge with color-coded dot (High / Medium / Low)
- Card ID in top-right corner (e.g. #ST-001)
- Left border stripe matches priority color
- Due date with overdue detection — turns accent red when past due
- Assignee avatar — 24px circle, color derived from initials hash
- Tag chips rendered inline
- Comment and attachment counts
- Inline title editing on double-click
- Duplicate card via icon button
- Done column cards rendered at reduced opacity with strikethrough title
- Staggered entrance animation on mount

### Task Drawer

- Slides in from the right with spring animation
- Fields: title, description, priority (segmented control), due date, assignee, tags
- Tag input — press Enter or comma to add, click X to remove
- Overdue warning banner when due date has passed
- Activity feed (last 4 actions)
- Animated field entrance on open
- Delete with inline confirmation step
- Escape key closes the drawer

### Search and Filter

- Real-time search across title, description, and tags
- Non-matching cards dim to 22% opacity — not hidden
- Filter by priority (High / Medium / Low)
- Filter by assignee
- Active filter chips with dismiss button

### Sidebar

- Live stats: total tasks, completed, in progress, overdue, high priority
- Completion progress bar
- Navigation: Board, My Tasks, Starred, Reports

### Stats Bar

- Four metric tiles: Total Tasks, In Progress, Completed, Overdue
- Animated completion progress bar
- Animates in on mount with staggered delay

### Theme

- Detects OS preference on load via `prefers-color-scheme`
- Manual toggle (sun/moon icon) in the top bar
- Persisted to localStorage under key `sleek_task_theme`
- Light mode: warm blush-pink base (`#FFF3F8`) with pink-tinted surfaces and borders
- Dark mode: deep near-black greys (`#0D0D0F` to `#1F1F23`) with high-contrast text

### Persistence

- Board state saved to localStorage under key `sleek_task_board`
- Version guard auto-clears stale data on schema changes
- Reset to demo board via the settings menu

### Keyboard Shortcuts

| Key      | Action                          |
|----------|---------------------------------|
| N        | Quick-add card in first column  |
| Escape   | Close drawer or add form        |

### Toast Notifications

- Appears on: card added, card duplicated, card moved, changes saved, task deleted, column added, board reset
- Auto-dismisses after 2.8 seconds with exit animation

---

## Project Structure

```
src/
  components/
    Board.jsx           — root layout, DragDropContext, state wiring
    BoardHeader.jsx     — topbar with title, search, theme toggle, settings
    Sidebar.jsx         — nav, live stats, completion progress
    StatsBar.jsx        — metric tiles below the topbar
    Column.jsx          — droppable column with header, task list, footer
    TaskCard.jsx        — draggable card with all metadata
    TaskDrawer.jsx      — slide-in edit panel
    AddTaskForm.jsx     — inline card creation form
    SearchBar.jsx       — search input and filter dropdowns
    ThemeToggle.jsx     — sun/moon icon button
    Toast.jsx           — notification system
    Icons.jsx           — SVG icon components (30+ icons)
  hooks/
    useBoard.js         — all board state and actions
    usePersistence.js   — localStorage read/write with version guard
    useTheme.js         — theme detection, toggle, persistence
  utils/
    id.js               — ID generation and card ID formatting
    date.js             — date formatting and overdue detection
    avatar.js           — assignee color from initials hash
  constants/
    demo.js             — 20 seed tasks across 5 columns
    colors.js           — column accent color presets
  styles/
    globals.css         — CSS custom properties, reset, keyframes, scrollbars
    layout.css          — app shell, sidebar, topbar, stats bar, toast
    board.css           — board scroll area
    column.css          — column, header, task list, color picker
    card.css            — task card, badges, tags, footer
    drawer.css          — side drawer, form controls, activity feed
    searchbar.css       — search input, filter dropdowns, chips
```

---

## State Shape

Persisted to localStorage under `sleek_task_board`:

```json
{
  "id": "board_001",
  "title": "Sleek Task",
  "columnOrder": ["col_1", "col_2", "col_3", "col_4", "col_5"],
  "columns": {
    "col_1": {
      "id": "col_1",
      "title": "Backlog",
      "accentColor": "#71717A",
      "taskIds": ["task_01", "task_02"]
    }
  },
  "tasks": {
    "task_01": {
      "id": "task_01",
      "title": "Task title",
      "description": "Optional description",
      "priority": "high",
      "dueDate": "2025-03-10",
      "assignee": "CO",
      "tags": ["api", "security"],
      "comments": 3,
      "attachments": 1,
      "createdAt": "2025-02-01T09:00:00Z"
    }
  }
}
```

---

## Getting Started

```bash
git clone https://github.com/Omachilda-Dev1/Sleek-Task.git
cd Sleek-Task/sleek-task
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

---

## Design Decisions

**No Tailwind, no UI libraries.** Every style is a hand-authored CSS class using custom properties. This keeps the bundle lean and the design fully intentional — no utility class sprawl.

**CSS custom properties for theming.** All colors are tokens defined in `:root` and `[data-theme="dark"]`. No color is hardcoded in component files. Switching themes is a single attribute change on `<html>`.

**@hello-pangea/dnd over react-beautiful-dnd.** The original library is unmaintained and has React 18+ compatibility issues. The Pangea fork is a drop-in replacement that is actively maintained.

**localStorage with a version guard.** A `sleek_task_version` key tracks the schema version. On mismatch, stale data is cleared automatically so users never see a broken board after an update.

**SVG icon system.** All icons are inline SVG components in `Icons.jsx` — no icon font, no external sprite sheet, no extra network request. Tree-shakeable and fully typed.

---

## Browser Support

Targets modern evergreen browsers. Requires CSS custom properties, `backdrop-filter`, and the Web Animations API — all supported in Chrome 88+, Firefox 90+, Safari 14+.

---

## License

MIT
