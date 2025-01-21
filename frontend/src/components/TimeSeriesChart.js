import React, { useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register required Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const TimeSeriesChart = ({ bills }) => {
    const [view, setView] = useState('monthly'); // Default view is monthly

    // Group bills by view type
    const groupBills = (bills, view) => {
        return bills.reduce((acc, bill) => {
            let key;
            const date = new Date(bill.date);
            if (view === 'daily') {
                key = date.toLocaleDateString(); // e.g., "1/20/2025"
            } else if (view === 'monthly') {
                key = date.toLocaleString('default', { month: 'short', year: 'numeric' }); // e.g., "Jan 2025"
            } else if (view === 'yearly') {
                key = date.getFullYear(); // e.g., 2025
            }
            acc[key] = (acc[key] || 0) + bill.amount;
            return acc;
        }, {});
    };

    const billsByView = groupBills(bills, view);

    // Prepare data for the chart
    const labels = Object.keys(billsByView);
    const dataPoints = Object.values(billsByView);

    const data = {
        labels,
        datasets: [
            {
                label: `Spending (${view.charAt(0).toUpperCase() + view.slice(1)})`,
                data: dataPoints,
                fill: false,
                borderColor: '#007bff',
                backgroundColor: '#007bff',
                tension: 0.1,
            },
        ],
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="bg-white p-4 rounded border shadow">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold">Time-Series Chart</h3>
                    <select
                        value={view}
                        onChange={(e) => setView(e.target.value)}
                        className="border px-4 py-2 rounded"
                    >
                        <option value="daily">Daily</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                    </select>
                </div>
                <div style={{ maxHeight: '400px', overflow: 'hidden' }}>
                    <Line
                        data={data}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    display: true,
                                    position: 'top',
                                },
                            },
                            scales: {
                                x: {
                                    grid: {
                                        display: true,
                                        color: '#ddd',
                                    },
                                },
                                y: {
                                    beginAtZero: true,
                                    grid: {
                                        display: true,
                                        color: '#ddd',
                                    },
                                },
                            },
                        }}
                        height={300} // Compact height for the chart
                    />
                </div>
            </div>
        </div>
    );
};

export default TimeSeriesChart;
