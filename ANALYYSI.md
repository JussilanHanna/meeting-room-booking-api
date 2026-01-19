1. Mitä tekoäly teki hyvin?

Tekoäly tuotti nopeasti toimivan lähtötason toteutuksen kokoushuoneiden varausrajapinnalle. Se loi selkeän projektirakenteen (reitit, palvelulogiikka ja repositorio) ja toteutti vaaditut perustoiminnot, kuten varausten luonnin, listauksen ja peruutuksen.

Lisäksi tekoäly huomioi keskeiset liiketoimintasäännöt, kuten päällekkäisten varausten estämisen, aloitus- ja lopetusajan validoinnin sekä virhetilanteiden käsittelyn. Tämä mahdollisti sen, että sovellus saatiin nopeasti ajettavaksi ja toiminnallisesti oikeaan suuntaan.

2. Mitä tekoäly teki huonosti?

Tekoälyn tuottama ratkaisu oletti valmiin Node.js-kehitysympäristön. Käytännössä Windows-ympäristössä PATH ei ollut oikein konfiguroitu, mikä vaati manuaalista korjausta ennen kuin sovellus saatiin käynnistymään.

Alkuperäisessä koodissa käytettiin myös @ts-expect-error-direktiiviä Fastifyn virhetyyppien kanssa ilman, että virhettä oli tarkasti rajattu. Tämä heikensi TypeScript-tyyppiturvallisuutta ja olisi voinut peittää todellisia ongelmia jatkokehityksessä.

Lisäksi osa vastemuodoista ja validoinneista jäi alkuvaiheessa epätarkaksi, mikä vaati myöhemmin tarkennuksia API:n yhdenmukaisuuden ja luettavuuden parantamiseksi.

3. Mitkä olivat tärkeimmät parannukset ja miksi?

Keskeisimmät parannukset liittyivät koodin laatuun, virheenkäsittelyyn ja testattavuuteen.

Liiketoimintasäännöt eriytettiin selkeämmin omiin vastuualueisiinsa, ja aikakäsittely refaktoroitiin erilliseen util-moduuliin, mikä paransi koodin luettavuutta ja testattavuutta. Virhevastaukset yhdenmukaistettiin siten, että kaikki virhetilanteet palautuvat samassa muodossa riippumatta siitä, syntyvätkö ne validoinnista vai liiketoimintalogiikasta.

Testejä täsmennettiin siten, että ne eivät ainoastaan odota virheen syntymistä, vaan tarkistavat myös virhekoodit ja HTTP-statukset. Tämä parantaa testien luotettavuutta ja dokumentoi samalla liiketoimintasääntöjä.

Tuotantoympäristössä tarjoaisin rajapinnalle OpenAPI-dokumentaation ja Swagger-käyttöliittymän, mutta tässä tehtävässä keskityin ydintoiminnallisuuteen ja rajapinnan rakenteelliseen laatuun.