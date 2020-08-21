import {
  FETCH_RELATIONSHIPS_SUCCESS,
  UPDATE_RELATIONSHIPS,
  UPDATE_RELATIONSHIP,
} from "./relationshipActionTypes";

const initialRelationshipState = {
  relationships: {},
};

const relationshipReducer = (state = initialRelationshipState, action) => {
  switch (action.type) {
    case FETCH_RELATIONSHIPS_SUCCESS:
      return {
        ...state,
        relationships: action.payload,
      };

    case UPDATE_RELATIONSHIP:
      const { relationship_id } = action.payload;
      return {
        ...state,
        relationships: {
          ...state.relationships,
          [relationship_id]: action.payload,
        },
      };

    case UPDATE_RELATIONSHIPS:
      const updates = {};
      for (const relationship of action.payload)
        updates[relationship.relationship_id] = relationship;
      return {
        ...state,
        relationships: {
          ...state.relationships,
          ...updates,
        },
      };

    default:
      return state;
  }
};
