const shortid = require('shortid');
const URL = require("../models/url")

async function handleGenerateNewShortUrl(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url required" })
  const shortID = shortid()

  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  })

  return res.status(200).json({ status: 'ID Generated', id: shortID })

}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalCLicks: result.visitHistory.length,
    analytics: result.visitHistory
  })
}


module.exports = {
  handleGenerateNewShortUrl,
  handleGetAnalytics
}