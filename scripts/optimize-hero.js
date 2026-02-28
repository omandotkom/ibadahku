#!/usr/bin/env node
/**
 * Hero Image Optimizer Script
 * 
 * Menggunakan Sharp untuk mengoptimasi hero-image.jpg:
 * 1. Kompres JPEG original
 * 2. Generate WebP version
 * 3. Generate AVIF version
 * 4. Create multiple sizes untuk responsive images
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const INPUT_FILE = path.join(__dirname, '../public/assets/hero-image.jpg');
const OUTPUT_DIR = path.join(__dirname, '../public/assets/hero-optimized');

// Breakpoints untuk responsive images
const SIZES = [
  { width: 480, suffix: 'sm' },   // Mobile
  { width: 768, suffix: 'md' },   // Tablet
  { width: 1200, suffix: 'lg' },  // Desktop
  { width: 1920, suffix: 'xl' },  // Large Desktop (full HD)
];

// Format dan kualitas
const FORMATS = [
  { format: 'jpeg', quality: 80, ext: 'jpg' },
  { format: 'webp', quality: 80, ext: 'webp' },
  { format: 'avif', quality: 70, ext: 'avif' },
];

async function getImageInfo(filePath) {
  const stats = fs.statSync(filePath);
  const metadata = await sharp(filePath).metadata();
  return {
    size: stats.size,
    width: metadata.width,
    height: metadata.height,
    format: metadata.format,
  };
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

async function optimizeImage() {
  console.log('🖼️  Hero Image Optimizer\n');
  
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Get original image info
  console.log('📊 Original Image Info:');
  const originalInfo = await getImageInfo(INPUT_FILE);
  console.log(`   Size: ${formatBytes(originalInfo.size)}`);
  console.log(`   Dimensions: ${originalInfo.width}x${originalInfo.height}`);
  console.log(`   Format: ${originalInfo.format}\n`);

  const results = [];

  // Process each format and size
  for (const format of FORMATS) {
    console.log(`🔧 Processing ${format.format.toUpperCase()}...`);
    
    for (const size of SIZES) {
      const outputFilename = `hero-${size.suffix}.${format.ext}`;
      const outputPath = path.join(OUTPUT_DIR, outputFilename);
      
      try {
        let pipeline = sharp(INPUT_FILE)
          .resize(size.width, null, { 
            withoutEnlargement: true,
            fit: 'inside'
          });

        // Apply format-specific settings
        switch (format.format) {
          case 'jpeg':
            pipeline = pipeline.jpeg({ 
              quality: format.quality, 
              progressive: true,
              mozjpeg: true 
            });
            break;
          case 'webp':
            pipeline = pipeline.webp({ 
              quality: format.quality,
              effort: 6 
            });
            break;
          case 'avif':
            pipeline = pipeline.avif({ 
              quality: format.quality,
              effort: 4 
            });
            break;
        }

        await pipeline.toFile(outputPath);
        
        const outputInfo = await getImageInfo(outputPath);
        const reduction = ((originalInfo.size - outputInfo.size) / originalInfo.size * 100).toFixed(1);
        
        results.push({
          filename: outputFilename,
          size: outputInfo.size,
          dimensions: `${outputInfo.width}x${outputInfo.height}`,
          reduction: format.format === 'jpeg' && size.suffix === 'xl' ? reduction : null,
        });

        console.log(`   ✓ ${outputFilename.padEnd(20)} ${formatBytes(outputInfo.size).padStart(10)}`);
      } catch (err) {
        console.error(`   ✗ Failed to create ${outputFilename}:`, err.message);
      }
    }
    console.log('');
  }

  // Print summary
  console.log('📈 Optimization Summary:\n');
  console.log('┌─────────────────────┬────────────┬─────────────┬────────────┐');
  console.log('│ Filename            │ Size       │ Dimensions  │ Reduction  │');
  console.log('├─────────────────────┼────────────┼─────────────┼────────────┤');
  
  for (const r of results) {
    const reductionStr = r.reduction ? `${r.reduction}%` : '-';
    console.log(
      `│ ${r.filename.padEnd(19)} │ ${formatBytes(r.size).padStart(10)} │ ${r.dimensions.padStart(11)} │ ${reductionStr.padStart(10)} │`
    );
  }
  
  console.log('└─────────────────────┴────────────┴─────────────┴────────────┘');
  
  // Calculate total savings for xl sizes (comparable to original)
  const originalXL = results.find(r => r.filename === 'hero-xl.jpg');
  if (originalXL) {
    const savings = ((originalInfo.size - originalXL.size) / originalInfo.size * 100).toFixed(1);
    console.log(`\n💡 File size reduction: ${savings}% (JPEG XL vs Original)`);
    console.log(`   Original: ${formatBytes(originalInfo.size)}`);
    console.log(`   Optimized JPEG: ${formatBytes(originalXL.size)}`);
    
    const webpXL = results.find(r => r.filename === 'hero-xl.webp');
    if (webpXL) {
      console.log(`   WebP XL:  ${formatBytes(webpXL.size)} (${((1 - webpXL.size/originalInfo.size) * 100).toFixed(1)}% smaller)`);
    }
  }

  console.log('\n✅ Optimization complete!');
  console.log(`📁 Files saved to: ${OUTPUT_DIR}`);
}

optimizeImage().catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
