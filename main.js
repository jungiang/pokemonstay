$(document).ready(initializeApp);

var first_card_clicked = null;
var first_card_flipped = null;
var second_card_clicked = null;
var second_card_flipped = null;
var total_possible_matches = 2;//change this when using all cards
var match_counter = 0;

function initializeApp(){
    $('.card').on('click', card_clicked)
}

function card_clicked(){
    $(this).find('.back').css('display', 'none');
    if(first_card_clicked === null){
        first_card_clicked = $(this).find('.front img').attr('src');
        first_card_flipped = $(this).find('.back');
        return first_card_clicked, first_card_flipped;
    }else{
        second_card_clicked = $(this).find('.front img').attr('src');
        var second_card_flipped = $(this).find('.back');
        if(first_card_clicked === second_card_clicked){
            match_counter++;
            first_card_clicked = null;
            second_card_clicked = null;
            if(match_counter === total_possible_matches){
                return console.log('You won!');
            }else{
                return;
            }
        }else{
            setTimeout(function(){
                first_card_flipped.css('display', '');
                second_card_flipped.css('display', '');
                first_card_clicked = null;
                second_card_clicked = null;
                return;
            }, 2000);
        }
    }
}