import { OS } from "../types/OS";

const STORAGE_KEY = "os_list";

export function loadOS(): OS[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveOS(list: OS[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}