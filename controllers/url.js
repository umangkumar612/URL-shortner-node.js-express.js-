const shortId = require('shortid');
const URL = require('../models/url'); // Assuming this path is correct

async function HandleGenerateNewShortURL(req, res) {
    const body = req.body;
    if (!body.url) {
        return res.status(400).json({ error: "URL is required" });
    }

    const shortID = shortId.generate();

    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
        createdBy : req.user._id,
    });

    const urls = await URL.find(); // 🔁 Fetch all shortened URLs from DB

    return res.render('home', {
        shortId: shortID,
        urls, // ✅ now 'urls' is available in EJS
    });
}

async function HandleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });

    if (!result) {
        return res.status(404).json({ error: "Short URL not found" });
    }

    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    });
}
    
module.exports = {
    HandleGenerateNewShortURL,
    HandleGetAnalytics,
};
