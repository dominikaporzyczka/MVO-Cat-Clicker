(function () {

    const model = {
        currentCat: null,
        cats: [
            { name: 'Cat', imgSrc: 'img/cat1.jpg', clickCount: 0 },
            { name: 'Fluffy', imgSrc: 'img/cat2.jpg', clickCount: 0 },
            { name: 'Purr', imgSrc: 'img/cat3.jpg', clickCount: 0 },
        ]
    }

    const octopus = {
        getCats: function () {
            return model.cats;
        },

        getCurrentCat: function () {
            return model.currentCat;
        },

        setCurrentCat: function (cat) {
            model.currentCat = cat;

            catView.render();
        },

        icrementCounter: function () {
            model.currentCat.clickCount++;

            catView.render();
        },

        init: function () {
            model.currentCat = model.cats[0];
            catListView.init();
            catView.init();
        }
    }

    const catView = {
        init: function () {
            this.catNameElem = document.getElementById('cat_name');
            this.catImgElem = document.getElementById('cat_img');
            this.catCounter = document.getElementById('cat_click-counter');

            this.catImgElem.addEventListener('click', function () {
                octopus.icrementCounter();

            });

            this.render();
        },

        render: function () {
            const currentCat = octopus.getCurrentCat();

            this.catNameElem.textContent = currentCat.name;
            this.catImgElem.src = currentCat.imgSrc;
            this.catCounter.textContent = currentCat.clickCount;
        }
    }

    const catListView = {
        init: function () {
            this.catsList = document.querySelector('#cats_list');

            this.render();
        },

        render: function () {
            const cats = octopus.getCats();
            const elem = document.createDocumentFragment();

            for (let i = 0; i < cats.length; i++) {
                const cat = cats[i],
                    catElem = document.createElement('li');

                catElem.classList.add('cats_list__cat');
                catElem.textContent = cat.name;
                elem.appendChild(catElem);

                catElem.addEventListener('click', function () {
                    octopus.setCurrentCat(cat);
                });
            }

            this.catsList.appendChild(elem);
        }
    }

    octopus.init();
})();