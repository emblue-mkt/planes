const planData = {
  free: {
    title: "Free",
    default: 10,
    step: 5000,
    max: 50000,
    min: 5000,
    anualPrice: 0,
    monthlyPrice: 0,
    extraCpm: 3.6,
    included: 10000,
    recNextPlanAt: 40000,
    recNextPlan: `<strong>Ey, esos son muchos envíos adicionales...</strong> Ya te conviene pasar a nuestro <strong style="color: #FD5739">Plan Standard</strong> (¡que también incluye marketing automation!)`,
    marks: [
      {
        value: 5000,
        label: "",
      },
      {
        value: 10000,
        label: "10k",
      },
      {
        value: 15000,
        label: "15k",
      },
      {
        value: 20000,
        label: "20k",
      },
      {
        value: 25000,
        label: "25k",
      },
      {
        value: 30000,
        label: "30k",
      },
      {
        value: 35000,
        label: "35k",
      },
      {
        value: 40000,
        label: "40k",
      },
      {
        value: 45000,
        label: "45k",
      },
      {
        value: 50000,
        label: "50k",
      },
    ],
  },
  standard: {
    title: "Standard",
    default: 0,
    step: 50000,
    max: 450000,
    min: 0,
    anualPrice: 144,
    monthlyPrice: 180,
    extraCpm: 3.6,
    included: 50000,
    recNextPlanAt: 250000,
    recNextPlan: `<strong>WoW:</strong> esa cantidad de envíos extra significa que necesitas nuestro <strong style="color: #FD5739">Plan Pro</strong>. Tu marca está lista para una verdadera aceleración omnicanal`,
    marks: [
      {
        value: 0,
        label: "",
      },
      {
        value: 50000,
        label: "50k",
      },
      {
        value: 100000,
        label: "100k",
      },
      {
        value: 150000,
        label: "150k",
      },
      {
        value: 200000,
        label: "200k",
      },
      {
        value: 250000,
        label: "250k",
      },
      {
        value: 300000,
        label: "300k",
      },
      {
        value: 350000,
        label: "350k",
      },
      {
        value: 400000,
        label: "400k",
      },
      {
        value: 450000,
        label: "450k",
      },
    ],
  },
  professional: {
    title: "Professional",
    default: 0,
    step: 500000,
    max: 2500000,
    min: 0,
    anualPrice: 720,
    monthlyPrice: 900,
    extraCpm: 1.8,
    included: 500000,
    recNextPlanAt: 1000000,
    recNextPlan: `Esos son muchísimos envíos. Te conviene nuestro <strong style="color: #FD5739">Plan Enterprise</strong>, pensado para quienes necesitan aprovechar al máximo la plataforma.`,
    marks: [
      {
        value: 0,
        label: "",
      },
      {
        value: 500000,
        label: "500k",
      },
      {
        value: 1000000,
        label: "1000k",
      },
      {
        value: 1500000,
        label: "1500k",
      },
      {
        value: 2000000,
        label: "2000k",
      },
      {
        value: 2500000,
        label: "2500k",
      },
    ],
  },
  enterprise: {
    title: "Enterprise",
    default: 0,
    step: 500000,
    max: 5000000,
    min: 2000000,
    anualPrice: 1440,
    monthlyPrice: 1800,
    extraCpm: 0.72,
    included: 2500000,
    recNextPlanAt: undefined,
    marks: [
      {
        value: 2500000,
        label: "2500k",
      },
      {
        value: 3000000,
        label: "3000k",
      },
      {
        value: 3500000,
        label: "3500k",
      },
      {
        value: 4000000,
        label: "4000k",
      },
      {
        value: 4500000,
        label: "4500k",
      },
      {
        value: 5000000,
        label: "5000k",
      },
    ],
  },
};

export default planData;
