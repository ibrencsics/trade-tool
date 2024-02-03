from typing import List, Optional
from pydantic import BaseModel

class StockData(BaseModel):
    symbol: str
    company: str
    sector: str
    industry: Optional[str]
    no_years: Optional[int]
    price: Optional[float]
    pe: Optional[float]
    div_yield: Optional[float]
    avg_yield_5y: Optional[float]
    current_div: Optional[float]
    previous_div: Optional[float]
    dgr_1y: Optional[float]
    dgr_3y: Optional[float]
    dgr_5y: Optional[float]
    dgr_10y: Optional[float]

class Rule4(BaseModel):
    stockData: List[StockData]

class TimeAndValue(BaseModel):
    timestamp: str
    value: float

class DividendHistory(BaseModel):
    symbol: str
    values: List[TimeAndValue]