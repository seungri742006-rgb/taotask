const fs = require('fs');
const path = require('path');

const BASE_DATA_DIR = process.env.DATA_DIR || path.resolve(__dirname, '../../data/users');

function ensureDirExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function getUserDir(userId) {
  const userDir = path.join(BASE_DATA_DIR, userId);
  ensureDirExists(userDir);
  return userDir;
}

function readJsonFile(filePath, defaultValue = []) {
  try {
    if (!fs.existsSync(filePath)) {
      return defaultValue;
    }
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return defaultValue;
  }
}

function writeJsonFile(filePath, data) {
  try {
    const dir = path.dirname(filePath);
    ensureDirExists(dir);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error(`Error writing ${filePath}:`, error);
    return false;
  }
}

function getAllUsers() {
  ensureDirExists(BASE_DATA_DIR);
  const folders = fs.readdirSync(BASE_DATA_DIR, { withFileTypes: true });
  const users = [];

  for (const folder of folders) {
    if (folder.isDirectory()) {
      const profilePath = path.join(BASE_DATA_DIR, folder.name, 'profile.json');
      const profile = readJsonFile(profilePath, null);
      if (profile) {
        users.push(profile);
      }
    }
  }

  return users;
}

function getUserProfile(userId) {
  const userDir = getUserDir(userId);
  const profilePath = path.join(userDir, 'profile.json');
  return readJsonFile(profilePath, null);
}

function saveUserProfile(userId, profile) {
  const userDir = getUserDir(userId);
  const profilePath = path.join(userDir, 'profile.json');
  return writeJsonFile(profilePath, profile);
}

function getUserNotes(userId) {
  const userDir = getUserDir(userId);
  const notesPath = path.join(userDir, 'notes.json');
  return readJsonFile(notesPath, []);
}

function saveUserNotes(userId, notes) {
  const userDir = getUserDir(userId);
  const notesPath = path.join(userDir, 'notes.json');
  return writeJsonFile(notesPath, notes);
}

function getUserProjects(userId) {
  const userDir = getUserDir(userId);
  const projectsPath = path.join(userDir, 'projects.json');
  return readJsonFile(projectsPath, []);
}

function saveUserProjects(userId, projects) {
  const userDir = getUserDir(userId);
  const projectsPath = path.join(userDir, 'projects.json');
  return writeJsonFile(projectsPath, projects);
}

function getUserPrivateNotes(userId) {
  const userDir = getUserDir(userId);
  const privateNotesPath = path.join(userDir, 'privateNotes.json');
  return readJsonFile(privateNotesPath, []);
}

function saveUserPrivateNotes(userId, privateNotes) {
  const userDir = getUserDir(userId);
  const privateNotesPath = path.join(userDir, 'privateNotes.json');
  return writeJsonFile(privateNotesPath, privateNotes);
}

function getUserSettings(userId) {
  const userDir = getUserDir(userId);
  const settingsPath = path.join(userDir, 'settings.json');
  return readJsonFile(settingsPath, {
    theme: 'light',
    primaryColor: '#3B82F6',
    language: 'vi',
    notifications: true,
  });
}

function saveUserSettings(userId, settings) {
  const userDir = getUserDir(userId);
  const settingsPath = path.join(userDir, 'settings.json');
  return writeJsonFile(settingsPath, settings);
}

module.exports = {
  getAllUsers,
  getUserProfile,
  saveUserProfile,
  getUserNotes,
  saveUserNotes,
  getUserProjects,
  saveUserProjects,
  getUserPrivateNotes,
  saveUserPrivateNotes,
  getUserSettings,
  saveUserSettings,
};
