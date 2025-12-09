# Лабораторно-практична робота №4
## Дослідження бойлерплейту бекенд-додатку
### Мета: Отримати практичні навички розгортання, запуску та перевірки готового контейнеризованого бекенд-проєкту, включаючи роботу з початковими даними та механізмами авторизації.

1.	Клоную репозиторій та, дотримуючись інструкцій з README.md запускаю проєкт однією командою через Docker Compose

  ![1](https://github.com/johuirmbegytm/typeorm-express-typescript/blob/main/images/4/1.png)

  ![2](https://github.com/johuirmbegytm/typeorm-express-typescript/blob/main/images/4/2.png)

  ![3](https://github.com/johuirmbegytm/typeorm-express-typescript/blob/main/images/4/3.png)

  ![4](https://github.com/johuirmbegytm/typeorm-express-typescript/blob/main/images/4/4.png)

  Вигляд в браузері за адресою: http://localhost:4000

2.	Перевіряю бази даних.

  За допомогою pgAdmin підключаюся до бази даних, що працює у контейнері. Переконуюсь, що проєкт не тільки успішно створив таблиці, але й наповнив їх початковими даними (сідами).

  ![5](https://github.com/johuirmbegytm/typeorm-express-typescript/blob/main/images/4/5.png)

  Створюємо міграції та сід, за допомогою команд:

  ![6](https://github.com/johuirmbegytm/typeorm-express-typescript/blob/main/images/4/6.png)

  ![7](https://github.com/johuirmbegytm/typeorm-express-typescript/blob/main/images/4/7.png)

  ![8](https://github.com/johuirmbegytm/typeorm-express-typescript/blob/main/images/4/8.png)

  ![9](https://github.com/johuirmbegytm/typeorm-express-typescript/blob/main/images/4/9.png)

3.	Тестування API. Використовуючи надану в репозиторії Postman-колекцію, тестуємо ендпоінти додатку.

  ![10](https://github.com/johuirmbegytm/typeorm-express-typescript/blob/main/images/4/10.png)

  ![11](https://github.com/johuirmbegytm/typeorm-express-typescript/blob/main/images/4/11.png)

  Використовуємо отриманий токен для надсилання запитів до захищених ендпонітів, щоб перевірити їхню працездатність 

  ![12](https://github.com/johuirmbegytm/typeorm-express-typescript/blob/main/images/4/12.png)

  ![13](https://github.com/johuirmbegytm/typeorm-express-typescript/blob/main/images/4/13.png)

# Лабораторно-практична робота №5
## Розширення бекенд-додатку власними сутностями та реалізація REST API
### Мета: Розвинути навички проектування та реалізації серверної логіки, інтегрувавши проєкт бази даних з курсової роботи у повноцінний бекенд-додаток. Навчитись створювати пов'язані сутності за допомогою TypeORM, керувати структурою БД через міграції та будувати REST API для роботи з реляційними даними.
### Завдання: Базуючись на boilerplate-проєкті, який ви розгорнули на попередньому занятті, вам необхідно розширити його функціонал, ви маєте реалізувати сутності з вашої курсової роботи з проектування баз даних.

1. Створення сутностей та зв'язків  
У нашому проєкті створюємо класи-сутності (entities):
*	Employee
*	Position

Employee.ts:
```ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Position } from '../position';

@Entity('employee')
export class Employee {
  @PrimaryGeneratedColumn({ name: 'id_employee' })
  id_employee: number;

  @Column({
    length: 50,
  })
  firstname: string;

  @Column({
    length: 50,
  })
  lastname: string;

  @Column({
    length: 50,
  })
  patronymic: string;

  @Column({
    length: 20,
  })
  phone: string;

  @Column({
    type: 'date',
  })
  hire_date: Date;

  // Связь с таблицей Position
  // Поле в БД будет называться 'id_position' благодаря декоратору @JoinColumn
  @ManyToOne(() => Position)
  @JoinColumn({ name: 'id_position' })
  position: Position;
}
```

Position.ts:

```ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('position')
export class Position {
  @PrimaryGeneratedColumn({ name: 'id_position' })
  id_position: number;

  @Column({
    length: 50,
  })
  name: string;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
  })
  salary: string; // Используем string для numeric, чтобы сохранить точность (стандарт TypeORM)
}
```
2. Генерація та застосування міграцій  
Створюємо нову міграцію Entities

  ![1](https://github.com/johuirmbegytm/typeorm-express-typescript/blob/main/images/5/1.png)

  ![2](https://github.com/johuirmbegytm/typeorm-express-typescript/blob/main/images/5/2.png)

Генеруємо нові міграції для створених сутностей

  ![3](https://github.com/johuirmbegytm/typeorm-express-typescript/blob/main/images/5/3.png)

Запускаємо міграції, щоб оновити структуру нашої бази даних:

  ![4](https://github.com/johuirmbegytm/typeorm-express-typescript/blob/main/images/5/4.png)

  ![5](https://github.com/johuirmbegytm/typeorm-express-typescript/blob/main/images/5/5.png)

3. Реалізація REST API  
Створюємо контролер для сутності Employee. Створюємо нову папку employee в src/controllers

  ![6](https://github.com/johuirmbegytm/typeorm-express-typescript/blob/main/images/5/6.png)

Створюємо ендпоінти для employee, а саме файл employee.ts в src/routes/v1

  ![7](https://github.com/johuirmbegytm/typeorm-express-typescript/blob/main/images/5/7.png)

Повторюємо для інших сутностей

Підключення ендпоїнтів:

  ![8](https://github.com/johuirmbegytm/typeorm-express-typescript/blob/main/images/5/8.png)

4. Тестування API  
Доповнюємо нашу колекцію в Postman новими запитами  
Отримуємо список працівників

  ![9](https://github.com/johuirmbegytm/typeorm-express-typescript/blob/main/images/5/9.png)

Отримуємо список посад   

  ![10](https://github.com/johuirmbegytm/typeorm-express-typescript/blob/main/images/5/10.png)
  

