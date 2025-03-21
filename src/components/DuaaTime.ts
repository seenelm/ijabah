export interface DuaaTimeProps {
  number: number;
  title: string;
  description?: string;
  source: string;
  category?: string; // Optional category for filtering
  icon?: string; // Optional icon name for visual enhancement
  arabicText?: string; // Arabic text of the hadith
  englishText?: string; // English translation of the hadith
  reference?: string; // Reference link to sunnah.com or other source
}

export function createDuaaTimeElement(props: DuaaTimeProps): HTMLElement {
  // Calculate a slight delay based on the item number for staggered animation
  const animationDelay = (props.number * 0.1) % 1.5;
  
  const container = document.createElement('div');
  container.className = 'duaa-time-container';
  container.style.animationDelay = `${animationDelay}s`;
  
  if (props.category) {
    container.dataset.category = props.category;
  }
  
  const card = document.createElement('div');
  card.className = 'duaa-time-card';
  
  // Add hover animation listener
  card.addEventListener('mouseenter', () => {
    card.classList.add('card-hover');
  });
  
  card.addEventListener('mouseleave', () => {
    card.classList.remove('card-hover');
  });
  
  const header = document.createElement('div');
  header.className = 'duaa-time-header';
  
  const numberElement = document.createElement('div');
  numberElement.className = 'duaa-time-number';
  numberElement.textContent = props.number.toString();
  
  const titleElement = document.createElement('h3');
  titleElement.className = 'duaa-time-title';
  titleElement.textContent = props.title;
  
  header.appendChild(numberElement);
  header.appendChild(titleElement);
  
  const content = document.createElement('div');
  content.className = 'duaa-time-content';
  
  if (props.description) {
    const descriptionElement = document.createElement('p');
    descriptionElement.className = 'duaa-time-description';
    descriptionElement.textContent = props.description;
    content.appendChild(descriptionElement);
  }
  
  const sourceElement = document.createElement('p');
  sourceElement.className = 'duaa-time-source';
  sourceElement.textContent = `Source: ${props.source}`;
  
  // Create a visual indicator element
  const indicator = document.createElement('div');
  indicator.className = 'duaa-time-indicator';
  
  // Add icon if provided, otherwise use a default visual
  if (props.icon) {
    const iconElement = document.createElement('span');
    iconElement.className = 'duaa-time-icon';
    iconElement.textContent = props.icon;
    indicator.appendChild(iconElement);
  }
  
  content.appendChild(sourceElement);
  
  card.appendChild(header);
  card.appendChild(content);
  
  // Add a subtle highlight effect on click
  card.addEventListener('click', () => {
    card.classList.add('card-active');
    setTimeout(() => {
      card.classList.remove('card-active');
    }, 300);
    
    // Open the hadith details modal
    const openHadithModal = (window as any).openHadithModal;
    if (typeof openHadithModal === 'function') {
      openHadithModal(props);
    }
  });
  
  container.appendChild(card);
  
  return container;
}
