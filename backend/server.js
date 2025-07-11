// server.js
const express = require('express');
const cors = require('cors');
const { db, initDB } = require('./db');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());


initDB();

app.get('/', (req, res) => {
  res.send('Backend is running.');
});

// GET 所有组
app.get('/api/groups', async (req, res) => {
  const { rows } = await db.query('SELECT name FROM groups');
  res.json(rows.map(r => r.name));
});

// POST 新建组
app.post('/api/groups', async (req, res) => {
  const name = req.body.name?.replace(/'/g, "''");

  await db.exec(`
    INSERT INTO groups (name)
    VALUES ('${name}')
    ON CONFLICT(name) DO NOTHING
  `);

  res.json({ success: true });
});


// GET 某组的成绩
app.get('/api/scores/:group', async (req, res) => {
  const group = req.params.group.replace(/'/g, "''");
  const { rows } = await db.query(
    `SELECT time FROM scores WHERE group_name = '${group}' ORDER BY created_at ASC`
  );
  res.json(rows.map(r => r.time));
});

// POST 新成绩
app.post('/api/scores', async (req, res) => {
  const group = req.body.group.replace(/'/g, "''");
  const time = req.body.time;
  await db.exec(`INSERT INTO scores (group_name, time) VALUES ('${group}', ${time})`);
  res.json({ success: true });
});

// DELETE 某组全部成绩
app.delete('/api/scores/:group', async (req, res) => {
  const group = req.params.group.replace(/'/g, "''");
  await db.exec(`DELETE FROM scores WHERE group_name = '${group}'`);
  res.json({ success: true });
});

// DELETE 某组最近 N 条成绩
app.delete('/api/scores/:group/last/:n', async (req, res) => {
  const group = req.params.group.replace(/'/g, "''");
  const n = parseInt(req.params.n);
  const { rows } = await db.query(
    `SELECT id FROM scores WHERE group_name = '${group}' ORDER BY created_at DESC LIMIT ${n}`
  );
  const ids = rows.map(r => r.id).join(',');
  if (ids.length > 0) {
    await db.exec(`DELETE FROM scores WHERE id IN (${ids})`);
  }
  res.json({ success: true });
});

app.listen(PORT, () => console.log(`✅ Backend running at http://localhost:${PORT}`));
