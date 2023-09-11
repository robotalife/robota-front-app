import { useEffect, useRef } from 'react';
import styles from './TradingViewWidget.module.scss';
interface TradingViewWindow extends Window {
  TradingView: any; // Replace 'any' with the appropriate type if known
}

interface TradingViewWidgetProps {
  symbol: string;
}

let tvScriptLoadingPromise: Promise<void> | undefined;

export default function TradingViewWidget({ symbol }: TradingViewWidgetProps): JSX.Element {
  const onLoadScriptRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    onLoadScriptRef.current = createWidget;

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise<void>((resolve) => {
        const script = document.createElement('script');
        script.id = 'tradingview-widget-loading-script';
        script.src = 'https://s3.tradingview.com/tv.js';
        script.type = 'text/javascript';
        script.onload = () => resolve();

        document.head.appendChild(script);
      });
    }

    tvScriptLoadingPromise.then(() => {
      if (onLoadScriptRef.current) {
        onLoadScriptRef.current();
      }
    });

    return () => {
      onLoadScriptRef.current = null;
    };
  }, [symbol]);

  function createWidget(): void {
    if (document.getElementById('tradingview_b8343') && 'TradingView' in window) {
      const tvWindow = window as TradingViewWindow;
      const TradingView = tvWindow.TradingView;
      new TradingView.widget({
        symbol,
        autosize: true,
        interval: 'D',
        timezone: 'Etc/UTC',
        theme: 'light',
        style: '1',
        locale: 'en',
        toolbar_bg: '#f1f3f6',
        enable_publishing: false,
        allow_symbol_change: true,
        container_id: 'tradingview_b8343',
      });
    }
  }

  return (
    <div className={styles.tradingviewCidgetContainer}>
      <div id="tradingview_b8343" />
    </div>
  );
}
