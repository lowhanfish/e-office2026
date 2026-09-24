interface OptionType {
  id: string;
  value: string;
}

type OptionList = OptionType[];

export const apiRestructureOption = <
  T extends { id: string | number; nama: string },
>(
  data: T[],
): OptionList => {
  const fax = data?.map((item) => ({
    id: String(item.id),
    value: String(item.nama),
  }));

  return fax ?? [];
};
