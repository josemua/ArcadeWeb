# 馃枼 Proyecto_ArcadeWeb
## 馃搵 Descripci贸n del proyecto:
![image](https://user-images.githubusercontent.com/82006611/141215865-ddac2f37-9f8c-43fc-ae05-c5893e26a7a5.png)<br>

El presente proyecto tiene como finalidad desarrollar aplicaci贸n web de un modelo de sistema de informaci贸n que soporte la gesti贸n de proyectos de investigaci贸n y mejore los procesos.  <br>
Para este fin la aplicaci贸n cuenta con los siguientes m贸dulos:
- **M贸dulo de gesti贸n de usuarios:**

鈼? Gesti贸n de ingreso al sistema de informaci贸n. El sistema tendr谩 las interfaces gr谩ficas para el registro e ingreso a la aplicaci贸n. Para el registro se deber谩 ingresar el correo, identificaci贸n, nombre completo y contrase帽a, adem谩s el usuario podr谩 seleccionar qu茅 tipo de usuario desempe帽ar谩 en la plataforma (Estudiante, l铆der o administrador), el usuario quedar谩 registrado en el sistema por defecto con el estado  de pendiente (Independientemente si se registra como administrador, l铆der o estudiante). Para la autenticaci贸n el usuario debe ingresar el correo y la contrase帽a.

鈼? Gesti贸n de estado de usuarios. El sistema tendr谩 una interfaz gr谩fica para que el administrador pueda ver y cambiar el estado de los registrados como administrador, l铆der y estudiante (Pendiente/Autorizado/No autorizado), un l铆der puede cambiar el estado de los usuarios registrados como estudiantes (Pendiente/Autorizado). 

鈼? Gesti贸n de perfil. El sistema tendr谩 una interfaz gr谩fica para que el investigador o estudiante pueda actualizar los datos personales que ingres贸 cuando se registr贸 (Incluyendo la contrase帽a).

- **M贸dulo de gesti贸n de proyectos:** El sistema tendr谩 una interfaz gr谩fica para que los l铆deres registren los proyectos y otra para que el administrador, l铆der y estudiante puedan listar y ver los detalles de los proyectos, los l铆deres tendr谩n la opci贸n que los direccione a la interfaz de actualizar los proyectos, mientras que los estudiantes podr谩n realizar la inscripci贸n a los proyectos en los que desean trabajar, y seleccionar el proyecto en el que est谩n trabajando y quieren agregar un nuevo avance.

El proyecto contar谩 con los siguientes atributos: Identificador 煤nico del proyecto (Inmutable), nombre del proyecto, objetivos generales, objetivos espec铆ficos, presupuesto, fecha de inicio y terminaci贸n del proyecto, el documento de identificaci贸n y nombre del l铆der, el estado del proyecto (activo/inactivo) que ser谩 por defecto inactivo, y la fase del proyecto (iniciado, en desarrollo, terminado) que ser谩 nula por defecto.

- **M贸dulo de gesti贸n de inscripciones:**  C贸mo se mencion贸 en el m贸dulo de gesti贸n de proyectos los estudiantes podr谩n inscribirse a un proyecto, si a煤n no lo est谩n, mediante la interfaz que lista los proyectos presionando un bot贸n que generar谩 la inscripci贸n. El sistema tendr谩 una interfaz para que los l铆deres de cada proyecto puedan listar las inscripciones y definir sus estados. Cada inscripci贸n tendr谩 los siguientes atributos: Identificador 煤nico (inmutable), los identificadores del proyecto y estudiante (para relacionarlos), el estado de la inscripci贸n (aceptada/rechazada), la fecha de ingreso, que se pondr谩 autom谩ticamente cuando el l铆der actualice el estado de la inscripci贸n a aceptada; y la fecha de egreso, que se pondr谩 autom谩ticamente cuando la fase del proyecto se actualice a terminada o el estado del proyecto sea actualizado a inactivo.

- **M贸dulo de gesti贸n de avances:** El sistema tendr谩 una interfaz para que los estudiantes registren los avances y otra para que los estudiantes y l铆deres puedan listar los avances, solo los estudiantes podr谩n actualizar los avances del proyecto en el que est谩n inscritos, y el l铆der s贸lo podr谩 a帽adir sus observaciones a dicho avance. Cada avance debe contar con los siguientes atributos: Identificador 煤nico del avance (inmutable), el identificador del proyecto (para relacionarlo), la fecha del avance, la descripci贸n del avance donde se especifique cu谩les fueron los aportes a los objetivos del proyecto, y las observaciones del l铆der.

鈱涳笍 **Estado del proyecto:** En desarrollo.

## 馃洜锔? Construido con:

- HTML5
- CSS3
- Javascript

## 馃捇 Equipo de trabajo ciclo 4
# Integrantes del grupo

Nury Bersey Pulgarin
nuryduque63@gmail.com

Alexander Meza Rincon
alemezrin@yahoo.com

Jefferson Duvan Ramirez Casta帽eda
jeffersonduvanrami17@gmail.com

Jose Fernando Mu帽oz Alvarez
chepemual@gmail.com

Alejandro Granada Ospina 
collerx100pre@gmail.com

