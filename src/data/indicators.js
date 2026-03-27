export const indicatorsData = [
  {
    domain: "Spatial",
    indicators: [
      { id: "s2", name: "Accessibility/Topographical constraints", type: "Exposure" },
      { id: "s3", name: "Encroachments", type: "Exposure" }
    ]
  },
  {
    domain: "Management",
    indicators: [
      { id: "m1", name: "Availability and maintenance of barriers", type: "Adaptive capacity" },
      { id: "m2", name: "Use of monitoring tools (camera traps, GPS tracking)", type: "Adaptive capacity" }
    ]
  },
  {
    domain: "Environmental",
    indicators: [
      { id: "env1", name: "Extreme weather conditions", type: "Exposure" },
      { id: "env2", name: "Crop types", type: "Sensitivity" }
    ]
  },
  {
    domain: "Economic",
    indicators: [
      { id: "eco1", name: "Forest dependent livelihood", type: "Sensitivity" },
      { id: "eco2", name: "Impact on income", type: "Sensitivity" }
    ]
  },
  {
    domain: "Social",
    indicators: [
      { id: "soc1", name: "Population Density", type: "Sensitivity" },
      { id: "soc2", name: "Community participation in mitigation efforts", type: "Adaptive capacity" },
      { id: "soc3", name: "Impact on daily activities", type: "Sensitivity" },
      { 
        id: "soc4", 
        name: "Severity of Human–Wildlife Conflict Impacts", 
        type: "Sensitivity",
        labels: {
          0: "No conflict",
          1: "Minor impacts (crop damage only)",
          2: "Moderate impacts (property damage)",
          3: "Significant impacts (livestock loss)",
          4: "High impacts (human injury)",
          5: "Extreme impacts (human death cases reported)"
        }
      }
    ]
  },
  {
    domain: "Tourism",
    indicators: [
      { id: "t1", name: "Influence of tourism near forest areas", type: "Exposure" },
      { id: "t2", name: "Behaviour and awareness level of tourists", type: "Adaptive capacity" }
    ]
  }
];
