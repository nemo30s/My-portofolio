import React, { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { useLocation } from 'wouter';
import { BootSequence } from '@/components/BootSequence';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { GlitchText } from '@/components/GlitchText';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Terminal, MapPin, GraduationCap, Cpu, Code2, Database, Brain, Network, Send, Target, Dumbbell, ExternalLink, ArrowRight, Download, Briefcase, BookOpen, Calendar } from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa';

let hasBooted = false;

export default function Home() {
  const [booting, setBooting] = useState(!hasBooted);
  const [, navigate] = useLocation();

  if (booting) {
    return <BootSequence onComplete={() => { hasBooted = true; setBooting(false); }} />;
  }

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <div className="min-h-screen selection:bg-primary/30 selection:text-primary">
      <div className="scanline" />
      <div className="crt-overlay" />
      
      <Navigation />

      <main className="pt-24 pb-20">
        {/* HERO SECTION */}
        <section className="min-h-[90vh] flex items-center relative overflow-hidden" id="hero">
          <div className="absolute inset-0 flex items-center justify-center opacity-5">
            <div className="w-[80vw] h-[80vw] rounded-full border border-primary animate-[spin_60s_linear_infinite] border-dashed" />
            <div className="w-[60vw] h-[60vw] rounded-full border border-accent absolute animate-[spin_40s_linear_infinite_reverse] border-dashed" />
          </div>

          <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-8"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 border border-primary/30 bg-primary/5 text-primary text-xs font-mono tracking-widest">
                <Terminal className="w-3 h-3" />
                <span>Open to work</span>
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-foreground leading-tight">
                <GlitchText text="Ionut" />
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent italic opacity-90">
                  Diaconu
                </span>
              </motion.h1>

              <motion.div variants={fadeInUp} className="space-y-4">
                <p className="font-mono text-lg md:text-xl text-muted-foreground tracking-wide">
                  Applied CS Student · Builder · Open to opportunities
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Badge variant="outline" className="gap-1.5"><GraduationCap className="w-3 h-3 text-primary"/> Antwerp, Belgium</Badge>
                  <Badge variant="outline" className="gap-1.5"><MapPin className="w-3 h-3 text-primary"/> Romanian</Badge>
                  <Badge variant="outline" className="gap-1.5"><Target className="w-3 h-3 text-primary"/> Chess Player</Badge>
                  <Badge variant="outline" className="gap-1.5"><Dumbbell className="w-3 h-3 text-primary"/> Gym Enthusiast</Badge>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 pt-4">
                <Button variant="solid" size="lg" glitch onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
                  View Projects
                </Button>
                <Button variant="outline" size="lg" onClick={() => window.open('https://retallio.app', '_blank')} className="border-accent text-accent hover:bg-accent/10 hover:text-accent">
                  Retallio.app <span className="ml-2">↗</span>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative flex justify-center lg:justify-center"
            >
              <div className="w-48 h-48 lg:w-96 lg:h-96 relative glow-border rounded-full overflow-hidden group">
                <div className="absolute inset-0 bg-primary/10 z-20 mix-blend-overlay group-hover:bg-transparent transition-all duration-500" />
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-primary z-30" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-primary z-30" />
                
                <img 
                  src={`${import.meta.env.BASE_URL}images/profile-pic.jpg`} 
                  alt="Ionut Diaconu" 
                  className="w-full h-full object-cover transition-all duration-700"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="py-24 relative">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-12 border-b border-primary/20 pb-4 inline-block pr-12">
                <span className="text-primary font-mono text-lg mr-4">01.</span>
                About Me
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-start">
              <motion.div 
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
                className="font-mono text-muted-foreground space-y-6 leading-relaxed bg-card/50 p-8 border border-border/50 relative group"
              >
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700" />
                
                <p>
                  I'm a computer science student studying in Belgium. I love building things, from machine learning pipelines to full-stack web apps. I'm currently working on Retallio, a SaaS product I designed and built from scratch.
                </p>
                <p>
                  Outside of coding I play chess and go to the gym — both keep me sharp in different ways. I'm currently looking for a job where I can keep learning and contribute to something meaningful.
                </p>
                <p>
                  I'm comfortable across the stack, from training ML models to shipping production web apps. If you have an interesting opportunity, I'd love to hear about it.
                </p>
              </motion.div>

              <motion.div 
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
                className="grid grid-cols-2 gap-4"
              >
                {[
                  { label: "Status", value: "Student, open to work", icon: <Terminal className="w-5 h-5 text-primary mb-2" /> },
                  { label: "Location", value: "Antwerp, Belgium", icon: <MapPin className="w-5 h-5 text-primary mb-2" /> },
                  { label: "From", value: "Romania", icon: <Network className="w-5 h-5 text-primary mb-2" /> },
                  { label: "Interests", value: "Code, Chess, Gym", icon: <Brain className="w-5 h-5 text-primary mb-2" /> }
                ].map((stat, i) => (
                  <motion.div key={i} variants={fadeInUp}>
                    <Card className="bg-background/40 hover:bg-primary/5 transition-colors border-primary/20 p-6 flex flex-col justify-center min-h-[140px]">
                      {stat.icon}
                      <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1">{stat.label}</p>
                      <p className="text-sm font-semibold text-foreground font-mono">{stat.value}</p>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="py-24 relative bg-card/20">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 mix-blend-overlay pointer-events-none" style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/grid-bg.png)` }} />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-12 border-b border-primary/20 pb-4 inline-block pr-12">
                <span className="text-primary font-mono text-lg mr-4">02.</span>
                Projects
              </h2>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-12">
              {/* Featured Project */}
              <Card className="border-primary bg-background/80 lg:col-span-2">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="p-8 md:p-12 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-border/50 relative">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                      <Cpu className="w-32 h-32 text-primary" />
                    </div>
                    <Badge variant="live" className="w-max mb-4">Live · SaaS</Badge>
                    <h3 className="text-3xl font-serif font-bold text-foreground mb-4">Retallio</h3>
                    <p className="text-muted-foreground font-mono text-sm leading-relaxed mb-8">
                      A retainer management tool for freelancers. I built it because I couldn't find anything that gave both the freelancer and the client a clear, real-time view of hours used, upcoming invoices, and billing — so I made it myself.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {['Next.js', 'React', 'Tailwind', 'Framer Motion', 'Node.js', 'PostgreSQL', 'Stripe'].map(tech => (
                        <span key={tech} className="text-xs font-mono px-2 py-1 bg-secondary text-secondary-foreground border border-secondary-foreground/20">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <Button variant="solid" className="w-max gap-2" onClick={() => window.open('https://retallio.app', '_blank')}>
                      <ExternalLink className="w-4 h-4" />
                      Visit Retallio
                    </Button>
                  </div>
                  <div className="bg-secondary/20 p-8 flex items-center justify-center overflow-hidden relative group">
                    <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors z-10" />
                    <div className="w-full aspect-video bg-background border border-primary/30 rounded shadow-2xl relative flex items-center justify-center font-mono text-primary/50 text-sm overflow-hidden">
                       <div className="absolute inset-0 flex flex-col">
                         <div className="h-6 border-b border-primary/20 bg-background/80 flex items-center px-4 gap-2">
                           <div className="w-2 h-2 rounded-full bg-destructive/50" />
                           <div className="w-2 h-2 rounded-full bg-accent/50" />
                           <div className="w-2 h-2 rounded-full bg-primary/50" />
                         </div>
                         <div className="flex-1 p-4 bg-[linear-gradient(to_right,#00f0ff05_1px,transparent_1px),linear-gradient(to_bottom,#00f0ff05_1px,transparent_1px)] bg-[size:20px_20px]">
                           <span className="text-primary animate-pulse">&gt;_</span> retallio.app
                         </div>
                       </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Grid Projects */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {[
                {
                  title: "Web Traffic Analysis",
                  desc: "A personal project where I analyzed web traffic data from the Brussels open data portal and built interactive visualizations around it.",
                  tech: ["Python", "Pandas", "Matplotlib", "Jupyter"],
                  link: "https://nemo30s.github.io/web-traffic-analysis/",
                },
                {
                  title: "Credit Card Fraud Detection",
                  desc: "End-to-end ML lifecycle project — data prep, model training, evaluation, SHAP analysis, and FastAPI deployment. Tackled extreme class imbalance with SMOTE.",
                  tech: ["Python", "scikit-learn", "XGBoost", "SMOTE", "FastAPI"],
                  slug: "ml-lifecycle",
                },
                {
                  title: "Intel Image Classification",
                  desc: "Natural scene classification across 6 categories using ResNet50 transfer learning, a scratch-built CNN, and Grad-CAM visual explanations.",
                  tech: ["PyTorch", "ResNet50", "Grad-CAM", "TensorBoard"],
                  slug: "computer-vision",
                },
                {
                  title: "RL Agent Training",
                  desc: "Trained a DQN agent to solve MountainCar-v0 using custom reward shaping to overcome the sparse reward problem.",
                  tech: ["Python", "Stable Baselines3", "Gymnasium", "DQN"],
                  slug: "reinforcement-learning",
                },
                {
                  title: "Aspect-Based Sentiment Analysis",
                  desc: "Compared three ABSA approaches — lexicon, transformer, and LLM — behind a unified API to identify per-aspect sentiment in text.",
                  tech: ["spaCy", "HuggingFace", "Mistral 7B", "Ollama"],
                  slug: "sentiment-analysis",
                },
                {
                  title: "AI Meal Planning Agent",
                  desc: "Multi-agent system using Gemini that generates personalised weekly meal plans with live Belgian supermarket pricing and RAG-based recipe retrieval.",
                  tech: ["Gemini API", "FastAPI", "ChromaDB", "Docker", "Prometheus"],
                  slug: "ai-agents",
                },
                {
                  title: "SafetyNet",
                  desc: "An Arduino-based safety monitoring system — my first embedded systems project and where it all started.",
                  tech: ["Arduino", "C++", "Sensors"],
                },
              ].map((proj, i) => {
                const hasDetail = !!proj.slug;
                const hasLink = !!proj.link;
                const handleCardClick = () => {
                  if (hasDetail) navigate(`/projects/${proj.slug}`);
                  else if (hasLink) window.open(proj.link, "_blank");
                };
                const isClickable = hasDetail || hasLink;

                return (
                  <motion.div key={i} variants={fadeInUp}>
                    <Card
                      className={`h-full bg-background/50 hover:bg-background/80 flex flex-col transition-all ${isClickable ? "cursor-pointer hover:border-primary/50" : ""}`}
                      onClick={isClickable ? handleCardClick : undefined}
                    >
                      <CardHeader>
                        <div className="flex justify-between items-start mb-4">
                          <div className="w-10 h-10 bg-primary/10 flex items-center justify-center border border-primary/30">
                            <Code2 className="w-5 h-5 text-primary" />
                          </div>
                          {hasDetail && (
                            <span className="flex items-center gap-1 text-xs font-mono text-primary/60 hover:text-primary transition-colors">
                              Read more <ArrowRight className="w-3 h-3" />
                            </span>
                          )}
                          {hasLink && !hasDetail && (
                            <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors" />
                          )}
                        </div>
                        <CardTitle className={`text-xl transition-colors ${isClickable ? "group-hover:text-primary" : ""}`}>{proj.title}</CardTitle>
                        <CardDescription className="font-mono mt-2 min-h-[60px]">{proj.desc}</CardDescription>
                      </CardHeader>
                      <CardContent className="mt-auto pt-0 pb-6 px-6">
                        <div className="flex flex-wrap gap-2">
                          {proj.tech.map(t => (
                            <span key={t} className="text-[10px] font-mono text-primary/70 uppercase tracking-widest before:content-['#'] before:mr-0.5">{t}</span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="py-24 relative">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-12 border-b border-primary/20 pb-4 inline-block pr-12">
                <span className="text-primary font-mono text-lg mr-4">03.</span>
                Skills
              </h2>
            </motion.div>

            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {[
                { title: "Languages", icon: <Code2 />, skills: ["Python", "Java", "JavaScript", "TypeScript", "C/C++", "SQL"] },
                { title: "ML & AI", icon: <Brain />, skills: ["PyTorch", "TensorFlow", "scikit-learn", "HuggingFace", "Stable Baselines3", "OpenCV"] },
                { title: "Data & Analytics", icon: <Database />, skills: ["PySpark", "Power BI", "Pandas", "NumPy", "ETL Pipelines", "KPI Analysis"] },
                { title: "Backend & APIs", icon: <Network />, skills: ["Spring Boot", "FastAPI", "Node.js", "REST APIs", "PostgreSQL", "Redis"] },
                { title: "Web & Frontend", icon: <Terminal />, skills: ["React", "Next.js", "Tailwind CSS", "TypeScript"] },
                { title: "DevTools & Infra", icon: <Cpu />, skills: ["Docker", "Git", "Linux", "Jupyter", "TensorBoard", "Google Colab"] },
              ].map((category, i) => (
                <motion.div key={i} variants={fadeInUp}>
                  <Card className="bg-background/60 border-primary/20 hover:border-primary/50 transition-colors h-full">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="text-primary">{category.icon}</div>
                        <h3 className="font-mono text-sm font-bold tracking-widest text-foreground">{category.title}</h3>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {category.skills.map((skill, j) => (
                          <li key={j} className="flex items-center gap-2 font-mono text-sm text-muted-foreground group">
                            <span className="w-1.5 h-1.5 bg-primary/40 group-hover:bg-primary transition-colors" />
                            <span className="group-hover:text-foreground transition-colors">{skill}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* RESUME SECTION */}
        <section id="resume" className="py-24 relative border-t border-primary/10">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-12 border-b border-primary/20 pb-4 inline-block pr-12">
                <span className="text-primary font-mono text-lg mr-4">04.</span>
                Resume
              </h2>
            </motion.div>

            {/* Dossier header */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <div className="border border-primary/40 p-px mb-10 relative">
                <div className="border border-primary/10 bg-card/40 p-6 flex flex-col sm:flex-row justify-between items-start gap-4 relative overflow-hidden">
                  <div className="absolute -right-6 -top-6 text-primary/5 font-serif font-black text-[8rem] leading-none select-none pointer-events-none">✦</div>
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.3em] text-primary/50 uppercase mb-2">Personnel File — Classification: Open</p>
                    <p className="font-serif text-2xl font-bold text-foreground">Ionut Diaconu</p>
                    <p className="font-mono text-sm text-primary mt-1">Applied CS Student · Builder · Open to Work</p>
                  </div>
                  <div className="font-mono text-[10px] text-muted-foreground/60 space-y-1 text-right shrink-0">
                    <p>REF: ID-2026-ACS</p>
                    <p>LOCATION: Antwerp, BE</p>
                    <p>CLEARANCE: <span className="text-primary">FULL STACK</span></p>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="grid lg:grid-cols-5 gap-8">
              {/* Left column: Education + Languages */}
              <motion.div
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
                className="lg:col-span-2 space-y-6"
              >
                {/* Education */}
                <motion.div variants={fadeInUp} className="border border-primary/20 bg-background/40 p-6 relative group hover:border-primary/40 transition-colors">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700" />
                  <div className="flex items-center gap-2 mb-5">
                    <BookOpen className="w-4 h-4 text-primary" />
                    <span className="font-mono text-xs tracking-[0.25em] text-primary uppercase">Education</span>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className="font-mono text-sm font-semibold text-foreground leading-tight">Applied Computer Science</p>
                        <span className="font-mono text-[10px] text-muted-foreground shrink-0 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />2023 – 2026
                        </span>
                      </div>
                      <p className="font-mono text-xs text-primary/80">Karel de Grote University College</p>
                      <p className="font-mono text-xs text-muted-foreground mt-0.5">Antwerp, Belgium · Specialisation: Data & AI</p>
                    </div>
                  </div>
                </motion.div>

                {/* Languages */}
                <motion.div variants={fadeInUp} className="border border-primary/20 bg-background/40 p-6 relative group hover:border-primary/40 transition-colors">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700" />
                  <div className="flex items-center gap-2 mb-5">
                    <Network className="w-4 h-4 text-primary" />
                    <span className="font-mono text-xs tracking-[0.25em] text-primary uppercase">Languages</span>
                  </div>
                  <ul className="space-y-2">
                    {[
                      { lang: "Romanian", level: "Native" },
                      { lang: "English", level: "Fluent" },
                      { lang: "Dutch", level: "Intermediate" },
                      { lang: "French", level: "Basic" },
                    ].map(({ lang, level }) => (
                      <li key={lang} className="flex items-center justify-between font-mono text-sm">
                        <span className="text-foreground flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-primary/50" />
                          {lang}
                        </span>
                        <span className="text-muted-foreground text-xs">{level}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>

              {/* Right column: Experience */}
              <motion.div
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
                className="lg:col-span-3 space-y-6"
              >
                <motion.div variants={fadeInUp} className="border border-primary/20 bg-background/40 p-6 relative group hover:border-primary/40 transition-colors">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700" />
                  <div className="flex items-center gap-2 mb-6">
                    <Briefcase className="w-4 h-4 text-primary" />
                    <span className="font-mono text-xs tracking-[0.25em] text-primary uppercase">Experience</span>
                  </div>

                  <div className="space-y-8">
                    {/* Student job */}
                    <div className="relative pl-4 border-l border-primary/20">
                      <div className="absolute -left-[3px] top-1.5 w-1.5 h-1.5 bg-primary" />
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                        <div>
                          <p className="font-mono text-sm font-semibold text-foreground">AI Data Quality Analyst</p>
                          <p className="font-mono text-xs text-primary/80 mt-0.5">Brussels Startup · Student Job</p>
                        </div>
                        <span className="font-mono text-[10px] text-muted-foreground flex items-center gap-1 shrink-0">
                          <Calendar className="w-3 h-3" />2025 – Present
                        </span>
                      </div>
                      <p className="font-mono text-xs text-muted-foreground mt-2 leading-relaxed">
                        Reviewing and improving AI-generated outputs to ensure data quality and accuracy. Working alongside engineers to identify edge cases and improve model performance.
                      </p>
                    </div>

                    {/* Retallio */}
                    <div className="relative pl-4 border-l border-primary/20">
                      <div className="absolute -left-[3px] top-1.5 w-1.5 h-1.5 bg-accent" />
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                        <div>
                          <p className="font-mono text-sm font-semibold text-foreground">Founder & Builder — Retallio</p>
                          <p className="font-mono text-xs text-accent/80 mt-0.5">
                            <a href="https://retallio.app" target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
                              retallio.app <ExternalLink className="w-3 h-3 inline" />
                            </a>
                          </p>
                        </div>
                        <span className="font-mono text-[10px] text-muted-foreground flex items-center gap-1 shrink-0">
                          <Calendar className="w-3 h-3" />2024 – Present
                        </span>
                      </div>
                      <p className="font-mono text-xs text-muted-foreground mt-2 leading-relaxed">
                        Designed and built a retainer management SaaS for freelancers from scratch — full stack, solo. Next.js, React, PostgreSQL, Stripe, Tailwind.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Download CV */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="mt-10 flex justify-center"
            >
              <a href="/cv.pdf" target="_blank" rel="noreferrer">
                <Button variant="outline" size="lg" className="gap-2 border-primary/40 hover:border-primary font-mono tracking-widest text-xs">
                  <Download className="w-4 h-4" />
                  View CV (PDF)
                </Button>
              </a>
            </motion.div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-24 relative border-t border-primary/10">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-12 border-b border-primary/20 pb-4 inline-block pr-12">
                <span className="text-primary font-mono text-lg mr-4">05.</span>
                Get in Touch
              </h2>
            </motion.div>

            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="max-w-2xl"
            >
              <p className="font-mono text-muted-foreground text-sm leading-relaxed mb-10">
                Whether you have a job opportunity, want to collaborate, or just want to say hi — pick a channel and reach out. I'm always happy to chat.
              </p>
            </motion.div>

            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl"
            >
              {[
                {
                  label: "Email",
                  value: "diaconu.ionut029@gmail.com",
                  href: "mailto:diaconu.ionut029@gmail.com",
                  icon: <Send className="w-5 h-5" />,
                  external: false,
                },
                {
                  label: "LinkedIn",
                  value: "/in/diaconu-ionut",
                  href: "https://www.linkedin.com/in/diaconu-ionut/",
                  icon: <FaLinkedin className="w-5 h-5" />,
                  external: true,
                },
                {
                  label: "Retallio",
                  value: "retallio.app",
                  href: "https://retallio.app",
                  icon: <ExternalLink className="w-5 h-5" />,
                  external: true,
                },
              ].map(({ label, value, href, icon, external }) => (
                <motion.a
                  key={label}
                  variants={fadeInUp}
                  href={href}
                  {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="flex flex-col gap-3 p-6 border border-primary/20 bg-background/40 hover:bg-primary/5 hover:border-primary/50 transition-all group"
                >
                  <div className="w-10 h-10 border border-primary/30 flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors">
                    {icon}
                  </div>
                  <div>
                    <p className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase mb-1">{label}</p>
                    <p className="font-mono text-sm text-foreground group-hover:text-primary transition-colors break-all">{value}</p>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
