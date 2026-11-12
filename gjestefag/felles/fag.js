/* Gjestefagene på TLLfluenseren. Legg til en linje her når et nytt gjestefag får eget rom. */
export const FAG = [
  { id: 'int', navn: 'Industriteknologi', kort: 'INT', farge: '#7fb6ff', beskrivelse: 'Maskinering, CNC, skjæredata og tekniske tegninger.' },
  { id: 'kjt', navn: 'Kjøretøy', kort: 'KJT', farge: '#ff9f6e', beskrivelse: 'Motorer, kraftoverføring og kjøretøyteknikk.' }
];
export const fag = id => FAG.find(f => f.id === id);
