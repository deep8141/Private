const fs = require('fs');
const path = require('path');

// Configuration
const IMAGE_FOLDER = './image/';
const OUTPUT_FILE = './script.js';
const TEMPLATE_FILE = './script-template.js';

console.log('🔄 Starting image list generation...');

// Check if image folder exists
if (!fs.existsSync(IMAGE_FOLDER)) {
    console.error('❌ Error: Image folder not found!');
    console.error(`   Expected folder: ${IMAGE_FOLDER}`);
    console.error('   Please make sure the image/ folder exists in the same directory as this script.');
    process.exit(1);
}

try {
    // Read all files from image folder
    const files = fs.readdirSync(IMAGE_FOLDER);
    
    // Filter for image and video files
    const supportedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg', '.mp4', '.webm', '.ogg', '.avi', '.mov', '.mkv'];
    
    const mediaFiles = files.filter(file => {
        const ext = path.extname(file).toLowerCase();
        return supportedExtensions.includes(ext);
    });
    
    // Sort files alphabetically
    mediaFiles.sort();
    
    console.log(`✅ Found ${mediaFiles.length} media files in ${IMAGE_FOLDER}`);
    console.log('📁 Files found:');
    mediaFiles.forEach((file, index) => {
        console.log(`   ${index + 1}. ${file}`);
    });
    
    // Create the mediaFiles array string
    const mediaFilesArray = `const mediaFiles = [\n    // Auto-generated from ${IMAGE_FOLDER} folder\n    ${mediaFiles.map(file => `'${file}'`).join(',\n    ')}\n];`;
    
    // Read the template file
    let scriptContent;
    if (fs.existsSync(TEMPLATE_FILE)) {
        scriptContent = fs.readFileSync(TEMPLATE_FILE, 'utf8');
        console.log('📋 Using template file:', TEMPLATE_FILE);
    } else {
        // Create a basic template if none exists
        scriptContent = `// Auto-generated script.js
// Generated on: ${new Date().toLocaleString()}
// Total files: ${mediaFiles.length}

${mediaFilesArray}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { mediaFiles };
}

console.log('🎉 Auto-generated script loaded with', mediaFiles.length, 'files');
console.log('📁 Files:', mediaFiles);
`;
        console.log('📋 Created new template content');
    }
    
    // Replace the mediaFiles array in the template
    const updatedContent = scriptContent.replace(
        /const mediaFiles = \[[\s\S]*?\];/,
        mediaFilesArray
    );
    
    // Write the updated script
    fs.writeFileSync(OUTPUT_FILE, updatedContent, 'utf8');
    
    console.log(`\n✅ Successfully generated ${OUTPUT_FILE}`);
    console.log(`📊 Total media files: ${mediaFiles.length}`);
    console.log(`📁 Output file: ${OUTPUT_FILE}`);
    
    // Create a summary file
    const summary = `# Image Gallery Summary
Generated on: ${new Date().toLocaleString()}

## Folder Scanned
${IMAGE_FOLDER}

## Total Files Found
${mediaFiles.length}

## File List
${mediaFiles.map((file, index) => `${index + 1}. ${file}`).join('\n')}

## Supported Extensions
${supportedExtensions.join(', ')}

## Usage
Run this script whenever you add/remove images from the image/ folder:
\`\`\`bash
node generate-image-list.js
\`\`\`

This will automatically update your script.js file with the new file list.
`;
    
    fs.writeFileSync('./image-summary.md', summary, 'utf8');
    console.log('📝 Created summary file: image-summary.md');
    
} catch (error) {
    console.error('❌ Error occurred:', error.message);
    process.exit(1);
}
