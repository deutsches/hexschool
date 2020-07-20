$(document).ready(function () {
    // $('#myModal').modal();

    $('#carouselExampleCaptions').carousel();
    $(window).scroll(function () {

        if ($(document).scrollTop() > 50) {

            $('body nav:nth-child(1)').addClass('affix');

            //console.log("OK");

        } 
        else {

            $('body nav:nth-child(1)').removeClass('affix');

        }

    });
    var test = document.querySelector('.mobileMenu');
    test.addEventListener('click',displayMobileMenu);

    function displayMobileMenu(){
        document.querySelector('.menuList').classList.toggle("menuListshow");
        
    }

});