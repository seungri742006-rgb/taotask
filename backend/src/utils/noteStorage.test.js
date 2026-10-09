import test from 'node:test';
import assert from 'node:assert/strict';
import { buildNotePayload, normalizeNote } from './noteStorage.js';

test('buildNotePayload includes the text content needed by backend', () => {
  const payload = buildNotePayload({
    title: 'Viết báo cáo',
    text: 'Cần hoàn thiện phần kết quả',
    color: 'blue',
    category: 'cong-viec',
    isPrivate: true,
    reminderAt: '2026-10-08T09:00:00.000Z',
  });

  assert.equal(payload.title, 'Viết báo cáo');
  assert.equal(payload.text, 'Cần hoàn thiện phần kết quả');
  assert.equal(payload.content, 'Cần hoàn thiện phần kết quả');
  assert.equal(payload.category, 'cong-viec');
  assert.equal(payload.color, 'blue');
  assert.equal(payload.isPrivate, true);
  assert.equal(payload.reminderAt, '2026-10-08T09:00:00.000Z');
});

test('normalizeNote converts backend values into the shape used by the UI', () => {
  const normalized = normalizeNote({
    id: 'note_123',
    title: 'Mục tiêu mới',
    text: 'Làm đúng tiến độ',
    category: 'y-tuong',
    color: 'yellow',
    createdAt: '2026-10-08T08:00:00.000Z',
    updatedAt: '2026-10-08T08:30:00.000Z',
    reminderAt: '2026-10-08T09:15:00.000Z',
  });

  assert.equal(normalized.id, 'note_123');
  assert.equal(normalized.title, 'Mục tiêu mới');
  assert.equal(normalized.text, 'Làm đúng tiến độ');
  assert.equal(normalized.category, 'y-tuong');
  assert.equal(normalized.color, 'yellow');
  assert.equal(normalized.reminderAt, '2026-10-08T09:15:00.000Z');
});
