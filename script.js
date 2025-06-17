document.addEventListener('DOMContentLoaded', () => {
    // 分数变量定义
    let gameScore = 0;       // 结算分数
    let objectScore = 0;     // 藏品分数
    let emergencyScore = 0;  // 紧急分数
    let tempScore = 0;       // 临招分数
    let finalRate = 1.0;     // 倍率分数
    let moneyScore = 0;      // 存钱分数
    let extendScore = 0;     // 继承分数
    let secretScore = 0;     // 隐藏分数
    let endingScore = 0;     // 结局分数
    let finalScore = 0;      // 最终分数

    // 所有输入框和按钮
    const gameInput = document.getElementById('scoreInput');
    const objectInput = document.querySelector('.object input');
    const emergencyInputs = document.querySelectorAll('.emergency input');
    const tempInputs = document.querySelectorAll('.temp input');
    const moneyInput = document.querySelector('.money input');
    const extendInput = document.querySelector('.extend input');
    const secretInput = document.querySelector('.secret input');
    const noMissCheckbox = document.getElementById('noMissCheckbox');

    // 所有按钮
    const addGameScoreBtn = document.getElementById('addScore');
    const addObjectScoreBtn = document.querySelector('.object .add-button');
    const addEmergencyScoreBtn = document.querySelector('.emergency .add-button');
    const addTempScoreBtn = document.querySelector('.temp .add-button');
    const addRateBtn = document.querySelector('.rate .add-button');
    const addMoneyScoreBtn = document.querySelector('.money .add-button');
    const addExtendScoreBtn = document.querySelector('.extend .add-button');
    const addSecretScoreBtn = document.querySelector('.secret .add-button');
    const showFinalScoreBtn = document.querySelector('.final .add-button');

    // 所有显示元素
    const gameScoreDisplay = document.querySelector('.jiesuan .score-display');
    const objectScoreDisplay = document.querySelector('.object .score-display');
    const emergencyScoreDisplay = document.querySelector('.emergency .score-display');
    const tempScoreDisplay = document.querySelector('.temp .score-display');
    const rateDisplay = document.querySelector('.rate .score-display');
    const moneyScoreDisplay = document.querySelector('.money .score-display');
    const extendScoreDisplay = document.querySelector('.extend .score-display');
    const secretScoreDisplay = document.querySelector('.secret .score-display');
    const finalScoreDisplay = document.querySelector('.final .final-score');
    const extraScoreDisplay = document.querySelector('.final .extra-score');
    const baseScoreDisplay = document.querySelector('.final .game-score');
    const finalRateDisplay = document.querySelector('.final .rate-display');

    // 所有重置按钮
    const resetGameBtn = document.querySelector('.jiesuan .reset-button');
    const resetObjectBtn = document.querySelector('.object .reset-button');
    const resetEmergencyBtn = document.querySelector('.emergency .reset-button');
    const resetTempBtn = document.querySelector('.temp .reset-button');
    const resetMoneyBtn = document.querySelector('.money .reset-button');
    const resetExtendBtn = document.querySelector('.extend .reset-button');
    const resetSecretBtn = document.querySelector('.secret .reset-button');
    const resetRateBtn = document.querySelector('.rate .reset-button');
    const resetAllBtn = document.querySelector('.final .reset-button');

    // 结局相关元素
    const endingCompleteCheckboxes = document.querySelectorAll('.ending-complete');
    const endingConfusedCheckboxes = document.querySelectorAll('.ending-confused');
    const endingScrollCheckboxes = document.querySelectorAll('.ending-scroll');
    const addEndingScoreBtn = document.querySelector('.ending .add-button');
    const resetEndingBtn = document.querySelector('.ending .reset-button');
    const endingScoreDisplay = document.querySelector('.ending .score-display');

    // 设置2结局默认勾选且禁用
    const ending2Complete = document.getElementById('ending2-complete');
    ending2Complete.checked = true;
    ending2Complete.disabled = true;
    // 启用二结局的思维混乱和滚动先祖勾选框
    const ending2Confused = document.getElementById('ending2-confused');
    const ending2Scroll = document.getElementById('ending2-scroll');
    ending2Confused.disabled = false;
    ending2Scroll.disabled = false;

    // 更新显示函数
    function updateAllDisplays() {
        gameScoreDisplay.textContent = gameScore;
        objectScoreDisplay.textContent = objectScore;
        emergencyScoreDisplay.textContent = emergencyScore;
        tempScoreDisplay.textContent = tempScore;
        rateDisplay.textContent = finalRate;
        moneyScoreDisplay.textContent = moneyScore;
        extendScoreDisplay.textContent = extendScore;
        secretScoreDisplay.textContent = secretScore;
        endingScoreDisplay.textContent = endingScore;
        
        // 计算额外分数
        const extraScore = objectScore + emergencyScore + tempScore + moneyScore + extendScore + secretScore + endingScore;
        extraScoreDisplay.textContent = extraScore;
        baseScoreDisplay.textContent = gameScore;
        finalRateDisplay.textContent = finalRate;
        finalScoreDisplay.textContent = finalScore;
    }

    // 结算分数计算
    addGameScoreBtn.addEventListener('click', () => {
        const score = parseInt(gameInput.value);
        if (!isNaN(score) && score >= 0) {
            gameScore += score;  // 累加而不是覆盖
            gameInput.value = '';
            calculateFinalScore();
            updateAllDisplays();
        } else {
            alert('请输入有效的非负整数！');
        }
    });

    // 藏品分数计算
    addObjectScoreBtn.addEventListener('click', () => {
        const count = parseInt(objectInput.value);
        if (!isNaN(count) && count >= 0) {
            objectScore += count * 5; // 每个藏品5分
            objectInput.value = '';
            calculateFinalScore();
            updateAllDisplays();
        }
    });

    // 紧急作战分数计算
    addEmergencyScoreBtn.addEventListener('click', () => {
        let total = 0;
        const rates = [10, 10, 15, 25, 40, 50]; // 一二层，三层，四层，五层，六层
        emergencyInputs.forEach((input, index) => {
            const count = parseInt(input.value) || 0;
            total += count * rates[index];
            input.value = '';
        });
        emergencyScore += total;  // 累加而不是覆盖
        calculateFinalScore();
        updateAllDisplays();
    });

    // 临时招募分数计算
    addTempScoreBtn.addEventListener('click', () => {
        let total = 0;
        const rates = [30, 30, 50]; // 四星30分，五星30分，六星50分
        tempInputs.forEach((input, index) => {
            const count = parseInt(input.value) || 0;
            total += count * rates[index];
            input.value = '';
        });
        tempScore += total;  // 累加而不是覆盖
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

    // 存钱分数计算
    addMoneyScoreBtn.addEventListener('click', () => {
        const amount = parseInt(moneyInput.value);
        if (!isNaN(amount) && amount >= 0) {
            moneyScore += amount * 10; // 存1块钱10分
            moneyInput.value = '';
            calculateFinalScore();
            updateAllDisplays();
        }
    });

    // 继承分数计算
    addExtendScoreBtn.addEventListener('click', () => {
        const score = parseInt(extendInput.value);
        if (!isNaN(score) && score >= 0) {
            extendScore += score;  // 累加而不是覆盖
            extendInput.value = '';
            calculateFinalScore();
            updateAllDisplays();
        }
    });

    // 隐藏分数计算
    addSecretScoreBtn.addEventListener('click', () => {
        const amount = parseInt(secretInput.value);
        if (!isNaN(amount) && amount >= 0) {
            secretScore += amount * 50; // 每个50分
            // 如果勾选了全局无漏，额外加100分
            if (noMissCheckbox.checked) {
                secretScore += 100;
                noMissCheckbox.checked = false; // 重置勾选框
            }
            secretInput.value = '';
            calculateFinalScore();
            updateAllDisplays();
        }
    });

    // 计算最终分数
    function calculateFinalScore() {
        // 基础分数 = 结算分数 + 额外分数
        const baseScore = gameScore + objectScore + emergencyScore + tempScore + moneyScore + extendScore + endingScore;
        // 最终分数 = 基础分数 * 倍率
        finalScore = Math.floor(baseScore * finalRate);
    }

    // 结局勾选框状态管理
    endingCompleteCheckboxes.forEach((checkbox, index) => {
        checkbox.addEventListener('change', () => {
            const confusedCheckbox = endingConfusedCheckboxes[index];
            const scrollCheckbox = endingScrollCheckboxes[index];
        
            // 启用/禁用思维混乱和滚动先祖
            confusedCheckbox.disabled = !checkbox.checked;
            scrollCheckbox.disabled = !checkbox.checked;
        
            // 如果取消选中，同时取消思维混乱和滚动先祖
            if (!checkbox.checked) {
                confusedCheckbox.checked = false;
                scrollCheckbox.checked = false;
            }

            // 三结局和四结局互斥
            if (index === 1 && checkbox.checked) { // 三结局
                endingCompleteCheckboxes[2].checked = false; // 取消四结局
                endingConfusedCheckboxes[2].checked = false;
                endingScrollCheckboxes[2].checked = false;
                endingConfusedCheckboxes[2].disabled = true; // 禁用四结局的混乱框、滚动框
                endingScrollCheckboxes[2].disabled = true;
            } else if (index === 2 && checkbox.checked) { // 四结局
                endingCompleteCheckboxes[1].checked = false; // 取消三结局
                endingConfusedCheckboxes[1].checked = false;
                endingScrollCheckboxes[1].checked = false;
                endingConfusedCheckboxes[1].disabled = true; // 禁用三结局的混乱框、滚动框
                endingScrollCheckboxes[1].disabled = true;
            }
        });
    });

    // 添加结局分数
    addEndingScoreBtn.addEventListener('click', () => {
        let total = 0;
        const endingStates = Array.from(endingCompleteCheckboxes).map(checkbox => checkbox.checked);
        console.log('结局状态:', endingStates);
        
        // 基础分数和特殊组合加分
        if (endingStates[1] && endingStates[3]) { // 同时完成3、5结局
            total += 250;
            console.log('2+3+5结局: +250分');
        } else if (endingStates[2] && endingStates[3]) { // 同时完成4、5结局
            total += 500;
            console.log('2+4+5结局: +500分');
        } else if (endingStates[2]) { // 单4结局
            total += 50;
            console.log('2+4结局: +50分');
        } else if (endingStates[3]) { // 单5结局
            total += 100;
            console.log('2+5结局: +100分');
        }
        
        // 混乱加分
        const confusedScores = [100, 50, 200, 400];
        endingConfusedCheckboxes.forEach((checkbox, index) => {
            if (checkbox.checked) {
                total += confusedScores[index];
                console.log(`结局${index + 2}混乱: +${confusedScores[index]}分`);
            }
        });
        
        // 滚动加分
        const scrollScores = [200, 100, 400, 800];
        endingScrollCheckboxes.forEach((checkbox, index) => {
            if (checkbox.checked) {
                total += scrollScores[index];
                console.log(`结局${index + 2}滚动: +${scrollScores[index]}分`);
            }
        });

        console.log('总分:', total);
        endingScore += total;
        calculateFinalScore();
        updateAllDisplays();
    });

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

    // 重置隐藏分数
    resetSecretBtn.addEventListener('click', () => {
        secretScore = 0;
        secretInput.value = '';
        noMissCheckbox.checked = false; // 重置勾选框
        calculateFinalScore();
        updateAllDisplays();
    });

    // 重置倍率
    resetRateBtn.addEventListener('click', () => {
        finalRate = 1.0;
        calculateFinalScore();
        updateAllDisplays();
    });

    // 重置结局分数
    resetEndingBtn.addEventListener('click', () => {
        endingScore = 0;
        // 保持2结局勾选，并启用其混乱和滚动框
        endingCompleteCheckboxes.forEach((checkbox, index) => {
            if (index === 0) { // 2结局
                checkbox.checked = true;
                endingConfusedCheckboxes[index].disabled = false;
                endingScrollCheckboxes[index].disabled = false;
            } else { // 其他结局
                checkbox.checked = false;
                endingConfusedCheckboxes[index].disabled = true;
                endingScrollCheckboxes[index].disabled = true;
            }
        });
        // 重置所有混乱和滚动框的选中状态
        endingConfusedCheckboxes.forEach(checkbox => checkbox.checked = false);
        endingScrollCheckboxes.forEach(checkbox => checkbox.checked = false);
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
        secretScore = 0;
        endingScore = 0;
        finalScore = 0;

        // 清空所有输入框和勾选框
        gameInput.value = '';
        objectInput.value = '';
        emergencyInputs.forEach(input => input.value = '');
        tempInputs.forEach(input => input.value = '');
        moneyInput.value = '';
        extendInput.value = '';
        secretInput.value = '';
        noMissCheckbox.checked = false;
        endingCompleteCheckboxes.forEach(checkbox => checkbox.checked = false);
        endingConfusedCheckboxes.forEach(checkbox => checkbox.checked = false);
        endingScrollCheckboxes.forEach(checkbox => checkbox.checked = false);

        // 更新显示
        calculateFinalScore();
        updateAllDisplays();
    });

    // 初始化显示
    updateAllDisplays();
}); 