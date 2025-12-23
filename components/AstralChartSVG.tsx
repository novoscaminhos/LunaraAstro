import React, { useMemo } from 'react';
import { PlanetPosition, HouseCusp, AstralAspect } from '../types';
import { SIGN_ORDER, ELEMENT_SIGNS } from '../data/astralData';
import { 
  IconSun, IconMoon, IconMercury, IconVenus, IconMars, IconJupiter, IconSaturn, 
  IconUranus, IconNeptune, IconPluto, IconLilith, IconChiron, IconAscendant, 
  IconZodiacGeneric, IconMC, IconNode 
} from './Icons';

interface AstralChartSVGProps {
  planets: PlanetPosition[];
  cusps: HouseCusp[];
  aspects?: AstralAspect[];
}

// Mapeamento de glifos do zodíaco (estes geralmente são seguros em Unicode, mas poderiam ser SVGs também)
const ZODIAC_GLYPHS: Record<string, string> = {
  "Áries": "♈", "Touro": "♉", "Gêmeos": "♊", "Câncer": "♋",
  "Leão": "♌", "Virgem": "♍", "Libra": "♎", "Escorpião": "♏",
  "Sagitário": "♐", "Capricórnio": "♑", "Aquário": "♒", "Peixes": "♓"
};

const ELEMENT_COLORS: Record<string, string> = {
  "Fogo": "#ef4444", // red-500
  "Terra": "#10b981", // emerald-500
  "Ar": "#f59e0b", // amber-500
  "Água": "#3b82f6" // blue-500
};

// Mapeamento de Ícones SVG
const PLANET_ICONS: Record<string, React.ElementType> = {
  "Sol": IconSun,
  "Lua": IconMoon,
  "Mercúrio": IconMercury,
  "Vênus": IconVenus,
  "Marte": IconMars,
  "Júpiter": IconJupiter,
  "Saturno": IconSaturn,
  "Urano": IconUranus,
  "Netuno": IconNeptune,
  "Plutão": IconPluto,
  "Lilith": IconLilith,
  "Kiron": IconChiron,
  "Ascendente": IconAscendant,
  "Meio do Céu": IconMC,
  "Parte da Fortuna": IconZodiacGeneric,
  "Nodo Norte": IconNode
};

// Cores específicas para cada planeta (Combinando com ResultAstralScreen)
const PLANET_COLORS: Record<string, string> = {
  "Sol": "#FACC15", // yellow-400
  "Lua": "#E0F2FE", // sky-100
  "Mercúrio": "#34D399", // emerald-400
  "Vênus": "#F472B6", // pink-400
  "Marte": "#EF4444", // red-500
  "Júpiter": "#FB923C", // orange-400
  "Saturno": "#818CF8", // indigo-400
  "Urano": "#22D3EE", // cyan-400
  "Netuno": "#A5B4FC", // indigo-300
  "Plutão": "#94A3B8", // slate-400
  "Lilith": "#64748B", // slate-500
  "Kiron": "#2DD4BF", // teal-400
  "Ascendente": "#A78BFA", // purple-400
  "Meio do Céu": "#C7D2FE", // indigo-200
  "Parte da Fortuna": "#D4AF37", // gold
  "Nodo Norte": "#C084FC" // purple-400
};

export default function AstralChartSVG({ planets, cusps, aspects = [] }: AstralChartSVGProps) {
  const size = 400;
  const center = size / 2;
  const radius = center - 20;
  const zodiacInnerRadius = radius - 40;
  const planetRadius = zodiacInnerRadius - 25;
  const aspectRadius = planetRadius - 10;

  const getPos = (deg: number, r: number) => {
    // 0 graus (Áries) à esquerda (180deg no SVG) girando anti-horário
    const svgAngle = (180 - deg) * (Math.PI / 180);
    return {
      x: center + r * Math.cos(svgAngle),
      y: center + r * Math.sin(svgAngle)
    };
  };

  const getSignElementColor = (signName: string) => {
    for (const [element, signs] of Object.entries(ELEMENT_SIGNS)) {
      if ((signs as string[]).includes(signName)) return ELEMENT_COLORS[element];
    }
    return "#888";
  };

  const getSignAngle = (sign: string, degree: number = 0) => {
    const signIndex = SIGN_ORDER.indexOf(sign);
    return (signIndex * 30) + degree;
  };

  const planetPositions = useMemo(() => {
    // Agrupar planetas muito próximos para evitar sobreposição total (ajuste radial simples)
    const pos = planets.map(p => {
      const angle = getSignAngle(p.sign, p.degree || 0);
      return { ...p, angle };
    });
    
    // Calcular posições X/Y
    return pos.map(p => {
      const xy = getPos(p.angle, planetRadius);
      return { ...p, ...xy };
    });
  }, [planets]);

  const zodiacSectors = SIGN_ORDER.map((sign, i) => {
    const startAngle = i * 30;
    const endAngle = (i + 1) * 30;
    
    const p1 = getPos(startAngle, radius);
    const p2 = getPos(endAngle, radius);
    const p3 = getPos(endAngle, zodiacInnerRadius);
    const p4 = getPos(startAngle, zodiacInnerRadius);

    const midAngle = startAngle + 15;
    const textPos = getPos(midAngle, (radius + zodiacInnerRadius) / 2);

    return {
      sign,
      path: `M ${p1.x} ${p1.y} A ${radius} ${radius} 0 0 0 ${p2.x} ${p2.y} L ${p3.x} ${p3.y} A ${zodiacInnerRadius} ${zodiacInnerRadius} 0 0 1 ${p4.x} ${p4.y} Z`,
      color: getSignElementColor(sign),
      glyph: ZODIAC_GLYPHS[sign],
      textPos
    };
  });

  return (
    <div className="relative w-full aspect-square max-w-[360px] mx-auto animate-fade-in select-none">
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full drop-shadow-2xl">
        <defs>
          <radialGradient id="centerGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#191022" stopOpacity="1" />
            <stop offset="100%" stopColor="#2d1b3e" stopOpacity="0.5" />
          </radialGradient>
        </defs>

        {/* Fundo Central */}
        <circle cx={center} cy={center} r={radius} fill="url(#centerGradient)" />

        {/* Linhas das Casas */}
        {cusps.map((cusp) => {
          const angle = getSignAngle(cusp.sign, 0);
          const p1 = getPos(angle, zodiacInnerRadius);
          const p2 = getPos(angle, 20);
          return (
            <line 
              key={`house-${cusp.house}`} 
              x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} 
              stroke="rgba(255,255,255,0.05)" 
              strokeWidth="1" 
            />
          );
        })}

        {/* Aspectos */}
        {aspects.map((aspect, idx) => {
          const p1Data = planetPositions.find(p => p.name === aspect.planet1);
          const p2Data = planetPositions.find(p => p.name === aspect.planet2);
          
          if (!p1Data || !p2Data) return null;

          let color = "rgba(255,255,255,0.1)";
          const type = aspect.type.toLowerCase();
          
          if (type.includes("trígono") || type.includes("sextil")) color = "rgba(16, 185, 129, 0.4)";
          if (type.includes("quadratura") || type.includes("oposição")) color = "rgba(239, 68, 68, 0.4)";
          if (type.includes("conjunção")) return null;

          return (
            <line 
              key={`aspect-${idx}`} 
              x1={p1Data.x} y1={p1Data.y} 
              x2={p2Data.x} y2={p2Data.y} 
              stroke={color} 
              strokeWidth="1" 
            />
          );
        })}

        {/* Anel do Zodíaco */}
        {zodiacSectors.map((sector) => (
          <g key={sector.sign}>
            <path d={sector.path} fill={sector.color} stroke="#191022" strokeWidth="1" opacity="0.2" />
            <path d={sector.path} fill="none" stroke={sector.color} strokeWidth="1" opacity="0.5" />
            <text 
              x={sector.textPos.x} 
              y={sector.textPos.y} 
              fontSize="18" 
              fill={sector.color} 
              textAnchor="middle" 
              dominantBaseline="central"
              className="font-serif"
              style={{ textShadow: '0px 0px 3px rgba(0,0,0,0.8)' }}
            >
              {sector.glyph}
            </text>
          </g>
        ))}

        {/* Separador Interno */}
        <circle cx={center} cy={center} r={aspectRadius - 5} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4 4" />

        {/* Planetas */}
        {planetPositions.map((p) => {
          const IconComponent = PLANET_ICONS[p.name] || IconZodiacGeneric;
          const color = PLANET_COLORS[p.name] || "#CBD5E1";
          const iconSize = 16;
          
          // Ajuste para centralizar o ícone no ponto X,Y
          const xPos = p.x - (iconSize / 2);
          const yPos = p.y - (iconSize / 2);

          return (
            <g key={p.name} className="cursor-pointer transition-transform hover:scale-125 group" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
              <title>{`${p.name} em ${p.sign} (${p.degree}°)`}</title>
              
              {/* Linha guia até o anel */}
              <line 
                x1={center} y1={center} 
                x2={p.x} y2={p.y} 
                stroke={color} 
                strokeWidth="0.5" 
                opacity="0.2"
                strokeDasharray="2 2"
              />

              {/* Fundo do Ícone para legibilidade */}
              <circle 
                cx={p.x} cy={p.y} r={iconSize/1.5} 
                fill="#191022" 
                stroke={color}
                strokeWidth="1"
                className="shadow-sm"
              />
              
              {/* Renderização do Ícone SVG aninhado */}
              <svg x={xPos} y={yPos} width={iconSize} height={iconSize} viewBox="0 0 24 24" overflow="visible">
                  <IconComponent size={24} stroke={color} fill={p.name === 'Lua' ? color : 'none'} />
              </svg>
            </g>
          );
        })}

        {/* Centro */}
        <circle cx={center} cy={center} r="3" fill="#fff" opacity="0.5" />
      </svg>
    </div>
  );
}