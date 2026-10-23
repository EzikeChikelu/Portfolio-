import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Code2, Copy, Github, GitPullRequest, Mail, Menu, Moon, Sparkles, Sun, X } from "lucide-react";
import portrait from "../Myself.jpg";
import { contributions, projects, skills } from "./data";
import type { ProjectCategory } from "./data";

const filters = ["All work", "AI & Tools", "Web Apps", "Client Work", "Open Source"] as const;
type Filter = typeof filters[number];
type GitHubEvent = { id: string; type: string; created_at: string; repo?: { name?: string }; payload?: { pull_request?: { title?: string }; issue?: { title?: string } } };

function labelEvent(event: GitHubEvent) {
  const repo = event.repo?.name ?? "GitHub repository";
  switch (event.type) {
    case "PushEvent": return { title: "Pushed code", detail: repo, mark: "↗" };
    case "PullRequestEvent": return { title: "Updated a pull request", detail: event.payload?.pull_request?.title ?? repo, mark: "⑂" };
    case "PullRequestReviewEvent": return { title: "Reviewed a pull request", detail: repo, mark: "✓" };
    case "IssuesEvent": return { title: "Worked on an issue", detail: event.payload?.issue?.title ?? repo, mark: "#" };
    case "IssueCommentEvent": return { title: "Joined a discussion", detail: repo, mark: "↳" };
    case "CreateEvent": return { title: "Created something new", detail: repo, mark: "+" };
    default: return null;
  }
}
function timeAgo(date: string) {
  const minutes = Math.max(0, Math.floor((Date.now() - new Date(date).getTime()) / 60000));
  return minutes < 1 ? "just now" : minutes < 60 ? minutes + "m ago" : minutes < 1440 ? Math.floor(minutes / 60) + "h ago" : minutes < 10080 ? Math.floor(minutes / 1440) + "d ago" : new Date(date).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}
function ProjectVisual({ visual, accent }: { visual: string; accent: string }) {
  return <div className={"project-visual visual-" + visual} style={{ "--project-accent": accent } as CSSProperties} aria-hidden="true">
    <div className="visual-grid" />
    {visual === "research" && <div className="mock research-mock"><div className="mock-top"><i/><i/><i/><span>RESEARCHPILOT / WORKSPACE</span></div><small>RESEARCH SESSION 001</small><b>From question<br/>to clarity<span>.</span></b><div className="mock-rule"/><div className="mock-tags"><i>Sources</i><i>Insights</i><i>Notes</i></div></div>}
    {visual === "stellar" && <div className="mock stellar-mock"><div className="mock-label">STELLAR / NETWORK <span>● LIVE</span></div><small>XLM / USD</small><strong>$0.0<span>42</span></strong><svg viewBox="0 0 300 80"><path d="M0 65 C30 55 33 24 60 39 S90 70 118 42 S150 13 175 32 S207 54 230 26 S266 37 300 8" fill="none" stroke="currentColor" strokeWidth="2.5"/><path d="M0 65 C30 55 33 24 60 39 S90 70 118 42 S150 13 175 32 S207 54 230 26 S266 37 300 8 L300 80 L0 80Z" fill="currentColor" opacity=".1"/></svg><div className="mock-footer">NETWORK HEALTH <b>OPERATIONAL</b></div></div>}
    {visual === "lens" && <div className="mock lens-mock"><div className="lens-top"><span>STELLAR LENS</span><i>PUBLIC NETWORK</i></div><div className="lens-search"><small>ACCOUNT ADDRESS</small><b>G...7K2M</b><span>INSPECT ACCOUNT ↗</span></div><div className="lens-stats"><div><small>ASSETS</small><b>12</b></div><div><small>TRANSACTIONS</small><b>248</b></div><div><small>NETWORK</small><b>PUBLIC</b></div></div><div className="lens-activity"><i/><span>Payment operation</span><b>Confirmed</b></div><div className="lens-activity"><i/><span>Asset transfer</span><b>Confirmed</b></div></div>}
    {visual === "lending" && <div className="mock lending-mock"><div className="lending-head"><small>STELLAR / LENDING</small><span>PROTOCOL OVERVIEW</span></div><small className="lending-label">TOTAL VALUE TRACKED</small><strong>$248,650<span>.00</span></strong><div className="lending-metrics"><div><small>SUPPLIED</small><b>$182.4k</b></div><div><small>AVAILABLE</small><b>$66.2k</b></div></div><div className="lending-bars"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div><div className="lending-foot"><span>POOL UTILIZATION</span><b>73.4%</b></div></div>}
    {visual === "market" && <div className="mock market-mock"><small>MARKET OVERVIEW <span>● LIVE</span></small><strong>$68,420.18</strong><label>+4.82% <i>24H</i></label><div className="bars">{[28,42,34,55,44,66,49,75,62,88,70,95,78,100].map((h,i)=><i key={i} style={{height:h+"%"}}/>)}</div></div>}
    {visual === "fashion" && <div className="mock fashion-mock"><small>ATELIER / 01</small><b>Made<br/>to be<br/><em>remembered.</em></b><i/></div>}
    {visual === "homes" && <div className="mock homes-mock"><small>VADDI HOMES</small><div className="building"/><b>Spaces to<br/>belong.</b><label>PROPERTY COLLECTION · 2026</label></div>}
    {visual === "code" && <div className="mock code-mock"><small>CONTRIBUTION.LOG</small><p><i>01</i> <b>read</b> unfamiliar code</p><p><i>02</i> <b>trace</b> the root cause</p><p><i>03</i> <b>test</b> the regression</p><p><i>04</i> <b>ship</b> the fix<span>_</span></p></div>}
    <span className="visual-index">FC / 0{projects.findIndex(p => p.visual === visual) + 1}</span>
  </div>;
}
function ProjectCard({ project, index }: { project: typeof projects[number]; index: number }) {
  return <article className="project-card reveal" style={{ "--project-accent": project.accent, "--delay": index * 60 + "ms" } as CSSProperties}>
    <ProjectVisual visual={project.visual} accent={project.accent}/>
    <div className="project-content"><div className="project-meta"><span>{project.category}</span>{project.featured && <span className="featured"><Sparkles size={12}/> FEATURED</span>}</div>
      <h3>{project.name}</h3><p>{project.description}</p><div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
      <div className="project-actions">{project.live && <a href={project.live} target="_blank" rel="noreferrer">Live preview <ArrowUpRight size={15}/></a>}<a href={project.source} target="_blank" rel="noreferrer">Source code <Github size={15}/></a></div>
    </div>
  </article>;
}
export default function App() {
  const [filter, setFilter] = useState<Filter>("All work");
  const [menuOpen, setMenuOpen] = useState(false);
  const [light, setLight] = useState(true);
  const [copied, setCopied] = useState(false);
  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [activity, setActivity] = useState<"loading"|"ready"|"error">("loading");
  const [progress, setProgress] = useState(0);
  const visibleProjects = useMemo(() => filter === "All work" ? projects : projects.filter(project => project.category === filter as ProjectCategory), [filter]);
  useEffect(() => { const savedTheme = window.localStorage.getItem("portfolio-theme"); if (savedTheme === "dark") setLight(false); else if (savedTheme === "light") setLight(true); const onScroll = () => { const max = document.documentElement.scrollHeight - innerHeight; setProgress(max > 0 ? scrollY / max * 100 : 0); }; addEventListener("scroll", onScroll, { passive: true }); onScroll(); return () => removeEventListener("scroll", onScroll); }, []);
  useEffect(() => { document.documentElement.dataset.theme = light ? "light" : "dark"; window.localStorage.setItem("portfolio-theme", light ? "light" : "dark"); }, [light]);
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) { elements.forEach(el => el.classList.add("visible")); return; }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); } }), { threshold: .12 });
    elements.forEach(el => observer.observe(el)); return () => observer.disconnect();
  }, [filter, events, activity]);
  useEffect(() => {
    const controller = new AbortController();
    fetch("https://api.github.com/users/EzikeChikelu/events/public?per_page=25", { headers: { Accept: "application/vnd.github+json" }, signal: controller.signal })
      .then(response => { if (!response.ok) throw new Error("Activity unavailable"); return response.json() as Promise<GitHubEvent[]>; })
      .then(data => { setEvents(data.filter(event => labelEvent(event)).slice(0, 4)); setActivity("ready"); })
      .catch(error => { if (error instanceof Error && error.name !== "AbortError") setActivity("error"); });
    return () => controller.abort();
  }, []);
  async function copyEmail() { try { await navigator.clipboard.writeText("ezikechikelu258@gmail.com"); setCopied(true); window.setTimeout(() => setCopied(false), 2200); } catch { window.location.href = "mailto:ezikechikelu258@gmail.com"; } }
  const closeMenu = () => setMenuOpen(false);
  return <div className="site-shell">
    <div className="scroll-progress" style={{ width: progress + "%" }}/>
    <header className="site-header"><nav className="nav container" aria-label="Main navigation">
      <a className="brand" href="#home" onClick={closeMenu}><span className="brand-mark">FC</span><span>Francis<span className="brand-muted">Codes</span><small>SOFTWARE DEVELOPER</small></span></a>
      <div className={"nav-links " + (menuOpen ? "is-open" : "")}><a href="#work" onClick={closeMenu}>Work</a><a href="#about" onClick={closeMenu}>About</a><a href="#skills" onClick={closeMenu}>Skills</a><a href="#activity" onClick={closeMenu}>Open source</a><a className="nav-contact" href="#contact" onClick={closeMenu}>Let's talk <ArrowUpRight size={15}/></a></div>
      <div className="nav-tools"><button className="icon-button" onClick={() => setLight(value => !value)} aria-label={light ? "Switch to dark theme" : "Switch to light theme"}>{light ? <Moon size={17}/> : <Sun size={17}/>}</button><button className="icon-button menu-toggle" onClick={() => setMenuOpen(value => !value)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>{menuOpen ? <X size={19}/> : <Menu size={19}/>}</button></div>
    </nav></header>
    <main>
      <section className="hero container" id="home"><div className="hero-copy">
        <div className="eyebrow"><span className="availability-dot"/> OPEN TO THE RIGHT OPPORTUNITY <i/></div><p className="hero-kicker">MEET THE DEV <span>— 001</span></p>
        <h1>I build digital<br/><span className="outline">things that</span><br/><span className="accent">move us forward.</span></h1>
        <p className="hero-description">I'm Francis — a software developer who turns ideas into polished, useful digital experiences. I care about the details, the people using the product, and the engineering behind it.</p>
        <div className="hero-actions"><a className="button primary" href="#work">Explore my work <ArrowDown size={16}/></a><a className="button secondary" href="#contact">Need a website? I'm your guy <ArrowUpRight size={16}/></a></div>
        <div className="hero-foot"><span>BASED IN NIGERIA</span><i/><span>WEB · PRODUCT · OPEN SOURCE</span></div>
      </div><div className="portrait-wrap"><div className="portrait-glow"/><div className="portrait-frame"><img src={portrait} alt="Portrait of Francis" fetchPriority="high"/><div className="portrait-overlay"><small>FRANCIS / DEVELOPER</small><b>Thoughtful by design.</b></div></div><div className="float-note note-top"><Code2 size={17}/><span><small>CRAFT</small><b>Built with intention</b></span></div><div className="float-note note-bottom"><GitPullRequest size={17}/><span><small>COMMUNITY</small><b>Learning in the open</b></span></div><span className="portrait-index">FIG. 01 / THE BUILDER</span></div></section>
      <section className="ticker" aria-label="Areas of focus"><div className="ticker-track">{[0,1].map(n=><div className="ticker-group" key={n}><span>FRONTEND ENGINEERING</span><i>✳</i><span>PRODUCT THINKING</span><i>✳</i><span>AI-POWERED TOOLS</span><i>✳</i><span>OPEN SOURCE</span><i>✳</i><span>DETAILS MATTER</span><i>✳</i></div>)}</div></section>
      <section className="section container" id="work"><div className="section-heading reveal"><div><p className="section-index">01 / SELECTED WORK</p><h2>Less talk.<br/><span>More shipped.</span></h2></div><p className="section-summary">A selection of products, experiments, and client work. Each one is an opportunity to solve a real problem and make the experience feel effortless.</p></div>
        <div className="filter-row" role="group" aria-label="Filter projects">{filters.map(item=><button key={item} className={filter === item ? "filter-chip active" : "filter-chip"} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}</div>
        <div className="projects-grid">{visibleProjects.map((project,index)=><ProjectCard key={project.name} project={project} index={index}/>)}</div><div className="work-bottom"><span>MORE EXPERIMENTS, MORE ITERATIONS.</span><a href="https://github.com/EzikeChikelu?tab=repositories" target="_blank" rel="noreferrer">Explore all repositories <ArrowUpRight size={15}/></a></div>
      </section>
      <section className="about-section" id="about"><div className="container about-grid"><div className="about-left reveal"><p className="section-index">02 / THE PERSON BEHIND THE PIXELS</p><h2>Good software<br/>should feel<br/><span>obvious.</span></h2><div className="about-image"><img src={portrait} alt="Francis Codes"/><small>MEET THE DEV / NIGERIA</small></div></div>
        <div className="about-right reveal"><span className="about-marker"><Sparkles size={15}/> A LITTLE ABOUT ME</span><h3>I enjoy turning complicated ideas into clear, useful experiences.</h3><p>My work sits at the intersection of engineering and product thinking. I like figuring out how a feature should behave, building an interface that feels considered, and making sure the implementation is dependable.</p><p>I'm growing through hands-on projects and open-source work. I enjoy unfamiliar codebases, practical problem-solving, and learning by shipping real things—not just tutorials.</p><div className="principles">{[{n:"01",title:"Build with purpose",text:"Start with the problem, not the trend."},{n:"02",title:"Respect the details",text:"Good UX is part of good engineering."},{n:"03",title:"Learn in public",text:"Feedback is a feature, not a failure."},{n:"04",title:"Ship and improve",text:"Progress beats perfection in a draft."}].map(item=><article key={item.n}><span>{item.n}</span><b>{item.title}</b><p>{item.text}</p></article>)}</div></div></div></section>
      <section className="section container" id="skills"><div className="section-heading reveal"><div><p className="section-index">03 / TOOLKIT</p><h2>Curious mind.<br/><span>Growing toolkit.</span></h2></div><p className="section-summary">Tools matter, but knowing how to choose them, combine them, and solve the right problem matters more.</p></div><div className="skills-grid">{skills.map((group,index)=><article className="skill-card reveal" key={group.group}><span>0{index+1}</span><h3>{group.group}</h3><div>{group.items.map(item=><i key={item}>{item}</i>)}</div></article>)}</div></section>
      <section className="section activity-section" id="activity"><div className="container"><div className="section-heading reveal"><div><p className="section-index">04 / OPEN SOURCE</p><h2>Built in public.<br/><span>Better together.</span></h2></div><p className="section-summary">Real repositories are where I practice tracing bugs, reading unfamiliar systems, collaborating through reviews, and making changes that hold up.</p></div>
        <div className="activity-layout"><div className="activity-panel reveal"><div className="activity-header"><div className="activity-profile"><span className="github-mark"><Github size={19}/></span><span><b>EzikeChikelu</b><small>PUBLIC GITHUB ACTIVITY</small></span></div><span className="activity-live"><i/> LIVE FEED</span></div>
          {activity === "loading" && <p className="activity-message">Loading public activity…</p>}{activity === "error" && <p className="activity-message">GitHub activity is temporarily unavailable. You can still explore the full profile below.</p>}{activity === "ready" && events.length === 0 && <p className="activity-message">No recent public events to show right now. Visit the profile for more.</p>}
          {events.map(event=>{const info=labelEvent(event);if(!info)return null;return <article className="activity-row" key={event.id}><span className="activity-symbol">{info.mark}</span><span className="activity-copy"><b>{info.title}</b><small>{info.detail}</small></span><time>{timeAgo(event.created_at)}</time></article>;})}
          <a className="activity-footer" href="https://github.com/EzikeChikelu?tab=activity" target="_blank" rel="noreferrer">View GitHub activity <ArrowUpRight size={15}/></a></div>
          <div className="contribution-list">{contributions.map((item,index)=><a className="contribution-item reveal" key={item.name} href={item.url} target="_blank" rel="noreferrer"><span className="contribution-number">0{index+1}</span><span className="contribution-copy"><small>{item.type}</small><b>{item.name}</b><span>{item.detail}</span></span><ArrowUpRight size={17}/></a>)}</div></div>
      </div></section>
      <section className="contact-section container" id="contact"><div className="contact-panel reveal"><div className="contact-watermark">LET'S</div><div className="contact-content"><p className="section-index">05 / HAVE A GOOD PROBLEM?</p><h2>Let's make<br/><span>something matter.</span></h2><p>Need a website, a product built, or a developer who enjoys working through the hard parts? Let's talk about what you're trying to make.</p><div className="contact-actions"><a className="button primary" href="mailto:ezikechikelu258@gmail.com?subject=Let's%20build%20something">Start a conversation <Mail size={16}/></a><button className="button secondary" onClick={copyEmail}>{copied ? <Check size={16}/> : <Copy size={16}/>} {copied ? "Email copied" : "Copy email"}</button></div></div><div className="contact-aside"><span className="contact-icon"><Mail size={20}/></span><small>DIRECT LINE</small><a href="mailto:ezikechikelu258@gmail.com">ezikechikelu258@gmail.com <ArrowUpRight size={14}/></a><hr/><small>AROUND THE WEB</small><a href="https://github.com/EzikeChikelu" target="_blank" rel="noreferrer"><Github size={15}/> GitHub</a><a href="https://w.app/yhfko1" target="_blank" rel="noreferrer"><ArrowRight size={15}/> WhatsApp</a><a href="https://www.instagram.com/francis.bossmann/" target="_blank" rel="noreferrer"><ArrowRight size={15}/> Instagram</a></div></div></section>
    </main>
    <footer className="site-footer container"><a href="#home" className="footer-brand"><span className="brand-mark">FC</span> Francis Codes</a><span>Designed with intent. Built with care.</span><div><a href="#home">Back to top ↑</a><span>© {new Date().getFullYear()}</span></div></footer>
    {copied && <div className="toast" role="status" aria-live="polite">Email copied to clipboard</div>}
  </div>;
}