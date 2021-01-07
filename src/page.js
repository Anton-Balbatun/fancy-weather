import {Background} from "./background.js";
import {Location} from "./location.js";
import {Weather} from "./weather.js";



class Page {

    constructor(name) {
        this.name = name;
      }
    
      sayHi() {
        console.log(this.name);
      }


}

let background = new Background(['url(assets/Background1.jpg)','url(assets/Background2.jpg)','url(assets/Background3.jpg'])
document.querySelector('.switchBackground').addEventListener('click', background.changeBackgroundImg.bind(background))

let location = new Location()

location.getCurrentPosition()

window.onclick = function (event) {


    if (event.target.classList.contains("citySearch")) {
        document.querySelector('#autocomplete-results').style.display = 'block'
    } else {
        document.querySelector('#autocomplete-results').style.display = 'none'
    }

}

document.querySelector('.citySearch')
    .addEventListener('keyup', (event) => {

        let isListContainBlack = false
        document.querySelectorAll('#autocomplete-results li').forEach(e => {

            if (e.classList.contains('autocomplete-active')) {
                isListContainBlack = true
            }
        })

        if (event.key === "Enter" && isListContainBlack) {
            document.querySelector('.citySearch').value = document.querySelector('.autocomplete-active').textContent
            location.getPosition().bind(location)
            document.querySelector('#autocomplete-results').style.display = 'none'
            document.querySelector('.citySearch').blur()
        } else if (event.key === "Enter") {
            location.getPosition().bind(location)
        }

    })



document.querySelector('.searchButton').addEventListener('click', location.getPosition.bind(location))

document.querySelector('#countrySearch').addEventListener('keyup', location.autocomplete.bind(location))

document.querySelector('.citySearch').addEventListener('keydown', location.suggestArrowSwitcher)
