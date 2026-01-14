import React, { useState, useEffect } from 'react';
import { Activity, Server, AlertCircle, CheckCircle2 } from 'lucide-react';

function App() {
    const [devices, setDevices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState(null);

    const fetchStatus = async () => {
        try {
            const response = await fetch('/api/status');
            const data = await response.json();
            setDevices(data);
            setLastUpdated(new Date());
            setLoading(false);
        } catch (error) {
            console.error('Error fetching status:', error);
        }
    };

    useEffect(() => {
        fetchStatus();
        const interval = setInterval(fetchStatus, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="dashboard-container">
            <div className="max-width-wrapper">
                <header className="dashboard-header">
                    <div className="header-branding">
                        <div className="icon-wrapper">
                            <Activity className="header-icon" />
                        </div>
                        <div>
                            <h1 className="header-title">
                                System Status
                            </h1>
                            <p className="header-subtitle">
                                HoneyBadger Video Green Server Infrastructure
                            </p>
                        </div>
                    </div>
                    {lastUpdated && (
                        <div className="header-status">
                            <div className="status-label">Last Updated</div>
                            <div className="status-time">
                                {lastUpdated.toLocaleTimeString()}
                            </div>
                        </div>
                    )}
                </header>

                <div className="devices-grid">
                    {devices.map((device) => (
                        <a
                            key={device.name}
                            href={device.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`device-card ${device.online ? 'online' : 'offline'}`}
                        >
                            <div className="card-bg-icon">
                                <Server />
                            </div>

                            <div className="card-content">
                                <div className="card-header">
                                    <div className={`status-icon-wrapper ${device.online ? 'online' : 'offline'}`}>
                                        {device.online ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
                                    </div>
                                    <span className={`status-badge ${device.online ? 'online' : 'offline'}`}>
                                        {device.online ? 'ONLINE' : 'OFFLINE'}
                                    </span>
                                </div>

                                <h3 className="device-name" title={device.name}>
                                    {device.name}
                                </h3>
                                <div className="device-info">
                                    {device.ip}
                                    <span className="device-port">:{device.port}</span>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
