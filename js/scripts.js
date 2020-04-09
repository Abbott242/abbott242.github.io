var teaProjects = {
    drawer: {
        title: "Drawer",
        model: "models/drawer.glb",
        images: [],
        text: "An opportunity was created after an obsolete radio was removed from my father’s Mooney M20M plane. The now-empty slot in the avionics bay was a hazard for debris getting dropped inside, and would normally be covered up with a simple plate. However in order to put the space to good use, I had the idea to create a small drawer which could be used to store small objects. Snacks, pens, phones, and wallets would have a convenient place to go - within reach, but out of the way in the compact cockpit. The first issue to solve was heating. During operation, the avionics bay would heat tremendously, beyond the operating temperature of most normal 3D-printing filaments. Therefore, I decided to use a nylon alloy filament, PolyMaker’s “CoPa”. Though this added expense and complications during printing, the operating temperature of 180C was more than enough to take the heat during use.\n"
    },
    ironSights: {
        title: "Iron Sights",
        model: "models/si.glb",
        images: ["https://mdbootstrap.com/img/Photos/Slides/img%20(130).jpg", "https://mdbootstrap.com/img/Photos/Slides/img%20(129).jpg", "https://mdbootstrap.com/img/Photos/Slides/img%20(70).jpg"],
        text: "A member of my University's shooting club had a dilemma. He had a new rifle, but no scope to mount to it. As this particular model of rifle was not manufactured with iron sights included, it would be impossible to shoot until some sighting solution was found. I therefore decided to work with him to design and 3D-print a set of “iron” sights for the rifle, which would provide a stopgap solution until a scope was bought. After brainstorming design criteria and noting critical measurements, I created prototypes in SolidWorks to print and test. The project took around two months, as numerous attempts were made in order to meet the tight tolerances of the rifle and incorporate new ideas. \n" +
            "The final design is composed of three major sections, with a few smaller parts such as nuts and bolts making them up. All plastic components were printed using EcoTough PLA filament, which proved to be more than sufficient for the task. The appearance of the sights is styled after the WW-II era Type 99 Arisaka rifle (a personal preference), using a front blade combined with a swappable rear aperture/notch to aim. While the front sight is tightened to the sling swivel of the rifle and remains immovable, the rear sight is adjustable for both windage and elevation (horizontal and vertical motion). With a hex key, the sight can therefore be adjusted to properly zero the rifle and compensate for changes in distance to the target. \n" +
            "During a field test, the sights worked as intended, hitting targets up to to 100m away. While not as accurate as a scope, the sights serve their temporary purpose well. Most importantly, this project provided a fun application for 3D design, and a good opportunity to practice.\n"
    },
    monitorStand: {
        title: "Monitor Stand",
        model: "models/ms.glb",
        images: [],
        text: ""
    },
    opalNecklace: {
        title: "Opal Necklace",
        model: "models/on.glb",
        images: [],
        text: ""
    },
    tourniquet: {
        title: "Tourniquet",
        model: "",
        images: [],
        text: ""
    },
    faceShields: {
        title: "Face Shields",
        images: [],
        model: "",
        text: "The COVID-19 pandemic has been wreaking havoc on the world, particularly the healthcare system. Many essential medical devices are in short supply at the moment, and a large demand for replacements exists. While some items such as ventilators and masks require fairly complex facilities to produce, the flexible manufacturing provided by 3D printers can help to make simpler parts. Prusa Research designed a 3D-printable face shield which has seen somewhat widespread adoption when traditionally manufactured alternatives are no longer available. \n" +
            "\n" +
            "Therefore, when Inksmith LTD ran a donation drive in my area to collect parts for these face shields, I decided to try my hand at producing some. Using my Prusa MK3S and a Creality CR-10S 3D-printer over the course of a week, I spent most of my filament in constant printing. This was done using many different brands and plastics, including PLA, XT, and PETG. While each type required tweaking in order to optimize both print quality and speed, the result was enough parts for 60 functional face shields. Though certainly not ideal, once assembled and in the right hands they should provide a basic level of protection from the virus.\n"
    }
};

function truncate(str, no_words) {
    return str.split(" ").splice(0,no_words).join(" ");
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
                modal.find('.modal-body .carousel-indicators').prepend('<li data-target="#modalCarousel" data-slide-to="' + i + '" class="active"></li>')
                modal.find('.modal-body .carousel-inner').prepend('<div class="carousel-item active"> <img class="d-block w-100" src="' + project['images'][i] + '" alt="carousel image"/> </div>');
            } else {
                modal.find('.modal-body .carousel-indicators').prepend('<li data-target="#modalCarousel" data-slide-to="' + i + '"></li>')
                modal.find('.modal-body .carousel-inner').prepend('<div class="carousel-item"> <img class="d-block w-100" src="' + project['images'][i] + '" alt="carousel image" /> </div>');
            }
        }
    } if (project['model'] || !project['images'].length) {
        modal.find('.modal-body .col-5').append('<div class="card-background"><model-viewer class="card-img-top" src="'+ project['model'] + '" alt="' + project['title'] + '" auto-rotate camera-controls interaction-prompt="none"></model-viewer></div>')
    }
    modal.find('.modal-body .main-title').text(project['title']);
    modal.find('.modal-body .main-text').text(project['text'])
});

$("#exampleModal").on("hidden.bs.modal", function() {
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
        '                <div class="container-fluid">\n' +
        '                    <div class="row">\n' +
        '                    <div class="col-5">\n' +
        '                        <div id="modalCarousel" class="carousel slide carousel-fade" data-ride="carousel">\n' +
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
        '                    <div class="col-7">\n' +
        '                        <h3 class="main-title"></h3>\n' +
        '                        <p class="main-text">\n' +
        '                        </p>\n' +
        '                    </div>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <div class="modal-footer">\n' +
        '                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>\n' +
        '            </div>\n' +
        '        </div>')
});

$(document).ready(function() {
    var i;
    for (i in teaProjects) {
        $('.owl-carousel').append('<!--OWL Card Item-->' +
            '       <div class="item card">\n' +
            '            <div class="card-background">\n' +
            '                <model-viewer class="card-img-top" src="' + teaProjects[i]['model'] + '" alt="A Drawer" auto-rotate\n' +
            '                              camera-controls interaction-prompt="none"></model-viewer>\n' +
            '            </div>\n' +
            '            <div class="card-body">\n' +
            '                <h5 class="card-title">' + teaProjects[i]['title'] + '</h5>\n' +
            '                <p>' + truncate(teaProjects[i]['text'], 55)+
            '                ...</p>\n' +
            '                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="' + i + '">Read more</button>\n' +
            '            </div>\n' +
            '        </div>'
        )
    }
});
