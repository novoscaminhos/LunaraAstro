
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

// Glifos
const ZODIAC_GLYPHS: Record<string, string> = {
  "Áries": "♈", "Touro": "♉", "Gêmeos": "♊", "Câncer": "♋",
  "Leão": "♌", "Virgem": "♍", "Libra": "♎", "Escorpião": "♏",
  "Sagitário": "♐", "Capricórnio": "♑", "Aquário": "♒", "Peixes": "♓"
};

// Cores dos Elementos (Estilo Astrolink: Fogo=Vermelho, Terra=Verde, Ar=Amarelo/Laranja, Água=Azul)
const ELEMENT_COLORS: Record<string, string> = {
  "Fogo": "#EF4444", // red-500
  "Terra": "#10B981", // emerald-500
  "Ar": "#F59E0B",   // amber-500
  "Água": "#3B82F6"  // blue-500
};

// Mapeamento de Ícones
const PLANET_ICONS: Record<string, React.ElementType> = {
  "Sol": IconSun, "Lua": IconMoon, "Mercúrio": IconMercury, "Vênus": IconVenus,
  "Marte": IconMars, "Júpiter": IconJupiter, "Saturno": IconSaturn, "Urano": IconUranus,
  "Netuno": IconNeptune, "Plutão": IconPluto, "Lilith": IconLilith, "Kiron": IconChiron,
  "Ascendente": IconAscendant, "Meio do Céu": IconMC, "Parte da Fortuna": IconZodiacGeneric,
  "Nodo Norte": IconNode
};

export default function AstralChartSVG({ planets, cusps, aspects = [] }: AstralChartSVGProps) {
  const size = 600; // Aumentado para mais precisão
  const center = size / 2;
  
  // Raios das camadas
  const outerRadius = center - 5;
  const zodiacRadius = outerRadius - 35; // Largura da faixa zodiacal
  const degreeTrackRadius = zodiacRadius - 5; // Faixa dos tracinhos
  const planetTrackRadius = degreeTrackRadius - 40; // Onde os planetas ficam
  const innerRadius = planetTrackRadius - 20; // Fim das linhas das casas e início dos aspectos

  // Utilitário Trigonométrico
  const getPos = (deg: number, r: number) => {
    // Offset de 180 graus para alinhar Áries (0º) à esquerda (Padrão Astrológico)
    const angleRad = (180 - deg) * (Math.PI / 180);
    return {
      x: center + r * Math.cos(angleRad),
      y: center + r * Math.sin(angleRad)
    };
  };

  const getSignAngle = (sign: string, degree: number = 0) => {
    const signIndex = SIGN_ORDER.indexOf(sign);
    // Normaliza para 0-360
    return ((signIndex * 30) + degree) % 360;
  };

  const getSignElementColor = (signName: string) => {
    for (const [element, signs] of Object.entries(ELEMENT_SIGNS)) {
      if ((signs as string[]).includes(signName)) return ELEMENT_COLORS[element];
    }
    return "#888";
  };

  // --- PREPARAÇÃO DE DADOS ---

  // 1. Posições dos Planetas
  const planetPositions = useMemo(() => {
    // Ordenar planetas por ângulo para detectar sobreposições
    const sorted = planets.map(p => ({
      ...p,
      absDegree: getSignAngle(p.sign, p.degree || 0)
    })).sort((a, b) => a.absDegree - b.absDegree);

    // Ajuste simples de colisão (radial)
    const adjusted = [];
    for (let i = 0; i < sorted.length; i++) {
        let p = sorted[i];
        let r = planetTrackRadius;
        
        // Verifica se o anterior estava muito perto
        if (i > 0) {
            const prev = sorted[i-1];
            if (Math.abs(p.absDegree - prev.absDegree) < 5) {
                // Alterna o raio ligeiramente para "empilhar" visualmente ou afastar
                r = planetTrackRadius + (i % 2 === 0 ? 10 : -10); 
            }
        }
        
        const pos = getPos(p.absDegree, r);
        const lineStart = getPos(p.absDegree, degreeTrackRadius); // Linha apontando para o grau exato
        adjusted.push({ ...p, x: pos.x, y: pos.y, r, lineStart });
    }
    return adjusted;
  }, [planets]);

  // 2. Setores do Zodíaco
  const zodiacSectors = SIGN_ORDER.map((sign, i) => {
    const startAngle = i * 30;
    const endAngle = (i + 1) * 30;
    
    // Desenho do Arco SVG
    const p1 = getPos(startAngle, outerRadius);
    const p2 = getPos(endAngle, outerRadius);
    const p3 = getPos(endAngle, zodiacRadius);
    const p4 = getPos(startAngle, zodiacRadius);

    const midAngle = startAngle + 15;
    const textPos = getPos(midAngle, (outerRadius + zodiacRadius) / 2);

    return {
      sign,
      path: `M ${p1.x} ${p1.y} A ${outerRadius} ${outerRadius} 0 0 0 ${p2.x} ${p2.y} L ${p3.x} ${p3.y} A ${zodiacRadius} ${zodiacRadius} 0 0 1 ${p4.x} ${p4.y} Z`,
      color: getSignElementColor(sign),
      glyph: ZODIAC_GLYPHS[sign],
      textPos
    };
  });

  // 3. Ticks dos Graus (Régua)
  const degreeTicks = [];
  for (let i = 0; i < 360; i++) {
      if (i % 30 === 0) continue; // Pula as divisões de signos (já desenhadas pelas cúspides ou bordas)
      const isTen = i % 10 === 0;
      const isFive = i % 5 === 0;
      
      if (!isFive) continue; // Otimização: desenhar apenas a cada 5 graus para reduzir DOM

      const rInner = isTen ? degreeTrackRadius - 5 : degreeTrackRadius - 2;
      const p1 = getPos(i, degreeTrackRadius);
      const p2 = getPos(i, rInner);
      
      degreeTicks.push(
          <line 
            key={`tick-${i}`} 
            x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} 
            stroke="currentColor" 
            strokeOpacity={0.3}
            strokeWidth={1} 
          />
      );
  }

  return (
    <div className="relative w-full aspect-square max-w-[500px] mx-auto select-none text-slate-500 dark:text-slate-400 print:text-black">
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full">
        
        <defs>
           {/* Filtro para sombra suave nos ícones */}
           <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
             <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#000" floodOpacity="0.3" />
           </filter>
        </defs>

        {/* --- 1. CIRCULOS ESTRUTURAIS --- */}
        <circle cx={center} cy={center} r={outerRadius} fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
        <circle cx={center} cy={center} r={zodiacRadius} fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
        <circle cx={center} cy={center} r={degreeTrackRadius} fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3" />
        <circle cx={center} cy={center} r={innerRadius} fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />

        {/* --- 2. FAIXA ZODIACAL --- */}
        {zodiacSectors.map((sector) => (
          <g key={sector.sign}>
            {/* Fundo colorido suave para o signo */}
            <path d={sector.path} fill={sector.color} fillOpacity="0.1" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.2" />
            
            {/* Borda Externa do elemento (opcional, estilo Astrolink tem uma linha colorida fina) */}
            <path 
                d={`M ${getPos(SIGN_ORDER.indexOf(sector.sign)*30, outerRadius).x} ${getPos(SIGN_ORDER.indexOf(sector.sign)*30, outerRadius).y} 
                    A ${outerRadius} ${outerRadius} 0 0 0 ${getPos((SIGN_ORDER.indexOf(sector.sign)+1)*30, outerRadius).x} ${getPos((SIGN_ORDER.indexOf(sector.sign)+1)*30, outerRadius).y}`}
                fill="none"
                stroke={sector.color}
                strokeWidth="2"
            />

            {/* Glifo do Signo */}
            <text 
              x={sector.textPos.x} 
              y={sector.textPos.y} 
              fontSize="20" 
              fill={sector.color} 
              textAnchor="middle" 
              dominantBaseline="central"
              fontWeight="bold"
              style={{ filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.1))' }}
            >
              {sector.glyph}
            </text>
          </g>
        ))}

        {/* --- 3. RÉGUA DE GRAUS (TICKS) --- */}
        <g>{degreeTicks}</g>

        {/* --- 4. CÚSPIDES DAS CASAS --- */}
        {cusps.map((cusp) => {
          // Ângulo da cúspide (início da casa)
          const angle = getSignAngle(cusp.sign, 0); // Assumindo sistema Equal Houses ou usando dados reais se tivéssemos graus das cúspides
          // Nota: Se `cusps` tiver graus precisos, usaríamos aqui. Como o modelo atual simplifica para "Signo da Casa", usamos o grau 0 do signo da cúspide.
          // Para melhorar visualmente se for Equal Houses a partir do Ascendente:
          // Precisaríamos do grau exato do AC para rotacionar tudo. Vamos manter simplificado alinhado aos signos por enquanto ou tentar usar a lógica de casas iguais.
          
          const pStart = getPos(angle, innerRadius);
          const pEnd = getPos(angle, outerRadius); // Linha vai até fora
          
          // Posição do Número da Casa (um pouco mais para dentro do innerRadius)
          const numPos = getPos(angle + 15, innerRadius - 15);

          return (
            <g key={`house-${cusp.house}`}>
                <line 
                    x1={center} y1={center} 
                    x2={pEnd.x} y2={pEnd.y} 
                    stroke="currentColor" 
                    strokeWidth="0.5" 
                    strokeOpacity="0.2"
                />
                <text 
                    x={numPos.x} y={numPos.y} 
                    fontSize="10" 
                    fill="currentColor" 
                    fillOpacity="0.6"
                    textAnchor="middle" 
                    dominantBaseline="central"
                    className="font-display font-bold"
                >
                    {cusp.house}
                </text>
            </g>
          );
        })}

        {/* --- 5. REDE DE ASPECTOS (NO CENTRO) --- */}
        {aspects.map((aspect, idx) => {
          const p1Data = planetPositions.find(p => p.name === aspect.planet1);
          const p2Data = planetPositions.find(p => p.name === aspect.planet2);
          
          if (!p1Data || !p2Data) return null;

          // Posição no anel interno para desenhar a linha
          const p1Inner = getPos(p1Data.absDegree, innerRadius);
          const p2Inner = getPos(p2Data.absDegree, innerRadius);

          const type = aspect.type.toLowerCase();
          let color = "rgba(100,100,100,0.1)"; // Padrão
          let width = 0.5;

          // Cores estilo Astrolink
          if (type.includes("trígono") || type.includes("sextil")) {
              color = "#10B981"; // Verde (Harmônico)
              width = 1;
          }
          if (type.includes("quadratura") || type.includes("oposição")) {
              color = "#EF4444"; // Vermelho (Tenso)
              width = 1;
          }
          if (type.includes("conjunção")) return null; // Geralmente não se desenha linha, ou desenha-se um ponto

          return (
            <line 
              key={`aspect-${idx}`} 
              x1={p1Inner.x} y1={p1Inner.y} 
              x2={p2Inner.x} y2={p2Inner.y} 
              stroke={color} 
              strokeWidth={width} 
              strokeOpacity="0.8"
            />
          );
        })}

        {/* --- 6. PLANETAS --- */}
        {planetPositions.map((p) => {
          const IconComponent = PLANET_ICONS[p.name] || IconZodiacGeneric;
          const iconSize = 18;
          const xPos = p.x - (iconSize / 2);
          const yPos = p.y - (iconSize / 2);
          
          // Cor do ícone baseada no elemento do signo onde está, ou cor fixa? 
          // O Astrolink usa cores especificas para planetas (Sol dourado, Marte vermelho).
          // Vamos manter as cores do tema ou usar preto/cinza para impressão?
          // Usaremos cores funcionais.
          
          return (
            <g key={p.name} className="cursor-pointer hover:opacity-80 transition-opacity">
              <title>{`${p.name} em ${p.sign} (${p.degree}°)`}</title>
              
              {/* Linha guia fina do planeta até o grau exato */}
              <line 
                x1={p.x} y1={p.y}
                x2={p.lineStart.x} y2={p.lineStart.y}
                stroke="currentColor"
                strokeWidth="0.5"
                strokeOpacity="0.5"
              />

              {/* Fundo do Ícone (Círculo Branco/Escuro para limpar as linhas de trás) */}
              <circle 
                cx={p.x} cy={p.y} r={iconSize/1.2} 
                className="fill-background-dark print:fill-white" 
                stroke="none"
              />
              
              {/* Ícone SVG */}
              <svg x={xPos} y={yPos} width={iconSize} height={iconSize} viewBox="0 0 24 24" overflow="visible">
                  <IconComponent size={24} />
              </svg>
              
              {/* Grau Pequeno ao lado */}
              <text 
                x={p.x} y={p.y + iconSize} 
                fontSize="8" 
                fill="currentColor" 
                textAnchor="middle" 
                className="font-sans font-bold"
              >
                {p.degree}°
              </text>
            </g>
          );
        })}

        {/* Centro Decorativo */}
        <circle cx={center} cy={center} r="2" fill="currentColor" opacity="0.5" />
      </svg>
    </div>
  );
}
