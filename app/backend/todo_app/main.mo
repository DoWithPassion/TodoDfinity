import Array "mo:base/Array";
import Nat "mo:base/Nat";

actor ToDoApp{
    stable var todos:[ToDo] = [];
    stable var nextId:Nat =1;

    type ToDo = {
        id:Nat;
        title:Text;
        description: Text;
        completed:Bool;
    };

    func add(todos:[ToDo], id:Nat, title:Text, description:Text):[ToDo]{
        let todo:ToDo = {
            id = id;
            title=title;
            description=description;
            completed=false;
        };
        Array.append(todos,[todo])
    };

    func show(todos:[ToDo]): [ToDo]{
        todos;
    };  
    func showToDoText(todos:[ToDo]): Text{
        var output: Text = "\n __ToDos__";
        for(todo:ToDo in todos.vals()){
            output #= "\n (" # Nat.toText(todo.id) # ") "# todo.title #" "# todo.description;
            if(todo.completed){
                output #= " ✔";
            };
        };
        output;
    }; 

    public func addToDo(title:Text,description:Text):async(){
        todos:=add(todos,nextId,title,description);
        nextId+=1;
    };

    public query func showToDos():async [ToDo]{
        // showToDoText(todos);
        show(todos);
    }

};
