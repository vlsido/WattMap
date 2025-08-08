# WattMap -- EV Charging App

A mobile application built with **React Native** and **TypeScript** that simulates the management of electric vehicle charging stations.

## Features

- **View charging locations on a map**
- **View a list of chargers**
- **Start charging** on a specific charger
- **View ongoing charging rate** if charging was started successfully
- **Stop ongoing charging**

## Setup instruction

For this app to work you will need to run the [Express.js backend](https://github.com/vlsido/WattMapBackend), and configure the **serverIp** on the frontend

### Backend

1. Clone the backend's repository

   ```bash
   git clone https://github.com/vlsido/WattMapBackend.git
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the server
   ```bash
   npm run start
   ```

### Frontend

1. Clone the frontend's repository (this one)

   ```bash
   git clone https://github.com/vlsido/WattMap.git
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Edit <root>/api/api.ts file, use your local ip address (e.g "192.168.0.101")

   ```
   export const serverIp = "192.168.0.101";
   ```

4. Start the app

   ```bash
   npm run start
   ```

## Technologies Used

- **React Native** (with Expo Framework)
- **TypeScript**
- **Express.js** (simple backend)

### Formatting/Linting

- **Prettier**
- **EsLint**

### Unit Testing

- **Jest**
- **React Native Testing Library**

## Testing

1. Install dependencies

   ```bash
   npm install
   ```

2. Run tests

   ```bash
   npm run test
   ```
