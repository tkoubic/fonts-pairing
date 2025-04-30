import { useState } from 'react';
import { fonts, Font, parseFontWithVariant, formatFontWithVariant } from '../data/fonts';
import '../styles/FontSelector.css';

interface FontSelectorProps {
  label: string;
  selectedFont: string; // Format: "FontName:variant" (e.g., "Roboto:700")
  onFontChange: (font: string) => void;
}

const FontSelector = ({ label, selectedFont, onFontChange }: FontSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showVariants, setShowVariants] = useState(false);
  const [selectedFontObj, setSelectedFontObj] = useState<Font | null>(null);

  // Parse the selected font to get the font name and variant
  const { fontName, variant } = parseFontWithVariant(selectedFont);

  const filteredFonts = fonts.filter(font =>
    font.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFontSelect = (font: Font) => {
    setSelectedFontObj(font);
    setShowVariants(true);
  };

  const handleVariantSelect = (fontName: string, variant: string) => {
    onFontChange(formatFontWithVariant({ fontName, variant }));
    setIsOpen(false);
    setShowVariants(false);
    setSearchTerm('');
    setSelectedFontObj(null);
  };

  const handleBackToFonts = () => {
    setShowVariants(false);
    setSelectedFontObj(null);
  };

  return (
    <div className="font-selector">
      <label className="font-selector-label">{label}</label>
      <div className="font-selector-container">
        <div
          className="font-selector-selected"
          onClick={() => setIsOpen(!isOpen)}
          style={{ fontFamily: fontName, fontWeight: parseInt(variant) }}
        >
          <span>{fontName} ({variant})</span>
          <span className="font-selector-arrow">{isOpen ? '▲' : '▼'}</span>
        </div>

        {isOpen && (
          <div className="font-selector-dropdown">
            {!showVariants ? (
              <>
                <input
                  type="text"
                  className="font-selector-search"
                  placeholder="Search fonts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
                <div className="font-selector-options">
                  {filteredFonts.map((font) => (
                    <div
                      key={font.name}
                      className="font-selector-option"
                      style={{ fontFamily: font.name }}
                      onClick={() => handleFontSelect(font)}
                    >
                      {font.name}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="font-selector-variants">
                <div className="font-selector-back" onClick={handleBackToFonts}>
                  ← Back to fonts
                </div>
                <div className="font-selector-variant-title">
                  Select a variant for {selectedFontObj?.name}:
                </div>
                <div className="font-selector-options">
                  {selectedFontObj?.variants.map((variantOption) => (
                    <div
                      key={variantOption}
                      className={`font-selector-option ${variantOption === variant ? 'selected' : ''}`}
                      style={{
                        fontFamily: selectedFontObj.name,
                        fontWeight: parseInt(variantOption)
                      }}
                      onClick={() => handleVariantSelect(selectedFontObj.name, variantOption)}
                    >
                      {variantOption} - Sample Text
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FontSelector;
