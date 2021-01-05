export class Location {

    constructor(name) {
        this.name = name;
      }
    
      sayHi() {
        console.log(this.name);
      }

}

let location = new Location("Hell0 i am Loc")
location.sayHi()