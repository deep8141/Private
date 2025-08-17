# 🚀 Automatic Image Gallery Generator

This system automatically scans your `image/` folder and generates the `script.js` file with all your images!

## 📁 Files Created

- **`generate-image-list.js`** - Node.js script that scans your image folder
- **`script-template.js`** - Template containing all the gallery code
- **`generate-images.bat`** - Windows batch file for easy execution
- **`README-GENERATOR.md`** - This file

## 🎯 How It Works

1. **Scans** your `image/` folder for all image/video files
2. **Filters** for supported formats (JPG, PNG, MP4, etc.)
3. **Generates** the `mediaFiles` array automatically
4. **Updates** your `script.js` file
5. **Creates** a summary report

## 🚀 Quick Start (Windows)

### Option 1: Double-click (Easiest)
1. **Double-click** `generate-images.bat`
2. **Wait** for the script to complete
3. **Check** the generated `script.js` file

### Option 2: Command Line
```bash
node generate-image-list.js
```

## 🚀 Quick Start (Mac/Linux)

```bash
node generate-image-list.js
```

## 📋 Requirements

- **Node.js** installed on your computer
- **Download from**: https://nodejs.org/

## 🔄 How to Use

### 1. Add/Remove Images
- **Add images** to your `image/` folder
- **Remove images** from your `image/` folder

### 2. Generate New List
- **Run** `generate-images.bat` (Windows) or `node generate-image-list.js` (Mac/Linux)
- **Wait** for completion
- **Refresh** your HTML page

### 3. That's It!
Your gallery will automatically show all new images!

## 📊 Supported File Formats

### Images
- JPG, JPEG, PNG, GIF, BMP, WebP, SVG

### Videos
- MP4, WebM, OGG, AVI, MOV, MKV

## 📝 What Gets Generated

### 1. Updated `script.js`
- Contains all your images in the `mediaFiles` array
- Ready to use immediately

### 2. `image-summary.md`
- Summary of all files found
- File count and list
- Usage instructions

## 🔧 Customization

### Change Password
Edit `script-template.js`:
```javascript
const GALLERY_PASSWORD = 'YourNewPassword';
```

### Change Items Per Page
Edit `script-template.js`:
```javascript
let itemsPerPage = 100; // Change from 50 to 100
```

### Add New File Types
Edit `generate-image-list.js`:
```javascript
const supportedExtensions = [
    '.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg',
    '.mp4', '.webm', '.ogg', '.avi', '.mov', '.mkv',
    '.your-extension' // Add new extensions here
];
```

## 🚨 Troubleshooting

### "Node.js not found"
- **Install Node.js** from https://nodejs.org/
- **Restart** your computer after installation

### "Image folder not found"
- **Make sure** you have an `image/` folder
- **Run** the script from the same directory as your `image/` folder

### "Permission denied"
- **Run as Administrator** (Windows)
- **Use sudo** (Mac/Linux): `sudo node generate-image-list.js`

## 📈 Benefits

✅ **Automatic** - No manual typing of filenames
✅ **Fast** - Generates in seconds
✅ **Accurate** - Always up-to-date with your folder
✅ **Flexible** - Works with any image/video format
✅ **Easy** - Just double-click to run

## 🔄 Workflow

```
Add Images → Run Generator → Gallery Updated!
    ↓              ↓            ↓
image/ folder → generate-images.bat → script.js updated
```

## 💡 Pro Tips

1. **Run the generator** whenever you add new images
2. **Keep your images organized** in the `image/` folder
3. **Use descriptive filenames** for better gallery experience
4. **Backup your `script.js`** before running the generator

## 🎉 Success!

After running the generator:
- Your `script.js` will contain all your images
- The gallery will work immediately
- No more manual filename editing!

---

**Happy Gallery Building! 🖼️✨**
