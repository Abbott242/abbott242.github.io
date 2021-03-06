var teaProjects;

$.ajax({
    type: "GET",
    url: "getProjects.json",
    datatype: "json",
    async: false,
    success: function(data){
        teaProjects = data;
    }
});

function truncate(str, no_words) {
    return str.split(" ").splice(0, no_words).join(" ");
}

$('#exampleModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget); // Button that triggered the modal
    var projectID = button.data('whatever'); // Extract info from data-* attributes
    var project = teaProjects[projectID];
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this);
    modal.find('.modal-title').text('About ' + teaProjects[projectID]['title'] + ' project');
    if (project['images'].length > 0) {
        modal.find('.carousel').removeClass('d-none');
        for (i = 0; i < project['images'].length; i++) {
            if (i === 0) {
                modal.find('.modal-body .carousel-indicators').append('<li data-target="#modalCarousel" data-slide-to="' + i + '" class="active"></li>')
                modal.find('.modal-body .carousel-inner').append('<div class="carousel-item active"> <img class="d-block w-100" src="' + project['images'][i] + '" alt="carousel image"/> </div>');
            } else {
                modal.find('.modal-body .carousel-indicators').append('<li data-target="#modalCarousel" data-slide-to="' + i + '"></li>')
                modal.find('.modal-body .carousel-inner').append('<div class="carousel-item"> <img class="d-block w-100" src="' + project['images'][i] + '" alt="carousel image" /> </div>');
            }
        }
    }
    if (!project['images'].length) {
        modal.find('.modal-body .col-12').append('<div class="card-background"><model-viewer class="card-img-top" src="' + project['model'] + '" alt="' + project['title'] + '" auto-rotate camera-controls interaction-prompt="none" interaction-policy="allow-when-focused"></model-viewer></div>')
    }
    modal.find('.modal-body .main-title').text(project['title']);
    modal.find('.modal-body .main-text').html(project['text'])
});

$("#exampleModal").on("hidden.bs.modal", function () {
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this);
    modal.find('.modal-content').html('<!--modal has been reset-->' +
        '           <div class="modal-header">\n' +
        '                <h5 class="modal-title" id="exampleModalLabel">About</h5>\n' +
        '                <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
        '                    <span aria-hidden="true">&times;</span>\n' +
        '                </button>\n' +
        '            </div>\n' +
        '            <div class="modal-body">\n' +
        '                <iv class="container-fluid">\n' +
        '                    <div class="row">\n' +
            '                    <div class="col-12">\n' +
            '                        <div class="mx-5">' +
            '                           <h3 class="main-title ml-5 card-title"></h3>\n' +
            '                        </div>' +
            '                       <div id="modalCarousel" class="carousel slide carousel-fade card-background d-none" data-ride="carousel">\n' +
            '                            <ol class="carousel-indicators">\n' +
            '                            </ol>\n' +
            '                            <div class="carousel-inner" role="listbox">\n' +
            '                            </div>\n' +
            '                            <a class="carousel-control-prev" href="#modalCarousel" role="button" data-slide="prev">\n' +
            '                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>\n' +
            '                                <span class="sr-only">Previous</span>\n' +
            '                            </a>\n' +
            '                            <a class="carousel-control-next" href="#modalCarousel" role="button" data-slide="next">\n' +
            '                                <span class="carousel-control-next-icon" aria-hidden="true"></span>\n' +
            '                                <span class="sr-only">Next</span>\n' +
            '                            </a>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
        '                       </div>\n' +
        '                       <div class="row pt-5">\n' +
        '                    <div class="col-1"></div>\n' +
        '                    <div class="col-9">\n' +
        '                        <p class="main-text">\n' +
        '                        </p>\n' +
        '                    </div>\n' +
        '                    </div>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <div class="modal-footer">\n' +
        '                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>\n' +
        '            </div>\n' +
        '        </div>')
});

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

$(document).ready(function () {
    Object.keys(teaProjects).forEach(function(key) {
        if (teaProjects[key]['model'].length === 0) {
            var inum = getRandomInt(teaProjects[key]['images'].length);
            var imageH = teaProjects[key]['images'][inum];
            var image = ('<picture>' +
                '<source srcset="' + imageH + '.webp" type="image/webp" >' +
                '<source srcset="' + imageH + '" type="image/jpeg">' +
                '<img class="card-img-top" src="' + imageH + '" alt="' + teaProjects[key]['title'] + '" />' +
                '</picture>');
        } else {
            image = ('<model-viewer class="card-img-top" src="' + teaProjects[key]['model'] + '" alt="' + teaProjects[key]['title'] + '" auto-rotate\n' +
                '                              camera-controls interaction-prompt="none" interaction-policy="always-allow" ar></model-viewer>\n')
        }
        $('.owl-carousel').append('<!--OWL Card Item-->' +
            '       <div class="item card">\n' +
            '            <div class="card-background">\n' + image +
            '            </div>\n' +
            '            <div class="card-body">\n' +
            '                <h5 class="card-title">' + teaProjects[key]['title'] + '</h5>\n' +
            '                <p>' + truncate(teaProjects[key]['text'], 55) +
            '                ...</p>\n' +
            '                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="' + key + '">Read more</button>\n' +
            '            </div>\n' +
            '        </div>');
        console.log(key, teaProjects[key]);
    });
});

$(document).ready(function() {
    $('.owl-carousel').owlCarousel({
        items: 3,
        loop: true,
        center: false,
        mouseDrag: false,
        margin: 10,
        callbacks: true,
        URLhashListener: true,
        autoplay: false,
        startPosition: 'URLHash',
        touchDrag: false,
        responsiveClass:true,
        nav: true,
        navText: [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        navContainer: '.content .custom-nav',
        responsive:{
            0:{
                items:1,
                nav:true
            },
            600:{
                items:2,
                nav: true
            },
            1000:{
                items:3,
                nav: true
            }
        }
    });
})
