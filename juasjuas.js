 const upBtn = document.getElementById('up');
const downBtn = document.getElementById('down');
const leftBtn = document.getElementById('left');
const rightBtn = document.getElementById('right');
const led = document.getElementById('led');
const ledText = document.getElementById('led-text');

// Variables para saber qué botones están presionados
let pressed = {
  up: false,
  down: false,
  left: false,
  right: false
};

// Función para actualizar el estado del LED
function updateLED() {
  const forward = pressed.up;
  const backward = pressed.down;
  const left = pressed.left;
  const right = pressed.right;

  // Si no hay ningún botón presionado → LED apagado
  if (!forward && !backward && !left && !right) {
    led.classList.remove('on', 'drift');
    led.style.background = 'gray';
    led.style.boxShadow = '0 0 15px rgba(255,255,255,0.3)';
    ledText.textContent = 'LED apagado';
    return;
  }

  // Si hay combinación diagonal → modo drift
  if ((forward || backward) && (left || right)) {
    led.classList.add('on');
    led.style.background = 'red';
    led.style.boxShadow = '0 0 20px red';
    ledText.textContent = '🚗 Drift activado';
  } else {
    // Movimiento simple → LED verde
    led.classList.add('on');
    led.style.background = '#00ff00';
    led.style.boxShadow = '0 0 20px #00ff00';
    
    if (forward) ledText.textContent = 'Avanzando...';
    else if (backward) ledText.textContent = 'Retrocediendo...';
    else if (left) ledText.textContent = 'Girando a la izquierda...';
    else if (right) ledText.textContent = 'Girando a la derecha...';
  }
}

// Funciones de pulsación
function pressButton(direction) {
  pressed[direction] = true;
  updateLED();
}

function releaseButton(direction) {
  pressed[direction] = false;
  updateLED();
}

// Asignar eventos para PC y móvil
const buttons = [
  { element: upBtn, dir: 'up' },
  { element: downBtn, dir: 'down' },
  { element: leftBtn, dir: 'left' },
  { element: rightBtn, dir: 'right' }
];

buttons.forEach(({ element, dir }) => {
  element.addEventListener('mousedown', () => pressButton(dir));
  element.addEventListener('mouseup', () => releaseButton(dir));
  element.addEventListener('mouseleave', () => releaseButton(dir));

  element.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Evita el zoom o selección en móvil
    pressButton(dir);
  });
  element.addEventListener('touchend', (e) => {
    e.preventDefault();
    releaseButton(dir);
  });
});
