![Version](https://img.shields.io/badge/version-1.0-blue.svg?cacheSeconds=2592000)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![runs with expo](https://img.shields.io/badge/Runs%20with%20Expo-000.svg?style=flat-square&logo=EXPO&labelColor=f3f3f3&logoColor=000)](https://expo.io/)
[![image](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/simcoder_here)
[![image](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/simcoder_here/)
[![image](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://www.youtube.com/channel/UCQ5xY26cw5Noh6poIE-VBog)
[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/simcoder)

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/SimCoderYoutube/InstagramClone">
    <img src="images/simcoder.png" alt="Logo" width="120" height="120">
  </a>

  <h3 align="center">Instagram Clone</h3>

  <p align="center">
    A Instagram clone app made with React Native and firebase
    <br />
    <a href="https://github.com/SimCoderYoutube/InstagramClone/wiki"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/SimCoderYoutube/InstagramClone/issues">Report Bug</a>
    ·
    <a href="https://github.com/SimCoderYoutube/InstagramClone/issues">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
      <a href="#-how-to-run-locally">How to Run Locally</a>
      <ul>
        <li><a href="#prerequisites-1">Prerequisites</a></li>
        <li><a href="#setup-firebase-configuration">Setup Firebase Configuration</a></li>
        <li><a href="#running-the-frontend-react-native-with-expo">Running the Frontend</a></li>
        <li><a href="#running-the-admin-panel-react-web-app">Running the Admin Panel</a></li>
        <li><a href="#deploying-the-backend-firebase-cloud-functions">Deploying the Backend</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#support">Support</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## ℹ️ About The Project

![alt text](images/mockup.png "Title")

This repo contains the project made in my youtube chanel called simcoder. This project is a clone of the Instagram android app.

It is made using React Native with Expo using firebase services (authentication, firestore and storage).
The admin panel is made with ReactJS.
The backend is all NodeJS

In the [master](https://github.com/SimCoderYoutube/InstagramClone/tree/master) branch you have the redesign project which I was previously selling in my website, however you still have access to the youtube series repo in the [youtube_series](https://github.com/SimCoderYoutube/InstagramClone/tree/youtube_series)

You can follow the youtube series in the following [link](https://www.youtube.com/watch?v=xE8UEX7vXVQ&list=PLxabZQCAe5fgatwOQny9wKJVs4YD6xkf1)

## 🆕 Getting Started

- ### **Prerequisites**

  - [React Native](https://reactnative.dev/)
  - [Expo](https://expo.dev/)
  - [Firebase](https://firebase.google.com/)

<!-- GETTING STARTED -->

- ### **Installation**

  In order to deploy the project you'll need to follow the [wiki page](https://github.com/SimCoderYoutube/InstagramClone/wiki/Setup-your-project) dedicated to this effect.

## 🏃 How to Run Locally

This project consists of three main parts: the React Native frontend, the React admin panel, and the Firebase backend. Follow the steps below to run each part locally.

### Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v12 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (for running the mobile app)
- [Firebase CLI](https://firebase.google.com/docs/cli) (for backend deployment)
- A [Firebase project](https://firebase.google.com/) with Firestore, Authentication, and Storage enabled

### Setup Firebase Configuration

1. Create a Firebase project at [firebase.google.com](https://firebase.google.com/)
2. Enable the following services:
   - Authentication (Email/Password)
   - Firestore Database
   - Cloud Storage
3. Get your Firebase configuration credentials
4. Update the Firebase config in the frontend and admin applications with your credentials

### Running the Frontend (React Native with Expo)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Expo development server:
   ```bash
   npm start
   ```

4. Choose how to run the app:
   - **Android**: Press `a` to open in Android emulator
   - **iOS**: Press `i` to open in iOS simulator (macOS only)
   - **Web**: Press `w` to open in web browser

### Running the Admin Panel (React Web App)

1. Navigate to the admin directory:
   ```bash
   cd admin
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. The admin panel will open at `http://localhost:3000`

### Deploying the Backend (Firebase Cloud Functions)

1. Navigate to the backend functions directory:
   ```bash
   cd backend/functions
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Login to Firebase:
   ```bash
   firebase login
   ```

4. Deploy the functions:
   ```bash
   firebase deploy --only functions
   ```

### Firestore and Storage Rules

The project includes Firestore and Storage security rules:
- `firestore_rules.txt` - Contains Firestore security rules
- `storage_rules.txt` - Contains Cloud Storage security rules

Apply these rules in your Firebase Console under the respective sections.

## 🚧 Roadmap

See the [open issues](https://github.com/SimCoderYoutube/InstagramClone/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->

## ➕ Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**. Please check the [Wiki](https://github.com/SimCoderYoutube/InstagramClone/wiki/How-to-Contribute)

## 🌟 Show your support

Give a ⭐️ if this project helped you!

And don't forget to subscribe to the [youtube chanel](https://www.youtube.com/c/SimpleCoder?sub_confirmation=1)

## 📝 License

Copyright © 2021 [SimCoder](https://github.com/simcoderYoutube).

This project is [Apache License 2.0](https://github.com/SimCoderYoutube/InstagramClone/blob/master/LICENSE) licensed. Some of the dependencies are licensed differently.

<!-- CONTACT -->

## 👤 Contact

**SimCoder**

- Website: www.simcoder.com
- Twitter: [@simcoder_here](https://twitter.com/simcoder_here)
- Github: [@simcoderYoutube](https://github.com/simcoderYoutube)
- Youtube: [SimCoder](https://www.youtube.com/channel/UCQ5xY26cw5Noh6poIE-VBog)
