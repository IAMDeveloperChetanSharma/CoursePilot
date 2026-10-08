# CoursePilot — React Native Assignment

> Note: the assignment lists native Android/iOS as the platform choices. This submission intentionally uses **React Native + TypeScript**, because that is the requested implementation technology. The same architecture maps cleanly to native platform implementations.

## 1. Architecture

I used a lightweight **Clean Architecture / MVVM-style** structure: **Screens/Hooks → Domain use cases & repository contracts → Data repository → Mock API + AsyncStorage**. This keeps UI concerns separate from business logic and storage/network details while avoiding unnecessary abstraction for a 3-hour assignment.

## 2. Offline Support

Course responses are serialized into **AsyncStorage** after a successful API load. `CourseRepositoryImpl` checks connectivity with NetInfo; when offline it returns the cached courses. Lesson completion also updates the cached course data, so the latest local progress survives an offline restart.

## 3. Security

In production, authentication tokens should be stored in the platform secure storage: **iOS Keychain** and **Android Keystore-backed storage**. I would avoid storing access/refresh tokens in AsyncStorage.

## 4. Scale — 1M users / hundreds of courses

1. Add a real backend with pagination, authentication, authorization and CDN-backed course assets.
2. Use TanStack Query (or equivalent) for request caching, stale-time, retries and background refetching.
3. Move from a simple AsyncStorage cache to SQLite/WatermelonDB/Realm for larger offline datasets and indexed queries.
4. Add observability, crash reporting, analytics, performance monitoring and API rate limiting.
5. Add automated CI/CD, code signing, release channels, feature flags and server-driven configuration.

## 5. Second Platform

For iOS/macOS, I would keep the same domain/repository contracts and implement the presentation layer with **SwiftUI**, the data layer with `URLSession`, and offline persistence with **SwiftData/Core Data**. Authentication tokens would use **Keychain**. The architecture remains UI → ViewModel → Repository → API/Local Store.

## Run

```bash
npm install
npm start
```

For a native Android/iOS project, generate the platform folders with:

```bash
npx expo prebuild
```

Then run `npm run android` or `npm run ios` on the appropriate development machine.

## Demo login

The email and password are pre-filled. Any valid email + password of at least 6 characters will pass the mocked login flow.
