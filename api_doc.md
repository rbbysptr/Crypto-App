# IP API Documentation

## Models

### User

```md
- username : string, required, unique
- email : string, required, unique
- password : string, required
```

### Coin

```md
- id : primaryKey,string, required
- rank : integer, required
- symbol : string, required
- name : string,required
- supply : string,required
- maxSupply : string, required
- marketCapUsd : string, required
- volumeUsd24Hr : string
- priceUsd : string
- changePercent24Hr : string
- vwap24Hr : string
- explorer : string
- UserId : integer,required
```

### Cart

```md
- id : primaryKey,string, required
- rank : integer, required
- symbol : string, required
- name : string,required
- supply : string,required
- maxSupply : string, required
- marketCapUsd : string, required
- volumeUsd24Hr : string
- priceUsd : string
- changePercent24Hr : string
- vwap24Hr : string
- explorer : string
- UserId : integer,required
```

## Relationship

### Many-to-Many

relasi antara `User`, `Coin`, dan `Cart`

## Endpoints

List of available endpoints:

user

- `POST /register`
- `POST /login`
- `POST /google-login`
- `GET /github-login`

coin

- `GET /coin`
- `POST /add-coin/:id`
- `DELETE /delete-coin/:id`

cart

- `GET /cart`
- `GET /cart/:id`
- `POST /add-cart/:id`
- `PUT /update-cart/:id`
- `DELETE /delete-cart/:id`

Routes below need authentication:

coin

- `GET /coin`
- `POST /add-coin/:id`
- `DELETE /delete-coin/:id`

cart

- `POST /add-cart/:id`
- `PUT /update-cart/:id`
- `DELETE /delete-cart/:id`

Routes below need authentication & authorization:

- `PUT /update-cart/:id`
- `DELETE /delete-coin/:id`
- `DELETE /delete-coin/:id`

## 1. POST /register

Request:

- body:

```json
{
  "username" : "string",
  "email": "string",
  "password": "string"
}
```

Response (201 - Created)

```json
{
  "username": "string",
}
```

Response (400 - Bad Request)

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Password is required"
}
```

## 2. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

Response (200 - OK)

```json
{
  "access_token": "string"
}
```

Response (400 - Bad Request)

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

Response (401 - Unauthorized)

```json
{
  "message": "Invalid email/password"
}
```

## 3. GET /github-login

Request:

params:

```json
{
  "code": "string"
}
```

Response (200 - OK)

```json
{
  "access_token": "string",
  "email": "string"
}
```

## 4. GET /cart

Fetch all cart from database

Response (200 - OK)

```json
[
   {
            "id": "bitcoin",
            "rank": "1",
            "symbol": "BTC",
            "name": "Bitcoin",
            "supply": "19685775.0000000000000000",
            "maxSupply": "21000000.0000000000000000",
            "marketCapUsd": "1256861637462.9911601095827200",
            "volumeUsd24Hr": "8889826517.4512493686220216",
            "priceUsd": "63846.1852511771144448",
            "changePercent24Hr": "-4.1225476208183458",
            "vwap24Hr": "64932.9941908043561087",
            "explorer": "https://blockchain.info/"
        },
        {
            "id": "ethereum",
            "rank": "2",
            "symbol": "ETH",
            "name": "Ethereum",
            "supply": "120072116.6801383000000000",
            "maxSupply": null,
            "marketCapUsd": "375973821418.2651458694606392",
            "volumeUsd24Hr": "5751161413.1210021736597451",
            "priceUsd": "3131.2333938430250407",
            "changePercent24Hr": "-3.6677837010157642",
            "vwap24Hr": "3183.1612912480801350",
            "explorer": "https://etherscan.io/"
        },
        {
            "id": "tether",
            "rank": "3",
            "symbol": "USDT",
            "name": "Tether",
            "supply": "109031963304.8744800000000000",
            "maxSupply": null,
            "marketCapUsd": "109036249380.2592247253696124",
            "volumeUsd24Hr": "19365642330.9233900401001899",
            "priceUsd": "1.0000393102651262",
            "changePercent24Hr": "-0.0405221651809594",
            "vwap24Hr": "1.0000997859295577",
            "explorer": "https://www.omniexplorer.info/asset/31"
        },
        {
            "id": "binance-coin",
            "rank": "4",
            "symbol": "BNB",
            "name": "BNB",
            "supply": "166801148.0000000000000000",
            "maxSupply": "166801148.0000000000000000",
            "marketCapUsd": "101511626436.4193440822224756",
            "volumeUsd24Hr": "692315496.9015186417283320",
            "priceUsd": "608.5787037653922147",
            "changePercent24Hr": "0.1904972184180249",
            "vwap24Hr": "606.0858366170718161",
            "explorer": "https://etherscan.io/token/0xB8c77482e45F1F44dE1745F52C74426C631bDD52"
        },
        {
            "id": "solana",
            "rank": "5",
            "symbol": "SOL",
            "name": "Solana",
            "supply": "446702697.3313378700000000",
            "maxSupply": null,
            "marketCapUsd": "65177930328.9836988701775067",
            "volumeUsd24Hr": "1257499568.5510805466922007",
            "priceUsd": "145.9089696981134001",
            "changePercent24Hr": "-7.0928654468834981",
            "vwap24Hr": "150.8460308308598224",
            "explorer": "https://explorer.solana.com/"
        },
        {
            "id": "usd-coin",
            "rank": "6",
            "symbol": "USDC",
            "name": "USDC",
            "supply": "32618855773.7256430000000000",
            "maxSupply": null,
            "marketCapUsd": "32623325574.6378656999730677",
            "volumeUsd24Hr": "1715584315.9227030596816495",
            "priceUsd": "1.0001370311988633",
            "changePercent24Hr": "-0.0099975133876598",
            "vwap24Hr": "0.9999822652899562",
            "explorer": "https://etherscan.io/token/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
        },
]
```

## 5. GET /cart/:id

get data cart by id

Request:

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

- params:

```json
{
  "id": "integer"
}
```

Response (200 - OK)

```json
 {
    "id": "bitcoin",
    "rank": "1",
    "symbol": "BTC",
    "name": "Bitcoin",
    "supply": "19685775.0000000000000000",
    "maxSupply": "21000000.0000000000000000",
    "marketCapUsd": "1256522738248.8837577691542050",
    "volumeUsd24Hr": "8887080080.5550044400101018",
    "priceUsd": "63828.9698144413292222",
    "changePercent24Hr": "-4.2354958274545993",
    "vwap24Hr": "64932.9941908043561087",
    "explorer": "https://blockchain.info/"
  },
```

Response (404 - Not Found)

```json
{
  "message": "Data not found"
}
```

## 6. POST /add-cart/:id

add Cart

Request:

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

- params:

```json
{
  "id": "integer"
}
```

Response (201 - OK)

```json
[
  {
    "id": "bitcoin",
    "rank": "93",
    "symbol": "rupiahhh",
    "name": "Bitcoin",
    "supply": "19683600.0000000000000000",
    "maxSupply": "21000000.0000000000000000",
    "marketCapUsd": "1247756274170.5906700666250000",
    "volumeUsd24Hr": "13038562943.3300474390602800",
    "priceUsd": "63390.6538524756990625",
    "changePercent24Hr": "-3.2263609061751343",
    "vwap24Hr": "65124.1514173410174713",
    "explorer": "https://blockchain.info/"
  }
  ...,
]
```

## 7. PUT /update-cart/:id

- Update Cart

Request:

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

- params:

```json
{
  "id": "integer"
}
```

- body:

```json
{
    "rank": "93",
    "symbol": "rupiahhh",
    "name": "Bitcoin",
    "supply": "19683600.0000000000000000",
    "maxSupply": "21000000.0000000000000000",
    "marketCapUsd": "1247756274170.5906700666250000",
    "volumeUsd24Hr": "13038562943.3300474390602800",
    "priceUsd": "63390.6538524756990625",
    "changePercent24Hr": "-3.2263609061751343",
    "vwap24Hr": "65124.1514173410174713",
    "explorer": "https://blockchain.info/"
}
```

Response (200 - OK)

```json
{
  "message": "has been updated in cart"
}
```

Response (404 - Not Found)

```json
{
  "message": "Item not found in cart"
}
```

## 8. DELETE /delete-cart/:id

Delete Cart

Request:

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

- params:

```json
{
  "id": "integer"
}
```

Response (200 - OK)

```json
{
  "message": "has been deleted"
}
```

Response (404 - Not Found)

```json
{
  "message": "Item not found in cart"
}
```

## 9. GET /coin

View coin data based on user

Request:

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

Response (200 - OK)

```json
 {
    "id": "bitcoin",
    "rank": "1",
    "symbol": "BTC",
    "name": "Bitcoin",
    "supply": "19685775.0000000000000000",
    "maxSupply": "21000000.0000000000000000",
    "marketCapUsd": "1256522738248.8837577691542050",
    "volumeUsd24Hr": "8887080080.5550044400101018",
    "priceUsd": "63828.9698144413292222",
    "changePercent24Hr": "-4.2354958274545993",
    "vwap24Hr": "64932.9941908043561087",
    "explorer": "https://blockchain.info/"
  },
```

Response (400 - Not Found)

```json
{
  "message": "is already in My Coin"
}
OR
{
  "message": "Invalid coin data"
}

```

## 10. POST /add-coin/:id

add Coin

Request:

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

- params:

```json
{
  "id": "integer"
}
```

Response (201 - OK)

```json
[
  {
    "id": "bitcoin",
    "rank": "93",
    "symbol": "rupiahhh",
    "name": "Bitcoin",
    "supply": "19683600.0000000000000000",
    "maxSupply": "21000000.0000000000000000",
    "marketCapUsd": "1247756274170.5906700666250000",
    "volumeUsd24Hr": "13038562943.3300474390602800",
    "priceUsd": "63390.6538524756990625",
    "changePercent24Hr": "-3.2263609061751343",
    "vwap24Hr": "65124.1514173410174713",
    "explorer": "https://blockchain.info/"
  }
  ...,
]
```

## 11. DELETE /delete-coin/:id

Delete Coin

Request:

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

- params:

```json
{
  "id": "integer"
}
```

Response (200 - OK)

```json
{
  "message": "has been deleted"
}
```

Response (404 - Not Found)

```json
{
  "message": "Item not valid"
}
```

## Global Error

Response (401 - Unauthorized)

```json
{
  "message": "Invalid token"
}
```

Response (403 - Forbidden)

```json
{
  "message": "You are not authorized"
}
```

Response (500 - Internal Server Error)

```json
{
  "message": "Internal server error"
}
```
