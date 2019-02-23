$(document).ready(initializeApp);
//fix presentation on modal and app page
//add beginning explanation that can be reopened (modal?)
//add localStorage clear button
//card animations and sound for hit and miss

var first_card_clicked = null;
var first_card_flipped = null;
var second_card_clicked = null;
var second_card_flipped = null;
var total_possible_matches = 9;
var match_counter = 0;
var matches = 0;
var attempts = 0;
var accuracy = 0;
var caught = null;
var modal = $('.modal');
var games_played = null;
var collection = null;
var collectionArray = [];
var pokeArray = [
    'pictures/abra.png', 'pictures/aerodactyl.png', 'pictures/alakazam.png', 'pictures/arbok.png', 'pictures/arcanine.png', 'pictures/articuno.png', 
    'pictures/beedrill.png', 'pictures/bellsprout.png', 'pictures/blastoise.png', 'pictures/bulbasaur.png', 'pictures/butterfree.png', 
    'pictures/caterpie.png', 'pictures/chansey.png', 'pictures/charizard.png', 'pictures/charmander.png', 'pictures/charmeleon.png', 'pictures/clefable.png', 'pictures/clefairy.png', 'pictures/cloyster.png', 'pictures/cubone.png', 
    'pictures/dewgong.png', 'pictures/diglett.png', 'pictures/ditto.png', 'pictures/dodrio.png', 'pictures/doduo.png', 'pictures/dragonair.png', 'pictures/dragonite.png', 'pictures/dratini.png', 'pictures/drowzee.png', 'pictures/dugtrio.png', 
    'pictures/eevee.png', 'pictures/ekans.png', 'pictures/electabuzz.png', 'pictures/electrode.png', 'pictures/exeggcute.png', 'pictures/exeggutor.png', 
    'pictures/farfetchd.png', 'pictures/fearow.png', 'pictures/flareon.png', 
    'pictures/gastly.png', 'pictures/gengar.png', 'pictures/geodude.png', 'pictures/gloom.png', 'pictures/golbat.png', 'pictures/goldeen.png', 'pictures/golduck.png', 'pictures/golem.png', 'pictures/graveler.png', 'pictures/grimer.png', 'pictures/growlithe.png', 'pictures/gyarados.png', 
    'pictures/haunter.png', 'pictures/hitmonchan.png', 'pictures/hitmonlee.png', 'pictures/horsea.png', 'pictures/hypno.png', 
    'pictures/ivysaur.png', 
    'pictures/jigglypuff.png', 'pictures/jolteon.png', 'pictures/jynx.png', 
    'pictures/kabuto.png', 'pictures/kabutops.png', 'pictures/kadabra.png', 'pictures/kakuna.png', 'pictures/kangaskhan.png', 'pictures/kingler.png', 'pictures/koffing.png', 'pictures/krabby.png', 
    'pictures/lapras.png', 'pictures/lickitung.png', 
    'pictures/machamp.png', 'pictures/machoke.png', 'pictures/machop.png', 'pictures/magikarp.png', 'pictures/magmar.png', 'pictures/magnemite.png', 'pictures/magneton.png', 'pictures/mankey.png', 'pictures/marowak.png', 'pictures/meowth.png', 'pictures/metapod.png', 'pictures/mew.png', 'pictures/mewtwo.png', 'pictures/moltres.png', 'pictures/mrmime.png', 'pictures/muk.png', 
    'pictures/nidoking.png', 'pictures/nidoqueen.png', 'pictures/nidoran-f.png', 'pictures/nidoran-m.png', 'pictures/nidorina.png', 'pictures/nidorino.png', 'pictures/ninetales.png', 
    'pictures/oddish.png', 'pictures/omanyte.png', 'pictures/omastar.png', 'pictures/onix.png', 
    'pictures/paras.png', 'pictures/parasect.png', 'pictures/persian.png', 'pictures/pidgeot.png', 'pictures/pidgeotto.png', 'pictures/pidgey.png', 'pictures/pikachu.png', 'pictures/pinsir.png', 'pictures/poliwag.png', 'pictures/poliwhirl.png', 'pictures/poliwrath.png', 'pictures/ponyta.png', 'pictures/porygon.png', 'pictures/primeape.png', 'pictures/psyduck.png', 
    'pictures/raichu.png', 'pictures/rapidash.png', 'pictures/raticate.png', 'pictures/rattata.png', 'pictures/rhydon.png', 'pictures/rhyhorn.png', 
    'pictures/sandshrew.png', 'pictures/sandslash.png', 'pictures/scyther.png', 'pictures/seadra.png', 'pictures/seaking.png', 'pictures/seel.png', 'pictures/shellder.png', 'pictures/slowbro.png', 'pictures/slowpoke.png', 'pictures/snorlax.png', 'pictures/spearow.png', 'pictures/squirtle.png', 'pictures/starmie.png', 'pictures/staryu.png', 
    'pictures/tangela.png', 'pictures/tauros.png', 'pictures/tentacool.png', 'pictures/tentacruel.png', 
    'pictures/vaporeon.png', 'pictures/venomoth.png', 'pictures/venonat.png', 'pictures/venusaur.png', 'pictures/victreebel.png', 'pictures/vileplume.png', 'pictures/voltorb.png', 'pictures/vulpix.png', 
    'pictures/wartortle.png', 'pictures/weedle.png', 'pictures/weepinbell.png', 'pictures/weezing.png', 'pictures/wigglytuff.png', 
    'pictures/zapdos.png', 'pictures/zubat.png'
];

function initializeApp(){
    randomCard();
    searchLocalStorage();
    setCollection();
    $('.card').on('click', card_clicked);
    $('.reset').on('click', totalReset);
    $('.info').on('click', showCollection);
    $('.modal > .close').on('click', modalClose);
    $('#sortable').sortable();
}

function totalReset(){
    gameReset();
    goToBed();
    setTimeout(
        modalClose, 3000
        );
}

function searchLocalStorage(){
    if(!localStorage.games_played){
        localStorage.caught = 1;
        caught = JSON.parse(localStorage.caught);
        localStorage.games_played = 0;
        games_played = JSON.parse(localStorage.games_played);
        localStorage.collection = {};
        collection = localStorage.collection;
    }else{
        caught = localStorage.getItem('caught');

        games_played = localStorage.getItem('games_played');

        var collectionString = localStorage.getItem('collection'); //string of object
        var collectionParse = JSON.parse(collectionString); //return to object
        collection = Object.values(collectionParse); //assign array of pokemon to collection
        collectionArray = collection;
    }
}

function setCollection(){
    if(collectionArray[0]){
        for(i = 0; i < collection.length; i++){
            var addContainer = $('<div>').addClass('collection');
            var addImage = $('<img>').attr('src', collection[i]);//add alt later
            var newPokemon = addContainer.append(addImage);
            $('.stash').append(newPokemon);    
        }    
    }
}

function randomCard(){
    var valueArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
    while(valueArray.length > 0){
        var randomIndex = Math.floor(Math.random()*pokeArray.length);
        var firstCardVal = Math.floor(Math.random()*valueArray.length);
        var firstCard = $('img[data-value="' + String(valueArray[firstCardVal]) + '"]');
        firstCard.attr('src', pokeArray[randomIndex]);
        valueArray.splice(firstCardVal, 1);
        var secondCardVal = Math.floor(Math.random()*valueArray.length);
        var secondCard = $('img[data-value="' + String(valueArray[secondCardVal]) + '"]');
        secondCard.attr('src', pokeArray[randomIndex]);
        valueArray.splice(secondCardVal, 1);
    }
}

function card_clicked(){
    $(this).find('.back').css('display', 'none');
    if(first_card_clicked === null){
        first_card_clicked = $(this).find('.front img').attr('src');
        first_card_flipped = $(this).find('.back');
        if(first_card_flipped.css('display') === 'none'){
            $(this).off('click', card_clicked);//turn off click handler on first card WORKS
        }
    }else{
        second_card_clicked = $(this).find('.front img').attr('src');
        var second_card_flipped = $(this).find('.back');
        attempts++;
        $('.card').off('click', card_clicked);// turn off all click handlers
        if(first_card_clicked === second_card_clicked){
            storePokemon();
            collectionArray.push(second_card_clicked); //push new pokemon into an array
            collection = Object.assign({}, collectionArray); //convert array into object
            localStorage.setItem('collection', JSON.stringify(collection)); //set string of object {1:pika} as localStorage.collection
            matches++;
            match_counter++;
            caught++;
            localStorage.setItem('caught', JSON.stringify(caught));
            first_card_clicked = null;
            second_card_clicked = null;
            playerAccuracy();
            display_stats();
            setTimeout(addHandlersAgain(), 500);
            if(match_counter === total_possible_matches){
                localStorage.setItem('games_played', JSON.stringify(games_played));
                setTimeout(function(){
                    totalReset();
                    addHandlersAgain();
                }, 500);
                return console.log('One step closer to being a pokemon master!');
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
                addHandlersAgain();
                return;
            }, 500);
        }
    }
}

function addHandlersAgain(){
    for(cardPosition = 1; cardPosition <= 18; cardPosition++){
        var parentCard = $('img[data-value="' + cardPosition + '"]').parent();
        var siblingCard = parentCard.next();
        var grandparentCard = parentCard.parent();
        if(siblingCard.css('display') === 'block'){
            $(grandparentCard).on('click', card_clicked);//turn off click handler on first card WORKS
        }            
    }
}

function gameReset(){
    match_counter = 0;
    games_played++;
    localStorage.setItem('games_played', JSON.stringify(games_played));
    reset_stats();
    display_stats();
    randomCard();
    $('.back').css('display', '');
}

function playerAccuracy(){
    accuracy = matches/attempts;
}

function display_stats(){
    $('.games-played > .value').text(games_played);
    $('.caught > .value').text(caught);
    $('.accuracy > .value').text(Math.round(accuracy*100) + '%'); 
}

function reset_stats(){
    accuracy = 0;
    matches = 0;
    attempts = 0;
    display_stats();
}

function storePokemon(){
    var addContainer = $('<div>').addClass('collection');
    var addImage = $('<img>').attr('src', second_card_clicked);//add alt later
    var newPokemon = addContainer.append(addImage);

    $('.modal-content').append(newPokemon);
}

function showCollection(){
    $('#pokedex').css('display', 'block');
}

function modalClose(){
    $('.modal').css('display', 'none');
}

function goToBed(){
    var modalContent = $('#sleep > div');
    modalContent.addClass('flute');
    $('#sleep').css('display', 'block');
    setTimeout(function(){
        modalContent.removeClass('flute');
    }, 3000)
}

