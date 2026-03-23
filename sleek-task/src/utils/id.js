let counter = Date.now();

export function generateId(prefix = 'id') {
  counter += 1;
  const rand = Math.random().toString(36).slice(2, 7);
  return `${prefix}_${rand}${counter.toString(36)}`;
}

export function generateTaskId(tasks) {
  const nums = Object.keys(tasks)
    .map(k => parseInt(k.replace(/\D/g, ''), 10))
    .filter(n => !isNaN(n));
  const next = nums.length ? Math.max(...nums) + 1 : 1;
  return `task_${String(next).padStart(3, '0')}`;
}

export function formatCardId(id) {
  const num = id.replace(/\D/g, '');
  return `#ST-${String(num).padStart(3, '0')}`;
}
