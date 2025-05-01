
# Font Pairing App

A React application that helps designers and developers find perfect font combinations for their projects. This tool allows you to select and preview different font pairings for headings and paragraphs, and provides a curated list of recommended font combinations for various types of websites.


DEMO: `https://fontspair.netlify.app/`

## Screenshots




## Features

- Select from a curated list of popular Google Fonts
- Preview heading and paragraph text with your selected fonts
- Adjust font sizes with pixel-precision sliders
- Real-time font loading and rendering
- Browse a collection of recommended font combinations for different website types
- Export font configurations as CSS, Tailwind CSS, or HTML
- Export recommended combinations to CSV format
- Fully responsive design optimized for both desktop and mobile devices
- Multi-page navigation with React Router

## Getting Started

### Prerequisites

- Node.js (version 18.0.0 or higher)

### Installation

1. Clone the repository
```bash
git clone https://github.com/tkoubic/fonts-pairing-app.git
cd fonts-pairing-app
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Navigation

- Home page (Font Pairing Tool): `http://localhost:5173/`
- Recommended Combinations: `http://localhost:5173/oblibene`

## Building for Production

```bash
npm run build
```

## Technologies Used

- React 19
- TypeScript
- Vite
- React Router
- Google Fonts API
- CSS3 with responsive design

## Application Structure

The application consists of two main pages:

1. **Font Pairing Tool** - The main page where users can select and preview font combinations
   - Select heading and paragraph fonts from a dropdown
   - Adjust font sizes with sliders
   - Preview the selected fonts in real-time
   - Export the font configuration as CSS, Tailwind CSS, or HTML

2. **Recommended Combinations** - A page displaying curated font combinations for different website types
   - View 10 recommended font pairings
   - See which website types each combination is suitable for
   - Export the list to CSV format
   - Mobile-optimized card view for smaller screens

## Possible Future Enhancements

1. **Font Categories Filter** - Allow filtering fonts by category (serif, sans-serif, display, etc.)
2. **Color Scheme Selection** - Add ability to change background and text colors to see how fonts look with different color schemes
3. **Font Combination Suggestions** - Implement AI-based recommendations for complementary font pairings
4. **PDF Export** - Allow users to export their font selections as a PDF sample
5. **User Accounts** - Add authentication to save favorite font combinations
6. **Custom Text Input** - Allow users to input their own text for the preview
7. **Typography Spacing Controls** - Add options to adjust line height, letter spacing, and word spacing
8. **Dark Mode** - Implement a dark theme option
9. **Mobile App Version** - Create a native mobile app version for iOS and Android
10. **Font Combination Rating** - Allow users to rate and comment on font combinations

## License

MIT

