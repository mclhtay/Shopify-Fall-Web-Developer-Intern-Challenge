import * as React from 'react';
import {ToastContainer, toast, ToastContent, ToastOptions} from 'react-toastify';
import {useSelector} from 'react-redux';
import {StoreState} from '../../store';
import {Toast as ToastType, ToastTypes} from '../../store/reducers/app/types';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';


const ToastMapping: {[key in ToastTypes] : (content: ToastContent, options?: ToastOptions) => React.ReactText } = {
  'Error': toast.error,
  'Info': toast.info,
  'Success': toast.success,
  'Warn': toast.warn
}

const ToastOption: ToastOptions = {
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  pauseOnFocusLoss: true
}

const ToastWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;

    &> div {
      z-index: 999999;
    }
`;

export const Toast: React.FC = () => {

  const toastMsg = useSelector<StoreState, ToastType>(s => s.app.toast);
  const showBanner = useSelector<StoreState, boolean|undefined>(s => s.app.banner);

  React.useEffect(() => {
    if(toastMsg.message)
      try {
        ToastMapping[toastMsg.type]((toastMsg.message), ToastOption);

      } catch (error) {
        ToastMapping[toastMsg.type]("Unknown Error", ToastOption);

      }
  }, [toastMsg.id, toastMsg.type, toastMsg.message])


  return (
    <ToastWrapper className="toast-wrapper">
      <ToastContainer 
      {
        ...ToastOption
      }
      position={showBanner? 'top-right' : 'top-center'}
      autoClose={showBanner? 5000 : 2000}
      />
    </ToastWrapper>
  )
}