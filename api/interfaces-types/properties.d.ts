type NumberAsString = string;
type ArrayAsString = string; // An array that is string

enum TransactionEnum {
  buy,
  rent,
}

enum ItemEnum {
  appartment,
  house,
  land,
  parking,
  shop,
}

interface ISearchParameters {
  lowerprice: NumberAsString | null;
  higherPrice: NumberAsString | null;
  transaction: TransactionEnum | null;
  item: ItemEnum | null;
  places: string[] | null;
}

export { ISearchParameters, NumberAsString, ItemEnum, TransactionEnum };
