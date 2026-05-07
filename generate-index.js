const fs = require('fs');
const path = require('path');

const scriptsDir = path.join(__dirname, 'Scripts collection');
const outputDir = path.join(__dirname, 'public', 'assets');
const outputFile = path.join(outputDir, 'scripts.json');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

try {
  if (!fs.existsSync(scriptsDir)) {
    console.warn(`[Warn] Directory not found: ${scriptsDir}`);
    fs.writeFileSync(outputFile, JSON.stringify([]));
    process.exit(0);
  }

  const files = fs.readdirSync(scriptsDir);
  const scripts = files.map(file => {
    const stats = fs.statSync(path.join(scriptsDir, file));
    return {
      name: file,
      size: stats.size,
      lastModified: stats.mtime
    };
  });

  fs.writeFileSync(outputFile, JSON.stringify(scripts, null, 2));
  console.log(`[Success] Generated ${outputFile} with ${scripts.length} scripts.`);
} catch (error) {
  console.error(`[Error] Failed to generate index:`, error);
  process.exit(1);
}
