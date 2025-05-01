import { parseFontWithVariant } from '../data/fonts';
import '../styles/ExportCode.css';

interface ExportCodeProps {
  headingFont: string;
  paragraphFont: string;
  headingSize: number;
  paragraphSize: number;
}

const ExportCode = ({ headingFont, paragraphFont, headingSize, paragraphSize }: ExportCodeProps) => {
  const { fontName: headingFontName, variant: headingVariant } = parseFontWithVariant(headingFont);
  const { fontName: paragraphFontName, variant: paragraphVariant } = parseFontWithVariant(paragraphFont);

  // Tailwind CSS 4 používá CSS proměnné a nepotřebuje tolik konfigurace
  const getTailwindCss = () => {
    return `/* Tailwind CSS 4 - CSS Variables Approach */
@import url('https://fonts.googleapis.com/css2?family=${headingFontName.replace(/\s+/g, '+')}:wght@${headingVariant}&family=${paragraphFontName.replace(/\s+/g, '+')}:wght@${paragraphVariant}&display=swap');

/* Přidejte toto do vašeho hlavního CSS souboru */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --font-heading: '${headingFontName}', sans-serif;
    --font-body: '${paragraphFontName}', sans-serif;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-heading);
    font-weight: ${headingVariant};
  }
  
  body, p {
    font-family: var(--font-body);
    font-weight: ${paragraphVariant};
  }
}

/* Použití v HTML */
/* <h1 class="text-[${headingSize}px]">Nadpis</h1> */
/* <p class="text-[${paragraphSize}px]">Text odstavce</p> */`;
  };

  const getCssCode = () => {
    return `/* Google Fonts Import */
@import url('https://fonts.googleapis.com/css2?family=${headingFontName.replace(/\s+/g, '+')}:wght@${headingVariant}&family=${paragraphFontName.replace(/\s+/g, '+')}:wght@${paragraphVariant}&display=swap');

/* Typography Styles */
h1, h2, h3, h4, h5, h6 {
  font-family: '${headingFontName}', sans-serif;
  font-weight: ${headingVariant};
}

h1 {
  font-size: ${headingSize}px;
}

body, p {
  font-family: '${paragraphFontName}', sans-serif;
  font-weight: ${paragraphVariant};
  font-size: ${paragraphSize}px;
}`;
  };

  const getHtmlExample = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Font Example</title>
  <link href="https://fonts.googleapis.com/css2?family=${headingFontName.replace(/\s+/g, '+')}:wght@${headingVariant}&family=${paragraphFontName.replace(/\s+/g, '+')}:wght@${paragraphVariant}&display=swap" rel="stylesheet">
  <style>
    h1, h2, h3, h4, h5, h6 {
      font-family: '${headingFontName}', sans-serif;
      font-weight: ${headingVariant};
    }
    
    h1 {
      font-size: ${headingSize}px;
    }
    
    body, p {
      font-family: '${paragraphFontName}', sans-serif;
      font-weight: ${paragraphVariant};
      font-size: ${paragraphSize}px;
    }
  </style>
</head>
<body>
  <h1>Heading Text</h1>
  <p>This is paragraph text that shows your selected font.</p>
</body>
</html>`;
  };

  return (
    <div className="export-code">
      <div className="export-section">
        <h3>Tailwind CSS 4</h3>
        <pre className="code-block">{getTailwindCss()}</pre>
        <button className="copy-button" onClick={() => navigator.clipboard.writeText(getTailwindCss())}>
          Copy to Clipboard
        </button>
      </div>
      
      <div className="export-section">
        <h3>Pure CSS</h3>
        <pre className="code-block">{getCssCode()}</pre>
        <button className="copy-button" onClick={() => navigator.clipboard.writeText(getCssCode())}>
          Copy to Clipboard
        </button>
      </div>
      
      <div className="export-section">
        <h3>HTML Example</h3>
        <pre className="code-block">{getHtmlExample()}</pre>
        <button className="copy-button" onClick={() => navigator.clipboard.writeText(getHtmlExample())}>
          Copy to Clipboard
        </button>
      </div>
    </div>
  );
};

export default ExportCode;