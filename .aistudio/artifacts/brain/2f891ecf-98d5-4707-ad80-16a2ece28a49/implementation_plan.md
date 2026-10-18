# Redesign Visual: Fundo Iluminura Amarelo Ouro & Ícones Heráldicos de Bandeira

Modernização estética e curatorial do aplicativo, implementando um fundo atmosférico em tom amarelo ouro luminoso inspirado em iluminuras medievais e manuscritos clássicos, além de converter os ícones dos poetas em flâmulas e brasões heráldicos estilizados com as cores e emblemas das bandeiras de cada nação.

## Decisões Confirmadas com o Usuário

> [!IMPORTANT]
> Decisões deliberadas na rodada interativa de perguntas e respostas:

- **Tonalidade do Fundo**: **Amarelo ouro luminoso estilo iluminura medieval** (`#F3E8C9` a `#EFE0BA`), conferindo riqueza visual, textura de pergaminho áureo e contraste óptico aprimorado (WCAG AA) com a tipografia em tinta ferrogálica escura (`#1F1A14`).
- **Formato dos Ícones dos Poetas**: **Flâmula ou brasão heráldico com as cores do país**, substituindo a antiga moldura genérica por um estandarte/escudo nobre vetorial exibindo a bandeira nacional respectiva (Portugal, Brasil, Angola, Moçambique, Cabo Verde, França, Pérsia, etc.), com bordadura dourada e acabamento de iluminura.

---

## 1. Visão Geral & Conceito Curatorial

- **Objetivo**: Elevar a imersão poética do usuário a um padrão digno de biblioteca clássica e museu de manuscritos raros, sem comprometer a legibilidade e a rapidez de navegação.
- **Público-Alvo**: Amantes da poesia universal e lusófona, pesquisadores, estudantes e leitores que buscam um refúgio literário caloroso e esteticamente refinado.
- **Valor Principal**: O tom amarelo ouro luminoso remove a frieza do branco esterilizado sem cansar os olhos, enquanto os novos ícones em formato de flâmulas/brasões nacionais permitem identificar instantaneamente a pátria e a tradição literária de cada autor.

---

## 2. Experiência do Usuário & Design Visual

### Paleta de Cores e Atmosfera de Iluminura Medieval
- **Fundo Principal (Canvas Neutro Iluminado)**: `#F4E9CD` (ouro pergaminho radiante), com sobreposições suaves de pátina e grão leve (`radial-gradient` pontilhado dourado).
- **Superfícies Estruturais (Cards e Painéis)**: `#FAF3DF` e `#F7EFDB`, com bordas finas em tom sépia/âmbar (`rgba(65, 45, 20, 0.15)`).
- **Tipografia**: Tinta escura `#1F1A14` (títulos Cormorant Garamond e corpo Newsreader), garantindo contraste superior a 8:1 com o fundo ouro.
- **Acentos Dourados e Reais**: Ouro antigo `#D97706` / `#B45309`, azul ultramarino `#1E3A8A` (lápis-lazúli) e rubro `#991B1B` (cinábrio).

### Novo Componente de Ícone Heráldico dos Poetas (`HeraldicFlagIcon`)
- **Formato Escudo/Flâmula**: Silhueta vetorial SVG que evoca flâmulas medievais e escudos heráldicos com topo reto, laterais elegantes e ponta ogival ou cauda recortada.
- **Bandeiras Nacionais Renderizadas**:
  - **Portugal (`PT`)**: Partição verde e rubra com o escudo branco central e quinas estilizadas.
  - **Brasil (`BR`)**: Fundo verde com o losango amarelo e a esfera azul celeste.
  - **Angola (`AO`)**: Partição horizontal vermelha e preta com meia engrenagem e catana em ouro.
  - **Moçambique (`MZ`)**: Listras verde, preta e amarela separadas por filetes brancos e triângulo vermelho com livro e estrela.
  - **Cabo Verde (`CV`)**: Azul ultramarino com listras branca e vermelha e anel de estrelas.
  - **Guiné-Bissau (`GW`)**: Barra vertical vermelha e faixas horizontais amarela e verde.
  - **São Tomé e Príncipe (`ST`)**: Faixas verde e amarela com duas estrelas negras e triângulo vermelho.
  - **Timor-Leste (`TL`)**: Fundo vermelho, triângulos amarelo e negro com a estrela branca da liberdade.
  - **Pérsia / Irã (`IR`)**: Tricolor verde, branco e vermelho com o tulipa/emblema central estilizado.
  - **França (`FR`)**, **Itália (`IT`)**, **Espanha (`ES`)**, **Alemanha (`DE`)**, **Grécia (`GR`)**, **Reino Unido (`GB`)**, **EUA (`US`)**, **Chile (`CL`)**: Brasões tricolores específicos de cada nação.
  - **Universal / Outros**: Flâmula azul-ouro celeste com constelação poética.
- **Detalhes de Joalheria & Iluminura**: Orla com fio de ouro, mastro sutil ou presilha heráldica superior, sombras suaves de relevo e micro-interação de levitação sutil ao passar o cursor.

---

## 3. Decisões Técnicas & Trade-offs

- **Decisão 1: Atualização Centralizada no `CrayonPoetIcon` / `HeraldicFlagIcon`**
  - *Abordagem*: Refatorar o componente de ícone para aceitar opcionalmente a propriedade `country` e, caso não fornecida, resolver automaticamente o país do autor consultando o catálogo `POETS` através do `poetId` ou `poetName`.
  - *Vantagem*: Garante que **todas** as telas existentes (Início, Linha do Tempo, Catálogo A-Z, Nuvem de Autores, Roleta, Antologias e Modais de Leitura) recebam as novas bandeirinhas heráldicas imediatamente, sem necessidade de reescrever dezenas de chamadas manuais.
- **Decisão 2: CSS Base e Classes de Superfície Harmonizadas**
  - *Abordagem*: Atualizar as variáveis globais de fundo em `src/index.css` (`body`, classes utilitárias de cards e fundos) e revisar componentes com fundos fixos (`bg-[#fdfaf6]`, `bg-white`) para utilizarem a nova tonalidade pergaminho ouro luminoso.
  - *Vantagem*: Evita inconsistências de tonalidades ou "ilhas brancas" cortando a atmosfera estética de iluminura.

---

## 4. Arquitetura Técnica & Diagrama de Componentes

```
┌────────────────────────────────────────────────────────────────────────┐
│                          Aparência Global                              │
│         index.css: body bg (#F4E9CD) + text (#1F1A14) + dot-grid       │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
       ┌───────────────────────────┴───────────────────────────┐
       ▼                                                       ▼
┌──────────────────────────────────────┐  ┌────────────────────────────────────┐
│          HeraldicFlagIcon            │  │        Vistas do Aplicativo        │
│   (Flâmula / Brasão com Bandeira)    │  │   (Home, Poets, Countries, etc.)   │
│  - Lookup de país via POETS          │  │  - Fundo Ouro Iluminura Medieval   │
│  - Renderização SVG das bandeiras    │  │  - Cards em pergaminho suave       │
│  - Filetes e mastro dourado nobre    │  │  - Nuvem de Autores com flâmulas   │
└──────────────────────────────────────┘  └────────────────────────────────────┘
```

### Mapeamento de Estados e Propriedades
- `HeraldicFlagIconProps`:
  - `poetId?: string`
  - `poetName?: string`
  - `country?: CountryCode`
  - `size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'`
  - `variant?: 'shield' | 'pennant'` (padrão flâmula heráldica)
  - `className?: string`
