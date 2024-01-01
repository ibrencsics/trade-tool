import yfinance as yf
import logging

from fastapi import APIRouter
router = APIRouter()


@router.get("/yfinance/symbol")
async def get_symbols():
    msft = yf.Ticker("MSFT")    

    # get all stock info
    # logging.info(msft.info)

    logging.info(msft.dividends)

    return "OK"


