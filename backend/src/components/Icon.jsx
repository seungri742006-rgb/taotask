import React from "react";

const ICONS = {
  home: "⌂", project: "▣", note: "▤", trash: "♲", users: "♧",
  settings: "⚙", search: "⌕", plus: "＋", more: "•••", check: "✓", lock: "⌑",
  folder: "▱", calendar: "□",close :" " }

export default function Icon({ type }) {
  return <span className="icon">{ICONS[type] || "•"}</span>;
}
