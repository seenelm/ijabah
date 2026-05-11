import './style.css'
import { createDuaaTimeElement } from './components/DuaaTime'
import { duaaTimesData } from './components/duaaTimesData'

// Create the main container
const appElement = document.querySelector<HTMLDivElement>('#app')!
appElement.innerHTML = ''

// Create the page header
const headerContainer = document.createElement('div')
headerContainer.className = 'header-container'
headerContainer.style.width = '100%'

const pageTitle = document.createElement('h1')
pageTitle.className = 'page-title'
pageTitle.textContent = 'Times Du\'aa is Accepted'

// Add a subtitle with additional context
const pageSubtitle = document.createElement('p')
pageSubtitle.className = 'page-subtitle'
pageSubtitle.textContent = 'The Prophet Muhammad (ﷺ) taught us about special times when supplications are more likely to be accepted by Allah. Explore these blessed moments to enhance your spiritual connection.'

headerContainer.appendChild(pageTitle)
headerContainer.appendChild(pageSubtitle)
appElement.appendChild(headerContainer)

// Create controls container for search and filters
const controlsContainer = document.createElement('div')
controlsContainer.className = 'controls-container'

// Create view toggle option
const viewToggleContainer = document.createElement('div')
viewToggleContainer.className = 'view-toggle-container'

const viewToggleLabel = document.createElement('span')
viewToggleLabel.textContent = 'View: '
viewToggleLabel.className = 'view-toggle-label'

const gridViewButton = document.createElement('button')
gridViewButton.className = 'view-toggle-button active'
gridViewButton.textContent = 'Grid'
gridViewButton.setAttribute('data-view', 'grid')

const swipeViewButton = document.createElement('button')
swipeViewButton.className = 'view-toggle-button'
swipeViewButton.textContent = 'Swipe'
swipeViewButton.setAttribute('data-view', 'swipe')

viewToggleContainer.appendChild(viewToggleLabel)
viewToggleContainer.appendChild(gridViewButton)
viewToggleContainer.appendChild(swipeViewButton)

// Add the view toggle to the top of the controls container
controlsContainer.prepend(viewToggleContainer)

// Create search input
const searchContainer = document.createElement('div')
searchContainer.className = 'search-container'

const searchInput = document.createElement('input')
searchInput.type = 'text'
searchInput.placeholder = 'Search for specific times of du\'aa...'
searchInput.className = 'search-input'

searchContainer.appendChild(searchInput)
controlsContainer.appendChild(searchContainer)

// Add category filters (optional)
const categoryFilters = document.createElement('div')
categoryFilters.className = 'category-filters'

// Example categories - you can customize these
const categories = ['All', 'Daily', 'Weekly', 'Special Occasions', 'Personal States']
categories.forEach((category, index) => {
  const filter = document.createElement('button')
  filter.className = 'category-filter'
  filter.textContent = category
  
  if (index === 0) {
    filter.classList.add('active')
  }
  
  filter.addEventListener('click', () => {
    // Remove active class from all filters
    document.querySelectorAll('.category-filter').forEach(el => {
      el.classList.remove('active')
    })
    
    // Add active class to clicked filter
    filter.classList.add('active')
    
    // Filter the duaa times based on category
    filterDuaaTimes(category)
  })
  
  categoryFilters.appendChild(filter)
})

controlsContainer.appendChild(categoryFilters)
appElement.appendChild(controlsContainer)

// Create the container for all du'aa times
const duaaTimesContainer = document.createElement('div')
duaaTimesContainer.className = 'duaa-times-container'

// Create swipe view container
const swipeContainer = document.createElement('div')
swipeContainer.className = 'swipe-container'
swipeContainer.style.display = 'none' // Initially hidden

// Viewport clips the card track
const swipeViewport = document.createElement('div')
swipeViewport.className = 'swipe-viewport'

// Create carousel track
const carouselTrack = document.createElement('div')
carouselTrack.className = 'carousel-track'
swipeViewport.appendChild(carouselTrack)
swipeContainer.appendChild(swipeViewport)

// Swipe gesture hint
const swipeHint = document.createElement('div')
swipeHint.className = 'swipe-hint'
swipeHint.textContent = 'Drag or use arrow keys to navigate'
swipeContainer.appendChild(swipeHint)

// Bottom navigation row
const swipeNav = document.createElement('div')
swipeNav.className = 'swipe-nav'

const prevButton = document.createElement('button')
prevButton.className = 'swipe-nav-btn'
prevButton.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>`
prevButton.setAttribute('aria-label', 'Previous card')

const swipeCounterArea = document.createElement('div')
swipeCounterArea.className = 'swipe-counter-area'

const swipeCounter = document.createElement('span')
swipeCounter.className = 'swipe-counter'
swipeCounter.textContent = '1 / 1'

const swipeProgressTrack = document.createElement('div')
swipeProgressTrack.className = 'swipe-progress-track'
const swipeProgressFill = document.createElement('div')
swipeProgressFill.className = 'swipe-progress-fill'
swipeProgressTrack.appendChild(swipeProgressFill)

swipeCounterArea.appendChild(swipeCounter)
swipeCounterArea.appendChild(swipeProgressTrack)

const nextButton = document.createElement('button')
nextButton.className = 'swipe-nav-btn'
nextButton.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`
nextButton.setAttribute('aria-label', 'Next card')

swipeNav.appendChild(prevButton)
swipeNav.appendChild(swipeCounterArea)
swipeNav.appendChild(nextButton)
swipeContainer.appendChild(swipeNav)

// Add both containers to the app
appElement.appendChild(duaaTimesContainer)
appElement.appendChild(swipeContainer)

// Current index for the swipe view
let currentIndex = 0
let totalCards = 0

// Add duaa times to the grid view
duaaTimesData.forEach((duaaTime, index) => {
  // Create element for grid view with animation delay
  setTimeout(() => {
    const duaaTimeElement = createDuaaTimeElement(duaaTime)
    duaaTimesContainer.appendChild(duaaTimeElement)
  }, index * 50) // 50ms delay between each card

  totalCards++
})

// Add event listeners for view toggle buttons
document.querySelectorAll('.view-toggle-button').forEach(button => {
  button.addEventListener('click', () => {
    const viewType = button.getAttribute('data-view')
    
    // Remove active class from all buttons
    document.querySelectorAll('.view-toggle-button').forEach(btn => {
      btn.classList.remove('active')
    })
    
    // Add active class to clicked button
    button.classList.add('active')
    
    // Toggle visibility of containers
    if (viewType === 'grid') {
      duaaTimesContainer.style.display = 'grid'
      swipeContainer.style.display = 'none'
    } else if (viewType === 'swipe') {
      duaaTimesContainer.style.display = 'none'
      swipeContainer.style.display = 'flex'
      
      // If switching to swipe view, populate it with cards
      if (carouselTrack.children.length === 0) {
        populateSwipeView()
      }
      
      // Update the carousel display
      updateCarousel()
    }
  })
})

// Function to populate the swipe view with cards
function populateSwipeView() {
  carouselTrack.innerHTML = ''

  duaaTimesData.forEach((duaaTime, index) => {
    const swipeCard = document.createElement('div')
    swipeCard.className = 'swipe-card'
    swipeCard.setAttribute('data-index', index.toString())

    const swipeCardContent = document.createElement('div')
    swipeCardContent.className = 'swipe-card-content'

    // Header: category badge + number badge
    const cardHeader = document.createElement('div')
    cardHeader.className = 'swipe-card-header'

    if (duaaTime.category) {
      const categoryBadge = document.createElement('span')
      categoryBadge.className = 'swipe-category'
      categoryBadge.textContent = duaaTime.category
      cardHeader.appendChild(categoryBadge)
    } else {
      cardHeader.appendChild(document.createElement('span'))
    }

    const numberBadge = document.createElement('span')
    numberBadge.className = 'swipe-number'
    numberBadge.textContent = `${index + 1}`
    cardHeader.appendChild(numberBadge)

    // Title
    const title = document.createElement('h3')
    title.className = 'swipe-title'
    title.textContent = duaaTime.title

    // Scrollable body
    const body = document.createElement('div')
    body.className = 'swipe-body'

    // English text
    const englishText = duaaTime.englishText || duaaTime.description || ''
    if (englishText) {
      const desc = document.createElement('p')
      desc.className = 'swipe-description'
      desc.textContent = englishText
      body.appendChild(desc)
    }

    // Arabic block (always visible — no flip needed)
    const arabicBlock = document.createElement('div')
    arabicBlock.className = 'swipe-arabic-block'

    const arabicLabel = document.createElement('span')
    arabicLabel.className = 'swipe-arabic-label'
    arabicLabel.textContent = 'Arabic'

    const arabicDiv = document.createElement('div')
    arabicDiv.className = 'swipe-arabic'
    if (duaaTime.arabicText) {
      arabicDiv.textContent = duaaTime.arabicText
    } else {
      arabicDiv.textContent = 'Arabic text not available.'
      arabicDiv.setAttribute('data-empty', '')
    }

    arabicBlock.appendChild(arabicLabel)
    arabicBlock.appendChild(arabicDiv)
    body.appendChild(arabicBlock)

    // Source footer
    const source = document.createElement('div')
    source.className = 'swipe-source'
    source.textContent = duaaTime.source

    // Assemble card
    swipeCardContent.appendChild(cardHeader)
    swipeCardContent.appendChild(title)
    swipeCardContent.appendChild(body)
    swipeCardContent.appendChild(source)
    swipeCard.appendChild(swipeCardContent)

    // Initial position
    if (index === currentIndex) {
      swipeCard.style.transform = 'translateX(0) scale(1)'
      swipeCard.style.opacity = '1'
      swipeCard.style.zIndex = '5'
    } else {
      const direction = index < currentIndex ? -1 : 1
      swipeCard.style.transform = `translateX(${direction * 105}%) scale(0.92)`
      swipeCard.style.opacity = '0'
      swipeCard.style.zIndex = '0'
    }

    carouselTrack.appendChild(swipeCard)
  })
}

function updateCounter() {
  swipeCounter.textContent = `${currentIndex + 1} / ${totalCards}`
  swipeProgressFill.style.width = `${((currentIndex + 1) / totalCards) * 100}%`
}

// Function to update the carousel display
function updateCarousel() {
  const swipeCards = document.querySelectorAll('.swipe-card')
  swipeCards.forEach((card, index) => {
    const htmlCard = card as HTMLElement
    if (index === currentIndex) {
      htmlCard.style.transform = 'translateX(0) rotate(0deg) scale(1)'
      htmlCard.style.opacity = '1'
      htmlCard.style.zIndex = '5'
    } else {
      const direction = index < currentIndex ? -1 : 1
      htmlCard.style.transform = `translateX(${direction * 105}%) scale(0.92)`
      htmlCard.style.opacity = '0'
      htmlCard.style.zIndex = '0'
    }
  })
  updateCounter()
}

// Navigation button listeners
prevButton.addEventListener('click', () => {
  if (isDragging) return
  currentIndex = (currentIndex - 1 + totalCards) % totalCards
  updateCarousel()
})

nextButton.addEventListener('click', () => {
  if (isDragging) return
  currentIndex = (currentIndex + 1) % totalCards
  updateCarousel()
})

// ─── Drag / swipe system ───
let isDragging = false
let dragStartX = 0
let dragDelta = 0
let activeCardEl: HTMLElement | null = null
const DRAG_THRESHOLD = 72

function getActiveCard(): HTMLElement | null {
  return carouselTrack.querySelector(`.swipe-card[data-index="${currentIndex}"]`) as HTMLElement | null
}

function onDragStart(x: number) {
  const card = getActiveCard()
  if (!card) return
  isDragging = true
  dragStartX = x
  dragDelta = 0
  activeCardEl = card
  card.style.transition = 'none'
  swipeContainer.classList.add('is-dragging')
}

function onDragMove(x: number) {
  if (!isDragging || !activeCardEl) return
  dragDelta = x - dragStartX
  const rotation = dragDelta * 0.022
  const opacity = Math.max(0.6, 1 - Math.abs(dragDelta) / 480)
  activeCardEl.style.transform = `translateX(${dragDelta}px) rotate(${rotation}deg) scale(1)`
  activeCardEl.style.opacity = String(opacity)
}

function onDragEnd() {
  if (!isDragging) return
  isDragging = false
  swipeContainer.classList.remove('is-dragging')
  if (activeCardEl) activeCardEl.style.transition = ''
  activeCardEl = null

  if (Math.abs(dragDelta) > DRAG_THRESHOLD) {
    currentIndex = dragDelta < 0
      ? (currentIndex + 1) % totalCards
      : (currentIndex - 1 + totalCards) % totalCards
  }
  updateCarousel()
}

// Mouse drag (desktop)
swipeViewport.addEventListener('mousedown', (e) => {
  e.preventDefault()
  onDragStart(e.clientX)
})
document.addEventListener('mousemove', (e) => { if (isDragging) onDragMove(e.clientX) })
document.addEventListener('mouseup', onDragEnd)

// Touch swipe (mobile) — horizontal/vertical detection to preserve card body scrolling
let touchStartX = 0
let touchStartY = 0
let touchLocked: 'h' | 'v' | null = null

swipeViewport.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].clientX
  touchStartY = e.changedTouches[0].clientY
  touchLocked = null
}, { passive: true })

swipeViewport.addEventListener('touchmove', (e) => {
  const touch = e.changedTouches[0]
  const dx = touch.clientX - touchStartX
  const dy = touch.clientY - touchStartY

  if (!touchLocked && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) {
    touchLocked = Math.abs(dx) >= Math.abs(dy) ? 'h' : 'v'
    if (touchLocked === 'h') onDragStart(touchStartX)
  }

  if (touchLocked === 'h' && isDragging) {
    e.preventDefault()
    onDragMove(touch.clientX)
  }
}, { passive: false })

swipeViewport.addEventListener('touchend', () => {
  if (touchLocked === 'h') onDragEnd()
  touchLocked = null
})

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (swipeContainer.style.display === 'none') return
  if (e.key === 'ArrowRight') {
    currentIndex = (currentIndex + 1) % totalCards
    updateCarousel()
  } else if (e.key === 'ArrowLeft') {
    currentIndex = (currentIndex - 1 + totalCards) % totalCards
    updateCarousel()
  }
})

// Search functionality
searchInput.addEventListener('input', (e) => {
  const searchTerm = (e.target as HTMLInputElement).value.toLowerCase()
  
  // Filter grid view
  document.querySelectorAll('.duaa-time-card').forEach(card => {
    const title = card.querySelector('.duaa-time-title')?.textContent?.toLowerCase() || ''
    const description = card.querySelector('.duaa-time-description')?.textContent?.toLowerCase() || ''
    
    if (title.includes(searchTerm) || description.includes(searchTerm)) {
      (card as HTMLElement).style.display = 'flex'
    } else {
      (card as HTMLElement).style.display = 'none'
    }
  })
})

// Add scroll to top button
const scrollTopButton = document.createElement('button')
scrollTopButton.className = 'scroll-top-button'
scrollTopButton.innerHTML = '<span class="arrow-up">↑</span>'
scrollTopButton.title = 'Scroll to top'
scrollTopButton.style.display = 'none'

scrollTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
})

document.body.appendChild(scrollTopButton)

// Show/hide scroll to top button based on scroll position
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollTopButton.style.display = 'block'
  } else {
    scrollTopButton.style.display = 'none'
  }
})


// Create modal container for hadith details
const modalContainer = document.createElement('div')
modalContainer.className = 'modal-container'
modalContainer.style.display = 'none'

// Create modal content
const modalContent = document.createElement('div')
modalContent.className = 'modal-content'

// Create close button
const closeButton = document.createElement('button')
closeButton.className = 'modal-close-button'
closeButton.innerHTML = '&times;'
closeButton.addEventListener('click', () => {
  modalContainer.style.display = 'none'
  document.body.style.overflow = 'auto' // Re-enable scrolling
})

// Create modal header
const modalHeader = document.createElement('div')
modalHeader.className = 'modal-header'

// Create title element
const modalTitle = document.createElement('h2')
modalTitle.className = 'modal-title'
modalHeader.appendChild(modalTitle)
modalHeader.appendChild(closeButton)

// Create modal body
const modalBody = document.createElement('div')
modalBody.className = 'modal-body'

// Create Arabic text container
const arabicTextContainer = document.createElement('div')
arabicTextContainer.className = 'modal-arabic-text'

// Create English text container
const englishTextContainer = document.createElement('div')
englishTextContainer.className = 'modal-english-text'

// Create reference link container
const referenceContainer = document.createElement('div')
referenceContainer.className = 'modal-reference'

// Assemble modal
modalBody.appendChild(arabicTextContainer)
modalBody.appendChild(englishTextContainer)
modalBody.appendChild(referenceContainer)

modalContent.appendChild(modalHeader)
modalContent.appendChild(modalBody)
modalContainer.appendChild(modalContent)

// Add modal to the app
appElement.appendChild(modalContainer)

// Function to open modal with hadith details
function openHadithModal(duaaTime: any) {
  // Set modal title
  modalTitle.textContent = duaaTime.title
  
  // Set Arabic text if available
  if (duaaTime.arabicText) {
    arabicTextContainer.textContent = duaaTime.arabicText
    arabicTextContainer.style.display = 'block'
  } else {
    arabicTextContainer.style.display = 'none'
  }
  
  // Set English text if available
  if (duaaTime.englishText) {
    englishTextContainer.textContent = duaaTime.englishText
    englishTextContainer.style.display = 'block'
  } else {
    englishTextContainer.style.display = 'none'
  }
  
  // Set reference link if available
  if (duaaTime.reference) {
    const referenceLink = document.createElement('a')
    referenceLink.href = duaaTime.reference
    referenceLink.target = '_blank'
    referenceLink.textContent = 'View on Sunnah.com'
    referenceContainer.innerHTML = ''
    referenceContainer.appendChild(referenceLink)
  } else {
    // If no specific reference link is provided, try to create one from the source
    const sourceText = duaaTime.source
    let referenceUrl = ''
    
    if (sourceText.includes('Bukhari')) {
      referenceUrl = `https://sunnah.com/bukhari/${extractHadithNumber(sourceText)}`
    } else if (sourceText.includes('Muslim')) {
      referenceUrl = `https://sunnah.com/muslim/${extractHadithNumber(sourceText)}`
    } else if (sourceText.includes('Tirmidhi')) {
      referenceUrl = `https://sunnah.com/tirmidhi/${extractHadithNumber(sourceText)}`
    } else if (sourceText.includes('Abu Dawud') || sourceText.includes('Abi Dawud')) {
      referenceUrl = `https://sunnah.com/abudawud/${extractHadithNumber(sourceText)}`
    } else if (sourceText.includes('Ibn Majah')) {
      referenceUrl = `https://sunnah.com/ibnmajah/${extractHadithNumber(sourceText)}`
    }
    
    if (referenceUrl) {
      const referenceLink = document.createElement('a')
      referenceLink.href = referenceUrl
      referenceLink.target = '_blank'
      referenceLink.textContent = 'View on Sunnah.com'
      referenceContainer.innerHTML = ''
      referenceContainer.appendChild(referenceLink)
    } else {
      referenceContainer.textContent = `Source: ${sourceText}`
    }
  }
  
  // Show modal
  modalContainer.style.display = 'flex'
  document.body.style.overflow = 'hidden' // Prevent scrolling when modal is open
}

// Expose the openHadithModal function to the global scope
(window as any).openHadithModal = openHadithModal

// Helper function to extract hadith number from source text
function extractHadithNumber(sourceText: string): string {
  const match = sourceText.match(/\d+/)
  return match ? match[0] : ''
}

// Function to filter duaa times by category
function filterDuaaTimes(category: string) {
  const duaaContainers = document.querySelectorAll('.duaa-time-container')
  
  duaaContainers.forEach((container, index) => {
    if (category === 'All') {
      container.classList.remove('hidden')
      // Re-animate when showing after filtering
      if (container.classList.contains('filtered-out')) {
        const htmlContainer = container as HTMLElement;
        htmlContainer.style.animationDelay = `${index * 0.05}s`;
        htmlContainer.style.animation = 'none';
        setTimeout(() => {
          htmlContainer.style.animation = 'fadeInUp 0.6s ease forwards';
        }, 10)
      }
      container.classList.remove('filtered-out')
    } else {
      const containerCategory = container.getAttribute('data-category')
      
      if (containerCategory === category) {
        container.classList.remove('hidden')
        // Re-animate when showing after filtering
        if (container.classList.contains('filtered-out')) {
          const htmlContainer = container as HTMLElement;
          htmlContainer.style.animationDelay = `${index * 0.05}s`;
          htmlContainer.style.animation = 'none';
          setTimeout(() => {
            htmlContainer.style.animation = 'fadeInUp 0.6s ease forwards';
          }, 10)
        }
        container.classList.remove('filtered-out')
      } else {
        container.classList.add('hidden')
        container.classList.add('filtered-out')
      }
    }
  })
}

