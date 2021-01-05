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


let page = new Page("Hell0 i am page")
page.sayHi()    