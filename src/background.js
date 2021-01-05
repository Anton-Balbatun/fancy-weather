export class Background {

    currentBgNumber = 0

    constructor(backgroundImageList) {
        this.backgroundImageList = backgroundImageList;
      }
    

      changeBackgroundImg() {

        let defaultPageDomSelector = document.querySelector('.defaultPage')

        let pageArray = this.backgroundImageList
    
        if (this.currentBgNumber < pageArray.length - 1) {
            defaultPageDomSelector.style.backgroundImage = pageArray[this.currentBgNumber + 1]
            this.currentBgNumber++
        } else {
            defaultPageDomSelector.style.backgroundImage = pageArray[0]
            this.currentBgNumber = 0
        }
    
    }

}

let background = new Background(['url(assets/Background1.jpg)','url(assets/Background2.jpg)','url(assets/Background3.jpg'])
document.querySelector('.switchBackground').addEventListener('click', background.changeBackgroundImg.bind(background))






