import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { BootSequence } from '@/components/BootSequence';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { GlitchText } from '@/components/GlitchText';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Terminal, MapPin, GraduationCap, Cpu, Code2, Database, Brain, Network, Send, Target, Dumbbell, Linkedin, ExternalLink, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

let hasBooted = false;

function useContactForm() {
  const [isPending, setIsPending] = useState(false);
  const { toast } = useToast();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    setTimeout(() => {
      setIsPending(false);
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out — I'll get back to you soon.",
        variant: "default",
      });
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return { submit, isPending };
}

export default function Home() {
  const [booting, setBooting] = useState(!hasBooted);
  const { submit, isPending } = useContactForm();
  const [, navigate] = useLocation();

  if (booting) {
    return <BootSequence onComplete={() => { hasBooted = true; setBooting(false); }} />;
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
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
              className="relative hidden lg:flex justify-center"
            >
              <div className="w-96 h-96 relative glow-border rounded-full overflow-hidden group">
                <div className="absolute inset-0 bg-primary/10 z-20 mix-blend-overlay group-hover:bg-transparent transition-all duration-500" />
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-primary z-30" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-primary z-30" />
                
                <img 
                  src={`${import.meta.env.BASE_URL}images/profile-pic.jpg`} 
                  alt="Ionut Diaconu" 
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
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

        {/* CONTACT SECTION */}
        <section id="contact" className="py-24 relative border-t border-primary/10">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-12 border-b border-primary/20 pb-4 inline-block pr-12">
                <span className="text-primary font-mono text-lg mr-4">04.</span>
                Get in Touch
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-5 gap-12">
              <motion.div 
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
                className="md:col-span-2 space-y-8"
              >
                <p className="font-mono text-muted-foreground text-sm leading-relaxed">
                  Whether you have a job opportunity, want to collaborate on something, or just want to say hi — feel free to reach out. I'm always happy to chat.
                </p>
                
                <div className="space-y-4">
                  <a href="mailto:diaconu.ionut029@gmail.com" className="flex items-center gap-4 font-mono text-sm group hover:bg-primary/5 p-3 border border-transparent hover:border-primary/20 transition-all">
                    <div className="w-10 h-10 border border-primary/30 flex items-center justify-center text-primary group-hover:bg-primary/10">
                      <Send className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground tracking-widest">Email</span>
                      <span className="text-foreground group-hover:text-primary transition-colors">diaconu.ionut029@gmail.com</span>
                    </div>
                  </a>

                  <a href="https://www.linkedin.com/in/diaconu-ionut/" target="_blank" rel="noreferrer" className="flex items-center gap-4 font-mono text-sm group hover:bg-primary/5 p-3 border border-transparent hover:border-primary/20 transition-all">
                    <div className="w-10 h-10 border border-primary/30 flex items-center justify-center text-primary group-hover:bg-primary/10">
                      <Linkedin className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground tracking-widest">LinkedIn</span>
                      <span className="text-foreground group-hover:text-primary transition-colors">Ionut Diaconu</span>
                    </div>
                  </a>
                </div>
              </motion.div>

              <motion.div 
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
                className="md:col-span-3"
              >
                <form onSubmit={submit} className="space-y-6 bg-card/30 p-8 border border-primary/20">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-primary tracking-widest uppercase">Your Name</label>
                      <Input required placeholder="John Smith" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-primary tracking-widest uppercase">Your Email</label>
                      <Input required type="email" placeholder="john@example.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-primary tracking-widest uppercase">Message</label>
                    <Textarea required placeholder="What's on your mind?" />
                  </div>
                  <Button type="submit" variant="solid" className="w-full" disabled={isPending}>
                    {isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
