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

        setCurrentCat: function (cat) {
            model.currentCat = cat;
        },

        init: function () {
            currentCat = model.cats[0],

            catListView.init();
        }
    }

    const catListView = {
        init: function () {
            this.catsList = document.querySelector('#cats_list');

            this.render();
            console.log(this);
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