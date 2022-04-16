# Evaluación de unidad 2 CIISA

Este proyecto, utiliza sistema MVC, modelo-vista-controlador, y acompañado de BDD mysql, con servicio externo de Planetscale (https://planetscale.com/)

Luego de clonar o descargar el repositorio;
```
npm install
```

Para correr el proyecto:

```
npm start
```

Para entorno de desarrollo:

```
npm run dev
```
Utilización del proyecto
---

### Home

Aquí se verán todos los vehículos ingresados en base de datos al momento de la carga, mediante la opción de una variable que cuenta el total de los registros (const totalvehicles = cars.length), se logra pintar la cantidad en esta vista
### Agregar vehículo

Acá se deben ingresar los datos solicitados, son todos obligatorios a excepción de la imagen, en este campo, se debe pegar el enlace de una imagen web, el máximo largo es 255 caracteres.