import { useState, useEffect } from 'react'
import './App.css'
import FontSelector from './components/FontSelector'
import FontPreview from './components/FontPreview'
import { getGoogleFontsUrl } from './data/fonts'

function App() {
  const [headingFont, setHeadingFont] = useState('Playfair Display:700')
  const [paragraphFont, setParagraphFont] = useState('Roboto:400')
  const [fontsLoaded, setFontsLoaded] = useState(false)

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
    <div className="app-container">
      <header className="app-header">
        <h1>Font Pairing App</h1>
        <p>Select fonts for headings and paragraphs to see how they look together</p>
      </header>

      <main className="app-content">
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
          <FontPreview
            headingFont={headingFont}
            paragraphFont={paragraphFont}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>Created with React and TypeScript</p>
      </footer>
    </div>
  )
}

export default App
