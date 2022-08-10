export const getResData = (data, errMsg) => {
  if (errMsg) {
    return {
      code: -1,
      errMsg,
      data,
    };
  }
  return {
    code: 0,
    data,
  };
};
