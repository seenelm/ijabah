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

// Create carousel track
const carouselTrack = document.createElement('div')
carouselTrack.className = 'carousel-track'
swipeContainer.appendChild(carouselTrack)

// Create navigation buttons
const prevButton = document.createElement('button')
prevButton.className = 'carousel-button prev-button'
prevButton.innerHTML = '&#8592;' // Left arrow
prevButton.setAttribute('aria-label', 'Previous card')
swipeContainer.appendChild(prevButton)

const nextButton = document.createElement('button')
nextButton.className = 'carousel-button next-button'
nextButton.innerHTML = '&#8594;' // Right arrow
nextButton.setAttribute('aria-label', 'Next card')
swipeContainer.appendChild(nextButton)

// Create pagination container
const paginationContainer = document.createElement('div')
paginationContainer.className = 'pagination-container'
paginationContainer.style.bottom = '15px'
paginationContainer.style.left = '0'
paginationContainer.style.right = '0'
paginationContainer.style.display = 'flex'
paginationContainer.style.justifyContent = 'center'
paginationContainer.style.gap = '8px'
paginationContainer.style.zIndex = '10'
swipeContainer.appendChild(paginationContainer)

// Add both containers to the app
appElement.appendChild(duaaTimesContainer)
appElement.appendChild(swipeContainer)

// Current index for the swipe view
let currentIndex = 0
let totalCards = 0

// Add duaa times to the grid view and create pagination dots
duaaTimesData.forEach((duaaTime, index) => {
  // Create element for grid view with animation delay
  setTimeout(() => {
    const duaaTimeElement = createDuaaTimeElement(duaaTime)
    duaaTimesContainer.appendChild(duaaTimeElement)
  }, index * 50) // 50ms delay between each card
  
  // Create pagination indicator
  const paginationDot = document.createElement('span')
  paginationDot.className = 'pagination-dot'
  if (index === 0) paginationDot.classList.add('active')
  paginationDot.setAttribute('data-index', index.toString())
  paginationContainer.appendChild(paginationDot)
  
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
      swipeContainer.style.display = 'block'
      
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
  // Clear existing cards
  carouselTrack.innerHTML = ''
  
  // Add duaa times to the swipe view
  duaaTimesData.forEach((duaaTime, index) => {
    const swipeCard = document.createElement('div')
    swipeCard.className = 'swipe-card'
    
    // Create a container specifically for the swipe view
    const swipeCardContent = document.createElement('div')
    swipeCardContent.className = 'swipe-card-content'
    
    // Create title
    const title = document.createElement('h3')
    title.className = 'swipe-title'
    title.textContent = duaaTime.title
    
    // Create description
    const description = document.createElement('div')
    description.className = 'swipe-description'
    description.textContent = duaaTime.description || '' // Use empty string as fallback
    
    // Create source
    const source = document.createElement('div')
    source.className = 'swipe-source'
    source.textContent = duaaTime.source
    
    // Create number badge
    const number = document.createElement('div')
    number.className = 'swipe-number'
    number.textContent = `#${index + 1}`
    
    // Assemble the card
    swipeCardContent.appendChild(number)
    swipeCardContent.appendChild(title)
    swipeCardContent.appendChild(description)
    swipeCardContent.appendChild(source)
    swipeCard.appendChild(swipeCardContent)
    
    // Set initial position
    if (index === currentIndex) {
      swipeCard.style.transform = 'translateX(0) scale(1)'
      swipeCard.style.opacity = '1'
      swipeCard.style.zIndex = '5'
    } else {
      const direction = index < currentIndex ? -1 : 1
      swipeCard.style.transform = `translateX(${direction * 100}%) scale(0.8)`
      swipeCard.style.opacity = '0'
      swipeCard.style.zIndex = '0'
    }
    
    carouselTrack.appendChild(swipeCard)
  })
}

// Function to update the carousel display
function updateCarousel() {
  // Update the carousel track position
  const swipeCards = document.querySelectorAll('.swipe-card')
  swipeCards.forEach((card, index) => {
    const htmlCard = card as HTMLElement
    if (index === currentIndex) {
      htmlCard.style.transform = 'translateX(0) scale(1)'
      htmlCard.style.opacity = '1'
      htmlCard.style.zIndex = '5'
    } else {
      const direction = index < currentIndex ? -1 : 1
      htmlCard.style.transform = `translateX(${direction * 100}%) scale(0.8)`
      htmlCard.style.opacity = '0'
      htmlCard.style.zIndex = '0'
    }
  })
  
  // Update pagination dots
  document.querySelectorAll('.pagination-dot').forEach((dot, index) => {
    if (index === currentIndex) {
      dot.classList.add('active')
    } else {
      dot.classList.remove('active')
    }
  })
}

// Add event listeners for navigation buttons
prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + totalCards) % totalCards
  updateCarousel()
})

nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % totalCards
  updateCarousel()
})

// Add event listeners for pagination dots
document.querySelectorAll('.pagination-dot').forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentIndex = index
    updateCarousel()
  })
})

// Add touch swipe functionality for mobile users
let touchStartX = 0
let touchEndX = 0

swipeContainer.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX
})

swipeContainer.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX
  handleSwipe()
})

function handleSwipe() {
  const swipeThreshold = 50 // Minimum distance required for a swipe
  if (touchEndX < touchStartX - swipeThreshold) {
    // Swipe left - go to next card
    currentIndex = (currentIndex + 1) % totalCards
    updateCarousel()
  } else if (touchEndX > touchStartX + swipeThreshold) {
    // Swipe right - go to previous card
    currentIndex = (currentIndex - 1 + totalCards) % totalCards
    updateCarousel()
  }
}

// Search functionality
searchInput.addEventListener('input', (e) => {
  const searchTerm = (e.target as HTMLInputElement).value.toLowerCase()
  
  // Filter grid view
  document.querySelectorAll('.duaa-time-card').forEach(card => {
    const title = card.querySelector('.duaa-title')?.textContent?.toLowerCase() || ''
    const description = card.querySelector('.duaa-description')?.textContent?.toLowerCase() || ''
    
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

// Add CSS class for hidden elements
const style = document.createElement('style')
style.textContent = `
  .hidden {
    display: none;
  }
  
  .scroll-top-button {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #646cff;
    color: white;
    font-size: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0.7;
    transition: opacity 0.3s ease;
    z-index: 100;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    padding: 0;
    line-height: 1;
  }
  
  .arrow-up {

    position: relative;
    text-align: center;
    align-self: center;
    width: 100%;
  }
  
  .scroll-top-button:hover {
    opacity: 1;
  }
`

document.head.appendChild(style)

// Add CSS for the swipe view
const additionalStyles = document.createElement('style')
additionalStyles.textContent = `
  .view-toggle-container {
    display: flex;
    align-items: center;
    padding: 1rem;
    background: rgba(100, 108, 255, 0.1);
    border-radius: 8px;
    border: 1px solid rgba(100, 108, 255, 0.2);
    width: fit-content;
    margin: 0 auto 1.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .view-toggle-label {
    font-weight: 600;
    color: rgba(255, 255, 255, 0.9);
    margin-right: 1rem;
    font-size: 1.1rem;
  }
  
  .view-toggle-button {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: rgba(255, 255, 255, 0.8);
    padding: 0.6rem 1.5rem;
    margin-right: 0.75rem;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 500;
    font-size: 1rem;
  }
  
  .view-toggle-button:last-child {
    margin-right: 0;
  }
  
  .view-toggle-button.active {
    background: #646cff;
    color: white;
    border-color: #646cff;
    box-shadow: 0 4px 12px rgba(100, 108, 255, 0.3);
    transform: translateY(-2px);
  }
  
  .swipe-container {
    position: relative;
    width: 90%;
    max-width: 600px;
    margin: 2rem auto;
    height: 550px;
    overflow: hidden;
  }
  
  .carousel-track {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .swipe-card {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .swipe-card-content {
    width: 90%;
    height: 85%;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    padding: 2rem;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    margin: 20px 0;
  }
  
  .swipe-number {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: rgba(100, 108, 255, 0.2);
    color: #646cff;
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 600;
  }
  
  .swipe-title {
    font-size: 1.6rem;
    margin: 0 0 1.5rem 0;
    color: rgba(255, 255, 255, 0.95);
    padding-right: 3rem;
  }
  
  .swipe-description {
    flex: 1;
    overflow-y: auto;
    font-size: 1.1rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 1.5rem;
    padding-right: 0.5rem;
  }
  
  .swipe-description::-webkit-scrollbar {
    width: 6px;
  }
  
  .swipe-description::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
  }
  
  .swipe-description::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 10px;
  }
  
  .swipe-source {
    font-style: italic;
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.95rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .pagination-dot.active {
    background: #646cff;
    transform: scale(1.2);
    box-shadow: 0 0 8px rgba(100, 108, 255, 0.5);
  }
  
  @media (max-width: 768px) {
    .swipe-container {
      width: 90%;
      height: 500px;
      margin: 1.5rem auto 2.5rem;
    }
    
    .swipe-card-content {
      width: 90%;
      height: 85%;
      padding: 1.5rem;
      margin: 15px 0;
    }
  }
`

document.head.appendChild(additionalStyles)

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

// Add CSS styles for the modal popup
const modalStyles = document.createElement('style')
modalStyles.textContent = `
  /* Modal Styles */
  .modal-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    backdrop-filter: blur(5px);
  }
  
  .modal-content {
    background-color: #242424;
    border-radius: 16px;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
    width: 90%;
    max-width: 600px;
    max-height: 90vh;
    overflow-y: auto;
    border: 1px solid rgba(255, 255, 255, 0.1);
    animation: modalFadeIn 0.3s ease;
  }
  
  @keyframes modalFadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .modal-title {
    margin: 0;
    font-size: 1.5rem;
    color: #f8f8f8;
  }
  
  .modal-close-button {
    background: transparent;
    border: none;
    color: rgba(255, 255, 255, 0.7);
    font-size: 1.8rem;
    cursor: pointer;
    padding: 0;
    margin: 0;
    line-height: 1;
    transition: color 0.3s ease;
  }
  
  .modal-close-button:hover {
    color: #fff;
  }
  
  .modal-body {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .modal-arabic-text {
    font-family: 'Traditional Arabic', 'Scheherazade New', serif;
    font-size: 1.8rem;
    line-height: 1.8;
    text-align: right;
    direction: rtl;
    color: rgba(255, 255, 255, 0.9);
    padding: 1rem;
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
  }
  
  .modal-english-text {
    font-size: 1.1rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.8);
  }
  
  .modal-reference {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .modal-reference a {
    color: #646cff;
    text-decoration: none;
    transition: color 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .modal-reference a:hover {
    color: #535bf2;
    text-decoration: underline;
  }
  
  .modal-reference a::before {
    content: '🔗';
  }
  
  @media (prefers-color-scheme: light) {
    .modal-content {
      background-color: #ffffff;
      border: 1px solid rgba(0, 0, 0, 0.1);
    }
    
    .modal-header {
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
    
    .modal-title {
      color: #213547;
    }
    
    .modal-close-button {
      color: rgba(0, 0, 0, 0.7);
    }
    
    .modal-close-button:hover {
      color: #000;
    }
    
    .modal-arabic-text {
      color: rgba(0, 0, 0, 0.9);
      background-color: rgba(0, 0, 0, 0.05);
    }
    
    .modal-english-text {
      color: rgba(0, 0, 0, 0.8);
    }
    
    .modal-reference {
      border-top: 1px solid rgba(0, 0, 0, 0.1);
    }
  }
  
  @media (max-width: 768px) {
    .modal-content {
      width: 95%;
    }
    
    .modal-title {
      font-size: 1.3rem;
    }
    
    .modal-arabic-text {
      font-size: 1.5rem;
    }
    
    .modal-english-text {
      font-size: 1rem;
    }
  }
`

document.head.appendChild(modalStyles)
