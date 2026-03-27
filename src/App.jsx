import React from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import SurveyForm from './components/SurveyForm';
import Dashboard from './pages/Dashboard';
import ResponsesPage from './pages/Responses';
import { saveSurveyResponse } from './services/db';
import { LayoutDashboard, FileSpreadsheet, Database } from 'lucide-react';

function Navigation() {
  return (
    <nav style={{ background: 'var(--primary)', padding: '16px 32px', display: 'flex', gap: '24px', alignItems: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
      <div style={{ color: 'white', fontWeight: '700', fontSize: '1.4rem', marginRight: '30px' }}>WildlifeTracker</div>
      <Link to="/" style={{ color: 'var(--accent-pale)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '500', transition: '0.2s' }} onMouseOver={(e)=>e.target.style.color='white'} onMouseOut={(e)=>e.target.style.color='var(--accent-pale)'}>
        <FileSpreadsheet size={20} /> Take Survey
      </Link>
      <Link to="/dashboard" style={{ color: 'var(--accent-pale)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '500', transition: '0.2s' }} onMouseOver={(e)=>e.target.style.color='white'} onMouseOut={(e)=>e.target.style.color='var(--accent-pale)'}>
        <LayoutDashboard size={20} /> Analytics Dashboard
      </Link>
      <Link to="/responses" style={{ color: 'var(--accent-pale)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '500', transition: '0.2s' }} onMouseOver={(e)=>e.target.style.color='white'} onMouseOut={(e)=>e.target.style.color='var(--accent-pale)'}>
        <Database size={20} /> Responses Data
      </Link>
    </nav>
  );
}

function SurveyPage() {
  const navigate = useNavigate();
  
  const handleSurveySubmit = async (data) => {
    try {
      await saveSurveyResponse(data);
      alert("Survey submitted successfully! View the Dashboard to see updated results.");
      navigate('/dashboard');
    } catch (e) {
      alert("Error saving survey.");
      console.error(e);
    }
  };

  return <SurveyForm onSubmit={handleSurveySubmit} />;
}

export default function App() {
  return (
    <BrowserRouter basename="/wildlife-conflict-index">
      <Navigation />
      <Routes>
        <Route path="/" element={<SurveyPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/responses" element={<ResponsesPage />} />
      </Routes>
    </BrowserRouter>
  );
}
