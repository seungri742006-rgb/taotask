export function buildNotePayload(note) {
  const createdAt = note?.createdAt || new Date().toISOString();
  const reminderAt = note?.reminderAt || createdAt;

  return {
    id: note?.id ?? `note_${Date.now()}`,
    title: note?.title ?? '',
    text: note?.text ?? '',
    content: note?.content ?? note?.text ?? '',
    color: note?.color ?? 'yellow',
    category: note?.category ?? 'hoc-tap',
    projectId: note?.projectId ?? null,
    isPrivate: Boolean(note?.isPrivate),
    reminderAt,
    createdAt,
    updatedAt: createdAt,
  };
}

export function normalizeNote(note = {}) {
  return {
    ...note,
    id: note.id ?? `note_${Date.now()}`,
    title: note.title ?? '',
    text: note.text ?? note.content ?? '',
    content: note.content ?? note.text ?? '',
    color: note.color ?? 'yellow',
    category: note.category ?? 'hoc-tap',
    isPrivate: Boolean(note.isPrivate),
    reminderAt: note.reminderAt ?? note.createdAt ?? new Date().toISOString(),
    createdAt: note.createdAt ?? new Date().toISOString(),
    updatedAt: note.updatedAt ?? note.createdAt ?? new Date().toISOString(),
  };
}
