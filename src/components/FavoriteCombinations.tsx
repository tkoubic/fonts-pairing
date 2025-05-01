import { useState } from 'react';
import '../styles/FavoriteCombinations.css';

interface FontCombination {
  id: number;
  headingFont: string;
  paragraphFont: string;
  suitableFor: string;
}

const FavoriteCombinations = () => {
  const [combinations] = useState<FontCombination[]>([
    { id: 1, headingFont: 'DM Serif Display', paragraphFont: 'Poppins', suitableFor: 'Prémiové blogy, magazíny' },
    { id: 2, headingFont: 'Playfair Display', paragraphFont: 'Source Sans Pro', suitableFor: 'Elegantní blogy, portfolia' },
    { id: 3, headingFont: 'Montserrat Bold', paragraphFont: 'Roboto Slab', suitableFor: 'Moderní firmy, technologie' },
    { id: 4, headingFont: 'Raleway Light', paragraphFont: 'Frank Ruhl Libre', suitableFor: 'Minimalistické weby, architektura' },
    { id: 5, headingFont: 'Bebas Neue', paragraphFont: 'Roboto', suitableFor: 'Tučné a moderní weby' },
    { id: 6, headingFont: 'Lora', paragraphFont: 'Open Sans', suitableFor: 'Elegantní a čitelné weby' },
    { id: 7, headingFont: 'Oswald Medium', paragraphFont: 'Roboto Bold', suitableFor: 'Obchod, fitness, technologie' },
    { id: 8, headingFont: 'Archivo Black', paragraphFont: 'Judson', suitableFor: 'Robustní a elegantní weby' },
    { id: 9, headingFont: 'Quicksand Medium/Light', paragraphFont: 'Source Sans Pro', suitableFor: 'Moderní a přátelské značky' },
    { id: 10, headingFont: 'Merriweather', paragraphFont: 'Open Sans Condensed', suitableFor: 'Čitelné weby s velkým množstvím obsahu' },
  ]);

 
    
   

  return (
    <div className="favorite-combinations">
      <h2>Oblíbené kombinace písem</h2>
      <p className="description">
        Zde najdete seznam osvědčených kombinací písem, které dobře fungují pro různé typy webů a projektů.
      </p>
      
      <div className="table-container">
        <table className="combinations-table">
          <thead>
            <tr>
              <th>Kombinace</th>
              <th>Písmo pro nadpisy</th>
              <th>Písmo pro tělo textu</th>
              <th>Vhodné pro</th>
            </tr>
          </thead>
          <tbody>
            {combinations.map((combination) => (
              <tr key={combination.id}>
                <td>{combination.id}</td>
                <td style={{ fontFamily: combination.headingFont }}>{combination.headingFont}</td>
                <td style={{ fontFamily: combination.paragraphFont }}>{combination.paragraphFont}</td>
                <td>{combination.suitableFor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      
    </div>
  );
};

export default FavoriteCombinations;
