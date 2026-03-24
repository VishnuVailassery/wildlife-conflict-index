import React, { useState } from 'react';
import { indicatorsData } from '../data/indicators';
import { Save, User, MapPin } from 'lucide-react';

export default function SurveyForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    expertName: '',
    district: '',
    ratings: {}
  });

  const handleRatingChange = (id, value) => {
    setFormData(prev => ({
      ...prev,
      ratings: {
        ...prev.ratings,
        [id]: value
      }
    }));
  };

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate all answered
    let allAnswered = true;
    indicatorsData.forEach(domain => {
      domain.indicators.forEach(ind => {
        if (formData.ratings[ind.id] === undefined) allAnswered = false;
      });
    });

    if (!allAnswered) {
      alert("Please ensure all indicators are rated.");
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="survey-container" style={{ maxWidth: '850px', margin: '40px auto', padding: '0 20px' }}>
      <div className="glass-panel" style={{ padding: '40px', marginBottom: '30px' }}>
        <h1 style={{ marginBottom: '10px', fontSize: '2.5rem', color: 'var(--primary)', fontWeight: '700' }}>
          Wildlife Conflict Index Survey
        </h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '30px', fontSize: '1.1rem' }}>
          Please rate the following indicators based on your expertise. (0 = Very Low, 5 = Very High)
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '40px' }}>
            <div>
              <label><User size={18} style={{ verticalAlign: 'text-bottom', marginRight: '6px', color: 'var(--accent)' }}/> Expert Name</label>
              <input 
                type="text" 
                name="expertName" 
                placeholder="e.g. Dr. Jane Smith" 
                value={formData.expertName} 
                onChange={handleTextChange} 
                required 
              />
            </div>
            <div>
              <label><MapPin size={18} style={{ verticalAlign: 'text-bottom', marginRight: '6px', color: 'var(--accent)' }}/> District / Region</label>
              <select 
                name="district" 
                value={formData.district} 
                onChange={handleTextChange} 
                required
              >
                <option value="" disabled>Select a district</option>
                <option value="Alappuzha">Alappuzha</option>
                <option value="Ernakulam">Ernakulam</option>
                <option value="Idukki">Idukki</option>
                <option value="Kannur">Kannur</option>
                <option value="Kasaragod">Kasaragod</option>
                <option value="Kollam">Kollam</option>
                <option value="Kottayam">Kottayam</option>
                <option value="Kozhikode">Kozhikode</option>
                <option value="Malappuram">Malappuram</option>
                <option value="Palakkad">Palakkad</option>
                <option value="Pathanamthitta">Pathanamthitta</option>
                <option value="Thiruvananthapuram">Thiruvananthapuram</option>
                <option value="Thrissur">Thrissur</option>
                <option value="Wayanad">Wayanad</option>
              </select>
            </div>
          </div>

          {indicatorsData.map((domainBlock) => (
            <div key={domainBlock.domain} className="glass-panel" style={{ padding: '28px', marginBottom: '30px', background: 'rgba(255,255,255,0.45)' }}>
              <h2 style={{ fontSize: '1.6rem', borderBottom: '2px solid var(--border)', paddingBottom: '12px', marginBottom: '24px', color: 'var(--primary-light)' }}>
                {domainBlock.domain}
              </h2>
              
              {domainBlock.indicators.map((indicator) => (
                <div key={indicator.id} style={{ marginBottom: '28px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <span style={{ fontWeight: '600', fontSize: '1.1rem', color: 'var(--text-main)', maxWidth: '75%' }}>
                      {indicator.name}
                    </span>
                    <span style={{ fontSize: '0.85rem', background: 'var(--accent-pale)', color: 'var(--primary-light)', padding: '6px 12px', borderRadius: '20px', fontWeight: 'bold' }}>
                      {indicator.type.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="likert-group">
                    {[0, 1, 2, 3, 4, 5].map((val) => (
                      <label key={val} className="likert-item" title={`Rating: ${val}`}>
                        <input 
                          type="radio" 
                          name={indicator.id} 
                          value={val}
                          checked={formData.ratings[indicator.id] === val}
                          onChange={() => handleRatingChange(indicator.id, val)}
                          required
                        />
                        <span>{val}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}

          <div style={{ textAlign: 'center', marginTop: '50px', borderTop: '2px solid var(--border)', paddingTop: '40px' }}>
            <button type="submit" className="btn-primary" style={{ padding: '18px 48px', fontSize: '1.2rem', borderRadius: '30px' }}>
              <Save size={24} />
              Submit Form to District Database
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
