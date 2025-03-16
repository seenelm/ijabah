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

// Render each du'aa time component with staggered animations
duaaTimesData.forEach((duaaTime, index) => {
  // Add a small timeout to create a staggered effect
  setTimeout(() => {
    const duaaTimeElement = createDuaaTimeElement({
      ...duaaTime,
      // Assign categories based on content (this is just an example)
      category: assignCategory(duaaTime.title)
    })
    duaaTimesContainer.appendChild(duaaTimeElement)
  }, index * 50) // 50ms delay between each card
})

appElement.appendChild(duaaTimesContainer)

// Search functionality
searchInput.addEventListener('input', (e) => {
  const searchTerm = (e.target as HTMLInputElement).value.toLowerCase()
  
  // Get all duaa time containers
  const duaaContainers = document.querySelectorAll('.duaa-time-container')
  
  duaaContainers.forEach((container, index) => {
    const card = container.querySelector('.duaa-time-card')
    const title = card?.querySelector('.duaa-time-title')?.textContent?.toLowerCase() || ''
    const description = card?.querySelector('.duaa-time-description')?.textContent?.toLowerCase() || ''
    const source = card?.querySelector('.duaa-time-source')?.textContent?.toLowerCase() || ''
    
    // Check if the search term is found in any of the text content
    const isMatch = title.includes(searchTerm) || 
                   description.includes(searchTerm) || 
                   source.includes(searchTerm)
    
    // Show or hide based on search match
    if (isMatch) {
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
  })
})

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

// Helper function to assign categories (this is just an example)
function assignCategory(title: string): string {
  const lowerTitle = title.toLowerCase()
  
  if (lowerTitle.includes('friday')) {
    return 'Weekly'
  } else if (lowerTitle.includes('night') || lowerTitle.includes('asr') || lowerTitle.includes('prayers')) {
    return 'Daily'
  } else if (lowerTitle.includes('fasting') || lowerTitle.includes('zamzam') || lowerTitle.includes('rain')) {
    return 'Special Occasions'
  } else if (lowerTitle.includes('parent') || lowerTitle.includes('sick') || lowerTitle.includes('wronged') || lowerTitle.includes('oppressed')) {
    return 'Personal States'
  } else {
    return 'Daily'
  }
}

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
