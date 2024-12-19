'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const hystoryArray = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    const newCopy = Object.assign({}, hystoryArray[hystoryArray.length - 1]);

    switch (action.type) {
      case 'addProperties':
        if (hystoryArray.length >= 1) {
          hystoryArray.push(addProperties(newCopy, action.extraData));
          break;
        } else {
          hystoryArray.push(addProperties(stateCopy, action.extraData));
          break;
        }

      case 'removeProperties':
        if (hystoryArray.length >= 1) {
          hystoryArray.push(removeProperties(newCopy, action.keysToRemove));
          break;
        } else {
          hystoryArray.push(removeProperties(stateCopy, action.keysToRemove));
          break;
        }

      case 'clear':
        if (hystoryArray.length >= 1) {
          hystoryArray.push(clearProperties(newCopy));
          break;
        } else {
          hystoryArray.push(clearProperties(stateCopy));
          break;
        }
    }
  }

  function addProperties(stateCopyObject, extraData) {
    return Object.assign(stateCopyObject, extraData);
  }

  function removeProperties(stateCopyObject, keysToRemove) {
    for (const key of keysToRemove) {
      delete stateCopyObject[key];
    }

    return stateCopyObject;
  }

  function clearProperties(stateCopyObject) {
    for (const key in stateCopyObject) {
      delete stateCopyObject[key];
    }

    return stateCopyObject;
  }

  return hystoryArray;
}

module.exports = transformStateWithClones;
