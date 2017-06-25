var validation = function(field){
    "use strict";

    var me = this;
    me.field = field;
    me.value = field.value;

    me.message = function(txt, css){
        me.removeMessage(me.field.id);

        var p = document.createElement("p");
            p.innerHTML = txt;
            p.setAttribute("id", me.field.id + "_message");
            p.setAttribute("class", css);
            me.field.after(p);
    }

    me.removeMessage = function(id){
        var element = document.querySelector("#" + id + "_message");
        
         if(element){
            var parent = element.parentElement;
            parent.removeChild(element);
         }
    }

    me.toogleErrorClass = function(cssError, error){
                    var element = document.querySelector("#" + me.field.id);
                    var cssElement = element.className.split(" ");
                    var index = cssElement.indexOf(cssError);
                    var newCss;
                    if(error) {
                         if(index == -1)     
                            newCss = element.className + " " + cssError;
                        else
                        newCss = element.className;
                    } else {
                        console.log(index);
                        if(index > -1)
                            cssElement.splice(index, 1);
                        
                        newCss = cssElement.toString();
                        newCss = newCss.replace(/\,/g, " ");
                    }
                    element.setAttribute("class", newCss);
                    
                }

    return {
        number : function(){
            return {
                between: function(minvalue, maxvalue, message, css){
                    this.minvalue = minvalue;
                    this.maxvalue = maxvalue;
                   

                    if(!css)
                        this.css = "error"
                    else
                        this.css = css;

                    if(!message)
                        this.message = "Please insert a value between "+this.minvalue+" and "+this.maxvalue+".";
                    else
                        this.message = message;

                     
                    if(me.value < this.minvalue || me.value > this.maxvalue){
                        me.message(this.message, this.css);
                        me.toogleErrorClass(this.css, 1);
                    } else {
                        me.removeMessage(me.field.id);
                        me.toogleErrorClass(this.css, 0);
                    }

                    
                },
                blockText : function(event){
                    if((event.charCode > 0 && event.charCode < 48) || event.charCode > 57)
                        return false;
                }
            }
        }
    }
}