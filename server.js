import express from 'express';
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize SQLite database
const db = new Database('command_centre.db', { verbose: console.log });

// Create schema if none exists
db.exec(`
  CREATE TABLE IF NOT EXISTS enquiries (
    id TEXT PRIMARY KEY,
    name TEXT,
    email TEXT,
    phone TEXT,
    date TEXT,
    course TEXT,
    message TEXT,
    status TEXT
  );

  CREATE TABLE IF NOT EXISTS bookings (
    id TEXT PRIMARY KEY,
    clientName TEXT,
    type TEXT,
    time TEXT,
    duration TEXT,
    location TEXT,
    day TEXT
  );

  CREATE TABLE IF NOT EXISTS content (
    id TEXT PRIMARY KEY,
    title TEXT,
    type TEXT,
    lastSaved TEXT,
    status TEXT
  );

  CREATE TABLE IF NOT EXISTS invoices (
    id TEXT PRIMARY KEY,
    client TEXT,
    amount TEXT,
    date TEXT,
    status TEXT
  );
`);

// Seed data if empty
const hasEnquiries = db.prepare("SELECT count(*) as count FROM enquiries").get().count > 0;
if (!hasEnquiries) {
  const insertEnquiry = db.prepare("INSERT INTO enquiries (id, name, email, phone, date, course, message, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
  insertEnquiry.run('1', 'Sarah Jenkins', 'sarah.j@example.com', '07712 345678', 'Today, 2:30 PM', 'Making an Impact', "I'm interested in the Making an Impact course next month. Do you have any availability left?", 'new');
  insertEnquiry.run('2', 'David Chen', 'd.chen88@example.com', '07998 765432', 'Today, 10:15 AM', 'Breakthrough Course', "Hi Claire, I've been struggling with public speaking and hoping your next session could help.", 'new');
  insertEnquiry.run('3', 'Emma Wilson', 'ewilson@company.co.uk', '07743 210987', 'Yesterday', '1-to-1 Session', "Looking to book a private session to discuss managing workplace anxiety.", 'contacted');
  insertEnquiry.run('4', 'Michael Brown', 'mike.b@gmail.com', '07812 345678', '2 days ago', 'Introductory Evening', "Is the introductory evening suitable for complete beginners?", 'booked');

  const insertBooking = db.prepare("INSERT INTO bookings (id, clientName, type, time, duration, location, day) VALUES (?, ?, ?, ?, ?, ?, ?)");
  insertBooking.run('1', 'Sarah Jenkins', 'Initial Consultation', '10:00 AM', '45m', 'Zoom', '12');
  insertBooking.run('2', 'Emma Wilson', 'Making an Impact Session 1', '2:00 PM', '1h 30m', 'In-Person', '12');
  insertBooking.run('3', 'David Chen', 'Breakthrough Coaching', '11:30 AM', '1h', 'Zoom', '14');
  insertBooking.run('4', 'Introductory Evening Group', 'Group Workshop', '6:30 PM', '2h', 'In-Person', '18');

  const insertContent = db.prepare("INSERT INTO content (id, title, type, lastSaved, status) VALUES (?, ?, ?, ?, ?)");
  insertContent.run('1', '5 Reasons Dramatherapy Works for Anxiety', 'Blog Post', '10 mins ago', 'draft');
  insertContent.run('2', 'Welcome to the New Term - Newsletter', 'Newsletter', 'Yesterday', 'ready');
  insertContent.run('3', 'Why I became a Dramatherapist', 'Website Copy', '3 days ago', 'published');

  const insertInvoice = db.prepare("INSERT INTO invoices (id, client, amount, date, status) VALUES (?, ?, ?, ?, ?)");
  insertInvoice.run('INV-2026-001', 'NHS Foundation Trust', '£450.00', '10 Mar 2026', 'paid');
  insertInvoice.run('INV-2026-002', 'Sarah Jenkins', '£75.00', '11 Mar 2026', 'pending');
  insertInvoice.run('INV-2026-003', 'Arts Council', '£1,200.00', '05 Mar 2026', 'overdue');
  insertInvoice.run('INV-2026-004', 'Emma Wilson', '£150.00', '12 Mar 2026', 'pending');
}

app.use(express.json());

// Serve the built React app
app.use(express.static(path.join(__dirname, 'dist')));

// --- ROUTES ---

// Enquiries
app.get('/api/enquiries', (req, res) => {
  const data = db.prepare("SELECT * FROM enquiries").all();
  res.json(data);
});
app.patch('/api/enquiries/:id', (req, res) => {
  const { status } = req.body;
  db.prepare("UPDATE enquiries SET status = ? WHERE id = ?").run(status, req.params.id);
  const updated = db.prepare("SELECT * FROM enquiries WHERE id = ?").get(req.params.id);
  res.json(updated);
});

// Bookings
app.get('/api/bookings', (req, res) => {
  const data = db.prepare("SELECT * FROM bookings").all();
  // Group by day for the frontend
  const grouped = data.reduce((acc, booking) => {
    (acc[booking.day] = acc[booking.day] || []).push(booking);
    return acc;
  }, {});
  res.json(grouped);
});

// Content
app.get('/api/content', (req, res) => {
  const data = db.prepare("SELECT * FROM content").all();
  res.json(data);
});
app.patch('/api/content/:id', (req, res) => {
  const { title } = req.body;
  if(title) db.prepare("UPDATE content SET title = ? WHERE id = ?").run(title, req.params.id);
  res.json(db.prepare("SELECT * FROM content WHERE id = ?").get(req.params.id));
});

// Invoices
app.get('/api/invoices', (req, res) => {
  const data = db.prepare("SELECT * FROM invoices").all();
  res.json(data);
});

// All other routes serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Backend API with DB live on port ${PORT}`);
});
