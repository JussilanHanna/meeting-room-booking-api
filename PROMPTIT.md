# PROMPTIT.md

## Prompt #1 – Perustoteutus (Fastify + TS)

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
AI tuotti Fastify + TypeScript -projektin, jossa on:
- In-memory repository varauksille
- BookingService, jossa on liiketoimintasäännöt (overlap, menneisyys, start<end)
- Reitit: GET/POST/DELETE /rooms/:roomId/bookings sekä GET /health
- Yhtenäinen virhemuoto AppErrorin kautta
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


## Prompt #2 – Validoinnin parantaminen

### PROMPT
Lisää POST /rooms/:roomId/bookings -reitille JSON scheman validointi siten, että start ja end vaativat ISO 8601 date-time -muodon (format: "date-time"). Varmista, että virhe palautuu yhtenäisessä error-muodossa.

### AI RESPONSE (tiivistelmä)
AI ehdotti lisäämään start/end -kenttiin `format: "date-time"` route-schemoihin.


## Prompt #3 – Testien täsmennys

### PROMPT
Refaktoroi unit-testit niin, että ne eivät käytä `rejects.toBeTruthy()`, vaan tarkistavat virheiden `code` ja `statusCode`. Tee tarvittaessa apufunktio testitiedostoon toiston vähentämiseksi.

### AI RESPONSE (tiivistelmä)
AI ehdotti tarkentamaan testejä `toMatchObject({ code, statusCode })` -odotuksilla ja lisäämään helper-funktion `expectRejectCode(...)`.


## Prompt #4 – Virhevastaukset yhdenmukaisiksi

### PROMPT
Yhdenmukaista Fastifyn validation error -vastaukset samaan muotoon kuin AppError (error: { code, message, details }). Poista tarpeettomat @ts-expect-error -direktiivit ja käsittele Fastifyn error-objektin kentät turvallisesti.

### AI RESPONSE (tiivistelmä)
AI ehdotti käyttämään type castia `(err as any)` validation-kenttien lukemiseen ja lisäämään 500-virheeseen myös `details: null`.


## Prompt #5 – API:n vastemuodon muutos

### PROMPT
Muuta GET /rooms/:roomId/bookings palauttamaan suoraan taulukko (Booking[]) wrapper-objektin sijaan ja lisää response-schema (200) listaukselle.

### AI RESPONSE (tiivistelmä)
AI ehdotti palauttamaan `return service.list(roomId);` ja määrittelemään response-schema items-kenttineen.
