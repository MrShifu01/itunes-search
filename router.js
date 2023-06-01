import express from 'express';
import axios from 'axios';

const router = express.Router();

async function getResults(term) {
  console.log(term)
  try {
    const response = await axios.get(`https://itunes.apple.com/search?term=${term}&limit=5&media=music`);
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
  try {
    const results = await getResults(term);
    res.send(results);
  } catch (error) {
    res.status(500).send("Error retrieving results");
  }
});

export default router;
