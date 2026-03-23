const AVATAR_COLORS = ['#52525B', '#71717A', '#E8185A', '#3F3F46', '#A1A1AA'];

export function getAvatarColor(initials) {
  if (!initials) return AVATAR_COLORS[0];
  let hash = 0;
  for (let i = 0; i < initials.length; i++) {
    hash = initials.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}
