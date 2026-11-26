# MarketMind — Marketing Analytics Dashboard

MarketMind is a marketing analytics dashboard designed to help users monitor campaign performance, explore marketing data, and generate AI-powered recommendations.

## Features

- Dashboard metrics for impressions, clicks, click-through rate (CTR), conversions, and cost per conversion
- Campaign filtering by platform, date range, and search
- Campaign performance table
- Interactive charts for impressions, clicks, and conversions
- Automatic campaign insights
- Gemini-powered AI campaign recommendations
- CSV upload to analyze campaign data
- Export filtered campaign data as a CSV file
- Dark and light theme support
- Responsive dashboard interface

## Technologies Used

- HTML
- CSS
- JavaScript
- Chart.js
- Gemini AI API

## Getting Started

1. Clone or download this repository.
2. Open the project folder.
3. Run the project using a local development server.
4. Open the dashboard in your browser.

If the project uses a backend for AI suggestions, start the backend server as well. The dashboard sends AI requests to the `/api/suggestions` endpoint.

## CSV Data Format

The dashboard expects these CSV columns:

```csv
Campaign,Platform,Date,Impressions,Clicks,Conversions,Ad_Spend_INR
Summer Sale,Instagram,2026-01-01,12500,625,38,7600
Summer Sale,Facebook,2026-01-01,9800,392,21,5100
```

Dates should use the `YYYY-MM-DD` format. Numeric fields should contain non-negative numbers, and clicks should not exceed impressions.

## Notes

- The included sample campaign data is fictional and intended for academic project demonstration.
- AI recommendations require the backend and Gemini API configuration to be set up.
- Do not upload API keys, passwords, or other secret configuration values to GitHub.

## Author

Naveen Kumar P

