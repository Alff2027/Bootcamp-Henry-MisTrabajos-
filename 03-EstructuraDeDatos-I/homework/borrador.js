function Queue() {
    this.cola = Array.prototype.slice(0,0); 
    this.enqueue = enqueue;
    this.dequeue = dequeue;
    this.size = size;
  
    function enqueue(element) {
      this.cola.push(element);
    }
  
    function dequeue() {
      return this.cola.shift();
    }
    function size() {
      return this.cola.length;
    }
  }
  
  queue = new Queue();
  
  console.log(typeof queue.enqueue);
  console.log(queue.size());
  queue.enqueue('first in line');
  console.log(queue.size());