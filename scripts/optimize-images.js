// scripts/optimize-images.js
const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function optimizeImages() {
  const sourceDir = './public/images';
  const outputDir = './public/images/optimized';

  async function ensureDirectoryExists(directory) {
    try {
      await fs.mkdir(directory, { recursive: true });
    } catch (error) {
      if (error.code !== 'EEXIST') throw error;
    }
  }
  
  async function processDirectory(directory) {
    const files = await fs.readdir(directory);
    
    for (const file of files) {
      const filePath = path.join(directory, file);
      const stat = await fs.stat(filePath);
      
      if (stat.isDirectory()) {
        if (path.basename(filePath) !== 'optimized') {
          await processDirectory(filePath);
        }
        continue;
      }
      
      if (!file.toLowerCase().endsWith('.png')) continue;
      
      try {
        const image = sharp(filePath);
        const metadata = await image.metadata();
        const basename = path.basename(file, '.png');
        const relativePath = path.relative(sourceDir, path.dirname(filePath));
        const targetDir = path.join(outputDir, relativePath);
        
        await ensureDirectoryExists(targetDir);
        
        // Calculer les dimensions avec des entiers
        const normalWidth = Math.floor(metadata.width / 2);
        const doubleWidth = metadata.width;
        const tripleWidth = Math.floor(metadata.width * 1.5);
        
        // Générer les versions
        await Promise.all([
          // Version normale
          sharp(filePath)
            .resize(normalWidth)
            .png({ quality: 85 })
            .toFile(path.join(targetDir, `${basename}.png`)),
          
          // Version 2x
          sharp(filePath)
            .resize(doubleWidth)
            .png({ quality: 85 })
            .toFile(path.join(targetDir, `${basename}-2x.png`)),
          
          // Version 3x
          sharp(filePath)
            .resize(tripleWidth)
            .png({ quality: 85 })
            .toFile(path.join(targetDir, `${basename}-3x.png`))
        ]);
        
        console.log(`✅ Optimized: ${file}`);
      } catch (error) {
        console.error(`❌ Error processing ${file}:`, error);
      }
    }
  }
  
  await ensureDirectoryExists(outputDir);
  await processDirectory(sourceDir);
  console.log('✨ Optimization complete! Check the "optimized" folder.');
}

optimizeImages().catch(console.error);