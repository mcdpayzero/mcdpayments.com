document.addEventListener('DOMContentLoaded', () => {
    const calculatorForm = document.getElementById('savings-calculator');
    const resultsOutput = document.getElementById('results-output');

    if (calculatorForm) {
        calculatorForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const volumeInput = document.getElementById('monthly-volume');
            const feesInput = document.getElementById('monthly-fees');

            const monthlyVolume = parseFloat(volumeInput.value);
            const monthlyFees = parseFloat(feesInput.value);

            // 1. Validation
            if (isNaN(monthlyVolume) || isNaN(monthlyFees) || monthlyVolume <= 0 || monthlyFees <= 0) {
                alert("Please enter valid, positive numbers for both Monthly Processing Volume and Fees.");
                resultsOutput.classList.add('hidden');
                return;
            }

            // Helper function for currency formatting
            const formatCurrency = (amount) => `$${parseFloat(amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}`;

            // 2. Calculations
            
            // Current Effective Rate: (Fees / Volume) * 100
            const currentRate = ((monthlyFees / monthlyVolume) * 100).toFixed(2);
            
            // Estimated Monthly Savings (Assuming full elimination of fees)
            const monthlySavings = monthlyFees.toFixed(2);
            
            // Estimated Annual Savings
            const annualSavings = (monthlyFees * 12).toFixed(2);

            // 3. Update the Results Display
            document.getElementById('current-rate').textContent = `${currentRate}%`;
            document.getElementById('monthly-savings').textContent = formatCurrency(monthlySavings);
            document.getElementById('annual-savings').textContent = formatCurrency(annualSavings);

            // Show the results container
            resultsOutput.classList.remove('hidden');
        });
    }
});
