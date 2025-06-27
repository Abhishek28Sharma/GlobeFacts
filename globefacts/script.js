'use strict'

const countriesContainer = document.querySelector('.countries-container')
const filterByRegion = document.querySelector('.filter-by-region')
const searchInput = document.querySelector('.search-container input')
let allCountriesData
const darkModeBtn = document.querySelector('.header-content p')
fetch('https://restcountries.com/v3.1/region/asia')
  .then((res) => {
    return res.json()
  })
  .then((data) => {
    renderCountries(data)
    allCountriesData = data
  })
  .catch((err) => {
    errorOnFetching()
  })

//

filterByRegion.addEventListener('change', (e) => {
  // console.log(filterByRegion.value)
  fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      // console.log(data)
      renderCountries(data)
    })
    .catch((err) => {
      // console.error('Fetch error:', err)
      errorOnFetching()
    })
})

function errorOnFetching() {
  const errorCard = document.createElement('div')
  errorCard.classList.add('error-card')

  const errorContent = document.createElement('p')
  errorContent.innerText = 'Some error occurred'

  errorCard.append(errorContent)
  countriesContainer.classList.add('countries-container-error')
  countriesContainer.append(errorCard)
}

function renderCountries(data) {
  countriesContainer.innerHTML = ''
  data.forEach((country) => {
    const countryCard = document.createElement('a')
    countryCard.classList.add('country-card')
    countryCard.href = `/country.html?name=${country.name.common}`
    const cardHtml = `
        <img src="${country.flags.svg}" loading='lazy' alt="flag" />
        <div class="card-text">
          <h3 class="card-title">${country.name.common}</h3>
          <p><b>Population: </b>${country.population.toLocaleString(
            'en-IN'
          )}</p>
          <p><b>Region: </b>${country.region}</p>
          <p><b>Capital: </b>${country.capital}</p>
        </div>
        `
    countryCard.innerHTML = cardHtml
    countriesContainer.append(countryCard)
  })
}

searchInput.addEventListener('input', (e) => {
  let filteredCountry = allCountriesData.filter((country) =>
    country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
  )
  renderCountries(filteredCountry)
})

const scrollBtn = document.querySelector('.top-section')

// Show button after scrolling 200px
window.addEventListener('scroll', () => {
  if (window.scrollY > 200) {
    scrollBtn.style.display = 'block'
  } else {
    scrollBtn.style.display = 'none'
  }
})

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

//for dark mode

function darkMode() {
  const darkModeToggle = document.querySelector('.dark-mode-toggle')

  if (localStorage.getItem('text')) {
    document.body.classList.toggle(localStorage.getItem('dark'))
  }
  // darkModeToggle.innerText = localStorage.getItem('text')
  const icon = document.querySelector('.fa-moon')
  darkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark')

    if (document.body.classList.contains('dark')) {
      localStorage.setItem('dark', 'dark')
      localStorage.setItem('text', 'Light')
      // darkModeBtn.innerText = 'Light'
      icon.classList.remove('fa-moon')
      icon.classList.add('fa-sun')
      darkModeToggle.innerText = 'Light'
    } else {
      localStorage.setItem('text', 'Dark')
      localStorage.setItem('dark', 'light')
      darkModeToggle.innerText = 'Dark'
      icon.classList.remove('fa-sun')
      icon.classList.add('fa-moon')
    }
  })
}
darkMode()
