import type { Principal } from '@dfinity/agent';
export interface ToDo {
  'id' : bigint,
  'title' : string,
  'completed' : boolean,
  'description' : string,
};
export default interface _SERVICE {
  'addToDo' : (arg_0: string, arg_1: string) => Promise<undefined>,
  'showToDos' : () => Promise<Array<ToDo>>,
};