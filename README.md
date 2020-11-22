# Seb-AS
### Administrador de TODOs desarrollado en VueJS que corre sobre Meteor

Este programa permite registrarse como usuario y gestionar una lista de tareas pendientes y marcarlas como terminadas. Se utilizan librerías propias de Meteor para manejar los estados de los usuarios y la suscripción a cambios en la base de datos.

Para docker se utiliza una imagen no oficial pero muy popular, que se encuentra en el repositorio oficial de Docker.

El servidor de Mongo viene integrado en el lanzador de `meteor` en el caso de levantar como desarrollador, mientras que al levantar como usuario se utiliza una versión dockerizada.

### Stack
* VueJS
* MongoDB
* Meteor
* Docker

### Lanzar como usuario
⛔ Se requiere tener [Docker Desktop](https://www.docker.com/products/docker-desktop) (si usas Windows, al instalarlo te dará instrucciones para instalar `WSL`)
```sh
docker-compose up
```

### Lanzar como desarrollador
⛔ Se requiere tener [meteor](https://www.meteor.com/install) (si usas Windows, necesitas el manejador de paquetes [chocolatey](https://chocolatey.org))
```sh
meteor run
```