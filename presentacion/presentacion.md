# 🖥 Proyecto_ArcadeWeb
## 📋 Descripción del proyecto:
![image](https://user-images.githubusercontent.com/82006611/141215865-ddac2f37-9f8c-43fc-ae05-c5893e26a7a5.png)<br>

El presente proyecto tiene como finalidad desarrollar aplicación web de un modelo de sistema de información que soporte la gestión de proyectos de investigación y mejore los procesos.  <br>
Para este fin la aplicación cuenta con los siguientes módulos:
- **Módulo de gestión de usuarios:**

● Gestión de ingreso al sistema de información. El sistema tendrá las interfaces gráficas para el registro e ingreso a la aplicación. Para el registro se deberá ingresar el correo, identificación, nombre completo y contraseña, además el usuario podrá seleccionar qué tipo de usuario desempeñará en la plataforma (Estudiante, líder o administrador), el usuario quedará registrado en el sistema por defecto con el estado  de pendiente (Independientemente si se registra como administrador, líder o estudiante). Para la autenticación el usuario debe ingresar el correo y la contraseña.

● Gestión de estado de usuarios. El sistema tendrá una interfaz gráfica para que el administrador pueda ver y cambiar el estado de los registrados como administrador, líder y estudiante (Pendiente/Autorizado/No autorizado), un líder puede cambiar el estado de los usuarios registrados como estudiantes (Pendiente/Autorizado). 

● Gestión de perfil. El sistema tendrá una interfaz gráfica para que el investigador o estudiante pueda actualizar los datos personales que ingresó cuando se registró (Incluyendo la contraseña).

- **Módulo de gestión de proyectos:** El sistema tendrá una interfaz gráfica para que los líderes registren los proyectos y otra para que el administrador, líder y estudiante puedan listar y ver los detalles de los proyectos, los líderes tendrán la opción que los direccione a la interfaz de actualizar los proyectos, mientras que los estudiantes podrán realizar la inscripción a los proyectos en los que desean trabajar, y seleccionar el proyecto en el que están trabajando y quieren agregar un nuevo avance.

El proyecto contará con los siguientes atributos: Identificador único del proyecto (Inmutable), nombre del proyecto, objetivos generales, objetivos específicos, presupuesto, fecha de inicio y terminación del proyecto, el documento de identificación y nombre del líder, el estado del proyecto (activo/inactivo) que será por defecto inactivo, y la fase del proyecto (iniciado, en desarrollo, terminado) que será nula por defecto.

- **Módulo de gestión de inscripciones:**  Cómo se mencionó en el módulo de gestión de proyectos los estudiantes podrán inscribirse a un proyecto, si aún no lo están, mediante la interfaz que lista los proyectos presionando un botón que generará la inscripción. El sistema tendrá una interfaz para que los líderes de cada proyecto puedan listar las inscripciones y definir sus estados. Cada inscripción tendrá los siguientes atributos: Identificador único (inmutable), los identificadores del proyecto y estudiante (para relacionarlos), el estado de la inscripción (aceptada/rechazada), la fecha de ingreso, que se pondrá automáticamente cuando el líder actualice el estado de la inscripción a aceptada; y la fecha de egreso, que se pondrá automáticamente cuando la fase del proyecto se actualice a terminada o el estado del proyecto sea actualizado a inactivo.

- **Módulo de gestión de avances:** El sistema tendrá una interfaz para que los estudiantes registren los avances y otra para que los estudiantes y líderes puedan listar los avances, solo los estudiantes podrán actualizar los avances del proyecto en el que están inscritos, y el líder sólo podrá añadir sus observaciones a dicho avance. Cada avance debe contar con los siguientes atributos: Identificador único del avance (inmutable), el identificador del proyecto (para relacionarlo), la fecha del avance, la descripción del avance donde se especifique cuáles fueron los aportes a los objetivos del proyecto, y las observaciones del líder.

⌛️ **Estado del proyecto:** En desarrollo.

## 🛠️ Construido con:

- HTML5
- CSS3
- Javascript

## 💻 Equipo de trabajo ciclo 4
# Integrantes del grupo

Nury Bersey Pulgarin
nuryduque63@gmail.com

Alexander Meza Rincon
alemezrin@yahoo.com

Jefferson Duvan Ramirez Castañeda
jeffersonduvanrami17@gmail.com

Jose Fernando Muñoz Alvarez
chepemual@gmail.com

Alejandro Granada Ospina 
collerx100pre@gmail.com

