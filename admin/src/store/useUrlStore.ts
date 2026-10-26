import { create } from "zustand";

const url = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8001";

interface DataShowProps {
  id: string | number;
  value: string | number;
}

interface URLProps {
  APP: string;
  LOGIN: string;
  REGISTER: string;
}

interface StatusProps {
  id: number;
  value: string;
}

interface useUrlStoreProps {
  TOKEN: string;
  setTOKEN: (newToken: string) => void;
  URL: URLProps;
  DataShow: DataShowProps[];
  status: StatusProps[];
  choose: StatusProps[];
}

export const useUrlStore = create<useUrlStoreProps>((set) => ({
  TOKEN: "",
  // setTOKEN : () => set((state)=>({TOKEN : state.TOKEN})),
  setTOKEN: (newToken) => set({ TOKEN: newToken }),
  URL: {
    APP: url,
    LOGIN: url + "/api/v1/auth/login",
    REGISTER: url + "/api/v1/auth/register",
  },
  DataShow: [
    {
      id: 2,
      value: "2 - Data tampil ",
    },
    {
      id: 8,
      value: "8 - Data tampil ",
    },
    {
      id: 25,
      value: "25 - Data tampil ",
    },
    {
      id: 50,
      value: "50 - Data tampil ",
    },
    {
      id: 100,
      value: "100 - Data tampil ",
    },
  ],

  status: [
    { id: 0, value: "Tidak Aktif" },
    { id: 1, value: "Aktif" },
  ],
  choose: [
    { id: 0, value: "Tidak" },
    { id: 1, value: "Ya" },
  ],
}));
