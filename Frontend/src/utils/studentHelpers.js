export const AVATAR_COLORS = [
  "#7F77DD", "#1D9E75", "#D85A30", "#BA7517",
  "#D4537E", "#378ADD", "#639922", "#993556",
];

export function getInitials(name) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

export function getColor(id) {
  return AVATAR_COLORS[(id - 1) % AVATAR_COLORS.length];
}