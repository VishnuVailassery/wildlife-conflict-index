import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import keralaGeoJson from '../data/kerala.json';

const geoUrl = keralaGeoJson;

export default function KeralaMap({ districtData = [] }) {
  const colorMap = {};
  const indexMap = {};
  
  districtData.forEach(d => {
    const districtName = d.district.toLowerCase().trim();
    colorMap[districtName] = d.category.color;
    indexMap[districtName] = { index: d.index, category: d.category.label };
  });

  const [tooltip, setTooltip] = useState({ show: false, x: 0, y: 0, content: null });

  return (
    <div style={{ width: '100%', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden', background: '#f8fafc', position: 'relative' }}>
      <div style={{ position: 'relative', width: '100%', paddingBottom: '85%', minHeight: '400px' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
          <ComposableMap 
            projection="geoMercator" 
            projectionConfig={{ scale: 6500, center: [76.5, 10.5] }}
            style={{ width: "100%", height: "100%" }}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const propDistrict = geo.properties.DISTRICT || geo.properties.name || geo.properties.dtname || geo.properties.DISTRICT_ || '';
                  const districtName = propDistrict.toLowerCase().trim();
                  
                  const districtColor = colorMap[districtName] || "#e2e8f0";

                  return (
                    <Geography 
                      key={geo.rsmKey} 
                      geography={geo} 
                      fill={districtColor}
                      stroke="#475569"
                      strokeWidth={0.5}
                      style={{
                        default: { outline: 'none', transition: 'all 250ms' },
                        hover: { fill: "#94a3b8", outline: 'none', cursor: 'pointer', transition: 'all 250ms' },
                        pressed: { outline: 'none' }
                      }}
                      onMouseMove={(e) => {
                        const data = indexMap[districtName];
                        if (data) {
                          setTooltip({
                            show: true,
                            x: e.clientX,
                            y: e.clientY,
                            content: { name: propDistrict, index: data.index, category: data.category, color: districtColor }
                          });
                        } else {
                          setTooltip({
                            show: true,
                            x: e.clientX,
                            y: e.clientY,
                            content: { name: propDistrict, index: 'No Data', category: 'Unknown', color: '#e2e8f0' }
                          });
                        }
                      }}
                      onMouseLeave={() => setTooltip({ show: false })}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>
        </div>
      </div>
      
      {tooltip.show && tooltip.content && (
        <div style={{
          position: 'fixed',
          top: tooltip.y + 15,
          left: tooltip.x + 15,
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '12px',
          borderRadius: '8px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
          border: '1px solid var(--border)',
          zIndex: 1000,
          pointerEvents: 'none'
        }}>
          <h4 style={{ margin: '0 0 5px 0', color: 'var(--primary)' }}>{tooltip.content.name}</h4>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: tooltip.content.color }}></div>
            <span><strong>Index:</strong> {tooltip.content.index}</span>
          </div>
          <div style={{ marginTop: '4px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Category: {tooltip.content.category}
          </div>
        </div>
      )}
      
      <div style={{ position: 'absolute', bottom: '15px', left: '15px', background: 'rgba(255,255,255,0.92)', padding: '12px', borderRadius: '8px', fontSize: '0.85rem', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <strong style={{ display: 'block', marginBottom: '8px', color: 'var(--text-main)' }}>Risk Gradient</strong>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}><div style={{ width: '14px', height: '14px', background: '#4ade80', borderRadius: '3px' }}></div> Very Low</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}><div style={{ width: '14px', height: '14px', background: '#a3e635', borderRadius: '3px' }}></div> Low</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}><div style={{ width: '14px', height: '14px', background: '#facc15', borderRadius: '3px' }}></div> Moderate</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}><div style={{ width: '14px', height: '14px', background: '#fb923c', borderRadius: '3px' }}></div> High</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}><div style={{ width: '14px', height: '14px', background: '#ef4444', borderRadius: '3px' }}></div> Very High</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '14px', height: '14px', background: '#e2e8f0', border: '1px solid #cbd5e1', borderRadius: '3px' }}></div> No Data</div>
      </div>
    </div>
  );
}
