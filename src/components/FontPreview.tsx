import '../styles/FontPreview.css';
import { parseFontWithVariant } from '../data/fonts';

interface FontPreviewProps {
  headingFont: string; // Format: "FontName:variant" (e.g., "Roboto:700")
  paragraphFont: string; // Format: "FontName:variant" (e.g., "Roboto:400")
}

const FontPreview = ({ headingFont, paragraphFont }: FontPreviewProps) => {
  // Parse the selected fonts to get the font name and variant
  const { fontName: headingFontName, variant: headingVariant } = parseFontWithVariant(headingFont);
  const { fontName: paragraphFontName, variant: paragraphVariant } = parseFontWithVariant(paragraphFont);

  return (
    <div className="font-preview">
      <h2 className="font-preview-title">Preview</h2>
      <div className="font-preview-content">
        <h1 style={{
          fontFamily: headingFontName,
          fontWeight: parseInt(headingVariant)
        }}>
          This is a heading in {headingFontName} ({headingVariant})
        </h1>
        <p style={{
          fontFamily: paragraphFontName,
          fontWeight: parseInt(paragraphVariant)
        }}>
          This is a paragraph in {paragraphFontName} ({paragraphVariant}). Good typography is important for readability and user experience.
          The right font pairing can make your website look professional and cohesive.
          This preview shows how your selected heading and paragraph fonts work together.
        </p>
        <p style={{
          fontFamily: paragraphFontName,
          fontWeight: parseInt(paragraphVariant)
        }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.
          Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.
          Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor.
        </p>
      </div>
    </div>
  );
};

export default FontPreview;
