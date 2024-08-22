import { create } from 'zustand';
import { Token } from '../types';
import { immer } from 'zustand/middleware/immer';
import { createSelectors } from './create-selectors';
import { DEFAULT_TOKEN } from '../constants';

type State = {
  toToken: Token | null;
  toTokenAmount: string;
  fromToken: Token | null;
  fromTokenAmount: string;
  fromTokenSearch: string;
  balances: Record<`0x${string}`, string>;
  sendTo: string;
  sendToAddress: `0x${string}` | '';
};

type Actions = {
  setFromToken: (selected: Token) => void;
  setFromTokenAmount: (value: string) => void;
  setBalances: (address: `0x${string}`, value: string) => void;
  setSendToAddress: (address: `0x${string}`) => void;
  setSendTo: (address: string) => void;
  setFromTokenSearch: (val: string) => void;
};

const useAppStoreBase = create<State & Actions>()(
  immer((set) => ({
    fromToken: DEFAULT_TOKEN,
    toTokenAmount: '',
    toToken: null,
    fromTokenAmount: '',
    fromTokenSearch: '',
    balances: {},
    sendToAddress: '',
    sendTo: '',
    setFromToken: (selected: Token) =>
      set((state) => {
        state.fromToken = selected;
      }),
    setFromTokenAmount: (value: string) =>
      set((state) => {
        state.fromTokenAmount = value;
      }),
    setBalances: (address: `0x${string}`, value: string) =>
      set((state) => {
        state.balances[address] = value;
      }),
    setSendToAddress: (address: `0x${string}` | '') => {
      set((state) => {
        state.sendToAddress = address;
      });
    },
    setSendTo: (address: string) =>
      set((state) => {
        state.sendTo = address;
      }),
    setFromTokenSearch: (val: string) =>
      set((state) => {
        state.fromTokenSearch = val;
      }),
  })),
);

export const useAppStore = createSelectors(useAppStoreBase);
