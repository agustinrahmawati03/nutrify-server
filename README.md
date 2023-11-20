---
runme:
  id: 01HFPHXTXZ0W8AX2YH81CBG5F8
  version: v2.0
---

npm v9.8.1
node v18.18.2

# **API SPECIFICATION**

BASE URL :

## **Sign Up**

**Request** :

- Method : POST
- Endpoint : `(base-url)/auth/signup`
- Header :
  - Content-Type : application/json
  - Accept : application/json
- Body :
  ```json
  {
    "email": "string",
    "username": "string",
    "gender": "string, enum('perempuan','laki-laki')",
    "tinggi": "number",
    "berat": "number",
    "umur": "number",
    "password": "string"
  }
  ```
- Authentication - Bearer Token : `<token key>`
  **Response** :

```json
{
  "message": "success",
  "token": "string",
  "username": "string",
  "email": "string",
  "gender": "string",
  "password": "string encrypt",
  "tinggi": "number",
  "berat": "number",
  "umur": "number",
  "caloriNeeded": "number",
  "carboNeeded": "number",
  "proteinNeeded": "number",
  "fatNeeded": "number"
}
```

## **Sign In**

**Request** :

- Method : POST
- Endpoint : `(base-url)/auth/signin`
- Header :
  - Content-Type : application/json
  - Accept : application/json
- Body :
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- Authentication - Bearer Token : `<token key>`
  **Response** :

```json
{
    "message": "login success, welcome!",
    "token": "string",
    "username": "string",
    "email": "string",
    "gender": "string",
    "status": "string",
    "password": "string encrypt",
    "tinggi": "number",
    "berat": "number",
    "umur": "number",
    "caloriNeeded": "number",
    "carboNeeded": "number",
    "proteinNeeded": "number",
    "fatNeeded": "number"
}
``
```
