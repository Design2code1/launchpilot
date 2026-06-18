# Branding & App Customization

Guide to changing branding visual assets.

## App Name & Bundle IDs
Update these details inside `app.json`:
- `name`: App display label.
- `slug`: Expo URL slug path.
- `bundleIdentifier`: iOS bundle ID name.
- `package`: Android application package name.

## Theme & Branding Colors
Modify `src/theme/colors.ts` and `tailwind.config.js` to change global branding color palettes. Tailwind variables adapt dynamically.

## Splash & Icons
Replace assets inside `/assets` directory with your designs:
- `icon.png`: App logo (1024x1024).
- `splash-icon.png`: Splash screen logo.
- `adaptive-icon.png`: Android launcher icon configuration.
