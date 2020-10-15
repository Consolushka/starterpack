(function (){
  let coef = window.innerWidth;
  let coef1 = coef + 200;

  window.campusModule = {
    setStyleAndEvents(){
      document.querySelectorAll(`.campus`).forEach(function (campus) {
        campus.setAttribute(`style`, `transform: scale(${coef1 / 1068})`);
        let coef2 = coef1 - 300;
        if (window.innerWidth > 1250) {
          campus.setAttribute(`style`, `transform: scale(${coef1 / 1068}) translate(15%,15%)`);
        }
        if (window.innerWidth < 850) {
          campus.setAttribute(`style`, `transform: scale(${coef1 / 1068}) translate(-25%,-25%)`);
        }
        if (window.innerWidth < 400) {
          campus.setAttribute(`style`, `transform: scale(${coef2 / 1068}) translate(-150%,-150%)`);
        }
        campus.addEventListener(`click`, function(e){
          window.cardModule.show(campus.dataset.number,e.pageX,e.pageY);
        });
      });
    }
  }
})();
