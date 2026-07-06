import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  ArrowUpRight,
  Bot,
  BrainCircuit,
  Camera,
  Check,
  Code2,
  Compass,
  ExternalLink,
  Lightbulb,
  Mail,
  Menu,
  Newspaper,
  PenTool,
  Rocket,
  Users,
  X,
} from "lucide-react";
import "./styles.css";

const services = [
  {
    icon: PenTool,
    title: "Branding & Creative Design",
    text: "Identity systems, campaign art direction, pitch decks, brand voice, social templates, and full creative direction.",
  },
  {
    icon: Code2,
    title: "Website & App Development",
    text: "Modern websites, web apps, portals, booking systems, e-commerce, mobile-ready interfaces, and ongoing maintenance.",
  },
  {
    icon: Bot,
    title: "AI Agents & Automation",
    text: "Agentic AI assistants, chatbots, internal workflows, CRM automations, smart dashboards, and AI-powered business tools.",
  },
  {
    icon: Camera,
    title: "Content, Video & Production",
    text: "Photo, video, reels, motion graphics, product launches, event coverage, and social-first content systems.",
  },
  {
    icon: Rocket,
    title: "Digital Marketing",
    text: "Paid ads, launch campaigns, lead funnels, email marketing, analytics setup, SEO foundations, and growth strategy.",
  },
  {
    icon: BrainCircuit,
    title: "Innovation Consulting",
    text: "Digital transformation plans, product strategy, workflow mapping, and implementation roadmaps for modern teams.",
  },
];

const work = [
  {
    title: "Journal la Diaspora",
    text: "A news platform connecting Haiti and its diaspora communities, built for daily readership and trust.",
    url: "https://journalladiaspora.com/",
  },
  {
    title: "LSV Media Production",
    text: "A fast-moving Creole-language news site covering security, international affairs, and daily headlines.",
    url: "https://lsvmediaproduction.com/",
  },
  {
    title: "Franc Parler",
    text: "An editorial news platform built around rigor and reliability, delivering current affairs coverage.",
    url: "https://francparler.media/",
  },
  {
    title: "Footlakay",
    text: "A live hub for the FIFA World Cup 2026 — countdown, live scores, fixtures, standings, and predictions.",
    url: "https://footlakay.com/",
  },
  {
    title: "Galaxy Exhibitions",
    text: "A cultural showcase site presenting collections that celebrate the richness of Haitian culture.",
    url: "https://galaxyexhibitions.org/",
  },
];

const process = ["Discover", "Design", "Build", "Launch", "Optimize"];

const capabilityTabs = [
  {
    title: "Strategy",
    label: "Position",
    text: "Clarify the business goal, audience, offer, message, and digital roadmap before design begins.",
    items: ["Brand audit", "Launch plan", "Digital roadmap"],
  },
  {
    title: "Identity",
    label: "Create",
    text: "Build the visual and verbal system that makes the company recognizable everywhere it shows up.",
    items: ["Logo system", "Brand voice", "Social kit"],
  },
  {
    title: "Platforms",
    label: "Build",
    text: "Design and develop websites, apps, portals, dashboards, and e-commerce experiences that convert.",
    items: ["Website", "Web app", "Client portal"],
  },
  {
    title: "Content",
    label: "Move",
    text: "Create video, photo, motion, and campaign assets that give the brand momentum after launch.",
    items: ["Reels", "Campaigns", "Production"],
  },
  {
    title: "AI Systems",
    label: "Innovate",
    text: "Connect AI agents and automations to customer service, sales, reporting, and internal workflows.",
    items: ["AI agents", "Automation", "Dashboards"],
  },
];

const nav = [
  ["Home", "/"],
  ["Who we are", "/who-we-are"],
  ["Our Capabilities", "/capabilities"],
  ["Blog", "/blog"],
  ["Contact us", "/contact"],
];

const feedCategories = ["All", "Technology", "AI", "UX & UI", "Branding", "Marketing"];

function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max <= 0 ? 0 : window.scrollY / max);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return progress;
}

function useReveal(deps = []) {
  useEffect(() => {
    const items = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, deps);
}

function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | Media Innovation` : "Media Innovation | Creative Agency";
  }, [title]);
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const progress = useScrollProgress();
  useReveal([location.pathname]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  const goTo = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <main>
      <div className="scrollbar" style={{ transform: `scaleX(${progress})` }} />
      <header className="site-header">
        <Link className="brand brand-button" to="/" onClick={() => setMenuOpen(false)} aria-label="Media Innovation home">
          <span className="brand-mark">
            <AnimatedLogo compact />
          </span>
          <span>Media Innovation</span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {nav.map(([label, path]) => (
            <NavLink className={({ isActive }) => (isActive ? "active" : "")} key={label} to={path} end={path === "/"}>
              {label}
            </NavLink>
          ))}
        </nav>
        <button className="header-cta" onClick={() => goTo("/contact")}>
          Start a project <ArrowUpRight size={17} />
        </button>
        <button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Open menu">
          <Menu size={22} />
        </button>
      </header>

      <div className={`mobile-panel ${menuOpen ? "open" : ""}`}>
        <button className="menu-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">
          <X size={22} />
        </button>
        {nav.map(([label, path]) => (
          <NavLink className={({ isActive }) => (isActive ? "active" : "")} key={label} to={path} end={path === "/"} onClick={() => setMenuOpen(false)}>
            {label}
          </NavLink>
        ))}
        <button onClick={() => goTo("/contact")}>
          Start a project
        </button>
      </div>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/who-we-are" element={<WhoPage />} />
        <Route path="/capabilities" element={<CapabilitiesPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </main>
  );
}

function HomePage() {
  usePageTitle();
  return (
    <>
      <Hero />
      <SignalRail />
      <ProofStrip />
      <StudioStrip />
      <CapabilitySystem />
      <Services />
      <Showcase />
      <AISection />
      <Process />
      <HomeContact />
    </>
  );
}

function ProofStrip() {
  const proof = [
    ["01", "Strategy first", "Every project starts with positioning, audience, and business goals."],
    ["02", "Build ready", "Creative direction connects directly to websites, apps, and systems."],
    ["03", "AI enabled", "Automation and agents are planned where they make operations faster."],
  ];

  return (
    <section className="proof-strip" aria-label="Media Innovation proof points">
      {proof.map(([number, title, text], index) => (
        <article data-reveal key={title} style={{ "--delay": `${index * 80}ms` }}>
          <span>{number}</span>
          <h3>{title}</h3>
          <p>{text}</p>
        </article>
      ))}
    </section>
  );
}

function SignalRail() {
  const signals = ["Brand strategy", "Web design", "Application development", "AI agents", "Content systems", "Launch campaigns"];
  const rail = [...signals, ...signals];

  return (
    <section className="signal-rail" aria-label="Media Innovation services">
      <div>
        {rail.map((item, index) => (
          <span key={`${item}-${index}`}>{item}</span>
        ))}
      </div>
    </section>
  );
}

function StudioStrip() {
  return (
    <section className="studio-strip" aria-label="Media Innovation focus areas">
      <div data-reveal>
        <span>Create</span>
        <span>Build</span>
        <span>Innovate</span>
      </div>
      <p data-reveal>
        Brand systems, digital products, content engines, and AI workflows designed to feel clear,
        useful, and memorable.
      </p>
    </section>
  );
}

function Hero() {
  const heroRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onMove = (event) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 16;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 16;
      heroRef.current.style.setProperty("--tilt-x", `${-y}deg`);
      heroRef.current.style.setProperty("--tilt-y", `${x}deg`);
      heroRef.current.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
      heroRef.current.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
    };

    const node = heroRef.current;
    node?.addEventListener("pointermove", onMove);
    return () => node?.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <section id="top" className="hero" ref={heroRef}>
      <div className="hero-backdrop" />
      <div className="hero-copy" data-reveal>
        <span className="eyebrow">
          Creative technology agency
        </span>
        <h1>Media Innovation</h1>
        <p className="tagline">We are here to create, build, and innovate.</p>
        <p className="hero-text">
          Branding, websites, applications, content, marketing, and AI-powered systems for
          businesses ready to grow.
        </p>
        <div className="hero-actions">
          <button className="primary-button" onClick={() => navigate("/contact")}>
            Book a strategy call <ArrowUpRight size={18} />
          </button>
        </div>
      </div>

      <HeroVisual />
    </section>
  );
}

function CapabilitySystem() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % capabilityTabs.length);
    }, 2600);
    return () => window.clearInterval(timer);
  }, []);

  const selected = capabilityTabs[active];

  return (
    <section className="capability-system">
      <div className="section-heading compact" data-reveal>
        <span className="section-kicker">Operating system</span>
        <h2>One agency, five connected capabilities.</h2>
        <p>
          A simple UX for clients: choose the outcome, then we connect strategy, creative,
          technology, content, and AI into one launch path.
        </p>
      </div>
      <div className="capability-console" data-reveal>
        <div className="capability-tabs" role="tablist" aria-label="Media Innovation capabilities">
          {capabilityTabs.map((capability, index) => (
            <button
              className={active === index ? "active" : ""}
              key={capability.title}
              onClick={() => setActive(index)}
              onMouseEnter={() => setActive(index)}
              role="tab"
              aria-selected={active === index}
            >
              <span>{capability.label}</span>
              {capability.title}
            </button>
          ))}
        </div>
        <div className="capability-preview">
          <span>{selected.label}</span>
          <h3>{selected.title}</h3>
          <p>{selected.text}</p>
          <div className="preview-pills">
            {selected.items.map((item) => (
              <strong key={item}>{item}</strong>
            ))}
          </div>
          <Link className="play-button" to="/capabilities">
            Explore capabilities <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="hero-visual creative-stage" data-reveal>
      <div className="stage-logo" aria-hidden="true">
        <AnimatedLogo />
      </div>
    </div>
  );
}

function AnimatedLogo({ compact = false }) {
  const logoId = compact ? "mi-logo-compact" : "mi-logo-stage";
  const blueId = `${logoId}-blue`;
  const lightId = `${logoId}-light`;
  const glowId = `${logoId}-glow`;

  return (
    <svg
      className={`animated-logo ${compact ? "compact" : ""}`}
      viewBox="0 0 360 360"
      role="img"
      aria-label="Media Innovation"
    >
      <defs>
        <linearGradient id={blueId} x1="180" y1="28" x2="180" y2="333" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#8bd6ff" />
          <stop offset="0.45" stopColor="#35b6ed" />
          <stop offset="1" stopColor="#159bd8" />
        </linearGradient>
        <linearGradient id={lightId} x1="180" y1="28" x2="180" y2="333" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.78" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <filter id={glowId} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="0 0 0 0 0.12 0 0 0 0 0.65 0 0 0 0 0.95 0 0 0 0.55 0"
            result="glow"
          />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g className="logo-mark" filter={`url(#${glowId})`}>
        <path fill={`url(#${blueId})`} className="logo-band band-one" d="M247,172.6c-63.8,3.5-96.6,31.3-147.5,29.3L180,27.9l67,144.7Z" />
        <path fill={`url(#${blueId})`} className="logo-band band-two" d="M285,254.7c-106.6-9.8-136,46.3-220.5,22.7l35-75.6c50.9,2,83.7-25.7,147.5-29.3l38,82.1Z" />
        <path fill={`url(#${blueId})`} className="logo-band band-three" d="M321.1,332.7H38.9l25.6-55.3c84.5,23.6,113.9-32.5,220.5-22.7l36.1,78Z" />
        <path fill={`url(#${lightId})`} className="logo-shine shine-one" d="M247,172c-63.8,3.5-96.6,31.3-147.5,29.3L180,27.3l67,144.7Z" />
        <path fill={`url(#${lightId})`} className="logo-shine shine-two" d="M285,254.1c-106.6-9.8-136,46.3-220.5,22.7l35-75.6c50.9,2,83.7-25.7,147.5-29.3l38,82.1Z" />
        <path fill={`url(#${lightId})`} className="logo-shine shine-three" d="M321.1,332.1H38.9l25.6-55.3c84.5,23.6,113.9-32.5,220.5-22.7l36.1,78Z" />
      </g>
    </svg>
  );
}

function PageHero({ kicker, title, text }) {
  return (
    <section className="page-hero">
      <div className="page-hero-copy" data-reveal>
        <span className="eyebrow">{kicker}</span>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
    </section>
  );
}

function WhoPage() {
  usePageTitle("Who We Are");
  return (
    <>
      <PageHero
        icon={Users}
        kicker="Who we are"
        title="A creative technology agency built for the next era."
        text="Media Innovation helps ambitious businesses look sharper, move faster, and operate smarter by combining brand strategy, design, software, content, marketing, and AI automation."
      />
      <section className="section split-section">
        <div className="section-heading" data-reveal>
          <span className="section-kicker">Our belief</span>
          <h2>Creativity is stronger when it can ship.</h2>
          <p>
            We are not here only to make things look good. We create identities, build useful
            digital products, and innovate with systems that help companies grow every day.
          </p>
        </div>
        <div className="value-grid">
          {[
            ["Create", "Brand identities, visual systems, content, campaign concepts, and storytelling that make companies memorable."],
            ["Build", "Websites, applications, portals, dashboards, and digital platforms made to perform in the real world."],
            ["Innovate", "AI agents, automations, and modern workflows that give teams more leverage with less manual work."],
          ].map(([title, text], index) => (
            <article className="value-card" data-reveal key={title} style={{ "--delay": `${index * 80}ms` }}>
              <span>{title}</span>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="statement-band">
        <div data-reveal>
          <Lightbulb size={28} />
          <h2>We are here to create, build, and innovate.</h2>
          <p>
            That is the promise behind every project: clear strategy, premium execution, and
            practical innovation that makes the business better.
          </p>
          <Link className="primary-button" to="/contact">
            Work with us <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}

function CapabilitiesPage() {
  usePageTitle("Our Capabilities");
  return (
    <>
      <PageHero
        icon={Compass}
        kicker="Our capabilities"
        title="Everything a modern business needs to show up, launch, and scale."
        text="From the first brand concept to a functioning app or AI agent, our capabilities connect creative direction with technical implementation."
      />
      <Services />
      <AISection />
      <section className="section capability-lanes">
        <div className="section-heading compact" data-reveal>
          <span className="section-kicker">Delivery lanes</span>
          <h2>Choose one lane or connect the full system.</h2>
        </div>
        <div className="lane-grid">
          {[
            ["Brand launch", "Identity, website, content kit, launch campaign, and analytics."],
            ["Web/app build", "UX, UI, front-end, backend planning, integrations, testing, and deployment support."],
            ["AI operations", "Agent design, automation mapping, prompt systems, knowledge bases, and workflow triggers."],
            ["Growth engine", "Ads, landing pages, lead funnels, email systems, reporting, and campaign optimization."],
          ].map(([title, text], index) => (
            <article className="lane-card" data-reveal key={title} style={{ "--delay": `${index * 80}ms` }}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="mini-cta">
        <h2 data-reveal>Need a custom package?</h2>
        <Link className="primary-button" to="/contact">
          Let us map it out <ArrowUpRight size={18} />
        </Link>
      </section>
    </>
  );
}

function formatFeedDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function useBlogFeed() {
  const [state, setState] = useState({ status: "loading", items: [] });

  useEffect(() => {
    let cancelled = false;

    fetch("/blog-feed.json")
      .then((response) => {
        if (!response.ok) throw new Error("Feed unavailable");
        return response.json();
      })
      .then((data) => {
        if (cancelled) return;
        if (!Array.isArray(data.items) || data.items.length === 0) throw new Error("Feed empty");
        setState({ status: "ready", items: data.items });
      })
      .catch(() => {
        if (!cancelled) setState({ status: "error", items: [] });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}

function BlogPage() {
  usePageTitle("Blog");
  const feed = useBlogFeed();
  const [activeCategory, setActiveCategory] = useState("All");
  useReveal([feed.status, activeCategory]);

  const visibleItems =
    activeCategory === "All" ? feed.items : feed.items.filter((post) => post.category === activeCategory);

  return (
    <>
      <PageHero
        icon={Newspaper}
        kicker="Blog"
        title="A real-time pulse on technology, AI, design, and marketing."
        text="This feed pulls the latest stories across technology, AI, UX/UI, branding, and marketing, no fictional posts, no manual upkeep."
      />
      <section className="section blog-section">
        <div className="section-heading compact" data-reveal>
          <span className="section-kicker">Live industry feed</span>
          <h2>What's moving across every discipline we work in.</h2>
          {/* <p>Refreshed automatically each time the site is built.</p> */}
        </div>

        {feed.status === "ready" && (
          <div className="feed-filters" role="tablist" aria-label="Filter by category">
            {feedCategories.map((category) => (
              <button
                className={activeCategory === category ? "active" : ""}
                key={category}
                onClick={() => setActiveCategory(category)}
                role="tab"
                aria-selected={activeCategory === category}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {feed.status === "loading" && <p className="feed-status">Loading the latest stories…</p>}
        {feed.status === "error" && (
          <p className="feed-status">
            We could not load the live feed right now. Please refresh, or <Link to="/contact">contact us</Link> directly.
          </p>
        )}

        {feed.status === "ready" && (
          <div className="blog-grid">
            {visibleItems.map((post, index) => (
              <article className="blog-card" data-reveal key={post.link} style={{ "--delay": `${index * 90}ms` }}>
                {/* {post.image && (
                  <div className="blog-card-image">
                    <img src={post.image} alt="" loading="lazy" />
                  </div>
                )} */}
                <span>{post.category}</span>
                <h2>{post.title}</h2>
                {post.excerpt && <p>{post.excerpt}</p>}
                <div className="blog-card-meta">
                  {post.source && <span>Source: {post.source}</span>}
                  <span>{formatFeedDate(post.date)}</span>
                </div>
                <div className="blog-card-links">
                  <a href={post.link} target="_blank" rel="noreferrer">
                    Read the full story <ExternalLink size={16} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
      <section className="newsletter-strip">
        <div data-reveal>
          <h2>Want us to write about one of these?</h2>
          <p>Tell us which story matters to your business and we will turn it into a real strategy conversation.</p>
        </div>
      </section>
    </>
  );
}

function ContactPage() {
  usePageTitle("Contact Us");
  return (
    <>
      <PageHero
        icon={Mail}
        kicker="Contact us"
        title="Tell us what you want to create next."
        text="Whether you need a brand, website, app, campaign, or AI system, Media Innovation can help turn the idea into a clear plan and a polished launch."
      />
      <Contact />
    </>
  );
}

function Services() {
  return (
    <section id="services" className="section">
      <div className="section-heading" data-reveal>
        <span className="section-kicker">What we do</span>
        <h2>Creative services with technical depth.</h2>
        <p>
          Media Innovation brings strategy, production, software, and automation into one clean
          operating system for your brand.
        </p>
      </div>
      <div className="service-grid">
        {services.map(({ icon: Icon, title, text }, index) => (
          <article className="service-card" data-reveal key={title} style={{ "--delay": `${index * 70}ms` }}>
            <div className="icon-shell">
              <Icon size={22} />
            </div>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Showcase() {
  return (
    <section id="work" className="showcase">
      <div className="showcase-inner">
        <div className="showcase-copy" data-reveal>
          <span className="section-kicker">Selected work</span>
          <h2>Real platforms we've built and launched.</h2>
          <p>
            The agency is built for companies that need more than design files. We shape the
            brand, build the digital product, and connect the systems that keep it growing.
          </p>
        </div>
        <div className="client-strip" data-reveal>
          {work.map(({ title, url }) => (
            <a key={title} href={url} target="_blank" rel="noreferrer">
              {title}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function AISection() {
  return (
    <section id="ai" className="ai-section">
      <div className="ai-grid">
        <div className="ai-panel" data-reveal>
          <span className="section-kicker">Agentic AI</span>
          <h2>AI agents that work inside the business.</h2>
          <p>
            We design assistants that answer customers, qualify leads, schedule appointments,
            summarize data, trigger automations, and help your team move faster.
          </p>
          <div className="check-list">
            {["Customer support agents", "Sales and lead routing", "Internal reporting assistants", "Content and campaign workflows"].map((item) => (
              <span key={item}>
                <Check size={16} /> {item}
              </span>
            ))}
          </div>
        </div>
        <div className="agent-orbit" data-reveal aria-hidden="true">
          <div className="core">AI</div>
          <span className="node n1">CRM</span>
          <span className="node n2">Web</span>
          <span className="node n3">Ads</span>
          <span className="node n4">Data</span>
          <span className="node n5">Ops</span>
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="process" className="section process-section">
      <div className="section-heading compact" data-reveal>
        <span className="section-kicker">How we move</span>
        <h2>A process designed for momentum.</h2>
      </div>
      <div className="process-track">
        {process.map((step, index) => (
          <div className="process-step" data-reveal key={step} style={{ "--delay": `${index * 80}ms` }}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{step}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

function HomeContact() {
  return (
    <section id="contact" className="contact">
      <div className="contact-copy" data-reveal>
        <span className="section-kicker">Let us build</span>
        <h2>Ready for a brand, platform, or AI system that feels ahead of the market?</h2>
        <p>Tell us what you want to create. Media Innovation can help shape it, build it, and launch it with confidence.</p>
      </div>
      <Link className="primary-button large" to="/contact">
        Contact Media Innovation <ArrowUpRight size={20} />
      </Link>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact contact-page">
      <div className="contact-form-panel" data-reveal>
        <span className="section-kicker">Project inquiry</span>
        <h2>Start with the business goal.</h2>
        <p>
          Share the outcome you want: more leads, a stronger brand, a new website, a custom app,
          smarter workflows, or an AI assistant for your team.
        </p>
        <div className="contact-methods">
          <a href="mailto:hello@mediainnovationstudio.com">
            <Mail size={18} /> hello@mediainnovationstudio.com
          </a>
          <a href="tel:+10000000000">
            <ArrowUpRight size={18} /> Schedule a discovery call
          </a>
        </div>
      </div>
      <div className="contact-brief" data-reveal>
        <span>Best for</span>
        <p>New brands, service businesses, creators, startups, organizations, and teams ready to modernize their digital presence.</p>
        <span>We can discuss</span>
        <p>Branding, websites, applications, content, paid ads, AI agents, automation, and long-term creative support.</p>
      </div>
    </section>
  );
}

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
