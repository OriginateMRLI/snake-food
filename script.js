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

// 添加触摸事件处理
let touchStartX = 0;
let touchStartY = 0;

// 修改触摸事件绑定对象为canvas
canvas.addEventListener('touchstart', e => {
    console.log('触摸开始', e.touches[0]);
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    e.preventDefault();
}, { passive: false });

canvas.addEventListener('touchmove', e => {
    console.log('触摸移动', deltaX, deltaY);
    const touch = e.touches[0];
    // 添加视口偏移计算
    const deltaX = touch.clientX - touchStartX;
    const deltaY = touch.clientY - touchStartY;
    e.preventDefault();

    // 判断滑动方向（阈值设置为30像素防止误触）
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 30) {
        direction.x = deltaX > 0 ? 1 : -1;
        direction.y = 0;
    } else if (Math.abs(deltaY) > 30) {
        direction.x = 0;
        direction.y = deltaY > 0 ? 1 : -1;
    }
}, { passive: false });

// 新增触摸结束事件处理
canvas.addEventListener('touchend', e => {
    touchStartX = 0;
    touchStartY = 0;
});

// 新增：完全禁用页面滚动
document.body.style.overflow = 'hidden';
document.documentElement.style.overflow = 'hidden';

// 游戏主循环
function gameLoop() {
    updateGame();
    drawGame();
}

// 初始化游戏
resetGame();
generateFood();
setInterval(gameLoop, 100);