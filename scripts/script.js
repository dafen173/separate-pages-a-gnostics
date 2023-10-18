//==================== SECTION FLASHING EFFECT CHAPTER ================================

const cards = document.querySelectorAll(".appearing_section")

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            entry.target.classList.toggle('show_appearing', entry.isIntersecting)
        })
    },
    {
        threshold: 0.3,
    }
)

cards.forEach(card => {
    observer.observe(card)
})


//======================= RESPONSIVE NAVBAR CHAPTER =======================================

const toggleButton = document.getElementsByClassName('header__toggle_button')[0]
const navbarLinks = document.getElementsByClassName('header__navbar')[0]
const crossBtn = document.getElementsByClassName('header__cross_button')[0]
const burgerBars = document.querySelectorAll('.header__toggle_button__bar')

const header = document.getElementsByClassName('header')[0]

let submenuActive = false
let showMenu = false

toggleButton.addEventListener('click', toggleMenu)

function toggleMenu() {
    navbarLinks.classList.toggle('active')
    crossBtn.classList.toggle('header__cross_button--active')

    for (let elem of burgerBars) {
        elem.classList.toggle('header__toggle_button__bar--unactive')
    }

    showMenu = !showMenu

    closeSubmenu()
}

document.addEventListener('click', function handleClickOutsideBox(event) {
    if (showMenu) {
        if (!header.contains(event.target)) {
            navbarLinks.classList.toggle('active')
            crossBtn.classList.toggle('header__cross_button--active')

            for (let elem of burgerBars) {
                elem.classList.toggle('header__toggle_button__bar--unactive')
            }
            showMenu = false

            closeSubmenu()
        }
    }
})

window.addEventListener("resize", closeSubmenu)

function closeSubmenu () {
    if (smallScreen.matches && document.querySelector('.header__navbar__item__submenu--active')) {
        document.querySelector('.header__navbar__item__submenu--active').classList.add('header__navbar__item__submenu')
        document.querySelector('.header__navbar__item__submenu--active').classList.remove('header__navbar__item__submenu--active')

        document.querySelector('.header__navbar__item__arrow_up').classList.add('header__navbar__item__arrow_down')
        document.querySelector('.header__navbar__item__arrow_up').classList.remove('header__navbar__item__arrow_up')

        document.querySelector('.header__navbar__item--active').classList.remove('header__navbar__item--active')

        submenuActive = false
    }
}


//==================== DROPDOWM MENU FOR SMALL SCREEN MODE =======================================

const dropdownItems = document.querySelectorAll('.header__navbar__item__container--active')

// const x = window.matchMedia("(max-width: 850px)")
const smallScreen = window.matchMedia("(max-width: 850px)")

dropdownItems.forEach( (item) => {
    const nextSibling = item.nextElementSibling;

    item.addEventListener('click', () => {
        if (smallScreen.matches) {
            nextSibling.classList.toggle('header__navbar__item__submenu--active')
            nextSibling.classList.toggle('header__navbar__item__submenu')
            item.closest('a').classList.toggle('header__navbar__item--active')
            item.lastElementChild.classList.toggle('header__navbar__item__arrow_down')
            item.lastElementChild.classList.toggle('header__navbar__item__arrow_up')

            submenuActive = !submenuActive
        }
    })
})


//==================== DRAG AND DROP SERVICES CALCULATOR FOR SERVICES PAGE =======================================

const data = [
    {
        "id": 1,
        "title": "Service 1",
        "price": 100
    },
    {
        "id": 2,
        "title": "Service 2",
        "price": 200
    },
    {
        "id": 3,
        "title": "Service 3",
        "price": 300
    },
    {
        "id": 4,
        "title": "Service 4",
        "price": 400
    },
    {
        "id": 5,
        "title": "Service 5",
        "price": 500
    },
]

let lists = document.getElementsByClassName('services_list')
let rightBox = document.querySelector('.calc_container__right')
let leftBox = document.querySelector('.calc_container__left')
let totalCost = document.querySelector('.total_cost')

let pricesSum = 0
let totalCostContent = `Total cost: $${pricesSum}.`
totalCost.innerHTML = totalCostContent

data.map(function(obj){
    let serviceEl = document.createElement('div')
    serviceEl.className = 'services_list'
    serviceEl.draggable = true
    serviceEl.dataset.price = obj.price
    serviceEl.innerHTML = `${obj.title}, price $${obj.price}.`
    leftBox.appendChild(serviceEl)
})

for (service of lists) {
    service.addEventListener('dragstart', function(e){
        let selected = e.target

        rightBox.addEventListener('dragover', function(e){
            e.preventDefault()
        })

        rightBox.addEventListener('drop', function(e){
            rightBox.appendChild(selected)
            pricesSum += parseInt(selected.dataset.price)
            totalCost.innerHTML = `Total cost: $${pricesSum}.`
            selected = null
        })

        leftBox.addEventListener('dragover', function(e){
            e.preventDefault()
        })

        leftBox.addEventListener('drop', function(e){
            leftBox.appendChild(selected)
            pricesSum -= parseInt(selected.dataset.price)
            totalCost.innerHTML = `Total cost: $${pricesSum}.`
            selected = null
        })
    })
}
