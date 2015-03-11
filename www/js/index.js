var Model = function(){
    var databaseName = "recetas_db";
    
    /** save object to database **/
    function saveData(datastorage){
        localStorage.setItem(databaseName,JSON.stringify(data));    
    }
    
    /** load current object **/
    function loadData(){
        var rawData = localStorage.getItem(databaseName);   
        
        var cleanData = JSON.parse(rawData);
        
        return cleanData;
    }
    
    /** return all chef **/
    function listChef(){
        var item = loadData();
        
        if(item !== undefined){
            return item.chefs;    
        }
        
        return [];
    }
    
    function addReceta(nombre,chefId,url){
        var newItem = {
            id:guid(),
            nombre:nombre,
            chef_id:chefId,
            image:url
        };
        
        wrapSaveitem(newItem,"recetas");
        
        console.log("Receta guardada");
    }
    
    function addChef(nombre){
        var newItem = {id:guid(),nombre:nombre};
        
        wrapSaveitem(newItem,"chefs");
    }
    
    /** Private method **/
    function wrapSaveitem(newItem,property){
        var currentDataBase = loadData();
        
        /** if the database is null, make an init :) **/
        if(currentDataBase === undefined || currentDataBase === null){
            saveData(data);
            
            currentDataBase = loadData();
        }
        
        if(currentDataBase[property] !== undefined && typeof([]) === currentDataBase[property]){
            currentDataBase[property].push(newItem);
        }else{
            currentDataBase[property] = [newItem];
        }
        
        /** Save Data **/
        saveData(currentDataBase);
    }
    
    
    
        return {
        addReceta:addReceta,
        addChef:addChef,
        listChef:listChef,
    };
};


/*  Model
    
        chef:{
            id
            nombre
        }
        
        receta:{
            nombre
            chef_id
            imagen
        }
    
    */
    
    /** model **/
    var data = {
        chefs:[],
        recetas:[]
    };

    function initializeStorage(){
        /*Called to check localStorage at the begining*/
        
        
        /*Initialize the chef array if null*/
        if(localStorage.chef === null || localStorage.chef === undefined)
            localStorage.chef = '[]';
        /*Initialize the chef array if null*/
        if(localStorage.recipe === null || localStorage.recipe === undefined)
            localStorage.recipe = '[]';
    }
    
    function saveChef(chefName){
        var chef = {
          'id':guid(),
          'name': chefName.value
        };
        
        var tempChef = JSON.parse(localStorage.chef);
        tempChef.push(chef);
        
        localStorage.chef = JSON.stringify(tempChef);
    }
    
    function loadChefList(chefTable, chefDropDown){
        var i;
        var count = JSON.parse(localStorage.chef).length;
        var chefArray = JSON.parse(localStorage.chef);
        var chefList = '';
        var chefScroll = '';
        for(i = 0; i < count; i++){
            chefList += '<tr><td>' + chefArray[i].id + '</td><td>' + chefArray[i].name + '</td></tr>';
            chefScroll += '<option value="' + chefArray[i].id +'">' + chefArray[i].name + '</option>';
        }
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


/*
    Forma de uso:

    var model = new Model();

    model.listChef();
    model.addChef("nombre");
    model.addReceta("nombre","1231232342345","url");ß

*/
