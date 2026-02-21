import enum


class DeliveryMethod(enum.IntEnum):
    DRIVE_THRU = 1
    ON_HAND = 2
    HOME_DELIVERY = 3


class OrderStatus(enum.IntEnum):
    PENDING = 1
    IN_PROGRESS = 2
    DELIVERED = 3
    CANCELED = 4


class PaymentType(enum.Enum):
    CASH = "cash"
    CARD = "card"
