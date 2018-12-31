import types from "./types";

export function createActions(http) {
  return {
    [types.FETCH_DATA]({ commit }, { id }) {
      return http
        .get(`/api/polls/${id}`)
        .then(response => {
          commit(types.IS_NOT_LOADING);
          commit(types.DATA, response.data);
        })
        .catch(error => {
          commit(types.IS_NOT_LOADING);
          commit(types.ERROR, error.response.data);
        });
    },
    [types.UPDATE]({ commit }, { pollId, choiceId }) {
      return http
        .put(`/api/polls/${pollId}`, { choice_id: choiceId })
        .then(() => {
          commit(types.INCREMENT_VOTE_COUNT, choiceId);
        })
        .catch(error => {
          commit(types.ERROR, { message: "You can only vote once" });
        });
    }
  };
}
