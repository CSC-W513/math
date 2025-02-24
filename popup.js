// 在文件開頭添加全局變量來追踪所有已使用的分數組合
let usedFractionCombinations = new Set();

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function() {
        // 根據按鈕的ID生成題目
        generateQuestions(this.id);
    });
});

function generateQuestions(selectedType) {
    // 在生成新題目時重置已使用的組合
    usedFractionCombinations = new Set();
    let questions = [];

    for (let i = 0; i < 30; i++) {
        let num1, num2, num3; // 重新定義 num3 變數
            switch (selectedType) {
            case 'linearEquation': // 一元一次方程式
            let num4, num5, num6;
                do {
                    num4 = Math.floor(Math.random() * 20) + 1; // 生成1到20的數字
                    num5 = Math.floor(Math.random() * 20) - 10; // 生成-10到9的數字
                    num6 = Math.floor(Math.random() * 20) + 1; // 生成1到20的數字
                } while ((num6 - num5) % num4 !== 0); // 確保 x 為整數
                questions.push({
                    question: `${i + 1}. ${num4 < 0 ? `(${num4})` : num4}x + ${num5 < 0 ? `(${num5})` : num5} = ${num6}`, // 將負數加上括號
                    answer: (num6 - num5) / num4 // 計算 x 的值
                });
                break;
            case 'quadraticEquation': // 一元二次方程式
            let num7, num8, num9;
                do {
                    num7 = Math.floor(Math.random() * 5) + 1; // 生成1到5的數字
                    num8 = Math.floor(Math.random() * 10) - 5; // 生成-5到4的數字
                    num9 = Math.floor(Math.random() * 10) - 5; // 生成-5到4的數字
                } while (num8 * num8 - 4 * num7 * num9 < 0 || (num8 % (2 * num7) !== 0 && num9 % num7 !== 0)); // 確保有整數解
                questions.push({
                    question: `${i + 1}. ${num7}x² + ${num8}x + ${num9} = 0`,
                    answer: `x = ${(-num8 + Math.sqrt(num8 * num8 - 4 * num7 * num9)) / (2 * num7)}, x = ${(-num8 - Math.sqrt(num8 * num8 - 4 * num7 * num9)) / (2 * num7)}`
                });
                break;
            case 'threeTermsAdd': // 三項正負數加法
            let num10, num11, num12;
                num10 = Math.floor(Math.random() * 50) - 10; // 生成-10到39的數字
                num11 = Math.floor(Math.random() * 50) - 10; // 生成-10到39的數字
                num12 = Math.floor(Math.random() * 50) - 10; // 生成-10到39的數字
                // 將負數加上括號
                questions.push({
                    question: `${i + 1}. ${num10 < 0 ? `(${num10})` : num10} + ${num11 < 0 ? `(${num11})` : num11} + ${num12 < 0 ? `(${num12})` : num12} =`,
                    answer: num10 + num11 + num12
                });
                break;
            case 'threeTermsSubtract': // 三項正負數減法
            let num13, num14, num15;
                num13 = Math.floor(Math.random() * 50) - 10; // 生成-10到39的數字
                num14 = Math.floor(Math.random() * 50) - 10; // 生成-10到39的數字
                num15 = Math.floor(Math.random() * 50) - 10; // 生成-10到39的數字
                // 將負數加上括號
                questions.push({
                    question: `${i + 1}. ${num13 < 0 ? `(${num13})` : num13} - ${num14 < 0 ? `(${num14})` : num14} - ${num15 < 0 ? `(${num15})` : num15} =`,
                    answer: num13 - num14 - num15
                });
                break;
            case 'twoVariableEquation': // 二元一次方程式
                let a1 = Math.floor(Math.random() * 10) + 1; // 生成1到10的數字
                let b1 = Math.floor(Math.random() * 10) + 1; // 生成1到10的數字
                let c1 = Math.floor(Math.random() * 20) + 1; // 生成1到20的數字
                let a2 = Math.floor(Math.random() * 10) + 1; // 生成1到10的數字
                let b2 = Math.floor(Math.random() * 10) + 1; // 生成1到10的數字
                let c2 = Math.floor(Math.random() * 20) + 1; // 生成1到20的數字
            
                // 使用克拉默法則計算 x 和 y
                const determinant = a1 * b2 - a2 * b1; // 行列式
                const determinantX = c1 * b2 - c2 * b1; // x 的行列式
                const determinantY = a1 * c2 - a2 * c1; // y 的行列式
            
                // 確保行列式不為零，否則無法解出
                if (determinant !== 0) {
                    const x = determinantX / determinant; // 計算 x
                    const y = determinantY / determinant; // 計算 y
            
                    questions.push({
                        question: `${i + 1}. ${a1}x + ${b1}y = ${c1} <br><br> &nbsp &nbsp ${a2}x + ${b2}y = ${c2}`,
                        answer: `x = ${x.toFixed(2)}, y = ${y.toFixed(2)}` // 顯示 x 和 y 的值
                    });
                } else {
                    // 如果行列式為零，則重新生成題目
                    // 這裡可以添加重新生成的邏輯
                }
                break;
            case 'twoDigitAdd': // 2位數加法
                num1 = Math.floor(Math.random() * 90) + 10; // 生成2位數
                num2 = Math.floor(Math.random() * 90) + 10; // 生成2位數
                questions.push({ question: `${i + 1}. ${num1} + ${num2} = `, answer: num1 + num2 });
                break;
            case 'threeDigitAdd': // 3位數加法
                num1 = Math.floor(Math.random() * 900) + 100; // 生成3位數
                num2 = Math.floor(Math.random() * 900) + 100; // 生成3位數
                questions.push({ question: `${i + 1}. ${num1} + ${num2} = `, answer: num1 + num2 });
                break;
            case 'fourDigitAdd': // 4位數加法
                num1 = Math.floor(Math.random() * 9000) + 1000; // 生成4位數
                num2 = Math.floor(Math.random() * 9000) + 1000; // 生成4位數
                questions.push({ question: `${i + 1}. ${num1} + ${num2} = `, answer: num1 + num2 });
                break;
            case 'twoDigitSubtract': //2位數減法
                num1 = Math.floor(Math.random() * 90) + 10; // 生成2位數
                num2 = Math.floor(Math.random() * num1); // 確保不會超過num1
                questions.push({ question: `${i + 1}. ${num1} - ${num2} = `, answer: num1 - num2 });
                break;
            case 'threeDigitSubtract': //3位數減法
                num1 = Math.floor(Math.random() * 900) + 100; // 生成3位數
                num2 = Math.floor(Math.random() * num1) ;
                questions.push({ question: `${i + 1}. ${num1} - ${num2} = `, answer: num1 - num2 });
                break;
            case 'fourDigitSubtract': //4位數減法
                num1 = Math.floor(Math.random() * 9000) + 1000; // 生成4位數
                num2 = Math.floor(Math.random() * num1);
                questions.push({ question: `${i + 1}. ${num1} - ${num2} = `, answer: num1 - num2 });
                break;
            case 'twoDigitMultiply': //2x1位數乘法
                num1 = Math.floor(Math.random() * 90) + 10; // 生成2位數
                num2 = Math.floor(Math.random() * 9) + 1; // 生成1位數
                questions.push({ question: `${i + 1}. ${num1} × ${num2} = `, answer: num1 * num2 });
                break;
            case 'twoDigitMultiply2': //2x2位數乘法
                num1 = Math.floor(Math.random() * 90) + 10; // 生成2位數
                num2 = Math.floor(Math.random() * 90) + 10; // 生成1位數
                questions.push({ question: `${i + 1}. ${num1} × ${num2} = `, answer: num1 * num2 });
                break;
            case 'threeDigitMultiply': //3x1位數乘法
                num1 = Math.floor(Math.random() * 900) + 100; // 生成3位數
                num2 = Math.floor(Math.random() * 9) + 1; // 生成1位數
                questions.push({ 
                    question: `${i + 1}. ${num1} × ${num2} = `, // 修改這裡，使用 × 符號
                    answer: num1 * num2 
                });
                break;
            case 'nineByNineMultiply': //9x9乘法
                num1 = Math.floor(Math.random() * 9) + 1; // 生成1到9的數字
                num2 = Math.floor(Math.random() * 9) + 1; // 生成1到9的數字
                questions.push({ question: `${i + 1}. ${num1} × ${num2} = `, answer: num1 * num2 }); // 9x9乘法
                break;
            case 'distributiveLaw':
                num1 = Math.floor(Math.random() * 10) + 1; // 生成1位數
                num2 = Math.floor(Math.random() * 10) + 1; // 生成1位數
                num3 = Math.floor(Math.random() * 10) + 1; // 生成1位數
                questions.push({ question: `${i + 1}. ${num1} × (${num2} + ${num3}) = `, answer: num1 * (num2 + num3) });
                break;
            case 'twoDigitDivide': //2位數除法
                do {
                    num1 = Math.floor(Math.random() * 90) + 10; // 生成2位數被除數
                    num2 = Math.floor(Math.random() * 8) + 2; // 生成2-9的除數
                    // 確保能整除
                    if (num1 % num2 === 0) {
                        // 生成隨機情境題
                        const scenarios = [
                            `小明有 ${num1} 顆蘋果，要平分給 ${num2} 個人，每人可以得到幾顆蘋果？`,
                            `老師有 ${num1} 本故事書，要分給 ${num2} 個班級，每個班級可以得到幾本書？`,
                            `農場裡有 ${num1} 株花苗，要種在 ${num2} 個花圃裡，每個花圃可以種幾株花苗？`,
                            `媽媽買了 ${num1} 顆橘子，裝進 ${num2} 個水果籃，每個水果籃可以裝幾顆橘子？`,
                            `學校要將 ${num1} 位學生分成 ${num2} 組，每組可以分到幾位學生？`
                        ];
                        const randomScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
                        
                        questions.push({ 
                            question: `${i + 1}. ${randomScenario}`, 
                            answer: num1 / num2 
                        });
                        break;
                    }
                } while (true);
                break;
            case 'threeDigitDivide': //3位數除法
                do {
                    num1 = Math.floor(Math.random() * 900) + 100; // 生成3位數被除數
                    num2 = Math.floor(Math.random() * 8) + 2; // 生成2-9的除數
                    // 確保能整除
                    if (num1 % num2 === 0) {
                        // 生成隨機情境題
                        const scenarios = [
                            `學校圖書館有 ${num1} 本書，要平均分配給 ${num2} 個年級，每個年級可以分到幾本書？`,
                            `一個大型果園收成了 ${num1} 公斤的水果，要分裝成 ${num2} 箱，每箱可以裝幾公斤？`,
                            `一個社區有 ${num1} 株樹木，要平均種植在 ${num2} 條街道上，每條街道可以種幾株樹木？`,
                            `一個麵包工廠製作了 ${num1} 個麵包，要送給 ${num2} 家超市，每家超市可以得到幾個麵包？`,
                            `學校募集了 ${num1} 元，要平均分配給 ${num2} 個社團，每個社團可以得到多少元？`
                        ];
                        const randomScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
                        
                        questions.push({ 
                            question: `${i + 1}. ${randomScenario}`, 
                            answer: num1 / num2 
                        });
                        break;
                    }
                } while (true);
                break;
            case 'gcd': // 最大公因數
                let num1GCD, num2GCD, resultGCD;
                // 修改生成範圍為10-99的數字
                num1GCD = Math.floor(Math.random() * 90) + 10; // 生成10-99的數字
                num2GCD = Math.floor(Math.random() * 90) + 10; // 生成10-99的數字
                
                // 確保兩個數字都小於100
                num1GCD = Math.min(num1GCD, 99);
                num2GCD = Math.min(num2GCD, 99);
                
                // 計算最大公因數
                resultGCD = gcd(num1GCD, num2GCD);
                
                // 生成隨機情境題
                const gcdScenarios = [
                    `一個水果攤有 ${num1GCD} 顆蘋果和 ${num2GCD} 顆橘子，想要裝成水果禮盒，每盒要裝相同數量的水果，且剛好能裝完，最多可以裝幾顆水果在一盒中？`,
                    `學校要將 ${num1GCD} 個男生和 ${num2GCD} 個女生分組表演，每組人數要相同，且要男女生人數相等，最多可以分成幾人一組？`,
                    `一個花店有 ${num1GCD} 朵紅花和 ${num2GCD} 朵白花，想要製作相同的花束，每束花都要包含相同數量的紅花和白花，最多可以一束包含幾朵花？`,
                    `小明有 ${num1GCD} 顆巧克力糖和 ${num2GCD} 顆水果糖，要分裝成小禮包送給同學，每包要有相同數量的糖果，最多可以一包放幾顆糖？`,
                    `老師有 ${num1GCD} 張紅色貼紙和 ${num2GCD} 張藍色貼紙，要獎勵給學生，每個學生都要拿到相同數量的貼紙，最多可以分給幾個學生？`
                ];
                
                const randomGcdScenario = gcdScenarios[Math.floor(Math.random() * gcdScenarios.length)];
                
                questions.push({ 
                    question: `${i + 1}. ${randomGcdScenario}`, 
                    answer: resultGCD 
                });
                break;
            case 'lcm': // 最大公倍數
                num1 = Math.floor(Math.random() * 10) + 10; // 生成2位數
                num2 = Math.floor(Math.random() * 10) + 10; // 生成2位數
                questions.push({ question: `${i + 1}. 最大公倍數(${num1}, ${num2}) = `, answer: lcm(num1, num2) });
                break;
            case 'multipleOfThree': // 3的特殊倍數說明
                num1 = Math.floor(Math.random() * 9999); // 生成0到99的數字
                questions.push({
                    question: `${i + 1}. ${num1} 是 3 的倍數嗎？`,
                    answer: (num1 % 3 === 0) ? "是" : "不是"
                });
                break;
            case 'multipleOfFour': // 4的倍數判別
                num1 = Math.floor(Math.random() * 9999); // 生成0到99的數字
                questions.push({
                    question: `${i + 1}. ${num1} 是 4 的倍數嗎？`,
                    answer: (num1 % 4 === 0) ? "是" : "不是"
                });
                break;
            case 'multipleOfSix': // 6的倍數判別
                num1 = Math.floor(Math.random() * 9999); // 生成0到99的數字
                questions.push({
                    question: `${i + 1}. ${num1} 是 6 的倍數嗎？`,
                    answer: (num1 % 6 === 0) ? "是" : "不是"
                });
                break;
            case 'multipleOfNine': // 9的倍數判別
                num1 = Math.floor(Math.random() * 9999); // 生成0到99的數字
                questions.push({
                    question: `${i + 1}. ${num1} 是 9 的倍數嗎？`,
                    answer: (num1 % 9 === 0) ? "是" : "不是"
                });
                break;
            case 'multipleOfEleven': // 11的倍數判別
                num1 = Math.floor(Math.random() * 9999999); // 生成0到99的數字
                questions.push({
                    question: `${i + 1}. ${num1} 是 11 的倍數嗎？`,
                    answer: (num1 % 11 === 0) ? "是" : "不是"
                });
                break;
            case 'factorOfThree': // 3的因數判別
                num2 = Math.floor(Math.random() * (9999 - 10 + 1)) + 10; // 生成2位數到9位數的倍數
                num1 = 3; // 因數
                questions.push({
                    question: `${i + 1}. ${num1} 是 ${num2} 的因數嗎？`,
                    answer: (num2 % num1 === 0) ? "是" : "不是"
                });
                break;
            case 'factorOfFour': // 4的因數判別
                num2 = Math.floor(Math.random() * (9999 - 10 + 1)) + 10; // 生成2位數到9位數的倍數
                num1 = 4; // 因數
                questions.push({
                    question: `${i + 1}. ${num1} 是 ${num2} 的因數嗎？`,
                    answer: (num2 % num1 === 0) ? "是" : "不是"
                });
                break;
            case 'factorOfSix': // 6的因數判別
                num2 = Math.floor(Math.random() * (99999 - 10 + 1)) + 10; // 生成2位數到9位數的倍數
                num1 = 6; // 因數
                questions.push({
                    question: `${i + 1}. ${num1} 是 ${num2} 的因數嗎？`,
                    answer: (num2 % num1 === 0) ? "是" : "不是"
                });
                break;
            case 'factorOfSeven': // 7的因數判別
                num2 = Math.floor(Math.random() * (99999 - 10 + 1)) + 10; // 生成2位數到9位數的倍數
                num1 = 7; // 因數
                questions.push({
                    question: `${i + 1}. ${num1} 是 ${num2} 的因數嗎？`,
                    answer: (num2 % num1 === 0) ? "是" : "不是"
                });
                break;
            case 'factorOfEight': // 8的因數判別
                num2 = Math.floor(Math.random() * (99999 - 10 + 1)) + 10; // 生成2位數到9位數的倍數
                num1 = 8; // 因數
                questions.push({
                    question: `${i + 1}. ${num1} 是 ${num2} 的因數嗎？`,
                    answer: (num2 % num1 === 0) ? "是" : "不是"
                });
                break;
            case 'factorOfNine': // 9的因數判別
                num2 = Math.floor(Math.random() * (99999 - 10 + 1)) + 10; // 生成2位數到9位數的倍數
                num1 = 9; // 因數
                questions.push({
                    question: `${i + 1}. ${num1} 是 ${num2} 的因數嗎？`,
                    answer: (num2 % num1 === 0) ? "是" : "不是"
                });
                break;
            case 'factorOfEleven': // 11的因數判別
                num2 = Math.floor(Math.random() * (9999999 - 10 + 1)) + 10; // 生成2位數到9位數的倍數
                num1 = 11; // 因數
                questions.push({
                    question: `${i + 1}. ${num1} 是 ${num2} 的因數嗎？`,
                    answer: (num2 % num1 === 0) ? "是" : "不是"
                });
                break;
            case 'positiveNegativeAdd': // 正負數加法
                num1 = Math.floor(Math.random() * 50) - 10; // 生成-10到9的數字
                num2 = Math.floor(Math.random() * 50) - 10; // 生成-10到9的數字
                // 將負數加上括號
                questions.push({
                    question: `${i + 1}. ${num1 < 0 ? `(${num1})` : num1} + ${num2 < 0 ? `(${num2})` : num2} =`,
                    answer: num1 + num2
                });
                break;
            case 'positiveNegativeSubtract': // 正負數減法
                num1 = Math.floor(Math.random() * 50) - 10; // 生成-10到9的數字
                num2 = Math.floor(Math.random() * 50) - 10; // 生成-10到9的數字
                // 將負數加上括號
                questions.push({
                    question: `${i + 1}. ${num1 < 0 ? `(${num1})` : num1} - ${num2 < 0 ? `(${num2})` : num2} =`,
                    answer: num1 - num2
                });
                break;
            case 'fractionOperations': // 分數4則運算
                // 隨機生成帶分數的分子和分母
                let numerator1 = Math.floor(Math.random() * 15) + 5; // 生成5到20的分子
                let denominator1 = Math.floor(Math.random() * 9) + 2; // 生成2到10的分母
                let numerator2 = Math.floor(Math.random() * 15) + 5; // 生成5到20的分子
                let denominator2 = Math.floor(Math.random() * 9) + 2; // 生成2到10的分母

                // 計算帶分數的整數部分和真分數部分
                let wholeNumber1 = Math.floor(numerator1 / denominator1);
                let remainingNumerator1 = numerator1 % denominator1;
                let wholeNumber2 = Math.floor(numerator2 / denominator2);
                let remainingNumerator2 = numerator2 % denominator2;

                // 隨機選擇運算符
                let fractionOperation = ['+', '-', '*', '/'][Math.floor(Math.random() * 4)];
                let question, answer, resultNumerator, resultDenominator;

                // 格式化帶分數顯示
                const formatMixedFraction = (whole, num, den) => {
                    if (whole === 0) return formatFraction(num, den);
                    if (num === 0) return whole.toString();
                    return `${whole} ${formatFraction(num, den)}`;
                };

                switch (fractionOperation) {
                    case '+':
                        question = `${formatMixedFraction(wholeNumber1, remainingNumerator1, denominator1)} + ${formatMixedFraction(wholeNumber2, remainingNumerator2, denominator2)}`;
                        resultNumerator = numerator1 * denominator2 + numerator2 * denominator1;
                        resultDenominator = denominator1 * denominator2;
                        break;
                    case '-':
                        question = `${formatMixedFraction(wholeNumber1, remainingNumerator1, denominator1)} - ${formatMixedFraction(wholeNumber2, remainingNumerator2, denominator2)}`;
                        resultNumerator = numerator1 * denominator2 - numerator2 * denominator1;
                        resultDenominator = denominator1 * denominator2;
                        break;
                    case '*':
                        question = `${formatMixedFraction(wholeNumber1, remainingNumerator1, denominator1)} × ${formatMixedFraction(wholeNumber2, remainingNumerator2, denominator2)}`;
                        resultNumerator = numerator1 * numerator2;
                        resultDenominator = denominator1 * denominator2;
                        break;
                    case '/':
                        question = `${formatMixedFraction(wholeNumber1, remainingNumerator1, denominator1)} ÷ ${formatMixedFraction(wholeNumber2, remainingNumerator2, denominator2)}`;
                        resultNumerator = numerator1 * denominator2;
                        resultDenominator = denominator1 * numerator2;
                        break;
                }

                // 計算最大公因數
                const gcd = (a, b) => {
                    a = Math.abs(a);
                    b = Math.abs(b);
                    while (b) {
                        let t = b;
                        b = a % b;
                        a = t;
                    }
                    return a;
                };

                // 約分
                let divisor = gcd(resultNumerator, resultDenominator);
                resultNumerator = resultNumerator / divisor;
                resultDenominator = resultDenominator / divisor;

                // 計算答案的帶分數形式
                let resultWhole = Math.floor(Math.abs(resultNumerator) / resultDenominator);
                let resultRemaining = Math.abs(resultNumerator) % resultDenominator;
                let sign = resultNumerator < 0 ? "-" : "";
                
                // 格式化最終答案
                answer = resultRemaining === 0 ? 
                    `${sign}${resultWhole}` : 
                    (resultWhole === 0 ? 
                        `${sign}${formatFraction(resultRemaining, resultDenominator)}` : 
                        `${sign}${resultWhole} ${formatFraction(resultRemaining, resultDenominator)}`);
            
                questions.push({
                    question: `${i + 1}. ${question} = `,
                    answer: answer
                });
                break;
            case 'decimalOperations': // 小數點四則運算
                let decimalNum1 = (Math.random() * 10).toFixed(1); // 生成到小數點後1位的數字
                let decimalNum2 = (Math.random() * 10).toFixed(1); // 生成到小數點後1位的數字
                const decimalOperations = ['+', '-', '*', '/'];
                const decimalOperation = decimalOperations[Math.floor(Math.random() * decimalOperations.length)];
                
                let decimalQuestion, decimalAnswer;
                
                switch (decimalOperation) {
                    case '+':
                        decimalQuestion = `${decimalNum1} + ${decimalNum2}`;
                        decimalAnswer = (parseFloat(decimalNum1) + parseFloat(decimalNum2)).toFixed(1);
                        break;
                    case '-':
                        // 確保減法結果為正數，大數減小數
                        if (parseFloat(decimalNum1) < parseFloat(decimalNum2)) {
                            [decimalNum1, decimalNum2] = [decimalNum2, decimalNum1];
                        }
                        decimalQuestion = `${decimalNum1} - ${decimalNum2}`;
                        decimalAnswer = (parseFloat(decimalNum1) - parseFloat(decimalNum2)).toFixed(1);
                        break;
                    case '*':
                        // 確保乘法結果不會太大
                        decimalNum1 = (Math.random() * 5).toFixed(1); // 縮小範圍避免結果太大
                        decimalNum2 = (Math.random() * 5).toFixed(1);
                        decimalQuestion = `${decimalNum1} × ${decimalNum2}`;
                        decimalAnswer = (parseFloat(decimalNum1) * parseFloat(decimalNum2)).toFixed(1);
                        break;
                    case '/':
                        // 確保除法結果為正數且不會太複雜
                        do {
                            decimalNum1 = (Math.random() * 10).toFixed(1);
                            decimalNum2 = (Math.random() * 4 + 1).toFixed(1); // 除數從1到5，避免太小的數
                            let result = parseFloat(decimalNum1) / parseFloat(decimalNum2);
                            // 確保結果是正數且到小數點後1位
                            if (result > 0 && result <= 10 && (result.toFixed(1) % 0.1 === 0)) {
                                break;
                            }
                        } while (true);
                        decimalQuestion = `${decimalNum1} ÷ ${decimalNum2}`;
                        decimalAnswer = (parseFloat(decimalNum1) / parseFloat(decimalNum2)).toFixed(1);
                        break;
                }
                
                questions.push({
                    question: `${i + 1}. ${decimalQuestion} = `,
                    answer: decimalAnswer
                });
                break;
                case 'positiveNegativeMultiplyDivide': // 正負數除運算
                const multiplyDivideOperations = ['*', '/'];
                const operation = multiplyDivideOperations[Math.floor(Math.random() * multiplyDivideOperations.length)];

                // 隨機生成2位數正負數
                const num16 = Math.floor(Math.random() * 100) - 50; // 生成-50到49的數字
                const num17 = Math.floor(Math.random() * 100) - 50; // 生成-50到49的數字

                let MultiplyDividequestion, MultiplyDivideanswer;

                // 將負數加上括號
                const formattedNum1 = num16 < 0 ? `(${num16})` : num16;
                const formattedNum2 = num17 < 0 ? `(${num17})` : num17;

                switch (operation) {
                    case '*':
                        MultiplyDividequestion = `${formattedNum1} × ${formattedNum2}`;
                        MultiplyDivideanswer = num16 * num17;
                        break;
                    case '/':
                        // 保不會除以零，並且答案可以整除
                        let divisor;
                        do {
                            divisor = Math.floor(Math.random() * 100) - 50; // 生成-50到49的數字
                        } while (divisor === 0 || num16 % divisor !== 0); // 確保除數不為0且答案可以整除
                        const formattedDivisor = divisor < 0 ? `(${divisor})` : divisor; // 格式化除數
                        MultiplyDividequestion = `${formattedNum1} ÷ ${formattedDivisor}`;
                        MultiplyDivideanswer = num16 / divisor; // 保留整數
                        break;
                }

                questions.push({
                    question: `${i + 1}. ${MultiplyDividequestion} = `,
                    answer: MultiplyDivideanswer
                });
                break;
            case 'fourTermsOperations': // 四項負數四則運算
                let nums, operators, formattedNums, finalResult;
                do {
                    // 生成4個-50到49的隨機數
                    nums = Array(4).fill().map(() => Math.floor(Math.random() * 100) - 50);
                    // 生成3個運算符（+、-、×、÷中隨機選擇）
                    operators = Array(3).fill().map(() => ['+', '-', '×', '÷'][Math.floor(Math.random() * 4)]);
                    
                    // 格式化數字（負數加括號）
                    formattedNums = nums.map(n => n < 0 ? `(${n})` : n);
                    
                    // 如果有除法運算，確保能整除
                    for(let i = 0; i < operators.length; i++) {
                        if(operators[i] === '÷') {
                            // 確保除數不為0且能整除
                            while(nums[i+1] === 0 || nums[i] % nums[i+1] !== 0) {
                                nums[i+1] = Math.floor(Math.random() * 20) - 10; // 生成較小的數以增加整除概率
                                formattedNums[i+1] = nums[i+1] < 0 ? `(${nums[i+1]})` : nums[i+1];
                            }
                        }
                    }
                    
                    // 預計算結果（考慮運算優先級）
                    let tempNums = [...nums];
                    let tempOps = [...operators];
                    
                    // 先處理乘除
                    for(let i = 0; i < tempOps.length; i++) {
                        if(tempOps[i] === '×' || tempOps[i] === '÷') {
                            let tempResult;
                            if(tempOps[i] === '×') {
                                tempResult = tempNums[i] * tempNums[i + 1];
                            } else {
                                tempResult = tempNums[i] / tempNums[i + 1];
                            }
                            tempNums.splice(i, 2, tempResult);
                            tempOps.splice(i, 1);
                            i--;
                        }
                    }
                    
                    // 再處理加減
                    finalResult = tempNums[0];
                    for(let i = 0; i < tempOps.length; i++) {
                        if(tempOps[i] === '+') finalResult += tempNums[i + 1];
                        if(tempOps[i] === '-') finalResult -= tempNums[i + 1];
                    }
                    
                    // 檢查結果是否在圍內
                } while (Math.abs(finalResult) > 999);
                
                // 構建問題字符串
                let fourTermsQuestion = `${formattedNums[0]} ${operators[0]} ${formattedNums[1]} ${operators[1]} ${formattedNums[2]} ${operators[2]} ${formattedNums[3]}`;
                
                questions.push({
                    question: `${i + 1}. ${fourTermsQuestion} = `,
                    answer: finalResult
                });
                break;
            case 'sameBaseExponential': // 同底數指數四則運算
                let sameBase, sameExpNums, samePoweredNums, sameExpOp;
                do {
                    // 生成一個底數（2-9）和兩個指數（2-9）
                    sameBase = Math.floor(Math.random() * 8) + 2; // 2-9的底數
                    sameExpNums = Array(2).fill().map(() => Math.floor(Math.random() * 8) + 2); // 2-9的指數
                    sameExpOp = ['+', '-', '×', '÷'][Math.floor(Math.random() * 4)]; // 隨機選擇一個運算符
                    
                    // 計算每個數字的指數值
                    samePoweredNums = sameExpNums.map(exp => Math.pow(sameBase, exp));
                    
                    // 預計算結果
                    let sameResult;
                    switch(sameExpOp) {
                        case '+': sameResult = samePoweredNums[0] + samePoweredNums[1]; break;
                        case '-': sameResult = Math.max(samePoweredNums[0], samePoweredNums[1]) - 
                                             Math.min(samePoweredNums[0], samePoweredNums[1]); break;
                        case '×': sameResult = samePoweredNums[0] * samePoweredNums[1]; break;
                        case '÷': sameResult = samePoweredNums[0] / samePoweredNums[1]; break;
                    }
                    
                    // 如果結果超過999或任何一個數超過999，重新生成
                } while (samePoweredNums[0] > 999 || samePoweredNums[1] > 999 || 
                        (sameExpOp === '×' && samePoweredNums[0] * samePoweredNums[1] > 999) ||
                        (sameExpOp === '+' && samePoweredNums[0] + samePoweredNums[1] > 999));
                
                // 如果是除法運算，確保能整除且除數不為0
                if(sameExpOp === '÷') {
                    let dividend = samePoweredNums[0];
                    let divisor = samePoweredNums[1];
                    
                    // 如果不能整除，重新生成第二個指數直到能整除
                    while(divisor === 0 || dividend % divisor !== 0 || dividend / divisor > 999) {
                        sameExpNums[1] = Math.floor(Math.random() * 8) + 2; // 2-9的指數
                        samePoweredNums[1] = Math.pow(sameBase, sameExpNums[1]);
                        divisor = samePoweredNums[1];
                    }
                }
                
                // 構建問題字符串
                let sameExpQuestion = `${formatPower(sameBase, sameExpNums[0])} ${sameExpOp} ${formatPower(sameBase, sameExpNums[1])}`;
                
                // 計算答案
                let sameExpAnswer;
                switch(sameExpOp) {
                    case '+':
                        sameExpAnswer = samePoweredNums[0] + samePoweredNums[1];
                        break;
                    case '-':
                        // 確保減法結果為正數
                        if(samePoweredNums[0] < samePoweredNums[1]) {
                            [samePoweredNums[0], samePoweredNums[1]] = [samePoweredNums[1], samePoweredNums[0]];
                            [sameExpNums[0], sameExpNums[1]] = [sameExpNums[1], sameExpNums[0]];
                            sameExpQuestion = `${formatPower(sameBase, sameExpNums[0])} ${sameExpOp} ${formatPower(sameBase, sameExpNums[1])}`;
                        }
                        sameExpAnswer = samePoweredNums[0] - samePoweredNums[1];
                        break;
                    case '×':
                        sameExpAnswer = samePoweredNums[0] * samePoweredNums[1];
                        break;
                    case '÷':
                        sameExpAnswer = samePoweredNums[0] / samePoweredNums[1];
                        break;
                }
                
                // 新增一個函數來找到最接近的指數表示
                function findExponentialForm(number) {
                    // 遍歷所有可能的底數（2-9）
                    for(let base = 2; base <= 9; base++) {
                        // 遍歷所有可能的指數（1-9）
                        for(let exp = 1; exp <= 9; exp++) {
                            if(Math.pow(base, exp) === number) {
                                return {
                                    base: base,
                                    exponent: exp
                                };
                            }
                        }
                    }
                    return null; // 如果找不到完全相等的指數形式，返回null
                }
                
                // 修改答案格式
                let sameExpResult = findExponentialForm(sameExpAnswer);
                if(sameExpResult) {
                    // 如果能表示為指數形式，使用指數形式
                    questions.push({
                        question: `${i + 1}. ${sameExpQuestion} = `,
                        answer: formatPower(sameExpResult.base, sameExpResult.exponent)
                    });
                } else {
                    // 如果不能表示為指數形式，使用一般數字
                    questions.push({
                        question: `${i + 1}. ${sameExpQuestion} = `,
                        answer: sameExpAnswer
                    });
                }
                break;
            case 'exponentialOperations': // 指數四則運算
                let bases, expNums, poweredNums, expOperator;
                do {
                    // 生成2個底數（2-9）和指數（2-9）
                    bases = Array(2).fill().map(() => Math.floor(Math.random() * 8) + 2); // 2-9的底數
                    expNums = Array(2).fill().map(() => Math.floor(Math.random() * 8) + 2); // 2-9的指數
                    expOperator = ['+', '-', '×', '÷'][Math.floor(Math.random() * 4)]; // 隨機選擇一個運算符
                    
                    // 計算每個數字的指數值
                    poweredNums = bases.map((base, i) => Math.pow(base, expNums[i]));
                    
                    // 預計算結果
                    let tempResult;
                    switch(expOperator) {
                        case '+': tempResult = poweredNums[0] + poweredNums[1]; break;
                        case '-': tempResult = Math.max(poweredNums[0], poweredNums[1]) - 
                                             Math.min(poweredNums[0], poweredNums[1]); break;
                        case '×': tempResult = poweredNums[0] * poweredNums[1]; break;
                        case '÷': tempResult = poweredNums[0] / poweredNums[1]; break;
                    }
                    
                    // 果結果超過999或任何一個數超過999，重新生成
                } while (poweredNums[0] > 999 || poweredNums[1] > 999 || 
                        (expOperator === '×' && poweredNums[0] * poweredNums[1] > 999) ||
                        (expOperator === '+' && poweredNums[0] + poweredNums[1] > 999));
                
                // 如果是除法運算，確保整除且除數不為0
                if(expOperator === '÷') {
                    let dividend = poweredNums[0];
                    let divisor = poweredNums[1];
                    
                    // 如果不能整除，重新生成二個數直到能整除
                    while(divisor === 0 || dividend % divisor !== 0 || dividend / divisor > 999) {
                        bases[1] = Math.floor(Math.random() * 8) + 2; // 2-9的底數
                        expNums[1] = Math.floor(Math.random() * 8) + 2; // 2-9的指數
                        poweredNums[1] = Math.pow(bases[1], expNums[1]);
                        divisor = poweredNums[1];
                    }
                }
                
                // 構建問題字符串
                let expQuestion = `${formatPower(bases[0], expNums[0])} ${expOperator} ${formatPower(bases[1], expNums[1])}`;
                
                // 計算答案
                let expAnswer;
                switch(expOperator) {
                    case '+':
                        expAnswer = poweredNums[0] + poweredNums[1];
                        break;
                    case '-':
                        // 確保減法結果為正數
                        if(poweredNums[0] < poweredNums[1]) {
                            [poweredNums[0], poweredNums[1]] = [poweredNums[1], poweredNums[0]];
                            [bases[0], bases[1]] = [bases[1], bases[0]];
                            [expNums[0], expNums[1]] = [expNums[1], expNums[0]];
                            expQuestion = `${formatPower(bases[0], expNums[0])} ${expOperator} ${formatPower(bases[1], expNums[1])}`;
                        }
                        expAnswer = poweredNums[0] - poweredNums[1];
                        break;
                    case '×':
                        expAnswer = poweredNums[0] * poweredNums[1];
                        break;
                    case '÷':
                        expAnswer = poweredNums[0] / poweredNums[1];
                        break;
                }
                
                // 新增一個函數來找到最接近的指數表示
                function findExponentialForm(number) {
                    // 遍歷所有可能的底數（2-9）
                    for(let base = 2; base <= 9; base++) {
                        // 遍歷所有可能的指數（1-9）
                        for(let exp = 1; exp <= 9; exp++) {
                            if(Math.pow(base, exp) === number) {
                                return {
                                    base: base,
                                    exponent: exp
                                };
                            }
                        }
                    }
                    return null; // 如果找不到全相等的指數形式，返回null
                }
                
                // 修改答案格式
                let expResult = findExponentialForm(expAnswer);
                if(expResult) {
                    // 如果能表示為指數形式，使用指數形式
                    questions.push({
                        question: `${i + 1}. ${expQuestion} = `,
                        answer: formatPower(expResult.base, expResult.exponent)
                    });
                } else {
                    // 如果不能表示為指數形式，使用一般數字
                    questions.push({
                        question: `${i + 1}. ${expQuestion} = `,
                        answer: expAnswer
                    });
                }
                break;
            case 'pointDistance': // 兩點間距離運算
                let point1, point2;
                do {
                    // 生成兩個-50到50之間的點
                    point1 = Math.floor(Math.random() * 101) - 50;
                    point2 = Math.floor(Math.random() * 101) - 50;
                    
                    // 計算距離（差的絕對值）
                    let distance = Math.abs(point2 - point1);
                    
                    // 確保距離不為0且不超過100
                    if (distance > 0 && distance <= 100) {
                        // 格式化顯示（負數加括號）
                        let formattedPoint1 = point1 < 0 ? `(${point1})` : point1;
                        let formattedPoint2 = point2 < 0 ? `(${point2})` : point2;
                        
                        questions.push({
                            question: `${i + 1}. 數線上兩點 ${formattedPoint1} 和 ${formattedPoint2} 之間的距離 = `,
                            answer: distance
                        });
                        break;
                    }
                } while (true);
                break;
            case 'findPoint': // 已知一點和距離求另一點
                let givenPoint, distance;
                do {
                    // 生成一個-50到50之間的點
                    givenPoint = Math.floor(Math.random() * 101) - 50;
                    // 生成1到50的距離（縮小範圍以確保結果在合理範圍內）
                    distance = Math.floor(Math.random() * 50) + 1;
                    
                    // 確保結果點在合理範圍內（-50到50）
                    if (Math.abs(givenPoint) + distance <= 50) {
                        // 格式化顯示（負數加括號）
                        let formattedPoint = givenPoint < 0 ? `(${givenPoint})` : givenPoint;
                        
                        // 隨機決定是要求左邊的點還是右邊的點
                        let isLeftPoint = Math.random() < 0.5;
                        
                        // 計算另一個可能的點（左點和右點）
                        let leftPoint = givenPoint - distance;
                        let rightPoint = givenPoint + distance;
                        
                        // 根據選擇設定答案
                        let answer = isLeftPoint ? leftPoint : rightPoint;
                        let explanation = `${formattedPoint} ${isLeftPoint ? '-' : '+'} ${distance} = ${answer}`;
                        
                        // 格式化答案（如果是負數，加上括號）
                        let formattedAnswer = answer < 0 ? `(${answer})` : answer;
                        
                        questions.push({
                            question: `${i + 1}. 數線上一點 ${formattedPoint}，與另一點的距離為 ${distance}，求在其${isLeftPoint ? '左' : '右'}側的點。`,
                            answer: `${formattedAnswer} (${explanation})`
                        });
                        break;
                    }
                } while (true);
                break;
            case 'exponentialDistribution': // 指數分配律
                let baseNum, exp1, exp2;
                do {
                    // 生成2-9的底數和2-5的指數
                    baseNum = Math.floor(Math.random() * 8) + 2;
                    exp1 = Math.floor(Math.random() * 4) + 2;
                    exp2 = Math.floor(Math.random() * 4) + 2;
                    
                    // 計算結果確保不超過999
                    let result = Math.pow(baseNum, exp1 + exp2);
                } while (Math.pow(baseNum, exp1 + exp2) > 999);
                
                // 隨機選擇是乘法還是除法的分配律
                let isMultiply = Math.random() < 0.5;
                
                if (isMultiply) {
                    questions.push({
                        question: `${i + 1}. ${formatPower(baseNum, exp1)} × ${formatPower(baseNum, exp2)} = `,
                        answer: formatPower(baseNum, exp1 + exp2)
                    });
                } else {
                    questions.push({
                        question: `${i + 1}. ${formatPower(baseNum, exp1 + exp2)} ÷ ${formatPower(baseNum, exp2)} = `,
                        answer: formatPower(baseNum, exp1)
                    });
                }
                break;

            case 'standardForm': // 準分解式
                let number;
                do {
                    // 生成2-999的數字
                    number = Math.floor(Math.random() * 998) + 2;
                    
                    // 檢查是否可以分解為2-9的指數形式
                    let canDecompose = false;
                    for(let base = 2; base <= 9; base++) {
                        for(let exp = 2; exp <= 9; exp++) {
                            if(Math.pow(base, exp) === number) {
                                canDecompose = true;
                                break;
                            }
                        }
                        if(canDecompose) break;
                    }
                    
                    if(canDecompose) {
                        // 到數字的標準分解式
                        let factors = findPrimeFactors(number);
                        let formattedFactors = formatPrimeFactors(factors);
                        
                        questions.push({
                            question: `${i + 1}. ${number} 的標準分解式 = `,
                            answer: formattedFactors
                        });
                        break;
                    }
                } while (true);
                break;
            case 'perfectSquare': // 完全平方數練習
                let baseNumber;
                do {
                    // 生成1-31的基數(這樣平方後不會超過1000)
                    baseNumber = Math.floor(Math.random() * 31) + 1;
                    let squareNumber = baseNumber * baseNumber;
                    
                    // 隨機決定是求平方還是求平方根
                    let isPerfectSquare = Math.random() < 0.5;
                    
                    if (isPerfectSquare) {
                        // 求平方
                        questions.push({
                            question: `${i + 1}. ${baseNumber}² = `,
                            answer: squareNumber
                        });
                    } else {
                        // 求平方根，使用文字敘述
                        questions.push({
                            question: `${i + 1}. ${squareNumber} 的平方根 = `,
                            answer: baseNumber
                        });
                    }
                    break;
                } while (true);
                break;
            case 'factorization': // 因式分解練習
                let a, b, c;
                do {
                    // 生成係數 (ax² + bx + c)
                    a = Math.floor(Math.random() * 5) + 1; // 1到5
                    b = Math.floor(Math.random() * 9) + 1; // 1到9
                    b *= Math.random() < 0.5 ? 1 : -1; // 隨機正負號
                    c = Math.floor(Math.random() * 9) + 1; // 1到9
                    c *= Math.random() < 0.5 ? 1 : -1; // 隨機正負號
                    
                    // 計算判別式
                    let discriminant = b * b - 4 * a * c;
                    
                    // 確保有整數解且係數不會太大
                    if (discriminant > 0 && 
                        Math.sqrt(discriminant) % 1 === 0 && 
                        (-b + Math.sqrt(discriminant)) / (2 * a) % 1 === 0 && 
                        (-b - Math.sqrt(discriminant)) / (2 * a) % 1 === 0) {
                        
                        // 計算兩個根
                        let x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
                        let x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
                        
                        // 構建題目和答案
                        let question = '';
                        if (a === 1) {
                            question = `x² ${b >= 0 ? '+' : ''}${b}x ${c >= 0 ? '+' : ''}${c}`;
                        } else {
                            question = `${a}x² ${b >= 0 ? '+' : ''}${b}x ${c >= 0 ? '+' : ''}${c}`;
                        }
                        
                        // 構建答案（因式分解形式）
                        let answer = '';
                        if (a === 1) {
                            answer = `(x ${x1 >= 0 ? '-' : '+'}${Math.abs(x1)})(x ${x2 >= 0 ? '-' : '+'}${Math.abs(x2)})`;
                        } else {
                            answer = `${a}(x ${x1 >= 0 ? '-' : '+'}${Math.abs(x1)})(x ${x2 >= 0 ? '-' : '+'}${Math.abs(x2)})`;
                        }
                        
                        questions.push({
                            question: `${i + 1}. ${question} = `,
                            answer: answer
                        });
                        break;
                    }
                } while (true);
                break;
            case 'factorCount': // 正因數個數練習
                let targetNumber;
                do {
                    // 生成2到100的數字
                    targetNumber = Math.floor(Math.random() * 99) + 2;
                    
                    // 計算正因數個數
                    let factorCount = 0;
                    for (let i = 1; i <= targetNumber; i++) {
                        if (targetNumber % i === 0) {
                            factorCount++;
                        }
                    }
                    
                    // 列出所有因數（用於答案解釋）
                    let factors = [];
                    for (let i = 1; i <= targetNumber; i++) {
                        if (targetNumber % i === 0) {
                            factors.push(i);
                        }
                    }
                    
                    questions.push({
                        question: `${i + 1}. ${targetNumber} 有幾個正因數？`,
                        answer: `${factorCount} (正因數：${factors.join(', ')})`
                    });
                    break;
                } while (true);
                break;
            case 'complexExponentialOperations': // 複雜指數運算
                let questionCount = 0;
                while (questionCount < 1) {
                    let attempts = 0;
                    const maxAttempts = 5;
                    let success = false;

                    while (attempts < maxAttempts && !success) {
                        try {
                            // 生成基礎數字和指數
                            let base1 = Math.floor(Math.random() * 6) + 2; // 2-7的底數
                            let exp1 = Math.floor(Math.random() * 3) + 2;  // 2-4的指數
                            
                            let base2 = Math.floor(Math.random() * 6) + 2;
                            let exp2 = Math.floor(Math.random() * 3) + 2;
                            
                            let base3 = Math.floor(Math.random() * 6) + 2;
                            let exp3 = Math.floor(Math.random() * 3) + 2;
                            
                            // 隨機選擇運算符
                            let operators = ['+', '-', '×', '÷'];
                            let op1 = operators[Math.floor(Math.random() * 2)]; // 只使用加減
                            let op2 = operators[Math.floor(Math.random() * 4)]; // 可以使用所有運算符

                            // 計算各部分的值
                            let value1 = Math.pow(base1, exp1);
                            let value2 = Math.pow(base2, exp2);
                            let value3 = Math.pow(base3, exp3);

                            // 計算結果
                            let result;
                            let questionStr;

                            // 根據運算符生成不同形式的題目
                            if (Math.random() < 0.5) {
                                // 形式1: (a^m ± b^n) × c^p 或 (a^m ± b^n) ÷ c^p
                                let intermediateResult = op1 === '+' ? value1 + value2 : value1 - value2;
                                result = op2 === '×' ? intermediateResult * value3 : intermediateResult / value3;
                                questionStr = `(${formatPower(base1, exp1)} ${op1} ${formatPower(base2, exp2)}) ${op2} ${formatPower(base3, exp3)}`;
                            } else {
                                // 形式2: a^m × (b^n ± c^p) 或 a^m ÷ (b^n ± c^p)
                                let intermediateResult = op1 === '+' ? value2 + value3 : value2 - value3;
                                result = op2 === '×' ? value1 * intermediateResult : value1 / intermediateResult;
                                questionStr = `${formatPower(base1, exp1)} ${op2} (${formatPower(base2, exp2)} ${op1} ${formatPower(base3, exp3)})`;
                            }

                            // 檢查結果是否合理
                            if (!isNaN(result) && 
                                result !== Infinity && 
                                result !== -Infinity && 
                                Math.abs(result) <= 1000 && 
                                Number.isInteger(result)) {
                                
                                // 檢查是否為指數形式
                                let expForm = findExponentialForm(Math.abs(result));
                                let answer;
                                
                                if (expForm) {
                                    answer = result < 0 ? `-${formatPower(expForm.base, expForm.exponent)}` : formatPower(expForm.base, expForm.exponent);
                                } else {
                                    answer = result.toString();
                                }

                                questions.push({
                                    question: `${questionCount + 1}. ${questionStr} = `,
                                    answer: answer
                                });
                                success = true;
                                questionCount++;
                            } else {
                                attempts++;
                            }
                        } catch (error) {
                            attempts++;
                            if (attempts >= maxAttempts) {
                                // 使用預設題目
                                const defaultQuestions = [
                                    { q: `(2² + 3²) × 2²`, a: '26' },
                                    { q: `2³ × (2² + 3²)`, a: '52' },
                                    { q: `(3² - 2²) × 2³`, a: '40' },
                                    { q: `2⁴ ÷ (2² + 2)`, a: '4' },
                                    { q: `(2³ + 3²) ÷ 2²`, a: '4' }
                                ];
                                let defaultQ = defaultQuestions[questionCount % defaultQuestions.length];
                                questions.push({
                                    question: `${questionCount + 1}. ${defaultQ.q} = `,
                                    answer: defaultQ.a
                                });
                                questionCount++;
                                break;
                            }
                        }
                    }
                }
                break;
            case 'fourDigitDivideTwo': // 4位數除2位數
                do {
                    num1 = Math.floor(Math.random() * 900) + 100; // 生成4位數被除數
                    num2 = Math.floor(Math.random() * 90) + 10; // 生成2位數除數
                    
                    // 確保能整除且結果是2位數或3位數
                    if (num1 % num2 === 0 && num1 / num2 >= 10 && num1 / num2 <= 999) {
                        // 生成隨機情境題
                        const scenarios = [
                            `一個倉庫有 ${num1} 件商品，要平均分配給 ${num2} 家商店，每家商店可以分到幾件商品？`,
                            `學校募集了 ${num1} 元，要分給 ${num2} 個班級，每個班級可以得到多少元？`,
                            `工廠製造了 ${num1} 個零件，要裝進 ${num2} 個箱子，每個箱子可以裝幾個零件？`,
                            `圖書館有 ${num1} 本書，要平均分配給 ${num2} 個年級，每個年級可以分到幾本書？`,
                            `農場收成了 ${num1} 公斤的水果，要分裝成 ${num2} 箱，每箱可以裝幾公斤？`
                        ];
                        const randomScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
                        
                        questions.push({ 
                            question: `${i + 1}. ${randomScenario}`, 
                            answer: num1 / num2 
                        });
                        break;
                    }
                } while (true);
                break;
            case 'divisionWithRemainder': // 隨機數除法及餘數
                do {
                    // 生成被除數（2-4位數）和除數（1-2位數）
                    num1 = Math.floor(Math.random() * 900) + 10; // 10-9999的被除數
                    num2 = Math.floor(Math.random() * 89) + 2; // 2-90的除數
                    
                    // 計算商和餘數
                    let quotient = Math.floor(num1 / num2);
                    let remainder = num1 % num2;
                    
                    // 確保題目合適（商至少是2位數，且有餘數）
                    if (quotient >= 10 && remainder > 0 && remainder < num2) {
                        // 生成隨機情境題
                        const scenarios = [
                            `${num1} 顆糖果要分給 ${num2} 個人，每人可以分到幾顆？還剩下幾顆？`,
                            `${num1} 本書要放進 ${num2} 個書櫃，如果每個書櫃放相同數量，每個書櫃可以放幾本？還會剩下幾本？`,
                            `${num1} 張貼紙要貼在 ${num2} 頁相簿中，如果每頁貼相同數量，每頁可以貼幾張？還會剩下幾張？`,
                            `${num1} 個蘋果裝進 ${num2} 個籃子，如果每個籃子裝相同數量，每個籃子可以裝幾個？還會剩下幾個？`,
                            `${num1} 元要平分給 ${num2} 個人，每人可以分到幾元？還剩下幾元？`
                        ];
                        const randomScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
                        
                        questions.push({ 
                            question: `${i + 1}. ${randomScenario}`, 
                            answer: `每人 ${quotient}，剩下 ${remainder}`
                        });
                        break;
                    }
                } while (true);
                break;
            case 'fractionRatio': // 分數占比
                let total, numerator, denominator;
                do {
                    // 生成更大範圍的總數 (50-500)
                    total = Math.floor(Math.random() * 451) + 50;
                    // 生成更大的分母 (2-20)
                    denominator = Math.floor(Math.random() * 19) + 2;
                    // 生成分子 (1到分母-1)
                    numerator = Math.floor(Math.random() * (denominator - 1)) + 1;
                    
                    // 隨機決定是否使用複合分數情境
                    const useCompound = Math.random() < 0.3; // 30%機率使用複合分數
                    
                    // 確保結果是整數
                    if ((total * numerator) % denominator === 0) {
                        // 生成更多樣化的隨機情境題
                        const scenarios = [
                            // 基礎題型
                            `學校有 ${total} 位學生，其中 ${formatFraction(numerator, denominator)} 參加了社團，參加社團的學生有幾位？`,
                            `工廠生產了 ${total} 個零件，其中 ${formatFraction(numerator, denominator)} 是不合格品，不合格品有幾個？`,
                            
                            // 金錢計算題型
                            `某公司年度預算 ${total} 萬元，其中 ${formatFraction(numerator, denominator)} 用於研發，研發經費是多少萬元？`,
                            `超市進貨 ${total} 元的商品，打算賺取成本的 ${formatFraction(numerator, denominator)}，應該賺多少元？`,
                            
                            // 時間分配題型
                            `小明每天讀書 ${total} 分鐘，其中 ${formatFraction(numerator, denominator)} 的時間用來讀數學，數學讀了幾分鐘？`,
                            
                            // 複合計算題型
                            `一個農場有 ${total} 公頃，目前種植作物的面積占 ${formatFraction(numerator, denominator)}，${
                                useCompound ? 
                                `如果每公頃收成 ${Math.floor(Math.random() * 5) + 3} 噸，總共可以收成幾噸？` : 
                                `種植作物的面積是幾公頃？`
                            }`,
                            
                            // 比較題型
                            `一個籃球隊 ${total} 次投籃，其中 ${formatFraction(numerator, denominator)} 投中，${
                                useCompound ? 
                                `如果要提高命中率到 ${formatFraction(numerator + 1, denominator)}，還需要多投中幾球？` :
                                `投中了幾球？`
                            }`,
                            
                            // 成長題型
                            `去年工廠產量是 ${total} 件，今年計劃增加 ${formatFraction(numerator, denominator)}，${
                                useCompound ? 
                                `如果均勻分配到12個月，每月需要增加多少件？` :
                                `需要增加多少件？`
                            }`
                        ];
                        
                        const selectedScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
                        let answer = (total * numerator) / denominator;
                        
                        // 根據不同題型計算最終答案
                        if (selectedScenario.includes('每月需要增加')) {
                            answer = Math.round(answer / 12); // 除以12個月
                        } else if (selectedScenario.includes('還需要多投中幾球')) {
                            const currentHits = answer;
                            const targetHits = (total * (numerator + 1)) / denominator;
                            answer = targetHits - currentHits;
                        } else if (selectedScenario.includes('每公頃收成')) {
                            const acres = answer;
                            const yieldPerAcre = parseInt(selectedScenario.match(/每公頃收成 (\d+) 噸/)[1]);
                            answer = acres * yieldPerAcre;
                        }
                        
                        questions.push({ 
                            question: `${i + 1}. ${selectedScenario}`, 
                            answer: answer
                        });
                        break;
                    }
                } while (true);
                break;
            case 'setTheoryFractions': // 集合應用的分數題型
                do {
                    // 生成兩個集合的基本分數，確保它們的和大於既不屬於的部分
                    const fractions = generateSetFractions();
                    const set1Name = ['近視', '戴眼鏡', '愛運動', '參加社團', '喜歡數學'][Math.floor(Math.random() * 5)];
                    const set2Name = ['砂眼', '課後補習', '會樂器', '住校', '喜歡國文'][Math.floor(Math.random() * 5)];
                    
                    if (fractions) {
                        // 生成隨機情境題
                        const scenarios = [
                            `某班級中，有${set1Name}的占${formatFraction(fractions.A.n, fractions.A.d)}，` +
                            `有${set2Name}的占${formatFraction(fractions.B.n, fractions.B.d)}，` +
                            `既不${set1Name}也沒有${set2Name}的占${formatFraction(fractions.neither.n, fractions.neither.d)}，` +
                            `請問：\n` +
                            `(1) 有${set1Name}又有${set2Name}的占全班的幾分之幾？\n` +
                            `(2) 只有${set1Name}沒有${set2Name}的占全班的幾分之幾？`
                        ];

                        const selectedScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
                        
                        questions.push({ 
                            question: `${i + 1}. ${selectedScenario}`, 
                            answer: `(1) ${formatFraction(fractions.intersection.n, fractions.intersection.d)}\n` +
                                    `(2) ${formatFraction(fractions.onlyA.n, fractions.onlyA.d)}`
                        });
                        break;
                    }
                } while (true);
                break;
        }
    }
    displayQuestions(questions);
}

function gcd(a, b) {
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

function lcm(a, b) {
    return (a * b) / gcd(a, b);
}

function displayQuestions(questions) {
    // 確保questions陣列不為空
    if (questions.length === 0) {
        alert("沒有生成任何題目！");
        return;
    }

    // 創建一個新的分頁顯示題目和答案
    const newTab = window.open();
    newTab.document.write('<html><head><title>題目和答案</title>');
    
    // 添加樣式
    newTab.document.write(`
        <style>
            body { font-family: Arial, sans-serif; margin: 15px; }
            h1 { font-size: 20px; margin-top: 20px; }
            .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
            .question, .answer { 
                font-size: 18px; 
                margin: 15px 0;
                line-height: 1.5;
            }
            .fraction {
                display: inline-block;
                vertical-align: middle;
                text-align: center;
                margin: 0 2px;
            }
            .fraction > span {
                display: block;
                padding: 0.1em;
            }
            .fraction span.denominator {
                border-top: 1px solid black;
            }
            .page-break {
                page-break-before: always;
                margin-top: 50px;
            }
            /* 添加數學運算符號的樣式 */
            .math-operator {
                margin: 0 4px;
                font-size: 18px;
            }
        </style>
    `);
    
    newTab.document.write('</head><body>');

    // 顯示題目
    newTab.document.write('<h1>題目</h1>');
    newTab.document.write('<div class="grid">');
    questions.forEach(q => {
        // 處理題目中的分數表示
        let questionText = q.question.replace(/(\d+)\/(\d+)/g, (match, num, den) => {
            return `<div class="fraction"><span class="numerator">${num}</span><span class="denominator">${den}</span></div>`;
        });
        newTab.document.write(`<div class="question">${questionText}</div>`);
    });
    newTab.document.write('</div>');

    // 添加分頁
    newTab.document.write('<div class="page-break"></div>');

    // 顯示答案
    newTab.document.write('<h1>答案</h1>');
    newTab.document.write('<div class="grid">');
    questions.forEach((q, index) => {
        newTab.document.write(`<div class="answer">${index + 1}. 答案: ${q.answer}</div>`);
    });
    newTab.document.write('</div>');

    newTab.document.write('</body></html>');
    newTab.document.close();
}

// 在文件末尾添加计算函数
function calculateWithPriority(nums, operators) {
    let numbers = [...nums];
    let ops = [...operators];
    
    // 處理乘除法
    for(let i = 0; i < ops.length; i++) {
        if(ops[i] === '×' || ops[i] === '÷') {
            let result;
            if(ops[i] === '×') {
                result = numbers[i] * numbers[i + 1];
            } else {
                result = numbers[i] / numbers[i + 1];
            }
            numbers.splice(i, 2, result);
            ops.splice(i, 1);
            i--;
        }
    }
    
    // 處理加減法
    let result = numbers[0];
    for(let i = 0; i < ops.length; i++) {
        if(ops[i] === '+') {
            result += numbers[i + 1];
        } else if(ops[i] === '-') {
            result -= numbers[i + 1];
        }
    }
    
    return result;
}

// 在文件末尾添加辅助函数
function formatPower(base, exponent) {
    // 如果指數為1，直接返回底數
    if (exponent === 1) {
        return base.toString();
    }
    
    // 將數字轉換為上標形
    const superscripts = {
        '1': '¹',
        '2': '²',
        '3': '³',
        '4': '⁴',
        '5': '⁵',
        '6': '⁶',
        '7': '⁷',
        '8': '⁸',
        '9': '⁹'
    };
    return `${base}${superscripts[exponent]}`;
}

// 修改 simplifyFraction 函數
function simplifyFraction(fraction) {
    const [numerator, denominator] = fraction.split('/').map(Number);
    const gcdValue = gcd(numerator, denominator);
    const simplifiedNumerator = numerator / gcdValue;
    const simplifiedDenominator = denominator / gcdValue;
    
    // 如果分母為1，直接返回整數
    if (simplifiedDenominator === 1) {
        return simplifiedNumerator.toString();
    }
    
    // 否則返回分數格式
    return formatFraction(simplifiedNumerator, simplifiedDenominator);
}

// 添加格式化分數的函數
function formatFraction(numerator, denominator) {
    return `<div class="fraction"><span class="numerator">${numerator}</span><span class="denominator">${denominator}</span></div>`;
}

// 添加輔助函數
function findPrimeFactors(num) {
    let factors = [];
    let divisor = 2;
    
    while (num > 1) {
        while (num % divisor === 0) {
            factors.push(divisor);
            num = num / divisor;
        }
        divisor++;
    }
    
    return factors;
}

function formatPrimeFactors(factors) {
    // 計算每個質因數的次數
    let counts = {};
    factors.forEach(factor => {
        counts[factor] = (counts[factor] || 0) + 1;
    });
    
    // 格式化輸出
    let result = [];
    Object.keys(counts).sort((a, b) => a - b).forEach(factor => {
        if (counts[factor] === 1) {
            result.push(factor);
        } else {
            result.push(formatPower(factor, counts[factor]));
        }
    });
    
    return result.join(' × ');
}

// 在文件末尾添加以下輔助函數：

function generateCompatibleFractions() {
    // 生成兩個合適的分數，確保它們的和不超過1
    let attempts = 0;
    while (attempts < 100) {
        const d1 = Math.floor(Math.random() * 4) + 2; // 2-5的分母
        const d2 = Math.floor(Math.random() * 4) + 2; // 2-5的分母
        const n1 = Math.floor(Math.random() * (d1 - 1)) + 1; // 分子小於分母
        const n2 = Math.floor(Math.random() * (d2 - 1)) + 1; // 分子小於分母

        const value1 = n1 / d1;
        const value2 = n2 / d2;

        if (value1 + value2 < 1) {
            return {
                frac1: { n: n1, d: d1, value: value1 },
                frac2: { n: n2, d: d2, value: value2 }
            };
        }
        attempts++;
    }
    // 如果找不到合適的分數，返回預設值
    return {
        frac1: { n: 1, d: 3, value: 1/3 },
        frac2: { n: 1, d: 4, value: 1/4 }
    };
}

function generateCompatibleThirdFraction(frac1, frac2) {
    // 計算可能的第三個分數
    const total = 1;
    const usedSum = frac1.value + frac2.value;
    const remainingSpace = total - usedSum;

    // 尋找適合的分母（2-6）
    for (let d = 2; d <= 6; d++) {
        for (let n = 1; n < d; n++) {
            const value = n / d;
            if (Math.abs(value - remainingSpace) < 0.0001) { // 使用小數點比較
                return { n, d, value };
            }
        }
    }
    return null;
}

function formatFractionValue(value) {
    // 將小數轉換為最簡分數
    const tolerance = 1.0e-6;
    let h1 = 1;
    let h2 = 0;
    let k1 = 0;
    let k2 = 1;
    let b = value;
    do {
        let a = Math.floor(b);
        let aux = h1;
        h1 = a * h1 + h2;
        h2 = aux;
        aux = k1;
        k1 = a * k1 + k2;
        k2 = aux;
        b = 1 / (b - a);
    } while (Math.abs(value - h1 / k1) > value * tolerance);

    return formatFraction(h1, k1);
}

// 修改輔助函數：
function generateSetFractions() {
    let attempts = 0;
    
    while (attempts < 300) {
        // 生成分母範圍
        const denominators = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        
        // 隨機選擇分母
        const shuffledDenominators = [...denominators].sort(() => Math.random() - 0.5);
        const commonDenominator = shuffledDenominators[0]; // 使用共同分母
        
        // 生成各部分的分子（確保總和為分母）
        const maxNumerator = commonDenominator - 1;
        
        // 先生成交集部分（A∩B）
        const intersectionN = Math.floor(Math.random() * (maxNumerator / 4)) + 1;
        
        // 生成只屬於A的部分（A-B）
        const remainingAfterIntersection = maxNumerator - intersectionN;
        const onlyAN = Math.floor(Math.random() * (remainingAfterIntersection / 3)) + 1;
        
        // 生成只屬於B的部分（B-A）
        const remainingAfterOnlyA = remainingAfterIntersection - onlyAN;
        const onlyBN = Math.floor(Math.random() * (remainingAfterOnlyA / 2)) + 1;
        
        // 計算既不屬於A也不屬於B的部分
        const neitherN = commonDenominator - (intersectionN + onlyAN + onlyBN);
        
        if (neitherN > 0) {
            // 計算A和B的總比例
            const AN = intersectionN + onlyAN;
            const BN = intersectionN + onlyBN;
            
            // 創建分數對象
            const A = reduceFraction(AN, commonDenominator);
            const B = reduceFraction(BN, commonDenominator);
            const neither = reduceFraction(neitherN, commonDenominator);
            const intersection = reduceFraction(intersectionN, commonDenominator);
            const onlyA = reduceFraction(onlyAN, commonDenominator);
            
            // 創建唯一標識符
            const combinationKey = `${A.n}/${A.d}-${B.n}/${B.d}-${neither.n}/${neither.d}-${intersection.n}/${intersection.d}-${onlyA.n}/${onlyA.d}`;
            
            // 確保這個組合沒有被使用過
            if (!usedFractionCombinations.has(combinationKey)) {
                usedFractionCombinations.add(combinationKey);
                
                return {
                    A: A,
                    B: B,
                    neither: neither,
                    intersection: intersection,
                    onlyA: onlyA
                };
            }
        }
        attempts++;
    }
    
    // 預設值（確保這些值是正確的）
    const defaultValues = [
        {
            A: { n: 4, d: 10 },      // 4/10
            B: { n: 3, d: 10 },      // 3/10
            neither: { n: 4, d: 10 }, // 4/10
            intersection: { n: 1, d: 10 }, // 1/10
            onlyA: { n: 3, d: 10 }    // 3/10
        },
        {
            A: { n: 5, d: 12 },      // 5/12
            B: { n: 4, d: 12 },      // 4/12
            neither: { n: 4, d: 12 }, // 4/12
            intersection: { n: 2, d: 12 }, // 2/12
            onlyA: { n: 3, d: 12 }    // 3/12
        },
        {
            A: { n: 6, d: 15 },      // 6/15
            B: { n: 5, d: 15 },      // 5/15
            neither: { n: 5, d: 15 }, // 5/15
            intersection: { n: 2, d: 15 }, // 2/15
            onlyA: { n: 4, d: 15 }    // 4/15
        }
    ];
    
    // 從未使用過的預設值中選擇一個
    for (let value of defaultValues) {
        const key = `${value.A.n}/${value.A.d}-${value.B.n}/${value.B.d}-${value.neither.n}/${value.neither.d}-${value.intersection.n}/${value.intersection.d}-${value.onlyA.n}/${value.onlyA.d}`;
        if (!usedFractionCombinations.has(key)) {
            usedFractionCombinations.add(key);
            return value;
        }
    }
    
    // 如果所有預設值都被使用過，返回第一個預設值
    return defaultValues[0];
}

// 新增輔助函數：
function reduceFraction(n, d) {
    const gcd = (a, b) => b ? gcd(b, a % b) : a;
    const divisor = gcd(Math.abs(n), Math.abs(d));
    return {
        n: n / divisor,
        d: d / divisor
    };
}