<h1 align="center">Daily Budget</h1>
A mobile budget tracker that splits your monthly budget into smart daily allowances — automatically adjusting based on how much you spend each day.

----

## Screenshots & Video

| Homescreen | Onboarding | Adding an expense |
|------|---------|--------------|
| ![](https://github.com/user-attachments/assets/a7170a0a-eaeb-4152-8828-5db11d5b0ba6) | ![](https://github.com/user-attachments/assets/a40e8270-b2d2-4147-884b-39dbf2fe3311) | ![](https://github.com/user-attachments/assets/03b6313b-4272-421c-81d6-8421a1706029) |

----

## Features:
- Set your monthly budget, currency, billing period start day, and how overspending is handled
- Two overflow strategies — carry yesterday's exact balance forward, or redistribute the remaining monthly budget evenly across remaining days
- Daily dashboard showing remaining budget, amount spent today, days left in the period, monthly totals, and tomorrow's projected allowance
- Add expenses with a category, description, and optional custom date and time
- Browse all expenses from the current billing period, grouped by day
- Light mode, dark mode, and automatic system theme detection

## Getting Started

### Prerequisites
- Node.js 18+
- [Expo Go](https://expo.dev/client) app on your phone, or an Android/iOS emulator

### Running locally
```bash
git clone https://github.com/mikolajpochec/daily-budget-app
cd daily-budget-app
npm install
npx expo start
```

## Build

To build an APK:
```bash
git clone https://github.com/mikolajpochec/daily-budget-app
cd android/
./gradlew assembleRelease
```

## Release

iOS and Android releases are planned on the App Store and Google Play.

## License
This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## Third-party licenses

[Bricolage Grotesque](https://fonts.google.com/specimen/Bricolage+Grotesque) font by Mathieu Triay, licensed under the [SIL Open Font License 1.1](assets/fonts/OFL.txt).
