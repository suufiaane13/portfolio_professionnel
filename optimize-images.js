const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Créer le dossier optimisé s'il n'existe pas
const optimizedDir = path.join(__dirname, 'img', 'optimized');
if (!fs.existsSync(optimizedDir)) {
  fs.mkdirSync(optimizedDir, { recursive: true });
}

// Configuration des tailles d'images (largeur en pixels)
const sizes = {
  hero: { width: 1920 },
  thumbnail: { width: 300 }
};

// Fonction pour optimiser une image
async function optimizeImage(inputPath, outputPath, width) {
  try {
    await sharp(inputPath)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 80, effort: 6 })
      .toFile(outputPath);
    
    console.log(`Optimized: ${outputPath}`);
  } catch (error) {
    console.error(`Error optimizing ${inputPath}:`, error);
  }
}

// Traitement des images
async function processImages() {
  const images = [
    { name: 'hero_claire.jpg', type: 'hero' },
    { name: 'hero_sombre.jpg', type: 'hero' },
    { name: 'lamp.jpg', type: 'thumbnail' },
    { name: 'hero.avif', type: 'hero' }
  ];

  for (const img of images) {
    const inputPath = path.join(__dirname, 'img', img.name);
    const outputName = path.basename(img.name, path.extname(img.name)) + '.webp';
    const outputPath = path.join(optimizedDir, outputName);
    
    // Vérifier si le fichier source existe
    if (!fs.existsSync(inputPath)) {
      console.warn(`Source file not found: ${inputPath}`);
      continue;
    }

    // Optimiser l'image
    const width = sizes[img.type]?.width || 1200;
    await optimizeImage(inputPath, outputPath, width);
  }
}

processImages();
