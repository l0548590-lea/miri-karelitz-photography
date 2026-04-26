import sharp from 'sharp';
import { readdirSync, statSync, renameSync, unlinkSync } from 'fs';
import { join, extname } from 'path';

const GALLERY_DIR = './public/gallery';
const MAX_WIDTH   = 1200;
const QUALITY     = 78;

let totalBefore = 0, totalAfter = 0, count = 0, errors = 0;

async function compressDir(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) { await compressDir(full); continue; }
    const ext = extname(entry).toLowerCase();
    if (!['.jpg','.jpeg','.png'].includes(ext)) continue;

    const before = statSync(full).size;
    totalBefore += before;
    const tmp = full + '.tmp';

    try {
      await sharp(full)
        .rotate()
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .jpeg({ quality: QUALITY, mozjpeg: true })
        .toFile(tmp);

      unlinkSync(full);
      renameSync(tmp, full);

      const after = statSync(full).size;
      totalAfter += after;
      count++;
      console.log(`✓ ${full.replace('public/gallery/','').padEnd(42)} ${(before/1024).toFixed(0)}KB → ${(after/1024).toFixed(0)}KB  (-${((1-after/before)*100).toFixed(0)}%)`);
    } catch(e) {
      try { unlinkSync(tmp); } catch{}
      console.error(`✗ ${full}: ${e.message}`);
      errors++;
    }
  }
}

console.log('דוחס תמונות...\n');
await compressDir(GALLERY_DIR);
console.log(`\n✅ סיום: ${count} תמונות, ${errors} שגיאות`);
console.log(`   לפני:  ${(totalBefore/1024/1024).toFixed(1)} MB`);
console.log(`   אחרי:  ${(totalAfter/1024/1024).toFixed(1)} MB`);
console.log(`   חסכון: ${((1-totalAfter/totalBefore)*100).toFixed(0)}%`);
