'use strict'

//selecting the country details container
const flagImage = document.querySelector('.flag-image')
const skeleton = document.querySelector('.flag-skeleton')
const countryName = document.querySelector('.country-name')
const nativeName = document.querySelector('.native-name')
const domain = document.querySelector('.domain')
const population = document.querySelector('.population')
const region = document.querySelector('.region')
const currencies = document.querySelector('.currencies')
const languages = document.querySelector('.languages')
const subRegion = document.querySelector('.sub-region')
const capital = document.querySelector('.capital')
const borderCountry = document.querySelector('.border-coun')
const darkModeBtn = document.querySelector('.header-content p')
// console.log(darkModeBtn)
// for back button function
const backButton = document.querySelector('.back-button')
backButton.addEventListener('click', () => {
  history.back()
})

function setFavicon(url) {
  // Remove existing favicon(s)
  const existingFavicons = document.querySelectorAll('link[rel="icon"]')
  existingFavicons.forEach((fav) => fav.remove())

  // Create a new favicon link
  const link = document.createElement('link')
  link.rel = 'icon'
  link.href = url
  link.type = url.endsWith('.svg') ? 'image/svg+xml' : 'image/png' // auto-detect type
  document.head.appendChild(link)
}

//for url parameter
const city = new URLSearchParams(window.location.search).get('name')

document.title = city
//fetching data from api
fetch(`https://restcountries.com/v3.1/name/${city}?fullText=true`)
  .then((res) => {
    return res.json()
  })
  .then((ele) => {
    const data = ele[0]
    // console.log(data)

    flagImage.src = data.flags.svg
    setFavicon(data.flags.svg)
    flagImage.alt = data.name.common
    countryName.innerText = data.name.common
    Object.values(data.currencies).map((ele) => {
      currencies.innerText = `${ele.symbol} - ${ele.name}`
    })
    if (data.name.nativeName) {
      nativeName.innerText = Object.values(data.name.nativeName)[0].common
    } else {
      nativeName.innerText = data.name.common
    }
    population.innerText = data.population.toLocaleString('en-IN')
    region.innerText = data.region
    Object.values(data.languages).forEach((ele) => {
      languages.innerText += ele + ', '
    })
    subRegion.innerText = data.subregion
    capital.innerText = data.capital.join(', ')
    domain.innerText = data.tld.join(', ')

    // console.log(data.borders)
    data.borders.forEach((code) => {
      // console.log(ele)
      fetch(`
https://restcountries.com/v3.1/alpha/${code}`)
        .then((res) => {
          return res.json()
        })
        .then(([data]) => {
          // console.log(data)
          const bCountry = document.createElement('div')
          const bAnchor = document.createElement('a')
          bCountry.classList.add('country')
          bAnchor.href = `/country.html?name=${data.name.common}`
          bCountry.appendChild(bAnchor)
          bAnchor.innerText = data.name.common
          borderCountry.append(bCountry)
        })
    })
  })

flagImage.onload = () => {
  flagImage.style.display = 'block'
  skeleton.style.display = 'none'
}

function darkMode() {
  const darkModeToggle = document.querySelector('.dark-mode-toggle')

  // document.body.classList.toggle(localStorage.getItem('dark'))

  if (localStorage.getItem('text')) {
    document.body.classList.toggle(localStorage.getItem('dark'))
    darkModeToggle.innerText = localStorage.getItem('text')
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
