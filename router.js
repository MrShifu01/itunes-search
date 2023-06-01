import express from 'express';
import axios from 'axios';

const router = express.Router();

async function getResults(term, media) {
  console.log(term, media)
  try {
    const response = await axios.get(`https://itunes.apple.com/search?term=${term}&media=${media}&limit=10`);
    const results = response.data;
    return results;
  } catch (error) {
    console.error("Error retrieving results:", error);
    throw error;
  }
}

// Handle the HTTP GET request to get all results
router.get('/', async (req, res) => {
  const term = req.query.term
  const media = req.query.media
  try {
    const results = await getResults(term, media);
    res.send(results);
  } catch (error) {
    res.status(500).send("Error retrieving results");
  }
});

export default router;
