
export const addBGLocationListener = () => async (location: any) => {
  console.log("from backgound ->", location);
}

export const cancelBGLocation = () => () => {
  return;
};
