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




## License

MIT
