class App{
  render(){
    var self = this;
    var enclosuresNode = document.getElementById("enclosures");
    while (enclosuresNode.firstChild) {
        enclosuresNode.removeChild(enclosuresNode.firstChild);
    }
    enclosures.forEach(function(enclosure, encIndex){
      var enclosureList = document.getElementById('enclosures');
      var enclosureItem = document.createElement("LI");

      var enclosureName = document.createElement("H2");
      var enclosureNameText = document.createTextNode(enclosure.getName());
      enclosureName.appendChild(enclosureNameText);
      enclosureItem.appendChild(enclosureName);

      var newAnimalDiv = document.createElement("DIV");
      newAnimalDiv.className = 'my-inputs inputs-li';
      var inputAnimal = document.createElement("INPUT");
      inputAnimal.type = 'text';
      inputAnimal.className = 'input-enclosure-animal';
      inputAnimal.placeholder = 'Wpisz imie np. Cezary';
      newAnimalDiv.appendChild(inputAnimal);
      var selectType = document.createElement("SELECT");
      var typeOne = document.createElement("OPTION");
      typeOne.value = 'Krokodyl nilowy';
      typeOne.textContent = 'Krokodyl nilowy';
      var typeTwo = document.createElement("OPTION");
      typeTwo.value = 'Krokodyl amerykanski';
      typeTwo.textContent = 'Krokodyl amerykanski';
      selectType.appendChild(typeOne);
      selectType.appendChild(typeTwo);
      newAnimalDiv.appendChild(selectType);
      var newAnimalButton = document.createElement("BUTTON");
      newAnimalButton.className = 'button-enclosure';
      newAnimalButton.textContent = 'Dodaj zwierze';
      newAnimalButton.key = encIndex;
      newAnimalButton.addEventListener('click', function(){
        var input = document.querySelectorAll(".input-enclosure-animal");

        var array = [];
        for(var i=0; i < input.length; i++){
          array.push(input[i]);
        }
        //console.log(array.reverse()[this.key].value);
        var animalNameData = array.reverse()[this.key].value;

        var select = document.querySelectorAll("select");

        array = [];
        for(var i=0; i < select.length; i++){
          array.push(select[i]);
        }

        var animalTypeData = array.reverse()[this.key].value;

        if(animalTypeData == 'Krokodyl nilowy'){
          enclosures[this.key].animals.push(new NileCrocodile(animalNameData));
        } else if(animalTypeData == 'Krokodyl amerykanski'){
          enclosures[this.key].animals.push(new AmericanCrocodile(animalNameData));
        }

        self.render();
        //this.wypisz();
        //enclosures[this.key].animals.push(new )
        //console.log(input.reverse());
      });


      newAnimalDiv.appendChild(newAnimalButton);
      enclosureItem.appendChild(newAnimalDiv);


      enclosure.animals.forEach(function(animal, index){
        var animalRow = document.createElement("DIV");
        animalRow.className = 'animal-row';

        var animalImage = document.createElement("DIV");
        animalImage.className = 'animal-image';
        var img = document.createElement("IMG");

        if(animal.getAnimalType() == 'Krokodyl nilowy'){
          img.src = 'img/krokodyl-nilowy.jpg';
        } else if(animal.getAnimalType() == 'Krokodyl amerykanski'){
          img.src = 'img/krokodyl-amerykanski.jpg';
        }


        animalImage.appendChild(img);

        var animalName = document.createElement("DIV");
        animalName.className = 'animal-name';
        var name = document.createElement("SPAN");
        var nameText = document.createTextNode(animal.getAnimalType() + " " + animal.getName());
        name.appendChild(nameText);
        animalName.appendChild(name);


        var speech = document.createElement("DIV");
        speech.className = 'speech';
        var divCircleOne = document.createElement("DIV");
        speech.appendChild(divCircleOne);
        var divCircleTwo = document.createElement("DIV");
        speech.appendChild(divCircleTwo);
        var divCircleThree = document.createElement("DIV");
        var divSpan = document.createElement("SPAN");

        var hungry = true;
        var divSpanText = null;
        if(!animal.isHungry()){
          divSpanText = document.createTextNode('N & N');
        } else{
          divSpanText = document.createTextNode('G & S');
        }


        divSpan.appendChild(divSpanText);
        divCircleThree.appendChild(divSpan);
        speech.appendChild(divCircleThree);

        animalRow.appendChild(animalImage);
        animalRow.appendChild(animalName);
        animalRow.appendChild(speech);

        animalRow.addEventListener('click', function(){

          var popup = document.getElementById('info-popup');
          popup.style.display = 'block';

          var popup = document.getElementById('info-list');

          while (popup.firstChild) {
              popup.removeChild(popup.firstChild);
          }

          var iAnimalName = document.createElement("H3");
          var iAnimalNameText = document.createTextNode(animal.getName());
          iAnimalName.appendChild(iAnimalNameText);
          popup.appendChild(iAnimalName);

          animal.getInfo().forEach(function(myString){
            var info = document.createElement("P");
            var infoText = document.createTextNode(myString);
            info.appendChild(infoText);
            popup.appendChild(info);
          });

        });

        enclosureItem.appendChild(animalRow);
      });

      enclosureList.insertBefore(enclosureItem, enclosureList.childNodes[0])
    });
  }

  wypisz(){
    console.log("Hello")
  }
}
