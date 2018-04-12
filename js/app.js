(function () {

    const model = {
        currentCat: null,
        cats: [
            { name: 'Cat', imgSrc: 'img/cat1.jpg', clickCount: 0 },
            { name: 'Fluffy', imgSrc: 'img/cat2.jpg', clickCount: 0 },
            { name: 'Purr', imgSrc: 'img/cat3.jpg', clickCount: 0 },
        ],
        isAdminAreaHidden: true
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

        getAdminAreaHidden: function () {
            return model.isAdminAreaHidden;
        },

        setAdminAreaHidden: function (bool) {
            model.isAdminAreaHidden = bool;
        },

        setCatName: function (name) {
            model.currentCat.name = name;
        },

        setImgSrc: function (imgUrl) {
            model.currentCat.imgSrc = imgUrl;
        },

        setNumberOfClicks: function (clicks) {
            model.currentCat.clickCount = clicks;
        },

        init: function () {
            model.currentCat = model.cats[0];
            catListView.init();
            catView.init();
            adminView.init();
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
            this.catsList.innerHTML = '';

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

    const adminView = {
        init: function () {
            this.adminBtn = document.getElementById('admin_btn');
            this.adminForm = document.getElementById('admin_form');
            this.nameInput = document.getElementById('admin_form__name');
            this.imgInput = document.getElementById('admin_form__img');
            this.clicksInput = document.getElementById('admin_form__clicks');
            this.cancelBtn = document.getElementById('admin_form__cancel-btn');

            this.render();
        },

        render: function () {
            const me = this;

            this.adminBtn.addEventListener('click', function () {
                const isAdminAreaHidden = octopus.getAdminAreaHidden();

                if (isAdminAreaHidden) {
                    me.adminForm.classList.remove('hidden');
                    octopus.setAdminAreaHidden(false);
                }
            });

            this.cancelBtn.addEventListener('click', function () {
                const isAdminAreaHidden = octopus.getAdminAreaHidden();

                if (!isAdminAreaHidden) {
                    me.hideAdminArea();
                }
            });

            this.adminForm.addEventListener('submit', function (e) {
                const catName = me.nameInput.value;
                const imgUrl = me.imgInput.value;
                const numberOfClicks = Number(me.clicksInput.value);

                if (catName) {
                    octopus.setCatName(catName);
                }

                if (imgUrl) {
                    octopus.setImgSrc(imgUrl);
                }

                if (numberOfClicks && typeof numberOfClicks == 'number') {
                    octopus.setNumberOfClicks(numberOfClicks);
                }

                catView.render();
                catListView.render();
                me.hideAdminArea();

                e.preventDefault();
            });
        },

        hideAdminArea: function () {
            this.adminForm.classList.add('hidden');
            octopus.setAdminAreaHidden(true);

            this.nameInput.value = null;
            this.imgInput.value = null;
            this.clicksInput.value = null;
        }
    }

    octopus.init();
})();