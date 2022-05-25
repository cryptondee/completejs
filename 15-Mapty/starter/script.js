'use strict';

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class Workout {
  date = new Date();
  id = +new Date() + ''.slice(-10);

  constructor(coords, distance, duration) {
    this.coords = coords; // Array of lat and lan
    this.distance = distance; // KM
    this.duration = duration; // in Min
  }
  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }
}

class Running extends Workout {
  type = 'running';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDescription();
  }

  calcPace() {
    // usually min per KM
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}
class Cycling extends Workout {
  type = 'cycling';
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this._setDescription();
  }
  calcSpeed() {
    // KM per hour
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}
const run1 = new Running([39, -12], 5.2, 24, 178);
const cycleling1 = new Cycling([39, -12], 27, 95, 523);
console.log(run1);
console.log(cycleling1);

//////////////
// Application architecture
class App {
  #map;
  #mapEvent;
  #workouts = [];
  #mapZoomLevel = 13;

  constructor() {
    // get users position
    this._getPosition();
    // get data from local storage
    this._getLocalStorage();
    // event handlers
    form.addEventListener('submit', this._newWorkOut.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
  }
  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('Could not get your location');
        }
      );
    }
  }
  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    const coords = [latitude, longitude];

    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    this.#workouts.forEach(work => {
      this._renderWorkoutMarker(work);
    });

    // handling clicks on map
    this.#map.on('click', this._showForm.bind(this));
  }
  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }
  _hideElements() {
    form.style.display = 'none';
    form.classList.add('hidden');
    inputCadence.value =
      inputDistance.value =
      inputDuration.value =
      inputElevation.value =
        '';
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }
  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }
  _newWorkOut(e) {
    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp));
    e.preventDefault(e);
    // get data from from
    const allPositive = (...inputs) => inputs.every(inp => inp > 0);

    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;

    let workout;
    // if workout is running, create running object
    if (type === 'running') {
      const cadence = +inputCadence.value;
      if (
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      )
        return alert('Inputs only positive numbers');
      workout = new Running([lat, lng], distance, duration, cadence);
      this.#workouts.push(workout);
    }

    // if workout cycling, create cycling object
    if (type === 'cycling') {
      const elevation = +inputElevation.value;
      if (
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration)
      )
        return alert('Inputs only positive numbers');
      workout = new Cycling([lat, lng], distance, duration, elevation);
      this.#workouts.push(workout);
    }

    // add new object to workout array

    //render workout on maps as marker
    this._renderWorkoutMarker(workout);
    // render workout on list
    this._renderWorkout(workout);

    // hide from + clear field.
    this._hideElements();

    this._setLocalStorage();
  }
  _renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          CloseOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♂️'} ${workout.description}`
      )
      .openPopup();
  }

  _renderWorkout(workout) {
    let html = `
    <li class="workout workout--${workout.type}" data-id="${workout.id}">
    <h2 class="workout__title">${workout.description}</h2>
    <div class="workout__details">
      <span class="workout__icon"> ${
        workout.type === 'running' ? '🏃‍♂️' : '🚴‍♂️'
      }</span>
      <span class="workout_value">${workout.distance} </span>
      <span class="workout__unit"> KM </span>
    </div>
    <div class="workout__details">
      <span class="workout__icoin">⏲ </span>
      <span class="workout__value">${workout.duration} </span
      <span class="workout__unit">min </span>
    </div>
    `;

    if (workout.type === 'running')
      html += `
    <div class="workout__details">
      <span class="workout__icoin">⚡ </span>
      <span class="workout_value">${workout.pace.toFixed(1)}</span>
      <span class="workout__unit">min/km </span>
    </div>
    <div class="workout__details">
      <span class="workout__icon"> 👌</span>
      <span class="workout__value">${workout.cadence}</span>
      <span class="workout__unit"> spm </span>
    </div>
    </li>
    `;

    if (workout.type === 'cycling')
      html += `
    <div class="workout__details">
      <span class="workout__icon> ⚡</span>
      <span class="workout__value">${workout.speed.toFixed(1)}</span>
      <span class="workout__unit">KM </span>
    </div>
    <div class="workout__details">
      <span class=workout__icoin"> 👌</span>
      <span class="workout__value">${workout.elevationGain}</span>
      <span class="workout__unit">m</span>
    </div>
    </li>
    
    `;

    form.insertAdjacentHTML('afterend', html);
  }
  _moveToPopup(e) {
    const workoutEl = e.target.closest('.workout');

    if (!workoutEl) return;
    const workout = this.#workouts.find(
      work => work.id === workoutEl.dataset.id
    );

    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
  }
  _setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }
  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workouts'));
    console.log(data);
    if (!data) return;
    this.#workouts = data;
    this.#workouts.forEach(work => {
      this._renderWorkout(work);
    });
  }
  reset() {
    localStorage.removeItem('workouts');
    location.reload();
  }
}

const app = new App();
