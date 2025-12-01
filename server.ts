
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import jsonServer from 'json-server';
import express from 'express';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

app.use(middlewares);

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

app.use('/uploads', express.static(uploadDir));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.fieldname}${ext}`);
  }
});
const upload = multer({ storage });

app.post('/clientes/:id/upload', upload.single('logotipo'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Arquivo não enviado' });

  const id = req.params['id'];
  const filePath = `/uploads/${req.file.filename}`;

  const db = router.db;
  const client = (db.get('clientes') as any).find({ id: id }).value();
  if (!client) return res.status(404).json({ error: 'Cliente não encontrado' });

  (db.get('clientes') as any).find({ id: id }).assign({ logotipo: filePath }).write();

  return res.json({ id, logotipo: filePath });
});

app.use(router);

const PORT = process.env['PORT'] || 4000;
app.listen(PORT, () => console.log(`JSON Server running on port ${PORT}`));