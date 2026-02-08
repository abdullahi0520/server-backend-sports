import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3000;

const API_KEY = process.env.NFL_API_KEY; // store API key in Render's env vars

app.get('/live', async (req, res) => {
  try {
    const apiRes = await fetch("https://realtimesportsapi.com/api/v1/sports/football/leagues/nfl/events/live", {
      headers: { "Authorization": `Bearer ${API_KEY}` }
    });
    const games = await apiRes.json();

    // Example: pick Super Bowl teams (adjust as needed)
    const superBowl = games.find(g => g.homeTeam === "KC" && g.awayTeam === "BUF"); 

    if (!superBowl) return res.status(200).json({ message: "Game not live yet" });

    res.json({
      homeTeam: superBowl.homeTeam,
      homeScore: superBowl.homeScore,
      awayTeam: superBowl.awayTeam,
      awayScore: superBowl.awayScore,
      quarter: superBowl.quarter,
      clock: superBowl.clock,
      homeLogo: superBowl.homeLogo || "",
      awayLogo: superBowl.awayLogo || ""
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
