import express from 'express';
import cors from 'cors';
import tcpping from 'tcp-ping';
import { devices } from './devices.js';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Endpoint to get devices status
app.get('/api/status', async (req, res) => {
    const statusPromises = devices.map(device => {
        return new Promise((resolve) => {
            tcpping.probe(device.ip, device.port, (err, available) => {
                resolve({
                    ...device,
                    online: available,
                    lastChecked: new Date().toISOString()
                });
            });
        });
    });

    try {
        const results = await Promise.all(statusPromises);
        res.json(results);
    } catch (error) {
        console.error('Error checking status:', error);
        res.status(500).json({ error: 'Failed to check device status' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
