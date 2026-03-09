
document.addEventListener('DOMContentLoaded', () => {
    letterBox();
});
function letterBox() {
    const container = document.getElementById('letter-box');

    if (!container) {
        setTimeout(letterBox, 50);
        return;
    }

    const letters = ["R","E","T","H","I","N","K","space","G","R","O","U","P","S"];

    container.innerHTML = '';

    letters.forEach((char) => {

        if (char === "space") {
            const space = document.createElement('div');
            space.style.width = "40px";
            container.appendChild(space);
            return;
        }
        const wrapper = document.createElement('div');
        wrapper.classList.add('letter-wrapper');
        wrapper.style.setProperty('--mask', `url(../../public/assets/images/Vector-${char}.svg)`);
        const img = document.createElement('img');
        img.src = `public/assets/images/Vector-${char}.svg`;
        img.classList.add('letter-img');
        wrapper.appendChild(img);
        container.appendChild(wrapper);

        //    wrapper.style.webkitMaskImage = `url(../../public/assets/images/Vector-${char}.svg)`;
        // wrapper.style.maskImage = `url(../../public/assets/images/Vector-${char}.svg)`;
        // wrapper.style.webkitMaskSize = "contain";
        // wrapper.style.maskSize = "contain";
        // wrapper.style.webkitMaskRepeat = "no-repeat";
        // wrapper.style.maskRepeat = "no-repeat";
        // wrapper.style.webkitMaskPosition = "center";
        // wrapper.style.maskPosition = "center";
    });
}
letterBox();
