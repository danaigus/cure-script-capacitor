const { execSync } = require('child_process');
const os = require('os');
const path = require('path');
const fs = require('fs');

try {
  // Resolve the APK folder path
  const apkFolder = path.resolve(__dirname, 'android/app/build/outputs/apk/debug');

  // Check if the folder exists
  if (!fs.existsSync(apkFolder)) {
    console.error(`Error: APK folder does not exist at "${apkFolder}".`);
    console.error("Make sure the APK has been built before running this script.");
    process.exit(1);
  }

  // Open the folder based on the operating system
  console.log(`Opening the folder containing the APK: ${apkFolder}`);
  if (os.platform() === 'win32') {
    execSync(`start "" "${apkFolder}"`, { stdio: 'inherit' });
  } else if (os.platform() === 'darwin') {
    execSync(`open "${apkFolder}"`, { stdio: 'inherit' });
  } else {
    execSync(`xdg-open "${apkFolder}"`, { stdio: 'inherit' });
  }
} catch (error) {
  console.error('An error occurred while opening the APK folder:', error);
  process.exit(1);
}
