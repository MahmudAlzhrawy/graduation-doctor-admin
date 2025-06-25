import { Provider } from "react-redux";
import { store } from "@/lib/store";
export function ClientProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
