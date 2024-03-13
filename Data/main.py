# main.py
from session_limiter.custom_logger import configure_logger
from session_limiter.smart_scraping import enable_debug_mode, configure_requests_cache
from session_limiter.rate_limiter import configure_cached_limiter_session

import polars as pl

logger = None
session = None
limiter_session = None

def rate_limiter_func():
    global logger, session, limiter_session
    logger = configure_logger()
    enable_debug_mode()
    session = configure_requests_cache("yfinance.cache", "my-program/1.0")
    limiter_session = configure_cached_limiter_session(2, 5, "yfinance.cache")
    return logger, session, limiter_session
    

def get_news():
    # from data_fetching.fetch_news import fetch_news
    return
        
def main():
    def get_tickers():
        tickers = pl.read_csv('nasdaq_symbols.csv') # a polars dataframe series abstraction
        tickers = tickers.select('Symbol') # now just a series data structure
        
        return tickers.get_column('Symbol').to_list() # symbol column to series type to classic list    
    
    rate_limiter_func()

    tickers = get_tickers()[:20]
    print(tickers)
    
    get_news()
    
if __name__ == "__main__":
    main()