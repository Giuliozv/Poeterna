import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const PORT = 3000;

async function startServer() {
  const app = express();
  app.use(express.json());

  // Heuristic literary fallback in case Gemini API is temporarily saturated
  function analyzeLiteraryMoodLocally(title: string, poetName: string, stanzas: string[]) {
    const text = `${title || ""} ${poetName || ""} ${(stanzas || []).join(" ")}`.toLowerCase();

    if (text.includes("mar") || text.includes("nau") || text.includes("oceano") || text.includes("navegar") || text.includes("bojador") || text.includes("salgado") || text.includes("porto") || text.includes("praia") || text.includes("ilha")) {
      return {
        mood: "Banhado de Saudade e Imensidão Oceânica",
        colorCategory: "blue",
        badgeHex: "#1e3a8a",
        icon: "water_drop",
        explanation: "A presença do oceano e da travessia evoca o destino heroico e a doce melancolia do marfim e das águas.",
        source: "literary_acervo"
      };
    }

    if (text.includes("amor") || text.includes("coração") || text.includes("beijo") || text.includes("ardente") || text.includes("paixão") || text.includes("amada") || text.includes("ternura") || text.includes("fogo") || text.includes("querer")) {
      return {
        mood: "Apaixonado e Ardente",
        colorCategory: "rose",
        badgeHex: "#be185d",
        icon: "favorite",
        explanation: "Lirismo amoroso vibrante e intenso, celebrando as chamas, os contrastes e as contradições do afeto.",
        source: "literary_acervo"
      };
    }

    if (text.includes("triste") || text.includes("morte") || text.includes("lágrima") || text.includes("pranto") || text.includes("dor") || text.includes("sombra") || text.includes("tumba") || text.includes("luto") || text.includes("gemer") || text.includes("adeus")) {
      return {
        mood: "Melancólico e Elegíaco",
        colorCategory: "slate",
        badgeHex: "#475569",
        icon: "sentiment_dissatisfied",
        explanation: "Tonalidade nostálgica e sombria, debruçando-se sobre a finitude, a perda e o eco silenciado da dor.",
        source: "literary_acervo"
      };
    }

    if (text.includes("luta") || text.includes("povo") || text.includes("liberdade") || text.includes("terra") || text.includes("sangue") || text.includes("pátria") || text.includes("coragem") || text.includes("grito") || text.includes("resistir") || text.includes("arma")) {
      return {
        mood: "Combate e Resistência Libertária",
        colorCategory: "amber",
        badgeHex: "#b45309",
        icon: "local_fire_department",
        explanation: "Voz lírica de protesto, resiliência e afirmação da dignidade humana perante a opressão.",
        source: "literary_acervo"
      };
    }

    if (text.includes("alma") || text.includes("deus") || text.includes("místico") || text.includes("sagrado") || text.includes("infinito") || text.includes("eterno") || text.includes("silêncio") || text.includes("luz") || text.includes("sufi") || text.includes("céu")) {
      return {
        mood: "Místico e Contemplativo",
        colorCategory: "purple",
        badgeHex: "#7e22ce",
        icon: "psychology",
        explanation: "Busca espiritual profunda e transcendente, voltada para os mistérios do invisível e da essência da alma.",
        source: "literary_acervo"
      };
    }

    if (text.includes("noite") || text.includes("lua") || text.includes("sonho") || text.includes("mistério") || text.includes("brisa") || text.includes("calma") || text.includes("estrela") || text.includes("paz")) {
      return {
        mood: "Sereno e Noturno",
        colorCategory: "indigo",
        badgeHex: "#4338ca",
        icon: "dark_mode",
        explanation: "Atmosfera de introspecção e serenidade poética sob o veludo da noite e o brilho dos astros.",
        source: "literary_acervo"
      };
    }

    return {
      mood: "Reflexivo e Filosófico",
      colorCategory: "emerald",
      badgeHex: "#047857",
      icon: "auto_awesome",
      explanation: "Meditação profunda sobre a existência, o tempo e os enigmas da condição humana.",
      source: "literary_acervo"
    };
  }

  // API Route: Analyze poem mood using Gemini API with intelligent fallback
  app.post("/api/analyze-poem-mood", async (req, res) => {
    const { title, poetName, stanzas } = req.body;
    if (!title || !stanzas || !Array.isArray(stanzas)) {
      return res.status(400).json({ error: "Dados do poema incompletos." });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Graceful heuristic fallback if API key is not present
      return res.json(analyzeLiteraryMoodLocally(title, poetName, stanzas));
    }

    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const poemText = stanzas.slice(0, 15).join("\n");
      const prompt = `Analise a carga emocional, tom e humor (mood) do seguinte poema em língua portuguesa:

Título: "${title}"
Autor: ${poetName || "Desconhecido"}

Texto do poema:
${poemText}

Identifique a emoção predominante (ex: Melancólico, Otimista, Reflexivo, Banhado de Saudade, Épico, Elegíaco, Dramático, Sereno, Apaixonado, Trágico).`;

      // Candidate models for best responsiveness and availability
      const candidateModels = [
        "gemini-flash-latest",
        "gemini-3.8-flash"
      ];
      let result = null;

      for (const model of candidateModels) {
        try {
          const response = await ai.models.generateContent({
            model,
            contents: prompt,
            config: {
              systemInstruction:
                "Você é um crítico e analista literário especialista em poesia lusófona e universal. Analise o humor emocional dos poemas com sensibilidade e precisão.",
              responseMimeType: "application/json",
              responseSchema: {
                type: Type.OBJECT,
                properties: {
                  mood: {
                    type: Type.STRING,
                    description: "Termo curto e expressivo em português para o humor/carga emocional do poema (ex: Melancólico, Otimista, Reflexivo, Banhado de Saudade, Épico, Trágico, Sereno).",
                  },
                  colorCategory: {
                    type: Type.STRING,
                    description: "Nome de cor para o tema (ex: indigo, rose, amber, emerald, purple, slate, cyan, yellow, blue, crimson).",
                  },
                  badgeHex: {
                    type: Type.STRING,
                    description: "Código de cor hexadecimal representativo do sentimento (ex: #3b82f6, #ef4444, #10b981, #f59e0b, #8b5cf6, #64748b, #06b6d4).",
                  },
                  icon: {
                    type: Type.STRING,
                    description: "Nome de um ícone do Material Symbols adequado para essa emoção (ex: sentiment_dissatisfied, mood, psychology, auto_awesome, water_drop, favorite, dark_mode, wb_sunny, explore, echo).",
                  },
                  explanation: {
                    type: Type.STRING,
                    description: "Uma frase concisa e poética em português (máx. 2 frases) explicando a carga emocional percebida.",
                  },
                },
                required: ["mood", "colorCategory", "badgeHex", "icon", "explanation"],
              },
            },
          });

          const responseText = response.text || "{}";
          const parsed = JSON.parse(responseText);
          if (parsed && parsed.mood) {
            result = { ...parsed, source: "gemini" };
            break;
          }
        } catch (candidateErr) {
          console.warn(`Model ${model} mood attempt failed:`, candidateErr);
        }
      }

      if (result) {
        return res.json(result);
      }

      const fallbackResult = analyzeLiteraryMoodLocally(title, poetName, stanzas);
      return res.json(fallbackResult);
    } catch (err: any) {
      console.error("Erro ao analisar humor do poema com Gemini:", err);
      const fallbackResult = analyzeLiteraryMoodLocally(title, poetName, stanzas);
      return res.json(fallbackResult);
    }
  });

  // Local fallback generator for Historical Context & Literary Influences
  function generateHistoricalContextLocally(
    title: string,
    poetName: string,
    year?: string,
    countryName?: string,
    period?: string,
    stanzas?: string[]
  ) {
    const pLower = (period || "").toLowerCase();
    const nameLower = (poetName || "").toLowerCase();
    const cLower = (countryName || "").toLowerCase();
    const textLower = `${title || ""} ${(stanzas || []).join(" ")}`.toLowerCase();

    if (pLower.includes("claridade") || nameLower.includes("mariano") || nameLower.includes("baltazar") || nameLower.includes("manuel lopes") || cLower.includes("cabo verde")) {
      return {
        historicalEra: "Cabo Verde em meados do século XX (décadas de 1930 a 1960), marcado pela insularidade, pela dureza das secas cíclicas e pelo despertar de uma consciência de crioulidade autêntica em contraposição ao colonialismo centralizador.",
        literaryInfluences: "Movimento dos Claridosos (Revista Claridade de 1936), influenciado pelo Modernismo brasileiro (Jorge Amado, Manuel Bandeira, Gilberto Freyre) e pelo Realismo telúrico focado no homem das ilhas e no marfim da partida.",
        creativeContext: `A obra de ${poetName || "este autor"} sintetiza o drama da estiagem e a doce-amarga vocação de partir e ficar, transformando o sentimento insular e a morna num monumento lírico de dignidade e identidade cabo-verdiana.`,
        keyEvents: [
          "Fundação da revista cultural Claridade no Mindelo (1936)",
          "Grandes estiagens e ciclos migratórios para São Tomé, América e Lisboa",
          "Emergência da geração anticolonial e afirmação da língua crioula na literatura"
        ],
        source: "literary_acervo"
      };
    }

    if (pLower.includes("libertação") || pLower.includes("negritude") || pLower.includes("combate") || nameLower.includes("neto") || nameLower.includes("craveirinha") || nameLower.includes("noémia") || nameLower.includes("alda lara") || nameLower.includes("cabral")) {
      return {
        historicalEra: "Período das lutas de libertação nacional em África (décadas de 1950 a 1970), marcado pela opressão colonial, pela clandestinidade política e pelo anseio irreprimível de soberania e dignidade dos povos africanos.",
        literaryInfluences: "Movimento da Negritude (Aimé Césaire e Léopold Sédar Senghor), neorrealismo de intervenção social, tradições poéticas e orais bantu e as reuniões formativas na Casa dos Estudantes do Império em Lisboa.",
        creativeContext: `«${title}» ecoa o clamor coletivo de resistência e renascimento cultural, onde o verso deixa de ser mero ornamento estético e se converte em arma luminosa de conscientização e fraternidade humana.`,
        keyEvents: [
          "Fundação dos movimentos de libertação nacional africanos (MPLA, FRELIMO, PAIGC)",
          "Conferência de Bandung (1955) e ascensão do Pan-Africanismo",
          "Publicação de antologias poéticas de combate e denúncia do trabalho forçado"
        ],
        source: "literary_acervo"
      };
    }

    if (pLower.includes("modernismo") || nameLower.includes("pessoa") || nameLower.includes("drummond") || nameLower.includes("bandeira") || nameLower.includes("vinicius")) {
      return {
        historicalEra: "Início do século XX (décadas de 1910 a 1940), era de vertiginosa modernização industrial, tensões bélicas mundiais e desmoronamento das certezas burguesas oitocentistas.",
        literaryInfluences: "Vanguardas europeias (Futurismo, Cubismo, Sensacionismo), quebra com as amarras parnasianas, valorização da linguagem coloquial e profundo influxo da psicanálise e do existencialismo.",
        creativeContext: `O poema reflete a fragmentação da sensibilidade moderna e o confronto com a angústia ontológica, unindo ironia, lirismo coloquial e a busca incessante pelo mistério da subjetividade humana.`,
        keyEvents: [
          "Semana de Arte Moderna de 1922 (São Paulo) e Revista Orpheu de 1915 (Lisboa)",
          "Primeira e Segunda Guerras Mundiais e reconfiguração geopolítica global",
          "Revolução de 1930 no Brasil e ascensão do Estado Novo em Portugal"
        ],
        source: "literary_acervo"
      };
    }

    if (pLower.includes("romantismo") || nameLower.includes("castro alves") || nameLower.includes("gonçalves dias") || nameLower.includes("garrett")) {
      return {
        historicalEra: "Século XIX, época de consolidação dos estados nacionais, expansão dos ideais liberais e vigorosa luta pela abolição da escravatura e emancipação humana.",
        literaryInfluences: "Romantismo europeu (Lord Byron, Victor Hugo, Lamartine), condoreirismo social, indianismo nacionalista e exaltação da natureza tropical.",
        creativeContext: `O poema pulsa com o arrebatamento passional e a indignação moral do Romantismo, unindo o lirismo do coração à defesa veemente da liberdade e da justiça universal.`,
        keyEvents: [
          "Movimento abolicionista e republicano no Brasil e no Atlântico",
          "Independência do Brasil (1822) e Revolução Liberal do Porto (1820)",
          "Nascimento da imprensa periódica e expansão da circulação literária"
        ],
        source: "literary_acervo"
      };
    }

    if (pLower.includes("renascimento") || pLower.includes("classicismo") || nameLower.includes("camões") || textLower.includes("lusíadas") || textLower.includes("nau")) {
      return {
        historicalEra: "Século XVI (Quinhentismo), auge da Era das Grandes Navegações e Descobertas marítimas, no qual Portugal expandiu suas fronteiras planetárias pelo Índico e Atlântico.",
        literaryInfluences: "Humanismo renascentista italiano (Petrarca, Dante, Ariosto), epopeias clássicas greco-latinas (Virgílio e Homero) e a filosofia neoplatônica do amor ideal.",
        creativeContext: `A composição alia a perfeição formal dos metros clássicos à epopeia humana do desbravamento dos mares e às contradições cósmicas do sentimento amoroso.`,
        keyEvents: [
          "Viagens de circum-navegação e abertura da Rota das Índias por Vasco da Gama",
          "Publicação de Os Lusíadas em 1572 em Lisboa",
          "Transição do teocentrismo medieval para o antropocentrismo humanista"
        ],
        source: "literary_acervo"
      };
    }

    if (pLower.includes("pérsia") || pLower.includes("oriental") || pLower.includes("sufi") || nameLower.includes("rumi") || nameLower.includes("hafez") || nameLower.includes("khayyam")) {
      return {
        historicalEra: "Idade de Ouro da civilização islâmica e persa medieval (séculos XI a XIV), época de rico efervescer filosófico, astronômico e poético em meio às convulsões das invasões mongóis.",
        literaryInfluences: "Misticismo Sufi (Tasawwuf), lirismo ghazal persa, sabedoria gnóstica de Attar e Sanai, e a celebração alegórica do vinho e do amor terreno como metáforas do sagrado.",
        creativeContext: `«${title}» é uma oferenda de êxtase meditativo, dissolvendo as fronteiras entre o divino e o mundano através de uma linguagem repleta de luminosa simbologia cósmica.`,
        keyEvents: [
          "Florescimento dos centros de sabedoria e tradução de Nishapur, Shiraz e Samarcanda",
          "Desenvolvimento das confrarias místicas Mawlawiyya (Dervixes Rodopiantes)",
          "Expansão das rotas da Rota da Seda e diálogo intercultural euro-asiático"
        ],
        source: "literary_acervo"
      };
    }

    return {
      historicalEra: `${period || "Período Clássico e Moderno"} da literatura ${countryName ? `em ${countryName}` : "universal"}${year ? ` (por volta de ${year})` : ""}, momento de profunda reelaboração da linguagem lírica e de resposta artística às transformações de seu tempo.`,
      literaryInfluences: `Diálogo vigoroso entre as correntes estéticas predominantes da época, combinando herança clássica, sensibilidade lírica autoral e influências do pensamento filosófico coetâneo.`,
      creativeContext: `Em «${title}», ${poetName || "o autor"} canaliza a voz interior para interpretar as contradições humanas e o anseio estético, conferindo à obra um testemunho atemporal de rara beleza.`,
      keyEvents: [
        "Consolidação de novas formas e sensibilidades no cânone poético",
        "Circulação de revistas, tertúlias e movimentos de renovação cultural",
        "Diálogo fecundo entre a tradição lírica e as inquietações do tempo presente"
      ],
      source: "literary_acervo"
    };
  }

  // API Route: Generate Historical Context & Literary Influences using Gemini AI with fallback
  app.post("/api/poem-historical-context", async (req, res) => {
    const { title, poetName, year, countryName, period, stanzas } = req.body;
    if (!title) {
      return res.status(400).json({ error: "Título do poema é obrigatório." });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.json(
        generateHistoricalContextLocally(title, poetName, year, countryName, period, stanzas)
      );
    }

    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const poemExcerpt = Array.isArray(stanzas) ? stanzas.slice(0, 10).join("\n") : "";
      const prompt = `Como eminente historiador e ensaísta literário, elabore um resumo do contexto histórico e influências literárias coetâneas à criação desta obra:

Título do Poema: "${title}"
Autor: ${poetName || "Desconhecido"}
Ano/Época estimada: ${year || "Não especificado"}
País/Origem: ${countryName || "Espaço Lusófono / Universal"}
Movimento ou Período Literário: ${period || "Poesia Universal"}

Trecho das estrofes:
${poemExcerpt}

Forneça um JSON com:
1. "historicalEra": Síntese rigorosa e fluida da época histórica, ambiente sociopolítico e momento sociocultural em que a obra foi gestada (2 a 3 frases).
2. "literaryInfluences": As principais correntes estéticas, movimentos literários, autores ou filosofias que nutriam a mente e a poética do autor (2 a 3 frases).
3. "creativeContext": Como este poema específico ressoa com a vivência do autor e com o espírito de sua época (2 frases expressivas).
4. "keyEvents": Lista com 2 ou 3 fatos ou marcos históricos contemporâneos relevantes.`;

      const candidateModels = ["gemini-flash-latest", "gemini-3.8-flash"];
      let result = null;

      for (const model of candidateModels) {
        try {
          const response = await ai.models.generateContent({
            model,
            contents: prompt,
            config: {
              systemInstruction:
                "Você é um historiador da literatura e ensaísta erudito em poesia lusófona e universal. Suas análises são claras, historicamente rigorosas e escritas em português primoroso.",
              responseMimeType: "application/json",
              responseSchema: {
                type: Type.OBJECT,
                properties: {
                  historicalEra: {
                    type: Type.STRING,
                    description: "Resumo da conjuntura histórica e momento sociocultural da época de criação.",
                  },
                  literaryInfluences: {
                    type: Type.STRING,
                    description: "Principais influências estéticas, correntes e referências intelectuais do autor.",
                  },
                  creativeContext: {
                    type: Type.STRING,
                    description: "Síntese da relação entre o poema, o autor e o espírito do tempo.",
                  },
                  keyEvents: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "2 ou 3 acontecimentos históricos contemporâneos marcantes.",
                  },
                },
                required: ["historicalEra", "literaryInfluences", "creativeContext"],
              },
            },
          });

          const responseText = response.text || "{}";
          const parsed = JSON.parse(responseText);
          if (parsed && parsed.historicalEra && parsed.literaryInfluences) {
            result = { ...parsed, source: "gemini" };
            break;
          }
        } catch (candidateErr) {
          console.warn(`Model ${model} historical context attempt failed:`, candidateErr);
        }
      }

      if (result) {
        return res.json(result);
      }

      const fallback = generateHistoricalContextLocally(
        title,
        poetName,
        year,
        countryName,
        period,
        stanzas
      );
      return res.json(fallback);
    } catch (err: any) {
      console.error("Erro ao gerar contexto histórico com Gemini:", err);
      const fallback = generateHistoricalContextLocally(
        title,
        poetName,
        year,
        countryName,
        period,
        stanzas
      );
      return res.json(fallback);
    }
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
