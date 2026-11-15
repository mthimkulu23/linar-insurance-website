from dataclasses import dataclass, field
from typing import Optional


@dataclass
class InsuranceProduct:
    id: str
    name: str
    description: str
    icon: str
    cta_url: str


@dataclass
class QuoteRequest:
    name: str
    email: str
    phone: str
    product: str
    message: Optional[str] = field(default=None)


@dataclass
class ContactRequest:
    name: str
    email: str
    phone: str
    message: str
