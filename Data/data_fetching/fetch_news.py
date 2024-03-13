def get_top_news_from_stocks(tickers):
    return


def fetch_and_append_news(tickers):
    try:
        top_news = get_top_news_from_stocks()
        if top_news:
            print()
            # append_news_to_mongodb()
    except Exception as e:
        # logger.error(f"Error fetching and appending news: {str(e)}")
        print('Error fetching and appending')