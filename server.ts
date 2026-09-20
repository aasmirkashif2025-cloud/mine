import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { db, DEFAULT_ADMIN_PASSWORD } from './server/db';

const appDir = typeof __dirname !== 'undefined' ? __dirname : process.cwd();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Body parsing middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Request logging in development
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    console.log(`[API] ${req.method} ${req.path}`);
  }
  next();
});

// Admin Auth Middleware
function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
  }
  const token = authHeader.split(' ')[1];
  if (!db.validateSession(token)) {
    return res.status(401).json({ error: 'Unauthorized: Session expired or invalid' });
  }
  next();
}

// ==========================================
// 1. PUBLIC API ROUTES
// ==========================================

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Full site public configuration & data
app.get('/api/site-data', (req, res) => {
  try {
    const data = db.getPublicSiteData();
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to retrieve site data', details: err.message });
  }
});

// Submit client inquiry (Contact Page submission)
app.post('/api/inquiries', (req, res) => {
  try {
    const { name, email, phone, company, projectType, budget, timeline, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required fields.' });
    }

    const newInquiry = db.addInquiry({
      name,
      email,
      phone: phone || '',
      company: company || '',
      projectType: projectType || 'Custom Project',
      budget: budget || 'To be discussed',
      timeline: timeline || 'Flexible',
      message,
    });

    const currentConfig = db.getPublicSiteData().config;

    res.status(201).json({
      success: true,
      inquiry: newInquiry,
      assignedContact: {
        email: currentConfig.email,
        phone: currentConfig.phone,
        whatsapp: currentConfig.whatsapp,
      },
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to record inquiry', details: err.message });
  }
});

// ==========================================
// 2. ADMIN AUTHENTICATION
// ==========================================

// Admin Login (secured with zaahir198878200920242025)
app.post('/api/admin/login', (req, res) => {
  try {
    const { password } = req.body;
    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    const isValid = db.verifyPassword(password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid admin credentials' });
    }

    const token = db.createSession();
    res.json({
      success: true,
      token,
      message: 'Admin access granted',
      user: 'Administrator',
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Authentication failed', details: err.message });
  }
});

// Verify token
app.get('/api/admin/verify', requireAdmin, (req, res) => {
  res.json({ success: true, valid: true });
});

// Logout
app.post('/api/admin/logout', (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    db.invalidateSession(token);
  }
  res.json({ success: true, message: 'Logged out successfully' });
});

// Change Password
app.post('/api/admin/change-password', requireAdmin, (req, res) => {
  try {
    const { newPassword } = req.body;
    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }
    db.changePassword(newPassword);
    res.json({ success: true, message: 'Admin password updated successfully' });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to update password', details: err.message });
  }
});

// ==========================================
// 3. ADMIN MANAGEMENT (PROTECTED)
// ==========================================

// Update Site Configuration (Branding, Contact Info, Theme, Hero)
app.put('/api/admin/config', requireAdmin, (req, res) => {
  try {
    const updated = db.updateConfig(req.body);
    res.json({ success: true, config: updated });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to update config', details: err.message });
  }
});

// Inquiries Management
app.get('/api/admin/inquiries', requireAdmin, (req, res) => {
  try {
    const inquiries = db.getInquiries();
    res.json({ success: true, inquiries });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to fetch inquiries', details: err.message });
  }
});

app.patch('/api/admin/inquiries/:id', requireAdmin, (req, res) => {
  try {
    const { status } = req.body;
    const updated = db.updateInquiryStatus(req.params.id, status);
    if (!updated) {
      return res.status(404).json({ error: 'Inquiry not found' });
    }
    res.json({ success: true, inquiry: updated });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to update inquiry', details: err.message });
  }
});

app.delete('/api/admin/inquiries/:id', requireAdmin, (req, res) => {
  try {
    const deleted = db.deleteInquiry(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Inquiry not found' });
    }
    res.json({ success: true, message: 'Inquiry deleted' });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to delete inquiry', details: err.message });
  }
});

// Projects / Portfolio Management (Add, Edit, Delete)
app.post('/api/admin/projects', requireAdmin, (req, res) => {
  try {
    const newProject = db.addProject(req.body);
    res.status(201).json({ success: true, project: newProject });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to add project', details: err.message });
  }
});

app.put('/api/admin/projects/:id', requireAdmin, (req, res) => {
  try {
    const updated = db.updateProject(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json({ success: true, project: updated });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to update project', details: err.message });
  }
});

app.delete('/api/admin/projects/:id', requireAdmin, (req, res) => {
  try {
    const deleted = db.deleteProject(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json({ success: true, message: 'Project removed' });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to delete project', details: err.message });
  }
});

// Services Management (Add, Edit, Delete)
app.post('/api/admin/services', requireAdmin, (req, res) => {
  try {
    const newService = db.addService(req.body);
    res.status(201).json({ success: true, service: newService });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to add service', details: err.message });
  }
});

app.put('/api/admin/services/:id', requireAdmin, (req, res) => {
  try {
    const updated = db.updateService(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json({ success: true, service: updated });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to update service', details: err.message });
  }
});

app.delete('/api/admin/services/:id', requireAdmin, (req, res) => {
  try {
    const deleted = db.deleteService(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json({ success: true, message: 'Service removed' });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to delete service', details: err.message });
  }
});

// Industries Management (Add, Edit, Delete)
app.post('/api/admin/industries', requireAdmin, (req, res) => {
  try {
    const newIndustry = db.addIndustry(req.body);
    res.status(201).json({ success: true, industry: newIndustry });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to add industry', details: err.message });
  }
});

app.put('/api/admin/industries/:id', requireAdmin, (req, res) => {
  try {
    const updated = db.updateIndustry(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Industry not found' });
    }
    res.json({ success: true, industry: updated });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to update industry', details: err.message });
  }
});

app.delete('/api/admin/industries/:id', requireAdmin, (req, res) => {
  try {
    const deleted = db.deleteIndustry(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Industry not found' });
    }
    res.json({ success: true, message: 'Industry removed' });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to delete industry', details: err.message });
  }
});

// Stats Management
app.put('/api/admin/stats', requireAdmin, (req, res) => {
  try {
    const stats = db.updateStats(req.body.stats);
    res.json({ success: true, stats });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to update stats', details: err.message });
  }
});

// Reset Defaults
app.post('/api/admin/reset-defaults', requireAdmin, (req, res) => {
  try {
    const restored = db.resetToDefaults();
    res.json({ success: true, data: restored });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to reset defaults', details: err.message });
  }
});

// ==========================================
// 4. VITE & STATIC SERVING
// ==========================================

async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production' || appDir.includes('dist');

  if (!isProduction) {
    try {
      const { createServer: createViteServer } = await import('vite');
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'spa',
      });
      app.use(vite.middlewares);
    } catch {
      const distPath = path.join(process.cwd(), 'dist');
      app.use(express.static(distPath));
      app.get('*', (_req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
    }
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Affliora Digital] Server active on http://0.0.0.0:${PORT}`);
  });
}

export { app };
export default app;

startServer().catch((err) => {
  console.error('Fatal error starting server:', err);
  process.exit(1);
});
