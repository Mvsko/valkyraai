const express = require('express');
const cors = require('cors');
const fs = require('fs');
const { checkStatus } = require('./checkStatus');

const app = express();
app.use(cors());
app.use(express.json());

const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

app.post('/api/message', async (req, res) => {
    const userMessage = req.body.message;
    const result = await checkStatus(userMessage);
    res.json(result);
});

app.get('/api/config', (req, res) => {
    res.json({
        webhookUrl: config.webhookUrl
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
