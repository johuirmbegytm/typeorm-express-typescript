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
