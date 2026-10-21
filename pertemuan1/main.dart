class Queue {
  final List<int> _items = [];

  void enqueue(int value) {
    _items.add(value);
  }

  int? dequeue() {
    if (_items.isEmpty) return null;
    return _items.removeAt(0);
  }

  bool get isEmpty => _items.isEmpty;

  int get length => _items.length;
}

void main() {
  final queue = Queue();

  queue.enqueue(10);
  queue.enqueue(20);
  queue.enqueue(30);

  print(queue.dequeue());
  print(queue.dequeue());
  print(queue.dequeue());
  print(queue.dequeue());
}
