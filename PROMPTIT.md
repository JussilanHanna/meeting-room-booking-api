# PROMPTIT.md

Tämä tiedosto kuvaa, miten tekoälyä hyödynnettiin toteutuksen eri vaiheissa sekä miten ratkaisu kehittyi iteratiivisesti promptien avulla.

---

## Prompt #1 – Perustoteutus (Fastify + TypeScript)

### PROMPT
Toteuta tuotantohenkinen kokoushuoneiden varaus-API Node.js + TypeScript + Fastify -stackilla. Käytä in-memory tallennusta. Tarvittavat endpointit:

- POST /rooms/:roomId/bookings (luo varaus)
- DELETE /rooms/:roomId/bookings/:bookingId (peru varaus)
- GET /rooms/:roomId/bookings (listaa varaukset)

Business rules:
- varaukset eivät saa mennä päällekkäin samassa huoneessa
- varaukset eivät voi olla menneisyydessä
- start < end

Lisävaatimukset (tuotantohenkinen):
- request/response-validointi (JSON schema)
- selkeä projektirakenne (routes/services/repositories)
- yhtenäiset virhevastausmuodot (error handler)
- id:t generoidaan (uuid)
- ajat ISO 8601 -muodossa, käsittele UTC:na
- yksinkertainen “health” endpoint GET /health
- README: käynnistys, esimerkkipyynnöt curlilla
- mukana vähintään muutama unit-testi (Vitest) palvelulogiiikalle (overlap + menneisyys + start/end)

Palauta:
- tiedostopuu
- keskeiset tiedostot kokonaisina (package.json, tsconfig, src/*, testit)
- ohjeet käynnistykseen

### AI RESPONSE (tiivistelmä)
AI loi lähtötason Fastify + TypeScript -projektin, jossa oli:
- in-memory repository varauksille
- BookingService liiketoimintasäännöille (päällekkäisyys, menneisyys, start < end)
- reitit GET/POST/DELETE /rooms/:roomId/bookings sekä GET /health
- yhtenäinen virhemuoto AppErrorin kautta
- Vitest-unit-testit palvelulogiiikalle
- README käynnistykseen ja curl-esimerkkeihin

Tuotettu tiedostopuu:
- meeting-room-booking-api/
  - package.json
  - tsconfig.json
  - README.md
  - src/
    - server.ts
    - app.ts
    - bookings.ts
    - health.ts
    - errors.ts
    - bookingService.ts
    - bookingRepository.ts
  - test/
    - bookingService.test.ts

---

## Prompt #2 – Validoinnin parantaminen

### PROMPT
Lisää POST /rooms/:roomId/bookings -reitille JSON scheman validointi siten, että start ja end vaativat ISO 8601 date-time -muodon (format: "date-time"). Varmista, että virhe palautuu yhtenäisessä error-muodossa.

### AI RESPONSE (tiivistelmä)
AI tuotti ehdotuksen lisätä start- ja end-kenttiin `format: "date-time"` route-schemoihin.

---

## Prompt #3 – Testien täsmennys

### PROMPT
Refaktoroi unit-testit niin, että ne eivät käytä `rejects.toBeTruthy()`, vaan tarkistavat virheiden `code` ja `statusCode`. Tee tarvittaessa apufunktio testitiedostoon toiston vähentämiseksi.

### AI RESPONSE (tiivistelmä)
AI tuotti ehdotuksen tarkentaa testejä `toMatchObject({ code, statusCode })` -odotuksilla ja lisätä helper-funktion `expectRejectCode(...)`.

---

## Prompt #4 – Virhevastaukset yhdenmukaisiksi

### PROMPT
Yhdenmukaista Fastifyn validation error -vastaukset samaan muotoon kuin AppError (error: { code, message, details }). Poista tarpeettomat @ts-expect-error -direktiivit ja käsittele Fastifyn error-objektin kentät turvallisesti.

### AI RESPONSE (tiivistelmä)
AI tuotti ehdotuksen käyttää type castia `(err as any)` validation-kenttien lukemiseen sekä lisätä 500-virheeseen `details: null`.

---

## Prompt #5 – API:n vastemuodon muutos

### PROMPT
Muuta GET /rooms/:roomId/bookings palauttamaan suoraan taulukko (Booking[]) wrapper-objektin sijaan ja lisää response-schema (200) listaukselle.

### AI RESPONSE (tiivistelmä)
AI tuotti ehdotuksen palauttaa `return service.list(roomId);` ja määritellä response-schema items-kenttineen.
