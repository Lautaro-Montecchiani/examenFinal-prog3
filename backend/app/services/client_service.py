from .base_service import BaseService
from ..models.client import Client
from ..schemas.client_schema import ClientCreate, ClientUpdate


class ClientService(BaseService[Client, ClientCreate, ClientUpdate]):
    def __init__(self):
        super().__init__(Client)
