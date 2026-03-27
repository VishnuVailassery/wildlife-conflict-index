import React, { useEffect, useState } from 'react';
import { getSurveyResponses, deleteSurveyResponse } from '../services/db';
import { Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { indicatorsData } from '../data/indicators';

export default function ResponsesPage() {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

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
                  <React.Fragment key={res.id || i}>
                  <tr style={{ borderBottom: '1px solid #eee', background: expandedId === (res.id || i) ? '#f8fafc' : 'transparent' }}>
                    <td style={{ padding: '10px', fontWeight: '500' }}>{res.expertName}</td>
                    <td>{res.designation || 'N/A'}</td>
                    <td>{res.district}</td>
                    <td>{res.timestamp ? new Date(res.timestamp).toLocaleString() : 'N/A'}</td>
                    <td style={{ display: 'flex', gap: '10px', alignItems: 'center', height: '100%' }}>
                      <button 
                        onClick={() => setExpandedId(expandedId === (res.id || i) ? null : (res.id || i))} 
                        style={{ background: 'var(--accent-pale)', border: 'none', color: 'var(--primary)', cursor: 'pointer', padding: '6px 12px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', fontWeight: 'bold' }}
                      >
                        {expandedId === (res.id || i) ? <><ChevronUp size={16}/> Hide</> : <><ChevronDown size={16}/> View Details</>}
                      </button>
                      <button 
                        onClick={() => handleDelete(res.id)} 
                        style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '5px' }}
                        title="Delete Response"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                  {expandedId === (res.id || i) && (
                    <tr>
                      <td colSpan="5" style={{ padding: '20px', background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                        <h4 style={{ color: 'var(--primary)', marginBottom: '15px' }}>Detailed Ratings for {res.expertName}</h4>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '15px' }}>
                          {indicatorsData.map(domain => (
                            <div key={domain.domain} style={{ background: 'white', padding: '15px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                              <strong style={{ display: 'block', marginBottom: '10px', color: 'var(--primary-light)', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>{domain.domain}</strong>
                              {domain.indicators.map(ind => (
                                <div key={ind.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
                                  <span style={{ color: 'var(--text-muted)', maxWidth: '80%' }}>{ind.name}</span>
                                  <span style={{ fontWeight: 'bold', background: 'var(--accent-pale)', padding: '2px 8px', borderRadius: '12px', fontSize: '0.85rem' }}>
                                    {res.ratings?.[ind.id] ?? '-'}
                                  </span>
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
