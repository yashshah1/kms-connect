import {
  FETCH_RELATIONSHIPS_SUCCESS,
  UPDATE_RELATIONSHIPS,
  UPDATE_RELATIONSHIP,
} from "./relationshipActionTypes";

export const fetchRelationships = () => async (dispatch) => {
  try {
    const response = await fetch("/api/relationships/");
    const data = await response.json();
    const dataObj = {};
    for (const relationship of data)
      dataObj[relationship.relationship_id] = relationship;
    dispatch(fetchRelationshipSuccess(dataObj));
  } catch (err) {
    alert(err.msg);
    // dispatch(setError(err));
  }
};

const fetchRelationshipSuccess = (data) => ({
  type: FETCH_RELATIONSHIPS_SUCCESS,
  payload: data,
});
