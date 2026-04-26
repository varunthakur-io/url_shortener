import URL from '../models/urlModel.js';
import { nanoid } from 'nanoid';
import { getUser } from '../services/auth.js';
import { redisClient } from '../config/index.js';

export const shortenURL = async (req, res) => {
  const { originalURL } = req.body;
  if (!req.cookies.session_id) return res.redirect('/login');

  const user = getUser(req.cookies.session_id);
  if (!user) return res.redirect('/login');

  const createdBy = user._id;

  try {
    let url = await URL.findOne({ originalURL });

    if (url) {
      return res.json({ msg: 'URL_EXISTS' });
    } else {
      const shortURL = nanoid(8);
      const newURL = new URL({
        originalURL,
        shortURL,
        createdBy,
      });

      url = await newURL.save();

      // Fetch the existing cache
      let cachedUrls = await redisClient.get('urls');

      if (cachedUrls) {
        // Parse the cached data
        cachedUrls = JSON.parse(cachedUrls);

        // Add the new URL to the cached data
        cachedUrls.push(url);

        // Save the updated cache back to Redis
        redisClient.set('urls', JSON.stringify(cachedUrls), 'EX', 3600); // Cache expires in 1 hour
      }

      return res.json({
        msg: 'URL_SHORTENED',
        id: shortURL,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const redirectURL = async (req, res) => {
  const { shortURL } = req.params;

  try {
    // Check if the URL exists in the Redis cache
    let cachedUrls = await redisClient.get('urls');
    let url;

    if (cachedUrls) {
      cachedUrls = JSON.parse(cachedUrls);
      url = cachedUrls.find((cachedUrl) => cachedUrl.shortURL === shortURL);

      if (url) {
        // Increment the visit count in the cache
        url.visits.push({ timestamp: new Date() });

        // Update the Redis cache
        redisClient.set('urls', JSON.stringify(cachedUrls), 'EX', 3600); // Cache expires in 1 hour

        // Redirect to the original URL
        return res.redirect(url.originalURL);
      }
    }

    // If not found in the cache, fetch from the database
    url = await URL.findOne({ shortURL });

    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }

    // Log visit information in the database
    url.visits.push({}); // Default timestamp will be applied
    await url.save();

    // Update the Redis cache with the latest data
    if (cachedUrls) {
      cachedUrls.push(url);
    } else {
      cachedUrls = [url];
    }
    redisClient.set('urls', JSON.stringify(cachedUrls), 'EX', 3600); // Cache expires in 1 hour

    // Redirect to the original URL
    res.redirect(url.originalURL);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteURL = async (req, res) => {
  const { id } = req.params;

  try {
    const url = await URL.findByIdAndDelete(id);

    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }

    // Optionally, update the Redis cache if needed
    let cachedUrls = await redisClient.get('urls');
    if (cachedUrls) {
      cachedUrls = JSON.parse(cachedUrls).filter((cachedUrl) => cachedUrl._id !== id);
      redisClient.set('urls', JSON.stringify(cachedUrls), 'EX', 3600); // Cache expires in 1 hour
    }

    return res.status(200).json({ message: 'URL deleted successfully' });
  } catch (error) {
    console.error('Error deleting URL:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};
