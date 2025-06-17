document.addEventListener('DOMContentLoaded', () => {
    // 分数变量定义
    let gameScore = 0;       // 结算分数
    let objectScore = 0;     // 藏品分数
    let emergencyScore = 0;  // 紧急分数
    let tempScore = 0;       // 临招分数
    let finalRate = 1.0;     // 倍率分数
    let moneyScore = 0;      // 存钱分数
    let extendScore = 0;     // 继承分数
    let finalScore = 0;      // 最终分数

    // 所有输入框和按钮
    const gameInput = document.getElementById('scoreInput');
    const objectInput = document.querySelector('.object input');
    const emergencyInputs = document.querySelectorAll('.emergency input');
    const tempInputs = document.querySelectorAll('.temp input');
    const moneyInput = document.querySelector('.money input');
    const extendInput = document.querySelector('.extend input');

    // 所有按钮
    const addGameScoreBtn = document.getElementById('addScore');
    const addObjectScoreBtn = document.querySelector('.object .add-button');
    const addEmergencyScoreBtn = document.querySelector('.emergency .add-button');
    const addTempScoreBtn = document.querySelector('.temp .add-button');
    const addRateBtn = document.querySelector('.rate .add-button');
    const addMoneyScoreBtn = document.querySelector('.money .add-button');
    const addExtendScoreBtn = document.querySelector('.extend .add-button');
    const showFinalScoreBtn = document.querySelector('.final .add-button');

    // 所有显示元素
    const gameScoreDisplay = document.querySelector('.jiesuan .score-display');
    const objectScoreDisplay = document.querySelector('.object .score-display');
    const emergencyScoreDisplay = document.querySelector('.emergency .score-display');
    const tempScoreDisplay = document.querySelector('.temp .score-display');
    const rateDisplay = document.querySelector('.rate .score-display');
    const moneyScoreDisplay = document.querySelector('.money .score-display');
    const extendScoreDisplay = document.querySelector('.extend .score-display');
    const finalScoreDisplay = document.querySelector('.final .final-score');
    const extraScoreDisplay = document.querySelector('.final .extra-score');
    const baseScoreDisplay = document.querySelector('.final .game-score');

    // 所有重置按钮
    const resetGameBtn = document.querySelector('.jiesuan .reset-button');
    const resetObjectBtn = document.querySelector('.object .reset-button');
    const resetEmergencyBtn = document.querySelector('.emergency .reset-button');
    const resetTempBtn = document.querySelector('.temp .reset-button');
    const resetMoneyBtn = document.querySelector('.money .reset-button');
    const resetExtendBtn = document.querySelector('.extend .reset-button');
    const resetRateBtn = document.querySelector('.rate .reset-button');
    const resetAllBtn = document.querySelector('.final .reset-button');

    // 更新显示函数
    function updateAllDisplays() {
        gameScoreDisplay.textContent = gameScore;
        objectScoreDisplay.textContent = objectScore;
        emergencyScoreDisplay.textContent = emergencyScore;
        tempScoreDisplay.textContent = tempScore;
        rateDisplay.textContent = finalRate;
        moneyScoreDisplay.textContent = moneyScore;
        extendScoreDisplay.textContent = extendScore;
        
        // 计算额外分数
        const extraScore = objectScore + emergencyScore + tempScore + moneyScore + extendScore;
        extraScoreDisplay.textContent = extraScore;
        baseScoreDisplay.textContent = gameScore;
        finalScoreDisplay.textContent = finalScore;
    }

    // 结算分数计算
    addGameScoreBtn.addEventListener('click', () => {
        const score = parseInt(gameInput.value);
        if (!isNaN(score) && score >= 0) {
            gameScore = score;
            gameInput.value = '';
            calculateFinalScore();
            updateAllDisplays();
        } else {
            alert('请输入有效的非负整数！');
        }
    });

    // 藏品分数计算（示例：每个藏品10分）
    addObjectScoreBtn.addEventListener('click', () => {
        const count = parseInt(objectInput.value);
        if (!isNaN(count) && count >= 0) {
            objectScore = count * 10;
            objectInput.value = '';
            calculateFinalScore();
            updateAllDisplays();
        }
    });

    // 紧急作战分数计算（示例：一层5分，二层10分，以此类推）
    addEmergencyScoreBtn.addEventListener('click', () => {
        let total = 0;
        emergencyInputs.forEach((input, index) => {
            const count = parseInt(input.value) || 0;
            total += count * (5 * (index + 1));
            input.value = '';
        });
        emergencyScore = total;
        calculateFinalScore();
        updateAllDisplays();
    });

    // 临时招募分数计算（示例：四星20分，五星50分，六星100分）
    addTempScoreBtn.addEventListener('click', () => {
        let total = 0;
        const rates = [20, 50, 100];
        tempInputs.forEach((input, index) => {
            const count = parseInt(input.value) || 0;
            total += count * rates[index];
            input.value = '';
        });
        tempScore = total;
        calculateFinalScore();
        updateAllDisplays();
    });

    // 倍率设置（示例：1.0-2.0之间）
    addRateBtn.addEventListener('click', () => {
        const rate = prompt('请输入倍率（1.0-2.0）：', '1.0');
        const numRate = parseFloat(rate);
        if (!isNaN(numRate) && numRate >= 1.0 && numRate <= 2.0) {
            finalRate = numRate;
            calculateFinalScore();
            updateAllDisplays();
        } else {
            alert('请输入有效的倍率！');
        }
    });

    // 存钱分数计算（示例：每1000分1分）
    addMoneyScoreBtn.addEventListener('click', () => {
        const amount = parseInt(moneyInput.value);
        if (!isNaN(amount) && amount >= 0) {
            moneyScore = Math.floor(amount / 1000);
            moneyInput.value = '';
            calculateFinalScore();
            updateAllDisplays();
        }
    });

    // 继承分数计算
    addExtendScoreBtn.addEventListener('click', () => {
        const score = parseInt(extendInput.value);
        if (!isNaN(score) && score >= 0) {
            extendScore = score;
            extendInput.value = '';
            calculateFinalScore();
            updateAllDisplays();
        }
    });

    // 计算最终分数
    function calculateFinalScore() {
        // 基础分数 = 结算分数 + 额外分数
        const baseScore = gameScore + objectScore + emergencyScore + tempScore + moneyScore + extendScore;
        // 最终分数 = 基础分数 * 倍率
        finalScore = Math.floor(baseScore * finalRate);
    }

    // 重置结算分数
    resetGameBtn.addEventListener('click', () => {
        gameScore = 0;
        gameInput.value = '';
        calculateFinalScore();
        updateAllDisplays();
    });

    // 重置藏品分数
    resetObjectBtn.addEventListener('click', () => {
        objectScore = 0;
        objectInput.value = '';
        calculateFinalScore();
        updateAllDisplays();
    });

    // 重置紧急作战分数
    resetEmergencyBtn.addEventListener('click', () => {
        emergencyScore = 0;
        emergencyInputs.forEach(input => input.value = '');
        calculateFinalScore();
        updateAllDisplays();
    });

    // 重置临时招募分数
    resetTempBtn.addEventListener('click', () => {
        tempScore = 0;
        tempInputs.forEach(input => input.value = '');
        calculateFinalScore();
        updateAllDisplays();
    });

    // 重置存钱分数
    resetMoneyBtn.addEventListener('click', () => {
        moneyScore = 0;
        moneyInput.value = '';
        calculateFinalScore();
        updateAllDisplays();
    });

    // 重置继承分数
    resetExtendBtn.addEventListener('click', () => {
        extendScore = 0;
        extendInput.value = '';
        calculateFinalScore();
        updateAllDisplays();
    });

    // 重置倍率
    resetRateBtn.addEventListener('click', () => {
        finalRate = 1.0;
        calculateFinalScore();
        updateAllDisplays();
    });

    // 重置所有
    resetAllBtn.addEventListener('click', () => {
        // 重置所有变量
        gameScore = 0;
        objectScore = 0;
        emergencyScore = 0;
        tempScore = 0;
        finalRate = 1.0;
        moneyScore = 0;
        extendScore = 0;
        finalScore = 0;

        // 清空所有输入框
        gameInput.value = '';
        objectInput.value = '';
        emergencyInputs.forEach(input => input.value = '');
        tempInputs.forEach(input => input.value = '');
        moneyInput.value = '';
        extendInput.value = '';

        // 更新显示
        calculateFinalScore();
        updateAllDisplays();
    });

    // 初始化显示
    updateAllDisplays();
}); 