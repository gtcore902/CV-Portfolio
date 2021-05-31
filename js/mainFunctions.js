// ANIMATIONS FORM
$(function () {
    $('input, textarea').on('input focus', function () {
      $(this).prev('label').animate({'bottom': '100%'}, 200);
    })
    $('input, textarea').on('blur', function () {
      if ($(this).val() === "") {
        $(this).prev('label').animate({'bottom': '17px'}, 200);
      }
    })
})

// Manage from
$(function () {
    // Nom
      $('#nom').on('blur input', function () {
        if ($('#nom').val().length >= 50) {
          $('#helpNom').text('50 caractères max').hide().show();
        } else {
          $('#helpNom').slideUp(400);
        }
      })
      // Adresse mail
      $('#email').on('blur input', function () {
        let regexMail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
        let mailEntry = $('input#email').val();
        if (!mailEntry.match(regexMail) && ($('input#email').val() != "")) {
          $('#helpMail').text('Adresse email incorrect').hide().show();
        } else {
          $('#helpMail').slideUp(400);
        }
      })
      // Téléphone
        $('#telephone').on('blur input', function () {
            let regexTelephone = /[0]{1}[1-7]{1}[0-9]{8}/;
            let telEntry = String(document.getElementById('telephone').value);
            for (var i = 0; i < telEntry.length; i++) {
              telEntry = telEntry.replace(" ", "");
            }
            if (!telEntry.match(regexTelephone) && ($('#telephone').val() != "")) {
                $('#helpTel').text('Numéro de téléphone incorrect').hide().show();
            } else {
                $('#helpTel').slideUp(400);
            }
        })
      // Message
        $('#message').on('blur input', function () {
          if ($('#message').val().length >= 3000) {
            $('#helpMessage').text('Votre message ne doit pas dépasser 3000 caractères').hide().slideDown(400);
          } else {
            $('#helpMessage').slideUp(400);
          }
        })
    // Anti robot
        $('#checkRobot').on('blur input', function () {
            if ($('#checkRobot').val() != 7) {
              $('#helpRobot').text('Résultat incorrect - Saisissez le chiffre 7').hide().show();
            } else {
              $('#helpRobot').slideUp(400);
            }
        })
  })
// Send form
$(function () {
      $('form').on('submit', function (e) {
          e.preventDefault();
          let nom = $('#nom').val();
          let email = $('#email').val();
          let telephone = $('#telephone').val();
          let message = $('#message').val();
          let checkRobot = $('#checkRobot').val();
          if ($('#checkRobot').val() == 7) {
              $.post('../data/sendFormV1.php',
                      {nom: nom,
                        email: email,
                        telephone: telephone,
                        message: message,
                        checkRobot: checkRobot },
                        function(data, textStatus, xhr) {
                            $('form').fadeOut(400, function() {
                                $('#retourFormulaire').css({"padding": "10px",
                                                            "margin-top": "160px",
                                                            "margin-left": "auto",
                                                            "margin-right": "auto",
                                                            "color": "#F46C2B",
                                                            "font-size": "2.5rem",
                                                            "text-align": "center"});
                                window.location.href = "#contact";
                                $('#retourFormulaire').html(data);
                            });
                            $('#nom').val('');
                            $('#email').val('');
                            $('#telephone').val('');
                            $('#message').val('');
                            $('#checkRobot').val('');
                          });
                    }
      })
})

// Manage menu mobile
$(function () {
  $('.wrapMenu').on('click', function() {
    $('.menuMobile').toggleClass('active');
    $('.navBloc').toggleClass('navBlocAnimate');
  });

  $('.navLink').on('click', function() {
    $('.menuMobile').toggleClass('active');
    $('.navBloc').toggleClass('navBlocAnimate');
  });
})
// Animation submit btn
$(function () {
  $('input[type="submit"], .sendArrow').hover(function() {
    $('.sendArrow').toggleClass('sendArrowAnimation');
  }, function() {
    $('.sendArrow').toggleClass('sendArrowAnimation');
  });
});

// Manage location
$(function () {
    $('.flickr').on('click', () => window.location.href = "https://www.flickr.com/photos/186142483@N06/");
    $('.github').on('click', () => window.location.href = "https://github.com/gtcore902");
    $('button[name="hire"]').on('click', () => document.getElementById('Contact').scrollIntoView());
})

// Manage upArrow
$(function () {
    let ecran = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      $(window).on('scroll', function () {
        let scrollNow = $(window).scrollTop();
        $(window).on('scroll', function functionName() {
          if (scrollNow > 600 && scrollNow > $(window).scrollTop()) {
            if ($('#upArrow').is(":hidden")) {
              $('#upArrow').show();
            }
          } else {
            $('#upArrow').hide();
          }
        })
        $('#upArrow').on('click', function () {
            $(window).scrollTop(0);
        })
      })
})
// Manage horizontal bar
$(function () {
    $(document).on('scroll', function () {
        const max = document.body.scrollHeight - window.innerHeight;
        let positionScroll = window.pageYOffset;
        let percent = positionScroll / max * 100 ;
        $('.horizontalBar').css({'width' : percent + "%"});
    })
})

//Lazyload
$(function () {
    lazyload();
})

// Scroll into view
window.addEventListener('load', () => {
  let navigationLink = document.querySelectorAll('.navLink');
  for (var element of navigationLink) {
    element.addEventListener('click', function(e) {
      e.preventDefault();
      let destination = document.getElementById(e.target.innerHTML);
      destination.scrollIntoView();
    });
  }
});


// write dates of exp
window.addEventListener('load', () => {
  let businessDateSince = 2006;
  let webDateSince = 2020;
  let dateNow = new Date().getFullYear();
  document.querySelector('.dateExpBusiness').textContent = dateNow - businessDateSince;
  document.querySelector('.dateExpWeb').textContent = dateNow - webDateSince;
});
