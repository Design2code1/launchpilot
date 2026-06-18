# Local Installation Guide

Detailed instructions on how to set up LaunchPilot RN on your local machine.

## Prerequisites
Ensure you have the following installed:
- Node.js (v18+)
- npm or yarn
- Expo Go app on physical device (or iOS/Android simulators)

## Setup Steps
1. Clone the project or extract the downloaded zip file:
   ```bash
   cd LaunchPilotRN
   ```
2. Install dependencies with legacy peer dependencies to avoid conflict:
   ```bash
   npm install --legacy-peer-deps
   ```
3. Set up environment variables:
   Copy `.env.example` to `.env` and add your project configurations:
   ```bash
   cp .env.example .env
   ```
4. Run the Expo dev server:
   ```bash
   npx expo start
   ```
5. Scan the QR code using your device's camera (iOS) or the Expo Go application (Android).
