document.addEventListener('DOMContentLoaded', () => {
   const divider = document.querySelector('.divider');
   const picturesContainer = document.querySelector('.pictures-container');
   const img1 = document.querySelector('.picture-container--first img');
   const img2 = document.querySelector('.picture-container--second img');

   const imgContainer2 = document.querySelector('.picture-container--second');
   const dividerLine = document.querySelector('.divider__line');
   const dividerHandle = document.querySelector('.divider__handle-container');

   let dragging = false;
   let sliderOffsetLeft;
   let sliderOffsetWidth;

   const adjustImgSize = () => {
      sliderOffsetWidth = picturesContainer.offsetWidth;

      img1.style.maxWidth = `${sliderOffsetWidth}px`;
      img2.style.maxWidth = `${sliderOffsetWidth}px`;
   }

   const getOffset = (clientX) => {
      sliderOffsetLeft = picturesContainer.offsetLeft;
      const offset = clientX - sliderOffsetLeft;

      if (offset < 0) {
         return 0;
      } else if (offset > sliderOffsetWidth) {
         return sliderOffsetWidth;
      } else {
         return offset;
      }
   }

   const move = (clientX) => {
      sliderOffsetLeft = picturesContainer.offsetLeft;
      sliderOffsetWidth = picturesContainer.offsetWidth;

      let percent = (getOffset(clientX) / sliderOffsetWidth) * 100;

      dividerLine.style.left = `${percent}%`;
      dividerHandle.style.left = `${percent}%`;
      imgContainer2.style.width = `${percent}%`;
   }

   const initEventListeners = () => {
      divider.addEventListener('mousedown', () => {
         dragging = true;
      });
      divider.addEventListener('touchstart', () => {
         dragging = true;
      });


      document.addEventListener('mouseup', () => {
         dragging = false;
      });
      document.addEventListener('touchend', () => {
         dragging = false;
      });


      document.addEventListener('mousemove', (e) => {
         if (dragging) {
            move(e.clientX);
         }
      });
      document.addEventListener('touchmove', (e) => {
         if (dragging) {
            move(e.touches[0].clientX);
         }
      });

      window.addEventListener('resize', adjustImgSize);
   }

   adjustImgSize();
   initEventListeners();
});