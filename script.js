window.onload = function() {
    setTimeout(function() {
        document.getElementById('loading-screen').style.display = 'none';
        document.getElementById('upload-screen').style.display = 'block';
    }, 5000); // 5 seconds
};

function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = (err) => reject(err);
    });
}

function generateRakhiImage() {
    const sisterInput = document.getElementById('sister').files[0];
    const brotherInput = document.getElementById('brother').files[0];

    if (sisterInput && brotherInput) {
        const sisterBox = document.getElementById('sister-box');
        const brotherBox = document.getElementById('brother-box');

        const sisterImgSrc = URL.createObjectURL(sisterInput);
        const brotherImgSrc = URL.createObjectURL(brotherInput);

        Promise.all([loadImage(sisterImgSrc), loadImage(brotherImgSrc)])
            .then(([sisterImg, brotherImg]) => {
                sisterBox.innerHTML = ''; // Clear previous content
                brotherBox.innerHTML = ''; // Clear previous content
                sisterBox.appendChild(sisterImg);
                brotherBox.appendChild(brotherImg);

                // Show the result screen
                document.getElementById('upload-screen').style.display = 'none';
                document.getElementById('result-screen').style.display = 'block';
            })
            .catch(err => {
                console.error('Failed to load images', err);
                alert('Error loading images. Please try again.');
            })
            .finally(() => {
                URL.revokeObjectURL(sisterImgSrc); // Free up memory
                URL.revokeObjectURL(brotherImgSrc); // Free up memory
            });
    } else {
        alert('Please upload both images.');
    }
}

document.getElementById('downloadLink').addEventListener('click', function() {
    html2canvas(document.getElementById('result-container'), {
        useCORS: true, // Helps with cross-origin images
    }).then(function(canvas) {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'rakhi_image.png';
        link.click();
    });
});
