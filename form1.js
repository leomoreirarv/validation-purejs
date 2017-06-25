function validate(field){
    var valid = new validation(field);
    return {
        between : function(){
            valid.number().between(1, 90)
        },
        blockText : function(event){
            return valid.number().blockText(event);
        }
    }
}
