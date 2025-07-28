const express = require('express');
const {HandleGenerateNewShortURL , HandleGetAnalytics} = require('../controllers/url');
const router = express.Router();

router.post('/', HandleGenerateNewShortURL);
  
router.get('./analytics/:shortId' ,HandleGetAnalytics)
module.exports = router;