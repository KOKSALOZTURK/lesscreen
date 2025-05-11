const items = [
    { title: "Toddler Activities (Ages 1-3)", link: "alternatives.html#Toddler Activities (Ages 1-3)" },
    { title: "Preschooler Activities (Ages 3-5)", link: "alternatives.html#Preschooler Activities (Ages 3-5)" },
    { title: "Elementary School Activities (Ages 6-11)", link: "alternatives.html#Elementary School Activities (Ages 6-11)" },
    { title: "Middle School Activities (Ages 12+)", link: "alternatives.html#Middle School Activities (Ages 12+)" },
    { title: "Tips for Parents", link: "alternatives.html#Tips for Parents" },
    { title: "Download our printables", link: "alternatives.html#Download our printables" },
    { title: "The Science", link: "research.html" },
    { title: "Real-Life Stories", link: "stories.html" },
    { title: "Statistics", link: "statistics.html" },
    { title: "Resources", link: "resources.html" },
  ];
  
  // DOM Elements
  const searchBox = document.getElementById('live-search-box');
  const resultsList = document.getElementById('search-results');
  
  // search function
  searchBox.addEventListener('input', function() {
    const searchTerm = searchBox.value.toLowerCase();
    resultsList.innerHTML = '';
  
    const filteredItems = items.filter(item => item.title.toLowerCase().includes(searchTerm));
  
    filteredItems.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item.title;
      li.onclick = () => window.location.href = item.link;
      resultsList.appendChild(li);
    });
  
    if (searchTerm.length === 0) {
      resultsList.innerHTML = '';
    }
  });


  new Chart(document.getElementById('chart3'), {
    type: 'line',
    data: {
      labels: ['0', '3', '6', '9', '12'],
      datasets: [{
        label: 'Cognitive Score at Age 2',
        data: [82, 86, 90, 94, 97],
        borderColor: '#2ca02c',
        tension: 0.4
      }]
    }
  });

  let lastScrollTop = 0;
const navbar = document.querySelector('header');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop){
        // aşağı kaydırılıyor
        navbar.style.top = "-100px"; // yukarı kaydır, görünmez yap
    } else {
        // yukarı kaydırılıyor
        navbar.style.top = "0"; // görünür yap
    }

    lastScrollTop = scrollTop;
});

// Menu functionality
document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menu
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const dropdownContent = document.querySelector('.dropdown-content');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            navLinks.classList.toggle('open');
        });
    }

    // Dropdown menu
    const dropbtn = document.querySelector('.dropbtn');

    if (dropbtn && dropdownContent) {
        dropbtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!dropbtn.contains(e.target) && !dropdownContent.contains(e.target)) {
                dropdownContent.style.display = 'none';
            }
        });
    }

    // Close menu when clicking outside on mobile
    if (navLinks) {
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 768 && 
                !hamburger.contains(e.target) && 
                !navLinks.contains(e.target) && 
                navLinks.classList.contains('open')) {
                navLinks.classList.remove('open');
            }
        });
    }
});

// Improved back to top functionality
document.addEventListener("DOMContentLoaded", function () {
    const backToTop = document.getElementById("backToTop");
    let scrollTimeout;

    function toggleBackToTop() {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    // Throttle scroll event for better performance
    window.addEventListener("scroll", function() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                toggleBackToTop();
                scrollTimeout = null;
            }, 100);
        }
    });

    backToTop.addEventListener("click", function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // Initial check
    toggleBackToTop();
});

document.addEventListener('DOMContentLoaded', () => {
    const questions = document.querySelectorAll('.question');
    const result = document.getElementById('result');
    const recommendation = document.getElementById('recommendation');
    const restartButton = document.getElementById('restart');
    let currentQuestion = 0;
    let answers = {};

    // Add click event listeners to all options
    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', () => {
            // Remove selected class from all options in current question
            const currentOptions = questions[currentQuestion].querySelectorAll('.option');
            currentOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Add selected class to clicked option
            option.classList.add('selected');
            
            // Store the answer
            if (option.dataset.age) {
                answers.age = option.dataset.age;
            } else if (option.dataset.time) {
                answers.time = option.dataset.time;
            } else if (option.dataset.content) {
                answers.content = option.dataset.content;
            }

            // Move to next question or show result
            setTimeout(() => {
                if (currentQuestion < questions.length - 1) {
                    questions[currentQuestion].classList.add('hidden');
                    currentQuestion++;
                    questions[currentQuestion].classList.remove('hidden');
                } else {
                    showResult();
                }
            }, 300);
        });
    });

    // Restart quiz
    restartButton.addEventListener('click', () => {
        currentQuestion = 0;
        answers = {};
        questions.forEach((q, index) => {
            q.classList.toggle('hidden', index !== 0);
            q.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
        });
        result.classList.add('hidden');
    });

    function showResult() {
        const recommendationText = generateRecommendation();
        recommendation.innerHTML = recommendationText;
        questions[currentQuestion].classList.add('hidden');
        result.classList.remove('hidden');
    }

    function generateRecommendation() {
        let recommendation = '';
        
        // Age-based recommendations
        switch(answers.age) {
            case '0-2':
                recommendation = `
                    <h3>For children under 2 years:</h3>
                    <p>The American Academy of Pediatrics (AAP) recommends avoiding screen time for children under 2 years old, except for video chatting with family.</p>
                    <ul>
                        <li>Focus on face-to-face interactions and physical play</li>
                        <li>Read books together</li>
                        <li>Engage in sensory activities</li>
                        <li>If using screens, ensure it's for video calls with family only</li>
                    </ul>`;
                break;
            case '2-5':
                recommendation = `
                    <h3>For children 2-5 years:</h3>
                    <p>AAP recommends limiting screen time to 1 hour per day of high-quality programming.</p>
                    <ul>
                        <li>Choose educational content</li>
                        <li>Watch together and discuss what you see</li>
                        <li>Balance screen time with physical activity</li>
                        <li>Establish consistent screen-free times (meals, bedtime)</li>
                    </ul>`;
                break;
            case '6-12':
                recommendation = `
                    <h3>For children 6-12 years:</h3>
                    <p>For this age group, focus on balance and quality of screen time.</p>
                    <ul>
                        <li>Set consistent limits on screen time</li>
                        <li>Encourage educational content</li>
                        <li>Ensure screens don't interfere with sleep or physical activity</li>
                        <li>Teach digital literacy and online safety</li>
                    </ul>`;
                break;
            case '13-17':
                recommendation = `
                    <h3>For teenagers 13-17 years:</h3>
                    <p>Focus on healthy screen habits and digital citizenship.</p>
                    <ul>
                        <li>Set reasonable limits while respecting independence</li>
                        <li>Encourage balanced use of technology</li>
                        <li>Discuss online safety and digital footprint</li>
                        <li>Promote face-to-face social interactions</li>
                    </ul>`;
                break;
        }

        // Add content-specific recommendations
        if (answers.content) {
            recommendation += `
                <h3>Content-Specific Tips:</h3>
                <ul>
                    ${getContentRecommendations(answers.content)}
                </ul>`;
        }

        // Add time-specific recommendations
        if (answers.time) {
            recommendation += `
                <h3>Current Screen Time Adjustment:</h3>
                <p>${getTimeRecommendations(answers.time, answers.age)}</p>`;
        }

        return recommendation;
    }

    function getContentRecommendations(content) {
        switch(content) {
            case 'educational':
                return `
                    <li>Choose age-appropriate educational apps and programs</li>
                    <li>Engage with your child during educational screen time</li>
                    <li>Balance with hands-on learning activities</li>`;
            case 'entertainment':
                return `
                    <li>Set clear limits on entertainment screen time</li>
                    <li>Choose high-quality, age-appropriate content</li>
                    <li>Balance with physical activities and social interaction</li>`;
            case 'social':
                return `
                    <li>Monitor social media use closely</li>
                    <li>Teach responsible social media behavior</li>
                    <li>Set privacy settings and discuss online safety</li>`;
            case 'mixed':
                return `
                    <li>Create a balanced media diet</li>
                    <li>Prioritize educational content</li>
                    <li>Set different limits for different types of content</li>`;
        }
    }

    function getTimeRecommendations(time, age) {
        if (age === '0-2' && time !== 'none') {
            return "Consider reducing screen time to zero, except for video calls with family.";
        }
        
        switch(time) {
            case 'none':
                return "Your current screen time is appropriate. Continue to be mindful of screen use as your child grows.";
            case 'less':
                return "Your current screen time is within recommended limits. Continue to monitor and adjust as needed.";
            case '1-2':
                return "Consider reducing screen time slightly and ensuring it's high-quality content.";
            case 'more':
                return "Consider reducing screen time and implementing a structured schedule with clear limits.";
        }
    }
});

