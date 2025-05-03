document.addEventListener('DOMContentLoaded', () => {
    console.log('Trang đã được tải');
    
    // Hiệu ứng chào mừng
    showWelcomeEffect();
    
    // Đảm bảo trang web hiển thị đúng kích thước
    adjustViewport();
    window.addEventListener('resize', adjustViewport);
    
    // Hiệu ứng trái tim
    generateHearts();
    
    // Tạo hiệu ứng con vật di chuyển
    generateAnimals();
    
    // Khởi tạo slider - Gọi hàm này đầu tiên để đảm bảo slide hiển thị
    const sliderController = initializeSlider();
    
    // Kích hoạt slide đầu tiên ngay lập tức
    sliderController.showSlide(0);
    
    // Hiệu ứng modal
    setupModal();
    
    // Hiệu ứng hover cho các phần tử
    setupHoverEffects();
});

// Hiệu ứng chào mừng
function showWelcomeEffect() {
    const card = document.querySelector('.card');
    if (!card) return;
    
    // Thêm class để kích hoạt animation
    setTimeout(() => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px) rotateX(10deg)';
        
        setTimeout(() => {
            card.style.transition = 'all 1.2s cubic-bezier(0.165, 0.84, 0.44, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) rotateX(0)';
        }, 300);
    }, 200);
}

// Hiệu ứng khi hover
function setupHoverEffects() {
    // Hiệu ứng 3D tilt cho card
    const card = document.querySelector('.card');
    const container = document.querySelector('.container');
    
    if (card && container && window.innerWidth > 768) {
        container.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
        
        container.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
        });
        
        container.addEventListener('mouseleave', () => {
            card.style.transition = 'all 0.5s ease';
            card.style.transform = 'rotateY(0deg) rotateX(0deg)';
        });
    }
}

// Điều chỉnh kích thước hiển thị cho toàn màn hình
function adjustViewport() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Tạo hiệu ứng trái tim xung quanh hình ảnh
function generateHearts() {
    console.log('Đang tạo hiệu ứng trái tim');
    const heartsContainer = document.querySelector('.hearts-container');
    const imageContainer = document.querySelector('.image-container');
    
    if (!heartsContainer || !imageContainer) {
        console.error('Không tìm thấy phần tử hearts-container hoặc image-container');
        return;
    }
    
    // Tạo trái tim ngẫu nhiên khi hover vào hình ảnh
    imageContainer.addEventListener('mouseenter', () => {
        const heartInterval = setInterval(() => {
            createHeart(heartsContainer);
        }, 200);
        
        imageContainer.addEventListener('mouseleave', () => {
            clearInterval(heartInterval);
        });
    });
    
    // Tạo một số trái tim ngay từ đầu
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createHeart(heartsContainer);
        }, i * 300);
    }
    
    // Tạo trái tim ngẫu nhiên mỗi 3 giây
    setInterval(() => {
        if (Math.random() > 0.6) {
            createHeart(heartsContainer);
        }
    }, 2000);
    
    // Tạo hiệu ứng đặc biệt khi click vào ảnh
    imageContainer.addEventListener('click', () => {
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                createHeart(heartsContainer, true);
            }, i * 100);
        }
    });
}

function createHeart(container, isSpecial = false) {
    const heart = document.createElement('i');
    heart.classList.add('fas', 'fa-heart', 'heart');
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = 2 + Math.random() * 3 + 's';
    heart.style.fontSize = (isSpecial ? 15 : 10) + Math.random() * 20 + 'px';
    heart.style.color = getRandomColor();
    
    // Hiệu ứng đặc biệt cho trái tim khi click
    if (isSpecial) {
        heart.style.filter = 'drop-shadow(0 0 5px ' + heart.style.color + ')';
        heart.style.animationTimingFunction = 'cubic-bezier(0.165, 0.84, 0.44, 1)';
    }
    
    container.appendChild(heart);
    
    // Xóa trái tim sau khi hoàn thành hiệu ứng
    setTimeout(() => {
        heart.remove();
    }, 5000);
}

function getRandomColor() {
    const colors = [
        '#ff6b6b', // Đỏ
        '#ff9e7d', // Hồng cam
        '#da77f2', // Tím nhạt
        '#7971ea', // Tím xanh
        '#ff8787', // Hồng đỏ
        '#ff6b9d', // Hồng đậm
        '#ef5777', // Hồng san hô
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Tạo hiệu ứng con vật di chuyển
function generateAnimals() {
    console.log('Đang tạo hiệu ứng con vật');
    const animalsContainer = document.querySelector('.animals-container');
    
    if (!animalsContainer) {
        console.error('Không tìm thấy phần tử animals-container');
        return;
    }
    
    // Danh sách các con vật
    const animals = [
        { emoji: '🐱', type: 'cat' },
        { emoji: '🐶', type: 'dog' },
        { emoji: '🐰', type: 'rabbit' },
        { emoji: '🐹', type: 'hamster' },
        { emoji: '🦊', type: 'fox' },
        { emoji: '🐨', type: 'koala' },
        { emoji: '🐼', type: 'panda' },
        { emoji: '🦝', type: 'raccoon' }
    ];
    
    // Tạo một số con vật ngay từ đầu
    for (let i = 0; i < 4; i++) {
        setTimeout(() => {
            createRandomAnimal(animalsContainer, animals);
        }, i * 1500);
    }
    
    // Tạo con vật di chuyển mỗi 5-8 giây
    setInterval(() => {
        if (Math.random() > 0.3) {
            createRandomAnimal(animalsContainer, animals);
        }
    }, 5000 + Math.random() * 3000);
    
    // Tạo con vật nhảy lên xuống ở các góc màn hình
    createBounceAnimals(animalsContainer, animals);
}

function createRandomAnimal(container, animalsList) {
    // Chọn ngẫu nhiên một con vật
    const animal = animalsList[Math.floor(Math.random() * animalsList.length)];
    
    // Tạo element con vật
    const animalEl = document.createElement('div');
    animalEl.textContent = animal.emoji;
    animalEl.classList.add('animal', animal.type);
    
    // Vị trí bắt đầu ngẫu nhiên
    const startY = 50 + Math.random() * (window.innerHeight - 100);
    animalEl.style.bottom = startY + 'px';
    animalEl.style.left = '-50px';
    
    // Kích thước ngẫu nhiên
    const size = 25 + Math.random() * 20;
    animalEl.style.fontSize = size + 'px';
    
    // Độ trễ ngẫu nhiên
    animalEl.style.animationDelay = Math.random() * 2 + 's';
    
    // Thêm vào container
    container.appendChild(animalEl);
    
    // Xóa con vật sau khi hoàn thành hiệu ứng
    setTimeout(() => {
        animalEl.remove();
    }, 25000);
}

function createBounceAnimals(container, animalsList) {
    // Tạo con vật ở các góc
    const positions = [
        { bottom: '20px', left: '20px' },
        { bottom: '20px', right: '20px' },
        { top: '20%', left: '30px' },
        { top: '40%', right: '30px' }
    ];
    
    // Chọn ngẫu nhiên 2 vị trí để đặt con vật
    const shuffledPositions = [...positions].sort(() => 0.5 - Math.random()).slice(0, 2);
    
    shuffledPositions.forEach((position, index) => {
        // Chọn ngẫu nhiên một con vật
        const animal = animalsList[Math.floor(Math.random() * animalsList.length)];
        
        // Tạo element con vật
        const animalEl = document.createElement('div');
        animalEl.textContent = animal.emoji;
        animalEl.classList.add('bounce-animal');
        
        // Đặt vị trí
        Object.keys(position).forEach(key => {
            animalEl.style[key] = position[key];
        });
        
        // Kích thước
        animalEl.style.fontSize = (25 + Math.random() * 10) + 'px';
        
        // Độ trễ ngẫu nhiên cho animation
        animalEl.style.animationDelay = (index * 0.5) + 's';
        
        // Thêm vào container
        container.appendChild(animalEl);
    });
}

// Xử lý slider
function initializeSlider() {
    console.log('Đang khởi tạo slider');
    const slides = document.querySelectorAll('.content-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    
    if (!slides.length || !indicators.length) {
        console.error('Không tìm thấy slides hoặc indicators');
        return;
    }
    
    if (!prevButton || !nextButton) {
        console.error('Không tìm thấy nút prev hoặc next');
        return;
    }
    
    let currentIndex = 0;
    let isAnimating = false;
    
    // Cập nhật hiển thị slide
    function showSlide(index) {
        if (isAnimating) return;
        isAnimating = true;
        
        console.log('Hiển thị slide:', index);
        
        // Ẩn tất cả các slide
        slides.forEach(slide => {
            slide.style.display = 'none';
            slide.classList.remove('active');
        });
        
        // Hiển thị slide hiện tại
        slides[index].style.display = 'block';
        
        // Đợi một chút để đảm bảo DOM đã cập nhật
        setTimeout(() => {
            slides[index].classList.add('active');
            
            // Cập nhật indicators
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === index);
            });
            
            currentIndex = index;
            isAnimating = false;
        }, 50);
    }
    
    // Hiển thị slide đầu tiên ngay lập tức
    showSlide(0);
    
    // Xử lý nút trước đó
    prevButton.addEventListener('click', () => {
        console.log('Nhấn nút prev');
        const newIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(newIndex);
        
        // Hiệu ứng nhấn nút
        addButtonPressEffect(prevButton);
    });
    
    // Xử lý nút tiếp theo
    nextButton.addEventListener('click', () => {
        console.log('Nhấn nút next');
        const newIndex = (currentIndex + 1) % slides.length;
        showSlide(newIndex);
        
        // Hiệu ứng nhấn nút
        addButtonPressEffect(nextButton);
    });
    
    // Xử lý indicator
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            console.log('Nhấn vào indicator:', index);
            showSlide(index);
        });
    });
    
    // Hiệu ứng nhấn nút
    function addButtonPressEffect(button) {
        button.style.transform = 'scale(0.95) translateY(2px)';
        button.style.opacity = '0.9';
        setTimeout(() => {
            button.style.transform = '';
            button.style.opacity = '';
        }, 200);
    }
    
    // Hỗ trợ vuốt trên thiết bị di động
    const contentWrapper = document.querySelector('.content-wrapper');
    if (contentWrapper) {
        let touchStartX = 0;
        let touchEndX = 0;
        let isSwiping = false;
        
        contentWrapper.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            isSwiping = true;
        }, {passive: true});
        
        contentWrapper.addEventListener('touchmove', (e) => {
            if (!isSwiping) return;
            
            const currentX = e.changedTouches[0].screenX;
            const diff = currentX - touchStartX;
            
            // Ngăn chặn cuộn trang khi vuốt ngang
            if (Math.abs(diff) > 10) {
                e.preventDefault();
            }
        }, {passive: false});
        
        contentWrapper.addEventListener('touchend', (e) => {
            if (!isSwiping) return;
            
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            isSwiping = false;
        }, {passive: true});
        
        function handleSwipe() {
            if (touchEndX < touchStartX - 50) {
                // Vuốt sang trái
                const newIndex = (currentIndex + 1) % slides.length;
                showSlide(newIndex);
            } else if (touchEndX > touchStartX + 50) {
                // Vuốt sang phải
                const newIndex = (currentIndex - 1 + slides.length) % slides.length;
                showSlide(newIndex);
            }
        }
    }
    
    // Tự động chuyển slide
    const autoSlideInterval = setInterval(() => {
        if (Math.random() > 0.7) {
            const newIndex = (currentIndex + 1) % slides.length;
            showSlide(newIndex);
        }
    }, 5000);
    
    // Trả về các phương thức kiểm soát bên ngoài
    return {
        showSlide,
        getCurrentIndex: () => currentIndex,
        stopAutoSlide: () => clearInterval(autoSlideInterval)
    };
}

// Xử lý modal
function setupModal() {
    console.log('Đang cài đặt modal');
    const modal = document.getElementById('message-modal');
    const btn = document.getElementById('special-btn');
    const closeBtn = document.querySelector('.close');
    const yesBtn = document.getElementById('yes-btn');
    const maybeBtn = document.getElementById('maybe-btn');
    
    if (!modal || !btn || !closeBtn || !yesBtn || !maybeBtn) {
        console.error('Không tìm thấy các phần tử modal cần thiết');
        return;
    }
    
    // Mở modal
    btn.addEventListener('click', () => {
        console.log('Nhấn nút mở modal');
        modal.style.display = 'flex';
        setTimeout(() => {
            sprayConfetti();
        }, 300);
    });
    
    // Đóng modal
    closeBtn.addEventListener('click', () => {
        console.log('Đóng modal');
        modal.style.display = 'none';
    });
    
    // Đóng khi click ra ngoài
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Xử lý nút "Có"
    yesBtn.addEventListener('click', () => {
        console.log('Nhấn nút Có');
        sprayConfetti();
        
        // Hiển thị thông báo hạnh phúc
        const content = document.querySelector('.modal-content');
        content.innerHTML = `
            <h2>Yeayyy!!! 😊</h2>
            <p>Tuyệt vời! Tớ sẽ đón cậu vào cuối tuần. Rất mong được gặp và trò chuyện cùng cậu! ❤️</p>
            <button id="close-success" class="close-btn">Đóng</button>
        `;
        
        // Xử lý nút đóng mới
        setTimeout(() => {
            const closeSuccessBtn = document.getElementById('close-success');
            if (closeSuccessBtn) {
                closeSuccessBtn.addEventListener('click', () => {
                    modal.style.display = 'none';
                });
            }
        }, 100);
    });
    
    // Xử lý nút "Để tôi suy nghĩ"
    maybeBtn.addEventListener('click', () => {
        console.log('Nhấn nút Để coi lịch trực đã');
        const content = document.querySelector('.modal-content');
        content.innerHTML = `
            <h2>Không sao đâu 😊</h2>
            <p>Hiểu mà, y tá thì bận lắm! Khi nào cậu rảnh thì nhắn tin cho tớ nha. Tớ sẽ chờ đợi cậu! ❤️</p>
            <button id="close-maybe" class="close-btn">Đóng</button>
        `;
        
        // Xử lý nút đóng mới
        setTimeout(() => {
            const closeMaybeBtn = document.getElementById('close-maybe');
            if (closeMaybeBtn) {
                closeMaybeBtn.addEventListener('click', () => {
                    modal.style.display = 'none';
                });
            }
        }, 100);
    });
}

// Tạo hiệu ứng confetti
function sprayConfetti() {
    for (let i = 0; i < 100; i++) {
        createConfetti();
    }
}

function createConfetti() {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.width = Math.random() * 10 + 5 + 'px';
    confetti.style.height = Math.random() * 5 + 5 + 'px';
    confetti.style.backgroundColor = getRandomColor();
    confetti.style.top = '-10px';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.zIndex = '1000';
    confetti.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
    confetti.style.opacity = Math.random();
    
    document.body.appendChild(confetti);
    
    // Animation
    const animationDuration = Math.random() * 3 + 2;
    confetti.animate(
        [
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            { transform: 'translateY(' + (Math.random() * 500 + 200) + 'px) rotate(' + (Math.random() * 360) + 'deg)', opacity: 0 }
        ],
        {
            duration: animationDuration * 1000,
            easing: 'cubic-bezier(0.1, 0.8, 0.3, 1)'
        }
    );
    
    // Remove confetti after animation
    setTimeout(() => {
        confetti.remove();
    }, animationDuration * 1000);
} 