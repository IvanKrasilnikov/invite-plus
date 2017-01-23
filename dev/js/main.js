"use strict";

$(function() {

  if ($('.block-main__panel-column-name').length) {
    $('.block-main__panel-column-name').dotdotdot({
      wrap: 'letter',
      watch: true,
      height: 90
    });
  }

  $('.item-workers__buy-account, ' +
    '.item-fan__add-page-button, ' +
    '.item-important__add-page-button').tooltip({
    delay: 200,
    position: 'bottom'
  });

  $('.modal').modal({
    ready: function() {
      $('.carousel').carousel();
      $('.modal-pricing .modal-content').css('opacity', 1);
    },
    complete: function() {
      $('.modal-pricing .modal-content').css('opacity', 0);
    }
  });

  $('.carousel').carousel();

  $('select').material_select();

});
