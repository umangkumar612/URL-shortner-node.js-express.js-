const shortId = require('shortid');
const URL = require('../models/url'); // Assuming this path is correct for your URL model

async function HandleGenerateNewShortURL(req, res) {
    const body = req.body;
    if (!body.url) {
        return res.status(400).json({ error: "URL is required" });
    }

    // Corrected: Call shortId.generate() to get a new unique ID
    const shortID = shortId.generate();

    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
    });

    return res.json({ id: shortID });
} 

async function HandleGetAnalytics(req,res) {
    const shortId = req.params.shortId;
   const result = await URL.findOne({shortId})
    return res.json({totalClickes : result.visitHistory.length , analytics:result.visitHistory})
}

module.exports = {
    HandleGenerateNewShortURL,
    HandleGetAnalytics,
};