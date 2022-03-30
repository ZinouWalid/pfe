export const SET_SUGGESTIONS = 'SET_SUGGESTIONS'


export const setSuggestions = function (suggestions) {
  return {
    type: SET_SUGGESTIONS,
    payload: suggestions,
  }
}