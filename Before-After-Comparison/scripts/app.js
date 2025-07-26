
        document.addEventListener('DOMContentLoaded', function() {
            const slider = document.querySelector('.comparison-slider');
            const beforeImage = document.querySelector('.before-image');
            const sliderHandle = document.querySelector('.slider-handle');
            
            let isDragging = false;
            
            // Set initial position to 50%
            let position = 50;
            updateSliderPosition(position);
            
            // Handle mouse and touch events
            sliderHandle.addEventListener('mousedown', startDrag);
            slider.addEventListener('mousemove', drag);
            window.addEventListener('mouseup', endDrag);
            
            sliderHandle.addEventListener('touchstart', startDrag);
            slider.addEventListener('touchmove', drag);
            window.addEventListener('touchend', endDrag);
            
            // Click anywhere on slider to move handle
            slider.addEventListener('click', function(e) {
                if (!isDragging) {
                    const rect = slider.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    position = (x / rect.width) * 100;
                    updateSliderPosition(position);
                }
            });
            
            function startDrag(e) {
                e.preventDefault();
                isDragging = true;
            }
            
            function drag(e) {
                if (!isDragging) return;
                
                e.preventDefault();
                
                const rect = slider.getBoundingClientRect();
                let clientX;
                
                if (e.type === 'touchmove') {
                    clientX = e.touches[0].clientX;
                } else {
                    clientX = e.clientX;
                }
                
                const x = clientX - rect.left;
                position = (x / rect.width) * 100;
                
                // Constrain position between 0 and 100
                position = Math.max(0, Math.min(100, position));
                
                updateSliderPosition(position);
            }
            
            function endDrag() {
                isDragging = false;
            }
            
            function updateSliderPosition(pos) {
                document.documentElement.style.setProperty('--position', `${pos}%`);
            }
        });