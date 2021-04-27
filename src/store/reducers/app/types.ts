export interface AppReducerType {
  loading: boolean;
  toast: Toast,
  entered: boolean;
  banner?: boolean;
}

export type ToastTypes = 'Error' | 'Info' | 'Success' | 'Warn'

export interface Toast {
  id: string;
  message: string,
  type: ToastTypes
}

