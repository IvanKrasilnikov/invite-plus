"use strict";

$(function() {
  $('.modal-add-fan__choise-page').change(function() {
    if ($(this).filter('select').length) {
      var choisePageVal = $(this).val();

      $.getJSON('../add-fan.json', {fanPageAddId: choisePageVal})
        .success(function(json) {

        $('.modal-add-fan__categories-choise').empty();

        json.categories.forEach(function(el, index) {
          var addEl;
          var addSubEl;
          var startAddEl;

          if (el.subCategories) {
            startAddEl =
              '<li>' +
                '<div class="' +
                  'modal-add-fan__categories-choise-first collapsible-header"' +
                  'data-id="' +
                  el.id +
                  '">' +
                    el.name +
                '</div>' +
                '<div class="modal-add-fan__categories-choise-button btn waves-effect waves-light">Выбрать' +
                '</div>' +
                '<div class="collapsible-body">' +
                  '<ul>';

            el.subCategories.forEach(function(el, index) {
              addSubEl =
                '<li>' +
                  '<div class="modal-add-fan__categories-choise-second"' +
                  'data-id="' +
                  el.id +
                  '">' +
                    el.name +
                  '</div>' +
                  '<div class="modal-add-fan__categories-choise-button btn waves-effect waves-light">Выбрать' +
                  '</div>' +
                '</li>';

              startAddEl = startAddEl + addSubEl;
            });

            addEl = startAddEl +
                  '</ul>' +
                '</div>' +
              '</li>';

          } else {
            addEl =
              '<li>' +
                '<div class="' +
                  'modal-add-fan__categories-choise-first ' +
                  'modal-add-fan__categories-choise-first_alone collapsible-header"' +
                  'data-id="' +
                  el.id +
                  '">' +
                    el.name +
                '</div>' +
                '<div class="modal-add-fan__categories-choise-button btn waves-effect waves-light">Выбрать' +
                '</div>' +
              '</li>';
          }

          $('.modal-add-fan__categories-choise').append(addEl);

        });

        $('.modal-add-fan__input-categories').attr('value', '');
        $('.modal-add-fan__input-categories-id').attr('value', '');
        $('.modal-add-fan__submit').addClass('disabled');

        $('.modal-add-fan__categories').show();
        $('.modal-add-fan').css('overflow-y', 'auto');
      })
    }
  });

  $('.modal-add-fan__categories-choise').on(
    'click',
    '.modal-add-fan__categories-choise-button',
    function() {
    var choiseId = $(this).prev().data('id');
    var choiseName = $(this).prev().text();

    $('.modal-add-fan__input-categories').attr('value', choiseName);
    $('.modal-add-fan__input-categories-id').attr('value', choiseId);
    $('.modal-add-fan__submit').removeClass('disabled');
  });
});
