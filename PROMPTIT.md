PROMPT:

  Toteuta tuotantohenkinen kokoushuoneiden varaus-API Node.js + TypeScript + Fastify -stackilla. Käytä in-memory tallennusta. Tarvittavat endpointit:

  POST /rooms/:roomId/bookings (luo varaus)

  DELETE /rooms/:roomId/bookings/:bookingId (peru varaus)

  GET /rooms/:roomId/bookings (listaa varaukset)

Business rules:

  varaukset eivät saa mennä päällekkäin samassa huoneessa

  varaukset eivät voi olla menneisyydessä

  start < end

  Lisävaatimukset (tuotantohenkinen):

  request/response-validointi (JSON schema)

  selkeä projektirakenne (routes/services/repositories)

  yhtenäiset virhevastausmuodot (error handler)

  id:t generoidaan (uuid)

  ajat ISO 8601 -muodossa, käsittele UTC:na

  yksinkertainen “health” endpoint GET /health

  README: käynnistys, esimerkkipyynnöt curlilla

  mukana vähintään muutama unit-testi (Vitest) palvelulogiiikalle (overlap + menneisyys + start/end)

Palauta:

  tiedostopuu

  keskeiset tiedostot kokonaisina (package.json, tsconfig, src/*, testit)

  ohjeet käynnistykseen

AI RESPONSE:
  meeting-room-booking-api/
  package.json
  tsconfig.json
  README.md
  src/
    server.ts
    app.ts
    routes/
      health.ts
      bookings.ts
    domain/
      types.ts
      errors.ts
    services/
      bookingService.ts
    repositories/
      bookingRepository.ts
  test/
    bookingService.test.ts
