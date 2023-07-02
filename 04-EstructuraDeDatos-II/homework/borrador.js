function Node(data){
    this.data = data;
    this.next
}

function List(){
    this.length = 0;
    this.head = null;
}

//Head ----> "Agustin" ----> "Franco" ----> "Tony" ----> null

List.prototype.add = function(data) {
    var node = new Node(data); //{data: data, next:null}
    current = this.head;
    //Si esta vacía
    if(!current){// Head ----> null
        this.head = node; 
        this._length++;
        return node;// Puede o no puede estar
    }
    //Si no esta vacía, recorro hasta encontrar el último
    while (current.next) {
        current = current.next;
    }
    curren.next = node;
    history._length;
    return node;
}

//Head ----> "Agustin" ----> "Franco" ----> "Tony" ----> null
//

//data : "Agustin"
//next: "Franco"
//        next:"Tony"


//Lista doblemente enlazada

/*
*
*/

