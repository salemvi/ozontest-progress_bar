const progressCircleBarComponent = (targetElement) => {

    const uuid = () => {
        return (Math.random() + 1).toString(36).substring(7)
    }

    const circleId = uuid();
    const valueInputId = uuid();
    const animateCheckboxId = uuid();
    const hideCheckboxId = uuid();

    targetElement.innerHTML =
    `
    <div class="progress_container">
        <div class="progress_bar">
            <svg class="progress_circle__wrapper" width="120" height="120">
                <circle  class="progress_circle__background" cx="60" cy="60" r="50"></circle>
                <circle class="progress_circle" id="${circleId}" cx="60" cy="60" r="50"></circle>
            </svg>
        </div>
        <div class="progress_menu">
            <label for="${valueInputId}">
                <input class="value_input" type="number" id="${valueInputId}" value="100">
                Value
            </label>
            <label for="${animateCheckboxId}" class="knob">
                <input type="checkbox" id="${animateCheckboxId}">
                <i></i>
                Animate
            </label>
            <label for="${hideCheckboxId}" class="knob">
                <input type="checkbox" id="${hideCheckboxId}">
                <i></i>
                Hide
            </label>
        </div>
    </div>
    `;

    const circle = document.getElementById(circleId);
    const valueInput = document.getElementById(valueInputId);
    const animateCheckbox = document.getElementById(animateCheckboxId);
    const hideCheckbox = document.getElementById(hideCheckboxId);

    const changeValueInput = () => {
        const { value } = valueInput;
        if (value > 100) {
            valueInput.value = 100;
        }
        if (value >= -100 && value < 0) {
            valueInput.value = Math.abs(value)

        }
        if (value < -100) {
            valueInput.value = 0;
        }
        const progress = (314 * (100 - Math.abs(valueInput.value))) / 100;
        circle.style.strokeDashoffset = progress;
    }
    
    const changeCheckboxAnimation = () => {
        if (animateCheckbox.checked) {
            circle.classList.add('animate');
        } else {
            circle.classList.remove('animate');
        }
    }

    const changeCheckboxHidden = () => {
        const isHidden = hideCheckbox.checked;
        if (isHidden) {
            document.querySelector('.progress_circle__wrapper').style.display = 'none';
            animateCheckbox.disabled = true;
            circle.classList.remove('animate');
            animateCheckbox.checked = false
            valueInput.disabled = true;
        } else {
            document.querySelector('.progress_circle__wrapper').style.display = 'flex';
            valueInput.disabled = false;
            animateCheckbox.disabled = false;
        }
    }

    valueInput.addEventListener('input', changeValueInput);
    animateCheckbox.addEventListener('change', changeCheckboxAnimation);
    hideCheckbox.addEventListener('change', changeCheckboxHidden);

    return () => {
        targetElement.innerHTML = '';
        valueInput.removeEventListener('input', changeValueInput);
        animateCheckbox.removeEventListener('change', changeCheckboxAnimation);
        hideCheckbox.removeEventListener('change', changeCheckboxHidden);
    };
}

const progressBar = document.getElementById('target-element');
progressCircleBarComponent(progressBar);
