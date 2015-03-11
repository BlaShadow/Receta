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
    
    function saveRecipe(recipeName, imageURL,chefId,chefName,ratingValue,callback){
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
            'id': guid(),
            'name': recipeName.value,
            'image': imageURL.value,
            'rating': ratingValue,
            'chefId': chefId,
            'chefName': chefName
        };
        
        var tempRecipe = JSON.parse(localStorage.recipe);
        tempRecipe.push(recipe);
        
        localStorage.recipe = JSON.stringify(tempRecipe);
        alert('Agregando receta');
        
        recipeName.value = '';
        imageURL.value = '';
        
        callback();
    }
    
    function saveChef(chefName,callback){
        if(chefName.value === ''){
            alert('Nombre del chef vacío!');
            return;
        }
        
        var chef = {
          'id':guid(),
          'name': chefName
        };
        
        var tempChef = JSON.parse(localStorage.chef);
        tempChef.push(chef);
        
        localStorage.chef = JSON.stringify(tempChef);
        
        alert('Guardando: ' + chef.name);
        
        chefName.value = '';

        callback();
    }
    
    function loadRecipeList(recipeTable){
        
        var recipeArray = JSON.parse(localStorage.recipe); //Array of chefs
        var count = recipeArray.length; //no. of chefs
        
        var recipeList = '';
        
        for(var i = 0; i < count; i++){
            recipeList += 
                '<tr>'+ 
                
                    '<td><a data-target="#recipeDetail" data-value='+ recipeArray[i].id + '>' + 
                        recipeArray[i].name + 
                    '</a></td>' +
                
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
                    
                    '<td><a data-target="#recipeDetail" data-value='+ recipeArray[i].id + '>' +
                        "Detalle" + 
                    '</a></td>'+
                
                '</tr>';
                
                // <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">
                //   Launch demo modal
                // </button>
        }
        
        /* Adding the HTML code */
        recipeTable.innerHTML = recipeList;
    }
    
    function getRecipe(id,callback){
        var storage = JSON.parse(localStorage.recipe);
        
        
        var result = storage.filter(function(item){
            return (item.id == id);
        });
        
        callback(result[0]);
    }
    
    function loadChefList(chefTable, chefDropDown){
        
        var chefArray = JSON.parse(localStorage.chef); //Array of chefs
        var count = chefArray.length; //no. of chefs
        
        var chefList = '';
        var chefScroll = '';
        
        for(var i = 0; i < count; i++){
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