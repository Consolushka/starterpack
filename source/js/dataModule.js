'use strict';

(function () {

  let CampusCount = 37;

  window.dataModule = {
    campuses: [],
    mockData() {
      for (let i = 1; i < CampusCount + 1; i++) {
        let campus = {
          id: i,
          address: `Лиственничная аллея, 4а`,
          floors: [
          {
            101: `Лекционная`,
            103: `Уборная`
          },
          {
            201: `Лекционная`,
            203: `Уборная`
          }
          ],
          cathedra: [
            {
              name: `Сельскохозяйственных мелиораций, лесоводства и землеустройства`
            },
            {
              name: `Сельскохозяйственных мелиораций, лесоводства и землеустройства`
            }
          ],
          deanery: {
            name: `Деканат технологического факультета`,
            floor: 3,
            rooms: [301,302, 329]
          }
        };
        this.campuses.push(campus);
      }
    }
  };
})();
