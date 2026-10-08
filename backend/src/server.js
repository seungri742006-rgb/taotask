const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const notesRoutes = require('./routes/notes.routes');
const projectsRoutes = require('./routes/projects.routes');
const privateNotesRoutes = require('./routes/privateNotes.routes');
const settingsRoutes = require('./routes/settings.routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running ✅', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/private-notes', privateNotesRoutes);
app.use('/api/settings', settingsRoutes);

if (process.env.NODE_ENV === 'production') {
  const frontendDist = path.resolve(__dirname, '../../frontend/dist');

  app.use('/api', (req, res) => {
    res.status(404).json({ success: false, error: 'Endpoint not found' });
  });
  app.use(express.static(frontendDist));
  app.get('/{*path}', (req, res) => {
    res.sendFile(path.join(frontendDist, 'index.html'));
  });
}

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Endpoint not found' });
});

// Global Error Handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});