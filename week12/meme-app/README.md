# Meme Generator (N322 Week 12)

Simple React Native / Expo app for generating memes from templates. This project was created for class `N322` and demonstrates passing params between screens, loading remote images, and basic text overlays.

**Status:** Starter app — UI and navigation wired, editor + result screens scaffolded.

**Table of contents**

- **Overview:** Quick summary of purpose.
- **Prerequisites:** What you need installed.
- **Install & Run:** Commands to run locally (PowerShell / Windows).
- **Project Structure:** Key files and routes.
- **How it works:** Data flow for selecting templates and editing.
- **Troubleshooting:** Common issues and fixes.
- **Contributing:** How to extend.

**Overview**

- **Purpose:** Pick a meme template, enter top/bottom text, preview the result.
- **Tech:** React Native + Expo Router (file-based routing). Designed to run with Expo.

**Prerequisites**

- **Node.js & npm:** Install Node 18+ (or current LTS).
- **Expo:** Optional global install `npm i -g expo-cli` or use `npx expo`.
- **Device / Simulator:** Expo Go on mobile or Android/iOS simulator.

**Install & Run (PowerShell)**

```powershell
# from project root
npm install
# start the dev server
npx expo start
```

Open the project using Expo Dev Tools (browser) and run on a simulator or your device with Expo Go.

**Project Structure (important files)**

- **`app/index.tsx`**: Main screen. Renders `MEME_TEMPLATES`, shows thumbnails and passes selected template data to the editor screen.
- **`app/editor.tsx`**: Editor screen. Reads params (`imageUrl`, `templateName`) from `useLocalSearchParams()` and shows the selected image and inputs for top/bottom text. Pressing Preview navigates to `/result` with params.
- **`app/(tabs)/_layout.tsx`**, **`app/_layout.tsx`**: App layout and tab scaffolding (if present).
- **`assets/`**: Static assets (icons, fonts, etc.).

If you rename files or use dynamic routes, make sure the route names match the code that pushes params (the app expects `imageUrl` and `templateName` in the editor route).

**How it works (data flow)**

- The main list of templates is an in-memory array `MEME_TEMPLATES` in `app/index.tsx` and each template contains `{ id, name, imgUrl }`.
- When a template is tapped, `handleSelectTemplate()` calls `router.push({ pathname: '/editor', params: { imageUrl: template.imgUrl, templateName: template.name } })`.
- `app/editor.tsx` uses `useLocalSearchParams()` to read `imageUrl` and `templateName` (note: this can return `string | string[] | undefined`, so the code normalizes to a single string before passing to `<Image>`).

**Common issues & fixes**

- **Image not loading / errors in `<Image>`**: Check template URLs — they must include the scheme `https://`. Example bug: `https//i.imgflip.com/1ur9b0.jpg` (missing colon) will fail.
- **`Image` type errors (TS)`:`** If `useLocalSearchParams()` returns an array, normalize it before using as an `Image` uri: `const imageUri = Array.isArray(imageUrl) ? imageUrl[0] : imageUrl;` then use `source={{ uri: imageUri }}`.
- **Undefined handler error when tapping template**: Ensure `handleSelectTemplate` is defined and that it passes `imgUrl` (not `imageUrl`) from the template object.
- **fontWeight warnings**: React Native typings prefer font weights as strings (e.g. `fontWeight: "600"`).

**Extending the app**

- Add more templates to `MEME_TEMPLATES` or fetch templates from an API.
- Implement `/result` screen to render text overlays on the image and export/save the final meme.
- Use `react-native-canvas` or `react-native-view-shot` to rasterize the meme with text and save to camera roll.

**Development tips**

- Keep routes consistent: if you switch to file-based dynamic routes (e.g. `app/editor/[id].tsx`), update `handleSelectTemplate` to push the correct pathname and/or look up the template by id on the editor screen.
- Use Expo DevTools to view logs and QR codes for easy device testing.

**License & Contribution**

- This repository is a class project — treat it as educational code. If you'd like to contribute, open an issue or a PR with a short description of what you changed.

---

If you'd like, I can:

- Scaffold a `app/result.tsx` that takes `imageUrl`, `topText`, `bottomText` and renders a preview.
- Convert the templates into a remote JSON source and add a fetch + loading state.

Happy hacking!
