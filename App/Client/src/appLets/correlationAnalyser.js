import React, { useState } from 'react';
import Papa from 'papaparse';
import { ResponsiveScatterPlot } from '@nivo/scatterplot';
import * as math from 'mathjs';
import { Button } from '@mui/material';


const interpolate = (x, x0, x1, y0, y1) => {
    return y0 + ((x - x0) * (y1 - y0)) / (x1 - x0);
};

const CorrelationAnalyzer = ({ roomUsageData }) => {
    const [csvData, setCsvData] = useState([]);
    const [correlation, setCorrelation] = useState(null);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        Papa.parse(file, {
            complete: (result) => {
                const parsedData = result.data.map(item => ({
                    time: new Date(item.time).getTime(),
                    value: parseFloat(item.value)
                }));
                setCsvData(parsedData);
            },
            header: true,
        });
    };

    const calculateCorrelation = () => {
        let roomTimes = roomUsageData.map(entry => new Date(entry.time).getTime());
        let roomValues = roomUsageData.map(entry => entry.value ? 1 : 0);

        let userTimes = csvData.map(entry => entry.time);
        let values = csvData.map(entry => entry.value);
        values.pop();
        if (values.length > roomValues.length) {
            // vector1 is longer, truncate vector1
            values = values.slice(0, roomValues.length);
            userTimes = values.slice(0, roomValues.length);
        } else if (roomValues.length > values.length) {
            // vector2 is longer, truncate vector2
            roomValues = roomValues.slice(0, values.length);
            roomTimes = roomValues.slice(0, values.length);
        }

        let mean = math.mean(values);
        let stdDev = math.std(values);


        // Normalize to have mean 0 and standard deviation 1
        const userValues = values.map(val => (val - mean) / stdDev);

        // Interpolate user values to match room times
        const interpolatedUserValues = roomTimes.map(roomTime => {
            let idx = userTimes.findIndex(time => time > roomTime);
            if (idx === -1) idx = userTimes.length - 1;
            if (idx === 0) return userValues[0];
            const t0 = userTimes[idx - 1];
            const t1 = userTimes[idx];
            const v0 = userValues[idx - 1];
            const v1 = userValues[idx];
            return interpolate(roomTime, t0, t1, v0, v1);
        });
        interpolatedUserValues.pop()
        roomValues.pop();
        const correlation = math.corr(interpolatedUserValues, roomValues);
        console.log(correlation);
        setCorrelation(correlation);

    };

    const scatterData = [
        {
            id: 'User Data',
            data: csvData.map(entry => ({ x: entry.time, y: entry.value }))
        },
        {
            id: 'Room Usage Data',
            data: roomUsageData.map(entry => ({ x: new Date(entry.time).getTime(), y: entry.value ? 1 : 0 }))
        }
    ];

    return (
        <div>
            <input type="file" onChange={handleFileUpload} />
            <button onClick={calculateCorrelation}>Calcular Fator Correlação</button>
            {correlation !== null && <div>Fator de Correlação: {correlation.toFixed(2)}</div>}
            <div style={{ height: 400 }}>
                <ResponsiveScatterPlot
                    data={scatterData}
                    xScale={{ type: 'linear', min: 'auto', max: 'auto' }}
                    yScale={{ type: 'linear', min: 0, max: 1 }}
                    axisBottom={{
                        //format: '%b %d',
                        tickValues: 'every 1 day'
                    }}
                    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                    useMesh={true}
                    tooltip={({ node }) => (
                        <div
                            style={{
                                background: 'white',
                                padding: '12px 16px',
                                border: '1px solid #ccc',
                            }}
                        >
                            <strong>{node.data.serieId}</strong>
                            <br />
                            Time: {new Date(node.data.x).toLocaleString()}
                            <br />
                            Value: {node.data.y}
                        </div>
                    )}
                />
            </div>
        </div>
    );
};

export default CorrelationAnalyzer;