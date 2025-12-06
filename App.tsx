import React, { useState, useRef } from 'react';
import { motion, useScroll, useSpring, useMotionValue, useTransform } from 'framer-motion';
import {
  Briefcase,
  GraduationCap,
  Mail,
  MapPin,
  Linkedin,
  Twitter,
  ArrowRight,
  ChevronDown,
  Sparkles,
  Cpu
} from 'lucide-react';

import { PROFILE, EXPERIENCE, EDUCATION, SKILLS } from './data';

// --- Components ---

const Card3D = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate position relative to center
    const mouseXFromCenter = e.clientX - rect.left - width / 2;
    const mouseYFromCenter = e.clientY - rect.top - height / 2;

    x.set(mouseXFromCenter / width);
    y.set(mouseYFromCenter / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1200,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative h-full w-full rounded-xl transition-all duration-200 ease-out"
      >
        <div style={{ transform: "translateZ(50px)" }} className="absolute inset-0">
             {/* Depth layer placeholder if needed */}
        </div>
        {children}
      </motion.div>
    </motion.div>
  );
};

const SpotlightCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-xl border border-surfaceHighlight bg-surface transition-colors duration-300 ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(251, 191, 36, 0.1), transparent 40%)`,
        }}
      />
      <div className="relative h-full">
        {children}
      </div>
    </div>
  );
};

const SectionHeader = ({ title, subtitle }: { title: string, subtitle: string }) => (
  <div className="mb-12">
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex items-center gap-3 text-accent font-mono text-sm tracking-wider uppercase mb-2"
    >
      <span className="w-8 h-[1px] bg-accent"></span>
      {subtitle}
    </motion.div>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="text-4xl md:text-5xl font-bold text-white"
    >
      {title}
    </motion.h2>
  </div>
);

// --- Main App ---

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-background text-zinc-300 selection:bg-accent selection:text-black font-sans">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent origin-left z-50"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-background/80 backdrop-blur-md border-b border-surfaceHighlight">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="font-bold text-xl tracking-tighter text-white">
            FL<span className="text-accent">.</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium">
            <a href="#about" className="hover:text-accent transition-colors">About</a>
            <a href="#experience" className="hover:text-accent transition-colors">Experience</a>
            <a href="#skills" className="hover:text-accent transition-colors">Skills</a>
          </div>
          <a 
            href={`mailto:${PROFILE.email}`}
            className="px-5 py-2 bg-surfaceHighlight hover:bg-accent hover:text-black transition-all rounded-full text-sm font-bold border border-zinc-700 hover:border-accent"
          >
            Get in Touch
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-screen pt-20 flex items-center justify-center overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6 border border-accent/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              Open to Opportunities
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.9] tracking-tight mb-8">
              Hello, I'm <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-200">
                {PROFILE.name}
              </span>.
            </h1>
            
            <p className="text-xl md:text-2xl text-zinc-400 max-w-lg mb-10 leading-relaxed">
              {PROFILE.role} with a focus on Web3, Community, and Technical Excellence.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#experience" className="group px-8 py-4 bg-white text-black font-bold rounded-lg flex items-center gap-2 hover:bg-zinc-200 transition-colors">
                View Work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <div className="flex gap-4 items-center px-4">
                <a href={`https://${PROFILE.linkedin}`} target="_blank" rel="noreferrer" className="p-3 bg-surfaceHighlight rounded-lg hover:text-accent hover:bg-zinc-800 transition-all">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href={`https://${PROFILE.twitter}`} target="_blank" rel="noreferrer" className="p-3 bg-surfaceHighlight rounded-lg hover:text-accent hover:bg-zinc-800 transition-all">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href={`mailto:${PROFILE.email}`} className="p-3 bg-surfaceHighlight rounded-lg hover:text-accent hover:bg-zinc-800 transition-all">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <Card3D className="relative z-10 w-full aspect-[4/5] max-h-[600px]">
              <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl shadow-black/50 border border-zinc-800">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 pointer-events-none" />
                <img 
                  src={PROFILE.avatarUrl} 
                  alt={PROFILE.name} 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute bottom-8 left-8 z-20 pointer-events-none">
                  <p className="text-accent font-mono text-sm mb-1">Based in</p>
                  <div className="flex items-center gap-2 text-white font-bold text-lg">
                    <MapPin className="w-5 h-5" />
                    {PROFILE.location}
                  </div>
                </div>
              </div>
            </Card3D>
            
            {/* Decorative Grid Behind */}
            <div className="absolute -z-10 top-10 right-10 w-full h-full border border-surfaceHighlight rounded-xl opacity-50 translate-x-4 translate-y-4" />
          </motion.div>
        </div>

        <motion.a 
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-zinc-500 animate-bounce"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.a>
      </header>

      {/* Stats Section */}
      <section className="py-20 border-y border-surfaceHighlight bg-surface/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Years Experience", value: "5+" },
              { label: "Communities Managed", value: "2+" },
              { label: "Technical Skills", value: "10+" },
              { label: "Languages", value: "2" },
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center md:text-left"
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm font-mono text-zinc-500 uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-16">
          <div className="md:col-span-5">
            <SectionHeader title="About Me" subtitle="Biography" />
          </div>
          <div className="md:col-span-7 space-y-6 text-lg text-zinc-400 leading-relaxed">
            <motion.p 
              initial={{ opacity: 0, y: 10 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
            >
              From early on, I’ve always wanted to explore different things and avoid staying still in a role that didn’t challenge me. I’ve always been curious, and learning new skills keeps me motivated.
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 10 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              About five years ago, I stepped into the crypto industry and its community, and it immediately felt like home. I was constantly learning, surrounded by people who shared the same mindset. With experience in Community Management and Customer Success, I’ve found deep fulfillment in helping people and guiding them through challenges.
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 10 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              I adapt quickly, learn fast, and give my best in any situation. I’m a finance enthusiast in the web3 space who loves music, anime, and animals. I'm humble, passionate, and driven to solve problems collaboratively.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-32 bg-surface/20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader title="Experience" subtitle="Career Path" />
          
          <div className="grid gap-8">
            {EXPERIENCE.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <SpotlightCard className="bg-surface p-8 md:p-10">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{exp.role}</h3>
                      <div className="flex items-center gap-2 text-accent">
                        <Briefcase className="w-4 h-4" />
                        <span className="font-medium">{exp.company}</span>
                      </div>
                    </div>
                    <div className="px-4 py-2 rounded-full bg-surfaceHighlight border border-zinc-700 text-xs font-mono text-zinc-400 whitespace-nowrap">
                      {exp.period}
                    </div>
                  </div>
                  
                  <p className="text-zinc-400 mb-8 max-w-3xl leading-relaxed">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill, sIdx) => (
                      <span key={sIdx} className="px-3 py-1 bg-zinc-950 rounded text-xs font-medium text-zinc-500 border border-zinc-800">
                        {skill}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills & Education */}
      <section id="skills" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            
            {/* Education Column */}
            <div>
              <SectionHeader title="Education" subtitle="Learning" />
              <div className="space-y-8">
                {EDUCATION.map((edu, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative pl-8 border-l border-surfaceHighlight"
                  >
                    <span className="absolute -left-[5px] top-0 w-[9px] h-[9px] rounded-full bg-accent"></span>
                    <h4 className="text-xl font-bold text-white mb-1">{edu.course}</h4>
                    <div className="flex items-center gap-2 text-zinc-500 text-sm mb-4">
                      <GraduationCap className="w-4 h-4" />
                      {edu.institution} • {edu.period}
                    </div>
                    <ul className="list-disc list-inside text-zinc-400 space-y-1">
                      {edu.details.map((detail, dIdx) => (
                        <li key={dIdx} className="text-sm">{detail}</li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Skills Column */}
            <div>
              <SectionHeader title="Skills" subtitle="Competencies" />
              <div className="grid grid-cols-2 gap-4">
                {SKILLS.map((skill, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="p-4 bg-surfaceHighlight/50 border border-surfaceHighlight rounded-lg hover:border-accent/50 transition-colors group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium group-hover:text-accent transition-colors">{skill.name}</span>
                      {skill.category === 'Tech' ? <Cpu className="w-4 h-4 text-zinc-600" /> : <Sparkles className="w-4 h-4 text-zinc-600" />}
                    </div>
                    <span className="text-xs text-zinc-600 uppercase tracking-wider">{skill.category}</span>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer className="py-20 border-t border-surfaceHighlight bg-zinc-950 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Ready to collaborate?</h2>
          <p className="text-zinc-400 mb-10">
            I'm currently looking for new opportunities in Community Management and Technical Support.
          </p>
          <a 
            href={`mailto:${PROFILE.email}`}
            className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-black font-bold rounded-full hover:bg-white transition-colors"
          >
            <Mail className="w-5 h-5" />
            Send me an email
          </a>

          <div className="mt-20 pt-10 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-zinc-600">
            <p>&copy; {new Date().getFullYear()} Filipe Lopes. All rights reserved.</p>
            <div className="flex gap-6">
              <a href={`https://${PROFILE.twitter}`} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">Twitter</a>
              <a href={`https://${PROFILE.linkedin}`} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}