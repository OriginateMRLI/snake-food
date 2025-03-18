// 初始化游戏变量
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 蛇的初始设置
let snake = [{ x: 200, y: 200 }];
let direction = { x: 0, y: 0 };
let food = { x: 0, y: 0 };
let score = 0;

// 生成食物位置
function generateFood() {
    food.x = Math.floor(Math.random() * 40) * 10;
    food.y = Math.floor(Math.random() * 40) * 10;
}

// 绘制游戏元素
function drawGame() {
    // 清空画布
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 绘制蛇
    ctx.fillStyle = 'lime';
    snake.forEach(segment => ctx.fillRect(segment.x, segment.y, 10, 10));

    // 绘制食物
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(food.x + 5, food.y + 5, 5, 0, Math.PI * 2);
    ctx.fill();
}

// 更新游戏状态
function updateGame() {
    // 计算新的蛇头位置
    const head = {
        x: snake[0].x + direction.x * 10, y: snake[0].y + direction.y * 10
    };
    // 碰撞检测
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        // 只检测边界碰撞
        alert('游戏结束！你的得分是：' + score);
        resetGame();
        return;
    }
    // 检测蛇头是否撞到自身
    if (snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
        alert('游戏结束！你的得分是：' + score);
        resetGame();
        return;
    }

    // 添加新的蛇头
    snake.unshift(head);

    // 检查是否吃到食物
    if (head.x === food.x && head.y === food.y) {
        score++;
        generateFood();
    } else {
        // 移除蛇尾
        snake.pop();
    }
}

// 重置游戏
function resetGame() {
    snake = [{ x: 200, y: 200 }];
    direction = { x: 0, y: 0 };
    score = 0;
    generateFood();
}

// 处理键盘输入
window.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowUp': if (direction.y === 0) direction = { x: 0, y: -1 }; break;
        case 'ArrowDown': if (direction.y === 0) direction = { x: 0, y: 1 }; break;
        case 'ArrowLeft': if (direction.x === 0) direction = { x: -1, y: 0 }; break;
        case 'ArrowRight': if (direction.x === 0) direction = { x: 1, y: 0 }; break;
    }
});

// 游戏主循环
function gameLoop() {
    updateGame();
    drawGame();
}

// 初始化游戏
resetGame();
generateFood();
setInterval(gameLoop, 100);