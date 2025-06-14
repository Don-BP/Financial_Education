// js/comparison-calculator.js
document.addEventListener('DOMContentLoaded', function () {
    const monthlyPremiumInput = document.getElementById('monthly-premium');
    const policyYearsInput = document.getElementById('policy-years');
    const cashValueInput = document.getElementById('cash-value');
    const deathBenefitInput = document.getElementById('death-benefit');
    const annualReturnInput = document.getElementById('annual-return');

    const investPremiumInput = document.getElementById('invest-premium');
    const investYearsInput = document.getElementById('invest-years');
    
    const calculateBtn = document.getElementById('calculate-comparison-btn');
    const resultsDiv = document.getElementById('comparison-results');

    function syncInputs() {
        investPremiumInput.value = monthlyPremiumInput.value;
        investYearsInput.value = policyYearsInput.value;
    }
    monthlyPremiumInput.addEventListener('input', syncInputs);
    policyYearsInput.addEventListener('input', syncInputs);

    calculateBtn.addEventListener('click', function() {
        const monthlyPremium = parseFloat(monthlyPremiumInput.value) || 0;
        const years = parseFloat(policyYearsInput.value) || 0;
        const cashValue = parseFloat(cashValueInput.value) || 0;
        const deathBenefit = parseFloat(deathBenefitInput.value) || 0;
        const annualReturn = (parseFloat(annualReturnInput.value) || 0) / 100;

        if (monthlyPremium === 0 || years === 0) {
            alert("Please enter a valid monthly premium and number of years.");
            return;
        }

        const totalPaid = monthlyPremium * years * 12;
        const insuranceGain = cashValue - totalPaid;
        const fees = totalPaid - cashValue > 0 ? totalPaid - cashValue : 0;
        
        const monthlyRate = annualReturn / 12;
        const numPayments = years * 12;
        const futureValueInvest = monthlyPremium * ((Math.pow(1 + monthlyRate, numPayments) - 1) / monthlyRate);
        const opportunityCost = futureValueInvest - cashValue;

        resultsDiv.innerHTML = `
            <h4>Results After ${years} Years</h4>
            <div class="two-col-layout" style="text-align: left;">
                <div>
                    <h4 data-lang-key="insurance_calc_h4_1">1. Your "Savings" Insurance Policy</h4>
                    <p><strong>What you paid in (Total Premiums):</strong> ¥${totalPaid.toLocaleString()}</p>
                    <hr>
                    <p><u><strong>If you LIVE</strong> (Cancel Policy):</u></p>
                    <p><strong>What you get back (Cash Value):</strong> <strong style="font-size:1.2rem;">¥${cashValue.toLocaleString()}</strong></p>
                    <p class="gain"><strong>Your Net Gain / Loss:</strong> <span class="${insuranceGain >= 0 ? 'winner' : 'loser'}">¥${insuranceGain.toLocaleString()}</span></p>
                    ${fees > 0 ? `<p class="loser"><strong>(Amount taken in fees/costs: ¥${fees.toLocaleString()})</strong></p>` : ''}
                    <hr>
                    <p><u><strong>If you PASS AWAY:</strong></u></p>
                    <p><strong>Death Benefit for Family:</strong> <strong style="font-size:1.2rem;">¥${deathBenefit.toLocaleString()}</strong></p>
                </div>
                <div>
                    <h4 data-lang-key="insurance_calc_h4_2">2. A Smarter Investment Plan</h4>
                    <p><strong>What you paid in:</strong> ¥${totalPaid.toLocaleString()}</p>
                    <hr>
                     <p><u><strong>If you LIVE:</strong></u></p>
                    <p><strong>What you get back (Final Value):</strong> <strong class="final-value winner" style="font-size:1.2rem;">¥${futureValueInvest.toLocaleString('ja-JP', { maximumFractionDigits: 0 })}</strong></p>
                </div>
            </div>
            <div class="results-explanation">
                <h4 style="text-align:center;">What This Means For You</h4>
                <p>The insurance policy provides a Death Benefit, which is its primary purpose. However, look at the numbers for when you are <strong>ALIVE</strong>.</p>
                <p>In the Investment Plan, you would have <strong>¥${futureValueInvest.toLocaleString('ja-JP', { maximumFractionDigits: 0 })}</strong> to use for your own retirement, travel, or any life goal.</p>
                <p>In the Insurance Plan, you would only have <strong>¥${cashValue.toLocaleString()}</strong>.</p>
                <p>The "Opportunity Cost"—the money you missed out on by not investing—is a staggering <strong style="font-size: 1.5rem; color: var(--color-accent);">¥${opportunityCost.toLocaleString('ja-JP', { maximumFractionDigits: 0 })}</strong>. This highlights why it's often better to buy cheaper, pure "term" life insurance for protection and invest the rest of your money separately for growth. This way, you plan for both your family's future and your own.</p>
            </div>
        `;
        resultsDiv.style.display = 'block';
    });
});