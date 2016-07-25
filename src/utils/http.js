// Function for interacting with RESTful services
export const http = url => {
  // Return parsed JSON
  const parseJSON = response => response.json();
  const parseTEXT = response => response.text();

  // Create error object
  const createError = (status, message = '', response = {}) => {
    let error = new Error(message);
    error.status = status;
    error.reponse = response;
    return error;
  };

  // Check HTTP status and either return response or throw error
  const checkHttpStatus = response => {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      return Promise.reject(createError(response.status, response.statusText, response));
    }
  };

  // Reject with error object
  const onReject = response => Promise.reject(createError(response.status, response.statusText, response));

  // Resolve wrapper function
  const onResolve = response => {
    const headers = response.headers;
    // If response is not in JSON format, just return plain text
    if (headers && headers.has('content-type') && headers.get('content-type').indexOf('json') === -1) {
      return parseTEXT(response).then(text => Promise.resolve(text));
    }
    return parseJSON(response).then(json => Promise.resolve(json));
  };

  let headers = new Headers({
    'Content-Type': 'application/json;charset=UTF-8',
    'Accept': 'application/json'
  });

  // Core object handles calls with fetch
  const core = {
    'fetch': (url, args) => {
      // If there is a headers object in args, append it to headers object above
      if (args.hasOwnProperty('headers') && args.headers instanceof Headers) {
        if (args.headers.entries) {
          for (let entry of args.headers.entries()) {
            headers.set(entry[0], entry[1]);
          }
        } else {
          // hack for browser which don't support Headers
          args.headers.forEach((value, name) => headers.set(name, value));
          //headers = undefined;
        }
      }
      return fetch(url, Object.assign({}, args, {
        credentials: 'include',
        mode: 'cors',
        redirect: 'follow',
        headers: headers
      }))
      .catch(onReject)
      .then(checkHttpStatus)
      .then(onResolve);
    }
  };

  return {
    'get': (args = {}) => core.fetch(url, Object.assign({}, args, {method: 'get'})),
    'post': (args = {}) => core.fetch(url, Object.assign({}, args, {method: 'post'})),
    'put': (args = {}) => core.fetch(url, Object.assign({}, args, {method: 'put'})),
    'delete': (args = {}) => core.fetch(url, Object.assign({}, args, {method: 'delete'})),
    'head': (args = {}) => core.fetch(url, Object.assign({}, args, {method: 'head'}))
  };
};
