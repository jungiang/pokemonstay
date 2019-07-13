$(document).ready(initializeApp);

var first_card_clicked = null;
var first_card_flipped = null;
var first_card_shake = null;
var first_card_caught = null;
var second_card_clicked = null;
var second_card_flipped = null;
var second_card_shake = null;
var second_card_caught = null;
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
var newVolume = 1.0;
var backgroundMusic = new Audio('sound/background.mp3');
backgroundMusic.loop = false;
var jigglySong = new Audio('sound/jigglysleep.mp3');
var flee = new Audio('sound/fail.mp3');
var catch1 = new Audio('sound/catch1.mp3');
var catch2 = new Audio('sound/catch2.mp3');
var catch3 = new Audio('sound/catch3.mp3');
var catch4 = new Audio('sound/catch4.mp3');
var catch5 = new Audio('sound/catch5.mp3');
var throw_pokeball = new Audio('sound/throw.mp3');
var game_start = new Audio('sound/game_start.mp3');
var audioArray = [game_start, backgroundMusic, jigglySong, flee, catch1, catch2, catch3, catch4, catch5, throw_pokeball];
game_start.muted = false;
var moveStart = null;
var moveStop = null;
var slideIndex = 1;
var pokeArray = [
    'pokemon/abra.png', 'pokemon/aerodactyl.png', 'pokemon/alakazam.png', 'pokemon/arbok.png', 'pokemon/arcanine.png', 'pokemon/articuno.png', 
    'pokemon/beedrill.png', 'pokemon/bellsprout.png', 'pokemon/blastoise.png', 'pokemon/bulbasaur.png', 'pokemon/butterfree.png', 
    'pokemon/caterpie.png', 'pokemon/chansey.png', 'pokemon/charizard.png', 'pokemon/charmander.png', 'pokemon/charmeleon.png', 'pokemon/clefable.png', 'pokemon/clefairy.png', 'pokemon/cloyster.png', 'pokemon/cubone.png', 
    'pokemon/dewgong.png', 'pokemon/diglett.png', 'pokemon/ditto.png', 'pokemon/dodrio.png', 'pokemon/doduo.png', 'pokemon/dragonair.png', 'pokemon/dragonite.png', 'pokemon/dratini.png', 'pokemon/drowzee.png', 'pokemon/dugtrio.png', 
    'pokemon/eevee.png', 'pokemon/ekans.png', 'pokemon/electabuzz.png', 'pokemon/electrode.png', 'pokemon/exeggcute.png', 'pokemon/exeggutor.png', 
    'pokemon/farfetchd.png', 'pokemon/fearow.png', 'pokemon/flareon.png', 
    'pokemon/gastly.png', 'pokemon/gengar.png', 'pokemon/geodude.png', 'pokemon/gloom.png', 'pokemon/golbat.png', 'pokemon/goldeen.png', 'pokemon/golduck.png', 'pokemon/golem.png', 'pokemon/graveler.png', 'pokemon/grimer.png', 'pokemon/growlithe.png', 'pokemon/gyarados.png', 
    'pokemon/haunter.png', 'pokemon/hitmonchan.png', 'pokemon/hitmonlee.png', 'pokemon/horsea.png', 'pokemon/hypno.png', 
    'pokemon/ivysaur.png', 
    'pokemon/jigglypuff.png', 'pokemon/jolteon.png', 'pokemon/jynx.png', 
    'pokemon/kabuto.png', 'pokemon/kabutops.png', 'pokemon/kadabra.png', 'pokemon/kakuna.png', 'pokemon/kangaskhan.png', 'pokemon/kingler.png', 'pokemon/koffing.png', 'pokemon/krabby.png', 
    'pokemon/lapras.png', 'pokemon/lickitung.png', 
    'pokemon/machamp.png', 'pokemon/machoke.png', 'pokemon/machop.png', 'pokemon/magikarp.png', 'pokemon/magmar.png', 'pokemon/magnemite.png', 'pokemon/magneton.png', 'pokemon/mankey.png', 'pokemon/marowak.png', 'pokemon/meowth.png', 'pokemon/metapod.png', 'pokemon/mew.png', 'pokemon/mewtwo.png', 'pokemon/moltres.png', 'pokemon/mrmime.png', 'pokemon/muk.png', 
    'pokemon/nidoking.png', 'pokemon/nidoqueen.png', 'pokemon/nidoran-f.png', 'pokemon/nidoran-m.png', 'pokemon/nidorina.png', 'pokemon/nidorino.png', 'pokemon/ninetales.png', 
    'pokemon/oddish.png', 'pokemon/omanyte.png', 'pokemon/omastar.png', 'pokemon/onix.png', 
    'pokemon/paras.png', 'pokemon/parasect.png', 'pokemon/persian.png', 'pokemon/pidgeot.png', 'pokemon/pidgeotto.png', 'pokemon/pidgey.png', 'pokemon/pikachu.png', 'pokemon/pinsir.png', 'pokemon/poliwag.png', 'pokemon/poliwhirl.png', 'pokemon/poliwrath.png', 'pokemon/ponyta.png', 'pokemon/porygon.png', 'pokemon/primeape.png', 'pokemon/psyduck.png', 
    'pokemon/raichu.png', 'pokemon/rapidash.png', 'pokemon/raticate.png', 'pokemon/rattata.png', 'pokemon/rhydon.png', 'pokemon/rhyhorn.png', 
    'pokemon/sandshrew.png', 'pokemon/sandslash.png', 'pokemon/scyther.png', 'pokemon/seadra.png', 'pokemon/seaking.png', 'pokemon/seel.png', 'pokemon/shellder.png', 'pokemon/slowbro.png', 'pokemon/slowpoke.png', 'pokemon/snorlax.png', 'pokemon/spearow.png', 'pokemon/squirtle.png', 'pokemon/starmie.png', 'pokemon/staryu.png', 
    'pokemon/tangela.png', 'pokemon/tauros.png', 'pokemon/tentacool.png', 'pokemon/tentacruel.png', 
    'pokemon/vaporeon.png', 'pokemon/venomoth.png', 'pokemon/venonat.png', 'pokemon/venusaur.png', 'pokemon/victreebel.png', 'pokemon/vileplume.png', 'pokemon/voltorb.png', 'pokemon/vulpix.png', 
    'pokemon/wartortle.png', 'pokemon/weedle.png', 'pokemon/weepinbell.png', 'pokemon/weezing.png', 'pokemon/wigglytuff.png', 
    'pokemon/zapdos.png', 'pokemon/zubat.png'
];

function initializeApp(){
    checkWindowSize();
    showSlides(slideIndex);
    randomCard();
    searchLocalStorage();
    setCollection();
    display_stats();
    game_start.volume = 0.5;
    toggleSound();
    $('#sortable').sortable({
        start: function(event, ui){
            moveStart = ui.item.index();
        },
        stop: function(event, ui){
            moveStop = ui.item.index();
            var movingPokemon = collectionArray.splice(moveStart, 1);
            collectionArray.splice(moveStop, 0, movingPokemon[0]);
            pokemonIndex();
        }
    });
    $('.mute').on('click', intro);
    $('.play').on('click', playBackground);
    $('.reset').on('click', resetDay);
    $('.info').on('click', showCollection);
    $('.menu').on('click', playGame);
    $('.close').on('click', modalClose);
    $('.reborn').on('click', totalReset);
    $('.yesRestart').on('click', yesRestart);
    $('.noRestart').on('click', noRestart);
    $(window).on('click', modalShadow);

    $(window).resize(()=>{
        checkWindowSize();
    })
}

function checkWindowSize(){
    if($(window).width() < 992 || $(window).height() < 568){
        $('.content').hide();
        $('.broken-screen').show();
    }else{
        $('.content').show();
        $('.broken-screen').hide();
    }
}

function intro(){
    $('.fas').toggleClass('fa-volume-up').toggleClass('fa-volume-mute')
    toggleSound();
    game_start.play();
}

function toggleSound(){
    if(game_start.muted === true){
        for(i = 0; i < audioArray.length; i++){
            audioArray[i].muted = false;
        }
    }else{
        for(i = 0; i < audioArray.length; i++){
            audioArray[i].muted = true;
        }
    }
}

function playBackground(){
    game_start.volume = 0;
    game_start.pause();
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.15;
    backgroundMusic.play();
}

function pokemonCaught(){
    throw_pokeball.play();
    setTimeout(function(){
        catch1.play();
    }, 750);
    setTimeout(function(){
        catch2.play();
    }, 1250);
    setTimeout(function(){
        catch3.play();
    }, 1750);
    setTimeout(function(){
        catch4.play();
    }, 2250);
    setTimeout(function(){
        catch5.play();
    }, 2750);
}

function resetDay(){
    backgroundMusic.volume = 0;
    jigglySong.play();
    var morning = setInterval(function(){
        jigglyFade();
    }, 495);
    $('.card').off('click', card_clicked);
    gameReset();
    goToBed();
    setTimeout(function(){
        clearInterval(morning);
        modalClose(),
        $('.front img').show();
        backgroundMusic.volume = 0.15;
        newVolume = 1.0;
        jigglySong.volume = newVolume;
        catch1.volume = 1;
        catch2.volume = 1;
        catch3.volume = 1;
        catch4.volume = 1;
        catch5.volume = 1;
    }, 2975);
}

function jigglyFade(){
    newVolume-=0.15;
    jigglySong.volume = newVolume;    
}

function totalReset(){
    $('#restart').show();
}

function yesRestart(){
    var goodbye = $('<p>').addClass('goodbye').text('Good luck on your next journey!');
    $('#restart>.modal-content').append(goodbye);
    localStorage.clear();
    setTimeout(function(){
        location.reload();
    }, 1500);
}

function noRestart(){
    $('#restart').hide();
}

function modalShadow(e){
    var modal = $('#restart');
    if(e.target === modal[0]){
        modal.hide();
    }
}

function searchLocalStorage(){
    if(!localStorage.games_played || !localStorage.collection || !localStorage.caught){
        localStorage.caught = 1;
        caught = JSON.parse(localStorage.caught);
        localStorage.games_played = 0;
        games_played = JSON.parse(localStorage.games_played);
        localStorage.collection = '{"0":"pokemon/pikachu.png"}';
        var collectionParse = JSON.parse(localStorage.collection);
        collection = Object.values(collectionParse);
        collectionArray = collection;
    }else{
        caught = localStorage.getItem('caught');

        games_played = localStorage.getItem('games_played');

        var collectionString = localStorage.getItem('collection'); 
        var collectionParse = JSON.parse(collectionString); 
        collection = Object.values(collectionParse); 
        collectionArray = collection;
    }
}

function setCollection(){
    if(collectionArray[0]){
        for(i = 0; i < collection.length; i++){
            var addContainer = $('<div>').addClass('collection');
            var addImage = $('<img>').attr('src', collection[i]);
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
    $('.card').on('click', card_clicked);
}

function card_clicked(){
    $(this).find('.back').css('display', 'none');
    if(first_card_clicked === null){
        first_card_clicked = $(this).find('.front img').attr('src');
        first_card_flipped = $(this).find('.back');
        first_card_shake = $(this);
        first_card_caught = $(this).find('.front img');
        if(first_card_flipped.css('display') === 'none'){
            $(this).off('click', card_clicked);
        }
    }else{
        second_card_clicked = $(this).find('.front img').attr('src');
        var second_card_flipped = $(this).find('.back');
        second_card_shake = $(this);
        second_card_caught = $(this).find('.front img');
        attempts++;
        $('.card').off('click', card_clicked);
        if(first_card_clicked === second_card_clicked){
            pokemonCaught();
            storePokemon();
            pokemonIndex();
            matches++;
            match_counter++;
            caught++;
            localStorage.setItem('caught', JSON.stringify(caught));
            setTimeout(function(){
                first_card_caught.attr('src', 'pictures/catch.gif');
                second_card_caught.attr('src', 'pictures/catch.gif');
            }, 750);
            setTimeout(function(){
                first_card_caught.hide();
                second_card_caught.hide();
            }, 2750);
            first_card_clicked = null;
            second_card_clicked = null;
            playerAccuracy();
            display_stats();
            setTimeout(function(){
                addHandlersAgain();
            }, 3000);
            if(match_counter === total_possible_matches){
                localStorage.setItem('games_played', JSON.stringify(games_played));
                setTimeout(function(){
                    resetDay();
                }, 3500);
            }
        }else{
            first_card_shake.effect('shake', {times: 4}, 550);
            second_card_shake.effect('shake',  {times: 4}, 550);
            flee.play();
            setTimeout(function(){
                first_card_flipped.css('display', '');
                second_card_flipped.css('display', '');
                first_card_clicked = null;
                second_card_clicked = null;
                playerAccuracy();
                display_stats();
                addHandlersAgain();
                return;
            }, 1000);
        }
    }
}

function addHandlersAgain(){
    for(cardPosition = 1; cardPosition <= 18; cardPosition++){
        var parentCard = $('img[data-value="' + cardPosition + '"]').parent();
        var siblingCard = parentCard.next();
        var grandparentCard = parentCard.parent();
        if(siblingCard.css('display') === 'block'){
            $(grandparentCard).on('click', card_clicked);
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
    var addImage = $('<img>').attr('src', second_card_clicked);
    var newPokemon = addContainer.append(addImage);

    $('.stash').append(newPokemon);

    collectionArray.push(second_card_clicked);
}

function pokemonIndex(){
    collection = Object.assign({}, collectionArray);
    localStorage.setItem('collection', JSON.stringify(collection));
}

function showCollection(){
    $('#pokedex').css('display', 'block');
}

function showMenu(){
    $('#instructions').css('display', 'block');
}

function playGame(){
    var playButton = $('.menu');
    if(playButton.text() === 'Play'){
        playButton.text('?');
        playButton.toggleClass('play')
    }else{
        playButton.text('Play');
        playButton.toggleClass('play')
    }
    var pokedex = $('#pokedex');
    if(pokedex.css('display') === 'block'){
        pokedex.hide();
    }
    $('#instructions').toggle();
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

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("slides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1} 
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none"; 
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block"; 
  dots[slideIndex-1].className += " active";
}