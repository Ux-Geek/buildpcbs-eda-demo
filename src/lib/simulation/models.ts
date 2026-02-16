export const SPICE_MODELS = {
  // Generic Diode
  D: ".model D D(Is=14.15f Rs=3.38 N=1.69 Cjo=2p M=0.3333 Vj=0.75 Fc=0.5 Bv=130 Ibv=10u)",

  // Generic NPN Transistor (2N3904)
  NPN: ".model NPN NPN(Is=6.734f Xti=3 Eg=1.11 Vaf=74.03 Bf=416.4 Ne=1.259 Ise=6.734f Ikf=66.78m Xtb=1.5 Br=0.7371 Nc=2 Isc=0 Ikr=0 Rc=1 Cjc=3.638p Mjc=0.3085 Vjc=0.75 Fc=0.5 Cje=4.493p Mje=0.2593 Vje=0.75 Tr=239.5n Tf=301.2p Itf=0.4 Vtf=4 Xtf=2 Rb=10)",

  // Generic PNP Transistor (2N3906)
  PNP: ".model PNP PNP(Is=1.41f Xti=3 Eg=1.11 Vaf=18.7 Bf=180.7 Ne=1.5 Ise=0 Ikf=80m Xtb=1.5 Br=4.977 Nc=2 Isc=0 Ikr=0 Rc=2.5 Cjc=9.728p Mjc=0.5776 Vjc=0.75 Fc=0.5 Cje=8.063p Mje=0.3677 Vje=0.75 Tr=33.42n Tf=179.3p Itf=0.4 Vtf=4 Xtf=6 Rb=10)",

  // Generic MOS (2N7000)
  NMOS: ".model NMOS NMOS(Level=3 Rds=1000 VTO=2.0 KP=0.5)",

  // LED (Red)
  LED_RED:
    ".model LED_RED D(Is=93.2p Rs=42m N=3.73 Bv=4 Ibv=10u Cjo=2.97p M=0.3333 Vj=0.75 Fc=0.5 Eg=2.1)",

  // LED (Green)
  LED_GREEN:
    ".model LED_GREEN D(Is=93.2p Rs=42m N=4.61 Bv=5 Ibv=10u Cjo=2.97p M=0.3333 Vj=0.75 Fc=0.5 Eg=2.1)",

  // LED (Blue)
  LED_BLUE:
    ".model LED_BLUE D(Is=93.2p Rs=42m N=7.47 Bv=5 Ibv=10u Cjo=2.97p M=0.3333 Vj=0.75 Fc=0.5 Eg=2.1)",
};

export const getModelForComponent = (componentName: string, type: string) => {
  if (type === "led" || componentName.includes("LED"))
    return SPICE_MODELS.LED_RED; // Default to red
  if (type === "diode" || componentName.startsWith("D")) return SPICE_MODELS.D;
  if (
    type === "transistor_npn" ||
    componentName.startsWith("Q") ||
    componentName.includes("NPN")
  )
    return SPICE_MODELS.NPN;
  if (type === "transistor_pnp" || componentName.includes("PNP"))
    return SPICE_MODELS.PNP;
  return "";
};
