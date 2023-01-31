<h2 align="center">GameProduct-blog</h2>

### Описание проекта:
Блог игровой-продуктции


### Инструменты разработки

 **Стек:**
 - Python >= 3.10
 - Django == 4.0.5
 - postgresql

## Разработка

##### 1) Клонировать репозиторий

    git clone https://github.com/Isk-Daniar/game_product-blog.git

##### 2) Создать виртуальное окружение

    cd game_product-blog
    
    python3 -m venv venv

##### 3) Активировать виртуальное окружение
    
Linux

    source venv/bin/activate
    
Windows

    ./venv/Scripts/activate

##### 5) Установляем библиотеки 

    pip install -r requirements.txt

##### 4) Выполнить команду для выполнения миграций

    python3 manage.py migrate
    
##### 5) Создать суперпользователя

    python3 manage.py createsuperuser
    
##### 6) Запустить сервер

    python3 manage.py runserver

##### 7) Ссылки

- Сайт http://127.0.0.1:8000/

- Админ панель http://127.0.0.1:8000/admin
