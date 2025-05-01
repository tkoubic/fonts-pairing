import { useState } from 'react';
import '../styles/FontPreview.css';
import { parseFontWithVariant } from '../data/fonts';

interface FontPreviewProps {
  headingFont: string;
  paragraphFont: string;
  headingSize?: number;
  paragraphSize?: number;
  onHeadingSizeChange?: (size: number) => void;
  onParagraphSizeChange?: (size: number) => void;
}

interface TypographySettings {
  lineHeight: number;
  letterSpacing: number;
  wordSpacing: number;
  h1Size: number;
  h2Size: number;
  h3Size: number;
  h4Size: number;
  h5Size: number;
  h6Size: number;
  pSize: number;
  smallSize: number;
}

const FontPreview = ({
  headingFont,
  paragraphFont,
  headingSize = 40,
  paragraphSize = 16,
  onHeadingSizeChange,
  onParagraphSizeChange
}: FontPreviewProps) => {
  // Parse the selected fonts to get the font name and variant
  const { fontName: headingFontName, variant: headingVariant } = parseFontWithVariant(headingFont);
  const { fontName: paragraphFontName, variant: paragraphVariant } = parseFontWithVariant(paragraphFont);

  // Rozšířené nastavení typografie
  const [typographySettings, setTypographySettings] = useState<TypographySettings>({
    lineHeight: 1.5,
    letterSpacing: 0,
    wordSpacing: 0,
    h1Size: headingSize,
    h2Size: Math.round(headingSize * 0.8),
    h3Size: Math.round(headingSize * 0.7),
    h4Size: Math.round(headingSize * 0.6),
    h5Size: Math.round(headingSize * 0.5),
    h6Size: Math.round(headingSize * 0.4),
    pSize: paragraphSize,
    smallSize: Math.round(paragraphSize * 0.85)
  });

  // Aktualizace nastavení při změně velikosti hlavního nadpisu
  const handleHeadingSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(e.target.value);
    if (onHeadingSizeChange) {
      onHeadingSizeChange(newSize);
    }

    // Aktualizace velikostí všech nadpisů v poměru k h1
    setTypographySettings(prev => ({
      ...prev,
      h1Size: newSize,
      h2Size: Math.round(newSize * 0.8),
      h3Size: Math.round(newSize * 0.7),
      h4Size: Math.round(newSize * 0.6),
      h5Size: Math.round(newSize * 0.5),
      h6Size: Math.round(newSize * 0.4),
    }));
  };

  // Aktualizace nastavení při změně velikosti odstavce
  const handleParagraphSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(e.target.value);
    if (onParagraphSizeChange) {
      onParagraphSizeChange(newSize);
    }

    setTypographySettings(prev => ({
      ...prev,
      pSize: newSize,
      smallSize: Math.round(newSize * 0.85)
    }));
  };

  // Handlery pro změnu rozšířených nastavení
  const handleLineHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    setTypographySettings(prev => ({
      ...prev,
      lineHeight: newValue
    }));
  };

  const handleLetterSpacingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    setTypographySettings(prev => ({
      ...prev,
      letterSpacing: newValue
    }));
  };

  const handleWordSpacingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    setTypographySettings(prev => ({
      ...prev,
      wordSpacing: newValue
    }));
  };

  return (
    <div className="font-preview">
      <h2 className="font-preview-title">Náhled typografie</h2>

      <div className="typography-controls">
        <div className="typography-control-section">
          <h3 className="control-section-title">Velikosti nadpisů</h3>
          <div className="font-size-control">
            <label>H1 (Hlavní nadpis): {typographySettings.h1Size}px</label>
            <input
              type="range"
              min="20"
              max="72"
              value={typographySettings.h1Size}
              onChange={handleHeadingSizeChange}
            />
          </div>
          <div className="font-size-control">
            <label>Odstavec: {typographySettings.pSize}px</label>
            <input
              type="range"
              min="12"
              max="24"
              value={typographySettings.pSize}
              onChange={handleParagraphSizeChange}
            />
          </div>
        </div>

        <div className="typography-control-section">
          <h3 className="control-section-title">Mezery a řádkování</h3>
          <div className="font-size-control">
            <label>Řádkování (line-height): {typographySettings.lineHeight}</label>
            <input
              type="range"
              min="1"
              max="2.5"
              step="0.1"
              value={typographySettings.lineHeight}
              onChange={handleLineHeightChange}
            />
          </div>
          <div className="font-size-control">
            <label>Mezery mezi písmeny (letter-spacing): {typographySettings.letterSpacing}px</label>
            <input
              type="range"
              min="-2"
              max="5"
              step="0.1"
              value={typographySettings.letterSpacing}
              onChange={handleLetterSpacingChange}
            />
          </div>
          <div className="font-size-control">
            <label>Mezery mezi slovy (word-spacing): {typographySettings.wordSpacing}px</label>
            <input
              type="range"
              min="0"
              max="10"
              step="0.5"
              value={typographySettings.wordSpacing}
              onChange={handleWordSpacingChange}
            />
          </div>
        </div>
      </div>

      <div className="font-preview-content">
        <h1 style={{
          fontFamily: headingFontName,
          fontWeight: parseInt(headingVariant),
          fontSize: `${typographySettings.h1Size}px`,
          lineHeight: typographySettings.lineHeight,
          letterSpacing: `${typographySettings.letterSpacing}px`,
          wordSpacing: `${typographySettings.wordSpacing}px`
        }}>
          H1: Hlavní nadpis v písmu {headingFontName}
        </h1>

        <h2 style={{
          fontFamily: headingFontName,
          fontWeight: parseInt(headingVariant),
          fontSize: `${typographySettings.h2Size}px`,
          lineHeight: typographySettings.lineHeight,
          letterSpacing: `${typographySettings.letterSpacing}px`,
          wordSpacing: `${typographySettings.wordSpacing}px`
        }}>
          H2: Podnadpis druhé úrovně
        </h2>

        <h3 style={{
          fontFamily: headingFontName,
          fontWeight: parseInt(headingVariant),
          fontSize: `${typographySettings.h3Size}px`,
          lineHeight: typographySettings.lineHeight,
          letterSpacing: `${typographySettings.letterSpacing}px`,
          wordSpacing: `${typographySettings.wordSpacing}px`
        }}>
          H3: Podnadpis třetí úrovně
        </h3>

        <p style={{
          fontFamily: paragraphFontName,
          fontWeight: parseInt(paragraphVariant),
          fontSize: `${typographySettings.pSize}px`,
          lineHeight: typographySettings.lineHeight,
          letterSpacing: `${typographySettings.letterSpacing}px`,
          wordSpacing: `${typographySettings.wordSpacing}px`
        }}>
          Toto je odstavec v písmu {paragraphFontName}. Správná typografie je důležitá pro čitelnost a uživatelský zážitek.
          Správná kombinace písem může vašemu webu dodat profesionální a jednotný vzhled.
        </p>

        <h4 style={{
          fontFamily: headingFontName,
          fontWeight: parseInt(headingVariant),
          fontSize: `${typographySettings.h4Size}px`,
          lineHeight: typographySettings.lineHeight,
          letterSpacing: `${typographySettings.letterSpacing}px`,
          wordSpacing: `${typographySettings.wordSpacing}px`
        }}>
          H4: Podnadpis čtvrté úrovně
        </h4>

        <h5 style={{
          fontFamily: headingFontName,
          fontWeight: parseInt(headingVariant),
          fontSize: `${typographySettings.h5Size}px`,
          lineHeight: typographySettings.lineHeight,
          letterSpacing: `${typographySettings.letterSpacing}px`,
          wordSpacing: `${typographySettings.wordSpacing}px`
        }}>
          H5: Podnadpis páté úrovně
        </h5>

        <h6 style={{
          fontFamily: headingFontName,
          fontWeight: parseInt(headingVariant),
          fontSize: `${typographySettings.h6Size}px`,
          lineHeight: typographySettings.lineHeight,
          letterSpacing: `${typographySettings.letterSpacing}px`,
          wordSpacing: `${typographySettings.wordSpacing}px`
        }}>
          H6: Podnadpis šesté úrovně
        </h6>

        <p style={{
          fontFamily: paragraphFontName,
          fontWeight: parseInt(paragraphVariant),
          fontSize: `${typographySettings.pSize}px`,
          lineHeight: typographySettings.lineHeight,
          letterSpacing: `${typographySettings.letterSpacing}px`,
          wordSpacing: `${typographySettings.wordSpacing}px`
        }}>
          Tento náhled ukazuje, jak spolu ladí zvolené písmo pro nadpisy ({headingFontName}) a odstavce ({paragraphFontName}).
          Můžete si všimnout, jak různé velikosti a styly písma vytvářejí vizuální hierarchii a pomáhají strukturovat obsah.
        </p>

        <small style={{
          fontFamily: paragraphFontName,
          fontWeight: parseInt(paragraphVariant),
          fontSize: `${typographySettings.smallSize}px`,
          lineHeight: typographySettings.lineHeight,
          letterSpacing: `${typographySettings.letterSpacing}px`,
          wordSpacing: `${typographySettings.wordSpacing}px`,
          display: 'block',
          marginTop: '1rem'
        }}>
          Toto je text v elementu &lt;small&gt;, který se často používá pro poznámky, copyright a další drobný text.
        </small>
      </div>
    </div>
  );
};

export default FontPreview;
