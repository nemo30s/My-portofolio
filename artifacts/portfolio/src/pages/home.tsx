import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BootSequence } from '@/components/BootSequence';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { GlitchText } from '@/components/GlitchText';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Terminal, MapPin, GraduationCap, Cpu, Code2, Database, Brain, Network, Send, Target, Dumbbell } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Dummy form state hook simulation since we have no backend
function useContactForm() {
  const [isPending, setIsPending] = useState(false);
  const { toast } = useToast();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    setTimeout(() => {
      setIsPending(false);
      toast({
        title: "Message Encrypted & Sent",
        description: "Your transmission has been securely routed to Ionut.",
        variant: "default",
      });
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return { submit, isPending };
}

export default function Home() {
  const [booting, setBooting] = useState(true);
  const { submit, isPending } = useContactForm();

  if (booting) {
    return <BootSequence onComplete={() => setBooting(false)} />;
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
                <span>USER_AUTH_ACCEPTED</span>
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-foreground leading-tight">
                <GlitchText text="Ionut" />
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent italic opacity-90">
                  Alexandru
                </span>
              </motion.h1>

              <motion.div variants={fadeInUp} className="space-y-4">
                <p className="font-mono text-lg md:text-xl text-muted-foreground tracking-wide">
                  &gt; Applied CS Student · Freelancer · Builder
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Badge variant="outline" className="gap-1.5"><GraduationCap className="w-3 h-3 text-primary"/> ULB Belgium</Badge>
                  <Badge variant="outline" className="gap-1.5"><MapPin className="w-3 h-3 text-primary"/> Romanian</Badge>
                  <Badge variant="outline" className="gap-1.5"><Target className="w-3 h-3 text-primary"/> Chess Player</Badge>
                  <Badge variant="outline" className="gap-1.5"><Dumbbell className="w-3 h-3 text-primary"/> Gym Enthusiast</Badge>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 pt-4">
                <Button variant="solid" size="lg" glitch onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
                  ACCESS_PROJECTS
                </Button>
                <Button variant="outline" size="lg" onClick={() => window.open('https://retallio.app', '_blank')} className="border-accent text-accent hover:bg-accent/10 hover:text-accent">
                  RETALLIO.APP <span className="ml-2">↗</span>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative hidden lg:flex justify-center"
            >
              <div className="w-80 h-80 relative glow-border rounded-lg overflow-hidden group">
                {/* Techy overlay elements */}
                <div className="absolute inset-0 bg-primary/10 z-20 mix-blend-overlay group-hover:bg-transparent transition-all duration-500" />
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-primary z-30" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-primary z-30" />
                <div className="absolute top-4 right-4 bg-background/80 text-primary text-[10px] font-mono px-2 py-1 z-30 border border-primary/30 backdrop-blur-sm">
                  REC // 00:00:00
                </div>
                
                <img 
                  src={`${import.meta.env.BASE_URL}images/profile-placeholder.png`} 
                  alt="Ionut Silhouette" 
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
                SYSTEM_IDENTITY
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-start">
              <motion.div 
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
                className="font-mono text-muted-foreground space-y-6 leading-relaxed bg-card/50 p-8 border border-border/50 relative group"
              >
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700" />
                
                <p>
                  <span className="text-primary font-bold">Initialize Bio_</span><br/>
                  I am a Romanian computer science student currently embedded in the academic frameworks of Belgium at ULB. My focus lies at the intersection of applied software engineering, machine learning, and building robust web applications.
                </p>
                <p>
                  Beyond the terminal, I optimize my mental and physical algorithms. Chess provides the strategic foresight required for complex system architecture, while the gym ensures hardware maintenance.
                </p>
                <p>
                  Currently open for interesting collaborations, freelance contracts, and challenging builds that push the boundaries of what's possible.
                </p>
              </motion.div>

              <motion.div 
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
                className="grid grid-cols-2 gap-4"
              >
                {[
                  { label: "Status", value: "Student & Freelancer", icon: <Terminal className="w-5 h-5 text-primary mb-2" /> },
                  { label: "Location", value: "Brussels, Belgium", icon: <MapPin className="w-5 h-5 text-primary mb-2" /> },
                  { label: "Origin", value: "Romania", icon: <Network className="w-5 h-5 text-primary mb-2" /> },
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
                EXECUTABLE_ARCHIVES
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
                    <Badge variant="live" className="w-max mb-4">LIVE · SaaS</Badge>
                    <h3 className="text-3xl font-serif font-bold text-foreground mb-4">Retallio</h3>
                    <p className="text-muted-foreground font-mono text-sm leading-relaxed mb-8">
                      Retainer management SaaS tailored for freelancers. Features real-time hours tracking, projected invoice calculations, and a comprehensive billing dashboard to streamline client management.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {['Next.js', 'React', 'Tailwind', 'Framer Motion', 'Node.js', 'PostgreSQL', 'Stripe'].map(tech => (
                        <span key={tech} className="text-xs font-mono px-2 py-1 bg-secondary text-secondary-foreground border border-secondary-foreground/20">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <Button variant="solid" className="w-max gap-2" onClick={() => window.open('https://retallio.app', '_blank')}>
                      <Network className="w-4 h-4" />
                      INITIATE_CONNECTION
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
                           <span className="text-primary animate-pulse">&gt;_</span> compiling dashboard.tsx...
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
                  title: "Brussels Open Data",
                  desc: "Personal project analyzing Brussels city open data with visualizations.",
                  tech: ["Python", "Pandas", "Matplotlib", "Jupyter"],
                  link: "https://github.com/Ionut-Alexandru/brussels-analysis"
                },
                {
                  title: "ML Full Lifecycle",
                  desc: "Academic project covering the end-to-end pipeline of machine learning models.",
                  tech: ["Python", "scikit-learn", "Docker", "MLflow"],
                },
                {
                  title: "Computer Vision Net",
                  desc: "Academic CV project implementing custom neural networks for image classification.",
                  tech: ["PyTorch", "OpenCV", "NumPy"],
                },
                {
                  title: "RL Agent Training",
                  desc: "Academic reinforcement learning project training agents in simulated environments.",
                  tech: ["Python", "Gymnasium", "TensorFlow"],
                },
                {
                  title: "Sentiment Analysis",
                  desc: "Academic NLP project performing text classification on large datasets.",
                  tech: ["NLTK", "Transformers", "Python"],
                },
                {
                  title: "SafetyNet Embedded",
                  desc: "Academic IoT project building embedded systems for environmental monitoring.",
                  tech: ["Arduino", "C++", "Sensors", "Serial"],
                }
              ].map((proj, i) => (
                <motion.div key={i} variants={fadeInUp}>
                  <Card className="h-full bg-background/50 hover:bg-background/80 flex flex-col">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 bg-primary/10 flex items-center justify-center border border-primary/30">
                          <Code2 className="w-5 h-5 text-primary" />
                        </div>
                        {proj.link && (
                          <a href={proj.link} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                            <span className="sr-only">GitHub</span>
                            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"></path></svg>
                          </a>
                        )}
                      </div>
                      <CardTitle className="text-xl hover:text-primary transition-colors cursor-pointer">{proj.title}</CardTitle>
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
              ))}
            </motion.div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="py-24 relative">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-12 border-b border-primary/20 pb-4 inline-block pr-12">
                <span className="text-primary font-mono text-lg mr-4">03.</span>
                CAPABILITY_MATRIX
              </h2>
            </motion.div>

            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {[
                { title: "LANGUAGES", icon: <Code2 />, skills: ["Python", "JavaScript", "TypeScript", "C/C++"] },
                { title: "ML / AI", icon: <Brain />, skills: ["TensorFlow", "PyTorch", "scikit-learn", "OpenCV"] },
                { title: "WEB DEV", icon: <Network />, skills: ["Next.js", "React", "Node.js", "Tailwind", "PostgreSQL"] },
                { title: "TOOLS", icon: <Database />, skills: ["Git", "Docker", "Linux", "Arduino"] }
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
                ESTABLISH_UPLINK
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-5 gap-12">
              <motion.div 
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
                className="md:col-span-2 space-y-8"
              >
                <p className="font-mono text-muted-foreground text-sm leading-relaxed">
                  Looking to build a highly optimized system, train a custom model, or need a robust full-stack solution? The network is open. Transmit your coordinates and objective below.
                </p>
                
                <div className="space-y-4">
                  <a href="mailto:hello@example.com" className="flex items-center gap-4 font-mono text-sm group hover:bg-primary/5 p-3 border border-transparent hover:border-primary/20 transition-all">
                    <div className="w-10 h-10 border border-primary/30 flex items-center justify-center text-primary group-hover:bg-primary/10">
                      <Send className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground tracking-widest">PROTOCOL: SMTP</span>
                      <span className="text-foreground group-hover:text-primary transition-colors">hello@ionut.sys</span>
                    </div>
                  </a>

                  <a href="https://github.com/Ionut-Alexandru" target="_blank" rel="noreferrer" className="flex items-center gap-4 font-mono text-sm group hover:bg-primary/5 p-3 border border-transparent hover:border-primary/20 transition-all">
                    <div className="w-10 h-10 border border-primary/30 flex items-center justify-center text-primary group-hover:bg-primary/10">
                      <Terminal className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground tracking-widest">PROTOCOL: GITHUB</span>
                      <span className="text-foreground group-hover:text-primary transition-colors">Ionut-Alexandru</span>
                    </div>
                  </a>
                  
                  <a href="#" className="flex items-center gap-4 font-mono text-sm group hover:bg-primary/5 p-3 border border-transparent hover:border-primary/20 transition-all">
                    <div className="w-10 h-10 border border-primary/30 flex items-center justify-center text-primary group-hover:bg-primary/10">
                      <Network className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground tracking-widest">PROTOCOL: LINKEDIN</span>
                      <span className="text-foreground group-hover:text-primary transition-colors">/in/ionut-alexandru</span>
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
                      <label className="text-xs font-mono text-primary tracking-widest uppercase">Target_Alias</label>
                      <Input required placeholder="Enter Name" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-primary tracking-widest uppercase">Return_Address</label>
                      <Input required type="email" placeholder="Enter Email" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-primary tracking-widest uppercase">Payload_Data</label>
                    <Textarea required placeholder="Enter transmission..." />
                  </div>
                  <Button type="submit" variant="solid" className="w-full" disabled={isPending}>
                    {isPending ? "ENCRYPTING..." : "TRANSMIT_PAYLOAD"}
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
