const fs = require('fs');
const path = require('path');

const tsFilePath = path.join(__dirname, 'src', 'data', 'lusophonePoetsExt.ts');
let tsContent = fs.readFileSync(tsFilePath, 'utf8');

const newPoems = [
  // Murilo Mendes
  {
    id: 'murilo-mendes-reflexao-1',
    title: 'Reflexão Nº1',
    poetId: 'murilo-mendes',
    poetName: 'Murilo Mendes',
    country: 'BR',
    countryName: 'Brasil',
    year: '1930',
    era: 'Modernismo',
    theme: 'Existência e Fluir do Tempo',
    copyrightStatus: 'Domínio Público',
    stanzas: [
      'Ninguém sonha duas vezes o mesmo sonho',
      'Ninguém se banha duas vezes no mesmo rio',
      'Nem ama duas vezes a mesma mulher.',
      'Deus de onde tudo deriva',
      'E a circulação e o movimento infinito.',
      '',
      'Ainda não estamos habituados com o mundo',
      'Nascer é muito comprido.'
    ],
    analysis: 'Uma das reflexões poéticas mais densas do Modernismo brasileiro, relacionando Heráclito, a ontologia cristã e a percepção do tempo.'
  },
  {
    id: 'murilo-mendes-mulher-piramide',
    title: 'Mulher Vista do Alto de uma Pirâmide',
    poetId: 'murilo-mendes',
    poetName: 'Murilo Mendes',
    country: 'BR',
    countryName: 'Brasil',
    year: '1935',
    era: 'Modernismo / Surrealismo',
    theme: 'Eterno Feminino e História Universal',
    copyrightStatus: 'Domínio Público',
    stanzas: [
      'Eu vejo em ti as épocas que já viveste',
      'E as épocas que ainda tens para viver.',
      'Minha ternura é feita de todas as ternuras',
      'Que descem sobre nós desde o começo de Adão',
      'Estas engrenada nas formas',
      'Que se engrenam em outras desde a corrente dos séculos.',
      'E outras formas estão ansiosas por despontarem em ti.',
      'Quando eu te contemplo',
      'Vejo tatuada no teu corpo',
      'A historia de todas as gerações.',
      'Encerras teu filho, tua neta e a neta de tua neta.',
      'Mulher, tu és a convergência de dois mundos.',
      'Quando te olho a extensão do tempo se desdobra em mim.'
    ],
    analysis: 'Visão cósmica e temporal da mulher enquanto elo vivo da humanidade através das eras.'
  },
  {
    id: 'murilo-mendes-cancao-exilio',
    title: 'Canção do Exílio',
    poetId: 'murilo-mendes',
    poetName: 'Murilo Mendes',
    country: 'BR',
    countryName: 'Brasil',
    year: '1930',
    era: 'Modernismo',
    theme: 'Sátira ao Exílio e Cosmopolitismo',
    copyrightStatus: 'Domínio Público',
    stanzas: [
      'Minha terra tem macieiras da Califórnia',
      'Onde cantam gaturamos de Veneza',
      'Os poetas da minha terra',
      'São pretos que vivem em torres de ametista,',
      'Os sargentos do exército são monistas, cubistas,',
      'Os filósofos são polacos vendendo a prestações.',
      '',
      'A gente não pode dormir',
      'com os oradores e os pernilongos',
      'Os sururus em família têm por testemunha a Gioconda.',
      '',
      'Eu morro sufocado',
      'em terra estrangeira.',
      'Nossas flores são mais bonitas',
      'Nossas frutas mais gostosas',
      'Mas custam cem mil réis a dúzia',
      '',
      'Ai quem me dera chupar uma carambola de verdade',
      'e ouvir um sabiá com certidão de idade !'
    ],
    analysis: 'Brilhante paródia modernista da Canção do Exílio de Gonçalves Dias, ironizando a babel urbana e o consumo.'
  },

  // Olavo Bilac
  {
    id: 'olavo-bilac-lingua-portuguesa',
    title: 'Língua Portuguesa',
    poetId: 'olavo-bilac',
    poetName: 'Olavo Bilac',
    country: 'BR',
    countryName: 'Brasil',
    year: '1888',
    era: 'Parnasianismo',
    theme: 'Tributo ao Idioma Lusófono',
    copyrightStatus: 'Domínio Público',
    stanzas: [
      'Última flor do Lácio, inculta e bela,',
      'És, a um tempo, esplendor e sepultura:',
      'Ouro nativo, que na ganga impura',
      'A bruta mina entre os cascalhos vela...',
      '',
      'Amo-te assim, desconhecida e obscura,',
      'Tuba de alto clangor, lira singela,',
      'Que tens o trom e o silvo da procela',
      'E o arrolo da saudade e da ternura!',
      '',
      'Amo o teu viço agreste e o teu aroma',
      'De virgens selvas e de oceano largo!',
      'Amo-te, ó rude e doloroso idioma,',
      '',
      'Em que da voz materna ouvi: "meu filho!"',
      'E em que Camões chorou, no exílio amargo,',
      'O gênio sem ventura e o amor sem brilhó!'
    ],
    analysis: 'O soneto-hino supremo à Língua Portuguesa em toda a literatura mundial, celebrando a evolução do latim no Lácio às selvas tropicais e à poesia de Camões.'
  },

  // Oswald de Andrade
  {
    id: 'oswald-de-andrade-erro-de-portugues',
    title: 'Erro de Português',
    poetId: 'oswald-de-andrade',
    poetName: 'Oswald de Andrade',
    country: 'BR',
    countryName: 'Brasil',
    year: '1925',
    era: 'Modernismo / Antropofagia',
    theme: 'Identidade e Pós-Colonialismo',
    copyrightStatus: 'Domínio Público',
    stanzas: [
      'Quando o português chegou',
      'Debaixo de uma bruta chuva',
      'Vestiu o índio',
      'Que pena!',
      'Fosse uma manhã de sol',
      'O índio tinha despido',
      'O português.'
    ],
    analysis: 'Poema-pílula antropófago síntese da ironia e do humor libertador do Modernismo de 1922.'
  },
  {
    id: 'oswald-de-andrade-vicio-na-fala',
    title: 'Vício na Fala',
    poetId: 'oswald-de-andrade',
    poetName: 'Oswald de Andrade',
    country: 'BR',
    countryName: 'Brasil',
    year: '1925',
    era: 'Modernismo',
    theme: 'Linguagem Popular Brasileira',
    copyrightStatus: 'Domínio Público',
    stanzas: [
      'Para dizerem milho dizem mio',
      'Para melhor dizem mió',
      'Para pior pió',
      'Para telha dizem teia',
      'Para telhado dizem teiado',
      'E vão fazendo telhados'
    ],
    analysis: 'Valorização da sabedoria e do falar cotidiano do povo brasileiro que constrói a realidade.'
  },
  {
    id: 'oswald-de-andrade-canto-regresso-patria',
    title: 'Canto de Regresso à Pátria',
    poetId: 'oswald-de-andrade',
    poetName: 'Oswald de Andrade',
    country: 'BR',
    countryName: 'Brasil',
    year: '1924',
    era: 'Modernismo',
    theme: 'Nacionalismo Crítico e São Paulo',
    copyrightStatus: 'Domínio Público',
    stanzas: [
      'Minha terra tem palmares',
      'Onde gorjeia o mar',
      'Os passarinhos daqui',
      'Não cantam como os de lá',
      'Minha terra tem mais rosas',
      'E quase que mais amores',
      'Minha terra tem mais ouro',
      'Minha terra tem mais terra',
      'Ouro terra amor e rosas',
      'Eu quero tudo de lá',
      'Não permita Deus que eu morra',
      'Sem que volte para lá',
      'Não permita Deus que eu morra',
      'Sem que volte pra São Paulo',
      'Sem que veja a Rua 15',
      'E o progresso de São Paulo.'
    ],
    analysis: 'Releitura bem-humorada do ufanismo romântico alinhada à ebulição do progresso paulistano.'
  },

  // Paulo Leminski
  {
    id: 'paulo-leminski-amor-bastante',
    title: 'Amor Bastante',
    poetId: 'paulo-leminski',
    poetName: 'Paulo Leminski',
    country: 'BR',
    countryName: 'Brasil',
    year: '1980',
    era: 'Poesia Concreta / Marginal',
    theme: 'Iluminação Amorosa',
    copyrightStatus: 'Direitos Autorais Reservados',
    stanzas: [
      'quando eu vi você',
      'tive uma idéia brilhante',
      'foi como se eu olhasse',
      'de dentro de um diamante',
      'e meu olho ganhasse',
      'mil faces num só instante',
      '',
      'basta um instante',
      'e você tem amor bastante'
    ],
    analysis: 'Um dos poemas curtos de amor mais celebrados da poesia brasileira contemporânea.'
  },
  {
    id: 'paulo-leminski-bem-no-fundo',
    title: 'Bem no Fundo',
    poetId: 'paulo-leminski',
    poetName: 'Paulo Leminski',
    country: 'BR',
    countryName: 'Brasil',
    year: '1983',
    era: 'Poesia Concreta / Marginal',
    theme: 'Humor e Existência',
    copyrightStatus: 'Direitos Autorais Reservados',
    stanzas: [
      'No fundo, no fundo,',
      'bem lá no fundo,',
      'a gente gostaria',
      'de ver nossos problemas',
      'resolvidos por decreto',
      '',
      'a partir desta data,',
      'aquela mágoa sem remédio',
      'é considerada nula',
      'e sobre ela é silêncio perpétuo',
      '',
      'extinto por lei todo o remorso,',
      'maldito seja que olhas pra trás,',
      'lá pra trás não há nada,',
      'e nada mais',
      '',
      'mas problemas não se resolvem,',
      'problemas têm família grande,',
      'e aos domingos saem todos a passear',
      'o problema, sua senhora',
      'e outros pequenos probleminhas.'
    ],
    analysis: 'Fina ironia sobre o desejo humano de apagar a dor por lei e a convivência inevitável com as imperfeições.'
  },

  // Raimundo Correia
  {
    id: 'raimundo-correia-as-pombas',
    title: 'As Pombas',
    poetId: 'raimundo-correia',
    poetName: 'Raimundo Correia',
    country: 'BR',
    countryName: 'Brasil',
    year: '1883',
    era: 'Parnasianismo',
    theme: 'Sonho, Ilusão e Morte',
    copyrightStatus: 'Domínio Público',
    stanzas: [
      'Vai-se a primeira pomba despertada...',
      'Vai-se outra mais... mais outra... enfim dezenas',
      'De pombas vão-se dos pombais, apenas',
      'Raia sanguínea e fresca a madrugada...',
      '',
      'E é tarde, quando a rígida nortada',
      'Sopra, aos pombais de novo elas, serenas,',
      'Ruflando as asas, sacudindo as penas,',
      'Voltam todas em bando e em revoada...',
      '',
      'Também dos corações onde abotoam,',
      'Os sonhos, um por um, céleres voam,',
      'Como voam as pombas dos pombais;',
      '',
      'No azul da adolescência as asas soltam,',
      'Fogem... Mas aos pombais as pombas voltam,',
      'E eles aos corações não voltam mais...'
    ],
    analysis: 'Soneto parnasiano antológico que compara a revoada das pombas à partida irreversível dos sonhos da infância.'
  },

  // Rubem Braga
  {
    id: 'rubem-braga-poeta-cristao',
    title: 'Poeta Cristão',
    poetId: 'rubem-braga',
    poetName: 'Rubem Braga',
    country: 'BR',
    countryName: 'Brasil',
    year: '1945',
    era: 'Modernismo / Crônica',
    theme: 'Lirismo e Irreverência',
    copyrightStatus: 'Direitos Autorais Reservados',
    stanzas: [
      'A poesia anda mofina,',
      'Mofina, mas não morreu.',
      'Foi o anjo que morreu:',
      'Anjo não se usa mais.',
      'Ainda se usa estrela',
      'Se usa estrela demais.',
      '',
      'Poeta religioso',
      'Mocinha não pode ler:',
      'Pecará em pensamento,',
      'Que o poeta gosta do Novo,',
      'Mas pilha seus amoricos',
      'É no Velho Testamento.',
      '',
      'Ai, o Velho Testamento!',
      'Eu também faço poema,',
      'Ora essa, quem não faz:',
      'Boto uma estrela na frente',
      'E um pouco de mar atrás.'
    ],
    analysis: 'Irresistível meditação poética de Rubem Braga sobre a feitura do poema na modernidade.'
  },

  // Thiago de Mello
  {
    id: 'thiago-de-mello-estatutos-do-homem',
    title: 'Os Estatutos do Homem',
    poetId: 'thiago-de-mello',
    poetName: 'Thiago de Mello',
    country: 'BR',
    countryName: 'Brasil',
    year: '1964',
    era: 'Poesia Engajada e Humanista',
    theme: 'Direitos Humanos, Verdade e Esperança',
    copyrightStatus: 'Direitos Autorais Reservados',
    stanzas: [
      'Artigo I: Fica decretado que agora vale a verdade. Agora vale a vida, e de mãos dadas, marcharemos todos pela vida verdadeira.',
      'Artigo II: Fica decretado que todos os dias da semana, inclusive as terças-feiras mais cinzentas, têm direito a converter-se em manhãs de domingo.',
      'Artigo III: Fica decretado que, a partir deste instante, haverá girassóis em todas as janelas, que os girassóis terão direito a abrir-se dentro da sombra; e que as janelas devem permanecer, o dia inteiro, abertas para o verde onde cresce a esperança.',
      'Artigo IV: Fica decretado que o homem não precisará nunca mais duvidar do homem. Que o homem confiará no homem como a palmeira confia no vento, como o vento confia no ar, como o ar confia no campo azul do céu. Parágrafo único: O homem confiará no homem como um menino confia em outro menino.',
      'Artigo V: Fica decretado que os homens estão livres do jugo da mentira. Nunca mais será preciso usar a couraça do silêncio nem a armadura de palavras. O homem se sentará à mesa com seu olhar limpo porque a verdade passará a ser servida antes da sobremesa.',
      'Artigo VI: Fica estabelecida, durante dez séculos, a prática sonhada pelo profeta Isaías, e o lobo e o cordeiro pastarão juntos e a comida de ambos terá o mesmo gosto de aurora.',
      'Artigo VII: Por decreto irrevogável fica estabelecido o reinado permanente da justiça e da claridade, e a alegria será uma bandeira generosa para sempre desfraldada na alma do povo.',
      'Artigo VIII: Fica decretado que a maior dor sempre foi e será sempre não poder dar-se amor a quem se ama e saber que é a água que dá à planta o milagre da flor.',
      'Artigo IX: Fica permitido que o pão de cada dia tenha no homem o sinal de seu suor. Mas que sobretudo tenha sempre o quente sabor da ternura.',
      'Artigo X: Fica permitido a qualquer pessoa, qualquer hora da vida, uso do traje branco.',
      'Artigo XI: Fica decretado, por definição, que o homem é um animal que ama e que por isso é belo, muito mais belo que a estrela da manhã.',
      'Artigo XII: Decreta-se que nada será obrigado nem proibido, tudo será permitido, inclusive brincar com os rinocerontes e caminhar pelas tardes com uma imensa begónia na lapela. Parágrafo único: Só uma coisa fica proibida: amar sem amor.',
      'Artigo XIII: Fica decretado que o dinheiro não poderá nunca mais comprar o sol das manhãs vindouras. Expulso do grande baú do medo, o dinheiro se transformará em uma espada fraternal para defender o direito de cantar e a festa do dia que chegou.',
      'Artigo Final: Fica proibido o uso da palavra liberdade, a qual será suprimida dos dicionários e do pântano enganoso das bocas. A partir deste instante a liberdade será algo vivo e transparente como um fogo ou um rio, e a sua morada será sempre o coração do homem.'
    ],
    analysis: 'Poema universal do humanismo contemporâneo traduzido para dezenas de idiomas, proclamando a fraternidade e a utopia pacífica da humanidade.'
  },

  // Alphonsus de Guimaraens
  {
    id: 'alphonsus-guimaraens-ismalia',
    title: 'Ismália',
    poetId: 'alphonsus-de-guimaraens',
    poetName: 'Alphonsus de Guimaraens',
    country: 'BR',
    countryName: 'Brasil',
    year: '1899',
    era: 'Simbolismo',
    theme: 'Misticismo, Loucura e Luar',
    copyrightStatus: 'Domínio Público',
    stanzas: [
      'Quando Ismália enlouqueceu,',
      'Pôs-se na torre a sonhar...',
      'Viu uma lua no céu,',
      'Viu outra lua no mar.',
      '',
      'No sonho em que se perdeu,',
      'Banhou-se toda em luar...',
      'Queria subir ao céu,',
      'Queria descer ao mar...',
      '',
      'E, no desvario seu,',
      'Na torre pôs-se a cantar...',
      'Estava perto do céu,',
      'Estava longe do mar...',
      '',
      'E como um anjo pendeu',
      'As asas para voar...',
      'Queria a lua do céu,',
      'Queria a lua do mar...',
      '',
      'As asas que Deus lhe deu',
      'Ruflaram de par em par...',
      'Sua alma subiu ao céu,',
      'Seu corpo desceu ao mar...'
    ],
    analysis: 'A obra-prima mais perfeita do Simbolismo brasileiro, articulando o duplo desejo da alma e do corpo em métrica impecável.'
  },

  // Álvares de Azevedo
  {
    id: 'alvares-de-azevedo-se-eu-morresse-amanha',
    title: 'Se Eu Morresse Amanhã!',
    poetId: 'alvares-de-azevedo',
    poetName: 'Álvares de Azevedo',
    country: 'BR',
    countryName: 'Brasil',
    year: '1852',
    era: 'Romantismo / Ultrarromantismo',
    theme: 'Presentimento da Morte e Melancolia',
    copyrightStatus: 'Domínio Público',
    stanzas: [
      'Se eu morresse amanhã, viria ao menos',
      'Fechar meus olhos minha triste irmã;',
      'Minha mãe de saudades morreria',
      'Se eu morresse amanhã!',
      '',
      'Quanta glória pressinto em meu futuro!',
      'Que aurora de porvir e que manhã!',
      'Eu perdera chorando essas coroas',
      'Se eu morresse amanhã!',
      '',
      'Mas essa dor da vida que devora',
      'A ânsia de glória, o dolorido afã...',
      'A dor no peito emudecera ao menos',
      'Se eu morresse amanhã!'
    ],
    analysis: 'Escrito poucas semanas antes de sua morte precoce aos 20 anos, o poema síntese do Ultrarromantismo no Brasil.'
  },

  // Augusto dos Anjos
  {
    id: 'augusto-dos-anjos-psicologia-vencido',
    title: 'Psicologia de um Vencido',
    poetId: 'augusto-dos-anjos',
    poetName: 'Augusto dos Anjos',
    country: 'BR',
    countryName: 'Brasil',
    year: '1912',
    era: 'Pré-Modernismo / Cientificismo',
    theme: 'Angústia Existencial e Matéria',
    copyrightStatus: 'Domínio Público',
    stanzas: [
      'Eu, filho do carbono e do amoníaco,',
      'Monstro de escuridão e rutilância,',
      'Sofro, desde a epigênese da infância,',
      'A influência má dos signos do zodíaco.',
      '',
      'Profundissimamente hipocondríaco,',
      'Este ambiente me causa repugnância…',
      'Sobe-me à boca uma ânsia análoga à ânsia',
      'Que escapa da boca de um cardíaco.',
      '',
      'Já o verme — este operário das ruínas —',
      'Que o sangue podre das carnificinas',
      'Come, e à vida em geral declara guerra,',
      '',
      'Anda a espreitar meus olhos para roê-los,',
      'E há de deixar-me apenas os cabelos,',
      'Na frialdade inorgânica da terra!'
    ],
    analysis: 'Soneto inconfundível que funde termos científicos da biologia e química ao lirismo fúnebre do livro "Eu".'
  },

  // Carlos Drummond de Andrade
  {
    id: 'drummond-mundo-grande',
    title: 'O Mundo É Grande',
    poetId: 'carlos-drummond-de-andrade',
    poetName: 'Carlos Drummond de Andrade',
    country: 'BR',
    countryName: 'Brasil',
    year: '1940',
    era: 'Modernismo',
    theme: 'Síntese Existencial e Amor',
    copyrightStatus: 'Direitos Autorais Reservados',
    stanzas: [
      'O mundo é grande e cabe',
      'nesta janela sobre o mar.',
      'O mar é grande e cabe',
      'na cama e no colchão de amar.',
      'O amor é grande e cabe',
      'no breve espaço de beijar.'
    ],
    analysis: 'Pequena joia lírica sobre a dimensão do sentimento amoroso que condensa o infinito no instante humano.'
  },

  // Chico Buarque
  {
    id: 'chico-buarque-construcao',
    title: 'Construção',
    poetId: 'chico-buarque',
    poetName: 'Chico Buarque',
    country: 'BR',
    countryName: 'Brasil',
    year: '1971',
    era: 'MPB / Literatura Contemporânea',
    theme: 'Alienamento Social e Tragédia do Trabalhador',
    copyrightStatus: 'Direitos Autorais Reservados',
    stanzas: [
      'Amou daquela vez como se fosse a última',
      'Beijou sua mulher como se fosse a última',
      'E cada filho seu como se fosse o único',
      'E atravessou a rua com seu passo tímido',
      'Subiu a construção como se fosse máquina',
      'Ergueu no patamar quatro paredes sólidas',
      'Tijolo com tijolo num desenho mágico',
      'Seus olhos embotados de cimento e lágrima',
      'Sentou pra descansar como se fosse sábado',
      'Comeu feijão com arroz como se fosse um príncipe',
      'Bebeu e soluçou como se fosse um náufrago',
      'Dançou e gargalhou como se ouvisse música',
      'E tropeçou no céu como se fosse um bêbado',
      'E flutuou no ar como se fosse um pássaro',
      'E se acabou no chão feito um pacote flácido',
      'Agonizou no meio do passeio público',
      'Morreu na contramão atrapalhando o tráfego'
    ],
    analysis: 'Monumento da MPB e da poesia lusófona do século XX, com métrica em proparoxítonas permutáveis que descrevem o esgotamento do operário.'
  },

  // Machado de Assis
  {
    id: 'machado-de-assis-soneto-de-natal',
    title: 'Soneto de Natal',
    poetId: 'machado-de-assis',
    poetName: 'Machado de Assis',
    country: 'BR',
    countryName: 'Brasil',
    year: '1896',
    era: 'Realismo / Parnasianismo',
    theme: 'Tempo, Memória e Desilusão',
    copyrightStatus: 'Domínio Público',
    stanzas: [
      'Um homem, — era aquela noite amiga,',
      'Noite cristã, berço do Nazareno, —',
      'Ao relembrar os dias de pequeno,',
      'E a viva dança, e a lápida cantiga,',
      '',
      'Quis transportar ao verso doce e ameno',
      'As sensações da sua idade antiga,',
      'Naquela mesma velha noite amiga,',
      'Noite cristã, berço do Nazareno.',
      '',
      'Escolheu o soneto... A folha branca',
      'Pede-lhe a inspiração; mas, frouxa e manca,',
      'A pena não acode ao gesto seu.',
      '',
      'E, em vão lutando contra o metro adverso,',
      'Só lhe saiu este pequeno verso:',
      '"Mudaria o Natal ou mudei eu?"'
    ],
    analysis: 'Ironia sutil e profunda do mestre Machado de Assis ao constatar que o passar dos anos transforma a nossa percepção da infância.'
  },

  // Manuel Bandeira
  {
    id: 'manuel-bandeira-auto-retrato',
    title: 'Auto-retrato',
    poetId: 'manuel-bandeira',
    poetName: 'Manuel Bandeira',
    country: 'BR',
    countryName: 'Brasil',
    year: '1930',
    era: 'Modernismo',
    theme: 'Sinceridade Lírica e Autoironia',
    copyrightStatus: 'Domínio Público',
    stanzas: [
      'Provinciano que nunca soube',
      'Escolher bem uma gravata;',
      'Pernambucano a quem repugna',
      'A faca do pernambucano;',
      '',
      'Poeta ruim que na arte da prosa',
      'Envelheceu na infância da arte,',
      'E até mesmo escrevendo crônicas',
      'Ficou cronista de província;',
      '',
      'Arquiteto falhado, músico',
      'Falhado (engoliu um dia',
      'Um piano, mas o teclado',
      'Ficou de fora); sem família,',
      '',
      'Religião ou filosofia;',
      'Mal tendo a inquietação de espírito',
      'Que vem do sobrenatural,',
      'E em matéria de profissão',
      'Um tísico profissional.'
    ],
    analysis: 'Retrato desprovido de vaidade onde Manuel Bandeira transforma a doença e a modéstia em arte imortal.'
  },

  // Mário Quintana
  {
    id: 'mario-quintana-poeminha-do-contra',
    title: 'Poeminha do Contra',
    poetId: 'mario-quintana',
    poetName: 'Mário Quintana',
    country: 'BR',
    countryName: 'Brasil',
    year: '1973',
    era: 'Modernismo / Poesia do Cotidiano',
    theme: 'Liberdade e Leveza Poética',
    copyrightStatus: 'Direitos Autorais Reservados',
    stanzas: [
      'Todos estes que aí estão',
      'Atravancando o meu caminho,',
      'Eles passarão…',
      'Eu passarinho!'
    ],
    analysis: 'Quatro versos lendários de Mário Quintana que demonstram como a poesia leve supera a rigidez e os obstáculos.'
  },

  // Millôr Fernandes
  {
    id: 'millor-fernandes-poesia-matematica',
    title: 'Poesia Matemática',
    poetId: 'millor-fernandes',
    poetName: 'Millôr Fernandes',
    country: 'BR',
    countryName: 'Brasil',
    year: '1965',
    era: 'Humor / Poesia Satírica',
    theme: 'Amo e Geometria da Mente',
    copyrightStatus: 'Direitos Autorais Reservados',
    stanzas: [
      'Às folhas tantas / Do livro matemático',
      'Um Quociente apaixonou-se / Um dia / Doidamente / Por uma Incógnita.',
      'Olhou-a com seu olhar inumerável / E viu-a, do Ápice à Base, / Uma Figura ímpar;',
      'Olhos rombóides, boca trapezóide, / Corpo ortogonal, seios esferóides.',
      'Fez da sua / Uma vida / Paralela a dela / Até que se encontraram / No Infinito.'
    ],
    analysis: 'Obra de arte do humor literário brasileiro, vestindo conceitos exatos de geometria e álgebra com afeto e riso.'
  }
];

let addedCount = 0;
for (const poem of newPoems) {
  if (!tsContent.includes(`id: '${poem.id}'`)) {
    const poemStr = `  {\n    id: '${poem.id}',\n    title: ${JSON.stringify(poem.title)},\n    poetId: '${poem.poetId}',\n    poetName: ${JSON.stringify(poem.poetName)},\n    country: 'BR',\n    countryName: 'Brasil',\n    year: ${JSON.stringify(poem.year)},\n    era: ${JSON.stringify(poem.era)},\n    theme: ${JSON.stringify(poem.theme)},\n    copyrightStatus: ${JSON.stringify(poem.copyrightStatus)},\n    stanzas: ${JSON.stringify(poem.stanzas, null, 6)},\n    analysis: ${JSON.stringify(poem.analysis)}\n  },\n`;
    
    // Find the end of LUSOPHONE_EXT_POEMS array
    const lastBracketIndex = tsContent.lastIndexOf('];');
    if (lastBracketIndex !== -1) {
      tsContent = tsContent.slice(0, lastBracketIndex) + poemStr + tsContent.slice(lastBracketIndex);
      addedCount++;
    }
  }
}

console.log(`Added ${addedCount} new Brazilian poems to LUSOPHONE_EXT_POEMS.`);
fs.writeFileSync(tsFilePath, tsContent, 'utf8');

// Also update src/data/lusophoneData.ts to add all poem IDs to the 'poesia-eterna-marco-dias' anthology
const dataFilePath = path.join(__dirname, 'src', 'data', 'lusophoneData.ts');
let dataContent = fs.readFileSync(dataFilePath, 'utf8');

const newPoemIds = newPoems.map(p => p.id);
let idsAddedToAnthology = 0;

for (const id of newPoemIds) {
  if (!dataContent.includes(`'${id}'`)) {
    dataContent = dataContent.replace(
      "'joao-apolinario-a-cidade-de-pedra'",
      `'joao-apolinario-a-cidade-de-pedra',\n      '${id}'`
    );
    idsAddedToAnthology++;
  }
}

console.log(`Added ${idsAddedToAnthology} poem IDs to Marco Dias Anthology.`);
fs.writeFileSync(dataFilePath, dataContent, 'utf8');
