import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory as todo_backend_idl, canisterId as todo_backend_id } from "dfx-generated/todo_backend"

const agent = new HttpAgent();

// Creating our actor object using idl,canister id and http agent
const ToDoApp = Actor.createActor(todo_backend_idl, { agent, canisterId: todo_backend_id })

export default ToDoApp;