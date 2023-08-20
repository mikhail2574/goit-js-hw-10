import { fetchBreeds, fetchCatByBreed } from './cat-api';

import SlimSelect from 'slim-select';
import '../node_modules/slim-select/dist/slimselect.css';

let optionsContainer = document.querySelector('.breed-select');
let infoContainer = document.querySelector('.cat-info');
let loader = document.querySelector('p.loader');
let errorAlert = document.querySelector('p.error');

function optionsMarkup(data) {
  return data
    .map(item => {
      const { name, reference_image_id } = item;
      return `<option value="${reference_image_id}">${name}</option>`;
    })
    .join('');
}

function catMarkup(cat) {
  const {
    url,
    breeds: {
      0: { description, temperament, name },
    },
  } = cat;
  loader.classList.remove('visible');
  return `<h2>${name}</h2><div class="info-container"><img width="500" src="${url}" class="cat-image"><div class="text-container"><p class="cat-p">${description}</p><p class="cat-p"><span class="bold">Temperament: </span>${temperament}</p></div></div>`;
}

fetchBreeds()
  .then(data => {
    console.log(data);
    optionsContainer.innerHTML = optionsMarkup(data);
  })
  .catch(error => errorAlert.classList.add('visible'));

optionsContainer.addEventListener('input', () => {
  loader.classList.add('visible');
  fetchCatByBreed(optionsContainer.value)
    .then(cat => (infoContainer.innerHTML = catMarkup(cat)))
    .catch(error => errorAlert.classList.add('visible'));
});

new SlimSelect({
  select: '#single',
  settings: {
    placeholderText: 'Select a cat',
  },
});
