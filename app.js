document.getElementById("calcBtn").addEventListener("click", () => {
    const decimal = parseInt(document.getElementById("decimal").value);
    const rawInput = document.getElementById("numbers").value.trim();

    if (!rawInput) return alert("請輸入數值");

    // 支援逗號與空格分隔
    const numbers = rawInput
        .split(/[\s,]+/)
        .map(n => parseFloat(n))
        .filter(n => !isNaN(n));

    if (numbers.length === 0) return alert("請輸入正確的數字格式");

    const mean = numbers.reduce((a, b) => a + b, 0) / numbers.length;

    const stdType = document.querySelector("input[name='stdType']:checked").value;

    let variance;

    if (stdType === "sample") {
        // 樣本變異數 (n-1)
        const avg = mean;
        variance = numbers.reduce((sum, val) => sum + Math.pow(val - avg, 2), 0) / (numbers.length - 1);
    } else {
        // 母體變異數 (n)
        const avg = mean;
        variance = numbers.reduce((sum, val) => sum + Math.pow(val - avg, 2), 0) / numbers.length;
    }

    const sd = Math.sqrt(variance);

    // CV = SD / Mean (顯示為百分比)
    const cv = (sd / mean) * 100;

    document.getElementById("mean").textContent = mean.toFixed(decimal);
    document.getElementById("sd").textContent = sd.toFixed(decimal);
    document.getElementById("cv").textContent = cv.toFixed(decimal) + "%";

    document.getElementById("result").classList.remove("hidden");
});
