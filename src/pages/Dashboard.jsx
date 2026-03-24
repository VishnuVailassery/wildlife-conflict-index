import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { getSurveyResponses } from '../services/db';
import { calculateDistrictIndex, getCategory } from '../utils/calculations';
import KeralaMap from '../components/KeralaMap';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const [districtData, setDistrictData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const responses = await getSurveyResponses();
      
      // Group by District
      const grouped = {};
      responses.forEach(res => {
        const d = res.district.trim();
        if (!grouped[d]) grouped[d] = [];
        grouped[d].push(res);
      });

      const processed = Object.keys(grouped).map(dist => {
        const indexValue = calculateDistrictIndex(grouped[dist]);
        const expertsCount = grouped[dist].length;
        const category = getCategory(indexValue);
        return {
          district: dist,
          index: parseFloat(indexValue.toFixed(2)),
          experts: expertsCount,
          category: category
        };
      });

      // Sort by Index descending
      processed.sort((a, b) => b.index - a.index);
      setDistrictData(processed);
      setLoading(false);
    }
    loadData();
  }, []);

  if (loading) return <div style={{ textAlign:'center', marginTop:'50px' }}>Loading analytics...</div>;

  if (districtData.length === 0) {
    return (
      <div className="glass-panel" style={{ maxWidth: '800px', margin: '40px auto', padding: '40px', textAlign: 'center' }}>
        <h2>No Data Available</h2>
        <p style={{ marginTop: '10px', color: 'var(--text-muted)' }}>Submit a survey to start seeing district comparisons.</p>
      </div>
    );
  }

  const chartData = {
    labels: districtData.map(d => d.district),
    datasets: [
      {
        label: 'Wildlife Conflict Index',
        data: districtData.map(d => d.index),
        backgroundColor: districtData.map(d => d.category.color),
        borderColor: 'rgba(0,0,0,0.1)',
        borderWidth: 1,
        borderRadius: 8
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          afterLabel: function(context) {
            const dataObj = districtData[context.dataIndex];
            return `Category: ${dataObj.category.label}\nExperts: ${dataObj.experts}`;
          }
        }
      }
    },
    scales: {
      y: { min: 0, max: 5 }
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px' }}>
      <div className="glass-panel" style={{ padding: '30px' }}>
        <h1 style={{ color: 'var(--primary)', marginBottom: '20px' }}>District Conflict Index Dashboard</h1>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div>
            <h3 style={{ marginBottom: '15px', color: 'var(--primary-light)' }}>Geographic Risk Map</h3>
            <KeralaMap districtData={districtData} />
          </div>

          <div style={{ background: 'white', padding: '20px', borderRadius: '12px' }}>
            <h3 style={{ marginBottom: '15px', color: 'var(--text-muted)' }}>Index Value Comparison Graph</h3>
            <Bar data={chartData} options={options} />
          </div>
        </div>

        <div style={{ marginTop: '40px' }}>
          <h3 style={{ color: 'var(--primary-light)' }}>Data Summary</h3>
          <div className="table-responsive">
            <table style={{ width: '100%', marginTop: '15px', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border)', textAlign: 'left' }}>
                <th style={{ padding: '10px' }}>District</th>
                <th>Index (0-5)</th>
                <th>Category</th>
                <th>Expert Responses</th>
              </tr>
            </thead>
            <tbody>
              {districtData.map((d, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px', fontWeight: '500' }}>{d.district}</td>
                  <td><strong>{d.index}</strong></td>
                  <td>
                    <span style={{ 
                      background: d.category.color, 
                      padding: '6px 14px', 
                      borderRadius: '20px', 
                      fontSize: '0.85rem', 
                      fontWeight: '700', 
                      color: ['#facc15', '#a3e635', '#4ade80'].includes(d.category.color) ? 'black' : 'white' 
                    }}>
                      {d.category.label}
                    </span>
                  </td>
                  <td>{d.experts}</td>
                </tr>
              ))}
            </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
