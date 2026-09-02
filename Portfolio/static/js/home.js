const animatedText = document.querySelector('.animated_text');

const texts = [
    'Software Engineering Student',
    'Python And Django Developer',
    'C++ and Java Developer',
    'Building Real World Projects',
    'Consistency Beats Intensity'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function textAnimate() {

    const currentText = texts[textIndex];

    if (isDeleting) {

        animatedText.textContent = currentText.slice(0, charIndex);
        charIndex--;

        if (charIndex < 0) {

            isDeleting = false;
            charIndex = 0;

            textIndex++;

            if (textIndex >= texts.length) {
                textIndex = 0;
            }
        }

        setTimeout(textAnimate, 50);

    } else {

        animatedText.textContent = currentText.slice(0, charIndex + 1);
        charIndex++;

        if (charIndex >= currentText.length) {

            isDeleting = true;

            setTimeout(textAnimate, 1500);

        } else {

            setTimeout(textAnimate, 100);
        }
    }
}

textAnimate();