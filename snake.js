const canvas = document.getElementById('game');//Canvas - холст элемент для создания графики ctx(context) элемент синтаксиса
const ctx = canvas.getContext("2d");

const ground = new Image();//Это что объект?
ground.src = 'img/field.png'

const foodImg = new Image();//Это что объект?
foodImg.src = 'img/apple.png'

let box = 32;//параметры яйчейки в поле

let score = 0;

let food = {
    x: Math.floor((Math.random() * 17 + 1)) * box,//для получения нашей еды в случайном месте, мы используем класс с методом Math.random(), диапазон его от 0 до 1 поэтому *17 + 1(кол-во box), для округления значений мы исп класс с методом MathFloor
    y: Math.floor((Math.random() * 15 + 3)) * box,//+3 указывем что бы еда не выходила за границы поля
};
//змейка

let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box,
};

document.addEventListener('keydown', direction);//привязываем змейку к кнопкам
let dir;
function direction(event) {
        if (event.keyCode == 37 && dir != 'right')//функция в которой мы обращаемся к кодам кнопок(гуглить!) и доп. проверка/условие на запрет движения в противоположном направлении
        dir = 'left';
    else if (event.keyCode == 38 && dir != 'down')
        dir = 'up';
    else if (event.keyCode == 39 && dir != 'left')
        dir = 'right';
    else if (event.keyCode == 40 && dir != 'up')
        dir = 'down';
}
 function eatTail(head, arr) {//запрет самопересечения змейки
   for(let i = 0; i < arr.length; i++) {
       if(head.x == arr[i].x && head.y == arr[i].y)
       clearInterval(game);//game over
   }
 }

function drawGame() {
    ctx.drawImage(ground, 0, 0);//функция глобальная которая позволяет нарисовать картинке в определенных координатах
    ctx.drawImage(foodImg, food.x, food.y); // рисует еду в браузере, обращаясь к координатам

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? 'green' : 'red';//для создания цвета змейки, добавленые эл-ты будут красными
        ctx.fillRect(snake[i].x, snake[i].y, box, box);//сам квадрат змейки
    }
    ctx.fillStyle = "white";//указываем положени шрифт и т.п. score
    ctx.font = "50px Times New Roman"
    ctx.fillText(score, box * 2.5, box * 1.7);
    //движение змейки
    let snakeX = snake[0].x;//переменная для координаты
    let snakeY = snake[0].y;

    if(snakeX == food.x && snakeY == food.y) {//ест food
        score++;
        food = {
            x: Math.floor((Math.random() * 17 + 1)) * box,//создаю еду в новом месте
            y: Math.floor((Math.random() * 15 + 3)) * box,
        };
    }else {
        snake.pop();//если нет то последний элемент из массива не удаляется
    }

    if(snake < box || snakeX > box * 17 // недопускаем выход змейки за пределы поля
        || snakeY < 3 * box || snakeY > box * 17)
        clearInterval(game);// game over

    if (dir == ('left')) snakeX -= box;//движение
    if (dir == ('right')) snakeX += box;
    if (dir == ('up')) snakeY -= box;
    if (dir == ('down')) snakeY += box;

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    eatTail (newHead, snake);// вызов ф-и самопоедание

    snake.unshift(newHead);//добавляем в начало массива елемент к змейке

}

let game = setInterval(drawGame, 100);//метод планирования вызова для отображения поля игры


