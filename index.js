document.getElementById('categoryForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const selectedPeriod = document.getElementById('period').value;
    const selectedDepartment = document.getElementById('Department').value;

    // 可以在这里添加将选择传递到另一个页面的逻辑
    // 例如，使用 URL 参数
    const queryParameters = `period=${selectedPeriod}&department=${selectedDepartment}`;
    window.location.href = `explore.html?${queryParameters}`;

    // 如果不跳转，而是直接在当前页面加载艺术品
    // loadArtworks(selectedCulture, selectedPeriod, selectedDepartment);
});
