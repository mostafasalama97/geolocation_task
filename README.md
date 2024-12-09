# GeoJSON Map Application

## Description

A full-stack application that displays GeoJSON data on a Mapbox globe map and in a paginated list. Built with Node.js, Express, Next.js, React, and Mapbox GL JS.

## Technologies Used

- **Backend**: Node.js, Express, Faker.js
- **Frontend**: Next.js, React, Mapbox GL JS, PrimeReact
- **Others**: Docker, Docker Compose

## Installation

### Back-end
### 1. Install dependencies:
```bash
   npm install
```
### 2. Add .env file with:
PORT=5000
3. to start backend
```
  npm run start
```
### Front-end
### 1. Install dependencies:
```bash
   npm install
```
### 2. Add .env file with:
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_MAPBOX_TOKEN="access token"

### 3. to start frontend
```
  npm run dev
```
