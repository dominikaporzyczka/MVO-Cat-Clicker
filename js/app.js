(function () {

    const model = {
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

        init: {

        }
    }
})();