$(document).ready(initializeApp);

var first_card_clicked = null;
var first_card_flipped = null;
var second_card_clicked = null;
var second_card_flipped = null;
var total_possible_matches = 9;
var match_counter = 0;
var matches = 0;
var attempts = 0;
var accuracy = 0;
var games_played = 0;
var pokeArray = ['pictures/abra.png', 'pictures/aerodactyl.png', 'pictures/alakazam.png', 'pictures/arbok.png', 'pictures/arcanine.png', 'pictures/articuno.png', 'pictures/beedrill.png', 'pictures/bellsprout.png', 'pictures/blastoise.png', 'pictures/bulbasaur.png', 'pictures/butterfree.png', 'pictures/caterpie.png', 'pictures/chansey.png', 'pictures/charizard.png', 'pictures/charmander.png', 'pictures/charmeleon.png', 'pictures/clefable.png', 'pictures/clefairy.png', 'pictures/cloyster.png', 'pictures/cubone.png'];

function initializeApp(){
    randomCard();
    $('.card').on('click', card_clicked);
    $('.reset').on('click', gameReset);
}

function randomCard(){
    //debugger;
    for(var i = 1; i <= 1000; i++){//need to change to while loop: while src is !src; weird cases of singles
        var randomIndex = Math.floor(Math.random()*19);
        var firstCardVal = Math.ceil(Math.random()*18);
        var secondCardVal = Math.ceil(Math.random()*18);
        var firstCard = $('img[data-value="' + String(firstCardVal) + '"]');
        var secondCard = $('img[data-value="' + String(secondCardVal) + '"]');
        while(!firstCard.attr('src') && !secondCard.attr('src')){
            firstCard.attr('src', pokeArray[randomIndex]);
            secondCard.attr('src', pokeArray[randomIndex]);
        }
    }
}

function card_clicked(){
    $(this).find('.back').css('display', 'none');
    //debugger;
    if(first_card_clicked === null){
        first_card_clicked = $(this).find('.front img').attr('src');
        first_card_flipped = $(this).find('.back');
    }else{
        second_card_clicked = $(this).find('.front img').attr('src');
        var second_card_flipped = $(this).find('.back');
        attempts++;
        if(first_card_clicked === second_card_clicked){
            matches++;
            match_counter++;
            first_card_clicked = null;
            second_card_clicked = null;
            playerAccuracy();
            display_stats();
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
                playerAccuracy();
                display_stats();
                return;
            }, 2000);//need to stop click inputs while timeout
        }
    }
}

function gameReset(){
    games_played++;
    reset_stats();
    display_stats();
    $('.back').css('display', '');
}

function playerAccuracy(){
    accuracy = matches/attempts;
}

function display_stats(){
    $('.games-played > .value').text(games_played);
    $('.attempts > .value').text(attempts);
    $('.accuracy > .value').text(accuracy*100 + '%'); 
}

function reset_stats(){
    accuracy = 0;
    matches = 0;
    attempts = 0;
    display_stats();
}