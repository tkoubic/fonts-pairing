import { useState, useEffect } from 'react';
import { fonts, Font, parseFontWithVariant, formatFontWithVariant } from '../data/fonts';
import '../styles/FontSelector.css';

// Typy kategorií písem
type FontCategory = 'all' | 'serif' | 'sans-serif' | 'display' | 'handwriting' | 'monospace';

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
  const [selectedCategory, setSelectedCategory] = useState<FontCategory>('all');
  const [filteredFonts, setFilteredFonts] = useState<Font[]>(fonts);

  // Parse the selected font to get the font name and variant
  const { fontName, variant } = parseFontWithVariant(selectedFont);

  // Počty písem v jednotlivých kategoriích
  const categoryCounts = {
    all: fonts.length,
    serif: fonts.filter(font => font.category === 'serif').length,
    'sans-serif': fonts.filter(font => font.category === 'sans-serif').length,
    display: fonts.filter(font => font.category === 'display').length,
    handwriting: fonts.filter(font => font.category === 'handwriting').length,
    monospace: fonts.filter(font => font.category === 'monospace').length
  };

  // Filtrování písem podle kategorie a vyhledávacího výrazu
  useEffect(() => {
    let result = fonts;

    // Filtrování podle kategorie
    if (selectedCategory !== 'all') {
      result = result.filter(font => font.category === selectedCategory);
    }

    // Filtrování podle vyhledávacího výrazu
    if (searchTerm.trim() !== '') {
      result = result.filter(font =>
        font.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredFonts(result);
  }, [selectedCategory, searchTerm]);

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

  const handleCategoryChange = (category: FontCategory) => {
    setSelectedCategory(category);
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
                <div className="font-selector-search-container">
                  <input
                    type="text"
                    className="font-selector-search"
                    placeholder="Hledat písmo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                  />
                  {searchTerm && (
                    <button
                      className="font-selector-search-clear"
                      onClick={() => setSearchTerm('')}
                    >
                      ×
                    </button>
                  )}
                </div>

                <div className="font-selector-categories">
                  <button
                    className={`category-button ${selectedCategory === 'all' ? 'active' : ''}`}
                    onClick={() => handleCategoryChange('all')}
                  >
                    Vše ({categoryCounts.all})
                  </button>
                  <button
                    className={`category-button ${selectedCategory === 'serif' ? 'active' : ''}`}
                    onClick={() => handleCategoryChange('serif')}
                  >
                    Serif ({categoryCounts.serif})
                  </button>
                  <button
                    className={`category-button ${selectedCategory === 'sans-serif' ? 'active' : ''}`}
                    onClick={() => handleCategoryChange('sans-serif')}
                  >
                    Sans-serif ({categoryCounts['sans-serif']})
                  </button>
                  <button
                    className={`category-button ${selectedCategory === 'display' ? 'active' : ''}`}
                    onClick={() => handleCategoryChange('display')}
                  >
                    Display ({categoryCounts.display})
                  </button>
                  <button
                    className={`category-button ${selectedCategory === 'handwriting' ? 'active' : ''}`}
                    onClick={() => handleCategoryChange('handwriting')}
                  >
                    Handwriting ({categoryCounts.handwriting})
                  </button>
                  <button
                    className={`category-button ${selectedCategory === 'monospace' ? 'active' : ''}`}
                    onClick={() => handleCategoryChange('monospace')}
                  >
                    Monospace ({categoryCounts.monospace})
                  </button>
                </div>

                <div className="font-selector-results">
                  <div className="font-selector-results-count">
                    Nalezeno: {filteredFonts.length} písem
                  </div>
                </div>

                <div className="font-selector-options">
                  {filteredFonts.length > 0 ? (
                    filteredFonts.map((font) => (
                      <div
                        key={font.name}
                        className="font-selector-option"
                        style={{ fontFamily: font.name }}
                        onClick={() => handleFontSelect(font)}
                      >
                        <span className="font-name">{font.name}</span>
                        <span className="font-category">{font.category}</span>
                      </div>
                    ))
                  ) : (
                    <div className="font-selector-no-results">
                      Žádná písma nebyla nalezena. Zkuste změnit vyhledávací kritéria.
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="font-selector-variants">
                <div className="font-selector-back" onClick={handleBackToFonts}>
                  ← Zpět
                </div>
                <div className="font-selector-variant-title">
                  Vyber si variantu pro {selectedFontObj?.name}:
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
                      {variantOption} - Ukázka textu
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
