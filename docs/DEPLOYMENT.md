# App Store & Play Store Deployment Guide

Guide to launching the application to stores using EAS Build.

## Production Builds
1. Generate EAS build settings:
   ```bash
   eas build:configure
   ```
2. Run build commands:
   - iOS App Store build:
     ```bash
     eas build --platform ios --profile production
     ```
   - Android Play Store Bundle:
     ```bash
     eas build --platform android --profile production
     ```

## Submitting to Stores
Submit your generated build assets directly to Google Play Console and App Store Connect:
```bash
eas submit --platform all
```
