
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

const uploadDir = path.join(__dirname, 'public/uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

app.use('/public/uploads', express.static(uploadDir));

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

app.get('/clientes', (req, res, next) => {
  try {
    const db = router.db;
    let items = (db.get('clientes') as any).value() as any[];

    const page = Math.max(1, parseInt((req.query['page'] as string) || '1', 10));
    const pageSize = Math.max(1, parseInt((req.query['pageSize'] as string) || '10', 10));
    const q = ((req.query['search'] as string) || '').trim().toLowerCase();

    if (q) {
      items = items.filter(c => {
        const nome = (c.nome || '').toString().toLowerCase();
        return (
          nome.includes(q)
        );
      });
    }

    const total = items.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const currentPage = Math.min(page, totalPages);

    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;

    const paginated = items.slice(start, end);

    // expose total count so frontend can read it
    res.setHeader('X-Total-Count', String(total));
    res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');

    // return paginated array (keeps compatibility with json-server default)
    return res.json(paginated);
  } catch (err) {
    return next(err);
  }
});

app.use(router);

const PORT = process.env['PORT'] || 4000;
app.listen(PORT, () => console.log(`JSON Server running on port ${PORT}`));