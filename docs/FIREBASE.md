# Firebase Backend Alternative Guide

If you prefer Firebase over Supabase, follow this setup checklist.

## Step 1: Install Firebase SDKs
Add the necessary packages:
```bash
npm install @react-native-firebase/app @react-native-firebase/auth @react-native-firebase/firestore @react-native-firebase/storage --legacy-peer-deps
```

## Step 2: Configure Services
Re-write the auth and user service layers:
- `src/services/authService.ts`: replace `supabase.auth` calls with `@react-native-firebase/auth` implementations.
- `src/services/userService.ts`: replace profile database updates with Firestore collection updates.

## Step 3: Configure iOS/Android Configs
Download your `GoogleService-Info.plist` (iOS) and `google-services.json` (Android) from the Firebase Console, and register them as plugins inside your `app.json` configuration file.
