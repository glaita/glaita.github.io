document.getElementById('watering-form').addEventListener('submit', function(event) {
    event.preventDefault();
    let currentWater = parseFloat(document.getElementById('current-water').value);
    let result = calculateWatering(currentWater);
    document.getElementById('water-result').innerHTML = result.message;
    document.getElementById('water-result').style.display = 'block';
    displayWaterImages(result.solution);
});

document.getElementById('soil-form').addEventListener('submit', function(event) {
    event.preventDefault();
    let currentSoil = parseFloat(document.getElementById('current-soil').value);
    let result = calculateSoiling(currentSoil);
    document.getElementById('soil-result').innerHTML = result;
    document.getElementById('soil-result').style.display = 'block';
});

function calculateWatering(currentWater) {
    const maxWater = 100;
    const minWater = 90;
    const cans = [
        { name: 'Gold', fill: 35 },
        { name: 'Silver', fill: 24 },
        { name: 'Black', fill: 15 }
    ];

    let closest = currentWater;
    let bestSolution = [];

    function helper(current, usedCans) {
        if (current > closest && current <= maxWater) {
            closest = current;
            bestSolution = usedCans.slice();
        }
        if (current >= maxWater) return;

        for (let i = 0; i < cans.length; i++) {
            helper(current + cans[i].fill, usedCans.concat(cans[i].name));
        }
    }

    helper(currentWater, []);

    return {
        message: `YOO! You'll need: ${bestSolution.join(', ')}. to get: ${closest}% water.`,
        solution: bestSolution
    };
}

function displayWaterImages(solution) {
    const imagesDiv = document.getElementById('water-images');
    imagesDiv.innerHTML = '';
    const imagePaths = {
        'Gold': './gold.png',
        'Silver': './silver.png',
        'Black': './black.png'
    };

    solution.forEach(can => {
        const img = document.createElement('img');
        img.src = imagePaths[can];
        img.alt = can;
        imagesDiv.appendChild(img);
    });
}

function calculateSoiling(currentSoil) {
    const maxSoil = 100;
    const minSoil = 90;
    const soilIncrement = 24;

    let closest = currentSoil;
    let bestSolution = [];

    function helper(current, usedSoil) {
        if (current > closest && current <= maxSoil) {
            closest = current;
            bestSolution = usedSoil.slice();
        }
        if (current >= maxSoil) return;

        helper(current + soilIncrement, usedSoil.concat('Soil'));
    }

    helper(currentSoil, []);

    if (bestSolution.length === 0)
        {
            return 'You are already at the optimal soil level!';

    return `YOO! You'll need: ${bestSolution.join(', ')}. to get: ${closest}% soil.`;
}
