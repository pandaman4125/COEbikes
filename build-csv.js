const fs = require('fs-extra');

async function buildCsv() {
  try {
    // Ensure the dist directory exists
    await fs.ensureDir('./dist');

    // Copy the CSV file from data directory to dist directory
    await fs.copyFile('src/data/inventory.csv', './dist/inventory.csv');
    
    console.log('CSV file has been copied to the dist directory.');
  } catch (error) {
    console.error('Error building CSV:', error);
  }
}

buildCsv();
