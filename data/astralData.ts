

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
  "Áries": "O pioneiro, corajoso e energético. Impulsivo e direto.",
  "Touro": "Paciente, confiável e sensual. Busca estabilidade e prazer.",
  "Gêmeos": "Curioso, adaptável e comunicativo. Mente ágil e dual.",
  "Câncer": "Emocional, intuitivo e protetor. Ligado à família e raízes.",
  "Leão": "Criativo, apaixonado e generoso. Gosta de ser o centro das atenções.",
  "Virgem": "Analítico, prático e perfeccionista. Atento aos detalhes e saúde.",
  "Libra": "Diplomático, justo e social. Busca harmonia e beleza.",
  "Escorpião": "Intenso, misterioso e transformador. Profundo e investigativo.",
  "Sagitário": "Otimista, aventureiro e filosófico. Busca a verdade e expansão.",
  "Capricórnio": "Ambicioso, disciplinado e responsável. Focado em metas e carreira.",
  "Aquário": "Inovador, humanitário e independente. Original e voltado ao futuro.",
  "Peixes": "Sonhador, compassivo e artístico. Sensível e espiritual."
};

export const PLANET_CATEGORIES: Record<string, 'Personal' | 'Social' | 'Transpersonal' | 'Point'> = {
  "Sol": "Personal", "Lua": "Personal", "Mercúrio": "Personal", "Vênus": "Personal", "Marte": "Personal",
  "Júpiter": "Social", "Saturno": "Social",
  "Urano": "Transpersonal", "Netuno": "Transpersonal", "Plutão": "Transpersonal",
  "Ascendente": "Point", "Meio do Céu": "Point", "Nodo Norte": "Point", "Parte da Fortuna": "Point",
  "Lilith": "Point", "Kiron": "Point"
};

export const PLANET_SYMBOLOGY: Record<string, string> = {
  "Sol": "Essência, vitalidade e ego.",
  "Lua": "Emoções, instintos e subconsciente.",
  "Mercúrio": "Comunicação, intelecto e raciocínio.",
  "Vênus": "Amor, beleza e valores.",
  "Marte": "Ação, desejo e coragem.",
  "Júpiter": "Expansão, sorte e sabedoria.",
  "Saturno": "Estrutura, disciplina e limites.",
  "Urano": "Inovação, liberdade e rebeldia.",
  "Netuno": "Sonhos, ilusão e espiritualidade.",
  "Plutão": "Transformação, poder e regeneração.",
  "Lilith": "A sombra, desejo reprimido e independência.",
  "Kiron": "A ferida que cura, sabedoria através da dor.",
  "Ascendente": "A máscara social e a primeira impressão.",
  "Meio do Céu": "Carreira, reputação e objetivo de vida.",
  "Nodo Norte": "O destino e o caminho da evolução.",
  "Parte da Fortuna": "Onde a alegria e a prosperidade fluem naturalmente."
};

export const PLANET_DATA: Record<string, { signs: Record<string, string> }> = {
  "Sol": { signs: SIGN_PROFILES },
  "Lua": { signs: SIGN_PROFILES },
  "Mercúrio": { signs: SIGN_PROFILES },
  "Vênus": { signs: SIGN_PROFILES },
  "Marte": { signs: SIGN_PROFILES },
  "Júpiter": { signs: SIGN_PROFILES },
  "Saturno": { signs: SIGN_PROFILES },
  "Urano": { signs: SIGN_PROFILES },
  "Netuno": { signs: SIGN_PROFILES },
  "Plutão": { signs: SIGN_PROFILES },
  "Lilith": { signs: SIGN_PROFILES },
  "Kiron": { signs: SIGN_PROFILES },
  "Ascendente": { signs: SIGN_PROFILES },
  "Meio do Céu": { signs: SIGN_PROFILES },
  "Nodo Norte": { signs: SIGN_PROFILES }
};

export const PLANETS_IN_HOUSES: Record<number, Record<string, string>> = {};
for (let i = 1; i <= 12; i++) {
  PLANETS_IN_HOUSES[i] = {};
  for (const p of Object.keys(PLANET_SYMBOLOGY)) {
    PLANETS_IN_HOUSES[i][p] = `${p} na Casa ${i}`;
  }
}

export const FORTUNE_HOUSES: Record<number, string> = {
  1: "Identidade e Iniciativa", 2: "Recursos e Valores", 3: "Comunicação e Aprendizado", 4: "Lar e Raízes",
  5: "Criatividade e Romance", 6: "Rotina e Saúde", 7: "Parcerias e Casamento", 8: "Transformação e Bens Compartilhados",
  9: "Filosofia e Viagens", 10: "Carreira e Reputação", 11: "Amigos e Projetos Futuros", 12: "Espiritualidade e Inconsciente"
};

export const FORTUNE_SIGNS: Record<string, string> = {
  "Áries": "Liderança", "Touro": "Estabilidade", "Gêmeos": "Versatilidade", "Câncer": "Nutrição",
  "Leão": "Autoexpressão", "Virgem": "Serviço", "Libra": "Harmonia", "Escorpião": "Profundidade",
  "Sagitário": "Exploração", "Capricórnio": "Realização", "Aquário": "Inovação", "Peixes": "Compaixão"
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
    "Netuno": { domicile: ["Peixes"], exaltation: ["Leão"], detriment: ["Virgem"], fall: ["Aquário"] },
    "Plutão": { domicile: ["Escorpião"], exaltation: ["Áries"], detriment: ["Touro"], fall: ["Libra"] },
    "Lilith": { domicile: [], exaltation: [], detriment: [], fall: [] },
    "Kiron": { domicile: [], exaltation: [], detriment: [], fall: [] },
    "Ascendente": { domicile: [], exaltation: [], detriment: [], fall: [] },
    "Meio do Céu": { domicile: [], exaltation: [], detriment: [], fall: [] },
    "Nodo Norte": { domicile: [], exaltation: [], detriment: [], fall: [] },
    "Parte da Fortuna": { domicile: [], exaltation: [], detriment: [], fall: [] }
};

const createDescMap = (prefix: string) => {
  const map: Record<number, string> = {};
  for(let i=1; i<=33; i++) map[i] = `${prefix} ${i}`;
  return map;
};

export const MOTIVATION_DESCRIPTIONS = createDescMap("Motivação");
export const IMPRESSION_DESCRIPTIONS = createDescMap("Impressão");
export const EXPRESSION_DESCRIPTIONS = createDescMap("Expressão");
export const DESTINY_DESCRIPTIONS = createDescMap("Destino");
export const MISSION_DESCRIPTIONS = createDescMap("Missão");
export const BIRTH_DAY_DESCRIPTIONS = createDescMap("Dia");
export const KARMIC_DEBT_DESCRIPTIONS = createDescMap("Dívida");
export const KARMIC_LESSON_DESCRIPTIONS = createDescMap("Lição");
export const HIDDEN_TENDENCY_DESCRIPTIONS = createDescMap("Tendência");
export const PERSONAL_YEAR_DESCRIPTIONS = createDescMap("Ano Pessoal");
export const LIFE_CYCLE_1_DESCRIPTIONS = createDescMap("Ciclo 1");
export const LIFE_CYCLE_2_DESCRIPTIONS = createDescMap("Ciclo 2");
export const LIFE_CYCLE_3_DESCRIPTIONS = createDescMap("Ciclo 3");
export const DECISIVE_MOMENT_1_DESCRIPTIONS = createDescMap("Momento 1");
export const DECISIVE_MOMENT_2_DESCRIPTIONS = createDescMap("Momento 2");
export const DECISIVE_MOMENT_3_DESCRIPTIONS = createDescMap("Momento 3");
export const DECISIVE_MOMENT_4_DESCRIPTIONS = createDescMap("Momento 4");

export const HOUSE_DESCRIPTIONS: Record<string, string> = {
  "1": "Casa 1: A Personalidade e o Eu.",
  "2": "Casa 2: Valores e Recursos.",
  "3": "Casa 3: Comunicação e Mente.",
  "4": "Casa 4: Lar e Família.",
  "5": "Casa 5: Criatividade e Prazer.",
  "6": "Casa 6: Trabalho e Saúde.",
  "7": "Casa 7: Parcerias e Casamento.",
  "8": "Casa 8: Transformação e Mistério.",
  "9": "Casa 9: Filosofia e Expansão.",
  "10": "Casa 10: Carreira e Status.",
  "11": "Casa 11: Amigos e Sociedade.",
  "12": "Casa 12: Inconsciente e Espiritualidade."
};

export const POLARITY_GENERAL = {
  title: "Polaridades",
  intro: "Yin e Yang.",
  taoism: "O equilíbrio dos opostos."
};

export const YANG_ENERGY = {
  title: "Yang",
  traits: "Ativo, emissor, diurno.",
  keywords: ["Ação", "Força"],
  signs: ["Áries", "Gêmeos", "Leão", "Libra", "Sagitário", "Aquário"]
};

export const YIN_ENERGY = {
  title: "Yin",
  traits: "Passivo, receptor, noturno.",
  keywords: ["Reflexão", "Cuidado"],
  signs: ["Touro", "Câncer", "Virgem", "Escorpião", "Capricórnio", "Peixes"]
};

export const LOVE_PROFILES: Record<string, { man: string, woman: string }> = {
  "Áries": { man: "Apaixonado e direto.", woman: "Intensa e independente." },
  "Touro": { man: "Sensual e protetor.", woman: "Leal e carinhosa." },
  "Gêmeos": { man: "Comunicativo e divertido.", woman: "Curiosa e versátil." },
  "Câncer": { man: "Romântico e cuidadoso.", woman: "Afetuosa e maternal." },
  "Leão": { man: "Generoso e leal.", woman: "Radiante e exigente." },
  "Virgem": { man: "Prestativo e atento.", woman: "Discreta e dedicada." },
  "Libra": { man: "Galante e charmoso.", woman: "Romântica e idealista." },
  "Escorpião": { man: "Intenso e misterioso.", woman: "Magnética e profunda." },
  "Sagitário": { man: "Aventureiro e honesto.", woman: "Livre e entusiasta." },
  "Capricórnio": { man: "Sério e comprometido.", woman: "Ambiciosa e fiel." },
  "Aquário": { man: "Original e amigo.", woman: "Independente e imprevisível." },
  "Peixes": { man: "Sonhador e sensível.", woman: "Empática e devotada." }
};

export const QUALITY_GENERAL = {
  title: "Qualidades (Modalidades)",
  intro: "A forma como a energia se manifesta.",
  concept: "Início, meio e fim."
};

export const QUALITY_TYPES = [
  { 
      id: "cardinal", 
      title: "Cardinal", 
      keyword: "Iniciativa", 
      description: "Iniciam as estações.", 
      signs: [{name: "Áries", desc: "Ação"}, {name: "Câncer", desc: "Emoção"}, {name: "Libra", desc: "Relação"}, {name: "Capricórnio", desc: "Ambição"}] 
  },
  { 
      id: "fixed", 
      title: "Fixo", 
      keyword: "Estabilidade", 
      description: "Mantêm as estações.", 
      signs: [{name: "Touro", desc: "Posse"}, {name: "Leão", desc: "Expressão"}, {name: "Escorpião", desc: "Desejo"}, {name: "Aquário", desc: "Conhecimento"}] 
  },
  { 
      id: "mutable", 
      title: "Mutável", 
      keyword: "Adaptação", 
      description: "Terminam as estações.", 
      signs: [{name: "Gêmeos", desc: "Troca"}, {name: "Virgem", desc: "Análise"}, {name: "Sagitário", desc: "Busca"}, {name: "Peixes", desc: "Sonho"}] 
  }
];

export const CHALLENGE_DESCRIPTIONS: Record<number, string> = {
  0: "Pode escolher entre enfrentar todos os obstáculos que existem, ou não ter desafio algum a vencer. Seu Eu Superior saberá orientá-lo(a), pois a sua alma possui a inteligência do significado. A vida pode parecer fácil ou extremamente exigente, dependendo da sua evolução espiritual.",
  1: "Falta de iniciativa e dificuldade para decidir. Tendência para a solidão ou para a independência extrema. Precisa desenvolver a força de vontade, a coragem e o caráter, ou estará sujeito(a) a ser dominado(a) pelos outros.",
  2: "Dualidade, vacilação, extrema sensibilidade; falta de autoconfiança. Precisa desenvolver a confiança em si próprio(a) ou se tornará muito inibido(a). É muito sensível e vulnerável, por isso tende a se magoar facilmente.",
  3: "Tendência para o desperdício de energia e a falar em excesso, ou emudecer demais. Precisa aprender a não dispersar seus talentos, pois tende a fazer muitas coisas ao mesmo tempo. Apsar de criativo, pode faltar foco.",
  4: "Tendência para a falta de organização ou para o excesso de normas; para a preguiça ou preocupação excessiva com pouca coisa. Precisa aprender a disciplinar-se com relação a ser metódico e prático.",
  5: "Excesso ou falta de atividade; instabilidade emocional e material. Fuga da responsabilidade, sexualidade intensa, impulsividade excessiva que pode implicar em adiamentos. Precisa aprender a lidar com a liberdade e mudança.",
  6: "Excesso de responsabilidade familiar; prepotência. Seja idealista e não dominador(a). Evite influir na vida dos outros sem ser convidado(a), evitando aconselhar ou criticar fora de propósito.",
  7: "Arrogância e excesso de vaidade e falta de autoanálise. Escapismo, medo de pobreza, medo de ficar só e de rejeição, falta de fé. Mostra-se rebelde contra os tipos de pressão e tiranias e tende ao isolamento.",
  8: "Cuidado com desperdício, preocupação excessiva com dinheiro, sede de poder e medo da invalidez. Liberdade pessoal baseada em posses materiais é seu principal objetivo, o que pode levar a um materialismo vazio."
};

export const INTER_VALUE_DESCRIPTIONS: Record<number, string> = {
  1: "Indica independência, ambição e interesses próprios. Também mostra egoísmo e possessividade.",
  2: "Indica tato e diplomacia; grande amor pela música e as artes de um modo geral. É harmônico(a) e tem capacidade de cooperação. Por vezes, também indica insegurança e timidez.",
  3: "Indica capacidade de expressão, forte imaginação e senso de humor. Às vezes é sinal de irresponsabilidade e impaciência a uma atitude realista ou materialista.",
  4: "Indica honestidade e tendência para o trabalho árduo. Porém, tem carência de concentração e julgamento imparcial; possibilidade de obstinação.",
  5: "Indica impulsividade e nervosismo; grande desejo por sexo. As viagens e as mudanças lhe são altamente favoráveis.",
  6: "Indica capacidade de assumir grandes responsabilidades. É de confiança, caseiro(a), pai, ou mãe, e educador(a) nato(a). Tem tendência a polêmicas, brigas e instabilidade emocional.",
  7: "Indica poder de análise, agilidade mental, perfeccionismo, equilíbrio e cultura. Grande inclinação pelos assuntos metafísicos e se retrair.",
  8: "Indica capacidade para negócios, habilidade executiva, liderança, iniciativa, tato e grande senso de valores materiais. Tem tendências a se mostrar como dono(a) da verdade.",
  9: "Indica um modo de ver universal. Revela dons artísticos e literários. Adora viajar. Em muitos casos, também indica visão estreita e egocentrismo, ou demasiado desapego e afastamento da realidade."
};

export const ASCENSION_DESCRIPTIONS: Record<string, string> = {
  "Elevado": "Espírito Elevado: Estamos diante de um espírito elevado que veio a este planeta (neste momento) para iluminar outras almas. Há equilíbrio entre o desejo interior (Motivação) e a manifestação exterior (Impressão).",
  "Rebaixado": "Espírito Rebaixado: Estamos diante de um espírito que alcançou um elevado grau de honrarias e, transgredindo as Leis Naturais, foi “rebaixado”, voltando agora em um meio inferior ao que viveu antes para aprender a humildade.",
  "Ascensao": "Espírito em Ascensão: Estamos diante de um espírito em ascensão. A jornada atual é de crescimento e conquista de novos patamares evolutivos através do esforço e aprendizado."
};

// --- NOVOS DADOS: MÊS PESSOAL, PSÍQUICO, PROFISSIONAL, SUBCONSCIENTE, CORES, HARMONIA ---

export const PERSONAL_MONTH_DESCRIPTIONS: Record<number, string> = {
  1: "É o mês para assumir o comando e novas responsabilidades. Bom para desenvolver a individualidade e a independência, para abrir novas oportunidades, decidir, começar algo novo, dinamizar, propor, apressar as coisas. Favorece os pioneiros e líderes. Para negócios e especulações, é excelente.",
  2: "É um mês passivo e receptivo, bom para exercitar a paciência, harmonizar e apaziguar grupos, agir com diplomacia, assumir compromissos e proteger. É um mês de hesitações, portanto, evite iniciar projetos arriscados. O êxito virá pela colaboração.",
  3: "Um mês favorável para as relações externas e os contatos. Bom para a vida social, as amizades, para aventurar-se em novo relacionamento. Ideal para expressar alegria e criatividade, diversão e popularidade. Cuidado para não dispersar energias.",
  4: "É um mês para trabalhar na construção de fundações sólidas; ser realista e equilibrado. Ideal para organizar, sistematizar, economizar e aprender a lidar com limites e restrições. Um mês para tratar de assuntos concretos e pormenores.",
  5: "Um mês favorável para viagens, mudanças, liberdade e aventuras. Será um mês movimentado, bom para novas amizades e para desfrutar de novas sensações. A agitação deste mês poderá insuflar a impaciência, cuidado com as perdições viciosas.",
  6: "Este é um período para dar atenção às obrigações afetivas e proteção financeira. Importante desenvolver atividades familiares e domésticas, cumprir deveres e assumir responsabilidades. Evite discussões para manter a paz no lar.",
  7: "Um mês que pode retardar projetos por necessidade de análise mais aprofundada. Bom período para reflexão, introspecção, isolamento e crescimento interior. Favorece alianças e o interesse por assuntos metafísicos.",
  8: "Este é o mês que favorece todos os campos de domínio material e financeiro. Bom para os negócios e empreendimentos, para atividades políticas e com público em geral. A agitação pode levar ao nervosismo, mantenha-se calmo.",
  9: "É o mês da espiritualidade e da intelectualidade. O sucesso virá das realizações positivas que ajudem os outros. Período de finalizações, completude, inspiração e humanidade; bom para viagens e contato com multidões.",
  11: "Um mês favorável às grandes realizações e revelações, sejam elas de cunho material, mental ou espiritual. Ideal para por as ideias em ordem, pois a intuição estará mais aflorada e a inteligência vibrante.",
  22: "Neste período você se sente mais prático, cordial, idealista e eficiente. É uma excelente época para desenvolver novas ideias e projetos em grande escala, conseguindo grandes êxitos materiais e espirituais."
};

export const PSYCHIC_NUMBER_DESCRIPTIONS: Record<number, string> = {
  1: "Regidas pelo Sol, possuem firmeza de propósitos e de ideias. São independentes, originais e tendem a querer liderar. Têm dificuldade em trabalhar sob ordens alheias.",
  2: "Regidas pela Lua, são gentis, imaginativas e artísticas. Possuem natureza romântica e cooperativa, mas podem ser indecisas e dependentes emocionalmente.",
  3: "Regidas por Júpiter, são ambiciosas, disciplinadas e independentes. Têm orgulho e gostam de ordem. São populares e amigas, mas podem ser ditatoriais.",
  4: "Regidas por Rahu, são práticas, trabalhadoras e confiáveis. Têm um ponto de vista diferente e podem ser vistas como rebeldes. Enfrentam altos e baixos constantes.",
  5: "Regidas por Mercúrio, são inteligentes, versáteis e rápidas. Amam a mudança e a liberdade. São adaptáveis e sociáveis, mas podem ser instáveis.",
  6: "Regidas por Vênus, são magnéticas, juvenis e suaves no falar. Amam o luxo, a arte e o conforto. São muito atraentes e sociáveis.",
  7: "Regidas por Ketu, são místicas, intuitivas e analíticas. Têm interesse no oculto e no espiritual. Podem ser solitárias e incompreendidas.",
  8: "Regidas por Saturno, são sérias, dedicadas e muitas vezes mal interpretadas. Têm grande força de vontade e capacidade de organização, mas enfrentam obstáculos.",
  9: "Regidas por Marte, são corajosas, ativas e fortes. Têm espírito guerreiro e não desistem fácil. Podem ser impulsivas e agressivas se provocadas."
};

export const PROFESSIONAL_POTENTIAL_DESCRIPTIONS: Record<number, string> = {
  1: "Qualquer tipo de negócio, qualquer forma de arte. Precisa agir como pioneiro. É um executivo dinâmico e desenvolto quando se empenha em levar a cabo suas ideias.",
  2: "Criador de uma atmosfera de harmonia no ambiente de trabalho será melhor sucedido trabalhando em equipe. Excelente para trabalhos minuciosos e diplomáticos.",
  3: "A vibração de um artista performático, capaz de promover qualquer coisa. Consegue vender de tudo porque tem a capacidade de vender a si mesmo. Comunicação e expressão.",
  4: "Fica feliz quando está organizando e sistematizando alguma coisa. Valoriza os ganhos recorrentes e se expressa através dos meios materiais e construções sólidas.",
  5: "Hábil em se relacionar com pessoas de todas as raças e credos. Sabe tirar proveito de suas experiências; tentará de tudo. Facilidade para lidar com o público e mudanças.",
  6: "Acomoda e apazigua em todas as fases da vida: lar, trabalho, mundo! Presta serviço à comunidade sem intenção de se autopromover. Profissões de cura e ajuste.",
  7: "Aperfeiçoar-se e por para fora o que tem dentro de si. Tem mais domínio sobre si permanecendo só. Deve se especializar; educação é importante. Investigação e análise.",
  8: "Jeito para negócios e para comércio. Tem habilidade para se encarregar de qualquer situação. Grande capacidade de concentração e julgamento executivo.",
  9: "Conservador, persuasivo, é bem recebido em todos os tipos de plateia. Sólido senso de certo e errado e disposição para servir. Humanitarismo e artes.",
  11: "Líder carismático para verdades universais. Consegue transmitir inspiração aos outros. Senso de equilíbrio, criativo e inventivo.",
  22: "Toda e qualquer coisa que seja para o bem de todos em grande escala. É capaz de colocar a visão e a intuição a serviço de um objetivo concreto. Administrador magistral."
};

export const SUBCONSCIOUS_RESPONSE_DESCRIPTIONS: Record<number, string> = {
  1: "É associada à individualidade, liderança, independência e autoconfiança. As pessoas com esse número são geralmente independentes e possuem uma forte vontade própria.",
  2: "Pode ser um ser arrogante ou mentiroso se negativo, ou muito cooperativo se positivo. Tende a não respeitar regras e quer que tudo gire em torno de si em momentos de crise.",
  3: "É dispersivo e até indisciplinado; normalmente reage de forma explosiva e até de certa maneira destrutiva ou dramática diante de pressões.",
  4: "Normalmente é um ser que vive perdido num labirinto de detalhes. As suas reações são lentas, tem tendência a vacilar e até atrapalhar os outros com sua rigidez.",
  5: "É uma pessoa tensa e nervosa. Numa crise tem tendência a agir de forma confusa e impulsiva, buscando fuga ou mudança rápida.",
  6: "É um ser sentimental. Sua primeira preocupação numa crise é com os entes queridos, seus objetos de estimação e a harmonia do lar.",
  7: "Normalmente é arredio e não gosta de se envolver com problemas alheios. Em uma emergência, considerará analiticamente a situação e se retirará para dentro de si.",
  8: "É eficiente e organizado. Numa crise ou em qualquer ocasião pode-se contar com ele, pois é seguro e digno de confiança, assumindo o controle.",
  9: "É um ser entediado ou impessoal. A maioria das coisas tem pouca importância. Numa crise é melhor não contar com ele, pois é filósofo, introspectivo e indeciso."
};

export const FAVORABLE_COLORS: Record<number, string> = {
  1: "Todos os tons de amarelo e laranja, castanho, dourado, verde, creme e branco.",
  2: "Todos os tons de verde, creme, branco e cinza.",
  3: "Violeta, vinho, púrpura e vermelha.",
  4: "Azul, cinza, púrpura e ouro.",
  5: "Cinza, branco e materiais brilhantes.",
  6: "Azul, rosa e verde.",
  7: "Verde claro, amarelo claro e branco.",
  8: "Preto, azul escuro, roxo e cinza.",
  9: "Vermelho, rosa e tons de carmesim.",
  11: "Violeta, amarelo e branco.",
  22: "Creme, branco e todas as cores claras."
};

export const MARITAL_HARMONY_TEXTS: Record<number, string> = {
  1: "Busca parceiros que respeitem sua individualidade e ambição. Precisa de alguém que não compita pela liderança, mas que seja forte o suficiente para acompanhar seu ritmo.",
  2: "Precisa de segurança emocional e carinho. Parceiros agressivos ou distantes ferem sua sensibilidade. A harmonia vem com a compreensão mútua e o romantismo.",
  3: "Procura parceiros alegres e sociáveis. A rotina e o silêncio são inimigos. Precisa de alguém que estimule sua criatividade e respeite sua necessidade de liberdade social.",
  4: "Valoriza a lealdade e a estabilidade acima de tudo. Parceiros imprevisíveis causam ansiedade. Busca construir uma vida sólida e segura a dois.",
  5: "Precisa de estímulo mental e liberdade. O tédio e o ciúme excessivo matam a relação. Busca um parceiro companheiro de aventuras e mudanças.",
  6: "O amor é o centro da vida. Busca harmonia doméstica, beleza e conforto. Precisa de um parceiro que valorize a família e o lar tanto quanto ele.",
  7: "Necessita de espaço e compreensão para seus momentos de introspecção. Parceiros muito pegajosos ou superficiais não funcionam. Busca conexão espiritual.",
  8: "Busca parceiros ambiciosos e que passem segurança. O respeito mútuo e o apoio nas conquistas materiais são fundamentais. Precisa de alguém leal e forte.",
  9: "Idealista no amor, busca uma conexão de almas. Precisa de um parceiro que compreenda sua necessidade de ajudar o mundo e que não seja mesquinho."
};

export const MARITAL_HARMONY_TABLE: Record<number, { vibra: string, atrai: string, oposto: string, passivo: string }> = {
  1: { vibra: "1, 4, 8", atrai: "3, 5, 9", oposto: "6", passivo: "2, 7" },
  2: { vibra: "2, 7, 9", atrai: "1, 4, 8", oposto: "5", passivo: "3, 6" },
  3: { vibra: "3, 5, 9", atrai: "2, 7", oposto: "6", passivo: "1, 4, 8" },
  4: { vibra: "1, 4, 8", atrai: "6", oposto: "3, 5", passivo: "2, 7, 9" },
  5: { vibra: "5, 9", atrai: "1, 3, 6", oposto: "2, 4", passivo: "7, 8" },
  6: { vibra: "6, 9", atrai: "3, 5", oposto: "1, 4, 8", passivo: "2, 7" },
  7: { vibra: "2, 7", atrai: "6, 9", oposto: "1, 8", passivo: "3, 4, 5" },
  8: { vibra: "1, 4, 8", atrai: "5, 6", oposto: "2, 7, 9", passivo: "3" },
  9: { vibra: "3, 6, 9", atrai: "2, 5, 7", oposto: "4, 8", passivo: "1" }
};
