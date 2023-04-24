const europeanAQIDescriptions = {
  d_0_40: "Bom",
  d_40_60: "Moderada",
  d_60_80: "Ruim",
  d_80_100: "Muito ruim",
  d_100: "Péssima",
};

export function europeanAQIDescription(AQI) {
  if(AQI <= 40) return europeanAQIDescriptions.d_0_40;

  if(AQI <= 60) return europeanAQIDescriptions.d_40_60;

  if(AQI <= 80) return europeanAQIDescriptions.d_60_80;

  if(AQI <= 100) return europeanAQIDescriptions.d_80_100;

  if(AQI > 100) return europeanAQIDescriptions.d_100;

  return europeanAQIDescriptions.d_0_20;
};