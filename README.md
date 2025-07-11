# Rubik's Cube Timer 🧩

A full-stack Rubik's Cube timer web app built with **React (TypeScript)** and **Node.js (Express)**, using **PGlite** for lightweight local data storage. Users can start/stop timers with the spacebar, view and manage time records, and organize them by groups. It is specially designed for 3x3 rubic cube. It only provides the scramble for 3x3 cube.

## 🚀 Features

- ⏱️ Spacebar-controlled cube timer
- 🔀 Random scramble generator
- 📋 Score list per group (with delete options)
- 📂 Group creation and deletion
- 💾 Local backend with Express + PGlite

## 🖼️ UI Overview

The app layout consists of:
- **Left panel**: Score list and group management
- **Right panel**: Scramble display and timer

## 🛠️ Getting Started

### Prerequisites

- Node.js
- npm

### 1. Clone the repository

```bash
git clone https://github.com/Elewsy1/Rubic-Cube-Timer.git
cd Rubic-Cube-Timer

cd backend
npm install
node server.js

cd ..
npm install
npm start

Runs on: http://localhost:3000
```

