export const initialState = {
  records: [],
  editId: null,
};

export function reducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        records: [...state.records, { ...action.payload, id: Date.now() }],
      };

    case 'UPDATE':
      return {
        ...state,
        records: state.records.map(r =>
          r.id === action.payload.id ? action.payload : r
        ),
        editId: null,
      };

    case 'DELETE':
      return {
        ...state,
        records: state.records.filter(r => r.id !== action.id),
        editId: state.editId === action.id ? null : state.editId,
      };

    case 'SET_EDIT':
      return { ...state, editId: action.id };

    case 'CANCEL_EDIT':
      return { ...state, editId: null };

    default:
      return state;
  }
}
