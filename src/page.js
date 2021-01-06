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

let page = new Page("Hell0 i am page")
page.sayHi()    