import { useParams, useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Users, BookOpen } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { getProject } from "@/data/projects";
import NotFound from "@/pages/not-found";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [, navigate] = useLocation();
  const project = getProject(slug ?? "");

  if (!project) return <NotFound />;

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  return (
    <div className="min-h-screen selection:bg-primary/30 selection:text-primary">
      <Navigation />

      <main className="pt-28 pb-24">
        <div className="max-w-4xl mx-auto px-6">
          {/* Back button */}
          <motion.button
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => navigate("/")}
            className="flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-primary transition-colors mb-12 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to projects
          </motion.button>

          {/* Header */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="mb-16"
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-4">
              {project.badge && (
                <Badge variant="outline" className="font-mono text-xs tracking-widest">
                  {project.badge}
                </Badge>
              )}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-primary hover:underline"
                >
                  <ExternalLink className="w-3 h-3" />
                  View live
                </a>
              )}
            </motion.div>

            <motion.p variants={fadeInUp} className="font-mono text-sm text-primary tracking-widest mb-2">
              {project.subtitle}
            </motion.p>

            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-serif font-bold text-foreground leading-tight mb-6">
              {project.title}
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground font-mono leading-relaxed max-w-2xl">
              {project.shortDesc}
            </motion.p>
          </motion.div>

          {/* Meta strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 p-6 bg-card/40 border border-primary/20"
          >
            {project.collaborators && (
              <div className="flex items-start gap-3">
                <Users className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-mono text-xs text-muted-foreground tracking-widest mb-1 uppercase">Team</p>
                  <p className="font-mono text-sm text-foreground">{project.collaborators.join(", ")}</p>
                </div>
              </div>
            )}
            {project.course && (
              <div className="flex items-start gap-3">
                <BookOpen className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-mono text-xs text-muted-foreground tracking-widest mb-1 uppercase">Course</p>
                  <p className="font-mono text-sm text-foreground">{project.course}</p>
                </div>
              </div>
            )}
            <div className="md:col-span-2">
              <p className="font-mono text-xs text-muted-foreground tracking-widest mb-2 uppercase">Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-mono px-2 py-1 bg-secondary text-secondary-foreground border border-secondary-foreground/20"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Stats highlights */}
          {project.highlights.length > 0 && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16"
            >
              {project.highlights.map((h, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="bg-card/40 border border-primary/15 hover:border-primary/40 transition-colors p-4 group"
                >
                  <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-1">{h.label}</p>
                  <p className="font-mono text-sm font-semibold text-primary">{h.value}</p>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Overview */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 bg-card/30 border border-border/50 p-8 relative group"
          >
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700" />
            <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Overview</h2>
            <p className="font-mono text-sm text-muted-foreground leading-relaxed">{project.overview}</p>
          </motion.div>

          {/* Sections */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="space-y-8"
          >
            {project.sections.map((section, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="border-l-2 border-primary/30 hover:border-primary transition-colors pl-6 py-2 group"
              >
                <h3 className="font-serif text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {section.heading}
                </h3>
                <p className="font-mono text-sm text-muted-foreground leading-relaxed">{section.body}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom nav */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-20 pt-8 border-t border-primary/10 flex justify-between items-center"
          >
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-primary transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              All projects
            </button>

            <button
              onClick={() => {
                navigate("/");
                setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 100);
              }}
              className="font-mono text-sm text-primary hover:underline"
            >
              Get in touch →
            </button>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
