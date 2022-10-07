import { ChangeEventHandler } from 'react'

import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import { selectSearch } from './controls-selectors';
import { setSearch } from './controls-slice';

type OnSearch = ChangeEventHandler<HTMLInputElement>

export const useSearch = (): [string, OnSearch] => {
  const dispatch = useAppDispatch();
  const search = useSelector(selectSearch);

  const handleSearch: OnSearch = (e) => {
    dispatch(setSearch(e.target.value))
  }

  return [search, handleSearch];
}
