// List of popular Google Fonts for our font pairing app
export interface Font {
  name: string;
  category: 'serif' | 'sans-serif' | 'display' | 'handwriting' | 'monospace';
  variants: string[];
}

export interface FontWithVariant {
  fontName: string;
  variant: string;
}

// Helper function to parse a font string with variant (e.g., "Roboto:700")
export const parseFontWithVariant = (fontString: string): FontWithVariant => {
  const parts = fontString.split(':');
  return {
    fontName: parts[0],
    variant: parts.length > 1 ? parts[1] : '400'
  };
};

// Helper function to format a font with variant (e.g., { fontName: "Roboto", variant: "700" } -> "Roboto:700")
export const formatFontWithVariant = (font: FontWithVariant): string => {
  return `${font.fontName}:${font.variant}`;
};

// Helper function to get the font object by name
export const getFontByName = (name: string): Font | undefined => {
  return fonts.find(font => font.name === name);
};

export const fonts: Font[] = [
  {
    name: 'Roboto',
    category: 'sans-serif',
    variants: ['300', '400', '500', '700']
  },
  {
    name: 'Open Sans',
    category: 'sans-serif',
    variants: ['300', '400', '600', '700']
  },
  {
    name: 'Lato',
    category: 'sans-serif',
    variants: ['300', '400', '700', '900']
  },
  {
    name: 'Montserrat',
    category: 'sans-serif',
    variants: ['300', '400', '500', '700']
  },
  {
    name: 'Playfair Display',
    category: 'serif',
    variants: ['400', '500', '700', '900']
  },
  {
    name: 'Merriweather',
    category: 'serif',
    variants: ['300', '400', '700', '900']
  },
  {
    name: 'Poppins',
    category: 'sans-serif',
    variants: ['300', '400', '500', '700']
  },
  {
    name: 'Oswald',
    category: 'sans-serif',
    variants: ['300', '400', '500', '700']
  },
  {
    name: 'Raleway',
    category: 'sans-serif',
    variants: ['300', '400', '500', '700']
  },
  {
    name: 'PT Serif',
    category: 'serif',
    variants: ['400', '700']
  },
  {
    name: 'Source Sans Pro',
    category: 'sans-serif',
    variants: ['300', '400', '600', '700']
  },
  {
    name: 'Nunito',
    category: 'sans-serif',
    variants: ['300', '400', '600', '700']
  },
  {
    name: 'Quicksand',
    category: 'sans-serif',
    variants: ['300', '400', '500', '700']
  },
  {
    name: 'Crimson Text',
    category: 'serif',
    variants: ['400', '600', '700']
  },
  {
    name: 'Work Sans',
    category: 'sans-serif',
    variants: ['300', '400', '500', '700']
  },
  {
    name: 'Lora',
    category: 'serif',
    variants: ['400', '500', '700']
  },
  {
    name: 'Fira Sans',
    category: 'sans-serif',
    variants: ['300', '400', '500', '700']
  },
  {
    name: 'Noto Sans',
    category: 'sans-serif',
    variants: ['300', '400', '500', '700']
  },
  {
    name: 'Noto Serif',
    category: 'serif',
    variants: ['400', '700']
  },
  {
    name: 'Inconsolata',
    category: 'monospace',
    variants: ['400', '700']
  }
];

// Helper function to get Google Fonts URL
export const getGoogleFontsUrl = (selectedFonts: string[]): string => {
  if (selectedFonts.length === 0) return '';

  const formattedFonts = selectedFonts.map(fontString => {
    const { fontName, variant } = parseFontWithVariant(fontString);
    // Replace spaces with + for URL and add weight
    return `${fontName.replace(/\s+/g, '+')}:wght@${variant}`;
  });

  return `https://fonts.googleapis.com/css2?family=${formattedFonts.join('&family=')}&display=swap`;
};
