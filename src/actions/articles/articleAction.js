import axios from 'axios';
import { ArticleConstants } from '../actionTypes';
import { toastSuccess, toastFailure } from '../../utils/toast';
import history from '../../utils/history';

export function ArticleSuccess(successMessage) {
  return {
    type: ArticleConstants.ARTICLE_SUCCESS,
    payload: successMessage,
  };
}

export function ArticleFail(errorMessage) {
  return {
    type: ArticleConstants.ARTICLE_FAILURE,
    payload: errorMessage,
  };
}

export function ArticleRequest() {
  return {
    type: ArticleConstants.ARTICLE_REQUEST,
  };
}

export function ArticleDeleteSuccess(successMessage) {
  return {
    type: ArticleConstants.ARTICLE_DELETE_SUCCESS,
    payload: successMessage,
  };
}

export function ArticleDeleteFail(errorMessage) {
  return {
    type: ArticleConstants.ARTICLE_DELETE_FAILURE,
    payload: errorMessage,
  };
}

export function ArticleDeleteRequest() {
  return {
    type: ArticleConstants.ARTICLE_DELETE_REQUEST,
  };
}

export function registerArticle(newArticle) {
  // eslint-disable-next-line func-names
  return function (dispatch) {
    dispatch(ArticleRequest());
    return axios
      .post('https://ah-backend-kronos-staging.herokuapp.com/api/articles/', newArticle, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        dispatch(ArticleSuccess(response.data));
        toastSuccess('Article created successfully', 'A');
        history.push('/article-view');
      })
      .catch((error) => {
        toastFailure('Article creation failed. Authetication credentials were not provided', 'A');
        dispatch(ArticleFail(error.response.data));
      });
  };
}

export function updateArticle(newArticle, articleSlug) {
  // eslint-disable-next-line func-names
  return function (dispatch) {
    dispatch(ArticleRequest());
    return axios
      .patch(
        `https://ah-backend-kronos-staging.herokuapp.com/api/articles/${articleSlug}`,
        newArticle,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        },
      )
      .then((response) => {
        dispatch(ArticleSuccess(response.data));
        toastSuccess('Article successfully updfated', 'A');
        history.push('/article-view');
      })
      .catch((error) => {
        toastFailure('Article creation failed. Authetication credentials were not provided', 'A');
        dispatch(ArticleFail(error.response.data));
      });
  };
}

export function deleteArticle(articleSlug) {
  // eslint-disable-next-line func-names
  return function (dispatch) {
    dispatch(ArticleDeleteRequest());
    return axios
      .delete(`https://ah-backend-kronos-staging.herokuapp.com/api/articles/${articleSlug}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        dispatch(ArticleDeleteSuccess(response.data));
        toastSuccess('Article deleted successfully.', 'A');
        history.push('/article-view');
      })
      .catch((error) => {
        toastFailure('Article deletion failed.', 'A');
        dispatch(ArticleDeleteFail(error.response.data));
      });
  };
}