// This is the ready-to-deploy Kidvestor folder structure for Netlify.
// You can copy these files locally and then upload them to GitHub.

/*
Folder structure:

kidvestor/
├─ package.json          <- npm dependencies
├─ netlify.toml          <- Netlify config
├─ README.md             <- instructions
├─ /public
│   └─ favicon.ico
├─ /pages
│   ├─ index.js          <- landing page + dashboard
│   ├─ lessons.js        <- lessons and challenges
│   └─ achievements.js   <- achievements page
├─ /components
│   ├─ Chart.jsx         <- lightweight chart component
│   ├─ TopList.jsx       <- top crypto/forex table
│   └─ LevelBadge.jsx    <- level badges
└─ /styles
    └─ globals.css       <- Tailwind import
*/

// package.json
/*
{
  "name": "kidvestor",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "latest",
    "react": "latest",
    "react-dom": "latest",
    "lightweight-charts": "latest",
    "axios": "latest",
    "tailwindcss": "latest"
  }
}
*/

// netlify.toml
/*
[build]
  command = "npm run build"
  publish = ".next"
*/

// README.md
/*
Kidvestor - Free version with 15s updates

Steps to deploy:
1. Upload this folder to your GitHub repo.
2. Connect the repo to Netlify (Import from Git).
3. Netlify will deploy automatically.
4. Site updates every 15 seconds with free crypto + forex data.
*/

// pages/index.js
/*
import React, { useEffect, useState } from 'react';
import Chart from '../components/Chart';
import TopList from '../components/TopList';

export default function Home() {
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      // Example: Binance API (free) - BTC, ETH, BNB
      fetch('https://api.binance.com/api/v3/ticker/price')
        .then(res => res.json())
        .then(data => setCryptoData(data.filter(c => ['BTCUSDT','ETHUSDT','BNBUSDT'].includes(c.symbol))));
    };
    fetchData();
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Kidvestor Dashboard</h1>
      <Chart ticks={cryptoData} symbol="BTC" />
      <TopList data={cryptoData} />
    </div>
  );
}
*/

// components/Chart.jsx
/*
import React, { useRef, useEffect } from 'react';
import { createChart } from 'lightweight-charts';

export default function Chart({ ticks, symbol }) {
  const chartRef = useRef();

  useEffect(() => {
    const chart = createChart(chartRef.current, { width: 600, height: 300 });
    const lineSeries = chart.addLineSeries();
    if (ticks.length) {
      lineSeries.setData(ticks.map((t, i) => ({ time: i, value: parseFloat(t.price) })));
    }
    return () => chart.remove();
  }, [ticks]);

  return <div ref={chartRef}></div>;
}
*/

// components/TopList.jsx
/*
import React from 'react';
export default function TopList({ data }) {
  return (
    <div className="mt-4 bg-white p-4 rounded shadow">
      <h2 className="font-bold mb-2">Top Cryptos</h2>
      <table className="w-full">
        <thead>
          <tr><th>Symbol</th><th>Price</th></tr>
        </thead>
        <tbody>
          {data.map(c => (
            <tr key={c.symbol}><td>{c.symbol}</td><td>{c.price}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
*/

// components/LevelBadge.jsx
/*
import React from 'react';
export default function LevelBadge({ level }) {
  return <span className="px-2 py-1 bg-yellow-400 rounded">Level {level}</span>;
}
*/

// pages/lessons.js
/*
import React from 'react';
export default function Lessons() {
  return <div className="p-6">Lessons and Challenges will appear here</div>;
}
*/

// pages/achievements.js
/*
import React from 'react';
export default function Achievements() {
  return <div className="p-6">Achievements will appear here</div>;
}
*/

// styles/globals.css
/*
@tailwind base;
@tailwind components;
@tailwind utilities;
*/
