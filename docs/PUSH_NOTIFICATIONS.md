# Push Notifications Setup

LaunchPilot RN uses **Expo Notifications** for remote push delivery.

## Configuration Requirements
Push notification capabilities require a physical mobile device running a Custom Development Build. They will not function properly inside iOS/Android simulators.

## Step-by-Step Setup
1. Authenticate with EAS:
   ```bash
   eas login
   ```
2. Configure project configuration:
   ```bash
   eas project:init
   ```
3. Generate notifications credentials:
   Create an Apple Developer APNs key or Android FCM credential and upload them to the EAS dashboard:
   ```bash
   eas credentials
   ```
4. Build the application:
   ```bash
   eas build --platform all
   ```
