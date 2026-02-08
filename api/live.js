export default async function handler(req, res) {
  try {
    const apiRes = await fetch("https://realtimesportsapi.com/api/v1/sports/football/leagues/nfl/events/live", {
      headers: { "Authorization": "Bearer YOUR_API_KEY" }
    });
    const games = await apiRes.json();

    // Find the game you care about (Super Bowl)
    const superBowl = games.find(g => g.homeTeam === "KC" && g.awayTeam === "BUF"); 

    if (!superBowl) return res.status(200).json({ message: "Game not live yet" });

    res.status(200).json({
      homeTeam: superBowl.homeTeam,
      homeScore: superBowl.homeScore,
      awayTeam: superBowl.awayTeam,
      awayScore: superBowl.awayScore,
      quarter: superBowl.quarter,
      clock: superBowl.clock,
      homeLogo: superBowl.homeLogo || "",
      awayLogo: superBowl.awayLogo || ""
    });
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
}
