const progressCircleBarComponent = (element) => {
    element.innerHTML =
    `
    <div class="progress_container">
        <div class="progress_bar">
            <svg class="progress_circle__wrapper" width="120" height="120">
                <circle  class="progress_circle__background" cx="60" cy="60" r="50"></circle>
                <circle class="progress_circle" cx="60" cy="60" r="50"></circle>
            </svg>
        </div>
        <div class="progress_menu">
            <label for="value-input">
                <input type="number" id="value-input" value="100">
                Value
            </label>
            <label for="animate-checkbox" class="knob">
                <input type="checkbox" id="animate-checkbox">
                <i></i>
                Animate
            </label>
            <label for="hide-checkbox" class="knob">
                <input type="checkbox" id="hide-checkbox">
                <i></i>
                Hide
            </label>
        </div>
    </div>
    `;

    const circle = document.querySelector('.progress_circle');
    const valueInput = document.getElementById('value-input');
    const animateCheckbox = document.getElementById('animate-checkbox');
    const hideCheckbox = document.getElementById('hide-checkbox');

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
    valueInput.removeEventListener('onmouseover', changeValueInput);
}
const progressBar = document.getElementById('progress-circle');
progressCircleBarComponent(progressBar);