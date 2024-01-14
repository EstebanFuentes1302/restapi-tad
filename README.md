
# REST API - TALLER DE APLICACIONES DISTRIBUIDAS

URL API: https://tad-store-api.azurewebsites.net/api/





## API Reference

#### Get All Users

```
  GET /api/users
```

#### Get User

```
  GET /api/users/${dni}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `dni`      | `string` | **Required**. User's DNI |

#### Delete User

```
  DELETE /api/users/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `dni`      | `string` | **Required**. User's DNI |

#### Add User

```
  POST /api/users/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `dni`      | `String`         | **Required**. User's DNI                   |
| `name`     | `String`         | User's Name        |
| `user`     | `String`         | Username                      |
| `password` | `String`         | Password |
| `role`     | `Integer`        | Role's Code                          | 
