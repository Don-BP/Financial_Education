document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('calculate-compound-btn').addEventListener('click', function() {
        const principal = parseFloat(document.getElementById('initial-investment').value) || 0;
        const monthlyContribution = parseFloat(document.getElementById('monthly-contribution').value) || 0;
        const years = parseFloat(document.getElementById('investment-years').value) || 0;
        const annualRate = (parseFloat(document.getElementById('ci-annual-return').value) || 0) / 100;

        if (years === 0) {
            alert("Please enter a valid number of years.");
            return;
        }

        const monthlyRate = annualRate / 12;
        const months = years * 12;

        let futureValue = principal * Math.pow(1 + monthlyRate, months);
        if (monthlyContribution > 0) {
            futureValue += monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
        }

        const totalContributions = principal + (monthlyContribution * months);
        const totalInterest = futureValue - totalContributions;

        document.getElementById('years-text').textContent = years;
        document.getElementById('compound-amount').textContent = `¥${futureValue.toLocaleString('ja-JP', { maximumFractionDigits: 0 })}`;
        document.getElementById('total-contributions').textContent = `¥${totalContributions.toLocaleString('ja-JP')}`;
        document.getElementById('total-interest').textContent = `¥${totalInterest.toLocaleString('ja-JP', { maximumFractionDigits: 0 })}`;
        
        const oldExplanation = document.querySelector('#compound-results .results-explanation');
        if(oldExplanation) oldExplanation.remove();
        
        const explanationDiv = document.createElement('div');
        explanationDiv.className = 'results-explanation';
        explanationDiv.innerHTML = `<hr>
        <p><strong>IMPACT:</strong> Notice how the 'Total Interest Earned' is a huge portion of your final value. This is your money working for you. Over long periods, the growth from compounding can vastly exceed your own contributions. This is the path to true financial independence.</p>`;
        document.getElementById('compound-results').appendChild(explanationDiv);

        document.getElementById('compound-results').style.display = 'block';
    });
});