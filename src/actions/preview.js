import localForage from 'localforage';

export const PREVIEW_INVERT_CHANGE_FAIL = 'PREVIEW_INVERT_CHANGE_FAIL';
export const PREVIEW_INVERT_CHANGE_REQUEST = 'PREVIEW_INVERT_CHANGE_REQUEST';
export const PREVIEW_INVERT_CHANGE_SUCCESS = 'PREVIEW_INVERT_CHANGE_SUCCESS';
export const PREVIEW_INVERT_FETCH_FAIL = 'PREVIEW_INVERT_FETCH_FAIL';
export const PREVIEW_INVERT_FETCH_REQUEST = 'PREVIEW_INVERT_FETCH_REQUEST';
export const PREVIEW_INVERT_FETCH_SUCCESS = 'PREVIEW_INVERT_FETCH_SUCCESS';

export const changePreviewInvertFail = error => ({
  error,
  type: PREVIEW_INVERT_CHANGE_FAIL,
});

export const changePreviewInvertRequest = () => ({
  type: PREVIEW_INVERT_CHANGE_REQUEST,
});

export const changePreviewInvertSuccess = invert => ({
  invert,
  type: PREVIEW_INVERT_CHANGE_SUCCESS,
});

export const changePreviewInvert = () => (dispatch, getState) => {
  const { preview } = getState();
  const newInvert = !preview.invert;

  dispatch(changePreviewInvertRequest());

  localForage.setItem('preview.invert', newInvert)
    .then(() => dispatch(changePreviewInvertSuccess(newInvert)))
    .catch((error) => dispatch(changePreviewInvertFail(error)));
};

export const fetchPreviewInvertFail = error => ({
  error,
  type: PREVIEW_INVERT_FETCH_FAIL,
});

export const fetchPreviewInvertRequest = () => ({
  type: PREVIEW_INVERT_FETCH_REQUEST,
});

export const fetchPreviewInvertSuccess = invert => ({
  invert,
  type: PREVIEW_INVERT_FETCH_SUCCESS
});

export const fetchPreviewInvert = () => (dispatch) => {
  dispatch(fetchPreviewInvertRequest());

  localForage.getItem('preview.invert')
    .then(invert => dispatch(fetchPreviewInvertSuccess(invert)))
    .catch(error => dispatch(fetchPreviewInvertFail()));
};
