# IPMEDTH-Lakenhal
Lakenhal MuseumMatch applicatie IPMEDTH hogeschool Leiden

## Inhoud
- [Probleemstelling](#probleemstelling)
- [Installatie](#installatie)
- [Back-end](#back-end)

### Probleemstelling
Kunst wordt vanuit één perspectief bekeken van een persoon. Mensen komen niet samen om over kunst te discussiëren. 
Het kan ook zijn dat mensen niemand hebben om mee samen naar het museum te gaan, om op die manier tot andere inzichten te komen over kunst.
Museum De Lakenhal wil hier graag verandering in brengen en heeft ons gevraagd iets te verzinnen om mensen samen te laten komen met kunst als verbindende factor.

### Installatie
De front-end van de applicatie is gebouwd met het framework Reactjs en Socket.io. Volg de volgende stappen om de omgeving werkend te krijgen:
1. Clone de repository
```
$ git clone https://github.com/mauricekoreman/IPMEDTH-Lakenhal.git
```
2. Ga de folder van de client in. In deze folder bevindt zich de React code
```
$ cd IPMEDTH-Lakenhal/client
```
3. Installeer de dependencies met `$ npm install`
4. Ga de folder van de socket server in. In deze folder bevindt zich de Socket.io server code.
```
$ cd ../server
```
5. Installeer ook hier de benodigde dependencies met `$ npm install`
6. Als dit klaar is dan moeten de client en de server naast elkaar gaan draaien. De terminal waar je nu inzit is als het goed is de server. Voer hier de command `$ npm run devStart` om deze te laten draaien. 
7. Om de client ernaast te draaien moet er een tweede terminal worden geopend. Navigeer in deze terminal vervolgens naar de client map. Voer hier dan `$ npm start` uit.

### back-end
Voor de back-end zie de README van de repository [API Lakenhal Matcht](https://github.com/samirtown/API_LakenhalMatched)
