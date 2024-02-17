/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
type IError = {
  message: string;
  status: number;
};

enum ItemEnum {
  appartment,
  house,
  land,
  parking,
  shop,
}

export { IError, ItemEnum };
