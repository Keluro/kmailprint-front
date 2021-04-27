import { speedPrint } from './services/PrintFunction';

Office.initialize = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).executePrintClick = speedPrint;
};
