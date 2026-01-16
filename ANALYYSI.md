Tekoälyn tuottama ratkaisu oletti valmiin Node.js-ympäristön. Käytännössä Windows-ympäristössä PATH ei ollut oikein konfiguroitu, mikä vaati manuaalisen korjauksen.

Alkuperäisessä koodissa käytettiin @ts-expect-error -direktiiviä Fastifyn virhetyyppien kanssa. Refaktoroinnin jälkeen TypeScript ei enää raportoinut virhettä, joten direktiivi poistettiin tarpeettomana.