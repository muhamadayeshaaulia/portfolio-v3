import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { FloatingShapes } from './components/3D/FloatingShapes';
import { Header } from './components/Navigation/Header';
import { Hero } from './components/Sections/Hero';
import { About } from './components/Sections/About';
import { Skills } from './components/Sections/Skills';
import { Projects } from './components/Sections/Projects';
import { Contact } from './components/Sections/Contact';
import { Comments } from './components/Sections/Comments';
import  Resume  from './components/Sections/Resume';
import { Footer } from './components/Footer/Footer';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen transition-all duration-500">
          <FloatingShapes />
          <Header />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
            <Comments/>
            <Resume/>
          </main>
          <Footer />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;