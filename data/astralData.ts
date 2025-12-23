

export const SIGN_ORDER = [
  "Áries", "Touro", "Gêmeos", "Câncer", "Leão", "Virgem",
  "Libra", "Escorpião", "Sagitário", "Capricórnio", "Aquário", "Peixes"
];

export const SIGN_RULERS: Record<string, string> = {
  "Áries": "Marte", "Touro": "Vênus", "Gêmeos": "Mercúrio", "Câncer": "Lua",
  "Leão": "Sol", "Virgem": "Mercúrio", "Libra": "Vênus", "Escorpião": "Plutão",
  "Sagitário": "Júpiter", "Capricórnio": "Saturno", "Aquário": "Urano", "Peixes": "Netuno"
};

export const ELEMENT_SIGNS: Record<string, string[]> = {
  "Fogo": ["Áries", "Leão", "Sagitário"],
  "Terra": ["Touro", "Virgem", "Capricórnio"],
  "Ar": ["Gêmeos", "Libra", "Aquário"],
  "Água": ["Câncer", "Escorpião", "Peixes"]
};

export const SIGN_PROFILES: Record<string, string> = {
  "Áries": "Impulsivo, pioneiro e corajoso. Busca a autoafirmação.",
  "Touro": "Paciente, determinado e sensual. Busca segurança material.",
  "Gêmeos": "Comunicativo, versátil e curioso. Busca troca intelectual.",
  "Câncer": "Sensível, protetor e intuitivo. Busca segurança emocional.",
  "Leão": "Criativo, generoso e dramático. Busca reconhecimento.",
  "Virgem": "Analítico, prático e perfeccionista. Busca a eficiência.",
  "Libra": "Diplomático, sociável e equilibrado. Busca harmonia.",
  "Escorpião": "Intenso, magnético e transformador. Busca profundidade.",
  "Sagitário": "Otimista, aventureiro e filosófico. Busca expansão.",
  "Capricórnio": "Ambicioso, disciplinado e prudente. Busca realização.",
  "Aquário": "Original, humanitário e independente. Busca inovação.",
  "Peixes": "Empático, sonhador e místico. Busca transcendência."
};

export const PLANET_CATEGORIES: Record<string, 'Personal' | 'Social' | 'Transpersonal' | 'Point'> = {
  "Sol": "Personal", "Lua": "Personal", "Mercúrio": "Personal", "Vênus": "Personal", "Marte": "Personal",
  "Júpiter": "Social", "Saturno": "Social",
  "Urano": "Transpersonal", "Netuno": "Transpersonal", "Plutão": "Transpersonal",
  "Ascendente": "Point", "Meio do Céu": "Point", "Nodo Norte": "Point", "Parte da Fortuna": "Point",
  "Lilith": "Point", "Kiron": "Point"
};

export const PLANET_SYMBOLOGY: Record<string, string> = {
  "Sol": "A essência vital, o ego consciente e o propósito de vida.",
  "Lua": "As emoções, o subconsciente e as reações instintivas.",
  "Mercúrio": "A comunicação, o intelecto e a forma de pensar.",
  "Vênus": "O amor, os valores, a beleza e o dinheiro.",
  "Marte": "A ação, a energia, o desejo e a agressividade.",
  "Júpiter": "A expansão, a sorte, a filosofia e o crescimento.",
  "Saturno": "A estrutura, a disciplina, os limites e o tempo.",
  "Urano": "A inovação, a liberdade, a rebeldia e o progresso.",
  "Netuno": "A espiritualidade, os sonhos, a ilusão e a inspiração.",
  "Plutão": "A transformação, o poder, a regeneração e o renascimento.",
  "Lilith": "O lado selvagem, a sexualidade reprimida e a independência.",
  "Kiron": "A ferida cura, a chave para a superação e sabedoria.",
  "Ascendente": "A máscara social, a aparência e a primeira impressão.",
  "Meio do Céu": "A carreira, a vocação e a imagem pública.",
  "Nodo Norte": "O destino, o propósito evolutivo e o que devemos aprender.",
  "Parte da Fortuna": "O ponto de harmonia, alegria e prosperidade."
};

export const FORTUNE_HOUSES: Record<number, string> = {
  1: "Autonomia e Iniciativa", 2: "Recursos e Valores", 3: "Comunicação e Aprendizado",
  4: "Raízes e Família", 5: "Criatividade e Expressão", 6: "Serviço e Rotina",
  7: "Parcerias e Relacionamentos", 8: "Transformação e Recursos Compartilhados", 9: "Expansão e Filosofia",
  10: "Carreira e Status", 11: "Amigos e Projetos Futuros", 12: "Espiritualidade e Isolamento"
};

export const FORTUNE_SIGNS: Record<string, string> = {
  "Áries": "Liderança e Coragem", "Touro": "Estabilidade e Prazer", "Gêmeos": "Versatilidade e Troca",
  "Câncer": "Nutrição e Cuidado", "Leão": "Brilho e Criatividade", "Virgem": "Ordem e Serviço",
  "Libra": "Beleza e Justiça", "Escorpião": "Poder e Regeneração", "Sagitário": "Sabedoria e Aventura",
  "Capricórnio": "Ambição e Estrutura", "Aquário": "Inovação e Liberdade", "Peixes": "Compaixão e Arte"
};

export const ESSENTIAL_DIGNITIES: Record<string, { domicile: string[], exaltation: string[], detriment: string[], fall: string[] }> = {
  "Sol": { domicile: ["Leão"], exaltation: ["Áries"], detriment: ["Aquário"], fall: ["Libra"] },
  "Lua": { domicile: ["Câncer"], exaltation: ["Touro"], detriment: ["Capricórnio"], fall: ["Escorpião"] },
  "Mercúrio": { domicile: ["Gêmeos", "Virgem"], exaltation: ["Virgem"], detriment: ["Sagitário", "Peixes"], fall: ["Peixes"] },
  "Vênus": { domicile: ["Touro", "Libra"], exaltation: ["Peixes"], detriment: ["Escorpião", "Áries"], fall: ["Virgem"] },
  "Marte": { domicile: ["Áries", "Escorpião"], exaltation: ["Capricórnio"], detriment: ["Libra", "Touro"], fall: ["Câncer"] },
  "Júpiter": { domicile: ["Sagitário", "Peixes"], exaltation: ["Câncer"], detriment: ["Gêmeos", "Virgem"], fall: ["Capricórnio"] },
  "Saturno": { domicile: ["Capricórnio", "Aquário"], exaltation: ["Libra"], detriment: ["Câncer", "Leão"], fall: ["Áries"] },
  "Urano": { domicile: ["Aquário"], exaltation: ["Escorpião"], detriment: ["Leão"], fall: ["Touro"] },
  "Netuno": { domicile: ["Peixes"], exaltation: ["Câncer"], detriment: ["Virgem"], fall: ["Capricórnio"] },
  "Plutão": { domicile: ["Escorpião"], exaltation: ["Leão"], detriment: ["Touro"], fall: ["Aquário"] },
  "Lilith": { domicile: [], exaltation: [], detriment: [], fall: [] },
  "Kiron": { domicile: [], exaltation: [], detriment: [], fall: [] },
  "Ascendente": { domicile: [], exaltation: [], detriment: [], fall: [] },
  "Meio do Céu": { domicile: [], exaltation: [], detriment: [], fall: [] },
  "Nodo Norte": { domicile: [], exaltation: [], detriment: [], fall: [] },
  "Parte da Fortuna": { domicile: [], exaltation: [], detriment: [], fall: [] }
};

export const HOUSE_DESCRIPTIONS: Record<number, string> = {
  1: "Casa 1: O Eu, Aparência e Iniciativa",
  2: "Casa 2: Dinheiro, Valores e Posses",
  3: "Casa 3: Comunicação, Irmãos e Mente Concreta",
  4: "Casa 4: Família, Lar e Raízes",
  5: "Casa 5: Criatividade, Filhos e Romances",
  6: "Casa 6: Trabalho, Saúde e Rotina",
  7: "Casa 7: Casamento, Parcerias e Inimigos Declarados",
  8: "Casa 8: Sexo, Morte, Transformação e Recursos Alheios",
  9: "Casa 9: Filosofia, Viagens Longas e Ensino Superior",
  10: "Casa 10: Carreira, Status e Reputação",
  11: "Casa 11: Amigos, Grupos e Esperanças",
  12: "Casa 12: Inconsciente, Karma e Isolamento"
};

export const POLARITY_GENERAL = {
  title: "Polaridades: Yin e Yang",
  intro: "O universo astrológico se divide em duas energias primordiais que se complementam.",
  taoism: "O equilíbrio dinâmico entre o receber e o agir."
};

export const YIN_ENERGY = {
  title: "Yin (Feminino/Receptivo)",
  traits: "Introspecção, sensibilidade, magnetismo e conservação.",
  keywords: ["Receptividade", "Intuição", "Interiorização"],
  signs: ["Touro", "Câncer", "Virgem", "Escorpião", "Capricórnio", "Peixes"]
};

export const YANG_ENERGY = {
  title: "Yang (Masculino/Ativo)",
  traits: "Expressão, ação, dinamismo e projeção.",
  keywords: ["Atividade", "Assertividade", "Exteriorização"],
  signs: ["Áries", "Gêmeos", "Leão", "Libra", "Sagitário", "Aquário"]
};

export const QUALITY_GENERAL = {
  title: "Qualidades Primitivas",
  intro: "As qualidades (ou modos) descrevem como a energia dos signos se manifesta e se move.",
  concept: "O ritmo da natureza: Início, Meio e Fim."
};

export const QUALITY_TYPES = [
  {
    id: "cardinal",
    title: "Cardeal",
    keyword: "Início",
    description: "Energia de iniciativa, impulso e começo. São os signos que abrem as estações.",
    signs: [
      { name: "Áries", desc: "Inicia a ação" },
      { name: "Câncer", desc: "Inicia o sentimento" },
      { name: "Libra", desc: "Inicia o relacionamento" },
      { name: "Capricórnio", desc: "Inicia a construção" }
    ]
  },
  {
    id: "fixed",
    title: "Fixo",
    keyword: "Manutenção",
    description: "Energia de estabilidade, foco e persistência. São os signos do meio das estações.",
    signs: [
      { name: "Touro", desc: "Estabiliza a matéria" },
      { name: "Leão", desc: "Estabiliza a identidade" },
      { name: "Escorpião", desc: "Estabiliza a emoção" },
      { name: "Aquário", desc: "Estabiliza o ideal" }
    ]
  },
  {
    id: "mutable",
    title: "Mutável",
    keyword: "Adaptação",
    description: "Energia de flexibilidade, mudança e transição. São os signos que encerram as estações.",
    signs: [
      { name: "Gêmeos", desc: "Dispersa a informação" },
      { name: "Virgem", desc: "Refina a matéria" },
      { name: "Sagitário", desc: "Expande o horizonte" },
      { name: "Peixes", desc: "Dissolve a forma" }
    ]
  }
];

export const LOVE_PROFILES: Record<string, { man: string, woman: string }> = {
  "Áries": { man: "Conquistador e direto.", woman: "Independente e apaixonada." },
  "Touro": { man: "Sensual e protetor.", woman: "Leal e carinhosa." },
  "Gêmeos": { man: "Divertido e intelectual.", woman: "Curiosa e comunicativa." },
  "Câncer": { man: "Romântico e caseiro.", woman: "Maternal e acolhedora." },
  "Leão": { man: "Generoso e apaixonado.", woman: "Rainha e dramática." },
  "Virgem": { man: "Prestativo e detalhista.", woman: "Discreta e dedicada." },
  "Libra": { man: "Galanteador e romântico.", woman: "Elegante e sociável." },
  "Escorpião": { man: "Intenso e misterioso.", woman: "Sedutora e profunda." },
  "Sagitário": { man: "Aventureiro e livre.", woman: "Entusiasta e honesta." },
  "Capricórnio": { man: "Sério e comprometido.", woman: "Ambiciosa e fiel." },
  "Aquário": { man: "Original e amigo.", woman: "Imprevisível e racional." },
  "Peixes": { man: "Sensível e sonhador.", woman: "Empática e mística." }
};

// --- Numerology Data ---
export const MOTIVATION_DESCRIPTIONS: Record<number, string> = { 1: "Liderança e Autonomia", 2: "Cooperação e Diplomacia", 3: "Expressão e Criatividade", 4: "Ordem e Estabilidade", 5: "Liberdade e Aventura", 6: "Harmonia e Responsabilidade", 7: "Sabedoria e Perfeição", 8: "Poder e Realização", 9: "Compaixão e Universalidade", 11: "Inspiração e Idealismo", 22: "Construção e Grandeza" };
export const IMPRESSION_DESCRIPTIONS: Record<number, string> = { 1: "Forte e Original", 2: "Gentil e Acolhedor", 3: "Sociável e Alegre", 4: "Sério e Organizado", 5: "Magnético e Versátil", 6: "Protetor e Paternal/Maternal", 7: "Misterioso e Distinto", 8: "Bem-sucedido e Autoritário", 9: "Generoso e Amplo", 11: "Idealista e Diferente", 22: "Mestre e Sólido" };
export const EXPRESSION_DESCRIPTIONS: Record<number, string> = { 1: "Inovador e Líder", 2: "Diplomata e Parceiro", 3: "Artista e Comunicador", 4: "Organizador e Construtor", 5: "Vendedor e Promotor", 6: "Cuidador e Harmonizador", 7: "Pesquisador e Filósofo", 8: "Executivo e Gestor", 9: "Humanitário e Guia", 11: "Visionário e Inspirador", 22: "Arquiteto e Realizador Global" };
export const DESTINY_DESCRIPTIONS: Record<number, string> = { 1: "Abrir novos caminhos.", 2: "Unir pessoas e ideias.", 3: "Comunicar alegria e beleza.", 4: "Construir bases sólidas.", 5: "Promover mudanças e progresso.", 6: "Cuidar da família e comunidade.", 7: "Buscar a verdade interior.", 8: "Gerar riqueza e poder.", 9: "Ajudar o mundo e servir.", 11: "Inspirar espiritualmente.", 22: "Realizar grandes obras materiais." };
export const MISSION_DESCRIPTIONS: Record<number, string> = { 1: "Ser independente e pioneiro.", 2: "Ser parceiro e pacificador.", 3: "Ser criativo e expressivo.", 4: "Ser trabalhador e honesto.", 5: "Ser livre e adaptável.", 6: "Ser responsável e amoroso.", 7: "Ser analítico e sábio.", 8: "Ser justo e próspero.", 9: "Ser altruísta e compreensivo.", 11: "Ser iluminado.", 22: "Ser universal." };
export const BIRTH_DAY_DESCRIPTIONS: Record<number, string> = { 1: "Líder nato.", 10: "Pioneiro decidido.", 19: "Independente ao extremo." }; 
export const KARMIC_DEBT_DESCRIPTIONS: Record<number, string> = {
  13: "Dívida do trabalho e preguiça em vidas passadas. Exige disciplina e esforço.",
  14: "Dívida do abuso da liberdade e dos sentidos. Exige moderação e foco.",
  16: "Dívida do ego e relacionamentos ilícitos. Exige humildade e reconstrução.",
  19: "Dívida do abuso de poder e egoísmo. Exige compaixão e ajuda ao próximo."
};
export const KARMIC_LESSON_DESCRIPTIONS: Record<number, string> = { 1: "Falta de Iniciativa", 2: "Falta de Tato", 3: "Falta de Autoexpressão", 4: "Falta de Ordem/Trabalho", 5: "Falta de Adaptação", 6: "Falta de Responsabilidade", 7: "Falta de Fé/Análise", 8: "Falta de Julgamento", 9: "Falta de Compreensão Humana" };
export const HIDDEN_TENDENCY_DESCRIPTIONS: Record<number, string> = { 1: "Dominador", 2: "Sensível demais", 3: "Disperso", 4: "Rígido", 5: "Impulsivo", 6: "Ansioso/Controlador", 7: "Crítico/Solitário", 8: "Materialista", 9: "Emotivo/Dramático" };
export const PERSONAL_YEAR_DESCRIPTIONS: Record<number, string> = { 1: "Novos inícios e sementes.", 2: "Parcerias e paciência.", 3: "Expressão e vida social.", 4: "Trabalho duro e organização.", 5: "Mudanças e viagens.", 6: "Família e responsabilidades.", 7: "Introspecção e estudo.", 8: "Colheita e poder material.", 9: "Finalizações e limpeza." };
export const PERSONAL_MONTH_DESCRIPTIONS: Record<number, string> = { 1: "Ação.", 2: "Espera.", 3: "Alegria.", 4: "Ordem.", 5: "Movimento.", 6: "Amor.", 7: "Estudo.", 8: "Dinheiro.", 9: "Limpeza." };
export const PSYCHIC_NUMBER_DESCRIPTIONS: Record<number, string> = { 1: "Individualista e criativo.", 2: "Sensível e diplomático.", 3: "Otimista e popular.", 4: "Prático e leal.", 5: "Aventureiro e versátil.", 6: "Harmônico e caseiro.", 7: "Intelectual e místico.", 8: "Ambicioso e eficiente.", 9: "Humanitário e guerreiro." };
export const PROFESSIONAL_POTENTIAL_DESCRIPTIONS: Record<number, string> = { 1: "Gerência e Inovação", 2: "Psicologia e Diplomacia", 3: "Artes e Comunicação", 4: "Engenharia e Construção", 5: "Turismo e Vendas", 6: "Saúde e Educação", 7: "Ciência e Tecnologia", 8: "Finanças e Direito", 9: "ONGs e Assistência Social" };
export const SUBCONSCIOUS_RESPONSE_DESCRIPTIONS: Record<number, string> = { 9: "Seguro e Compassivo", 8: "Analítico e Eficiente", 7: "Intuitivo e Distante", 6: "Protetor e Responsável", 5: "Rápido e Adaptável", 4: "Cauteloso e Metódico", 3: "Otimista e Criativo", 2: "Receoso e Cooperativo", 1: "Imediato e Defensivo" };
export const FAVORABLE_COLORS: Record<number, string> = { 1: "Vermelho e Dourado", 2: "Laranja e Branco", 3: "Amarelo e Púrpura", 4: "Verde e Marrom", 5: "Azul Claro e Cinza", 6: "Indigo e Rosa", 7: "Violeta e Cinza", 8: "Preto, Rosa e Azul Escuro", 9: "Dourado e Vermelho", 11: "Prata e Branco", 22: "Cobre e Creme" };
export const MARITAL_HARMONY_TEXTS: Record<number, string> = { 1: "Busca alguém que o admire.", 2: "Busca proteção e carinho.", 3: "Busca diversão e estímulo.", 4: "Busca segurança e lealdade.", 5: "Busca aventura e espaço.", 6: "Busca família e conforto.", 7: "Busca alma gêmea intelectual.", 8: "Busca status e competência.", 9: "Busca amor universal e ideal." };
export const MARITAL_HARMONY_TABLE: Record<number, { vibra: string, atrai: string, oposto: string, passivo: string }> = {
  1: { vibra: "1, 5, 7", atrai: "4, 8", oposto: "2, 6", passivo: "3, 9" },
  2: { vibra: "2, 4, 8", atrai: "1, 7", oposto: "5, 9", passivo: "3, 6" },
  3: { vibra: "3, 6, 9", atrai: "2, 7", oposto: "4, 8", passivo: "1, 5" },
  4: { vibra: "4, 2, 8", atrai: "1, 7", oposto: "3, 5", passivo: "6, 9" },
  5: { vibra: "5, 1, 9", atrai: "3, 7", oposto: "2, 4", passivo: "6, 8" },
  6: { vibra: "6, 3, 9", atrai: "2, 5", oposto: "1, 8", passivo: "4, 7" },
  7: { vibra: "7, 1, 5", atrai: "2, 4", oposto: "6, 9", passivo: "3, 8" },
  8: { vibra: "8, 2, 4", atrai: "1, 5", oposto: "3, 6", passivo: "7, 9" },
  9: { vibra: "9, 3, 6", atrai: "1, 5", oposto: "2, 8", passivo: "4, 7" }
};
export const LIFE_CYCLE_1_DESCRIPTIONS: Record<number, string> = { 1: "Independência precoce.", 2: "Dependência emocional.", 3: "Criatividade na infância.", 4: "Restrições.", 5: "Mudanças constantes.", 6: "Responsabilidades cedo.", 7: "Solidão ou estudo.", 8: "Consciência material.", 9: "Dramas familiares." };
export const LIFE_CYCLE_2_DESCRIPTIONS: Record<number, string> = { 1: "Liderança na vida adulta.", 2: "Parcerias profissionais.", 3: "Sucesso social.", 4: "Construção de patrimônio.", 5: "Expansão e viagens.", 6: "Família e comunidade.", 7: "Especialização.", 8: "Poder e autoridade.", 9: "Altruísmo." };
export const LIFE_CYCLE_3_DESCRIPTIONS: Record<number, string> = { 1: "Ativo até o fim.", 2: "Paz e tranquilidade.", 3: "Alegria e amigos.", 4: "Segurança financeira.", 5: "Liberdade tardia.", 6: "Aconselhamento.", 7: "Sabedoria e retiro.", 8: "Reconhecimento.", 9: "Legado humanitário." };
export const DECISIVE_MOMENT_1_DESCRIPTIONS: Record<number, string> = { 1: "Momento de se afirmar.", 2: "Momento de cooperar.", 3: "Momento de se expressar.", 4: "Momento de trabalhar.", 5: "Momento de mudar.", 6: "Momento de casar/família.", 7: "Momento de estudar.", 8: "Momento de ganhar.", 9: "Momento de doar." };
export const DECISIVE_MOMENT_2_DESCRIPTIONS: Record<number, string> = { 1: "Novos projetos.", 2: "Diplomacia necessária.", 3: "Expansão social.", 4: "Organização.", 5: "Aventura.", 6: "Responsabilidade doméstica.", 7: "Análise interior.", 8: "Sucesso material.", 9: "Conclusão de ciclo." };
export const DECISIVE_MOMENT_3_DESCRIPTIONS: Record<number, string> = { 1: "Liderança madura.", 2: "Paciência.", 3: "Otimismo.", 4: "Consolidação.", 5: "Liberdade.", 6: "Harmonia.", 7: "Perfeição.", 8: "Autoridade.", 9: "Universalidade." };
export const DECISIVE_MOMENT_4_DESCRIPTIONS: Record<number, string> = { 1: "Autossuficiência.", 2: "Paz.", 3: "Inspiração.", 4: "Ordem.", 5: "Viagens.", 6: "Conselheiro.", 7: "Mestre.", 8: "Patriarca/Matriarca.", 9: "Filantropo." };
export const CHALLENGE_DESCRIPTIONS: Record<number, string> = { 
  0: "O desafio é a escolha. Você tem tudo, mas precisa decidir.",
  1: "O desafio é o ego. Aprender a ser independente sem ser arrogante.",
  2: "O desafio é a sensibilidade. Aprender a não se magoar fácil.",
  3: "O desafio é o foco. Evitar dispersão de talentos.",
  4: "O desafio é o trabalho. Evitar preguiça ou rigidez.",
  5: "O desafio é a liberdade. Evitar impulsividade.",
  6: "O desafio é o idealismo. Aceitar as coisas como são.",
  7: "O desafio é a fé. Evitar o ceticismo e isolamento.",
  8: "O desafio é o materialismo. Equilibrar dinheiro e espírito."
};
export const INTER_VALUE_DESCRIPTIONS: Record<number, string> = { 
  1: "Muita iniciativa.", 2: "Muita cooperação.", 3: "Muita comunicação.", 
  4: "Muita organização.", 5: "Muita curiosidade.", 6: "Muita responsabilidade.", 
  7: "Muita análise.", 8: "Muita eficiência.", 9: "Muita compreensão." 
};
export const ASCENSION_DESCRIPTIONS: Record<string, string> = {
  "Elevado": "Sua Alma (Motivação) vibra na mesma frequência que seu Ego (Impressão). Há coerência interna.",
  "Rebaixado": "Sua Alma deseja mais do que seu Ego aparenta. Pode haver conflito interno ou sensação de não ser compreendido.",
  "Ascensao": "Seu Ego projeta uma imagem que eleva sua Alma. Você tende a crescer através das interações sociais."
};

export const ARCANE_DESCRIPTIONS: Record<number, string> = {
  0: "Indica a ausência de luz, a ignorância e o caos. Representa o nada, o vazio que precede a criação ou a destruição total. Pode indicar um momento de confusão, incerteza e falta de direção.",
  1: "Aponta para o dom e para o potencial criativo que ainda não se manifestaram. Pode surgir como um pressentimento, uma intuição, uma súbita rajada de energia com relação a novas oportunidades. Indica um momento de clareza e de identificação das possibilidades inexploradas. O Mago vem indicar que agora a viagem será possível, e que ele tem consciência de suas reais possibilidades e de como, e onde, deve usar seus recursos. A atenção deve se voltar para a intuição e os pressentimentos, pois podem revelar as novas oportunidades que poderão surgir de modo inesperado. Representa a atividade mental consciente, a convicção e a direção e prontidão; a inteligência materializada pela vontade.",
  2: "Indica força e intuição e sugere o encontro com o mundo interior. O indivíduo pode estar sendo conduzido para esse mundo sem qualquer explicação por intermédio de seu interesse pelas coisas ocultas, pelo esoterismo, ou, talvez, pelos efeitos de algum sonho perturbador. Enfim, por algo que de alguma forma lhe diga que existem forças superiores que atuam na vida das pessoas. Denota percepção das próprias necessidades espirituais e sentimento religioso. Representa a atividade mental intuitiva, a sensibilidade aflorada.",
  3: "Significa cultura, criatividade, produtividade, abundância, boas colheitas, êxito em um ambiente seguro e isento de perigos. Fertilidade tanto mental como física. Indica uma fase da vida mais ligada às coisas terrenas. Um casamento, ou mesmo o nascimento de uma criança podem estar prestes a acontecer. A Imperatriz mostra ainda o êxito nas empresas, e nos empreendimentos, se a pessoa for firme e reta nos pensamentos e ações. Representa o poder da imaginação, a visualização criativa, as emoções saudáveis e o amor; a materialização do desejo; comunicação, inovação, fertilidade, expansão e crescimento.",
  4: "Significa liderança, atividade mental, dominação, domínio, paternidade. Ditadura; paixão, mas sempre controlada pela inteligência. É a majestade e o poder. Mostra manifestação de autoridade ou necessidade de consulta a uma autoridade ou superior hierárquico. Confronto com o princípio paternal, tanto no seu aspecto positivo quanto negativo. Representa o poder e a autoridade, a faculdade da razão, a lógica e o raciocínio indutivo; atividade, força e"
};

export const PLANET_DATA: Record<string, { signs: Record<string, string> }> = {
  "Sol": {
    signs: {
      "Áries": "Vitalidade pioneira e busca por afirmação pessoal.",
      "Touro": "Determinação constante e apreço pelo conforto.",
      "Gêmeos": "Curiosidade intelectual e versatilidade.",
      "Câncer": "Sensibilidade protetora e conexão familiar.",
      "Leão": "Expressão criativa, carisma e liderança.",
      "Virgem": "Análise detalhada e busca por perfeição.",
      "Libra": "Busca por harmonia, beleza e parcerias.",
      "Escorpião": "Intensidade emocional e poder de regeneração.",
      "Sagitário": "Otimismo, fé e busca por expansão.",
      "Capricórnio": "Ambição, disciplina e foco na realização.",
      "Aquário": "Originalidade, independência e visão social.",
      "Peixes": "Empatia, intuição e conexão espiritual."
    }
  },
  "Lua": {
    signs: {
      "Áries": "Reage com rapidez e impulsividade.",
      "Touro": "Busca segurança e estabilidade emocional.",
      "Gêmeos": "Racionaliza emoções e precisa conversar.",
      "Câncer": "Sente profundamente e protege os seus.",
      "Leão": "Precisa de atenção e expressa drama.",
      "Virgem": "Analisa sentimentos e busca ser útil.",
      "Libra": "Busca paz e equilíbrio nos relacionamentos.",
      "Escorpião": "Emoções intensas, profundas e transformadoras.",
      "Sagitário": "Precisa de liberdade e otimismo emocional.",
      "Capricórnio": "Controlado, sério e reservado emocionalmente.",
      "Aquário": "Desapegado e racional nas emoções.",
      "Peixes": "Sensível, esponja emocional e compassivo."
    }
  }
};

const ALL_PLANETS_LIST = ["Mercúrio", "Vênus", "Marte", "Júpiter", "Saturno", "Urano", "Netuno", "Plutão", "Lilith", "Kiron", "Ascendente", "Meio do Céu", "Nodo Norte", "Parte da Fortuna"];
ALL_PLANETS_LIST.forEach(p => {
    if (!PLANET_DATA[p]) PLANET_DATA[p] = { signs: {} };
    SIGN_ORDER.forEach(s => {
        if (!PLANET_DATA[p].signs[s]) PLANET_DATA[p].signs[s] = `Energia de ${p} atuando através de ${s}.`;
    });
});

export const PLANETS_IN_HOUSES: Record<number, Record<string, string>> = {};
for (let i = 1; i <= 12; i++) {
    PLANETS_IN_HOUSES[i] = {
        "Sol": `A consciência e vitalidade focam na área da vida regida pela Casa ${i}.`,
        "Lua": `As emoções e reações instintivas se manifestam nos assuntos da Casa ${i}.`,
        "Mercúrio": `O intelecto e comunicação são ativos na Casa ${i}.`,
        "Vênus": `Valores, prazer e harmonia são buscados na Casa ${i}.`,
        "Marte": `A energia, ação e desejo de conquista estão na Casa ${i}.`,
        "Júpiter": `Expansão, sorte e busca de significado na Casa ${i}.`,
        "Saturno": `Responsabilidade, limitações e lições na Casa ${i}.`,
        "Urano": `Inovação, mudanças súbitas e liberdade na Casa ${i}.`,
        "Netuno": `Sonhos, idealismo e dissolução de fronteiras na Casa ${i}.`,
        "Plutão": `Transformação profunda, poder e regeneração na Casa ${i}.`,
        "Lilith": `Desejos ocultos e independência na Casa ${i}.`,
        "Kiron": `Feridas emocionais e potencial de cura na Casa ${i}.`,
        "Ascendente": `A personalidade se projeta através da Casa ${i}.`,
        "Meio do Céu": `A vocação e imagem pública na Casa ${i}.`,
        "Nodo Norte": `O destino e aprendizado evolutivo na Casa ${i}.`,
        "Parte da Fortuna": `A prosperidade flui através dos temas da Casa ${i}.`
    };
}
