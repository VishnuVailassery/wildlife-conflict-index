import React, { useEffect, useState } from 'react';
import { getSurveyResponses, deleteSurveyResponse } from '../services/db';
import { Trash2 } from 'lucide-react';

export default function ResponsesPage() {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    const data = await getSurveyResponses();
    // Sort by timestamp descending
    data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    setResponses(data);
    setLoading(false);
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this response?")) {
      await deleteSurveyResponse(id);
      loadData();
    }
  };

  if (loading) return <div style={{ textAlign:'center', marginTop:'50px' }}>Loading responses...</div>;

  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
      <div className="glass-panel" style={{ padding: '30px' }}>
        <h1 style={{ color: 'var(--primary)', marginBottom: '20px' }}>Survey Responses Data</h1>
        
        {responses.length === 0 ? (
          <p style={{ marginTop: '10px', color: 'var(--text-muted)' }}>No responses found.</p>
        ) : (
          <div className="table-responsive">
            <table style={{ width: '100%', marginTop: '15px', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)', textAlign: 'left' }}>
                  <th style={{ padding: '10px' }}>Expert Name</th>
                  <th>Designation</th>
                  <th>District</th>
                  <th>Submitted At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {responses.map((res, i) => (
                  <tr key={res.id || i} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '10px', fontWeight: '500' }}>{res.expertName}</td>
                    <td>{res.designation || 'N/A'}</td>
                    <td>{res.district}</td>
                    <td>{res.timestamp ? new Date(res.timestamp).toLocaleString() : 'N/A'}</td>
                    <td>
                      <button 
                        onClick={() => handleDelete(res.id)} 
                        style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '5px' }}
                        title="Delete Response"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
