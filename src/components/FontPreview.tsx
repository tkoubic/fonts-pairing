import '../styles/FontPreview.css';
import { parseFontWithVariant } from '../data/fonts';
import { useState } from 'react';

interface FontPreviewProps {
  headingFont: string; // Format: "FontName:variant" (e.g., "Roboto:700")
  paragraphFont: string; // Format: "FontName:variant" (e.g., "Roboto:400")
}

const FontPreview = ({ headingFont, paragraphFont }: FontPreviewProps) => {
  const [headingSize, setHeadingSize] = useState(40);
  const [paragraphSize, setParagraphSize] = useState(16);
  
  // Parse the selected fonts to get the font name and variant
  const { fontName: headingFontName, variant: headingVariant } = parseFontWithVariant(headingFont);
  const { fontName: paragraphFontName, variant: paragraphVariant } = parseFontWithVariant(paragraphFont);

  return (
    <div className="font-preview">
      <h2 className="font-preview-title">Preview</h2>
      
      <div className="font-size-controls">
        <div className="font-size-control">
          <label>Heading Size: {headingSize}px</label>
          <input 
            type="range" 
            min="20" 
            max="72" 
            value={headingSize} 
            onChange={(e) => setHeadingSize(parseInt(e.target.value))} 
          />
        </div>
        <div className="font-size-control">
          <label>Paragraph Size: {paragraphSize}px</label>
          <input 
            type="range" 
            min="12" 
            max="24" 
            value={paragraphSize} 
            onChange={(e) => setParagraphSize(parseInt(e.target.value))} 
          />
        </div>
      </div>
      
      <div className="font-preview-content">
        <h1 style={{
          fontFamily: headingFontName,
          fontWeight: parseInt(headingVariant),
          fontSize: `${headingSize}px`
        }}>
          This is a heading in {headingFontName} ({headingVariant})
        </h1>
        <p style={{
          fontFamily: paragraphFontName,
          fontWeight: parseInt(paragraphVariant),
          fontSize: `${paragraphSize}px`
        }}>
          This is a paragraph in {paragraphFontName} ({paragraphVariant}). Good typography is important for readability and user experience.
          The right font pairing can make your website look professional and cohesive.
          This preview shows how your selected heading and paragraph fonts work together.
        </p>
        <p style={{
          fontFamily: paragraphFontName,
          fontWeight: parseInt(paragraphVariant),
          fontSize: `${paragraphSize}px`
        }}>
          Správná typografie je důležitá pro čitelnost a uživatelský zážitek. Správné kombinování fontů může vašemu webu dodat profesionální a jednotný vzhled. Tento náhled ukazuje, jak spolu zvolené písmo pro nadpisy a odstavce ladí.
        </p>
      </div>
    </div>
  );
};

export default FontPreview;
