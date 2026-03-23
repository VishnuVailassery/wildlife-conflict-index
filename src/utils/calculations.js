import { indicatorsData } from '../data/indicators';

export function calculateDistrictIndex(districtResponses) {
  // districtResponses is an array of formData objects for a single district
  
  if (!districtResponses || districtResponses.length === 0) return 0;
  
  let totalExpertCount = districtResponses.length;
  
  // 1. Calculate Average Score E_i for each indicator
  const averageScores = {};
  let sumOfAverages = 0;
  
  // Flatten indicators for easier access
  const flatIndicators = [];
  indicatorsData.forEach(domain => {
    domain.indicators.forEach(ind => {
      flatIndicators.push(ind.id);
    });
  });
  
  flatIndicators.forEach(id => {
    let sum = 0;
    districtResponses.forEach(res => {
      sum += parseInt(res.ratings[id]) || 0;
    });
    const avg = sum / totalExpertCount;
    averageScores[id] = avg;
    sumOfAverages += avg;
  });
  
  // 2. Calculate W_i, X'_i, and sum of W_i * X'_i
  let sumWeightedValues = 0;
  
  flatIndicators.forEach(id => {
    const avg = averageScores[id];
    const w = sumOfAverages > 0 ? avg / sumOfAverages : 0; // Relative Weight
    const xPrime = avg / 5.0; // Normalization 0 to 1 (Xmin = 0, Xmax = 5)
    
    sumWeightedValues += (w * xPrime);
  });
  
  // 3. Scale by 5 for final Index
  const finalIndex = sumWeightedValues * 5;
  
  return finalIndex;
}

export function getCategory(indexValue) {
  if (indexValue >= 0 && indexValue <= 1) return { label: "Very Low", color: "#4ade80" }; // Green
  if (indexValue > 1 && indexValue <= 2) return { label: "Low", color: "#a3e635" }; // Light Green
  if (indexValue > 2 && indexValue <= 3) return { label: "Moderate", color: "#facc15" }; // Yellow
  if (indexValue > 3 && indexValue <= 4) return { label: "High", color: "#fb923c" }; // Orange
  if (indexValue > 4 && indexValue <= 5) return { label: "Very High", color: "#ef4444" }; // Red
  return { label: "Unknown", color: "#9ca3af" };
}
