require("dotenv").config();

const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

app.post("/api/suggestions", async (req, res) => {
  try {
    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({
        error: "GROQ_API_KEY is missing from the environment variables."
      });
    }

    const campaignData = req.body;

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-20b",
          messages: [
            {
              role: "system",
              content:
                "You are a careful digital marketing analyst. Give exactly 3 useful, practical suggestions based only on the supplied campaign data. Use a simple numbered list in plain text—no tables, Markdown, HTML, or backslashes. Make each suggestion 2–3 sentences: state the campaign and platform, support the recommendation with the supplied calculated metrics, and explain the action to take. Compare platforms only within the same campaign. Use the supplied calculated CTR_percent, CPA_INR, and CPC_INR values; do not recalculate them. Recommend shifting budget only toward a platform with a lower CPA in that campaign. Do not claim a platform is best across all campaigns unless every campaign's data supports it. Do not mention ROI, revenue, profit, or conversion quality because those fields are not supplied. Do not invent metrics, percentages, targets, or campaign names. If the data does not support a clear recommendation, suggest what to measure instead. Finish every suggestion completely."
            },
            {
              role: "user",
              content: `Analyze these campaign metrics:\n${JSON.stringify(campaignData)}`
            }
          ],
          reasoning_effort: "low",
          max_tokens: 1500
        })
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error("Groq API error:", result);

      return res.status(response.status).json({
        error:
          result.error?.message ||
          "Groq could not generate suggestions."
      });
    }

    const suggestions = result.choices?.[0]?.message?.content;

    if (!suggestions) {
      return res.status(500).json({
        error: "Groq returned an empty response."
      });
    }

    return res.json({ suggestions });
  } catch (error) {
    console.error("Backend error:", error.message);

    return res.status(500).json({
      error: "Could not connect to Groq. Check the server and try again."
    });
  }
});

app.listen(PORT, () => {
  console.log(`MarketMind is running at http://localhost:${PORT}`);
});