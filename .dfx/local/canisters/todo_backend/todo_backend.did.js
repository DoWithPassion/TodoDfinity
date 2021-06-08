export default ({ IDL }) => {
  const ToDo = IDL.Record({
    'id' : IDL.Nat,
    'title' : IDL.Text,
    'completed' : IDL.Bool,
    'description' : IDL.Text,
  });
  return IDL.Service({
    'addToDo' : IDL.Func([IDL.Text, IDL.Text], [], []),
    'showToDos' : IDL.Func([], [IDL.Vec(ToDo)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };