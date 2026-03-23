import React from 'react';

const Icon = ({ d, size = 16, strokeWidth = 1.75, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    {Array.isArray(d) ? d.map((path, i) => <path key={i} d={path} />) : <path d={d} />}
  </svg>
);

export const IconSearch      = (p) => <Icon size={p.size||14} {...p} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />;
export const IconPlus        = (p) => <Icon size={p.size||14} {...p} d="M12 5v14M5 12h14" />;
export const IconX           = (p) => <Icon size={p.size||14} {...p} d="M18 6 6 18M6 6l12 12" />;
export const IconSun         = (p) => <Icon size={p.size||16} {...p} d={["M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42","M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z"]} />;
export const IconMoon        = (p) => <Icon size={p.size||16} {...p} d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />;
export const IconSettings    = (p) => <Icon size={p.size||16} {...p} d={["M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z","M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"]} />;
export const IconEdit        = (p) => <Icon size={p.size||14} {...p} d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />;
export const IconTrash       = (p) => <Icon size={p.size||14} {...p} d={["M3 6h18","M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6","M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"]} />;
export const IconCopy        = (p) => <Icon size={p.size||14} {...p} d={["M20 9H11a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2z","M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 0 2 2v1"]} />;
export const IconCalendar    = (p) => <Icon size={p.size||12} {...p} d={["M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z","M16 2v4M8 2v4M3 10h18"]} />;
export const IconChevronDown = (p) => <Icon size={p.size||14} {...p} d="M6 9l6 6 6-6" />;
export const IconChevronRight= (p) => <Icon size={p.size||14} {...p} d="M9 18l6-6-6-6" />;
export const IconPalette     = (p) => <Icon size={p.size||14} {...p} d="M12 2a10 10 0 1 0 10 10c0-5.52-4.48-10-10-10zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm-1-5a1 1 0 1 0 2 0 1 1 0 0 0-2 0zm-4-4a1 1 0 1 0 2 0 1 1 0 0 0-2 0zm8 0a1 1 0 1 0 2 0 1 1 0 0 0-2 0zm-4-4a1 1 0 1 0 2 0 1 1 0 0 0-2 0z" />;
export const IconFlag        = (p) => <Icon size={p.size||12} {...p} d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7" />;
export const IconTag         = (p) => <Icon size={p.size||12} {...p} d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82zM7 7h.01" />;
export const IconUser        = (p) => <Icon size={p.size||14} {...p} d={["M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2","M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"]} />;
export const IconRefresh     = (p) => <Icon size={p.size||14} {...p} d={["M23 4v6h-6","M1 20v-6h6","M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"]} />;
export const IconLayout      = (p) => <Icon size={p.size||16} {...p} d={["M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z","M3 9h18","M9 21V9"]} />;
export const IconFilter      = (p) => <Icon size={p.size||14} {...p} d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />;
export const IconAlertCircle = (p) => <Icon size={p.size||12} {...p} d={["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z","M12 8v4","M12 16h.01"]} />;
export const IconCheckCircle = (p) => <Icon size={p.size||12} {...p} d={["M22 11.08V12a10 10 0 1 1-5.93-9.14","M22 4 12 14.01l-3-3"]} />;
export const IconClock       = (p) => <Icon size={p.size||12} {...p} d={["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z","M12 6v6l4 2"]} />;
export const IconMoreHoriz   = (p) => <Icon size={p.size||16} {...p} d={["M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z","M19 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z","M5 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"]} />;
export const IconBarChart    = (p) => <Icon size={p.size||16} {...p} d={["M18 20V10","M12 20V4","M6 20v-6"]} />;
export const IconTrendingUp  = (p) => <Icon size={p.size||16} {...p} d={["M23 6l-9.5 9.5-5-5L1 18","M17 6h6v6"]} />;
export const IconInbox       = (p) => <Icon size={p.size||16} {...p} d={["M22 12h-6l-2 3h-4l-2-3H2","M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"]} />;
export const IconStar        = (p) => <Icon size={p.size||12} {...p} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />;
export const IconPaperclip   = (p) => <Icon size={p.size||12} {...p} d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />;
export const IconMessageSquare=(p)=> <Icon size={p.size||12} {...p} d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />;
export const IconGitBranch   = (p) => <Icon size={p.size||12} {...p} d={["M6 3v12","M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z","M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z","M18 9a9 9 0 0 1-9 9"]} />;
