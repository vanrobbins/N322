# Todo List (N322 Week 3)

A small React Native (Expo) todo list app.

It supports:

- Adding tasks
- Toggling tasks as completed
- Deleting tasks
- Clearing all completed tasks

This README explains how to run the app locally and contains basic development notes.

## Prerequisites

- Node.js (14+ recommended)
- Expo (you can use the CLI via `npx expo`)
- Expo Go on a mobile device for quick testing (optional)

## Install

CD to project root from repo
From the project root ( `todo-list` folder) install dependencies:

`npm install`

## Run the app

Start the Expo dev server:

`npx expo start`

- Scan the QR code with Expo Go to run on a mobile device, or press `w` to run in a browser (dependencies may be needed).

## Developer notes

- The app stores todo items in component state (`useState`) in `App.js`. Items are objects with shape `{ id, name, completed }`.
- The `FlatList` component is used to render items efficiently.
- The "Clear Completed" control is disabled/greyed when there are no completed tasks and becomes active/red when there are completed tasks.
- UI styling is defined in `App.js` via `StyleSheet.create` — update styles there to change appearance.
