import pandas as pd
import logging
import yfinance as yf

from fastapi import APIRouter

from dividend.json import Company, StockData, Rule4, TimeAndValue, DividendHistory, StockPrice

router = APIRouter()
# from fastapi import FastAPI
# app = FastAPI()

logging.basicConfig(level=logging.INFO)

@router.get("/dividend/symbol")
async def get_symbols():
    return get_dataframe().index.values.tolist()

@router.get("/dividend/symbol/{symbol}")
async def get_symbol(symbol: str):
    row = get_dataframe().loc[symbol]
    #print row
    # logging.info(row.type())
    # return 1
    return row.dropna().to_dict()

@router.get("/dividend/rule/4")
async def rule4(sort_column: str | None = None, sort_direction: str = "desc"):
    df = get_dataframe()

    # Rule 4: Div Yield between S&P x1.5 and x5, and bigger than inflation
    snp = 1.46 # https://www.multpl.com/s-p-500-dividend-yield
    inflation = 3.24 # https://www.multpl.com/inflation
    snp_range_lower = df["div_yield"] > snp * 1.5
    snp_range_upper = df["div_yield"] < snp * 5
    bigger_than_inflation = df["div_yield"] > inflation
    rule4 = df[snp_range_lower & snp_range_upper & bigger_than_inflation]

    ascending = True
    if sort_direction == 'desc':
        ascending = False

    if sort_column:
        rule4 = rule4.sort_values(by=sort_column, ascending=ascending)
    else:
        rule4 = rule4.sort_index(ascending=ascending)

    # logging.info(rule4)
    # logging.info(rule4.dtypes)
    # row = rule4.loc[["AROW"]]
    # logging.info(row)
    # logging.info(row.company)
    # logging.info(row.company.str)

    stocks = list()
    for symbol in rule4.index:
        stocks.append(df2json(symbol, rule4))
        # stock = StockData(symbol=symbol, 
        #                   company=rule4.company[symbol], 
        #                   sector=rule4.sector[symbol], 
        #                   industry=rule4.industry[symbol],
        #                   no_years=rule4.no_years[symbol],
        #                   price=rule4.price[symbol],
        #                   pe=rule4.pe[symbol],
        #                   div_yield=rule4.div_yield[symbol],
        #                   avg_yield_5y=rule4.avg_yield_5y[symbol],
        #                   current_div=rule4.current_div[symbol],
        #                   previous_div=rule4.previous_div[symbol],
        #                   dgr_1y=rule4.dgr_1y[symbol],
        #                   dgr_3y=rule4.dgr_3y[symbol],
        #                   dgr_5y=rule4.dgr_5y[symbol],
        #                   dgr_10y=rule4.dgr_10y[symbol])
        # stocks.append(stock)

    return Rule4(stockData=stocks)
    # return rule4.index.tolist()


def df2json(symbol: str, df: pd.DataFrame):
    return StockData(symbol=symbol,
                     company=df.company[symbol], 
                     sector=df.sector[symbol], 
                     industry=df.industry[symbol],
                     no_years=df.no_years[symbol],
                     price=df.price[symbol],
                     pe=df.pe[symbol],
                     div_yield=df.div_yield[symbol],
                     avg_yield_5y=df.avg_yield_5y[symbol],
                     current_div=df.current_div[symbol],
                     previous_div=df.previous_div[symbol],
                     dgr_1y=df.dgr_1y[symbol],
                     dgr_3y=df.dgr_3y[symbol],
                     dgr_5y=df.dgr_5y[symbol],
                     dgr_10y=df.dgr_10y[symbol])


@router.get("/dividend/rule/2/{symbol}")
async def rule2(symbol: str):
    ticker = yf.Ticker(symbol)
    div = ticker.dividends
    
    # Rule 2: Dividend always growing

    values = list()
    for index, value in div.items():
        values.append(TimeAndValue(timestamp=index.strftime('%Y-%m-%d'), value=value))
        
    return DividendHistory(symbol=symbol, values=values)
    
    # return div.to_dict()

@router.get("/dividend/price/{symbol}")
async def getPrice(symbol: str):
    ticker = yf.Ticker(symbol)
    # hist = ticker.history(period="5y", interval="1mo")
    hist = ticker.history(period="max", interval="1mo")
    
    logging.info(hist.dtypes)

    values = list()
    for ts in hist.index:
        values.append(TimeAndValue(timestamp=ts.strftime('%Y-%m-%d'), value=hist.Close[ts]))
    
    return StockPrice(symbol=symbol, values=values)

@router.get("/dax")
async def getDaxCompanies():
    return [
        Company(name="adidas", symbol="ads.de"), 
        Company(name="Airbus", symbol="air.de"), 
        Company(name="Allianz", symbol="alv.de"), 
        Company(name="BASF", symbol="bas.de"), 
        Company(name="Bayer", symbol="bayn.de"), 
        Company(name="Beiersdorf", symbol="bei.de"), 
        Company(name="BMW", symbol="bmw.de"), 
        Company(name="Brenntag", symbol="bnr.de"), 
        Company(name="Commerzbank", symbol="cbk.de"), 
        Company(name="Continental", symbol="con.de"), 
        Company(name="Covestro", symbol="1cov.de"), 
        Company(name="Daimler Truck", symbol="dtg.de"), 
        Company(name="Deutsche Bank", symbol="db"), 
        Company(name="Deutsche Börse", symbol="db1.de"),
        Company(name="Deutsche Telekom", symbol="dte.de"),
        Company(name="DHL Group", symbol="dhl.de"),
        Company(name="E.ON", symbol="eoan.de"),
        Company(name="Fresenius", symbol="fme.de"),
        Company(name="Hannover Rück", symbol="hnr1.de"),
        Company(name="Heidelberg Materials", symbol="hei.de"),
        Company(name="Henkel vz.", symbol="hen3.de"),
        Company(name="Infineon", symbol="ifx.de"),
        Company(name="Mercedes-Benz Group", symbol="mbg.de"),
        Company(name="Merck", symbol="mrk.de"),
        Company(name="MTU Aero Engines", symbol="mtx.de"),
        Company(name="Münchener Rückversicherungs-Gesellschaft", symbol="muv2.de"),
        Company(name="Porsche", symbol="p911.de"),
        Company(name="Porsche Automobil vz.", symbol="pah3.ag"),
        Company(name="QIAGEN", symbol="qia.de"),
        Company(name="Rheinmetall", symbol="rhm.de"),
        Company(name="RWE", symbol="rwe.de"),
        Company(name="SAP", symbol="sap.de"),
        Company(name="Sartorius vz.", symbol="srt.de"),
        Company(name="Siemens", symbol="sie.de"),
        Company(name="Siemens Energy", symbol="enr.de"),
        Company(name="Siemens Healthineers", symbol="shl.de"),
        Company(name="Symrise", symbol="sy1.de"),
        Company(name="Volkswagen", symbol="vow3.de"),
        Company(name="Vonovia", symbol="vna.de"),
        Company(name="Zalando", symbol="zal.de")
        ]

@router.get("/test/{symbol}")
async def test(symbol: str):
    ticker = yf.Ticker(symbol)
    # fast_info = ticker.fast_info
    # logging.info(fast_info.toJSON)

    income = ticker.income_stmt
    logging.info(income.to_json())

    # balancesheet = ticker.balancesheet
    # logging.info(balancesheet)

    # cash_flow = ticker.cash_flow
    # logging.info(cash_flow)

    return ""

def get_dataframe():
    # Rule 1: Take the dividend champions
    df = pd.read_excel(
        "notebook/U.S.DividendChampions-LIVE-1223.xlsx", 
        sheet_name="Champions", 
        skiprows=2, 
        index_col="Symbol"
        )
    df = df[["Company", "Sector", "Industry", "No Years", "Price", "P/E", "Div Yield", "5Y Avg Yield", "Current Div", "Previous Div", "DGR 1Y", "DGR 3Y", "DGR 5Y", "DGR 10Y"]]
    df = df.rename(columns={
        "Company": "company", "Sector": "sector", "Industry": "industry",
        "No Years": "no_years", "Price": "price", "P/E": "pe", 
        "Div Yield": "div_yield", "5Y Avg Yield": "avg_yield_5y",
        "Current Div": "current_div", "Previous Div": "previous_div",
        "DGR 1Y": "dgr_1y", "DGR 3Y": "dgr_3y", "DGR 5Y": "dgr_5y", "DGR 10Y": "dgr_10y"
        })
    df["mr%"] = (df["current_div"] / df["previous_div"] * 100) - 100
    return df
        
