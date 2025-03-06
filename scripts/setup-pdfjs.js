import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Create public directory if it doesn't exist
const publicDir = path.resolve(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Copy PDF.js worker from node_modules to public directory
const workerSrc = path.resolve(__dirname, '../node_modules/pdfjs-dist/build/pdf.worker.js');
const workerDest = path.resolve(publicDir, 'pdf.worker.min.js');

try {
  fs.copyFileSync(workerSrc, workerDest);
  console.log('PDF.js worker file copied to public directory');
} catch (error) {
  console.error('Error copying PDF.js worker file:', error);
  process.exit(1);
}