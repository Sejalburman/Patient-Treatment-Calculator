# Patient Treatment Calculator

A simple React app for building a patient treatment/billing estimate.

## Features
- Patient details: Name, Date of Birth, Referral Date
- Treatments/Services table with a dropdown of predefined services, plus **Original Amount** and **Attorney Amount** columns side by side on the same row
- Add / remove treatment rows
- Automatic **Original Amount** total and **Attorney Amount** total, shown separately
- **Discount** entered as a percentage (%), applied only to the Attorney Amount, with the discount amount and the resulting Attorney Amount After Discount shown
- Print / Save as PDF
- Clear button to reset the form

All amounts are displayed in US Dollars ($).

## Project structure
```
patient-treatment-calculator/
├── package.json
├── vite.config.js
├── index.html
└── src/
    ├── main.jsx
    └── styles.css
```

## Setup & run

1. Install [Node.js](https://nodejs.org/) (v18 or later recommended).
2. Open a terminal in this project folder.
3. Install dependencies:
   ```
   npm install
   ```
4. Start the dev server:
   ```
   npm run dev
   ```
5. Open the local URL shown in the terminal (usually `http://localhost:5173`).

## Build for production
```
npm run build
```
This outputs a static, production-ready build in the `dist/` folder, which you can deploy to any static host.

## Customizing the service list
Edit the `SERVICE_LIST` array near the top of `src/main.jsx` to add, remove, or rename treatment/service options.
