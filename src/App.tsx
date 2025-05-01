import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import './App.css'
import FontSelector from './components/FontSelector'
import FontPreview from './components/FontPreview'
import ExportCode from './components/ExportCode'
import FavoriteCombinations from './components/FavoriteCombinations'
import { getGoogleFontsUrl } from './data/fonts'

// Header component with conditional subtitle
const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <header className="app-header">
      <h1>Náhledy písem pro web</h1>
      {isHomePage && <p>vyber si písmo pro nadpisy a odstavce</p>}

      <nav className="app-nav">
        <Link to="/" className="nav-link">Párování písem</Link>
        <Link to="/oblibene" className="nav-link">Oblíbené kombinace</Link>
      </nav>
    </header>
  );
};

// Home component for the main font pairing functionality
const Home = () => {
  const [headingFont, setHeadingFont] = useState('DM Serif Display:400')
  const [paragraphFont, setParagraphFont] = useState('Poppins:400')
  const [fontsLoaded, setFontsLoaded] = useState(false)
  const [showExport, setShowExport] = useState(false)
  const [headingSize, setHeadingSize] = useState(40)
  const [paragraphSize, setParagraphSize] = useState(16)

  // Load the selected fonts from Google Fonts
  useEffect(() => {
    const loadFonts = async () => {
      setFontsLoaded(false)

      const fontUrl = getGoogleFontsUrl([headingFont, paragraphFont])

      // Create a link element for the Google Fonts
      const link = document.createElement('link')
      link.href = fontUrl
      link.rel = 'stylesheet'

      // Add the link to the document head
      document.head.appendChild(link)

      // Set a timeout to ensure fonts are loaded
      setTimeout(() => {
        setFontsLoaded(true)
      }, 300)
    }

    loadFonts()
  }, [headingFont, paragraphFont])

  return (
    <>
      <div className="font-selectors">
        <div className="font-selector-column">
          <FontSelector
            label="Heading Font"
            selectedFont={headingFont}
            onFontChange={setHeadingFont}
          />
        </div>
        <div className="font-selector-column">
          <FontSelector
            label="Paragraph Font"
            selectedFont={paragraphFont}
            onFontChange={setParagraphFont}
          />
        </div>
      </div>

      {fontsLoaded && (
        <>
          <FontPreview
            headingFont={headingFont}
            paragraphFont={paragraphFont}
            headingSize={headingSize}
            paragraphSize={paragraphSize}
            onHeadingSizeChange={setHeadingSize}
            onParagraphSizeChange={setParagraphSize}
          />

          {/* Tlačítko pro export */}
          <div className="export-button-container">
            <button
              className="export-button"
              onClick={() => setShowExport(true)}
            >
              Export Code
            </button>
          </div>

          {/* Modální okno pro export */}
          {showExport && (
            <div className="modal-overlay">
              <div className="modal-content">
                <button
                  className="close-button"
                  onClick={() => setShowExport(false)}
                >
                  &times;
                </button>
                <h2>Export Font Configuration</h2>
                <ExportCode
                  headingFont={headingFont}
                  paragraphFont={paragraphFont}
                  headingSize={headingSize}
                  paragraphSize={paragraphSize}
                />
              </div>
            </div>
          )}
        </>
      )}
    </>
  )
}

// App wrapper that provides routing context
const AppWrapper = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

// Main App component
function App() {
  return (
    <div className="app-container">
      <Header />

      <main className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/oblibene" element={<FavoriteCombinations />} />
        </Routes>
      </main>

      <footer className="app-footer">
        <p>Vytvořeno pomocí React a TypeScript. Vibing is here.</p>
      </footer>
    </div>
  );
}

export default AppWrapper
