// app.js

document.getElementById("calcBtn").addEventListener("click", function () {
    const raw = document.getElementById("numbers").value.trim();
    const decimal = parseInt(document.getElementById("decimal").value) || 2;

    // 支援空格、逗號、混合分隔
    const values = raw
        .split(/[\s,]+/)
        .map(Number)
        .filter(n => !isNaN(n));

    if (values.length === 0) {
        alert("請輸入至少一個有效數字！");
        return;
    }

    // 平均
    const mean = values.reduce((a, b) => a + b, 0) / values.length;

    // 標準差（樣本 or 母體）
    const stdType = document.querySelector('input[name="stdType"]:checked').value;
    const meanDiffSq = values.map(n => Math.pow(n - mean, 2));
    const divisor = stdType === "sample" ? values.length - 1 : values.length;

    const std = Math.sqrt(meanDiffSq.reduce((a, b) => a + b, 0) / divisor);

    // CV（百分比型態）
    const cv = (std / mean) * 100;

    // 輸出結果
    document.getElementById("mean").textContent =
        `平均 (Mean)：${mean.toFixed(decimal)}`;

    document.getElementById("std").textContent =
        `標準差 (SD)：${std.toFixed(decimal)}`;

    document.getElementById("cv").textContent =
        `變異係數 (CV)：${cv.toFixed(decimal)}%`;

    document.getElementById("result").classList.remove("hidden");
});
