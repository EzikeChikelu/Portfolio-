export type ProjectCategory = "AI & Tools" | "Web Apps" | "Client Work" | "Open Source";
export type Project = { name: string; category: ProjectCategory; description: string; tags: string[]; source: string; live?: string; accent: string; visual: string; featured?: boolean };
export const projects: Project[] = [
  { name:"ResearchPilot AI", category:"AI & Tools", description:"An AI-assisted research workspace designed to turn broad questions into clearer research paths and useful findings.", tags:["AI","Research","Web App"], source:"https://github.com/EzikeChikelu/researchpilot-ai", live:"https://researchpilot-ai-delta.vercel.app/", accent:"#9c8cff", visual:"research", featured:true },
  { name:"Stellar Lens", category:"Web Apps", description:"A browser-based Stellar explorer for inspecting public accounts and transactions without connecting a wallet.", tags:["Stellar","Blockchain Explorer","Web3"], source:"https://github.com/EzikeChikelu/stellar-lens", accent:"#8bd9ff", visual:"stellar", featured:true },
  { name:"Stellar DeFi", category:"Web Apps", description:"A market and network intelligence dashboard for exploring Stellar ecosystem data, asset performance, and public-ledger activity.", tags:["React","TypeScript","Stellar"], source:"https://github.com/EzikeChikelu/Stellar-Defi", accent:"#d3f27b", visual:"stellar", featured:true },
  { name:"Stellar Lending Platform", category:"Web Apps", description:"A lending-focused product concept for the Stellar ecosystem, designed around clear financial information and a straightforward user experience.", tags:["Stellar","DeFi","Web App"], source:"https://github.com/EzikeChikelu/stellar-lend", accent:"#a8d5b5", visual:"market" },
  { name:"Live Market Dashboard", category:"Web Apps", description:"A live market dashboard that presents price movement and market information through a clean, data-focused interface.", tags:["JavaScript","Charts","API"], source:"https://github.com/EzikeChikelu/Live", live:"https://live-chartt.netlify.app", accent:"#7ce0cf", visual:"market" },
  { name:"Nnia Stitch", category:"Client Work", description:"A fashion-focused website built to give a creative brand a clear identity and a polished online presence.", tags:["Web Design","Responsive UI","Frontend"], source:"https://github.com/EzikeChikelu/fashion-designing-site", live:"https://nnia-stitch.netlify.app", accent:"#ffad98", visual:"fashion" },
  { name:"Vaddi Homes", category:"Client Work", description:"A real-estate web experience focused on presenting property information with clarity, warmth, and confidence.", tags:["Real Estate","UI Design","Web"], source:"https://github.com/EzikeChikelu/Vaddi-Home", live:"https://vaddihome.netlify.app", accent:"#a8d5b5", visual:"homes" },
  { name:"Open-source engineering", category:"Open Source", description:"Hands-on collaboration across real repositories: investigating issues, improving code, writing regression tests, and responding to review feedback.", tags:["GitHub","Debugging","Testing"], source:"https://github.com/EzikeChikelu", accent:"#f3ca76", visual:"code" }
];
export const skills = [
  { group:"Frontend", items:["React","TypeScript","JavaScript","HTML & CSS"] },
  { group:"Product craft", items:["Responsive UI","Interaction design","Accessibility","Performance"] },
  { group:"Engineering", items:["REST APIs","Git & GitHub","Testing","Debugging"] },
  { group:"Exploring", items:["AI products","Stellar ecosystem","Open source","Developer tooling"] }
];
export const contributions = [
  { name:"Akkuea", type:"Web application", detail:"React hook cleanup, state selector improvements, and transaction regression-test work.", url:"https://github.com/akkuea/akkuea/pull/1222" },
  { name:"SplitNaira", type:"Fintech", detail:"Working through CI and RPC failover issues in a collaborative repository workflow.", url:"https://github.com/Split-Naira/SplitNaira/pull/1563" },
  { name:"Stellar Intel", type:"Stellar ecosystem", detail:"Participating in issue and pull-request workflows around Stellar ecosystem tooling.", url:"https://github.com/ezedike-evan/stellar-intel/pull/1905" }
];
