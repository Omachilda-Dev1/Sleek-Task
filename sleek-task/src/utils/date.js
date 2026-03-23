const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export function formatDate(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr + 'T00:00:00');
  return `${MONTHS[d.getMonth()]} ${d.getDate()}`;
}

export function isOverdue(dateStr) {
  if (!dateStr) return false;
  const due = new Date(dateStr + 'T23:59:59');
  return due < new Date();
}
