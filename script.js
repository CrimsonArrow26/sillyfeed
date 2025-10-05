const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});


function page4Animation() {
    var elemC = document.querySelector("#elem-container")
    var fixed = document.querySelector("#fixed-image")
    var elems = document.querySelectorAll(".elem")
    
    
    function isMobile() {
        return window.innerWidth <= 768
    }
    
    
    function handleContainerVisibility() {
        var rect = elemC.getBoundingClientRect()
        var isVisible = rect.top < window.innerHeight && rect.bottom > 0
        
        if (isVisible) {
            fixed.style.display = "block"
        } else {
            fixed.style.display = "none"
        }
    }
    
    
    function handleElemVisibility() {
        if (!isMobile()) {
            
            elems.forEach(function(elem) {
                elem.classList.remove('active')
            })
            return
        }
        
        
        var activeElem = null
        var viewportHeight = window.innerHeight
        
        elems.forEach(function(elem) {
            var rect = elem.getBoundingClientRect()
            var elemCenter = rect.top + (rect.height / 2)
            var elemTopPercent = (rect.top / viewportHeight) * 100
            var elemBottomPercent = (rect.bottom / viewportHeight) * 100
            
            
            if (elemTopPercent <= 70 && elemBottomPercent >= 30) {
                
                var distanceFromCenter = Math.abs(elemCenter - (viewportHeight / 2))
                if (!activeElem || distanceFromCenter < Math.abs(activeElem.getBoundingClientRect().top + (activeElem.getBoundingClientRect().height / 2) - (viewportHeight / 2))) {
                    activeElem = elem
                }
            }
        })
        
        
        elems.forEach(function(elem) {
            elem.classList.remove('active')
        })
        
        
        if (activeElem) {
            activeElem.classList.add('active')
            
            var image = activeElem.getAttribute("data-image")
            fixed.style.backgroundImage = `url(${image})`
            
            
            fixed.style.left = "75%"
            fixed.style.top = "50%"
            fixed.style.transform = "translateY(-50%)"
        }
    }
    
    
    function setupDesktopHover() {
        if (isMobile()) return
        
        elems.forEach(function(elem) {
            elem.addEventListener('mouseenter', function() {
                var image = elem.getAttribute("data-image")
                fixed.style.backgroundImage = `url(${image})`
                fixed.style.display = "block"
                
                
                fixed.style.left = "75%"
                fixed.style.top = "50%"
                fixed.style.transform = "translateY(-50%)"
            })
            
            elem.addEventListener('mouseleave', function() {
                fixed.style.display = "none"
            })
        })
    }
    
    
    handleContainerVisibility()
    handleElemVisibility()
    setupDesktopHover()
    
    
    window.addEventListener('scroll', function() {
        handleContainerVisibility()
        handleElemVisibility()
    })
    
    
    window.addEventListener('resize', function() {
        handleContainerVisibility()
        handleElemVisibility()
        setupDesktopHover()
    })
}

function swiperAnimation() {
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: "auto",
        centeredSlides: true,
        spaceBetween: 100,
    });
}
function menuAnimation() {
    
    
    return;
}

function mobileMenuAnimation() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    
    if (!mobileMenuBtn || !mobileMenu) return;
    
    
    mobileMenuBtn.addEventListener('click', function(e) {
        e.preventDefault();
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    });
    
    
    mobileMenuClose.addEventListener('click', function(e) {
        e.preventDefault();
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    
    
    mobileMenu.addEventListener('click', function(e) {
        if (e.target === mobileMenu) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

function loaderAnimation() {
    var loader = document.querySelector("#loader")
    setTimeout(function () {
        loader.style.top = "-100%"
    }, 4200)
}

function memeScrollAnimation() {
    const memeTrack = document.querySelector('.meme-track');
    const memeItems = document.querySelectorAll('.meme-item');
    
    if (!memeTrack) return;
    
    
    memeItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            
            item.style.transform = 'scale(1.2) rotate(5deg)';
            setTimeout(() => {
                item.style.transform = 'scale(1) rotate(0deg)';
            }, 200);
            
            
            console.log(`Meme ${index + 1} clicked!`);
        });
    });
    
    
    memeTrack.style.scrollBehavior = 'smooth';
    
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            e.preventDefault();
            const currentTransform = memeTrack.style.transform || 'translateX(0px)';
            const currentX = parseFloat(currentTransform.replace('translateX(', '').replace('px)', '')) || 0;
            const moveAmount = e.key === 'ArrowLeft' ? 200 : -200;
            memeTrack.style.transform = `translateX(${currentX + moveAmount}px)`;
        }
    });
}

function waitlistFormHandler() {
    const form = document.getElementById('waitlistForm');
    const emailInput = document.getElementById('email');
    const suggestionInput = document.getElementById('suggestion');
    const submitBtn = document.querySelector('.waitlist-btn');
    
    if (!form) return;
    
    
    emailjs.init("vlA4ZV1UDxgGlyReg"); 
    
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const suggestion = suggestionInput.value.trim();
        
        if (!email) {
            showMessage('Please enter a valid email address', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showMessage('Please enter a valid email format', 'error');
            return;
        }
        
        
        submitBtn.textContent = 'Joining...';
        submitBtn.disabled = true;
        
        
        const templateParams = {
            from_email: email,
            from_name: 'SillyFeed Waitlist User',
            message: suggestion || 'No suggestions provided',
            to_email: 'saasplaydium@gmail.com', 
            reply_to: email
        };
        
        
        emailjs.send('service_xegdjrl', 'template_y9fz1gh', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                showMessage('Successfully joined the waitlist! 🎉', 'success');
                form.reset();
            }, function(error) {
                console.log('FAILED...', error);
                showMessage('Something went wrong. Please try again.', 'error');
            })
            .finally(function() {
                
                submitBtn.textContent = 'Join Waitlist';
                submitBtn.disabled = false;
            });
    });
    
    
    const inputGroups = document.querySelectorAll('.input-group');
    inputGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const label = group.querySelector('label');
        
        input.addEventListener('focus', function() {
            label.style.color = '#FE330A';
            label.style.transform = 'translateY(-2px)';
        });
        
        input.addEventListener('blur', function() {
            if (!input.value) {
                label.style.color = '#666';
                label.style.transform = 'translateY(0)';
            }
        });
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showMessage(message, type) {
    
    const existingMessage = document.querySelector('.waitlist-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `waitlist-message ${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        background: ${type === 'success' ? 'linear-gradient(135deg, #4CAF50, #45a049)' : 'linear-gradient(135deg, #f44336, #d32f2f)'};
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(messageDiv);
    
    
    setTimeout(() => {
        messageDiv.style.transform = 'translateX(0)';
    }, 100);
    
    
    setTimeout(() => {
        messageDiv.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 300);
    }, 4000);
}

swiperAnimation()
page4Animation()
menuAnimation()
mobileMenuAnimation()
loaderAnimation()
memeScrollAnimation()
waitlistFormHandler()
