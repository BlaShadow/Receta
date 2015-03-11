/*  Model
    
        chef:{
            id
            nombre
        }
        
        receta:{
            nombre
            chef_id
            imagen
            rating
        }
    
*/
    function initializeStorage(){
        /*Called to check localStorage at the begining*/
        
        
        /*Initialize the chef array if null*/
        if(localStorage.chef === null || localStorage.chef === undefined)
            localStorage.chef = '[]';
        /*Initialize the chef array if null*/
        if(localStorage.recipe === null || localStorage.recipe === undefined)
            localStorage.recipe = '[]';
    }
    
    function saveRecipe(recipeName, imageURL,ratingDropDown,chefDropDown){
        if(localStorage.chef === null || localStorage.chef === undefined){
            alert('No hay chefs en la base de datos!');
            return;
        }
        
        if(recipeName.value === '' || imageURL.value === '')
        {
            alert('Existen campos vacíos!');
            return;
        }
        
        var recipe = {
            'name': recipeName.value,
            'image': imageURL.value,
            'rating': ratingDropDown[ratingDropDown.selectedIndex].value,
            'chefId': chefDropDown[chefDropDown.selectedIndex].value,
            'chefName': chefDropDown[chefDropDown.selectedIndex].text
        };
        
        var tempRecipe = JSON.parse(localStorage.recipe);
        tempRecipe.push(recipe);
        
        localStorage.recipe = JSON.stringify(tempRecipe);
        alert('Agregando receta');
        
        recipeName.value = '';
        imageURL.value = '';
        
        loadRecipeList(
            document.getElementById('recipeTable')
        );
        
    }
    
    function saveChef(chefName){
        if(chefName.value === ''){
            alert('Nombre del chef vacío!');
            return;
        }
        var chef = {
          'id':guid(),
          'name': chefName.value
        };
        
        var tempChef = JSON.parse(localStorage.chef);
        tempChef.push(chef);
        
        localStorage.chef = JSON.stringify(tempChef);
        
        alert('Guardando: ' + chef.name);
        
        chefName.value = '';
        
        loadChefList(
            document.getElementById('chefTable'),
            document.getElementById('chefDropDown')
        );
    }
    
    function loadRecipeList(recipeTable){
        var i; //counter
        var count = JSON.parse(localStorage.recipe).length; //no. of chefs
        var recipeArray = JSON.parse(localStorage.recipe); //Array of chefs
        var recipeList = '';
        for(i = 0; i < count; i++){
            recipeList += 
                '<tr>'+ 
                
                    '<td>' + 
                        recipeArray[i].name + 
                    '</td>' +
                
                    '<td>' +
                        recipeArray[i].rating + 
                    '</td>'+ 
                
                    '<td>' +
                        recipeArray[i].chefName + 
                    '</td>'+
                    
                    '<td>' +
                        '<a href="' + recipeArray[i].image + '">' +
                            recipeArray[i].image + 
                        '</a>' +
                    '</td>'+
                
                '</tr>';
        }
        
        /* Adding the HTML code */
        recipeTable.innerHTML = recipeList;
    }
    
    function loadChefList(chefTable, chefDropDown){
        var i; //counter
        var count = JSON.parse(localStorage.chef).length; //no. of chefs
        var chefArray = JSON.parse(localStorage.chef); //Array of chefs
        var chefList = '';
        var chefScroll = '';
        for(i = 0; i < count; i++){
            chefList += '<tr><td>' + chefArray[i].id + '</td><td>' + chefArray[i].name + '</td></tr>';
            chefScroll += '<option value="' + chefArray[i].id +'">' + chefArray[i].name + '</option>';
        }
        
        /* Adding the HTML code */
        chefTable.innerHTML = chefList;
        chefDropDown.innerHTML = chefScroll;
    }

/** generate guid (unique identifier) **/
    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
    }