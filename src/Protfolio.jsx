import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoveredProject, setHoveredProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -50]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with advanced filtering, payment integration, and real-time inventory management.",
      technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe", "Redis"],
      githubLink: "#",
      liveLink: "#",
      featured: true,
      color: "from-blue-500 to-purple-600"
    },
    {
      title: "Social Media Dashboard",
      description: "Analytics dashboard for social media management with data visualization and automated reporting features.",
      technologies: ["Angular", "NestJS", "TypeScript", "PostgreSQL", "Chart.js"],
      githubLink: "#",
      liveLink: "#",
      color: "from-green-500 to-blue-600"
    },
    {
      title: "Real-time Chat App",
      description: "Modern chat application with real-time messaging, file sharing, and video calling capabilities.",
      technologies: ["React", "Socket.io", "Node.js", "WebRTC", "MongoDB"],
      githubLink: "#",
      liveLink: "#",
      color: "from-purple-500 to-pink-600"
    },
    {
      title: "Task Management Tool",
      description: "Collaborative project management platform with kanban boards, time tracking, and team analytics.",
      technologies: ["Next.js", "Prisma", "PostgreSQL", "Tailwind CSS", "Framer Motion"],
      githubLink: "#",
      liveLink: "#",
      color: "from-orange-500 to-red-600"
    }
  ];

  const skills = [
    { name: "React", level: 95, color: "text-blue-400", category: "Frontend" },
    { name: "Node.js", level: 90, color: "text-green-500", category: "Backend" },
    { name: "TypeScript", level: 85, color: "text-blue-600", category: "Language" },
    { name: "Angular", level: 80, color: "text-red-500", category: "Frontend" },
    { name: "Next.js", level: 88, color: "text-gray-800 dark:text-gray-100", category: "Framework" },
    { name: "Tailwind CSS", level: 95, color: "text-cyan-400", category: "Styling" },
    { name: "Express", level: 85, color: "text-gray-800 dark:text-gray-100", category: "Backend" },
    { name: "MongoDB", level: 82, color: "text-green-600", category: "Database" },
    { name: "PostgreSQL", level: 78, color: "text-blue-500", category: "Database" },
    { name: "Docker", level: 75, color: "text-blue-400", category: "DevOps" },
    { name: "AWS", level: 70, color: "text-orange-500", category: "Cloud" },
    { name: "GraphQL", level: 72, color: "text-pink-500", category: "API" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.h2
            className={`mt-4 text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Loading Portfolio...
          </motion.h2>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`font-sans min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800'}`}>
      {/* Custom Cursor Effect */}
      <motion.div
        className={`hidden lg:block fixed w-4 h-4 rounded-full pointer-events-none z-50 mix-blend-difference ${isDarkMode ? 'bg-white' : 'bg-indigo-600'}`}
        animate={{
          x: cursorPosition.x - 8,
          y: cursorPosition.y - 8,
          scale: hoveredProject !== null ? 2 : 1
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 400 }}
      />

      {/* Navigation */}
      <motion.nav 
        className={`fixed w-full z-50 transition-all duration-300 ${window.scrollY > 10 ? (isDarkMode ? 'bg-gray-800/95 backdrop-blur-md shadow-lg' : 'bg-white/95 backdrop-blur-md shadow-sm') : 'bg-transparent'}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <motion.div 
            className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            Rakib<span className={isDarkMode ? 'text-gray-100' : 'text-gray-800'}>Dev</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {['home', 'about', 'skills', 'projects', 'contact'].map((item, index) => (
              <motion.button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`capitalize relative group ${activeSection === item ? 'text-indigo-500 font-medium' : isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item}
                <motion.span 
                  className="absolute -bottom-1 left-0 h-0.5 bg-indigo-500"
                  initial={{ width: activeSection === item ? "100%" : "0%" }}
                  animate={{ width: activeSection === item ? "100%" : "0%" }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}
            
            <motion.button 
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'}`}
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center space-x-4">
            <motion.button 
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </motion.button>
            
            <motion.button 
              className="focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.9 }}
            >
              <div className="w-6 flex flex-col space-y-1.5">
                <motion.span 
                  className={`h-0.5 w-full ${isDarkMode ? 'bg-gray-100' : 'bg-gray-800'}`}
                  animate={{
                    rotate: isMenuOpen ? 45 : 0,
                    y: isMenuOpen ? 6 : 0
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span 
                  className={`h-0.5 w-full ${isDarkMode ? 'bg-gray-100' : 'bg-gray-800'}`}
                  animate={{
                    opacity: isMenuOpen ? 0 : 1
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span 
                  className={`h-0.5 w-full ${isDarkMode ? 'bg-gray-100' : 'bg-gray-800'}`}
                  animate={{
                    rotate: isMenuOpen ? -45 : 0,
                    y: isMenuOpen ? -6 : 0
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className={`md:hidden overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}
            >
              <motion.div 
                className="container mx-auto px-4 py-4 flex flex-col space-y-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
                  <motion.button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`capitalize text-left py-2 px-2 rounded-md transition-colors ${activeSection === item ? 
                      'bg-indigo-500 text-white' : 
                      isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
                    variants={itemVariants}
                    whileHover={{ x: 10 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item}
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4 container mx-auto overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center">
          <motion.div 
            className="lg:w-1/2 mb-10 lg:mb-0"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.p 
              className={`text-lg mb-2 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Hello, I'm
            </motion.p>
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 leading-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
            >
              <motion.span 
                className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent"
                animate={{ 
                  backgroundImage: [
                    "linear-gradient(45deg, #6366f1, #8b5cf6)",
                    "linear-gradient(45deg, #8b5cf6, #ec4899)",
                    "linear-gradient(45deg, #ec4899, #6366f1)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Rakib Hossain
              </motion.span>
            </motion.h1>
            <motion.h2 
              className={`text-2xl md:text-3xl lg:text-4xl mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Full Stack Developer
            </motion.h2>
            <motion.p 
              className={`mb-8 max-w-lg text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              I craft exceptional digital experiences with modern web technologies. 
              Passionate about building efficient, scalable applications with beautiful interfaces.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <motion.button 
                onClick={() => scrollToSection('projects')}
                className="relative px-8 py-4 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white overflow-hidden group text-lg font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <motion.span 
                  className="relative z-10"
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                >
                  View Projects →
                </motion.span>
                <motion.span 
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-700"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
              <motion.button 
                onClick={() => scrollToSection('contact')}
                className={`px-8 py-4 rounded-lg border-2 ${isDarkMode ? 'border-gray-600 hover:bg-gray-800 text-white' : 'border-indigo-500 hover:bg-indigo-50 text-indigo-600'} transition-all text-lg font-medium`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Me
              </motion.button>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2 flex justify-center relative"
            style={{ y: y1 }}
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96 lg:w-[400px] lg:h-[400px]">
              {[...Array(3)].map((_, i) => (
                <motion.div 
                  key={i}
                  className={`absolute inset-${i * 4} rounded-full border-4 border-transparent opacity-${20 + i * 10}`}
                  style={{
                    borderLeftColor: i === 0 ? '#6366f1' : i === 1 ? '#8b5cf6' : '#ec4899'
                  }}
                  animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                  transition={{ 
                    duration: 20 + i * 10, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                />
              ))}
              <motion.div 
                className="relative w-full h-full flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div 
                  className={`w-64 h-64 md:w-80 md:h-80 rounded-full flex items-center justify-center shadow-2xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
                  whileHover={{ 
                    boxShadow: isDarkMode 
                      ? "0 25px 50px -12px rgba(99, 102, 241, 0.25)" 
                      : "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                  }}
                >
                  <div className="relative w-[calc(100%-32px)] h-[calc(100%-32px)] rounded-full overflow-hidden">
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-5xl md:text-6xl font-bold"
                      animate={{
                        background: [
                          "linear-gradient(45deg, #6366f1, #8b5cf6)",
                          "linear-gradient(135deg, #8b5cf6, #ec4899)",
                          "linear-gradient(225deg, #ec4899, #6366f1)",
                          "linear-gradient(315deg, #6366f1, #8b5cf6)"
                        ]
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      RH
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-20 px-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              About <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">Me</span>
            </h2>
            <motion.div 
              className="w-24 h-1 mx-auto bg-gradient-to-r from-indigo-500 to-purple-600 mb-6"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
            <p className={`max-w-2xl mx-auto text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Passionate developer crafting digital experiences with modern technologies
            </p>
          </motion.div>
          
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              className="lg:w-1/3 flex justify-center"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ y: y2 }}
            >
              <motion.div 
                className="relative group"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div 
                  className={`w-72 h-72 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-xl relative z-10 ${isDarkMode ? 'ring-2 ring-indigo-500' : ''}`}
                  whileHover={{ 
                    boxShadow: "0 25px 50px -12px rgba(99, 102, 241, 0.25)" 
                  }}
                >
                  <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-6xl font-bold">
                    👨‍💻
                  </div>
                </motion.div>
                <motion.div 
                  className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 opacity-20 group-hover:opacity-30 transition-opacity duration-300 -z-10 blur-xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.2, 0.3, 0.2]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="lg:w-2/3"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.h3 
                className="text-3xl font-semibold mb-6"
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.2 }}
              >
                Who am I?
              </motion.h3>
              <motion.p 
                className={`mb-4 text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.3 }}
              >
                I'm Rakib Hossain, a passionate Full Stack Developer with expertise in modern web technologies. 
                I specialize in building scalable applications using React, Node.js, and cutting-edge frameworks.
              </motion.p>
              <motion.p 
                className={`mb-8 text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.4 }}
              >
                With 3+ years of experience, I've worked on diverse projects from e-commerce platforms 
                to real-time applications, always focusing on performance, user experience, and clean code.
              </motion.p>
              
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8"
                variants={containerVariants}
                whileInView="visible"
                initial="hidden"
                viewport={{ once: true }}
              >
                {[
                  { label: "Name", value: "Rakib Hossain" },
                  { label: "Email", value: "rakib@example.com" },
                  { label: "Education", value: "BSc in CSE" },
                  { label: "Experience", value: "3+ Years" }
                ].map((item, index) => (
                  <motion.div 
                    key={item.label}
                    className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} transform transition-all hover:scale-105`}
                    variants={itemVariants}
                    whileHover={{ 
                      boxShadow: isDarkMode 
                        ? "0 10px 25px -5px rgba(99, 102, 241, 0.2)" 
                        : "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                    }}
                  >
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">{item.label}:</h4>
                    <p className="text-gray-600 dark:text-gray-300">{item.value}</p>
                  </motion.div>
                ))}
              </motion.div>
              
              <motion.button 
                className="flex items-center text-indigo-500 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors text-lg font-medium"
                onClick={() => scrollToSection('contact')}
                whileHover={{ x: 10 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="mr-2">Let's Connect</span>
                <motion.svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </motion.svg>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={`py-20 px-4 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              My <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">Skills</span>
            </h2>
            <motion.div 
              className="w-24 h-1 mx-auto bg-gradient-to-r from-indigo-500 to-purple-600 mb-6"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
            <p className={`max-w-2xl mx-auto text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Technologies and tools I work with to bring ideas to life
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            whileInView="visible"
            initial="hidden"
            viewport={{ once: true }}
          >
            {skills.map((skill, index) => (
              <motion.div 
                key={skill.name}
                className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} shadow-sm hover:shadow-lg transition-all relative overflow-hidden group`}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  boxShadow: isDarkMode 
                    ? "0 20px 25px -5px rgba(99, 102, 241, 0.2)" 
                    : "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
                }}
                onHoverStart={() => setHoveredProject(index)}
                onHoverEnd={() => setHoveredProject(null)}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="relative z-10">
                  <motion.div 
                    className={`text-4xl mb-4 ${skill.color} text-center`}
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                  >
                    {skill.name.includes('React') && '⚛️'}
                    {skill.name.includes('Node') && '🟢'}
                    {skill.name.includes('TypeScript') && '🔵'}
                    {skill.name.includes('Angular') && '🔴'}
                    {skill.name.includes('Next') && '⚫'}
                    {skill.name.includes('Tailwind') && '🌊'}
                    {skill.name.includes('Express') && '🚂'}
                    {skill.name.includes('MongoDB') && '🍃'}
                    {skill.name.includes('PostgreSQL') && '🐘'}
                    {skill.name.includes('Docker') && '🐳'}
                    {skill.name.includes('AWS') && '☁️'}
                    {skill.name.includes('GraphQL') && '📊'}
                  </motion.div>
                  <h3 className="text-center font-semibold mb-3 text-lg">{skill.name}</h3>
                  <div className={`w-full h-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} mb-2`}>
                    <motion.div 
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-600"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">{skill.category}</span>
                    <span className="text-sm font-medium text-indigo-500">{skill.level}%</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={`py-20 px-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Featured <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">Projects</span>
            </h2>
            <motion.div 
              className="w-24 h-1 mx-auto bg-gradient-to-r from-indigo-500 to-purple-600 mb-6"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
            <p className={`max-w-2xl mx-auto text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Showcasing my recent work and the technologies I've mastered
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            variants={containerVariants}
            whileInView="visible"
            initial="hidden"
            viewport={{ once: true }}
          >
            {projects.map((project, index) => (
              <motion.div 
                key={project.title}
                className={`rounded-2xl overflow-hidden ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} shadow-lg hover:shadow-2xl transition-all group relative`}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.02,
                  rotateY: 2,
                  z: 50
                }}
                onHoverStart={() => setHoveredProject(index)}
                onHoverEnd={() => setHoveredProject(null)}
              >
                <div className="relative h-64 overflow-hidden">
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-br ${project.color} flex items-center justify-center relative`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-black/20"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="text-white text-xl font-semibold z-10">Project Preview</span>
                    <motion.div
                      className="absolute top-4 right-4 w-3 h-3 bg-white rounded-full"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                  {project.featured && (
                    <motion.div 
                      className="absolute top-4 left-4 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10"
                      animate={{ 
                        boxShadow: [
                          "0 0 0 0 rgba(234, 179, 8, 0.7)",
                          "0 0 0 10px rgba(234, 179, 8, 0)",
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Featured
                    </motion.div>
                  )}
                </div>
                <div className="p-6">
                  <motion.h3 
                    className="text-xl font-semibold mb-3"
                    whileHover={{ color: "#6366f1" }}
                  >
                    {project.title}
                  </motion.h3>
                  <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {project.description}
                  </p>
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Technologies:</h4>
                    <motion.div 
                      className="flex flex-wrap gap-2"
                      variants={containerVariants}
                      whileInView="visible"
                      initial="hidden"
                    >
                      {project.technologies.map((tech, techIndex) => (
                        <motion.span 
                          key={tech} 
                          className={`text-xs px-3 py-1 rounded-full ${isDarkMode ? 'bg-gray-600 text-gray-200' : 'bg-indigo-100 text-indigo-800'} font-medium`}
                          variants={itemVariants}
                          whileHover={{ 
                            scale: 1.1,
                            backgroundColor: isDarkMode ? "#4f46e5" : "#6366f1",
                            color: "#ffffff"
                          }}
                          transition={{ delay: techIndex * 0.05 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </motion.div>
                  </div>
                  <div className="flex space-x-4">
                    <motion.a 
                      href={project.githubLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`flex items-center ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} font-medium`}
                      whileHover={{ x: 5, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="mr-2">📱</span> Code
                    </motion.a>
                    <motion.a 
                      href={project.liveLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`flex items-center ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} font-medium`}
                      whileHover={{ x: 5, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="mr-2">🚀</span> Live Demo
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-20 px-4 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Get In <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">Touch</span>
            </h2>
            <motion.div 
              className="w-24 h-1 mx-auto bg-gradient-to-r from-indigo-500 to-purple-600 mb-6"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
            <p className={`max-w-2xl mx-auto text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Ready to start your next project? Let's create something amazing together!
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className={`p-8 rounded-2xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                <h3 className="text-2xl font-semibold mb-8">Contact Information</h3>
                
                <motion.div 
                  className="space-y-6"
                  variants={containerVariants}
                  whileInView="visible"
                  initial="hidden"
                >
                  {[
                    { icon: '📧', label: 'Email', value: 'rakib@example.com' },
                    { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/rakib-hossain' },
                    { icon: '💻', label: 'GitHub', value: 'github.com/rakib-hossain' },
                    { icon: '🐦', label: 'Twitter', value: 'twitter.com/rakib_dev' }
                  ].map((contact, index) => (
                    <motion.div 
                      key={contact.label}
                      className="flex items-start group cursor-pointer"
                      variants={itemVariants}
                      whileHover={{ x: 10 }}
                    >
                      <motion.div 
                        className={`p-3 rounded-full mr-4 ${isDarkMode ? 'bg-gray-700 group-hover:bg-indigo-600' : 'bg-indigo-100 group-hover:bg-indigo-200'} transition-colors`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <span className="text-2xl">{contact.icon}</span>
                      </motion.div>
                      <div>
                        <h4 className={`font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{contact.label}</h4>
                        <p className={`${isDarkMode ? 'text-gray-200' : 'text-gray-800'} group-hover:text-indigo-500 transition-colors`}>
                          {contact.value}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                <div className="mt-12">
                  <h3 className="text-xl font-semibold mb-6">Let's Connect</h3>
                  <motion.div 
                    className="flex space-x-4"
                    variants={containerVariants}
                    whileInView="visible"
                    initial="hidden"
                  >
                    {['💼', '💻', '🐦', '📧'].map((icon, index) => (
                      <motion.a 
                        key={index}
                        href="#" 
                        className={`p-4 rounded-full ${isDarkMode ? 'bg-gray-700 hover:bg-indigo-600' : 'bg-gray-100 hover:bg-indigo-500'} transition-all group text-2xl`}
                        variants={itemVariants}
                        whileHover={{ 
                          scale: 1.2, 
                          rotate: 360,
                          boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.4)"
                        }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <span className="group-hover:text-white transition-colors">{icon}</span>
                      </motion.a>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className={`p-8 rounded-2xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                <h3 className="text-2xl font-semibold mb-8">Send Me a Message</h3>
                <motion.form 
                  className="space-y-6"
                  variants={containerVariants}
                  whileInView="visible"
                  initial="hidden"
                >
                  <motion.div variants={itemVariants}>
                    <label htmlFor="name" className={`block mb-2 font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Your Name
                    </label>
                    <motion.input 
                      type="text" 
                      id="name" 
                      className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-50 border border-gray-200'}`}
                      placeholder="John Doe"
                      whileFocus={{ scale: 1.02 }}
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <label htmlFor="email" className={`block mb-2 font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Your Email
                    </label>
                    <motion.input 
                      type="email" 
                      id="email" 
                      className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-50 border border-gray-200'}`}
                      placeholder="john@example.com"
                      whileFocus={{ scale: 1.02 }}
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <label htmlFor="subject" className={`block mb-2 font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Subject
                    </label>
                    <motion.input 
                      type="text" 
                      id="subject" 
                      className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-50 border border-gray-200'}`}
                      placeholder="Project Inquiry"
                      whileFocus={{ scale: 1.02 }}
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <label htmlFor="message" className={`block mb-2 font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Message
                    </label>
                    <motion.textarea 
                      id="message" 
                      rows="5"
                      className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-50 border border-gray-200'}`}
                      placeholder="Tell me about your project..."
                      whileFocus={{ scale: 1.02 }}
                    />
                  </motion.div>
                  
                  <motion.button 
                    type="submit"
                    className="relative w-full px-8 py-4 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white overflow-hidden group font-medium text-lg"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.span 
                      className="relative z-10"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Send Message 🚀
                    </motion.span>
                    <motion.span 
                      className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-700"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "0%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                </motion.form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer 
        className={`py-12 px-4 ${isDarkMode ? 'bg-gray-800 border-t border-gray-700' : 'bg-gray-900 text-gray-300'}`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto">
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-center"
            variants={containerVariants}
            whileInView="visible"
            initial="hidden"
          >
            <motion.div 
              className="mb-6 md:mb-0 text-center md:text-left"
              variants={itemVariants}
            >
              <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
                RakibDev
              </h2>
              <p className="text-gray-400 mt-2">Full Stack Developer</p>
            </motion.div>
            
            <motion.div 
              className="flex space-x-6 mb-6 md:mb-0"
              variants={containerVariants}
            >
              {['💻', '💼', '🐦', '📧'].map((icon, index) => (
                <motion.a 
                  key={index}
                  href="#" 
                  className="text-gray-400 hover:text-white transition-colors p-2"
                  variants={itemVariants}
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="text-xl">{icon}</span>
                </motion.a>
              ))}
            </motion.div>
            
            <motion.div 
              className="flex flex-wrap justify-center gap-4"
              variants={containerVariants}
            >
              {['home', 'about', 'skills', 'projects', 'contact'].map((item, index) => (
                <motion.button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize ${activeSection === item ? 'text-indigo-400' : 'text-gray-400 hover:text-white'} transition-colors`}
                  variants={itemVariants}
                  whileHover={{ y: -2 }}
                >
                  {item}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-500"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <p>&copy; {new Date().getFullYear()} Rakib Hossain. All rights reserved.</p>
            <motion.p 
              className="mt-2 text-sm"
              whileHover={{ color: "#6366f1" }}
            >
              Built with React, Tailwind CSS, and Framer Motion ⚡
            </motion.p>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
};

export default Portfolio;